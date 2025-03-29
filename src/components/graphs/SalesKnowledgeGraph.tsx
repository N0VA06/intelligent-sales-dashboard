import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, RotateCw, Globe } from 'lucide-react';

// ======= MOCK DATA =======
// Knowledge Graph Nodes
const knowledgeGraphNodes = [
  {
    id: 'product1',
    type: 'product',
    position: { x: 250, y: 50 },
    data: { label: 'Product A', value: 1250000, category: 'Electronics' }
  },
  {
    id: 'product2',
    type: 'product',
    position: { x: 100, y: 200 },
    data: { label: 'Product B', value: 850000, category: 'Software' }
  },
  {
    id: 'product3',
    type: 'product',
    position: { x: 400, y: 200 },
    data: { label: 'Product C', value: 650000, category: 'Services' }
  },
  {
    id: 'customer1',
    type: 'customer',
    position: { x: 250, y: 350 },
    data: { label: 'Enterprise', value: 2100000, details: '43 accounts' }
  },
  {
    id: 'customer2',
    type: 'customer',
    position: { x: 550, y: 350 },
    data: { label: 'SMB', value: 650000, details: '128 accounts' }
  },
  {
    id: 'region1',
    type: 'region',
    position: { x: 100, y: 500 },
    data: { label: 'North America', value: 1450000 }
  },
  {
    id: 'region2',
    type: 'region',
    position: { x: 300, y: 500 },
    data: { label: 'EMEA', value: 950000 }
  },
  {
    id: 'region3',
    type: 'region',
    position: { x: 500, y: 500 },
    data: { label: 'APAC', value: 350000 }
  },
  {
    id: 'channel1',
    type: 'channel',
    position: { x: 200, y: 650 },
    data: { label: 'Direct', value: 1750000 }
  },
  {
    id: 'channel2',
    type: 'channel',
    position: { x: 400, y: 650 },
    data: { label: 'Partner', value: 1000000 }
  }
];

// Knowledge Graph Edges
const knowledgeGraphEdges = [
  {
    id: 'e1-2',
    source: 'product1',
    target: 'customer1',
    type: 'custom',
    data: { type: 'sales', value: 950000 }
  },
  {
    id: 'e1-3',
    source: 'product1',
    target: 'customer2',
    type: 'custom',
    data: { type: 'sales', value: 300000 }
  },
  {
    id: 'e2-2',
    source: 'product2',
    target: 'customer1',
    type: 'custom',
    data: { type: 'sales', value: 650000 }
  },
  {
    id: 'e2-3',
    source: 'product2',
    target: 'customer2',
    type: 'custom',
    data: { type: 'sales', value: 200000 }
  },
  {
    id: 'e3-2',
    source: 'product3',
    target: 'customer1',
    type: 'custom',
    data: { type: 'sales', value: 500000 }
  },
  {
    id: 'e3-3',
    source: 'product3',
    target: 'customer2',
    type: 'custom',
    data: { type: 'sales', value: 150000 }
  },
  {
    id: 'e4-5',
    source: 'customer1',
    target: 'region1',
    type: 'custom',
    data: { type: 'customer_channel', value: 900000 }
  },
  {
    id: 'e4-6',
    source: 'customer1',
    target: 'region2',
    type: 'custom',
    data: { type: 'customer_channel', value: 850000 }
  },
  {
    id: 'e4-7',
    source: 'customer1',
    target: 'region3',
    type: 'custom',
    data: { type: 'customer_channel', value: 350000 }
  },
  {
    id: 'e5-5',
    source: 'customer2',
    target: 'region1',
    type: 'custom',
    data: { type: 'customer_channel', value: 550000 }
  },
  {
    id: 'e5-6',
    source: 'customer2',
    target: 'region2',
    type: 'custom',
    data: { type: 'customer_channel', value: 100000 }
  },
  {
    id: 'e8-9',
    source: 'region1',
    target: 'channel1',
    type: 'custom',
    data: { type: 'channel_sales', value: 950000 }
  },
  {
    id: 'e8-10',
    source: 'region1',
    target: 'channel2',
    type: 'custom',
    data: { type: 'channel_sales', value: 500000 }
  },
  {
    id: 'e9-9',
    source: 'region2',
    target: 'channel1',
    type: 'custom',
    data: { type: 'channel_sales', value: 600000 }
  },
  {
    id: 'e9-10',
    source: 'region2',
    target: 'channel2',
    type: 'custom',
    data: { type: 'channel_sales', value: 350000 }
  },
  {
    id: 'e10-9',
    source: 'region3',
    target: 'channel1',
    type: 'custom',
    data: { type: 'channel_sales', value: 200000 }
  },
  {
    id: 'e10-10',
    source: 'region3',
    target: 'channel2',
    type: 'custom',
    data: { type: 'channel_sales', value: 150000 }
  }
];

