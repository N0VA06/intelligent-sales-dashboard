
import React from 'react';
import { TooltipProps } from 'recharts';
import { VelocityDataPoint } from '@/hooks/useSalesVelocityData';

interface VelocityTooltipProps extends TooltipProps<number, string> {}

export const VelocityTooltip: React.FC<VelocityTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const velocityValue = payload[0].value as number;
  const targetValue = payload[1].value as number;
  const isAboveTarget = velocityValue >= targetValue;

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-primary text-sm mt-1">
        Velocity: {velocityValue} sales/day
      </p>
      <p className="text-blue-500 text-sm mt-1">
        Target: {targetValue} sales/day
      </p>
      <p className={`text-sm mt-1 ${isAboveTarget ? 'text-green-500' : 'text-red-500'}`}>
        {isAboveTarget ? 'Above Target' : 'Below Target'}
      </p>
    </div>
  );
};
