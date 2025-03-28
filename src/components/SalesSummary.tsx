
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SalesSummaryProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  icon: React.ReactNode;
}

const SalesSummary: React.FC<SalesSummaryProps> = ({
  title,
  value,
  description,
  trend,
  icon,
}) => {
  const isPositive = trend >= 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.div 
            className="rounded-full bg-primary/10 p-1 text-primary"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
        </div>
        <div className="mt-1">
          <motion.p 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.1
            }}
          >
            {value}
          </motion.p>
          <div className="flex items-center mt-1">
            <motion.span 
              className={`text-xs font-medium flex items-center ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend)}%
            </motion.span>
            <span className="text-xs text-muted-foreground ml-2">
              {description}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesSummary;
