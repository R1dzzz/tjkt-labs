import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Network,
  Router,
  Server,
  Monitor,
  Trash2,
  Save,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Download,
  MousePointer,
} from 'lucide-react';
import Header from '@/components/layout/Header';

interface TopoNode {
  id: string;
  type: 'router' | 'switch' | 'pc' | 'server';
  label: string;
  x: number;
  y: number;
}

interface TopoEdge {
  id: string;
  source: string;
  target: string;
}

type ToolMode = 'select' | 'connect' | 'delete';

const NODE_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  router: { bg: 'bg-red-500/10', border: 'border-red-500', icon: 'text-red-500' },
  switch: { bg: 'bg-blue-500/10', border: 'border-blue-500', icon: 'text-blue-500' },
  pc: { bg: 'bg-green-500/10', border: 'border-green-500', icon: 'text-green-500' },
  server: { bg: 'bg-purple-500/10', border: 'border-purple-500', icon: 'text-purple-500' },
};

const NODE_ICONS: Record<string, typeof Router> = {
  router: Router,
  switch: Network,
  pc: Monitor,
  server: Server,
};

export default function TopologyBuilder() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<TopoNode[]>([
    { id: '1', type: 'router', label: 'Router0', x: 400, y: 200 },
    { id: '2', type: 'switch', label: 'Switch0', x: 400, y: 350 },
    { id: '3', type: 'pc', label: 'PC0', x: 250, y: 500 },
    { id: '4', type: 'pc', label: 'PC1', x: 400, y: 500 },
    { id: '5', type: 'server', label: 'Server0', x: 550, y: 500 },
  ]);
  const [edges, setEdges] = useState<TopoEdge[]>([
    { id: 'e1', source: '1', target: '2' },
    { id: 'e2', source: '2', target: '3' },
    { id: 'e3', source: '2', target: '4' },
    { id: 'e4', source: '2', target: '5' },
  ]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [mode, setMode] = useState<ToolMode>('select');
  const [connectSource, setConnectSource] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeIdCounter = useRef(6);

  const addNode = (type: 'router' | 'switch' | 'pc' | 'server') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const label = `${type.charAt(0).toUpperCase() + type.slice(1)}${nodes.filter(n => n.type === type).length}`;
    
    const newNode: TopoNode = {
      id: (nodeIdCounter.current++).toString(),
      type,
      label,
      x: (rect.width / 2 - 200 + Math.random() * 400) / zoom,
      y: (rect.height / 2 - 100 + Math.random() * 200) / zoom,
    };
    setNodes([...nodes, newNode]);
  };

  const handleCanvasClick = useCallback(() => {
    if (mode === 'connect' && connectSource) {
      setConnectSource(null);
    }
  }, [mode, connectSource]);

  const handleNodeClick = (nodeId: string) => {
    if (mode === 'delete') {
      setNodes(nodes.filter(n => n.id !== nodeId));
      setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
      return;
    }

    if (mode === 'connect') {
      if (!connectSource) {
        setConnectSource(nodeId);
      } else if (connectSource !== nodeId) {
        const edgeExists = edges.some(
          e => (e.source === connectSource && e.target === nodeId) ||
               (e.source === nodeId && e.target === connectSource)
        );
        if (!edgeExists) {
          setEdges([...edges, { id: `e${Date.now()}`, source: connectSource, target: nodeId }]);
        }
        setConnectSource(null);
      }
      return;
    }

    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (mode !== 'select') return;
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragging(nodeId);
    setDragOffset({
      x: (e.clientX - rect.left) / zoom - node.x,
      y: (e.clientY - rect.top) / zoom - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom - dragOffset.x;
    const y = (e.clientY - rect.top) / zoom - dragOffset.y;
    
    setNodes(nodes.map(n => n.id === dragging ? { ...n, x, y } : n));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 h-screen flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border bg-card px-4 py-2 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setMode('select'); setConnectSource(null); }}
              className={`p-2 rounded-lg transition-colors ${mode === 'select' ? 'bg-[#e6ff00] text-black' : 'hover:bg-accent text-muted-foreground'}`}
              title="Select"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setMode('connect'); setSelectedNode(null); }}
              className={`p-2 rounded-lg transition-colors ${mode === 'connect' ? 'bg-[#e6ff00] text-black' : 'hover:bg-accent text-muted-foreground'}`}
              title="Connect"
            >
              <Network className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setMode('delete'); setConnectSource(null); setSelectedNode(null); }}
              className={`p-2 rounded-lg transition-colors ${mode === 'delete' ? 'bg-red-500 text-white' : 'hover:bg-accent text-muted-foreground'}`}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-border mx-2" />

          <div className="flex items-center gap-1">
            <button onClick={() => addNode('router')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Router className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Router</span>
            </button>
            <button onClick={() => addNode('switch')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Network className="w-4 h-4 text-blue-500" />
              <span className="hidden sm:inline">Switch</span>
            </button>
            <button onClick={() => addNode('pc')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Monitor className="w-4 h-4 text-green-500" />
              <span className="hidden sm:inline">PC</span>
            </button>
            <button onClick={() => addNode('server')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Server className="w-4 h-4 text-purple-500" />
              <span className="hidden sm:inline">Server</span>
            </button>
          </div>

          <div className="w-px h-6 bg-border mx-2" />

          <div className="flex items-center gap-1">
            <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={() => setZoom(1)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Simpan</span>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden cursor-crosshair"
          style={{ background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: `${20 * zoom}px ${20 * zoom}px` }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          >
            {edges.map((edge) => (
              <g key={edge.id}>
                <line
                  x1={nodes.find(n => n.id === edge.source)?.x}
                  y1={nodes.find(n => n.id === edge.source)?.y}
                  x2={nodes.find(n => n.id === edge.target)?.x}
                  y2={nodes.find(n => n.id === edge.target)?.y}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
                <circle
                  cx={(nodes.find(n => n.id === edge.source)!.x + nodes.find(n => n.id === edge.target)!.x) / 2}
                  cy={(nodes.find(n => n.id === edge.source)!.y + nodes.find(n => n.id === edge.target)!.y) / 2}
                  r="3"
                  className="fill-[#e6ff00]"
                />
              </g>
            ))}
          </svg>

          {nodes.map((node) => {
            const Icon = NODE_ICONS[node.type];
            const colors = NODE_COLORS[node.type];
            const isSelected = selectedNode === node.id;
            const isConnectSource = connectSource === node.id;

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-[#e6ff00] ring-offset-2' : ''
                } ${isConnectSource ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                style={{ left: node.x * zoom, top: node.y * zoom }}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node.id); }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${colors.bg} border-2 ${colors.border} flex flex-col items-center justify-center gap-1 hover:shadow-lg transition-shadow bg-background`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.icon}`} />
                  <span className="text-[10px] font-mono font-semibold text-foreground">{node.label}</span>
                </div>
              </div>
            );
          })}

          {/* Mode indicator */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-muted-foreground">
            Mode: {mode.toUpperCase()}
            {connectSource && ' | Select target node'}
          </div>
        </div>
      </main>
    </div>
  );
}
