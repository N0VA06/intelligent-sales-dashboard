import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Check, Lightbulb, XCircle, TrendingDown, Target, PiggyBank, Book } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

// Animation for elements entrance
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const KeyPoints = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Sidebar />
      
      <div className="pl-[70px]">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold mb-2">Sales Performance Dashboard</h1>
            <p className="text-muted-foreground">
              Quarterly sales analysis and strategic insights for Q2 2024
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8"
          >
            {/* Current Performance */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-l-8 border-l-destructive">
                <CardHeader className="bg-destructive/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <CardTitle>Current Sales Performance</CardTitle>
                  </div>
                  <CardDescription>
                    Key metrics and critical observations from recent sales data
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-5 w-5 text-destructive" />
                          <span>Revenue Challenges</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Total quarterly revenue at $4.2 million, 15% below target.</li>
                          <li>Consistent underperformance in enterprise software segment.</li>
                          <li>Customer acquisition cost increased by 22% compared to last quarter.</li>
                          <li>Churn rate elevated at 8.5%, significantly above industry benchmark of 5%.</li>
                          <li>Conversion rates dropped from 3.2% to 2.7% across key product lines.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span>Sales Channel Performance</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Direct sales team struggling with 35% of quota attainment.</li>
                          <li>Online channel showing minimal growth, only 2.3% increase.</li>
                          <li>Partner network generating 40% less revenue than projected.</li>
                          <li>Average deal size shrinking from $85,000 to $62,000.</li>
                          <li>Sales cycle length extended by 18 days on average.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span>Product Line Analysis</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Cloud solution sales down 25% quarter-over-quarter.</li>
                          <li>Enterprise security products remain only bright spot with 12% growth.</li>
                          <li>Legacy product lines contributing to 60% of total revenue.</li>
                          <li>New product launches underperforming with only 1.5% market penetration.</li>
                          <li>Pricing strategy inconsistent across different market segments.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Causes */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-l-8 border-l-amber-500">
                <CardHeader className="bg-amber-500/10">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-amber-500" />
                    <CardTitle>Root Causes of Sales Decline</CardTitle>
                  </div>
                  <CardDescription>
                    Identifying key factors impacting sales performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">1</span>
                        Market Misalignment
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Product offerings not fully aligned with current market needs. 
                        Insufficient market research and slow adaptation to emerging customer requirements.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">2</span>
                        Sales Enablement Gaps
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Inadequate training and support for sales teams. Outdated sales collateral 
                        and lack of effective sales enablement tools hampering performance.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">3</span>
                        Competitive Pressure
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Increased market competition with more agile competitors offering 
                        more innovative solutions at competitive pricing.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">4</span>
                        Customer Experience Challenges
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Declining customer satisfaction due to complex onboarding processes, 
                        slow technical support, and limited post-sales engagement.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">5</span>
                        Technological Lag
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Failure to integrate advanced sales technologies like AI-driven 
                        lead scoring, predictive analytics, and automated follow-up systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Solutions */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-l-8 border-l-green-500">
                <CardHeader className="bg-green-500/10">
                  <div className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-green-500" />
                    <CardTitle>Strategic Sales Improvement Plan</CardTitle>
                  </div>
                  <CardDescription>
                    Actionable strategies to revitalize sales performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="solution-1">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-green-600" />
                          <span>Product Strategy Realignment</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Conduct comprehensive market research to identify unmet customer needs.</li>
                          <li>Develop 2-3 new product variants targeting specific market segments.</li>
                          <li>Sunset underperforming product lines with less than 5% market share.</li>
                          <li>Implement agile product development cycle with quarterly iterations.</li>
                          <li>Establish dedicated innovation team for continuous product enhancement.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: 20% revenue growth potential</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-2">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-5 w-5 text-green-600" />
                          <span>Sales Enablement Transformation</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Implement AI-powered sales intelligence platform.</li>
                          <li>Develop comprehensive sales training program with quarterly workshops.</li>
                          <li>Create personalized sales playbooks for each product line.</li>
                          <li>Introduce performance-based compensation restructuring.</li>
                          <li>Establish mentorship program pairing top performers with newer sales representatives.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: 30% improvement in sales productivity</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-3">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Book className="h-5 w-5 text-green-600" />
                          <span>Customer Experience Enhancement</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Redesign customer onboarding process for simplicity and speed.</li>
                          <li>Implement 24/7 multi-channel technical support.</li>
                          <li>Develop customer success program with dedicated account managers.</li>
                          <li>Create comprehensive self-service knowledge base.</li>
                          <li>Establish quarterly business review process for enterprise clients.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: Reduce churn by 50%</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-4">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                          <span>Strategic Channel Optimization</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Reevaluate and restructure partner network.</li>
                          <li>Develop targeted digital marketing campaigns.</li>
                          <li>Invest in account-based marketing strategies.</li>
                          <li>Expand direct sales team with specialized industry experts.</li>
                          <li>Implement advanced lead scoring and qualification process.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: 25% increase in qualified leads</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-8 p-4 rounded-lg bg-green-50 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Check className="h-5 w-5" /> Strategic Recovery Conclusion
                    </h3>
                    <p className="text-muted-foreground">
                      Full implementation of these strategies is projected to restore sales momentum 
                      within a 12-month period, with initial performance improvements expected 
                      in the first quarter. Success requires cross-functional collaboration, 
                      leadership commitment, and agile execution.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
        
        <footer className="py-4 border-t border-border/40 mt-8">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                Sales Performance Dashboard - Q2 2024
              </p>
              <p className="text-sm text-muted-foreground">
                Confidential Internal Report
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KeyPoints;
