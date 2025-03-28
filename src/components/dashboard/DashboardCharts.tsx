
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ChartTypeSelector from './chart-sections/ChartTypeSelector';
import PerformanceCharts from './chart-sections/PerformanceCharts';
import TrendsCharts from './chart-sections/TrendsCharts';
import ComparisonCharts from './chart-sections/ComparisonCharts';
import { ProductPerformance, RevenueTrend, ChannelPerformance } from '@/types';

interface DashboardChartsProps {
  selectedChartType: 'performance' | 'trends' | 'comparison';
  setSelectedChartType: (type: 'performance' | 'trends' | 'comparison') => void;
  revenueTrends: RevenueTrend[];
  filteredProducts: ProductPerformance[];
  channelPerformance: ChannelPerformance[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  selectedChartType,
  setSelectedChartType,
  revenueTrends,
  filteredProducts,
  channelPerformance
}) => {
  return (
    <Tabs value={selectedChartType} onValueChange={setSelectedChartType as any} className="space-y-6">
      <ChartTypeSelector selectedChartType={selectedChartType} />
      
      {/* Performance Charts */}
      <TabsContent value="performance" className="space-y-6">
        <PerformanceCharts 
          revenueTrends={revenueTrends}
          filteredProducts={filteredProducts}
          channelPerformance={channelPerformance}
        />
      </TabsContent>
      
      {/* Trends Charts */}
      <TabsContent value="trends" className="space-y-6">
        <TrendsCharts />
      </TabsContent>
      
      {/* Comparison Charts */}
      <TabsContent value="comparison" className="space-y-6">
        <ComparisonCharts filteredProducts={filteredProducts} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardCharts;