// Globe Visualization Data
const globeData = [
  { lat: 40.7128, lng: -74.0060, name: 'New York', value: 950000, color: '#3b82f6', connections: ['London', 'Paris'] },
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', value: 500000, color: '#3b82f6', connections: ['Tokyo', 'Sydney'] },
  { lat: 51.5074, lng: -0.1278, name: 'London', value: 650000, color: '#f59e0b', connections: ['Paris', 'Hong Kong'] },
  { lat: 48.8566, lng: 2.3522, name: 'Paris', value: 350000, color: '#f59e0b', connections: ['London'] },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo', value: 450000, color: '#10b981', connections: ['Hong Kong', 'Sydney'] },
  { lat: 22.3193, lng: 114.1694, name: 'Hong Kong', value: 300000, color: '#10b981', connections: ['Tokyo', 'Sydney'] },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney', value: 250000, color: '#8b5cf6', connections: ['Hong Kong'] },
  { lat: 19.4326, lng: -99.1332, name: 'Mexico City', value: 200000, color: '#8b5cf6', connections: ['Los Angeles', 'São Paulo'] },
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo', value: 300000, color: '#8b5cf6', connections: ['Mexico City'] },
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco', value: 750000, color: '#3b82f6', connections: ['New York', 'Tokyo'] },
  { lat: 25.276987, lng: 55.296249, name: 'Dubai', value: 400000, color: '#f59e0b', connections: ['London', 'Hong Kong'] },
  { lat: 52.520008, lng: 13.404954, name: 'Berlin', value: 350000, color: '#f59e0b', connections: ['London', 'Paris'] },
];

// ======= GLOBE VISUALIZATION COMPONENT =======
interface GlobeDataPoint {
  lat: number;
  lng: number;
  name: string;
  value: number;
  color?: string;
  connections?: string[];
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
    
    // Dynamically load Globe.gl
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
        // Using dynamic import for Globe.gl
        const GlobeGL = (await import('globe.gl')).default;
        
        // Clear previous globe instances
        globeEl.current.innerHTML = '';
        
        // Generate arcs data based on connections between points
        const arcsData = [];
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
        
        // Create globe instance
        const globe = new GlobeGL()
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          // Configure points (cities)
          .pointsData(data)
          .pointLat(d => d.lat)
          .pointLng(d => d.lng)
          .pointColor(d => d.color || 'rgba(255, 100, 50, 0.8)')
          .pointRadius(d => Math.sqrt(d.value) * 0.08)
          .pointAltitude(0.01)
          .pointLabel(d => `${d.name}: $${d.value.toLocaleString()}`)
          // Configure arcs (connections)
          .arcsData(arcsData)
          .arcStartLat(d => d.startLat)
          .arcStartLng(d => d.startLng)
          .arcEndLat(d => d.endLat)
          .arcEndLng(d => d.endLng)
          .arcColor(d => d.color)
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(2000)
          .arcsTransitionDuration(1000)
          .arcStroke(0.5)
          // Interactive features
          .onPointHover(point => {
            document.body.style.cursor = point ? 'pointer' : 'default';
          });
          
        // Mount to DOM
        globe(globeEl.current);
        
        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        
        // Set initial position
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

// ======= KNOWLEDGE GRAPH COMPONENTS =======
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
        id={id}
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

const edgeTypes = {
  custom: CustomEdge,
};

// ======= MAIN COMPONENT =======
const SalesKnowledgeGraph = () => {
  // Map custom nodes to ReactFlow nodes
  const initialNodes = knowledgeGraphNodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }));

  // Map custom edges to ReactFlow edges
  const initialEdges = knowledgeGraphEdges.map((edge) => ({
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

  // Add node movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((nds) =>
        nds.map((node) => {
          // Only move nodes slightly to create a "floating" effect
          const xMovement = (Math.random() - 0.5) * 3;
          const yMovement = (Math.random() - 0.5) * 3;
          
          return {
            ...node,
            position: {
              x: node.position.x + xMovement,
              y: node.position.y + yMovement,
            },
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [setNodes]);

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

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="knowledge-graph lg:col-span-2 h-[600px] lg:h-[800px]">
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
      
      <div className="lg:col-span-1 h-[600px] lg:h-[800px]">
        <GlobeVisualization data={globeData} />
      </div>
    </div>
  );
};

export default SalesKnowledgeGraph;
