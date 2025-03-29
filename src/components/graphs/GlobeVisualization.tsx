import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';

// Globe Visualization Component using Canvas API instead of Three.js
const GlobeVisualization = ({ data, isVisible }) => {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef(null);
  const globeDataRef = useRef(data);

  useEffect(() => {
    setIsClient(true);
    globeDataRef.current = data;
  }, [data]);

  // Initialize canvas drawing
  useEffect(() => {
    if (!isClient || !canvasRef.current || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    setCanvasDimensions();
    
    // Globe parameters
    const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Animation variables
    let rotation = 0;
    
    // Draw the globe and data points
    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw globe (blue sphere with gradient)
      const gradient = ctx.createRadialGradient(
        centerX - globeRadius * 0.3, 
        centerY - globeRadius * 0.3, 
        0,
        centerX, 
        centerY, 
        globeRadius
      );
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.9)');
      gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.8)');
      gradient.addColorStop(1, 'rgba(30, 64, 175, 0.7)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw a subtle grid on the globe for 3D effect
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          centerX, 
          centerY, 
          globeRadius * Math.abs(Math.cos(angle)), 
          globeRadius, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.stroke();
      }
      
      // Draw latitude lines
      for (let i = 1; i < 6; i++) {
        const size = globeRadius * (i / 6);
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      
      // Draw data points
      globeDataRef.current.forEach(point => {
        // Convert lat/lng to position on the circle (with rotation)
        const lat = point.lat * (Math.PI / 180);
        const lng = (point.lng + 180) * (Math.PI / 180) + rotation;
        
        // Calculate 3D position
        const x = centerX + globeRadius * Math.cos(lat) * Math.cos(lng);
        const y = centerY + globeRadius * Math.sin(lat);
        const z = Math.cos(lat) * Math.sin(lng); // Used for sizing/opacity
        
        // Only draw points on the visible side of the globe
        if (z < 0) {
          // Calculate point size based on value
          const normalizedValue = Math.max(0.5, Math.min(1.5, point.value / 5000000));
          const pointSize = 5 * normalizedValue;
          
          // Draw glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pointSize * 3);
          gradient.addColorStop(0, point.color || 'rgba(255, 100, 50, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, pointSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Draw point
          ctx.beginPath();
          ctx.arc(x, y, pointSize, 0, Math.PI * 2);
          ctx.fillStyle = point.color || '#ff6432';
          ctx.fill();
          
          // Add pulsating effect
          const pulseSize = pointSize * (1.2 + 0.3 * Math.sin(Date.now() * 0.003));
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `${point.color || '#ff6432'}40`; // 40 = 25% opacity
          ctx.fill();
          
          // Add city name label
          if (point.name) {
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(point.name, x, y - pointSize - 8);
            
            // Add value below
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '8px sans-serif';
            ctx.fillText(`$${(point.value / 1000000).toFixed(1)}M`, x, y - pointSize - 0);
          }
        }
      });
      
      // Update rotation
      rotation += 0.005;
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(drawGlobe);
    };
    
    // Start animation
    drawGlobe();
    
    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          <CardTitle>Global Sales Distribution</CardTitle>
        </div>
        <CardDescription>
          3D visualization of sales around the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-background rounded-md flex items-center justify-center relative">
          {!isClient ? (
            <div className="text-center text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-2" />
              <p>Loading globe visualization...</p>
            </div>
          ) : (
            <canvas 
              ref={canvasRef} 
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
