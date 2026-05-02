# Personal Finance Dashboard

A full-stack finance tracking app with real-time analytics.

## Tech Stack
- **Frontend:** React, Recharts, Axios
- **Backend:** Node.js, Express, MongoDB
- **Analytics:** Python, FastAPI, Pandas, NumPy

## Features
- Add and delete expenses by category
- Set monthly budgets per category
- Spending by category (pie chart)
- Monthly trend (line chart)
- Budget vs actual spending (bar chart)

## Architecture
Two separate servers — Node handles CRUD operations, 
Python/FastAPI handles all analytics and chart data. 
Both connect to the same MongoDB database.

## Run locally

### Node server
cd server
node index.js

### Python analytics
cd analytics
py -m uvicorn main:app --reload --port 8000    

### React frontend
cd client
npm run dev

## Screenshots

### Full Dashboard
![Full Dashboard](screenshots/dashboard.png)

### Spending by Category
![Spending by Category](screenshots/category-chart.png)

### Monthly Trend
![Monthly Trend](screenshots/monthly-trend.png)

### Budget vs Actual
![Budget vs Actual](screenshots/budget-vs-actual.png)

🔗 **Live Demo**: https://finance-dashboard-eight-ashen-75.vercel.app/
