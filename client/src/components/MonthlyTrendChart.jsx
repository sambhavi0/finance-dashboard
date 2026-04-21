import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function MonthlyTrendChart({data}){
    if(!data.length) return <p>No data yet</p>;
    return(
        <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(val) => `₹${val}`} />
        <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}