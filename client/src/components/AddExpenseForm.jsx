import { useState } from 'react';
import { addExpense } from '../api';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export default function AddExpenseForm({ onAdd }) {
    const [form, setForm] = useState({ title: '', amount: '', category: 'Food', date: '', note: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addExpense({ ...form, amount: Number(form.amount) });
        setForm({ title: '', amount: '', category: 'Food', date: '', note: '' });
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input type="number" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            <input placeholder="Note (optional)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            <button type="submit">Add Expense</button>
        </form>
    );
}