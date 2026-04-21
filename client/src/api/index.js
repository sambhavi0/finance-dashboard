import axios from 'axios';

const NODE = 'http://localhost:5000/api';
const PYTHON = 'http://localhost:8000/analytics';

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