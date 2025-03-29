import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface GlobeDataPoint {
  lat: number;
  lng: number;
  name: string;
  value: number;
  color?: string;
  connections?: string[]; // IDs of connected points
}

interface GlobeArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

interface GlobeVisualizationProps {
  className?: string;
  data: GlobeDataPoint[];
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ className, data }) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // We'll dynamically load Globe.gl
    const loadGlobe = async () => {
      try {
        setGlobeLoaded(true);
      } catch (error) {
        console.error("Failed to load Globe.gl:", error);
      }
    };
    
    loadGlobe();
  }, []);
  
  useEffect(() => {
    if (!isClient || !globeEl.current || !globeLoaded) return;
    
    const initGlobe = async () => {
      try {
        // Using dynamic import for Globe.gl with explicit path
        const GlobeGL = (await import('globe.gl')).default;
        
        // Clear previous globe instances
        globeEl.current.innerHTML = '';
        
        // Generate arcs data based on connections between points
        const arcsData: GlobeArcData[] = [];
        const pointsMap = new Map(data.map(point => [point.name, point]));
        
        // Create connections between related points
        data.forEach(source => {
          if (source.connections) {
            source.connections.forEach(targetName => {
              const target = pointsMap.get(targetName);
              if (target) {
                arcsData.push({
                  startLat: source.lat,
                  startLng: source.lng,
                  endLat: target.lat,
                  endLng: target.lng,
                  color: source.color || '#ffaa00'
                });
              }
            });
          }
        });
        
        // If no explicit connections provided, connect major cities
        if (arcsData.length === 0 && data.length > 1) {
          // Connect top sales cities
          const sortedByValue = [...data].sort((a, b) => b.value - a.value);
          const topCities = sortedByValue.slice(0, Math.min(5, sortedByValue.length));
          
          topCities.forEach((source, i) => {
            for (let j = i + 1; j < topCities.length; j++) {
              const target = topCities[j];
              arcsData.push({
                startLat: source.lat,
                startLng: source.lng,
                endLat: target.lat,
                endLng: target.lng,
                color: source.color || '#ffaa00'
              });
            }
          });
          
          // Connect major regional hubs
          const regionGroups: { [key: string]: GlobeDataPoint[] } = {
            'Americas': data.filter(p => p.lng < -30),
            'Europe/Africa': data.filter(p => p.lng >= -30 && p.lng <= 60),
            'Asia/Pacific': data.filter(p => p.lng > 60)
          };
          
          Object.values(regionGroups).forEach(group => {
            if (group.length > 1) {
              // Find the city with highest sales in this region
              const hub = [...group].sort((a, b) => b.value - a.value)[0];
              // Connect it to other major cities in the region
              group.slice(1, 4).forEach(city => {
                arcsData.push({
                  startLat: hub.lat,
                  startLng: hub.lng,
                  endLat: city.lat,
                  endLng: city.lng,
                  color: hub.color || '#ffaa00'
                });
              });
            }
          });
        }
        
        // Create new instance with 'new' keyword
        const globe = new GlobeGL()
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          // Configure points (cities)
          .pointsData(data)
          .pointLat((d: GlobeDataPoint) => d.lat)
          .pointLng((d: GlobeDataPoint) => d.lng)
          .pointColor((d: GlobeDataPoint) => d.color || 'rgba(255, 100, 50, 0.8)')
          .pointRadius((d: GlobeDataPoint) => Math.sqrt(d.value) * 0.08)
          .pointAltitude(0.01)
          .pointLabel((d: GlobeDataPoint) => `${d.name}: $${d.value.toLocaleString()}`)
          // Configure arcs (connections)
          .arcsData(arcsData)
          .arcStartLat((d: GlobeArcData) => d.startLat)
          .arcStartLng((d: GlobeArcData) => d.startLng)
          .arcEndLat((d: GlobeArcData) => d.endLat)
          .arcEndLng((d: GlobeArcData) => d.endLng)
          .arcColor((d: GlobeArcData) => d.color)
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(2000)
          .arcsTransitionDuration(1000)
          .arcStroke(0.5)
          // Add custom point glow effect
          .pointsMerge(true)
          // Interactive features
          .onPointHover((point: GlobeDataPoint | null) => {
            document.body.style.cursor = point ? 'pointer' : 'default';
          });
          
        // Mount to DOM
        globe(globeEl.current);
        
        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        
        // Set initial position (view Americas)
        globe.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2.5 });
        
        // Handle window resize
        const handleResize = () => {
          if (globeEl.current) {
            const { width, height } = globeEl.current.getBoundingClientRect();
            globe.width(width);
            globe.height(height);
          }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => {
          window.removeEventListener('resize', handleResize);
          if (globe && typeof globe._destructor === 'function') {
            globe._destructor();
          }
        };
      } catch (error) {
        console.error("Error initializing globe:", error);
        
        // Fallback visualization if Globe.gl fails to load
        if (globeEl.current) {
          globeEl.current.innerHTML = '';
          const fallbackEl = document.createElement('div');
          fallbackEl.className = 'w-full h-full flex flex-col items-center justify-center';
          
          const globeCircle = document.createElement('div');
          globeCircle.className = 'w-64 h-64 rounded-full relative';
          globeCircle.style.background = 'radial-gradient(circle at 30% 30%, #60a5fa, #1e40af)';
          globeCircle.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.5)';
          
          // Add points to simulate cities
          data.forEach(point => {
            const pointEl = document.createElement('div');
            pointEl.className = 'absolute w-3 h-3 rounded-full';
            pointEl.style.backgroundColor = point.color || '#ffaa00';
            
            // Convert lat/lng to position on the globe circle
            const phi = (90 - point.lat) * (Math.PI / 180);
            const theta = (point.lng + 180) * (Math.PI / 180);
            const x = -1 * Math.sin(phi) * Math.cos(theta);
            const y = Math.cos(phi);
            const scale = 100;
            
            pointEl.style.left = `${50 + x * scale}%`;
            pointEl.style.top = `${50 - y * scale}%`;
            pointEl.style.transform = 'translate(-50%, -50%)';
            
            // Add pulse animation
            const pulse = document.createElement('div');
            pulse.className = 'absolute inset-0 rounded-full animate-ping';
            pulse.style.backgroundColor = point.color || '#ffaa00';
            pulse.style.opacity = '0.6';
            pointEl.appendChild(pulse);
            
            // Add tooltip
            pointEl.title = `${point.name}: $${point.value.toLocaleString()}`;
            
            globeCircle.appendChild(pointEl);
          });
          
          fallbackEl.appendChild(globeCircle);
          globeEl.current.appendChild(fallbackEl);
        }
      }
    };
    
    initGlobe();
  }, [data, isClient, globeLoaded]);
  
  return (
    <Card className={`${className || ''} dashboard-card h-full`}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          <CardTitle>Global Sales Distribution</CardTitle>
        </div>
        <CardDescription>
          Visualization of sales around the world
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="aspect-video md:aspect-square w-full h-full bg-background rounded-md flex items-center justify-center relative">
          {!isClient ? (
            <div className="text-center text-muted-foreground">
              <Globe className="h-16 w-16 mx-auto mb-2 animate-pulse" />
              <p>Loading globe visualization...</p>
            </div>
          ) : (
            <div ref={globeEl} className="w-full h-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeVisualization;
