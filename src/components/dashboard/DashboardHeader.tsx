
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import DateRangePicker from '../filters/DateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DashboardHeaderProps {
  dateRange: [Date | null, Date | null];
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  categories: string[];
  cities: string[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  categories,
  cities
}) => {
  return (
    <motion.header 
      className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ShoppingBag className="h-8 w-8 text-primary" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sales Dashboard</h1>
            <p className="text-sm text-muted-foreground">Interactive data visualization</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
