
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ProductPerformance } from '@/types';

interface CategoryBreakdownChartProps {
  data: ProductPerformance[];
}

const COLORS = [
  'hsl(var(--primary))',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

const CategoryBreakdownChart: React.FC<CategoryBreakdownChartProps> = ({ data }) => {
  const categoryData = useMemo(() => {
    const categories = data.reduce((acc, item) => {
      // Group by category
      if (!acc[item.category]) {
        acc[item.category] = {
          name: item.category,
          value: 0,
          units: 0,
        };
      }
      acc[item.category].value += item.revenue;
      acc[item.category].units += item.units;
      return acc;
    }, {} as Record<string, { name: string; value: number; units: number }>);

    return Object.values(categories);
  }, [data]);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-primary text-sm mt-1">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Units: {payload[0].payload.units.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {(payload[0].percent * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center mt-4 gap-3">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdownChart;
