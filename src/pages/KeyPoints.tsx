
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
            <h1 className="text-3xl font-bold mb-2">Key Points from Crowe Report</h1>
            <p className="text-muted-foreground">
              Executive summary of findings and recommendations from UACH's financial assessment
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8"
          >
            {/* Diagnosis */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden border-l-8 border-l-destructive">
                <CardHeader className="bg-destructive/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <CardTitle>Current Situation Assessment</CardTitle>
                  </div>
                  <CardDescription>
                    Critical findings about the University's financial situation
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-5 w-5 text-destructive" />
                          <span>Structural Financial Crisis</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Accumulated operational deficit of approximately $20 million between 2015-2019.</li>
                          <li>Equity reduced by 42% in the same period.</li>
                          <li>Severe illiquidity with negative working capital of -$10.434 million by 2019.</li>
                          <li>Financial debt increased from $13 million in 2015 to $28 million in 2019.</li>
                          <li>Widespread arrears with suppliers and creditors, with overdue debts of $5 million.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span>Operational Deficiencies</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Academic overload with a student/teacher ratio of 7.1 (below the average of 12.5 in similar universities).</li>
                          <li>Low utilization rate of academic infrastructure (36.4% on average).</li>
                          <li>Educational costs per student (UF 113) exceed income per student (UF 103).</li>
                          <li>Programs with low enrollment and high dropout rates generating losses of more than $3 million annually.</li>
                          <li>Inefficient management of administrative staff, with a student/staff ratio of 6.8 (below the optimal 12).</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span>Management Issues</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Absence of medium and long-term strategic financial planning.</li>
                          <li>Fragmented administrative processes without traceability or control.</li>
                          <li>Disintegrated information systems that prevent effective management.</li>
                          <li>Historical cost overruns consistently exceeding the budget by 12-15%.</li>
                          <li>Poor internal control without adequate segregation of duties.</li>
                          <li>Unreliable financial and accounting information, with multiple errors and omissions.</li>
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
                    <CardTitle>Causes of the Current Situation</CardTitle>
                  </div>
                  <CardDescription>
                    Determining factors that have led to the financial crisis
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">1</span>
                        Reactive Institutional Management
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        The university has operated without effective strategic or financial planning, 
                        responding to events instead of anticipating them. Lack of strategic thinking 
                        has prevented adaptation to the changing landscape of higher education.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">2</span>
                        Unsustainable Academic Model
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Proliferation of programs with low demand and duplication of offerings between campuses. 
                        The cost per student significantly exceeds income, generating structural losses. 
                        Academic overload and operational inefficiency aggravate the situation.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">3</span>
                        Deficient Administrative Processes
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Fragmented workflows, disintegrated systems, and weak internal control have 
                        generated severe operational inefficiencies. The lack of reliable data prevents 
                        effective and timely decision-making.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">4</span>
                        Inadequate Institutional Governance
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        University governance structures that do not promote accountability or 
                        facilitate agile decision-making. Excessive politicization of academic 
                        and administrative decisions that should be based on technical criteria.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-amber-500/20 items-center justify-center">5</span>
                        Resistance to Change
                      </h3>
                      <p className="text-muted-foreground ml-8">
                        Institutional culture reluctant to modify established practices despite their 
                        evident ineffectiveness. Absence of incentives for innovation and continuous 
                        improvement in administrative and academic processes.
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
                    <CardTitle>Proposed Solutions</CardTitle>
                  </div>
                  <CardDescription>
                    Strategic recommendations to resolve the financial crisis
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="solution-1">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-green-600" />
                          <span>Academic Restructuring</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Reduce academic offerings by 30%, eliminating deficit programs.</li>
                          <li>Increase student/teacher ratio to a minimum of 12 students per professor.</li>
                          <li>Adjust academic workload to optimize resources (30% increase in efficiency).</li>
                          <li>Unify duplicate academic departments between campuses, reducing structure by 25%.</li>
                          <li>Implement a results-based academic performance evaluation system.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: Annual savings of $6 million</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-2">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-5 w-5 text-green-600" />
                          <span>Financial Restructuring</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Refinance current debt ($28 million) with state guarantee to reduce interest.</li>
                          <li>Implement a 24-month staggered payment plan for suppliers.</li>
                          <li>Reduce administrative expenses by 20% through process optimization.</li>
                          <li>Sell non-strategic assets worth $5 million to reduce liabilities.</li>
                          <li>Establish a financial stabilization fund with at least $3 million.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: Liquidity improvement of $8 million</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-3">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Book className="h-5 w-5 text-green-600" />
                          <span>Administrative Reform</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Implement an integrated ERP for all administrative processes.</li>
                          <li>Centralize duplicate administrative functions between campuses and faculties.</li>
                          <li>Reduce administrative staff by adjusting the student/staff ratio to 12:1.</li>
                          <li>Establish a management-by-objectives system with performance indicators.</li>
                          <li>Implement a training program to professionalize university management.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: Annual savings of $3.5 million</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="solution-4">
                      <AccordionTrigger className="font-medium">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                          <span>Governance and Planning</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="ml-9 list-disc space-y-2 text-muted-foreground">
                          <li>Reform university statutes to streamline strategic decision-making.</li>
                          <li>Implement a budget-linked strategic planning system.</li>
                          <li>Establish a finance committee with external expert participation.</li>
                          <li>Create a management control unit with authority over all faculties.</li>
                          <li>Implement quarterly accountability meetings with financial and academic KPIs.</li>
                        </ul>
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                          <p className="text-sm font-medium text-green-800">Estimated impact: 25% improvement in operational efficiency</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-8 p-4 rounded-lg bg-green-50 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Check className="h-5 w-5" /> Recovery Plan Conclusion
                    </h3>
                    <p className="text-muted-foreground">
                      The comprehensive implementation of these proposals would restore financial sustainability 
                      within an estimated 36-month period, with operational balance starting from month 18. 
                      The process requires strong institutional leadership, temporary government support, 
                      and a determined commitment to structural change.
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
                UACH Financial Dashboard - Based on Crowe Audit Report
              </p>
              <p className="text-sm text-muted-foreground">
                Data from 2015-2019 period
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default KeyPoints;
