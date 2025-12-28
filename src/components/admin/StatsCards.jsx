import React from 'react';
import { Users, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cards = [
    { label: 'Total', value: stats.total, icon: Users, color: 'blue' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow' },
    { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'purple' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'green' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {cards.map((stat, idx) => (
        <div 
          key={stat.label} 
          className="bg-white rounded-xl shadow-sm p-6 animate-slideUp" 
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            <stat.icon className={`text-${stat.color}-600`} size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;