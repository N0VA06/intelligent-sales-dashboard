
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RegionalSales } from '@/types';
import { toast } from 'sonner';

interface RegionalSalesMapProps {
  data: RegionalSales[];
}

// Since we can't use real API keys in this demo, we need to prompt the user
// to enter their own Mapbox token or use a placeholder visualization
const RegionalSalesMap: React.FC<RegionalSalesMapProps> = ({ data }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenEntered, setTokenEntered] = useState<boolean>(false);
  
  useEffect(() => {
    if (!mapboxToken || !tokenEntered || !mapContainer.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of US
        zoom: 3,
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Load map and add data
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add data source
        map.current.addSource('sales', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data.map(location => ({
              type: 'Feature',
              properties: {
                city: location.city,
                state: location.state,
                revenue: location.revenue,
                units: location.units
              },
              geometry: {
                type: 'Point',
                coordinates: [location.lng, location.lat]
              }
            }))
          }
        });
        
        // Add heat map layer
        map.current.addLayer({
          id: 'sales-heat',
          type: 'heatmap',
          source: 'sales',
          paint: {
            'heatmap-weight': [
              'interpolate', ['linear'], ['get', 'revenue'],
              200000, 0,
              1000000, 1
            ],
            'heatmap-intensity': 1.5,
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0, 0, 255, 0)',
              0.1, 'rgba(65, 105, 225, 0.5)',
              0.3, 'rgba(0, 0, 255, 0.7)',
              0.5, 'rgba(0, 0, 205, 0.9)',
              0.7, 'rgb(0, 0, 153)',
              1, 'rgb(0, 0, 120)'
            ],
            'heatmap-radius': 40,
            'heatmap-opacity': 0.8
          }
        });
        
        // Add circle layer
        map.current.addLayer({
          id: 'sales-point',
          type: 'circle',
          source: 'sales',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'], ['get', 'revenue'],
              300000, 5,
              1200000, 15
            ],
            'circle-color': 'hsl(var(--primary))',
            'circle-opacity': 0.7,
            'circle-stroke-width': 1,
            'circle-stroke-color': 'white'
          }
        });
        
        // Add popup on click
        map.current.on('click', 'sales-point', (e) => {
          if (!e.features || !map.current) return;
          
          const feature = e.features[0];
          const props = feature.properties;
          
          // TypeScript fix: Safely handle coordinates
          const coordinates = (feature.geometry as any).coordinates.slice() as [number, number];
          
          const formatted = {
            city: props.city,
            state: props.state,
            revenue: new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(props.revenue),
            units: props.units.toLocaleString()
          };
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <strong>${formatted.city}, ${formatted.state}</strong><br/>
              Revenue: ${formatted.revenue}<br/>
              Units Sold: ${formatted.units}
            `)
            .addTo(map.current);
        });
        
        // Change cursor on hover
        map.current.on('mouseenter', 'sales-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        
        map.current.on('mouseleave', 'sales-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      });
      
      toast.success('Map loaded successfully!');
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Error loading map. Please check your Mapbox token.');
    }
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [data, mapboxToken, tokenEntered]);
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setTokenEntered(true);
    } else {
      toast.error('Please enter a valid Mapbox token');
    }
  };
  
  if (!tokenEntered) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="max-w-lg w-full p-6 bg-card rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Mapbox API Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the geographic heatmap, please enter your Mapbox public access token.
            You can get one by signing up at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox token (pk.eyJ1...)"
                className="w-full p-2 border border-input rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Load Map
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Your token will only be used client-side and will not be stored or transmitted anywhere.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-md overflow-hidden" />
    </div>
  );
};

export default RegionalSalesMap;
