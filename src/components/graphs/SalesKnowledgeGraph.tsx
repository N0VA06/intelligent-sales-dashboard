import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, Map, BarChart3 } from 'lucide-react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Search, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

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

// Sample knowledge graph data
const knowledgeGraphNodes = [
  { id: 'p1', type: 'product', position: { x: 100, y: 100 }, data: { label: 'Product A', value: 1250000, category: 'Electronics' } },
  { id: 'p2', type: 'product', position: { x: 300, y: 50 }, data: { label: 'Product B', value: 980000, category: 'Electronics' } },
  { id: 'p3', type: 'product', position: { x: 500, y: 100 }, data: { label: 'Product C', value: 750000, category: 'Appliances' } },
  { id: 'c1', type: 'customer', position: { x: 200, y: 200 }, data: { label: 'Enterprise', value: 2000000, details: '120 clients' } },
  { id: 'c2', type: 'customer', position: { x: 400, y: 250 }, data: { label: 'Retail', value: 980000, details: '350 clients' } },
  { id: 'r1', type: 'region', position: { x: 100, y: 300 }, data: { label: 'North', value: 1450000 } },
  { id: 'r2', type: 'region', position: { x: 300, y: 350 }, data: { label: 'South', value: 1200000 } },
  { id: 'r3', type: 'region', position: { x: 500, y: 300 }, data: { label: 'West', value: 950000 } },
  { id: 'ch1', type: 'channel', position: { x: 200, y: 400 }, data: { label: 'Direct', value: 1800000 } },
  { id: 'ch2', type: 'channel', position: { x: 400, y: 400 }, data: { label: 'Partners', value: 1200000 } }
];

const knowledgeGraphEdges = [
  { id: 'e1', source: 'p1', target: 'c1', type: 'custom', data: { type: 'sales', value: 850000 } },
  { id: 'e2', source: 'p1', target: 'c2', type: 'custom', data: { type: 'sales', value: 400000 } },
  { id: 'e3', source: 'p2', target: 'c1', type: 'custom', data: { type: 'sales', value: 650000 } },
  { id: 'e4', source: 'p2', target: 'c2', type: 'custom', data: { type: 'sales', value: 330000 } },
  { id: 'e5', source: 'p3', target: 'c1', type: 'custom', data: { type: 'sales', value: 500000 } },
  { id: 'e6', source: 'p3', target: 'c2', type: 'custom', data: { type: 'sales', value: 250000 } },
  { id: 'e7', source: 'c1', target: 'r1', type: 'custom', data: { type: 'customer_channel', value: 900000 } },
  { id: 'e8', source: 'c1', target: 'r2', type: 'custom', data: { type: 'customer_channel', value: 700000 } },
  { id: 'e9', source: 'c1', target: 'r3', type: 'custom', data: { type: 'customer_channel', value: 400000 } },
  { id: 'e10', source: 'c2', target: 'r1', type: 'custom', data: { type: 'customer_channel', value: 550000 } },
  { id: 'e11', source: 'c2', target: 'r2', type: 'custom', data: { type: 'customer_channel', value: 500000 } },
  { id: 'e12', source: 'r1', target: 'ch1', type: 'custom', data: { type: 'channel_sales', value: 850000 } },
  { id: 'e13', source: 'r1', target: 'ch2', type: 'custom', data: { type: 'channel_sales', value: 600000 } },
  { id: 'e14', source: 'r2', target: 'ch1', type: 'custom', data: { type: 'channel_sales', value: 670000 } },
  { id: 'e15', source: 'r2', target: 'ch2', type: 'custom', data: { type: 'channel_sales', value: 530000 } },
  { id: 'e16', source: 'r3', target: 'ch1', type: 'custom', data: { type: 'channel_sales', value: 280000 } },
  { id: 'e17', source: 'r3', target: 'ch2', type: 'custom', data: { type: 'channel_sales', value: 70000 } }
];

// RegionalSalesMap Component
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
    <div className="flex flex-col items-center w-full mx-auto">
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
    </div>
  );
};

// Knowledge Graph Components
// Node data
interface CustomNodeData {
  label: string;
  value?: number;
  category?: string;
  details?: string;
}

// Custom node styles by type
const getNodeStyle = (type: string) => {
  switch (type) {
    case 'product':
      return { 
        background: 'rgba(59, 130, 246, 0.1)', 
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#3b82f6' 
      };
    case 'customer':
      return { 
        background: 'rgba(16, 185, 129, 0.1)', 
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: '#10b981' 
      };
    case 'region':
      return { 
        background: 'rgba(245, 158, 11, 0.1)', 
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: '#f59e0b' 
      };
    case 'channel':
      return { 
        background: 'rgba(139, 92, 246, 0.1)', 
        border: '1px solid rgba(139, 92, 246, 0.3)',
        color: '#8b5cf6' 
      };
    default:
      return { 
        background: 'white', 
        border: '1px solid #e2e8f0',
        color: '#6b7280' 
      };
  }
};

