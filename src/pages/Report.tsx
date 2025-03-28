import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComparisonBarChart from '@/components/charts/ComparisonBarChart';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import RadarComparisonChart from '@/components/charts/RadarComparisonChart';
import GaugeChart from '@/components/charts/GaugeChart';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText, 
  Share2, 
  Home, 
  BarChart2, 
  TrendingUp, 
  Settings, 
  Users, 
  AlertTriangle, 
  ChevronRight,
  Info,
  ArrowUp,
  ArrowDown,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const Report = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  // Calculate performance metrics and insights
  const totalRevenue = comparisonData.reduce((sum, item) => sum + item.actual, 0);
  const totalTarget = comparisonData.reduce((sum, item) => sum + item.target, 0);
  const revenuePerformance = (totalRevenue / totalTarget * 100).toFixed(1);
  
  const productPerformanceMetrics = productPerformanceData.map(product => {
    const performance = (product.actual / product.target * 100).toFixed(1);
    const variance = product.actual - product.target;
    const variancePercent = (variance / product.target * 100).toFixed(1);
    return {
      name: product.name,
      performance,
      variance,
      variancePercent,
      isPositive: product.actual >= product.target
    };
  });

  const topPerformer = [...productPerformanceMetrics].sort((a, b) => b.performance - a.performance)[0];
  const underPerformer = [...productPerformanceMetrics].sort((a, b) => a.performance - b.performance)[0];

  // Market share data analysis
  const marketShareData = [
    { date: 'Q1 2023', value: 15.2 },
    { date: 'Q2 2023', value: 16.5 },
    { date: 'Q3 2023', value: 17.8 },
    { date: 'Q4 2023', value: 18.5 },
    { date: 'Q1 2024', value: null, forecast: 19.3 },
    { date: 'Q2 2024', value: null, forecast: 20.2 },
    { date: 'Q3 2024', value: null, forecast: 21.0 },
    { date: 'Q4 2024', value: null, forecast: 22.5 },
  ];

  const marketShareGrowth = ((marketShareData[3].value - marketShareData[0].value) / marketShareData[0].value * 100).toFixed(1);
  const projectedGrowth = ((marketShareData[7].forecast - marketShareData[3].value) / marketShareData[3].value * 100).toFixed(1);

  // Key alerts and notifications
  const alerts = [
    { type: 'warning', message: 'Product B is 14.3% below target' },
    { type: 'warning', message: 'Product D is 17.4% below target' },
    { type: 'success', message: 'Product C exceeding target by 6.7%' },
    { type: 'info', message: 'Customer satisfaction at 78% vs 85% target' },
    { type: 'success', message: 'Delivery performance at 92%, exceeding expectations' }
  ];

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  const handleShare = () => {
    toast.success('Report shared successfully!');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`bg-slate-900 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} h-screen flex flex-col`}>
        <div className={`p-4 flex ${sidebarCollapsed ? 'justify-center' : 'justify-between'} items-center border-b border-slate-700`}>
          {!sidebarCollapsed && <h2 className="text-xl font-bold">Analytics</h2>}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:bg-slate-800"
          >
            <ChevronRight className={`h-5 w-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        <div className="flex flex-col flex-grow py-4">
          <div className={`px-4 mb-6 ${sidebarCollapsed ? 'text-center' : ''}`}>
            {!sidebarCollapsed && <p className="text-sm text-slate-400 mb-2">MAIN MENU</p>}
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'} text-white hover:bg-slate-800`}
              >
                <Home className="h-5 w-5 mr-2" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'} bg-slate-800 text-white hover:bg-slate-800`}
              >
                <BarChart2 className="h-5 w-5 mr-2" />
                {!sidebarCollapsed && <span>Analytics</span>}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'} text-white hover:bg-slate-800`}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                {!sidebarCollapsed && <span>Reports</span>}
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-${sidebarCollapsed ? 'center' : 'start'} text-white hover:bg-slate-800`}
              >
                <Users className="h-5 w-5 mr-2" />
                {!sidebarCollapsed && <span>Customers</span>}
              </Button>
            </div>
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="px-4 mb-6">
                <p className="text-sm text-slate-400 mb-2">INSIGHTS</p>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start">
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <ArrowUp className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <Info className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />}
                      <p className="text-sm text-slate-300">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 mt-auto">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-white mb-2 flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-2" />
                      Top Performer
                    </h3>
                    <p className="text-sm text-slate-300 mb-1">
                      {topPerformer.name}: {topPerformer.performance}% of target
                    </p>
                    <div className="w-full bg-slate-700 h-2 rounded-full mt-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(topPerformer.performance, 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Advanced Analytics Report</h1>
              <p className="text-muted-foreground">Comprehensive data visualization and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <GaugeChart 
                      value={525000} 
                      min={0} 
                      max={600000}
                      title="Total Revenue"
                      subtitle="vs Target"
                      formatValue={(val) => `${(val/1000).toFixed(0)}K`}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={revenuePerformance > 100 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                        {revenuePerformance}% of target
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <GaugeChart 
                      value={78} 
                      min={0} 
                      max={100}
                      title="Customer Satisfaction"
                      subtitle="Average Score"
                      thresholds={{ warning: 60, danger: 40 }}
                      formatValue={(val) => `${val.toFixed(0)}%`}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-100 text-amber-800">
                        92% of target
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <GaugeChart 
                      value={4250} 
                      min={0} 
                      max={5000}
                      title="Units Sold"
                      subtitle="vs Forecast"
                      formatValue={(val) => val.toFixed(0)}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-100 text-green-800">
                        85% of forecast
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <GaugeChart 
                      value={92} 
                      min={0} 
                      max={100}
                      title="Delivery On-Time"
                      subtitle="Performance"
                      thresholds={{ warning: 70, danger: 50 }}
                      formatValue={(val) => `${val.toFixed(0)}%`}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-100 text-green-800">
                        +8% vs industry avg
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quarterly Sales Performance</CardTitle>
                    <CardDescription>Actual vs Target by Quarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComparisonBarChart 
                      data={comparisonData}
                      title=""
                    />
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Key Insights:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <ArrowUp className="h-4 w-4 text-emerald-500 mr-2" />
                          <span>Q3 and Q4 exceeded targets by 17% and 10% respectively</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowDown className="h-4 w-4 text-red-500 mr-2" />
                          <span>Q2 underperformed at 86% of target</span>
                        </li>
                        <li className="flex items-center">
                          <Info className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Year shows strong recovery in second half</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Current vs Industry Benchmark</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadarComparisonChart 
                      data={radarData}
                      title=""
                    />
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Strategic Implications:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <ArrowUp className="h-4 w-4 text-emerald-500 mr-2" />
                          <span>Sales and HR exceeding industry benchmarks</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowDown className="h-4 w-4 text-red-500 mr-2" />
                          <span>Development at 50% needs urgent attention</span>
                        </li>
                        <li className="flex items-center">
                          <Info className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Marketing and Finance require strategic investments</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance Analysis</CardTitle>
                  <CardDescription>Actual vs Target by Product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonBarChart 
                    data={productPerformanceData}
                    title=""
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900">
                      <h4 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2 flex items-center">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Top Performers
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {productPerformanceMetrics
                          .filter(product => product.isPositive)
                          .sort((a, b) => b.performance - a.performance)
                          .slice(0, 2)
                          .map((product, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{product.name}</span>
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                {product.performance}% of target
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900">
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center">
                        <ArrowDown className="h-4 w-4 mr-2" />
                        Underperforming Products
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {productPerformanceMetrics
                          .filter(product => !product.isPositive)
                          .sort((a, b) => a.performance - b.performance)
                          .slice(0, 2)
                          .map((product, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{product.name}</span>
                              <span className="font-medium text-red-600 dark:text-red-400">
                                {product.performance}% of target
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Time on Market</CardTitle>
                    <CardDescription>Average Days Product Spends in Market</CardDescription>
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
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Trend Analysis:</h4>
                      <p className="text-sm">Market time decreased 21.9% from April to July, indicating improved supply chain efficiency and faster distribution channels.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition Cost</CardTitle>
                    <CardDescription>Cost per New Customer</CardDescription>
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
                      valueFormatter={(val) => `${val.toFixed(0)}`}
                    />
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Acquisition Efficiency:</h4>
                      <p className="text-sm">CAC reduced by 32% YTD, outpacing industry average improvement of 18%. New digital marketing strategy showing strong ROI with 45% lower cost per conversion.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                  <CardDescription>Current Revenue and 12-Month Projection</CardDescription>
                </CardHeader>
                <CardContent>
                  <TimeSeriesChart 
                    data={timeSeriesData}
                    title=""
                    valueFormatter={(val) => `${(val/1000).toFixed(0)}K`}
                  />
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <h4 className="font-medium mb-2">Forecast Insights:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ArrowUp className="h-4 w-4 text-emerald-500 mr-2" />
                        <span>Projected 27% revenue growth by year-end</span>
                      </li>
                      <li className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span>Aug-Dec forecast shows accelerating growth trajectory</span>
                      </li>
                      <li className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span>Current growth rate exceeds 5-year average by 12%</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Share Projection</CardTitle>
                    <CardDescription>Expected Market Share Growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TimeSeriesChart 
                      data={marketShareData}
                      title=""
                      valueFormatter={(val) => `${val.toFixed(1)}%`}
                    />
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Market Position:</h4>
                      <p className="text-sm">Market share increased {marketShareGrowth}% in the past year. Projected to grow an additional {projectedGrowth}% by Q4 2024, positioning the company as a top 3 competitor in the industry.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Growth</CardTitle>
                    <CardDescription>New Customers per Quarter</CardDescription>
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
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <h4 className="font-medium mb-2">Growth Strategy Impact:</h4>
                      <p className="text-sm">New customer acquisition 37% higher than previous year. Expansion into emerging markets expected to drive 60% of new customer growth in Q3-Q4 2024.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose">
                <p>
                  This report provides a comprehensive overview of our business performance across key metrics. 
                  The data indicates strong quarterly growth in Q3 and Q4, exceeding targets by approximately 17% and 10% respectively.
                </p>
                <p>
                  Customer satisfaction remains high at 78%, though there's room for improvement compared to our target of 85%.
                  Our product delivery performance is excellent at 92%, significantly exceeding the industry average.
                </p>

                <div className="my-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-medium mb-2 text-lg">Strategic Implications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm text-emerald-700 dark:text-emerald-400 mb-2">Strengths to Leverage</h5>
                      <ul className="space-y-1 text-sm list-disc pl-4">
                        <li>Product C performing 6.7% above target</li>
                        <li>Delivery performance exceeding industry standards</li>
                        <li>Significant reductions in customer acquisition costs</li>
                        <li>Strong HR metrics compared to benchmarks</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-amber-700 dark:text-amber-400 mb-2">Areas for Improvement</h5>
                      <ul className="space-y-1 text-sm list-disc pl-4">
                        <li>Products B and D underperforming against targets</li>
                        <li>Development team capacity at 50% of benchmark</li>
                        <li>Marketing effectiveness gap of 15% vs industry</li>
                        <li>Customer satisfaction 7% below target goal</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p>
                  The forecast section shows promising growth trends, with revenue expected to increase by 27% over the next six months
                  and market share projected to grow from 18.5% to 22.5% by the end of next year, potentially positioning us as a top 3 
                  industry competitor.
                </p>
                <p>
                  <strong>Key recommendations:</strong>
                </p>
                <ul>
                  <li>Expand Product C production capacity by 15% to capitalize on its market success</li>
                  <li>Implement targeted improvement plans for Products B and D, focusing on pricing strategy and feature enhancement</li>
                  <li>Invest in development team expansion and training to close the 10% capability gap</li>
                  <li>Deploy customer experience improvement initiatives to bridge the 7% satisfaction gap</li>
                  <li>Leverage delivery excellence in marketing communications as a key differentiator</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Report;
