
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  ComposedChart
} from 'recharts';

interface TimeSeriesData {
  date: string;
  value: number;
  forecast?: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  subtitle?: string;
  valueFormatter?: (value: number) => string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  data, 
  title,
  subtitle,
  valueFormatter = (value) => `$${value.toLocaleString()}`
}) => {
  
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-primary text-sm mt-1">
            Actual: {valueFormatter(payload[0].value)}
          </p>
          {payload.length > 1 && payload[1].value && (
            <p className="text-blue-500 text-sm mt-1">
              Forecast: {valueFormatter(payload[1].value)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Check if we have forecast data
  const hasForecast = data.some(item => item.forecast !== undefined);

  return (
    <div className="w-full h-[300px]">
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {hasForecast ? (
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={customTooltip} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="value" 
              fill="rgba(100, 116, 139, 0.2)"
              stroke="hsl(var(--primary))" 
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#3b82f6" 
              strokeDasharray="5 5"
              name="Forecast"
              dot={false}
            />
          </ComposedChart>
        ) : (
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={customTooltip} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              name="Value"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
