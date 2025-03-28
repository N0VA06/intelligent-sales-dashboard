import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample data for Indian cities with sales information
const REGIONAL_SALES_DATA = [
  { city: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, revenue: 1250000, units: 4200 },
  { city: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, revenue: 1180000, units: 3950 },
  { city: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, revenue: 980000, units: 3600 },
  { city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, revenue: 820000, units: 3100 },
  { city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, revenue: 765000, units: 2800 },
  { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, revenue: 690000, units: 2500 },
  { city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, revenue: 580000, units: 2100 },
  { city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, revenue: 520000, units: 1800 },
  { city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, revenue: 410000, units: 1500 },
  { city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, revenue: 370000, units: 1350 },
  { city: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, revenue: 320000, units: 1200 },
  { city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, revenue: 290000, units: 1100 }
];

const RegionalSalesMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode on component mount and when theme changes
  useEffect(() => {
    // Check initial theme
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches || document.documentElement.classList.contains('dark'));
    
    // Add listener for theme changes
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches || document.documentElement.classList.contains('dark'));
    };
    
    darkModeMediaQuery.addEventListener('change', handleThemeChange);
    
    // Also listen for manual theme toggle in the app
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange);
      observer.disconnect();
    };
  }, []);
  
  // Calculate geographic bounds
  const minLat = Math.min(...REGIONAL_SALES_DATA.map(d => d.lat));
  const maxLat = Math.max(...REGIONAL_SALES_DATA.map(d => d.lat));
  const minLng = Math.min(...REGIONAL_SALES_DATA.map(d => d.lng));
  const maxLng = Math.max(...REGIONAL_SALES_DATA.map(d => d.lng));
  
  // Calculate revenue ranges for visualization
  const minRevenue = Math.min(...REGIONAL_SALES_DATA.map(d => d.revenue));
  const maxRevenue = Math.max(...REGIONAL_SALES_DATA.map(d => d.revenue));
  
  // SVG dimensions
  const width = 800;
  const height = 500;
  const padding = 50;
  
  // Scale functions to convert lat/lng to SVG coordinates
  const scaleX = (lng) => {
    return ((lng - minLng) / (maxLng - minLng)) * (width - 2 * padding) + padding;
  };
  
  const scaleY = (lat) => {
    return height - (((lat - minLat) / (maxLat - minLat)) * (height - 2 * padding) + padding);
  };
  
  // Scale circle radius based on revenue
  const scaleRadius = (revenue) => {
    const minRadius = 5;
    const maxRadius = 20;
    return minRadius + ((revenue - minRevenue) / (maxRevenue - minRevenue)) * (maxRadius - minRadius);
  };
  
  // Get color based on revenue
  const getColor = (revenue) => {
    const intensity = Math.floor((revenue - minRevenue) / (maxRevenue - minRevenue) * 200);
    
    // Different color schemes for light/dark mode
    if (isDarkMode) {
      // Lighter blues for dark mode
      return `rgb(${50 + intensity}, ${100 + intensity}, 255)`;
    } else {
      // Darker blues for light mode
      return `rgb(0, 0, ${100 + intensity})`;
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Background color for SVG
  const mapBgColor = isDarkMode ? "#1f2937" : "#f8fafc"; // dark gray vs light gray
  const textColor = isDarkMode ? "#d1d5db" : "#334155"; // light gray vs slate

  return (
    <div className="flex flex-col items-center w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Regional Sales Map</h2>
      
      <Card className="w-full mb-4">
        <CardContent className="p-4">
          <svg 
            width="100%" 
            height="500" 
            viewBox={`0 0 ${width} ${height}`}
            style={{ maxWidth: "100%", height: "auto" }}
          >
            {/* Background */}
            <rect x="0" y="0" width={width} height={height} fill={mapBgColor} />
            
            {/* City markers */}
            {REGIONAL_SALES_DATA.map((city) => (
              <g 
                key={city.city} 
                onClick={() => setSelectedCity(selectedCity?.city === city.city ? null : city)}
                style={{ cursor: "pointer" }}
              >
                {/* Heat circle */}
                <circle
                  cx={scaleX(city.lng)}
                  cy={scaleY(city.lat)}
                  r={scaleRadius(city.revenue) * 2.5}
                  fill={getColor(city.revenue)}
                  opacity="0.2"
                />
                
                {/* City marker */}
                <circle
                  cx={scaleX(city.lng)}
                  cy={scaleY(city.lat)}
                  r={scaleRadius(city.revenue)}
                  fill={getColor(city.revenue)}
                  stroke={isDarkMode ? "#374151" : "white"}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                
                {/* City name */}
                <text
                  x={scaleX(city.lng)}
                  y={scaleY(city.lat) - scaleRadius(city.revenue) - 5}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="12"
                  fontWeight={selectedCity?.city === city.city ? "bold" : "normal"}
                >
                  {city.city}
                </text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
      
      {/* Sales data table */}
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Regional Sales Data</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCity ? (
            <div className="mb-4">
              <h4 className="text-lg font-semibold">{selectedCity.city}, {selectedCity.state}</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-3 rounded bg-primary/10">
                  <div className="text-sm text-primary">Revenue</div>
                  <div className="text-xl font-medium">{formatCurrency(selectedCity.revenue)}</div>
                </div>
                <div className="p-3 rounded bg-secondary/10">
                  <div className="text-sm text-secondary">Units Sold</div>
                  <div className="text-xl font-medium">{selectedCity.units.toLocaleString()}</div>
                </div>
              </div>
              <Button 
                onClick={() => setSelectedCity(null)}
                variant="outline"
                className="mt-4"
              >
                Back to All Cities
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">City</th>
                    <th className="text-left p-2">State</th>
                    <th className="text-right p-2">Revenue</th>
                    <th className="text-right p-2">Units</th>
                  </tr>
                </thead>
                <tbody>
                  {REGIONAL_SALES_DATA
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((city) => (
                      <tr 
                        key={city.city} 
                        className="border-b hover:bg-accent cursor-pointer"
                        onClick={() => setSelectedCity(city)}
                      >
                        <td className="p-2">{city.city}</td>
                        <td className="p-2">{city.state}</td>
                        <td className="p-2 text-right">{formatCurrency(city.revenue)}</td>
                        <td className="p-2 text-right">{city.units.toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4 text-sm text-muted-foreground">
        Click on any city marker or table row to view detailed information.
      </div>
    </div>
  );
};

export default RegionalSalesMap;
