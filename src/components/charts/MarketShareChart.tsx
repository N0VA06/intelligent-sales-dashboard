
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend,
  Sector
} from 'recharts';

// Sample data for market share
const data = [
  { name: 'Our Company', value: 32, color: 'hsl(var(--primary))' },
  { name: 'Competitor A', value: 28, color: '#3b82f6' },
  { name: 'Competitor B', value: 22, color: '#f59e0b' },
  { name: 'Competitor C', value: 15, color: '#8b5cf6' },
  { name: 'Others', value: 3, color: '#d1d5db' }
];

const MarketShareChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-primary text-sm mt-1">
            Share: {payload[0].value}%
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {payload[0].payload.additionalInfo || 'Market share percentage'}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-[300px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex !== null ? activeIndex : undefined}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                strokeWidth={activeIndex === index ? 2 : 0}
                stroke="#fff"
              />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ paddingLeft: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="text-3xl font-bold" style={{ color: data[activeIndex].color }}>
              {data[activeIndex].value}%
            </div>
            <div className="text-sm font-medium mt-1">
              {data[activeIndex].name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketShareChart;
