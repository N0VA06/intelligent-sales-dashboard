
import React from 'react';
import { motion } from 'framer-motion';
import { Percent, Target, BarChart4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MarketShareChart from '@/components/charts/MarketShareChart';
import ProductPerformanceChart from '@/components/charts/ProductPerformanceChart';
import SalesComparisonChart from '@/components/charts/SalesComparisonChart';
import { ProductPerformance } from '@/types';

interface ComparisonChartsProps {
  filteredProducts: ProductPerformance[];
}

const ComparisonCharts: React.FC<ComparisonChartsProps> = ({
  filteredProducts
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
                <Percent className="h-5 w-5 mr-2 text-primary" /> Market Share
              </CardTitle>
              <CardDescription>Comparison with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketShareChart />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" /> Performance vs Target
              </CardTitle>
              <CardDescription>Actual vs forecast analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductPerformanceChart data={filteredProducts} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart4 className="h-5 w-5 mr-2 text-primary" /> Year-over-Year Comparison
            </CardTitle>
            <CardDescription>Multi-year performance analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SalesComparisonChart />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ComparisonCharts;
