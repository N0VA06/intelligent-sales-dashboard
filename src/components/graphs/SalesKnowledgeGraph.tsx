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
import { knowledgeGraphNodes, knowledgeGraphEdges } from '@/data/mockData';
import { KnowledgeGraphNode, KnowledgeGraphEdge } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, RotateCw } from 'lucide-react';
import GlobeVisualization from './GlobeVisualization';

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

const SalesKnowledgeGraph = () => {
  // Globe visualization data based on knowledge graph nodes
  const globeData = [
    { lat: 40.7128, lng: -74.0060, name: 'New York', value: 4200000, color: '#3b82f6', connections: ['London', 'Paris'] },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', value: 3800000, color: '#3b82f6', connections: ['Tokyo', 'Sydney'] },
    { lat: 51.5074, lng: -0.1278, name: 'London', value: 5100000, color: '#f59e0b', connections: ['Paris', 'Hong Kong'] },
    { lat: 48.8566, lng: 2.3522, name: 'Paris', value: 2900000, color: '#f59e0b', connections: ['London'] },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo', value: 6200000, color: '#10b981', connections: ['Hong Kong', 'Sydney'] },
    { lat: 22.3193, lng: 114.1694, name: 'Hong Kong', value: 3500000, color: '#10b981', connections: ['Tokyo', 'Sydney'] },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney', value: 2100000, color: '#8b5cf6', connections: ['Hong Kong'] },
    { lat: 19.4326, lng: -99.1332, name: 'Mexico City', value: 1800000, color: '#8b5cf6', connections: ['Los Angeles', 'São Paulo'] },
    { lat: -23.5505, lng: -46.6333, name: 'São Paulo', value: 2300000, color: '#8b5cf6', connections: ['Mexico City'] },
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
