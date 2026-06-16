# Personal Finance Dashboard

🔗 **Live Demo:** [finance-dashboard-eight-ashen-75.vercel.app](https://finance-dashboard-eight-ashen-75.vercel.app)

**Read about the architecture decisions in this project**: [Why My Finance Dashboard Has Two Backends (And What Broke When I Deployed It)](https://dev.to/sambhavi0/why-my-finance-dashboard-has-two-backends-and-what-broke-when-i-deployed-it-28l8)

A full stack finance tracking app with real time analytics built using MERN stack and Python.

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
Two separate servers: Node handles CRUD operations, Python/FastAPI handles all analytics and chart data. Both connect to the same MongoDB Atlas database.

## Screenshots

### Full Dashboard
![Full Dashboard](screenshots/dashboard.png)

### Spending by Category
![Spending by Category](screenshots/category-chart.png)

### Monthly Trend
![Monthly Trend](screenshots/monthly-trend.png)

### Budget vs Actual
![Budget vs Actual](screenshots/budget-vs-actual.png)

## Run locally

**Node server**
```bash
cd server
node index.js
```

**Python analytics**
```bash
cd analytics
uvicorn main:app --reload --port 8000
```

**React frontend**
```bash
cd client
npm run dev
```
