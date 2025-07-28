
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-accent-gray dark:text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-emerald-green mt-1">{value}</p>
        </div>
    );
};

export default StatCard;
