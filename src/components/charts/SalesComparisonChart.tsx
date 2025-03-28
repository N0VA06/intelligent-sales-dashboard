
import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

// Sample data for year over year comparison
const data = [
  {
    month: 'Jan',
    'Current Year': 4000,
    'Previous Year': 2400,
    'Growth': 67,
    'Target': 3000
  },
  {
    month: 'Feb',
    'Current Year': 4500,
    'Previous Year': 2800,
    'Growth': 61,
    'Target': 3500
  },
  {
    month: 'Mar',
    'Current Year': 5000,
    'Previous Year': 3200,
    'Growth': 56,
    'Target': 4000
  },
  {
    month: 'Apr',
    'Current Year': 4800,
    'Previous Year': 3800,
    'Growth': 26,
    'Target': 4200
  },
  {
    month: 'May',
    'Current Year': 5500,
    'Previous Year': 4200,
    'Growth': 31,
    'Target': 4800
  },
  {
    month: 'Jun',
    'Current Year': 6000,
    'Previous Year': 4800,
    'Growth': 25,
    'Target': 5200
  },
  {
    month: 'Jul',
    'Current Year': 6500,
    'Previous Year': 5000,
    'Growth': 30,
    'Target': 5500
  },
  {
    month: 'Aug',
    'Current Year': 7000,
    'Previous Year': 5200,
    'Growth': 35,
    'Target': 6000
  },
  {
    month: 'Sep',
    'Current Year': 6800,
    'Previous Year': 5000,
    'Growth': 36,
    'Target': 6200
  },
  {
    month: 'Oct',
    'Current Year': 7500,
    'Previous Year': 5500,
    'Growth': 36,
    'Target': 6800
  },
  {
    month: 'Nov',
    'Current Year': 8000,
    'Previous Year': 6000,
    'Growth': 33,
    'Target': 7200
  },
  {
    month: 'Dec',
    'Current Year': 9000,
    'Previous Year': 6500,
    'Growth': 38,
    'Target': 8000
  }
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentYear = payload.find((p: any) => p.name === 'Current Year')?.value;
    const previousYear = payload.find((p: any) => p.name === 'Previous Year')?.value;
    const growth = payload.find((p: any) => p.name === 'Growth')?.value;
    const target = payload.find((p: any) => p.name === 'Target')?.value;
    
    const formatCurrency = (value: number) => 
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-primary text-sm mt-1">
          Current Year: {formatCurrency(currentYear)}
        </p>
        <p className="text-blue-500 text-sm mt-1">
          Previous Year: {formatCurrency(previousYear)}
        </p>
        <p className="text-green-500 text-sm mt-1">
          Target: {formatCurrency(target)}
        </p>
        <p className={`text-sm mt-1 ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          YoY Growth: {growth}%
        </p>
      </div>
    );
  }
  return null;
};

const SalesComparisonChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="Current Year" fill="hsl(var(--primary))" barSize={20} />
          <Bar yAxisId="left" dataKey="Previous Year" fill="#64748b" barSize={20} />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="Target" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
          />
          <Bar 
            yAxisId="right" 
            dataKey="Growth" 
            fill="transparent" 
            barSize={20}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.Growth >= 0 ? '#10b981' : '#ef4444'} 
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesComparisonChart;
