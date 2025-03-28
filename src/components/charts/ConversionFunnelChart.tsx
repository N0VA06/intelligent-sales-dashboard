
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Funnel, FunnelChart, LabelList } from 'recharts';

// Sample data for conversion funnel
const data = [
  { name: 'Website Visitors', value: 5000, fill: '#94a3b8' },
  { name: 'Qualified Leads', value: 2500, fill: '#64748b' },
  { name: 'Opportunities', value: 1000, fill: '#475569' },
  { name: 'Proposals', value: 500, fill: '#334155' },
  { name: 'Closed Deals', value: 200, fill: '#1e293b' },
];

// Calculate conversion rates
const getConversionRate = (currentIndex: number) => {
  if (currentIndex === 0) return '100%';
  const currentValue = data[currentIndex].value;
  const previousValue = data[currentIndex - 1].value;
  return `${Math.round((currentValue / previousValue) * 100)}%`;
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const currentIndex = data.findIndex(item => item.name === payload[0].name);
    const conversionRate = getConversionRate(currentIndex);
    
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{payload[0].name}</p>
        <p className="text-primary text-sm mt-1">
          Count: {payload[0].value.toLocaleString()}
        </p>
        <p className="text-blue-500 text-sm mt-1">
          Conversion: {conversionRate}
        </p>
      </div>
    );
  }
  return null;
};

// Mobile version (pie chart for small screens)
const MobileChart = () => {
  const COLORS = ['#94a3b8', '#64748b', '#475569', '#334155', '#1e293b'];
  
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Desktop version (funnel chart for larger screens)
const DesktopChart = () => {
  // Fix: Changed the handleClick function to match the expected signature
  const handleClick = (e: React.MouseEvent<SVGPathElement>) => {
    console.log('Funnel segment clicked');
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
            onClick={handleClick}
          >
            <LabelList 
              position="right" 
              fill="#fff" 
              stroke="none" 
              dataKey="name" 
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

const ConversionFunnelChart = () => {
  // Use useState and useEffect to determine if we're on mobile
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Check on initial render
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile ? <MobileChart /> : <DesktopChart />;
};

export default ConversionFunnelChart;
