import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe as GlobeIcon } from 'lucide-react';

// Note: You'll need to install these dependencies:
// npm install globe.gl three

const GlobeVisualization = ({ data, isVisible }) => {
  const globeContainerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [globeInstance, setGlobeInstance] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !globeContainerRef.current || !isVisible) return;

    const loadGlobe = async () => {
      try {
        // Dynamically import the globe.gl library
        const GlobeGL = (await import('globe.gl')).default;
        
        // Create routes data from sales data points
        // We'll connect all points to a fictional headquarters location
        const HQ = { lat: 37.7749, lng: -122.4194, name: 'HQ' }; // San Francisco
        
        const arcsData = data.map(point => ({
          startLat: HQ.lat,
          startLng: HQ.lng,
          endLat: point.lat,
          endLng: point.lng,
          color: point.color,
          value: point.value,
          name: point.name
        }));
        
        // Create the globe
        const globe = GlobeGL()
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
          .width(globeContainerRef.current.clientWidth)
          .height(globeContainerRef.current.clientHeight)
          .pointsData(data)
          .pointColor(d => d.color)
          .pointLabel(d => `${d.name}: $${(d.value / 1000000).toFixed(1)}M`)
          .pointRadius(d => Math.sqrt(d.value) * 0.0001 + 0.5)
          .pointAltitude(0.01)
          .arcsData(arcsData)
          .arcColor(d => d.color)
          .arcStroke(d => Math.sqrt(d.value) * 0.0001 + 0.5)
          .arcAltitude(d => Math.sqrt(d.value) * 0.00005 + 0.05)
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(2000)
          .onPointHover(point => {
            if (point) {
              globe
                .pointLabel(() => `${point.name}: $${(point.value / 1000000).toFixed(1)}M`)
                .pointRadius(d => d === point ? Math.sqrt(d.value) * 0.0001 + 1 : Math.sqrt(d.value) * 0.0001 + 0.5);
            } else {
              globe
                .pointLabel(d => `${d.name}: $${(d.value / 1000000).toFixed(1)}M`)
                .pointRadius(d => Math.sqrt(d.value) * 0.0001 + 0.5);
            }
          })
          .enablePointerInteraction(true);
          
        // Mount the globe to the DOM
        globe(globeContainerRef.current);
        
        // Store instance for cleanup
        setGlobeInstance(globe);
        
        // Add automatic rotation
        let rotationAnimation;
        let angle = 0;
        const rotateGlobe = () => {
          angle += 0.2;
          globe.pointOfView({ lat: 0, lng: angle, altitude: 2.5 });
          rotationAnimation = requestAnimationFrame(rotateGlobe);
        };
        
        // Start rotation
        rotateGlobe();
        
        // Handle resize
        const handleResize = () => {
          if (globeContainerRef.current) {
            globe
              .width(globeContainerRef.current.clientWidth)
              .height(globeContainerRef.current.clientHeight);
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          if (rotationAnimation) {
            cancelAnimationFrame(rotationAnimation);
          }
          if (globe) {
            globe._destructor();
          }
        };
      } catch (error) {
        console.error('Error loading Globe.gl:', error);
        // Show error in the DOM for debugging
        if (globeContainerRef.current) {
          globeContainerRef.current.innerHTML = `
            <div style="color: red; padding: 20px;">
              <p>Error loading Globe.gl: ${error.message}</p>
              <p>Make sure to install the required dependencies:</p>
              <pre>npm install globe.gl three</pre>
            </div>
          `;
        }
      }
    };
    
    loadGlobe();
    
  }, [data, isClient, isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <GlobeIcon className="h-5 w-5 mr-2" />
          <CardTitle>Global Sales Distribution</CardTitle>
        </div>
        <CardDescription>
          3D visualization of sales network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-background rounded-md flex items-center justify-center relative">
          {!isClient ? (
            <div className="text-center text-muted-foreground">
              <GlobeIcon className="h-12 w-12 mx-auto mb-2" />
              <p>Loading globe visualization...</p>
            </div>
          ) : (
            <div 
              ref={globeContainerRef} 
              className="w-full h-full" 
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeVisualization;
