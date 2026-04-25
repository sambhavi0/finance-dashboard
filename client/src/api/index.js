import axios from 'axios';

const NODE = 'https://finance-dashboard-server-6g1l.onrender.com/api';
const PYTHON = 'https://finance-dashboard-analytics.onrender.com';

// Expense APIs
export const addExpense = (data) =>
  axios.post(`${NODE}/expenses`, data);

export const getExpenses = () =>
  axios.get(`${NODE}/expenses`);

export const deleteExpense = (id) =>
  axios.delete(`${NODE}/expenses/${id}`);

// Budget APIs
export const setBudget = (data) =>
  axios.post(`${NODE}/budgets`, data);

// Python analytics APIs
export const getCategoryData = (month) =>
  axios.get(`${PYTHON}/by-category?month=${month}`);

export const getMonthlyTrend = () =>
  axios.get(`${PYTHON}/monthly-trend`);

export const getBiggestDays = () =>
  axios.get(`${PYTHON}/biggest-days`);

export const getBudgetVsActual = (month) =>
  axios.get(`${PYTHON}/budget-vs-actual?month=${month}`);
