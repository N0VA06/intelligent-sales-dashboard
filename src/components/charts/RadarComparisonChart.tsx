
import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend, 
  Tooltip 
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  current: number;
  benchmark: number;
  fullMark: number;
}

interface RadarComparisonChartProps {
  data: RadarDataPoint[];
  title: string;
  subtitle?: string;
}

const RadarComparisonChart: React.FC<RadarComparisonChartProps> = ({ 
  data, 
  title,
  subtitle 
}) => {
  
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{dataPoint.subject}</p>
          <p className="text-primary text-sm mt-1">
            Current: {dataPoint.current.toFixed(1)}
          </p>
          <p className="text-blue-500 text-sm mt-1">
            Benchmark: {dataPoint.benchmark.toFixed(1)}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Full mark: {dataPoint.fullMark}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={150} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar 
            name="Current" 
            dataKey="current" 
            stroke="hsl(var(--primary))" 
            fill="hsl(var(--primary))" 
            fillOpacity={0.6} 
          />
          <Radar 
            name="Benchmark" 
            dataKey="benchmark" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.6} 
          />
          <Legend />
          <Tooltip content={customTooltip} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarComparisonChart;
