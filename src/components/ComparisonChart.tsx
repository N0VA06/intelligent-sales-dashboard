
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialMetric } from './FinancialMetrics';

interface ComparisonChartProps {
  metric: FinancialMetric;
  type?: 'line' | 'area' | 'bar';
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ 
  metric,
  type = 'line'
}) => {
  // Get colors based on metric status
  const getColors = () => {
    switch (metric.status) {
      case 'positive':
        return { 
          actual: 'hsl(var(--success))', 
          ideal: 'hsl(var(--muted-foreground) / 0.3)' 
        };
      case 'warning':
        return { 
          actual: 'hsl(var(--warning))', 
          ideal: 'hsl(var(--muted-foreground) / 0.3)' 
        };
      case 'negative':
        return { 
          actual: 'hsl(var(--destructive))', 
          ideal: 'hsl(var(--muted-foreground) / 0.3)' 
        };
      default:
        return { 
          actual: 'hsl(var(--primary))', 
          ideal: 'hsl(var(--muted-foreground) / 0.3)' 
        };
    }
  };
  
  const colors = getColors();
  
  // Format tooltip label
  const formatTooltipLabel = (value: number) => {
    if (metric.valueFormat === 'currency') {
      return `$${value.toLocaleString()}`;
    }
    
    if (metric.unit === 'ratio') {
      if (Math.abs(value) < 0.1) {
        return `${(value * 100).toFixed(2)}%`;
      }
      return value.toFixed(2);
    }
    
    return `${value} ${metric.unit}`;
  };
  
  // Chart Components
  const renderChart = () => {
    const commonProps = {
      data: metric.data || [],
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };
    
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart {...commonProps}>
              <defs>
                <linearGradient id={`gradientActual-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.actual} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.actual} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id={`gradientIdeal-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.ideal} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.ideal} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [formatTooltipLabel(value), '']}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="actual" 
                name="Actual" 
                stroke={colors.actual} 
                fillOpacity={1} 
                fill={`url(#gradientActual-${metric.id})`}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="ideal" 
                name="Ideal" 
                stroke={colors.ideal} 
                fillOpacity={1} 
                fill={`url(#gradientIdeal-${metric.id})`}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [formatTooltipLabel(value), '']}
              />
              <Legend />
              <Bar 
                dataKey="actual" 
                name="Actual" 
                fill={colors.actual}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="ideal" 
                name="Ideal" 
                fill={colors.ideal}
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [formatTooltipLabel(value), '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual" 
                stroke={colors.actual} 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="ideal" 
                name="Ideal" 
                stroke={colors.ideal} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Card className="h-full glass-card shadow-soft overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-medium">{metric.title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
        </CardHeader>
        <CardContent className="pb-5">
          {renderChart()}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComparisonChart;
