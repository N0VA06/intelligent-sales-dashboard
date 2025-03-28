
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LabelList
} from 'recharts';
import { ChannelPerformance } from '@/types';

interface ChannelPerformanceChartProps {
  data: ChannelPerformance[];
}

const ChannelPerformanceChart: React.FC<ChannelPerformanceChartProps> = ({ data }) => {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
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
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="channelName" />
          <YAxis 
            tickFormatter={formatYAxis}
          />
          <Tooltip content={customTooltip} />
          <Legend />
          <Bar 
            dataKey="revenue" 
            fill="hsl(var(--primary))" 
            name="Revenue"
            radius={[4, 4, 0, 0]}
          >
            <LabelList dataKey="channelName" position="top" />
          </Bar>
          <Bar 
            dataKey="units" 
            fill="#e2e8f0" 
            name="Units Sold"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelPerformanceChart;
