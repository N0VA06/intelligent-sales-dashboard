
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
  ReferenceLine
} from 'recharts';

interface ComparisonData {
  name: string;
  actual: number;
  target: number;
}

interface ComparisonBarChartProps {
  data: ComparisonData[];
  title: string;
  subtitle?: string;
}

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({ 
  data, 
  title,
  subtitle 
}) => {
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
            Actual: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Target: ${payload[1].value.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {payload[0].value >= payload[1].value ? 'Exceeding Target' : 'Below Target'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={customTooltip} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar 
            dataKey="actual" 
            fill="hsl(var(--primary))" 
            name="Actual"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="target" 
            fill="#10b981" 
            name="Target"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonBarChart;
