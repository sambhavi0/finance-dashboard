import { useState } from 'react';
import { setBudget } from '../api';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export default function SetBudgetForm({ onSet }) {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [form, setForm] = useState({ category: 'Food', amount: '', month: currentMonth });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setBudget({ ...form, amount: Number(form.amount) });
        setForm({ category: 'Food', amount: '', month: currentMonth });
        onSet();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input
                type="number"
                placeholder="Budget amount (₹)"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                required
            />
            <input
                type="month"
                value={form.month}
                onChange={e => setForm({ ...form, month: e.target.value })}
                required
            />
            <button type="submit">Set Budget</button>
        </form>
    );
}