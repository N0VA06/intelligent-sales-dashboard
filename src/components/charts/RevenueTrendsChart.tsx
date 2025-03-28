
import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { RevenueTrend } from '@/types';

interface RevenueTrendsChartProps {
  data: RevenueTrend[];
}

const RevenueTrendsChart: React.FC<RevenueTrendsChartProps> = ({ data }) => {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-primary text-sm mt-1">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Units: {payload[1].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="period" />
          <YAxis 
            yAxisId="left" 
            tickFormatter={formatYAxis} 
            orientation="left"
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={customTooltip} />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="revenue" 
            fill="hsl(var(--primary))" 
            name="Revenue" 
            barSize={20}
            radius={[4, 4, 0, 0]}
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="units" 
            stroke="#f59e0b" 
            name="Units Sold"
            strokeWidth={2}
            dot={{ fill: "#f59e0b", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrendsChart;
