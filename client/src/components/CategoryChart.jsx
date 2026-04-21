import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'; //Those all come from the recharts library, which is a popular charting library for React.

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#ec4899', '#8b5cf6'];
export default function CategoryChart({data}){
    if(!data.length) return <p>No data yet</p>;
    return(
        <PieChart width={380} height={300}>
      <Pie data={data} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
        {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
      </Pie>
      <Tooltip formatter={(val) => `₹${val}`} />
      <Legend />
    </PieChart>
  );
}
    