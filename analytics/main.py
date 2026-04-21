from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/financedashboard"))
db = client["financedashboard"]

def get_expenses_df():
    expenses = list(db.expenses.find({}, {"_id": 0}))
    if not expenses:
        return pd.DataFrame()
    df = pd.DataFrame(expenses)
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.to_period('M').astype(str)
    df['day'] = df['date'].dt.date.astype(str)
    return df

# 1. Spending by category
@app.get("/analytics/by-category")
def spending_by_category(month: str = None):
    df = get_expenses_df()
    if df.empty:
        return []
    if month:
        df = df[df['month'] == month]
    result = df.groupby('category')['amount'].sum().reset_index()
    return result.to_dict(orient='records')

# 2. Monthly trend (no s — matches frontend)
@app.get("/analytics/monthly-trend")
def monthly_trend():
    df = get_expenses_df()
    if df.empty:
        return []
    result = df.groupby("month")["amount"].sum().reset_index()
    result = result.sort_values("month")
    return result.to_dict(orient='records')

# 3. Biggest expense days
@app.get("/analytics/biggest-days")
def biggest_expense_days(limit: int = 5):
    df = get_expenses_df()
    if df.empty:
        return []
    result = df.groupby("day")["amount"].sum().reset_index()
    result = result.sort_values("amount", ascending=False).head(limit)
    return result.to_dict(orient='records')

# 4. Budget vs actual
@app.get("/analytics/budget-vs-actual")
def budget_vs_actual(month: str):
    df = get_expenses_df()
    budgets = list(db.budgets.find({"month": month}, {"_id": 0}))
    if df.empty or not budgets:
        return []
    monthly = df[df['month'] == month]
    actual = monthly.groupby("category")["amount"].sum().reset_index()
    actual.columns = ["category", "actual"]
    budget_df = pd.DataFrame(budgets)
    merged = pd.merge(budget_df, actual, on="category", how="left")
    merged["actual"] = merged["actual"].fillna(0)
    merged["remaining"] = merged["amount"] - merged["actual"]
    return merged.to_dict(orient="records")