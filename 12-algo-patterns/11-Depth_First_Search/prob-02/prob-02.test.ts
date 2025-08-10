/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  GraphCycleAnalyzer, 
  GraphType, 
  CycleDetectionAlgorithm,
  GraphEdge,
  createTestGraph,
  generateVisualizationData 
} from './prob-02';

describe('Depth First Search Pattern - Problem 2: Graph Cycle Detection with Advanced Analysis', () => {
  describe('GraphCycleAnalyzer', () => {
    test('should detect cycle in simple directed graph', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycleCount).toBeGreaterThan(0);
      expect(result.cycles.length).toBeGreaterThan(0);
      expect(result.performanceMetrics.dfsTime).toBeGreaterThanOrEqual(0);
    });

    test('should detect no cycle in acyclic directed graph', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(false);
      expect(result.cycleCount).toBe(0);
      expect(result.cycles.length).toBe(0);
    });

    test('should detect cycle in undirected graph', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.UNDIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
    });

    test('should handle empty graph', () => {
      const analyzer = new GraphCycleAnalyzer(0, GraphType.DIRECTED);
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(false);
      expect(result.cycleCount).toBe(0);
      expect(result.cycles.length).toBe(0);
    });

    test('should handle single vertex graph', () => {
      const analyzer = new GraphCycleAnalyzer(1, GraphType.DIRECTED);
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(false);
      expect(result.cycleCount).toBe(0);
    });

    test('should detect self-loop', () => {
      const analyzer = new GraphCycleAnalyzer(1, GraphType.DIRECTED);
      analyzer.addEdge(0, 0);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
      expect(result.cycles[0].length).toBe(1);
    });

    test('should use different detection algorithms', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const dfsResult = analyzer.detectCycles(CycleDetectionAlgorithm.DFS_COLORS);
      const tarjanResult = analyzer.detectCycles(CycleDetectionAlgorithm.TARJAN);
      
      expect(dfsResult.hasCycle).toBe(true);
      expect(tarjanResult.hasCycle).toBe(true);
      expect(dfsResult.cycleCount).toBe(tarjanResult.cycleCount);
    });

    test('should find strongly connected components', () => {
      const analyzer = new GraphCycleAnalyzer(4, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      analyzer.addEdge(2, 3);
      
      const sccs = analyzer.findStronglyConnectedComponents();
      
      expect(sccs.length).toBeGreaterThan(0);
      sccs.forEach(scc => {
        expect(scc.vertices.length).toBeGreaterThan(0);
        expect(scc.size).toBe(scc.vertices.length);
        expect(typeof scc.hasCycle).toBe('boolean');
      });
    });

    test('should detect negative cycles', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1, 1);
      analyzer.addEdge(1, 2, -3);
      analyzer.addEdge(2, 0, 1);
      
      const negativeCycles = analyzer.detectNegativeCycles();
      
      expect(negativeCycles.length).toBeGreaterThan(0);
      negativeCycles.forEach(cycle => {
        expect(cycle.weight).toBeLessThan(0);
      });
    });

    test('should handle no negative cycles', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1, 1);
      analyzer.addEdge(1, 2, 1);
      analyzer.addEdge(2, 0, 1);
      
      const negativeCycles = analyzer.detectNegativeCycles();
      
      expect(negativeCycles.length).toBe(0);
    });

    test('should find all simple cycles', () => {
      const analyzer = new GraphCycleAnalyzer(4, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      analyzer.addEdge(1, 3);
      analyzer.addEdge(3, 1);
      
      const cycles = analyzer.findAllSimpleCycles();
      
      expect(cycles.length).toBeGreaterThan(0);
      cycles.forEach(cycle => {
        expect(cycle.type).toBe('simple');
        expect(cycle.vertices.length).toBeGreaterThan(0);
        expect(cycle.length).toBe(cycle.vertices.length);
      });
    });
  });

  describe('Graph modifications', () => {
    test('should add edge successfully', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      
      const success = analyzer.addEdge(0, 1);
      expect(success).toBe(true);
      
      const graphInfo = analyzer.getGraphInfo();
      expect(graphInfo.edges).toBe(1);
    });

    test('should handle invalid edge addition', () => {
      const analyzer = new GraphCycleAnalyzer(2, GraphType.DIRECTED);
      
      const success = analyzer.addEdge(0, 5); // Invalid vertex
      expect(success).toBe(false);
    });

    test('should remove edge successfully', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      
      const success = analyzer.removeEdge(0, 1);
      expect(success).toBe(true);
      
      const graphInfo = analyzer.getGraphInfo();
      expect(graphInfo.edges).toBe(1);
    });

    test('should handle removing non-existent edge', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      
      const success = analyzer.removeEdge(0, 1);
      expect(success).toBe(false);
    });

    test('should add vertex successfully', () => {
      const analyzer = new GraphCycleAnalyzer(2, GraphType.DIRECTED);
      
      const newVertex = analyzer.addVertex();
      expect(newVertex).toBe(2);
      
      const graphInfo = analyzer.getGraphInfo();
      expect(graphInfo.vertices).toBe(3);
    });

    test('should remove vertex successfully', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      
      const success = analyzer.removeVertex(1);
      expect(success).toBe(true);
      
      const graphInfo = analyzer.getGraphInfo();
      expect(graphInfo.vertices).toBe(2);
    });

    test('should handle removing invalid vertex', () => {
      const analyzer = new GraphCycleAnalyzer(2, GraphType.DIRECTED);
      
      const success = analyzer.removeVertex(5);
      expect(success).toBe(false);
    });

    test('should track modification history', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.removeEdge(0, 1);
      
      const history = analyzer.getModificationHistory();
      expect(history.length).toBe(3);
      
      history.forEach(modification => {
        expect(modification.type).toMatch(/add-edge|remove-edge|add-vertex|remove-vertex/);
        expect(modification.timestamp).toBeGreaterThan(0);
      });
    });
  });

  describe('Advanced analysis', () => {
    test('should find minimum cycle breaking set', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const breakingSet = analyzer.findMinimumCycleBreakingSet();
      
      expect(breakingSet.length).toBeGreaterThan(0);
      expect(breakingSet.length).toBeLessThanOrEqual(3);
    });

    test('should analyze cycle criticality', () => {
      const analyzer = new GraphCycleAnalyzer(4, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      analyzer.addEdge(1, 3);
      analyzer.addEdge(3, 1);
      
      const criticality = analyzer.analyzeCycleCriticality();
      
      expect(criticality.size).toBeGreaterThan(0);
      criticality.forEach((score, cycle) => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
        expect(cycle.vertices.length).toBeGreaterThan(0);
      });
    });

    test('should find arbitrage opportunities', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1, -1);
      analyzer.addEdge(1, 2, -1);
      analyzer.addEdge(2, 0, -1);
      
      const opportunities = analyzer.findArbitrageOpportunities();
      
      opportunities.forEach(opportunity => {
        expect(opportunity.profit).toBeGreaterThan(0);
        expect(opportunity.cycle.weight).toBeLessThan(0);
      });
    });

    test('should check if graph is acyclic', () => {
      const cyclicAnalyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      cyclicAnalyzer.addEdge(0, 1);
      cyclicAnalyzer.addEdge(1, 2);
      cyclicAnalyzer.addEdge(2, 0);
      
      const acyclicAnalyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      acyclicAnalyzer.addEdge(0, 1);
      acyclicAnalyzer.addEdge(1, 2);
      
      expect(cyclicAnalyzer.isAcyclic()).toBe(false);
      expect(acyclicAnalyzer.isAcyclic()).toBe(true);
    });

    test('should get topological order for acyclic graph', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      
      const order = analyzer.getTopologicalOrder();
      
      expect(order).not.toBeNull();
      expect(order!.length).toBe(3);
      expect(order).toContain(0);
      expect(order).toContain(1);
      expect(order).toContain(2);
    });

    test('should return null topological order for cyclic graph', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const order = analyzer.getTopologicalOrder();
      
      expect(order).toBeNull();
    });
  });

  describe('Graph information and utilities', () => {
    test('should get comprehensive graph information', () => {
      const analyzer = new GraphCycleAnalyzer(4, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 3);
      
      const info = analyzer.getGraphInfo();
      
      expect(info.vertices).toBe(4);
      expect(info.edges).toBe(3);
      expect(info.density).toBeGreaterThanOrEqual(0);
      expect(info.density).toBeLessThanOrEqual(1);
      expect(typeof info.isConnected).toBe('boolean');
      expect(info.type).toBe(GraphType.DIRECTED);
    });

    test('should clear cache correctly', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      // Populate cache
      analyzer.detectCycles();
      
      // Clear cache
      analyzer.clearCache();
      
      // Should still work after cache clear
      const result = analyzer.detectCycles();
      expect(result.hasCycle).toBe(true);
    });

    test('should reset graph correctly', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      
      analyzer.reset(2, GraphType.UNDIRECTED);
      
      const info = analyzer.getGraphInfo();
      expect(info.vertices).toBe(2);
      expect(info.edges).toBe(0);
      expect(info.type).toBe(GraphType.UNDIRECTED);
      
      const history = analyzer.getModificationHistory();
      expect(history.length).toBe(0);
    });
  });

  describe('Utility functions', () => {
    test('should create test graph correctly', () => {
      const edges: Array<[number, number, number?]> = [
        [0, 1, 5],
        [1, 2, 3],
        [2, 0, -2]
      ];
      
      const analyzer = createTestGraph(edges, 3, true);
      
      const info = analyzer.getGraphInfo();
      expect(info.vertices).toBe(3);
      expect(info.edges).toBe(3);
      expect(info.type).toBe(GraphType.DIRECTED);
    });

    test('should generate visualization data', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      const vizData = generateVisualizationData(analyzer);
      
      expect(vizData.nodes.length).toBe(3);
      expect(vizData.edges.length).toBe(3);
      expect(vizData.cycles.length).toBeGreaterThan(0);
      
      vizData.nodes.forEach(node => {
        expect(node.id).toBeGreaterThanOrEqual(0);
        expect(node.label).toBeDefined();
      });
      
      vizData.edges.forEach(edge => {
        expect(edge.from).toBeGreaterThanOrEqual(0);
        expect(edge.to).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large graphs efficiently', () => {
      const size = 100;
      const analyzer = new GraphCycleAnalyzer(size, GraphType.DIRECTED);
      
      // Create a chain with a back edge
      for (let i = 0; i < size - 1; i++) {
        analyzer.addEdge(i, i + 1);
      }
      analyzer.addEdge(size - 1, 0); // Create cycle
      
      const startTime = Date.now();
      const result = analyzer.detectCycles();
      const endTime = Date.now();
      
      expect(result.hasCycle).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast
    });

    test('should handle disconnected graphs', () => {
      const analyzer = new GraphCycleAnalyzer(6, GraphType.DIRECTED);
      
      // First component with cycle
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      // Second component without cycle
      analyzer.addEdge(3, 4);
      analyzer.addEdge(4, 5);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
      
      const info = analyzer.getGraphInfo();
      expect(info.isConnected).toBe(false);
    });

    test('should handle graphs with multiple cycles', () => {
      const analyzer = new GraphCycleAnalyzer(6, GraphType.DIRECTED);
      
      // First cycle: 0 -> 1 -> 2 -> 0
      analyzer.addEdge(0, 1);
      analyzer.addEdge(1, 2);
      analyzer.addEdge(2, 0);
      
      // Second cycle: 3 -> 4 -> 5 -> 3
      analyzer.addEdge(3, 4);
      analyzer.addEdge(4, 5);
      analyzer.addEdge(5, 3);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycleCount).toBeGreaterThanOrEqual(2);
      expect(result.cycles.length).toBeGreaterThanOrEqual(2);
    });

    test('should handle weighted graphs correctly', () => {
      const analyzer = new GraphCycleAnalyzer(3, GraphType.DIRECTED);
      analyzer.addEdge(0, 1, 10);
      analyzer.addEdge(1, 2, 20);
      analyzer.addEdge(2, 0, 30);
      
      const result = analyzer.detectCycles();
      
      expect(result.hasCycle).toBe(true);
      expect(result.cycles.length).toBeGreaterThan(0);
      expect(result.cycles[0].weight).toBe(60); // 10 + 20 + 30
    });
  });
});
