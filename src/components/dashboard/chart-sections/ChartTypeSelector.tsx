
import React from 'react';
import { BarChart4, TrendingUp, Target } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartTypeSelectorProps {
  selectedChartType: 'performance' | 'trends' | 'comparison';
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  selectedChartType
}) => {
  return (
    <div className="flex justify-center">
      <TabsList className="mb-6">
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <Target className="h-4 w-4" /> 
          <span>Performance</span>
        </TabsTrigger>
        <TabsTrigger value="trends" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> 
          <span>Trends</span>
        </TabsTrigger>
        <TabsTrigger value="comparison" className="flex items-center gap-2">
          <BarChart4 className="h-4 w-4" /> 
          <span>Comparison</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default ChartTypeSelector;
