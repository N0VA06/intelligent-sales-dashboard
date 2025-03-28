
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart4, PieChart, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevenueTrendsChart from '@/components/charts/RevenueTrendsChart';
import ProductPerformanceChart from '@/components/charts/ProductPerformanceChart';
import CategoryBreakdownChart from '@/components/charts/CategoryBreakdownChart';
import ChannelPerformanceChart from '@/components/charts/ChannelPerformanceChart';
import { ProductPerformance, RevenueTrend, ChannelPerformance } from '@/types';

interface PerformanceChartsProps {
  revenueTrends: RevenueTrend[];
  filteredProducts: ProductPerformance[];
  channelPerformance: ChannelPerformance[];
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  revenueTrends,
  filteredProducts,
  channelPerformance
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-primary" /> Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue and units sold</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueTrendsChart data={revenueTrends} />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart4 className="h-5 w-5 mr-2 text-primary" /> Top Products
              </CardTitle>
              <CardDescription>Revenue by product</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductPerformanceChart data={filteredProducts} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-primary" /> Category Breakdown
              </CardTitle>
              <CardDescription>Sales by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdownChart data={filteredProducts} />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" /> Channel Performance
              </CardTitle>
              <CardDescription>Revenue by sales channel</CardDescription>
            </CardHeader>
            <CardContent>
              <ChannelPerformanceChart data={channelPerformance} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PerformanceCharts;
