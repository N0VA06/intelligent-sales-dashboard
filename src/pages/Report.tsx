import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Share2,
  TrendingUp,
  CreditCard,
  Users,
  ShoppingCart,
  AlertCircle,
  BarChart,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';
import ComparisonBarChart from '@/components/charts/ComparisonBarChart';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import RadarComparisonChart from '@/components/charts/RadarComparisonChart';
import GaugeChart from '@/components/charts/GaugeChart';

const Report = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Sample data for the charts
  const comparisonData = [
    { name: 'Q1', actual: 125000, target: 100000 },
    { name: 'Q2', actual: 95000, target: 110000 },
    { name: 'Q3', actual: 140000, target: 120000 },
    { name: 'Q4', actual: 165000, target: 150000 },
  ];

  const timeSeriesData = [
    { date: 'Jan', value: 45000, forecast: 45000 },
    { date: 'Feb', value: 52000, forecast: 50000 },
    { date: 'Mar', value: 49000, forecast: 55000 },
    { date: 'Apr', value: 63000, forecast: 60000 },
    { date: 'May', value: 59000, forecast: 65000 },
    { date: 'Jun', value: 75000, forecast: 70000 },
    { date: 'Jul', value: 79000, forecast: 75000 },
    { date: 'Aug', value: 82000, forecast: 80000 },
    { date: 'Sep', value: null, forecast: 85000 },
    { date: 'Oct', value: null, forecast: 90000 },
    { date: 'Nov', value: null, forecast: 95000 },
    { date: 'Dec', value: null, forecast: 100000 },
  ].filter(item => item.value !== null || item.forecast !== null);

  const radarData = [
    { subject: 'Marketing', current: 65, benchmark: 80, fullMark: 100 },
    { subject: 'Sales', current: 85, benchmark: 75, fullMark: 100 },
    { subject: 'Development', current: 50, benchmark: 60, fullMark: 100 },
    { subject: 'Customer Support', current: 78, benchmark: 70, fullMark: 100 },
    { subject: 'HR', current: 90, benchmark: 80, fullMark: 100 },
    { subject: 'Finance', current: 60, benchmark: 75, fullMark: 100 },
  ];

  const productPerformanceData = [
    { name: 'Product A', actual: 250000, target: 200000 },
    { name: 'Product B', actual: 180000, target: 210000 },
    { name: 'Product C', actual: 320000, target: 300000 },
    { name: 'Product D', actual: 190000, target: 230000 },
    { name: 'Product E', actual: 270000, target: 250000 },
  ];

  // Business insights data
  const insights = [
    {
      title: "Product C Outperformance",
      description: "Product C continues to exceed targets by 6.7% and represents our strongest growth opportunity.",
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      action: "Increase inventory by 15%",
      trend: "positive"
    },
    {
      title: "Customer Acquisition Efficiency",
      description: "CAC has decreased by 32% over the last 6 months while retention improved by 8%.",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      action: "Maintain current marketing mix",
      trend: "positive"
    },
    {
      title: "Product B & D Underperformance",
      description: "Products B and D are currently missing targets by 14.3% and 17.4% respectively.",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      action: "Review pricing strategy",
      trend: "negative"
    },
    {
      title: "Q2 Revenue Decline",
      description: "Q2 revenue fell 13.6% below target, primarily due to seasonal factors and supply chain delays.",
      icon: <BarChart className="h-5 w-5 text-red-500" />,
      action: "Diversify suppliers",
      trend: "negative"
    }
  ];

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  const handleShare = () => {
    toast.success('Report shared successfully!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pl-[70px]">
        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive data visualization and insights for strategic decision-making
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport} className="gap-2">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Report
                </Button>
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Insights
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="overflow-hidden border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                            <h3 className="text-2xl font-bold mt-2">$525,000</h3>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                <ArrowUp className="h-3 w-3 mr-1" /> 
                                8.5% vs Target
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-blue-500/10 p-3 rounded-full">
                            <CreditCard className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                          <div className="h-1 bg-blue-500 rounded" style={{ width: '87.5%' }}></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-l-4 border-l-emerald-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Customer Satisfaction</p>
                            <h3 className="text-2xl font-bold mt-2">78%</h3>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                                <ArrowUp className="h-3 w-3 mr-1" /> 
                                3.2% vs Last Month
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-emerald-500/10 p-3 rounded-full">
                            <Users className="h-5 w-5 text-emerald-500" />
                          </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                          <div className="h-1 bg-emerald-500 rounded" style={{ width: '78%' }}></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Units Sold</p>
                            <h3 className="text-2xl font-bold mt-2">4,250</h3>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                                <ArrowUp className="h-3 w-3 mr-1" /> 
                                12.7% vs Target
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-purple-500/10 p-3 rounded-full">
                            <ShoppingCart className="h-5 w-5 text-purple-500" />
                          </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                          <div className="h-1 bg-purple-500 rounded" style={{ width: '85%' }}></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-l-4 border-l-amber-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Delivery On-Time</p>
                            <h3 className="text-2xl font-bold mt-2">92%</h3>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                                <ArrowUp className="h-3 w-3 mr-1" /> 
                                5.8% vs Industry Avg
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-amber-500/10 p-3 rounded-full">
                            <TrendingUp className="h-5 w-5 text-amber-500" />
                          </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                          <div className="h-1 bg-amber-500 rounded" style={{ width: '92%' }}></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                {/* Main Charts */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="overflow-hidden border-t-4 border-t-blue-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Quarterly Performance</CardTitle>
                            <CardDescription>Actual vs Target by Quarter</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ComparisonBarChart 
                          data={comparisonData}
                          title=""
                        />
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex items-center">
                            <ArrowUp className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="font-medium">Q3 & Q4 exceeded targets</span>
                          </div>
                          <div className="flex items-center">
                            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="font-medium">Q2 underperformed by 13.6%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden border-t-4 border-t-purple-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Performance Metrics</CardTitle>
                            <CardDescription>Current vs Industry Benchmark</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <RadarComparisonChart 
                          data={radarData}
                          title=""
                        />
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex items-center">
                            <ArrowUp className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="font-medium">Sales & HR exceed benchmarks</span>
                          </div>
                          <div className="flex items-center">
                            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                            <span className="font-medium">Development needs improvement</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                {/* Business Insights */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Info className="h-5 w-5 mr-2" />
                          Key Business Insights
                        </CardTitle>
                        <Button variant="outline" size="sm" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Export Insights
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {insights.map((insight, index) => (
                          <div 
                            key={index} 
                            className={`p-4 border rounded-lg ${
                              insight.trend === 'positive' 
                                ? 'border-l-4 border-l-emerald-500' 
                                : 'border-l-4 border-l-amber-500'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`mt-1 ${
                                insight.trend === 'positive' 
                                  ? 'text-emerald-500' 
                                  : 'text-amber-500'
                              }`}>
                                {insight.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{insight.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                                <Badge className="mt-3" variant="outline">
                                  Recommended: {insight.action}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-t-4 border-t-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Product Performance Analysis</CardTitle>
                          <CardDescription>Actual vs Target by Product</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Download Data
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ComparisonBarChart 
                        data={productPerformanceData}
                        title=""
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Best Performer</h4>
                            <Badge className="bg-emerald-500/10 text-emerald-500">+6.7%</Badge>
                          </div>
                          <p className="text-2xl font-bold">Product C</p>
                          <p className="text-sm text-muted-foreground mt-1">Exceeded target by $20,000</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Worst Performer</h4>
                            <Badge className="bg-red-500/10 text-red-500">-17.4%</Badge>
                          </div>
                          <p className="text-2xl font-bold">Product D</p>
                          <p className="text-sm text-muted-foreground mt-1">Missing target by $40,000</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Overall</h4>
                            <Badge className="bg-blue-500/10 text-blue-500">+5.2%</Badge>
                          </div>
                          <p className="text-2xl font-bold">$1.21M</p>
                          <p className="text-sm text-muted-foreground mt-1">vs Target of $1.15M</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="overflow-hidden border-t-4 border-t-purple-500">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Time on Market</CardTitle>
                            <CardDescription>Average Days Product Spends in Market</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TimeSeriesChart 
                          data={[
                            { date: 'Jan', value: 32 },
                            { date: 'Feb', value: 28 },
                            { date: 'Mar', value: 35 },
                            { date: 'Apr', value: 40 },
                            { date: 'May', value: 38 },
                            { date: 'Jun', value: 30 },
                            { date: 'Jul', value: 25 },
                          ]}
                          title=""
                          valueFormatter={(val) => `${val.toFixed(0)} days`}
                        />
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex items-center">
                            <ArrowDown className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="font-medium">-21.9% since January</span>
                          </div>
                          <Badge variant="outline">Trend: Improving</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden border-t-4 border-t-amber-500">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Customer Acquisition Cost</CardTitle>
                            <CardDescription>Cost per New Customer</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TimeSeriesChart 
                          data={[
                            { date: 'Jan', value: 125 },
                            { date: 'Feb', value: 118 },
                            { date: 'Mar', value: 105 },
                            { date: 'Apr', value: 98 },
                            { date: 'May', value: 92 },
                            { date: 'Jun', value: 88 },
                            { date: 'Jul', value: 85 },
                          ]}
                          title=""
                          valueFormatter={(val) => `$${val.toFixed(0)}`}
                        />
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex items-center">
                            <ArrowDown className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="font-medium">-32% since January</span>
                          </div>
                          <Badge variant="outline">Trend: Improving</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Forecast Tab */}
              <TabsContent value="forecast" className="space-y-6">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-t-4 border-t-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Revenue Forecast</CardTitle>
                          <CardDescription>Current Revenue and 12-Month Projection</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Badge variant="outline">
                            <Info className="h-3.5 w-3.5 mr-1" />
                            AI-Generated
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <TimeSeriesChart 
                        data={timeSeriesData}
                        title=""
                        valueFormatter={(val) => `$${(val/1000).toFixed(0)}K`}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-sm">YTD Revenue</h4>
                          <p className="text-2xl font-bold mt-1">$452,000</p>
                          <Badge className="mt-2 bg-emerald-500/10 text-emerald-500">
                            <ArrowUp className="h-3 w-3 mr-1" /> 
                            +8.3% vs Last Year
                          </Badge>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-sm">Year-End Forecast</h4>
                          <p className="text-2xl font-bold mt-1">$982,000</p>
                          <Badge className="mt-2 bg-emerald-500/10 text-emerald-500">
                            <ArrowUp className="h-3 w-3 mr-1" /> 
                            +12.7% vs Last Year
                          </Badge>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-sm">Average Growth Rate</h4>
                          <p className="text-2xl font-bold mt-1">7.3%</p>
                          <Badge className="mt-2 bg-blue-500/10 text-blue-500">
                            <Info className="h-3 w-3 mr-1" /> 
                            Month-over-Month
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="overflow-hidden border-t-4 border-t-purple-500">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Market Share Projection</CardTitle>
                            <CardDescription>Expected Market Share Growth</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TimeSeriesChart 
                          data={[
                            { date: 'Q1 2023', value: 15.2 },
                            { date: 'Q2 2023', value: 16.5 },
                            { date: 'Q3 2023', value: 17.8 },
                            { date: 'Q4 2023', value: 18.5 },
                            { date: 'Q1 2024', value: null, forecast: 19.3 },
                            { date: 'Q2 2024', value: null, forecast: 20.2 },
                            { date: 'Q3 2024', value: null, forecast: 21.0 },
                            { date: 'Q4 2024', value: null, forecast: 22.5 },
                          ]}
                          title=""
                          valueFormatter={(val) => `${val.toFixed(1)}%`}
                        />
                        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Analysis</p>
                              <p className="text-xs text-muted-foreground mt-1">Market share is projected to increase by 21.6% over the next year, driven by new product launches and expanding into adjacent markets.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="overflow-hidden border-t-4 border-t-amber-500">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Customer Growth</CardTitle>
                            <CardDescription>New Customers per Quarter</CardDescription>
                          </div>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TimeSeriesChart 
                          data={[
                            { date: 'Q1 2023', value: 350 },
                            { date: 'Q2 2023', value: 420 },
                            { date: 'Q3 2023', value: 480 },
                            { date: 'Q4 2023', value: 510 },
                            { date: 'Q1 2024', value: null, forecast: 550 },
                            { date: 'Q2 2024', value: null, forecast: 600 },
                            { date: 'Q3 2024', value: null, forecast: 650 },
                            { date: 'Q4 2024', value: null, forecast: 700 },
                          ]}
                          title=""
                          valueFormatter={(val) => val.toFixed(0)}
                        />
                        <div className="mt-4 p-3 bg-amber-500/10 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Key Drivers</p>
                              <p className="text-xs text-muted-foreground mt-1">Customer growth is accelerating with each quarter, primarily due to improved product offerings and reduced CAC. At the current trajectory, we expect to exceed 2,500 new customers by year end.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
                
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Forecast Insights & Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">Key Insights</h3>
                          <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                              <div className="bg-blue-500/10 p-2 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-blue-500" />
                              </div>
                              <div>
                                <p className="font-medium">Revenue Growth Trajectory</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Revenue is projected to grow 15% over the next 6 months, with Q4 expected to be particularly strong.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 items-start">
                              <div className="bg-emerald-500/10 p-2 rounded-lg">
                                <Users className="h-5 w-5 text-emerald-500" />
                              </div>
                              <div>
                                <p className="font-medium">Customer Acquisition</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Customer acquisition rates are improving with each quarter while CAC continues to decrease.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 items-start">
                              <div className="bg-amber-500/10 p-2 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                              </div>
                              <div>
                                <p className="font-medium">Market Competition</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Market share is projected to grow despite increasing competition in Q3 and Q4.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium">Recommendations</h3>
                          <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                              <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                              <div>
                                <p className="font-medium">Increase Product C inventory by 15%</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Based on growth projections and historical performance.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 items-start">
                              <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                              <div>
                                <p className="font-medium">Review pricing strategy for Products B & D</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Consider competitive pricing analysis to improve performance.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 items-start">
                              <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                              <div>
                                <p className="font-medium">Expand marketing for Q4 seasonal push</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Allocate additional 12% to digital marketing budget for Q4.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Report Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="mt-6 border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose">
                  <p>
                    This report provides a comprehensive analysis of our business performance across key metrics. 
                    The data indicates strong growth in Q3 and Q4, exceeding targets by approximately 17% and 10% respectively.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        Key Strengths
                      </h4>
                      <ul className="space-y-1 text-sm ml-6 list-disc">
                        <li>Product C continues to be our top performer, exceeding targets by 6.7%</li>
                        <li>Customer acquisition costs decreased by 32% since January</li>
                        <li>Delivery performance at 92%, significantly above industry average</li>
                        <li>Sales and HR teams outperforming industry benchmarks</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1 text-sm ml-6 list-disc">
                        <li>Products B and D are underperforming against targets</li>
                        <li>Development team performance is below industry benchmark</li>
                        <li>Customer satisfaction at 78% vs target of 85%</li>
                        <li>Q2 revenue fell short of targets by 13.6%</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4">
                    The forecast section shows promising growth trends, with revenue expected to increase by 15% over the next six months
                    and market share projected to grow from 18.5% to 22.5% by the end of next year.
                  </p>
                  <p>
                    <strong>Strategic Recommendations:</strong>
                  </p>
                  <ol className="space-y-1 text-sm ml-6 list-decimal">
                    <li>Increase inventory of Product C by 15% to capitalize on strong performance</li>
                    <li>Review pricing strategy for Products B and D to address underperformance</li>
                    <li>Maintain current marketing mix given the efficiency improvements in customer acquisition</li>
                    <li>Develop strategies to improve customer satisfaction scores to reach the 85% target</li>
                    <li>Allocate additional resources to the Development team to improve performance metrics</li>
                  </ol>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Report;
