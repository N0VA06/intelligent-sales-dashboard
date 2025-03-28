
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import ThemeToggle from './ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if user preference is already stored
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    toast.info(sidebarCollapsed ? 'Sidebar expanded' : 'Sidebar collapsed');
  };

  return (
    <div className="flex min-h-screen bg-background dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ marginLeft: '70px' }}
        animate={{ marginLeft: '70px' }}
        transition={{ duration: 0.3 }}
      >
        <div className="sticky top-0 z-20 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm border-b flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu />
          </Button>
          
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            {/* User avatar could go here */}
          </div>
        </div>
        
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
