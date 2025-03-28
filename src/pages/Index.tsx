
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
      <AIAssistant />
    </>
  );
};

export default Index;
