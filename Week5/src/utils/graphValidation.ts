export type Edge = { source: string; target: string };
export type Node = { id: string; name: string };

export function validateAndSortGraph(nodes: Node[], edges: Edge[]) {
  const adjacencyList: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};

  // Initialize graph
  nodes.forEach((node) => {
    adjacencyList[node.id] = [];
    inDegree[node.id] = 0;
  });

  // Build graph and calculate in-degrees
  edges.forEach((edge) => {
    adjacencyList[edge.source].push(edge.target);
    inDegree[edge.target] += 1;
  });

  const queue: string[] = [];
  const executionOrder: string[] = [];

  // Find blocks with no dependencies (in-degree 0)
  Object.keys(inDegree).forEach((nodeId) => {
    if (inDegree[nodeId] === 0) {
      queue.push(nodeId);
    }
  });

  // Kahn's Algorithm for Topological Sorting
  while (queue.length > 0) {
    const current = queue.shift()!;
    executionOrder.push(current);

    adjacencyList[current].forEach((neighbor) => {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  // Detect cycles: if we couldn't process all nodes, a cycle exists
  if (executionOrder.length !== nodes.length) {
    return { isValid: false, order: [], error: "Cycle detected! Graph is not a valid DAG." };
  }

  return { isValid: true, order: executionOrder, error: null };
}