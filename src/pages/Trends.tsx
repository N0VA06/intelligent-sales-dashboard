import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowRight, BarChart, Briefcase, DollarSign, Package, Percent, TrendingUp, Users } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Trends = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pl-[70px]">
        <div className="container py-8 mx-auto space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Sales Performance</h1>
                <p className="text-muted-foreground">
                  Q2 2024 Sales Performance Dashboard
                </p>
              </div>
              <Button className="gap-2 w-full md:w-auto">
                <BarChart className="h-4 w-4" />
                Detailed Report
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 flex flex-col justify-center">
                  <div className="space-y-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">Sales Overview</Badge>
                    <h2 className="text-3xl font-bold">Driving Growth Through Strategic Sales</h2>
                    <p className="text-muted-foreground">
                      Our sales team has demonstrated exceptional performance, exceeding quarterly targets and expanding market reach across key product lines.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button className="gap-2">
                        Explore Insights
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <DollarSign className="h-4 w-4" />
                        Export Financial Summary
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/90 to-primary h-[320px] md:h-auto flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white mx-auto mb-4 overflow-hidden flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">$12.4M</h3>
                    <p className="text-white/80 mt-1">Total Quarterly Revenue</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Product Performance</TabsTrigger>
                <TabsTrigger value="team">Sales Team</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Percent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Profit Margin</h3>
                            <p className="text-sm text-muted-foreground">
                              Increased to 22.5%, representing a 3.2% growth from previous quarter.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Customer Acquisition</h3>
                            <p className="text-sm text-muted-foreground">
                              Added 127 new enterprise clients this quarter.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Product Diversity</h3>
                            <p className="text-sm text-muted-foreground">
                              5 new product lines launched with strong initial market response.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Market Expansion</h3>
                            <p className="text-sm text-muted-foreground">
                              Entered 2 new international markets this quarter.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Button className="gap-2">
                        Detailed Performance Report
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quarterly Targets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                        <p>Revenue Target: $12M (Achieved: $12.4M)</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                        <p>New Customer Acquisition: 100 (Achieved: 127)</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                        <p>Profit Margin Target: 20% (Achieved: 22.5%)</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">4</Badge>
                        <p>Product Line Expansion: 3 (Achieved: 5)</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">5</Badge>
                        <p>Market Expansion: 1 New Market (Achieved: 2)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Product Line Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Package className="h-5 w-5 text-primary" />
                          Top Performing Products
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>• Enterprise Software Suite (+42% Growth)</li>
                          <li>• Cloud Integration Platform (+35% Growth)</li>
                          <li>• Cybersecurity Solutions (+28% Growth)</li>
                          <li>• AI Consulting Services (+25% Growth)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Sales Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our sales team has demonstrated exceptional performance this quarter, consistently exceeding targets and driving innovative sales strategies.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Next Quarter Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-4">
                      We are positioning ourselves for continued growth by focusing on strategic market expansion, product innovation, and enhanced customer engagement.
                    </p>
                    <p>
                      Our goals include further penetrating emerging markets and launching two revolutionary product lines.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Sales Leadership</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Email</Badge>
                        <span className="text-sm">sales.leadership@company.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Phone</Badge>
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Office</Badge>
                        <span className="text-sm">Global Sales Headquarters</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full md:w-auto gap-2">
                        Schedule Consultation
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Trends;
