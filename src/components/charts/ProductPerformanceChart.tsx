
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ProductPerformance } from '@/types';

interface ProductPerformanceChartProps {
  data: ProductPerformance[];
}

const ProductPerformanceChart: React.FC<ProductPerformanceChartProps> = ({ data }) => {
  // Sort data by revenue (descending)
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

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
          <p className="text-gray-500 text-xs mt-1">
            Category: {payload[0].payload.category}
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
          data={sortedData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" tickFormatter={formatYAxis} />
          <YAxis 
            type="category" 
            dataKey="productName" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={customTooltip} />
          <Legend />
          <Bar 
            dataKey="revenue" 
            fill="hsl(var(--primary))" 
            name="Revenue"
            radius={[0, 4, 4, 0]}
          />
          <Bar 
            dataKey="units" 
            fill="#e2e8f0" 
            name="Units Sold"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPerformanceChart;
