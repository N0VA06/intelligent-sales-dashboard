
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine 
} from 'recharts';
import { ChartContainer } from '../ui/chart';
import { VelocityTooltip } from './tooltips/VelocityTooltip';
import { useSalesVelocityData } from '@/hooks/useSalesVelocityData';

interface SalesVelocityChartProps {
  height?: number;
}

const SalesVelocityChart: React.FC<SalesVelocityChartProps> = ({ 
  height = 300 
}) => {
  const { data } = useSalesVelocityData();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
      style={{ height: `${height}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis 
            label={{ 
              value: 'Sales per day', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle' } 
            }} 
          />
          <Tooltip content={<VelocityTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <ReferenceLine y={50} label="Good" stroke="#10b981" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="velocity" 
            name="Sales Velocity" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", r: 5 }}
            activeDot={{ r: 8, strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            name="Target" 
            stroke="#3b82f6" 
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesVelocityChart;
