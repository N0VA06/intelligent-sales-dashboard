
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BarChart4, MapIcon, Layers } from 'lucide-react';
import { salesMetrics, revenueTrends, productPerformance, regionalSales, channelPerformance } from '@/data/mockData';
import DashboardHeader from './dashboard/DashboardHeader';
import KPISummary from './dashboard/KPISummary';
import DashboardCharts from './dashboard/DashboardCharts';
import MapAndKnowledgeView from './dashboard/MapAndKnowledgeView';

const Dashboard: React.FC = () => {
  // State for filters
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedView, setSelectedView] = useState<'charts' | 'map' | 'knowledge'>('charts');
  const [selectedChartType, setSelectedChartType] = useState<'performance' | 'trends' | 'comparison'>('performance');

  // Filter categories from product performance data
  const categories = ['All', ...new Set(productPerformance.map(p => p.category))];
  // Filter locations from regional sales data
  const cities = ['All', ...new Set(regionalSales.map(rs => rs.city))];

  // Filter product data based on selection
  const filteredProducts = selectedCategory === 'All' 
    ? productPerformance 
    : productPerformance.filter(p => p.category === selectedCategory);

  // Filter regional data based on selection
  const filteredRegions = selectedLocation === 'All'
    ? regionalSales
    : regionalSales.filter(rs => rs.city === selectedLocation);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader 
        dateRange={dateRange}
        onDateRangeChange={(range) => {
          setDateRange([range.from, range.to]);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        categories={categories}
        cities={cities}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* KPI Summary Cards */}
        <KPISummary salesMetrics={salesMetrics} />

        {/* View Selection and Content */}
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 h-10">
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" /> 
              <span className="hidden sm:inline">Charts & Graphs</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapIcon className="h-4 w-4" /> 
              <span className="hidden sm:inline">Sales Map</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Layers className="h-4 w-4" /> 
              <span className="hidden sm:inline">Knowledge Graph</span>
            </TabsTrigger>
          </TabsList>

          {/* Charts View */}
          <TabsContent value="charts" className="space-y-6">
            <DashboardCharts 
              selectedChartType={selectedChartType}
              setSelectedChartType={setSelectedChartType}
              revenueTrends={revenueTrends}
              filteredProducts={filteredProducts}
              channelPerformance={channelPerformance}
            />
          </TabsContent>

          {/* Map and Knowledge Graph Views */}
          <MapAndKnowledgeView 
            selectedView={selectedView}
            filteredRegions={filteredRegions}
          />
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
