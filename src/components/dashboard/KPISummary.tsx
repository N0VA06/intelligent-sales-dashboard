
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Layers, ShoppingBag, Users } from 'lucide-react';
import SalesSummary from '../SalesSummary';

interface KPISummaryProps {
  salesMetrics: {
    totalRevenue: number;
    totalUnits: number;
    averageOrderValue: number;
    yearOverYearGrowth: number;
  };
}

const KPISummary: React.FC<KPISummaryProps> = ({ salesMetrics }) => {
  // Animation variants for staggered animations
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
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <SalesSummary 
          title="Total Revenue" 
          value={`$${(salesMetrics.totalRevenue / 1000000).toFixed(2)}M`}
          description="Overall revenue"
          trend={12.5}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SalesSummary 
          title="Total Units Sold" 
          value={`${(salesMetrics.totalUnits).toLocaleString()}`}
          description="Product units"
          trend={8.2}
          icon={<Layers className="h-4 w-4" />}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SalesSummary 
          title="Average Order Value" 
          value={`$${salesMetrics.averageOrderValue.toFixed(2)}`}
          description="Per unit"
          trend={-2.1}
          icon={<ShoppingBag className="h-4 w-4" />}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SalesSummary 
          title="YoY Growth" 
          value={`${salesMetrics.yearOverYearGrowth}%`}
          description="Compared to last year"
          trend={salesMetrics.yearOverYearGrowth}
          icon={<Users className="h-4 w-4" />}
        />
      </motion.div>
    </motion.div>
  );
};

export default KPISummary;
