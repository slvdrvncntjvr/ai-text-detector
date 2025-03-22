// src/components/ui/AnalyticsCard.tsx
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = 'blue'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'bg-green-50 text-green-700 border-green-100';
      case 'red': return 'bg-red-50 text-red-700 border-red-100';
      case 'yellow': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };
  
  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`rounded-lg p-4 border ${getColorClasses()}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && trendValue && (
              <span className={`ml-2 flex items-center text-xs ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                {getTrendIcon()}
                <span className="ml-1">{trendValue}%</span>
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`p-2 rounded-md ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'red' ? 'bg-red-100' : color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;