// Custom node
const CustomNode = ({ data, type }: { data: CustomNodeData; type: string }) => {
  const style = getNodeStyle(type);

  const formatValue = (value?: number) => {
    if (!value) return '';
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div
      className="px-4 py-2 rounded-md shadow-sm"
      style={style}
    >
      <div className="font-medium text-sm">{data.label}</div>
      {data.value && (
        <div className="text-xs mt-1">{formatValue(data.value)}</div>
      )}
      {data.details && (
        <div className="text-xs mt-1 opacity-75">{data.details}</div>
      )}
      {data.category && (
        <Badge variant="outline" className="mt-1 text-xs" style={{ color: style.color, borderColor: style.color }}>
          {data.category}
        </Badge>
      )}
    </div>
  );
};

// Custom edge
const CustomEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: any) => {
  // Based on data type, change edge color
  let edgeColor = '#64748b';
  let dashArray = '';
  let animated = false;

  if (data) {
    switch (data.type) {
      case 'purchase':
        edgeColor = '#3b82f6';
        break;
      case 'sales':
        edgeColor = '#f59e0b';
        animated = true;
        break;
      case 'channel_sales':
        edgeColor = '#8b5cf6';
        dashArray = '5,5';
        break;
      case 'customer_channel':
        edgeColor = '#10b981';
        dashArray = '3,3';
        break;
      default:
        edgeColor = '#64748b';
    }
  }

  // Format edge label based on data value
  const edgeLabel = data?.value 
    ? data.value >= 1000000 
      ? `$${(data.value / 1000000).toFixed(1)}M` 
      : `$${(data.value / 1000).toFixed(0)}K`
    : '';

  return (
    <>
      <path
        style={{
          strokeWidth: 2,
          stroke: edgeColor,
          strokeDasharray: dashArray,
        }}
        className={`react-flow__edge-path ${animated ? 'animated' : ''}`}
        d={`M${sourceX},${sourceY}L${targetX},${targetY}`}
      />
      {edgeLabel && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fill: edgeColor, fontSize: 12 }}
            startOffset="50%"
            textAnchor="middle"
          >
            {edgeLabel}
          </textPath>
        </text>
      )}
    </>
  );
};

const nodeTypes = {
  product: (props: any) => <CustomNode {...props} type="product" />,
  customer: (props: any) => <CustomNode {...props} type="customer" />,
  region: (props: any) => <CustomNode {...props} type="region" />,
  channel: (props: any) => <CustomNode {...props} type="channel" />,
};

// SalesKnowledgeGraph Component
const SalesKnowledgeGraph = () => {
  // Map our custom nodes to ReactFlow nodes
  const initialNodes: Node[] = knowledgeGraphNodes.map((node: any) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }));

  // Map our custom edges to ReactFlow edges
  const initialEdges: Edge[] = knowledgeGraphEdges.map((edge: any) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'custom',
    animated: edge.animated,
    label: edge.label,
    data: edge.data,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const resetLayout = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  // Filter nodes based on search query
  const filteredNodes = nodes.filter(node => 
    node.data.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter edges to only include connections between visible nodes
  const filteredEdges = edges.filter(edge => 
    filteredNodes.some(node => node.id === edge.source) && 
    filteredNodes.some(node => node.id === edge.target)
  );

  const edgeTypes = {
    custom: CustomEdge,
  };

  return (
    <div className="w-full h-96 knowledge-graph">
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3}
          zoomable
          pannable
          nodeColor={(node) => {
            switch (node.type) {
              case 'product':
                return '#3b82f6';
              case 'customer':
                return '#10b981';
              case 'region':
                return '#f59e0b';
              case 'channel':
                return '#8b5cf6';
              default:
                return '#64748b';
            }
          }}
        />
        <Background color="#f8fafc" gap={16} />
        <Panel position="top-left">
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-2 py-1 w-48"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                <span className="text-xs">Product</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                <span className="text-xs">Customer</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                <span className="text-xs">Region</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-xs">Channel</span>
              </div>
            </div>
          </div>
        </Panel>
        <Panel position="top-right">
          <Button size="sm" variant="outline" onClick={resetLayout} className="flex items-center gap-1">
            <RotateCw className="w-4 h-4" />
            <span className="text-xs">Reset</span>
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

// Main Dashboard Component
const SalesKnowledgeGraph = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sales Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Comprehensive sales analytics across regions and relationships</CardDescription>
              </div>
              <Badge variant="outline" className="px-3">FY 2023-24</Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Regional Map
          </TabsTrigger>
          <TabsTrigger value="graph" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Knowledge Graph
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            All Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Regional Sales Distribution</CardTitle>
              <CardDescription>Geographic visualization of sales performance across India</CardDescription>
            </CardHeader>
            <CardContent>
              <RegionalSalesMap />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Sales Knowledge Graph</CardTitle>
              <CardDescription>Visualizing relationships between products, customers, regions, and sales channels</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <SalesKnowledgeGraph />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Sales Distribution</CardTitle>
                <CardDescription>Geographic visualization of sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <RegionalSalesMap />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales Knowledge Graph</CardTitle>
                <CardDescription>Relationship visualization of sales entities</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <SalesKnowledgeGraph />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Highest Growth Regions</h3>
                <p className="text-sm text-muted-foreground">Mumbai, Bangalore and Delhi show the strongest sales performance.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Product-Customer Relationships</h3>
                <p className="text-sm text-muted-foreground">Enterprise customers have the strongest affinity towards Product A.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Channel Optimization</h3>
                <p className="text-sm text-muted-foreground">Direct sales channel shows 30% better conversion rates than partner channels.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// GraphPlaceholder Component - Simple placeholder when graph isn't loaded
const GraphPlaceholder = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
      <Network className="h-12 w-12 mb-2 opacity-50" />
      <p className="text-sm">Loading knowledge graph visualization...</p>
    </div>
  );
};

