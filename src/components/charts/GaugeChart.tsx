
import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Tooltip,
  Legend
} from 'recharts';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  title: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  thresholds?: {
    warning: number;
    danger: number;
  };
}

const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  min, 
  max, 
  title,
  subtitle,
  formatValue = (val) => val.toFixed(1),
  thresholds = { warning: 50, danger: 75 }
}) => {
  // Normalize value between 0 and 100
  const normalizedValue = ((value - min) / (max - min)) * 100;
  
  // Determine color based on thresholds
  const getColor = (value: number) => {
    if (value >= thresholds.danger) return '#ef4444'; // Red
    if (value >= thresholds.warning) return '#f59e0b'; // Yellow/Orange
    return '#10b981'; // Green
  };
  
  const color = getColor(normalizedValue);
  
  // Create data for the gauge
  const data = [
    { name: 'Value', value: normalizedValue },
    { name: 'Empty', value: 100 - normalizedValue }
  ];
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0].name === 'Value') {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-primary text-sm mt-1">
            Value: {formatValue(value)} / {formatValue(max)}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {normalizedValue.toFixed(1)}% of maximum
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[250px] flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="relative w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              cornerRadius={5}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" /> {/* Light gray for empty */}
            </Pie>
            <Tooltip content={customTooltip} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold" style={{ color }}>
            {formatValue(value)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            of {formatValue(max)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
