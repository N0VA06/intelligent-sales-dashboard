import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { knowledgeGraphNodes, knowledgeGraphEdges } from '@/data/mockData';
import { KnowledgeGraphNode, KnowledgeGraphEdge } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ZoomIn, ZoomOut, RotateCw, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

// Globe Visualization Component
const GlobeVisualization = ({ data, isVisible }) => {
  const globeEl = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !globeEl.current || !isVisible) return;

    // We're simulating the GlobeGL functionality since we can't import it directly
    const globeContainer = globeEl.current;
    globeContainer.innerHTML = '';
    
    // Create a placeholder for the globe
    const globePlaceholder = document.createElement('div');
    globePlaceholder.className = 'w-full h-full flex items-center justify-center bg-gray-100 rounded-lg relative overflow-hidden';
    
    // Add a circular element to represent the globe
    const globeCircle = document.createElement('div');
    globeCircle.className = 'w-40 h-40 rounded-full bg-blue-300 relative animate-pulse';
    globeCircle.style.background = 'radial-gradient(circle at 30% 30%, #60a5fa, #1e40af)';
    
    // Add points to simulate the data points
    data.forEach(point => {
      const pointEl = document.createElement('div');
      pointEl.className = 'absolute w-2 h-2 rounded-full';
      pointEl.style.backgroundColor = point.color || 'rgba(255, 100, 50, 0.8)';
      
      // Convert lat/lng to position on the circle (simplified)
      const angle = (point.lng + 180) * (Math.PI / 180);
      const radius = 70 * (1 - Math.abs(point.lat) / 90);
      const x = 20 + radius * Math.cos(angle);
      const y = 20 + radius * Math.sin(angle);
      
      pointEl.style.left = `calc(50% + ${x}px)`;
      pointEl.style.top = `calc(50% + ${y}px)`;
      pointEl.style.transform = 'translate(-50%, -50%)';
      
      // Add pulse animation for the point
      const pulseAnimation = document.createElement('div');
      pulseAnimation.className = 'absolute w-4 h-4 rounded-full animate-ping';
      pulseAnimation.style.backgroundColor = point.color || 'rgba(255, 100, 50, 0.4)';
      pulseAnimation.style.opacity = '0.6';
      
      pointEl.appendChild(pulseAnimation);
      globeCircle.appendChild(pointEl);
      
      // Add tooltip on hover
      pointEl.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-10 bg-black text-white text-xs p-1 rounded';
        tooltip.style.left = `calc(50% + ${x}px)`;
        tooltip.style.top = `calc(50% + ${y - 20}px)`;
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.textContent = `${point.name}: $${point.value.toLocaleString()}`;
        globePlaceholder.appendChild(tooltip);
        
        pointEl.addEventListener('mouseleave', () => {
          tooltip.remove();
        });
      });
    });
    
    // Add continents outlines (simplified)
    const continentsOverlay = document.createElement('div');
    continentsOverlay.className = 'absolute inset-0 opacity-30';
    continentsOverlay.style.backgroundImage = 'url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/BlankMap-World.svg/1280px-BlankMap-World.svg.png\')';
    continentsOverlay.style.backgroundSize = 'cover';
    continentsOverlay.style.backgroundPosition = 'center';
    continentsOverlay.style.mixBlendMode = 'overlay';
    
    globeCircle.appendChild(continentsOverlay);
    globePlaceholder.appendChild(globeCircle);
    globeContainer.appendChild(globePlaceholder);
    
    // Add rotation animation
    let rotation = 0;
    const rotateGlobe = () => {
      rotation += 0.2;
      continentsOverlay.style.backgroundPosition = `${rotation % 360}px center`;
      requestAnimationFrame(rotateGlobe);
    };
    
    rotateGlobe();
    
    return () => {
      // Cleanup if necessary
    };
  }, [data, isClient, isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          <CardTitle>Global Sales Distribution</CardTitle>
        </div>
        <CardDescription>
          Visualization of sales around the world
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
            <div ref={globeEl} className="w-full h-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  product: (props: any) => <CustomNode {...props} type="product" />,
  customer: (props: any) => <CustomNode {...props} type="customer" />,
  region: (props: any) => <CustomNode {...props} type="region" />,
  channel: (props: any) => <CustomNode {...props} type="channel" />,
};

const SalesKnowledgeGraph = () => {
  // Globe visualization data
  const globeData = [
    { lat: 40.7128, lng: -74.0060, name: 'New York', value: 4200000, color: '#3b82f6' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', value: 3800000, color: '#3b82f6' },
    { lat: 51.5074, lng: -0.1278, name: 'London', value: 5100000, color: '#f59e0b' },
    { lat: 48.8566, lng: 2.3522, name: 'Paris', value: 2900000, color: '#f59e0b' },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo', value: 6200000, color: '#10b981' },
    { lat: 22.3193, lng: 114.1694, name: 'Hong Kong', value: 3500000, color: '#10b981' },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney', value: 2100000, color: '#8b5cf6' },
    { lat: 19.4326, lng: -99.1332, name: 'Mexico City', value: 1800000, color: '#8b5cf6' },
    { lat: -23.5505, lng: -46.6333, name: 'São Paulo', value: 2300000, color: '#8b5cf6' },
  ];

  // Map custom nodes to ReactFlow nodes
  const initialNodes = knowledgeGraphNodes.map((node: KnowledgeGraphNode) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }));

  // Map custom edges to ReactFlow edges
  const initialEdges = knowledgeGraphEdges.map((edge: KnowledgeGraphEdge) => ({
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
  const [showGlobe, setShowGlobe] = useState(true);

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

  const toggleGlobe = () => {
    setShowGlobe(!showGlobe);
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
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="knowledge-graph md:col-span-2 h-96 md:h-full">
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
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={resetLayout} className="flex items-center gap-1">
                <RotateCw className="w-4 h-4" />
                <span className="text-xs">Reset</span>
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      
      <div className="md:col-span-1 h-96 md:h-full">
        <GlobeVisualization data={globeData} isVisible={true} />
      </div>
    </div>
  );
};

export default SalesKnowledgeGraph;
