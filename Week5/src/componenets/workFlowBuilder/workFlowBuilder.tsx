import { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, applyNodeChanges, applyEdgeChanges} from 'reactflow';
import type  {Edge, Node, NodeChange, EdgeChange, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import './workFlowBuilder.css'; // Standalone Style Import
import { validateAndSortGraph } from '../../utils/graphValidation';

const initialNodes: Node[] = [
  { id: '1', position: { x: 150, y: 100 }, data: { label: 'Load Image' } },
  { id: '2', position: { x: 150, y: 250 }, data: { label: 'Detect Objects' } },
  { id: '3', position: { x: 150, y: 400 }, data: { label: 'Output Results' } },
];

export const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [validationResult, setValidationResult] = useState<string>('Connect nodes to test validation.');

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleValidate = () => {
    const graphNodes = nodes.map(n => ({ id: n.id, name: n.data.label }));
    const graphEdges = edges.map(e => ({ source: e.source, target: e.target }));
    
    const result = validateAndSortGraph(graphNodes, graphEdges);
    
    if (result.isValid) {
      const orderNames = result.order.map(id => graphNodes.find(n => n.id === id)?.name);
      setValidationResult(`Valid DAG! Execution Order: ${orderNames.join(' ➔ ')}`);
    } else {
      setValidationResult(`Error: ${result.error}`);
    }
  };

  return (
    <div className="workflow-wrapper">
      <div className="validation-bar">
        <span className="validation-status">{validationResult}</span>
        <button className="validate-btn" onClick={handleValidate}>Validate Graph</button>
      </div>
      <div className="canvas-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#4a5568" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};