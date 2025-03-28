import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CircleDollarSign, LineChart, PieChart, BookOpen, Download, Info, Settings, Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (destination: string, path: string) => {
    navigate(path);
    toast.info(`Navegando a ${destination}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div 
      className="fixed left-0 top-0 bottom-0 w-[70px] bg-sidebar flex flex-col items-center py-8 z-10 shadow-medium"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm">
            <span className="text-primary font-semibold text-xl">U</span>
          </div>
          
          <TooltipProvider>
            <ul className="flex flex-col items-center gap-6">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleNavigation('Home', '/trends')}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${isActive('/trends') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors'}`}
                    >
                      <Home className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Home</TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleNavigation('Dashboard', '/')}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${isActive('/') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors'}`}
                    >
                      <BarChart3 className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleNavigation('Puntos Clave', '/key-points')}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${isActive('/key-points') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors'}`}
                    >
                      <CircleDollarSign className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Puntos Clave</TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleNavigation('Finanzas', '/finances')}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl ${isActive('/finances') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors'}`}
                    >
                      <LineChart className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Finanzas</TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleNavigation('Informe', '/report')}
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <BookOpen className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Informe</TooltipContent>
                </Tooltip>
              </li>
            </ul>
          </TooltipProvider>
        </div>
        
        <TooltipProvider>
          <ul className="flex flex-col items-center gap-6">
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleNavigation('Descargar informe', '/download')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Descargar informe</TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleNavigation('Información', '/info')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Información</TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleNavigation('Configuración', '/settings')}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Configuración</TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default Sidebar;
