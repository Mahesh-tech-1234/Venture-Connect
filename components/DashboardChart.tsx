import React, { useState, useEffect, useCallback } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, Sector } from 'recharts';
import { getDashboardStats } from '../services/apiService';

const COLORS = ['#10B981', '#FACC15', '#3B82F6', '#8B5CF6', '#EC4899'];

const DashboardChart: React.FC = () => {
    const [chartData, setChartData] = useState<{lineData: any[], pieData: any[]}>({ lineData: [], pieData: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChartData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getDashboardStats();
            setChartData(data);
        } catch (err) {
            setError('Failed to load chart data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChartData();
    }, [fetchChartData]);
    
    if (loading) return <div className="text-center p-8">Loading charts...</div>;
    if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-poppins mb-4">Platform Usage Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.3)" />
                        <XAxis dataKey="month" stroke="rgb(107 114 128)" />
                        <YAxis stroke="rgb(107 114 128)" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-poppins mb-4">Funding by Sector</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData.pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart;