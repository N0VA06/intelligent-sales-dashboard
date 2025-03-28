
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="py-6 mb-8 border-b border-border/40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-soft">
              <span className="text-white font-semibold text-xl">U</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium text-foreground">
                Dashboard Financiero UACH
              </h1>
              <p className="text-sm text-muted-foreground">
                Visualización de indicadores económicos
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 rounded-full">
              <p className="text-sm font-medium">
                <span className="text-muted-foreground mr-2">Período:</span>
                <span className="text-foreground">2015-2019</span>
              </p>
            </div>
            <div className="glass-card px-4 py-2 rounded-full">
              <p className="text-sm font-medium">
                <span className="text-muted-foreground mr-2">Informe:</span>
                <span className="text-foreground">Crowe Audit</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
