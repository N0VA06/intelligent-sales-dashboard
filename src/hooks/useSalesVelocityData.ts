
import { useState, useEffect } from 'react';

// Type for velocity data
export interface VelocityDataPoint {
  month: string;
  velocity: number;
  target: number;
}

// Sample data for sales velocity
const DEFAULT_DATA: VelocityDataPoint[] = [
  { month: 'Jan', velocity: 32, target: 30 },
  { month: 'Feb', velocity: 38, target: 35 },
  { month: 'Mar', velocity: 36, target: 38 },
  { month: 'Apr', velocity: 42, target: 40 },
  { month: 'May', velocity: 46, target: 42 },
  { month: 'Jun', velocity: 55, target: 45 },
  { month: 'Jul', velocity: 58, target: 50 },
  { month: 'Aug', velocity: 62, target: 55 },
  { month: 'Sep', velocity: 54, target: 57 },
  { month: 'Oct', velocity: 60, target: 60 },
  { month: 'Nov', velocity: 67, target: 63 },
  { month: 'Dec', velocity: 73, target: 65 },
];

export const useSalesVelocityData = (initialData?: VelocityDataPoint[]) => {
  const [data, setData] = useState<VelocityDataPoint[]>(initialData || DEFAULT_DATA);
  
  // For future API calls or data transformations
  useEffect(() => {
    // Could fetch data here in the future
    // For now, just use the initial data or default data
    if (!initialData) {
      setData(DEFAULT_DATA);
    }
  }, [initialData]);
  
  return {
    data,
    setData,
    // Add more utility functions here as needed for manipulating the data
    resetData: () => setData(DEFAULT_DATA),
    updateDataPoint: (month: string, values: Partial<Omit<VelocityDataPoint, 'month'>>) => {
      setData(prevData => 
        prevData.map(point => 
          point.month === month ? { ...point, ...values } : point
        )
      );
    }
  };
};
