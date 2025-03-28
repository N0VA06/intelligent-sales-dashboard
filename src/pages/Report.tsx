
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComparisonBarChart from '@/components/charts/ComparisonBarChart';
import TimeSeriesChart from '@/components/charts/TimeSeriesChart';
import RadarComparisonChart from '@/components/charts/RadarComparisonChart';
import GaugeChart from '@/components/charts/GaugeChart';
import { Button } from '@/components/ui/button';
import { Download, FileText, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const Report = () => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  const handleShare = () => {
    toast.success('Report shared successfully!');
  };

  return (
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
            <Card>
              <CardContent className="pt-6">
                <GaugeChart 
                  value={525000} 
                  min={0} 
                  max={600000}
                  title="Total Revenue"
                  subtitle="vs Target"
                  formatValue={(val) => `$${(val/1000).toFixed(0)}K`}
                />
              </CardContent>
            </Card>
            <Card>
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
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <GaugeChart 
                  value={4250} 
                  min={0} 
                  max={5000}
                  title="Units Sold"
                  subtitle="vs Forecast"
                  formatValue={(val) => val.toFixed(0)}
                />
              </CardContent>
            </Card>
            <Card>
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
                  valueFormatter={(val) => `$${val.toFixed(0)}`}
                />
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
                valueFormatter={(val) => `$${(val/1000).toFixed(0)}K`}
              />
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Summary
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
            <p>
              The forecast section shows promising growth trends, with revenue expected to increase by 15% over the next six months
              and market share projected to grow from 18.5% to 22.5% by the end of next year.
            </p>
            <p>
              <strong>Key recommendations:</strong>
            </p>
            <ul>
              <li>Continue investing in Product C, which is our best performer exceeding targets by 6.7%</li>
              <li>Address underperformance in Products B and D, which are currently below targets</li>
              <li>Maintain the effectiveness of our delivery systems which are a key competitive advantage</li>
              <li>Develop strategies to improve customer satisfaction scores to reach our 85% target</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
