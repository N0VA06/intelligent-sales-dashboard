
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, HelpCircle, BookOpen, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { toast } from 'sonner';

const Finances = () => {
  const handleLearnMore = (section: string) => {
    toast.info(`Navigating to section: ${section}`);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      
      <div className="pl-[70px]">
        <Header />
        
        <main className="pb-16">
          <div className="container px-4 mx-auto">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">UACH Financial Reform</h2>
              <p className="text-muted-foreground">
                Concrete proposals to restore financial sustainability to our university
              </p>
            </motion.div>

            <Tabs defaultValue="diagnosis" className="w-full">
              <TabsList className="mb-6 flex flex-wrap h-auto p-1 gap-1">
                <TabsTrigger value="diagnosis" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Diagnosis
                </TabsTrigger>
                <TabsTrigger value="proposals" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Proposals
                </TabsTrigger>
                <TabsTrigger value="implementation" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Implementation
                </TabsTrigger>
                <TabsTrigger value="impact" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Expected Impact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diagnosis" className="space-y-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-primary" />
                        Structural Deficit
                      </CardTitle>
                      <CardDescription>
                        The current financial situation of UACH
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        The Austral University faces a structural deficit of more than <span className="font-bold text-destructive">$10 billion annually</span>, 
                        with accumulated debt exceeding <span className="font-bold text-destructive">$53 billion</span>.
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Imbalance between operating income and expenses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Disproportionate salary structure (70% of budget)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Poor financial management at the institutional level</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={() => handleLearnMore('deficit')}>
                        View details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Main Causes
                      </CardTitle>
                      <CardDescription>
                        Factors that have generated the financial crisis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        The Crowe report identifies multiple structural and management factors that explain
                        the institutional financial crisis.
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Unsustainable and non-transparent funding model</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Absence of effective budget control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Lack of austerity policies and resource optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Complex organizational structure and duplication of functions</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={() => handleLearnMore('causes')}>
                        View details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Crowe Report Summary
                    </CardTitle>
                    <CardDescription>
                      Main conclusions of the financial diagnosis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p>
                        The report prepared by Crowe Audit in 2020 concludes that the Austral University
                        faces a structural financial crisis that requires urgent and deep measures.
                        Among its main findings are:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-primary">Financial Position</h4>
                          <p className="text-sm">
                            Severe deterioration of institutional equity, with risk of insolvency
                            in the medium term if corrective measures are not implemented.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-primary">Liquidity</h4>
                          <p className="text-sm">
                            Liquidity indicators at critical levels, with difficulties in meeting
                            short-term obligations and limited access to financing.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-primary">Debt</h4>
                          <p className="text-sm">
                            Disproportionate debt levels for a university institution,
                            with financial costs that aggravate the operational deficit.
                          </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-primary">Management</h4>
                          <p className="text-sm">
                            Significant deficiencies in financial control systems and
                            budgetary decision-making processes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proposals" className="space-y-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Structural Reform</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Comprehensive review of internal funding model</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Implementation of results-based budgets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Reorganization of inefficient academic units</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Financial Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Implementation of institutional austerity policy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Review and adjustment of salary structure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Responsible reduction of operational costs</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Income Generation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Strengthening of postgraduate and continuing education offerings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Expansion of consulting and technical assistance services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Development of strategic alliances with the productive sector</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Restructuring Plan</CardTitle>
                    <CardDescription>
                      Concrete actions to achieve sustainability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-primary mb-3">Short term (1-2 years)</h4>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Complete audit of institutional expenses and elimination of duplicities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Implementation of strict budgetary controls</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Renegotiation of debts and financial obligations</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary mb-3">Medium term (3-5 years)</h4>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Redesign of organizational and administrative structure</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Strengthening of income-generating units</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>Implementation of strategic plan for income diversification</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="implementation" className="space-y-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Roadmap</CardTitle>
                      <CardDescription>
                        Stages for the gradual implementation of reforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative pl-6 border-l border-primary/30 space-y-8">
                        <div className="relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-medium text-lg mb-2">Phase 1: Detailed Diagnosis</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            First quarter 2023
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Detailed analysis of income and expenses by unit</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Administrative efficiency evaluation</span>
                            </li>
                          </ul>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-medium text-lg mb-2">Phase 2: Immediate Measures</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Second quarter 2023
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Implementation of expense controls</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Freezing of non-essential hiring</span>
                            </li>
                          </ul>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <h4 className="font-medium text-lg mb-2">Phase 3: Structural Reform</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Third and fourth quarter 2023
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Reorganization of academic units</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Implementation of new budgetary model</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Stakeholders</CardTitle>
                      <CardDescription>
                        Responsibilities in the implementation process
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Rectorate</h4>
                          <p className="text-sm mb-3">
                            Strategic leadership and institutional representation
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Direction of the restructuring process</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Communication with external stakeholders</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Academic Council</h4>
                          <p className="text-sm mb-3">
                            Validation of academic and structural changes
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Approval of academic policies</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Evaluation of impact on educational quality</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Financial Direction</h4>
                          <p className="text-sm mb-3">
                            Technical implementation of financial reforms
                          </p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Design of new budgetary systems</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>Monitoring of financial indicators</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Management</CardTitle>
                    <CardDescription>
                      Strategies to facilitate the transformation process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-xl">1</span>
                        </div>
                        <h4 className="font-medium">Transparent Communication</h4>
                        <p className="text-sm text-muted-foreground">
                          Develop comprehensive communication plan that explains the need
                          and benefits of reforms to all stakeholders.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-xl">2</span>
                        </div>
                        <h4 className="font-medium">Active Participation</h4>
                        <p className="text-sm text-muted-foreground">
                          Involve representatives from all stakeholders in the design
                          and implementation of change initiatives.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-xl">3</span>
                        </div>
                        <h4 className="font-medium">Capacity Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Train staff in new processes and tools to
                          facilitate adoption of changes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Indicators</CardTitle>
                    <CardDescription>
                      Key metrics to evaluate the progress of the recovery plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium text-primary">Operational Deficit</h4>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold">-50%</span>
                          <span className="text-sm text-muted-foreground">in 3 years</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reduction of annual operational deficit to less than $5 billion
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium text-primary">Liquidity Ratio</h4>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold">1.2</span>
                          <span className="text-sm text-muted-foreground">or higher</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Improved ability to meet short-term obligations
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium text-primary">Personnel Expenses</h4>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold">60%</span>
                          <span className="text-sm text-muted-foreground">of budget</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reduction of the proportion of personnel expenses to income
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium text-primary">Diversification</h4>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold">+20%</span>
                          <span className="text-sm text-muted-foreground">own income</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Increase in income from services and non-traditional activities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Projection</CardTitle>
                      <CardDescription>
                        Expected scenario after implementation of measures
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="font-medium">Year 1</h4>
                          <div className="w-full bg-muted/50 h-4 rounded-full overflow-hidden">
                            <div className="bg-destructive h-full w-[85%]"></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Deficit: $8.5 billion</span>
                            <span className="text-destructive">-15% vs. current</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Year 3</h4>
                          <div className="w-full bg-muted/50 h-4 rounded-full overflow-hidden">
                            <div className="bg-warning h-full w-[50%]"></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Deficit: $5 billion</span>
                            <span className="text-warning">-50% vs. current</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Year 5</h4>
                          <div className="w-full bg-muted/50 h-4 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[10%]"></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Deficit: $1 billion</span>
                            <span className="text-primary">-90% vs. current</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Year 7+</h4>
                          <div className="w-full bg-muted/50 h-4 rounded-full overflow-hidden">
                            <div className="bg-success h-full w-[20%] translate-x-full"></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Surplus: $2 billion</span>
                            <span className="text-success">Financial balance</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Long-term Benefits</CardTitle>
                      <CardDescription>
                        Positive impact after financial recovery
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <BarChart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Financial Stability</h4>
                            <p className="text-sm text-muted-foreground">
                              Long-term planning capacity and generation of funds for investment
                              in infrastructure and equipment.
                            </p>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Academic Quality</h4>
                            <p className="text-sm text-muted-foreground">
                              Resources to strengthen academic programs, research and
                              hiring of excellent academics.
                            </p>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Institutional Autonomy</h4>
                            <p className="text-sm text-muted-foreground">
                              Less dependence on external financing and greater capacity for decision-making
                              on institutional development.
                            </p>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <ArrowRight className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Regional Positioning</h4>
                            <p className="text-sm text-muted-foreground">
                              Strengthening UACH's position as a leading institution
                              in southern Chile and a reference in the austral macrozone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <footer className="py-4 border-t border-border/40 mt-8">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                UACH Financial Reform Plan - Based on the Crowe Audit report
              </p>
              <p className="text-sm text-muted-foreground">
                Proposals for the 2023-2030 period
              </p>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default Finances;
