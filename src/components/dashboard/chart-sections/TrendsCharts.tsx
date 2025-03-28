
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SalesVelocityChart from '@/components/charts/SalesVelocityChart';
import ConversionFunnelChart from '@/components/charts/ConversionFunnelChart';
import SalesComparisonChart from '@/components/charts/SalesComparisonChart';

const TrendsCharts: React.FC = () => {
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
                <TrendingUp className="h-5 w-5 mr-2 text-primary" /> Sales Velocity
              </CardTitle>
              <CardDescription>Sales speed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesVelocityChart />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-primary" /> Conversion Funnel
              </CardTitle>
              <CardDescription>From visitors to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ConversionFunnelChart />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-primary" /> Seasonal Sales Patterns
            </CardTitle>
            <CardDescription>Monthly and quarterly analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SalesComparisonChart />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default TrendsCharts;
