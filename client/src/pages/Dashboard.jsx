import {useEffect, useState} from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import CategoryChart from '../components/CategoryChart';
import MonthlyTrendChart from '../components/MonthlyTrendChart';
import BudgetVsActual from '../components/BudgetVsActual';
import SetBudgetForm from '../components/SetBudgetForm';
import { getExpenses, deleteExpense, getCategoryData, getMonthlyTrend, getBudgetVsActual } from '../api';

export default function Dashboard(){
    const currentMonth = new Date().toISOString().slice(0,7);
    const [expenses, setExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [budgetData, setBudgetData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        const [exp, cat, trend, budget] = await Promise.all([
            getExpenses(),
            getCategoryData(currentMonth),
            getMonthlyTrend(),
            getBudgetVsActual(currentMonth),
        ]);
        setExpenses(exp.data);
        setCategoryData(cat.data);
        setTrendData(trend.data);
        setBudgetData(budget.data);
        setLoading(false);
    };

    useEffect(() => { fetchAll(); }, []);

    const handleDelete = async (id) => {
        await deleteExpense(id);
        fetchAll();
    };

    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 1100, margin: '0 auto' }}>
            <h1>Finance Dashboard</h1>
            {loading && <p style={{ color: '#888', fontSize: 14 }}>Loading...</p>}

            <section>
                <h2>Add Expense</h2>
                <AddExpenseForm onAdd={fetchAll} />
            </section>

            <section style={{ marginTop: 40 }}>
                <h2>Recent Expenses</h2>
                {expenses.slice(0, 10).map(e => (
                    <div key={e._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <span>{e.title} — {e.category}</span>
                        <span>₹{e.amount}</span>
                        <button onClick={() => handleDelete(e._id)}>✕</button>
                    </div>
                ))}
            </section>

            <section style={{ marginTop: 40 }}>
                <h2>Set Budget</h2>
                <SetBudgetForm onSet={fetchAll} />
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
                <section>
                    <h2>Spending by Category</h2>
                    <CategoryChart data={categoryData} />
                </section>
                <section>
                    <h2>Monthly Trend</h2>
                    <MonthlyTrendChart data={trendData} />
                </section>
                <section style={{ gridColumn: '1 / -1' }}>
                    <h2>Budget vs Actual</h2>
                    <BudgetVsActual data={budgetData} />
                </section>
            </div>
        </div>
    );
}