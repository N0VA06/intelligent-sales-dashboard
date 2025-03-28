
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowRight, BookOpen, Building, Briefcase, FileText, GraduationCap, PenTool, Users } from 'lucide-react';
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
                <h1 className="text-3xl font-bold tracking-tight">Victor Cubillos</h1>
                <p className="text-muted-foreground">
                  Candidate for UACH Rector 2025-2029
                </p>
              </div>
              <Button className="gap-2 w-full md:w-auto">
                <BookOpen className="h-4 w-4" />
                Program Proposal
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
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">Rector Candidate</Badge>
                    <h2 className="text-3xl font-bold">Responsible leadership for the future of UACH</h2>
                    <p className="text-muted-foreground">
                      The Austral University of Chile faces an unprecedented financial crisis. It's time for leadership that addresses current challenges with transparency and effectiveness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button className="gap-2">
                        Explore the proposal
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/90 to-primary h-[320px] md:h-auto flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white mx-auto mb-4 overflow-hidden">
                      {/* Profile image of Victor Cubillos */}
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <PenTool className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-semibold">Dr. Victor Cubillos</h3>
                    <p className="text-white/80 mt-1">Faculty of Medicine Academic</p>
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
            <Tabs defaultValue="propuesta" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="propuesta">Proposal</TabsTrigger>
                <TabsTrigger value="trayectoria">Background</TabsTrigger>
                <TabsTrigger value="diagnostico">UACH Assessment</TabsTrigger>
              </TabsList>
              <TabsContent value="propuesta" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Program Proposal Pillars</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Building className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Financial Recovery</h3>
                            <p className="text-sm text-muted-foreground">
                              Debt restructuring and resource optimization to ensure institutional sustainability.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Management Modernization</h3>
                            <p className="text-sm text-muted-foreground">
                              Implementation of efficient processes and a management model based on results and transparency.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Academic Excellence</h3>
                            <p className="text-sm text-muted-foreground">
                              Strengthening educational quality and developing innovative and relevant academic programs.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Community Wellbeing</h3>
                            <p className="text-sm text-muted-foreground">
                              Improving working and academic conditions for students, staff, and faculty.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Button className="gap-2">
                        View complete proposal
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Immediate Action Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                        <p>Comprehensive and transparent financial audit</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                        <p>Renegotiation of financial liabilities</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                        <p>Evaluation and optimization of academic and administrative structure</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">4</Badge>
                        <p>Implementation of effective budget control system</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">5</Badge>
                        <p>Development of new funding sources</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="trayectoria" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Academic and Professional Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Education
                          </h3>
                          <ul className="space-y-1 text-sm">
                            <li>• Doctor of Medical Sciences</li>
                            <li>• Specialist in University Administration</li>
                            <li>• Master in Institutional Management</li>
                            <li>• Medical Doctor</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Experience
                          </h3>
                          <ul className="space-y-1 text-sm">
                            <li>• Director of Medical School (2016-2020)</li>
                            <li>• Member of Academic Council (2018-2022)</li>
                            <li>• Chair of Institutional Self-Assessment Committee</li>
                            <li>• Advisor on educational innovation projects</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Achievements
                          </h3>
                          <ul className="space-y-1 text-sm">
                            <li>• 7-year accreditation for the Medical School</li>
                            <li>• Leader in community engagement projects</li>
                            <li>• Author of more than 40 scientific publications</li>
                            <li>• Academic Excellence Award 2019</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Commitment to the University</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      With more than 20 years of experience at the Austral University of Chile, I have dedicated my career to strengthening the institution from various academic and management roles. My commitment has always been to academic excellence, transparency in management, and the well-being of the entire university community.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Vision for UACH</h4>
                        <p className="text-sm text-muted-foreground">
                          A financially sustainable, academically relevant university that leads regional development and actively participates in the national and international arena.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Values</h4>
                        <p className="text-sm text-muted-foreground">
                          Honesty, transparency, commitment to excellence, respect for diversity, and sense of community.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="diagnostico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">The Current Financial Crisis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <ArrowDown className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-red-700 dark:text-red-400">
                              Critical Operational Deficit
                            </h3>
                            <p className="text-sm mt-1">
                              The Austral University faces an operational deficit of more than $6.4 million annually, a structural debt of $18 million, and financial commitments that threaten its long-term sustainability.
                            </p>
                          </div>
                        </div>
                      </div>
                      <p>
                        The financial assessment of the Austral University of Chile reveals a critical situation that requires immediate action and a medium and long-term recovery plan. External reports, such as the Crowe Report, have confirmed the severity of the situation.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="font-semibold">Main Causes</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-red-600" />
                              <span>Decreased income from free tuition policy</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-red-600" />
                              <span>Reduction in student enrollment</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-red-600" />
                              <span>Increase in operational costs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-red-600" />
                              <span>Complex organizational structure</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold">Immediate Consequences</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-amber-600" />
                              <span>Risk to institutional sustainability</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-amber-600" />
                              <span>Limitations for infrastructure investment</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-amber-600" />
                              <span>Difficulties in developing new programs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowDown className="h-4 w-4 mt-0.5 text-amber-600" />
                              <span>Deterioration of working conditions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">A Commitment to Transparency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Unlike other candidacies that have minimized the severity of the financial situation, our proposal is based on a realistic and transparent assessment. Only by recognizing the magnitude of the problem can we implement effective solutions.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View Complete Crowe Report
                      </Button>
                    </div>
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
                <CardTitle className="text-xl">Join Our Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-4">
                      The Austral University of Chile needs leadership with a vision for the future, capable of addressing current challenges with responsibility and concrete proposals.
                    </p>
                    <p>
                      Together we can build a sustainable UACH that is academically relevant and regains its leadership role in regional and national development.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Us</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Email</Badge>
                        <span className="text-sm">victor.cubillos@uach.cl</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Phone</Badge>
                        <span className="text-sm">+56 9 1234 5678</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Office</Badge>
                        <span className="text-sm">Faculty of Medicine, Isla Teja Campus</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full md:w-auto gap-2">
                        Join the team
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
