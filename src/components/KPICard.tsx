
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FinancialMetric, formatValue } from './FinancialMetrics';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KPICardProps {
  metric: FinancialMetric;
  delay?: number;
}

const KPICard: React.FC<KPICardProps> = ({ metric, delay = 0 }) => {
  const percentage = Math.min(
    Math.max(
      (metric.currentValue / metric.targetValue) * 100, 
      0
    ), 
    100
  );
  
  // Invert progress percentage for metrics where lower is better
  const invertProgress = metric.currentValue > metric.targetValue && metric.trend === 'down';
  const progressPercentage = invertProgress ? 100 - percentage : percentage;
  
  const getProgressColor = () => {
    if (metric.status === 'positive') return 'bg-success';
    if (metric.status === 'warning') return 'bg-warning';
    return 'bg-destructive';
  };
  
  const getTrendIcon = () => {
    if (metric.trend === 'up') {
      return metric.status === 'positive' ? 
        <ArrowUp className="h-4 w-4 text-success" /> : 
        <ArrowUp className="h-4 w-4 text-destructive" />;
    }
    if (metric.trend === 'down') {
      return metric.status === 'positive' ? 
        <ArrowDown className="h-4 w-4 text-success" /> : 
        <ArrowDown className="h-4 w-4 text-destructive" />;
    }
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="w-full"
    >
      <Card className="overflow-hidden h-full glass-card backdrop-blur-md border border-white/30 shadow-soft">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="font-medium text-sm sm:text-base">{metric.title}</h3>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p className="text-sm">{metric.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-xs text-muted-foreground">{metric.category}</p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                {getTrendIcon()}
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-1">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">
                  {formatValue(metric.currentValue, metric.unit, metric.valueFormat)}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Actual
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {formatValue(metric.targetValue, metric.unit, metric.valueFormat)}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Ideal
                </span>
              </div>
            </div>
            
            <div className="mt-1">
              <Progress 
                value={progressPercentage} 
                className={`h-2 ${getProgressColor()}`} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KPICard;