// KnowledgeGraph Component with D3 integration
interface GraphNode {
  id: string;
  label: string;
  type: string;
  value?: number;
  category?: string;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value?: number;
  type?: string;
}

interface KnowledgeGraphProps {
  className?: string;
  nodes?: GraphNode[];
  links?: GraphLink[];
}

// D3 Graph Utility Functions
const processGraphData = (nodes: GraphNode[], links: GraphLink[]) => {
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const validLinks = links.filter(link => 
    nodeMap.has(typeof link.source === 'string' ? link.source as string : (link.source as GraphNode).id) && 
    nodeMap.has(typeof link.target === 'string' ? link.target as string : (link.target as GraphNode).id)
  );
  
  return { nodeMap, validLinks };
};

const createDragBehavior = (simulation: any) => {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

// Hook for D3 Knowledge Graph
const useKnowledgeGraph = ({
  svgRef,
  containerRef,
  nodes,
  links,
  isClient
}: {
  svgRef: React.RefObject<SVGSVGElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  nodes: GraphNode[];
  links: GraphLink[];
  isClient: boolean;
}) => {
  useEffect(() => {
    if (!isClient || !svgRef.current || !containerRef.current || nodes.length === 0) {
      return;
    }

    // Clear existing graph
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Process data
    const { nodeMap, validLinks } = processGraphData(nodes, links);

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(validLinks).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Create graph elements
    const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(validLinks)
      .enter()
      .append("line")
      .attr("stroke", (d: any) => {
        switch (d.type) {
          case 'sales': return "#f59e0b";
          case 'purchase': return "#3b82f6";
          case 'channel_sales': return "#8b5cf6";
          case 'customer_channel': return "#10b981";
          default: return "#64748b";
        }
      })
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6)
      .attr("stroke-dasharray", (d: any) => {
        if (d.type === 'channel_sales') return "5,5";
        if (d.type === 'customer_channel') return "3,3";
        return "";
      });

    // Node groups
    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(createDragBehavior(simulation) as any);

    // Node circles
    node.append("circle")
      .attr("r", 12)
      .attr("fill", (d: any) => {
        switch (d.type) {
          case 'product': return "#3b82f6";
          case 'customer': return "#10b981";
          case 'region': return "#f59e0b";
          case 'channel': return "#8b5cf6";
          default: return "#64748b";
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Node labels
    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 15)
      .attr("y", 4)
      .attr("font-size", "10px")
      .attr("fill", "#64748b");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [isClient, nodes, links, containerRef, svgRef]);
};

// D3 Knowledge Graph Component
const D3KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ 
  className,
  nodes = [],
  links = []
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Use the hook to handle D3 visualization
  useKnowledgeGraph({
    svgRef,
    containerRef,
    nodes,
    links,
    isClient
  });
  
  return (
    <Card className={`${className} dashboard-card h-full`}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Network className="h-5 w-5 mr-2" />
          <CardTitle>Knowledge Graph</CardTitle>
        </div>
        <CardDescription>
          Visualizing relationships between products, customers, and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          ref={containerRef} 
          className="aspect-video bg-muted rounded-md flex items-center justify-center p-4 relative overflow-hidden"
        >
          {!isClient || nodes.length === 0 ? (
            <GraphPlaceholder />
          ) : (
            <svg ref={svgRef} className="w-full h-full overflow-hidden" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesKnowledgeGraph;
