import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts';

export default function BudgetVSActual({data}){
    if (!data.length) return <p>No data yet</p>;
    return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip formatter={(val) => `₹${val}`} />
        <Legend />
        <Bar dataKey="amount" name="Budget" fill="#6366f1" />
        <Bar dataKey="actual" name="Spent" fill="#f59e0b">
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.actual > entry.amount ? '#ef4444' : '#10b981'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}