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
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient || !globeEl.current) return;
    
    // Fallback visualization that doesn't depend on Globe.gl
    if (globeEl.current) {
      globeEl.current.innerHTML = '';
      
      // Create SVG element for the globe
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 500 500');
      svg.style.overflow = 'visible';
      
      // Create globe circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '250');
      circle.setAttribute('cy', '250');
      circle.setAttribute('r', '200');
      circle.setAttribute('fill', 'url(#globeGradient)');
      circle.setAttribute('stroke', '#60a5fa');
      circle.setAttribute('stroke-width', '2');
      
      // Create gradient
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      gradient.setAttribute('id', 'globeGradient');
      gradient.setAttribute('cx', '30%');
      gradient.setAttribute('cy', '30%');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#60a5fa');
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', '#1e40af');
      
      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
      svg.appendChild(defs);
      
      // Add lines for globe grid
      for (let i = 0; i < 360; i += 30) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        line.setAttribute('cx', '250');
        line.setAttribute('cy', '250');
        line.setAttribute('rx', '200');
        line.setAttribute('ry', '200');
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('transform', `rotate(${i} 250 250)`);
        svg.appendChild(line);
      }
      
      // Add meridians
      for (let i = 20; i < 180; i += 40) {
        const meridian = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        meridian.setAttribute('cx', '250');
        meridian.setAttribute('cy', '250');
        meridian.setAttribute('rx', 200 * Math.sin(i * Math.PI / 180));
        meridian.setAttribute('ry', '200');
        meridian.setAttribute('fill', 'none');
        meridian.setAttribute('stroke', 'rgba(255,255,255,0.2)');
        meridian.setAttribute('stroke-width', '1');
        svg.appendChild(meridian);
      }
      
      svg.appendChild(circle);
      
      // Generate connection lines between cities
      const pointsMap = new Map(data.map(point => [point.name, point]));
      
      data.forEach(source => {
        if (source.connections) {
          source.connections.forEach(targetName => {
            const target = pointsMap.get(targetName);
            if (target) {
              // Calculate positions on the globe
              const sourcePos = latLngToPos(source.lat, source.lng, 250, 250, 200);
              const targetPos = latLngToPos(target.lat, target.lng, 250, 250, 200);
              
              // Create arc path between points
              const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              
              // Create a curved path between the two points
              const midX = (sourcePos.x + targetPos.x) / 2;
              const midY = (sourcePos.y + targetPos.y) / 2;
              const distance = Math.sqrt(Math.pow(targetPos.x - sourcePos.x, 2) + Math.pow(targetPos.y - sourcePos.y, 2));
              const curvature = Math.min(0.2, distance / 1000);
              
              // Calculate control point (above the midpoint)
              const controlX = midX;
              const controlY = midY - distance * curvature;
              
              path.setAttribute('d', `M${sourcePos.x},${sourcePos.y} Q${controlX},${controlY} ${targetPos.x},${targetPos.y}`);
              path.setAttribute('fill', 'none');
              path.setAttribute('stroke', source.color || '#ffaa00');
              path.setAttribute('stroke-width', '2');
              path.setAttribute('stroke-dasharray', '5,5');
              path.setAttribute('opacity', '0.7');
              
              // Animate the path
              const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
              animate.setAttribute('attributeName', 'stroke-dashoffset');
              animate.setAttribute('from', '0');
              animate.setAttribute('to', '10');
              animate.setAttribute('dur', '1s');
              animate.setAttribute('repeatCount', 'indefinite');
              
              path.appendChild(animate);
              svg.appendChild(path);
            }
          });
        }
      });
      
      // Add city points
      data.forEach(point => {
        const pos = latLngToPos(point.lat, point.lng, 250, 250, 200);
        
        // Add point
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x.toString());
        circle.setAttribute('cy', pos.y.toString());
        
        // Scale point based on value
        const radius = Math.sqrt(point.value) * 0.04;
        circle.setAttribute('r', radius.toString());
        circle.setAttribute('fill', point.color || '#ffaa00');
        
        // Add glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', pos.x.toString());
        glow.setAttribute('cy', pos.y.toString());
        glow.setAttribute('r', (radius * 2).toString());
        glow.setAttribute('fill', point.color || '#ffaa00');
        glow.setAttribute('opacity', '0.3');
        
        // Add pulse animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'r');
        animate.setAttribute('values', `${radius};${radius * 3};${radius}`);
        animate.setAttribute('dur', '2s');
        animate.setAttribute('repeatCount', 'indefinite');
        
        glow.appendChild(animate);
        
        // Add tooltip on hover
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tooltip.textContent = `${point.name}: ${point.value.toLocaleString()}`;
        circle.appendChild(tooltip);
        
        svg.appendChild(glow);
        svg.appendChild(circle);
      });
      
      // Add animated rotation
      let rotation = 0;
      const rotateGlobe = () => {
        rotation += 0.1;
        svg.style.transform = `rotateY(${rotation}deg)`;
        requestAnimationFrame(rotateGlobe);
      };
      
      // Helper function to convert lat/lng to position on the sphere
      function latLngToPos(lat, lng, centerX, centerY, radius) {
        // Convert to radians
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        // Calculate 3D position
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        // Convert to 2D with perspective
        // Only show points on the front side of the globe
        if (z < 0) {
          return {
            x: centerX + x,
            y: centerY - y,
            visible: true
          };
        } else {
          return {
            x: centerX + x,
            y: centerY - y,
            visible: false
          };
        }
      }
      
      globeEl.current.appendChild(svg);
      
      // Add controls for basic interaction
      const controls = document.createElement('div');
      controls.className = 'absolute bottom-2 right-2 flex gap-2';
      
      // Create a wrapper for the controls
      const rotateBtn = document.createElement('button');
      rotateBtn.className = 'p-2 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100';
      rotateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path><path d="M17 12H3"></path><path d="m11 6-4 6 4 6"></path></svg>';
      rotateBtn.title = 'Rotate Globe';
      rotateBtn.onclick = rotateGlobe;
      
      controls.appendChild(rotateBtn);
      globeEl.current.appendChild(controls);
    }
  }, [data, isClient]);
  
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
