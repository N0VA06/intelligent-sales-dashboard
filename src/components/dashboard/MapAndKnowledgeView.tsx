
import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegionalSalesMap from '../maps/RegionalSalesMap';
import SalesKnowledgeGraph from '../graphs/SalesKnowledgeGraph';
import { RegionalSales } from '@/types';

interface MapAndKnowledgeViewProps {
  selectedView: string;
  filteredRegions: RegionalSales[];
}

const MapAndKnowledgeView: React.FC<MapAndKnowledgeViewProps> = ({
  selectedView,
  filteredRegions
}) => {
  return (
    <>
      {/* Map View */}
      {selectedView === 'map' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-[calc(100vh-300px)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MapIcon className="h-5 w-5 mr-2 text-primary" /> Regional Sales Distribution
              </CardTitle>
              <CardDescription>Geographic visualization of sales performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">
              <RegionalSalesMap data={filteredRegions} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Knowledge Graph View */}
      {selectedView === 'knowledge' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-[calc(100vh-300px)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Layers className="h-5 w-5 mr-2 text-primary" /> Sales Knowledge Graph
              </CardTitle>
              <CardDescription>Relationships between products, customers, regions and channels</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">
              <SalesKnowledgeGraph />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default MapAndKnowledgeView;
