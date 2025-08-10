/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  ShortestPathResult,
  dijkstra,
  bellmanFord,
  floydWarshall,  
  RedBlackTree,
  createGraph,
  printShortestPath,

} from './problem';

describe('Advanced Algorithms: Shortest Path and Red-Black Trees', () => {
  describe('Shortest Path Algorithms', () => {
    describe('Dijkstra Algorithm', () => {
      test('should find shortest path in simple graph', () => {
        const graph = createGraph(4, [
          [0, 1, 4],
          [0, 2, 2],
          [1, 2, 1],
          [1, 3, 5],
          [2, 3, 8]
        ]);
        
        const result = dijkstra(graph, 0);
        
        expect(result.distances[0]).toBe(0);
        expect(result.distances[1]).toBe(3); // 0 -> 2 -> 1
        expect(result.distances[2]).toBe(2); // 0 -> 2
        expect(result.distances[3]).toBe(8); // 0 -> 2 -> 1 -> 3
      });

      test('should handle disconnected graph', () => {
        const graph = createGraph(3, [
          [0, 1, 1]
          // No edge to vertex 2
        ]);
        
        const result = dijkstra(graph, 0);
        
        expect(result.distances[0]).toBe(0);
        expect(result.distances[1]).toBe(1);
        expect(result.distances[2]).toBe(Infinity);
      });

      test('should handle single vertex graph', () => {
        const graph = createGraph(1, []);
        
        const result = dijkstra(graph, 0);
        
        expect(result.distances[0]).toBe(0);
      });
    });

    describe('Bellman-Ford Algorithm', () => {
      test('should find shortest path with negative weights', () => {
        const graph = createGraph(4, [
          [0, 1, 4],
          [0, 2, 2],
          [1, 2, -1],
          [1, 3, 5],
          [2, 3, 8]
        ]);
        
        const result = bellmanFord(graph, 0);

        expect(result).not.toBeNull();
        if (result !== null) {
          expect(result.distances[0]).toBe(0);
          expect(result.distances[1]).toBe(4);
          expect(result.distances[2]).toBe(3); // 0 -> 1 -> 2 (negative edge)
          expect(result.distances[3]).toBe(9); // 0 -> 1 -> 3
        }
      });

      test('should detect negative cycle', () => {
        const graph = createGraph(3, [
          [0, 1, 1],
          [1, 2, 2],
          [2, 0, -4] // Creates negative cycle
        ]);
        
        const result = bellmanFord(graph, 0);
        
        expect(result).toBeNull(); // Negative cycle detected
      });

      test('should handle graph without negative cycles', () => {
        const graph = createGraph(3, [
          [0, 1, 1],
          [1, 2, 2]
        ]);
        
        const result = bellmanFord(graph, 0);

        expect(result).not.toBeNull();
        if (result !== null) {
          expect(result.distances[0]).toBe(0);
          expect(result.distances[1]).toBe(1);
          expect(result.distances[2]).toBe(3);
        }
      });
    });

    describe('Floyd-Warshall Algorithm', () => {
      test('should find all pairs shortest paths', () => {
        const graph = createGraph(4, [
          [0, 1, 4],
          [0, 2, 2],
          [1, 2, 1],
          [1, 3, 5],
          [2, 3, 8]
        ]);
        
        const result = floydWarshall(graph);

        expect(result).not.toBeNull();
        if (result !== null && result[0] && result[1]) {
          expect(result[0][0]).toBe(0);
          expect(result[0][1]).toBe(3); // 0 -> 2 -> 1
          expect(result[0][2]).toBe(2); // 0 -> 2
          expect(result[0][3]).toBe(8); // 0 -> 2 -> 1 -> 3
          expect(result[1][3]).toBe(5); // 1 -> 3
        }
      });

      test('should detect negative cycle in all pairs', () => {
        const graph = createGraph(3, [
          [0, 1, 1],
          [1, 2, 2],
          [2, 0, -4] // Creates negative cycle
        ]);
        
        const result = floydWarshall(graph);
        
        expect(result).toBeNull(); // Negative cycle detected
      });

      test('should handle graph with no edges', () => {
        const graph = createGraph(3, []);
        
        const result = floydWarshall(graph);

        expect(result).not.toBeNull();
        if (result !== null && result[0]) {
          expect(result[0][0]).toBe(0);
          expect(result[0][1]).toBe(Infinity);
          expect(result[0][2]).toBe(Infinity);
        }
      });
    });

    describe('Utility Functions', () => {
      test('should create graph correctly', () => {
        const edges: [number, number, number][] = [
          [0, 1, 5],
          [1, 2, 3]
        ];
        
        const graph = createGraph(3, edges);
        
        expect(graph.vertices).toBe(3);
        expect(graph.edges).toHaveLength(2);
        expect(graph.edges[0]).toEqual({ from: 0, to: 1, weight: 5 });
        expect(graph.edges[1]).toEqual({ from: 1, to: 2, weight: 3 });
      });

      test('should print shortest path correctly', () => {
        const result: ShortestPathResult = {
          distances: [0, 3, 5],
          predecessors: [-1, 0, 1],
          path: [0, 1, 2]
        };
        
        const output = printShortestPath(result, 0, 2);
        
        expect(output).toContain('Shortest distance from 0 to 2: 5');
        expect(output).toContain('Path: 0 -> 1 -> 2');
      });

      test('should handle no path case', () => {
        const result: ShortestPathResult = {
          distances: [0, Infinity, Infinity],
          predecessors: [-1, -1, -1],
          path: []
        };
        
        const output = printShortestPath(result, 0, 2);
        
        expect(output).toContain('No path from 0 to 2');
      });

      test('should handle negative cycle case', () => {
        const output = printShortestPath(null, 0, 2);
        
        expect(output).toContain('Negative cycle detected');
      });
    });
  });

  describe('Red-Black Tree', () => {
    let tree: RedBlackTree<number>;

    beforeEach(() => {
      tree = new RedBlackTree<number>();
    });

    describe('Insertion', () => {
      test('should insert single element', () => {
        tree.insert(10);
        
        const result = tree.inorder();
        expect(result).toEqual([10]);
      });

      test('should insert multiple elements in order', () => {
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        
        const result = tree.inorder();
        expect(result).toEqual([5, 10, 15]);
      });

      test('should maintain red-black properties after insertion', () => {
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
        
        const result = tree.inorder();
        expect(result).toEqual([3, 5, 7, 10, 15]);
        expect(tree.isBalanced()).toBe(true);
      });

      test('should handle duplicate insertions', () => {
        tree.insert(10);
        tree.insert(10);
        
        const result = tree.inorder();
        expect(result).toEqual([10, 10]);
      });
    });

    describe('Search', () => {
      beforeEach(() => {
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
      });

      test('should find existing elements', () => {
        const node = tree.search(10);
        expect(node).not.toBeNull();
        expect(node!.key).toBe(10);
      });

      test('should return null for non-existing elements', () => {
        const node = tree.search(20);
        expect(node).toBeNull();
      });

      test('should find all inserted elements', () => {
        const elements = [3, 5, 7, 10, 15];
        
        elements.forEach(element => {
          const node = tree.search(element);
          expect(node).not.toBeNull();
          expect(node!.key).toBe(element);
        });
      });
    });

    describe('Deletion', () => {
      beforeEach(() => {
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
      });

      test('should delete leaf node', () => {
        const deleted = tree.delete(3);
        
        expect(deleted).toBe(true);
        const result = tree.inorder();
        expect(result).toEqual([5, 7, 10, 15]);
      });

      test('should delete node with one child', () => {
        tree.delete(3); // Delete leaf first
        const deleted = tree.delete(5); // Now has one child
        
        expect(deleted).toBe(true);
        const result = tree.inorder();
        expect(result).toEqual([7, 10, 15]);
      });

      test('should delete node with two children', () => {
        const deleted = tree.delete(10);
        
        expect(deleted).toBe(true);
        const result = tree.inorder();
        expect(result).toEqual([3, 5, 7, 15]);
      });

      test('should return false for non-existing element', () => {
        const deleted = tree.delete(20);
        
        expect(deleted).toBe(false);
        const result = tree.inorder();
        expect(result).toEqual([3, 5, 7, 10, 15]);
      });

      test('should maintain red-black properties after deletion', () => {
        tree.delete(10);
        
        const result = tree.inorder();
        expect(result).toEqual([3, 5, 7, 15]);
        expect(tree.isBalanced()).toBe(true);
      });
    });

    describe('Tree Properties', () => {
      test('should calculate height correctly', () => {
        expect(tree.getHeight()).toBe(0); // Empty tree
        
        tree.insert(10);
        expect(tree.getHeight()).toBe(1);
        
        tree.insert(5);
        tree.insert(15);
        expect(tree.getHeight()).toBe(2);
      });

      test('should maintain balance after operations', () => {
        // Insert elements that would create an unbalanced tree
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        tree.insert(3);
        tree.insert(7);
        tree.insert(1);
        tree.insert(9);
        
        expect(tree.isBalanced()).toBe(true);
        
        // Delete elements and check balance
        tree.delete(10);
        expect(tree.isBalanced()).toBe(true);
      });

      test('should handle large number of insertions', () => {
        const elements = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
        
        elements.forEach(element => {
          tree.insert(element);
        });
        
        const result = tree.inorder();
        expect(result).toEqual(elements.sort((a, b) => a - b));
        expect(tree.isBalanced()).toBe(true);
      });
    });

    describe('Edge Cases', () => {
      test('should handle empty tree operations', () => {
        expect(tree.search(10)).toBeNull();
        expect(tree.delete(10)).toBe(false);
        expect(tree.inorder()).toEqual([]);
        expect(tree.getHeight()).toBe(0);
        expect(tree.isBalanced()).toBe(true);
      });

      test('should handle single element tree', () => {
        tree.insert(10);
        
        expect(tree.search(10)).not.toBeNull();
        expect(tree.delete(10)).toBe(true);
        expect(tree.inorder()).toEqual([]);
      });

      test('should handle all elements deleted', () => {
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        
        tree.delete(10);
        tree.delete(5);
        tree.delete(15);
        
        expect(tree.inorder()).toEqual([]);
        expect(tree.getHeight()).toBe(0);
        expect(tree.isBalanced()).toBe(true);
      });
    });
  });

  describe('Integration Tests', () => {
    test('should work with different data types', () => {
      const stringTree = new RedBlackTree<string>();
      stringTree.insert('apple');
      stringTree.insert('banana');
      stringTree.insert('cherry');
      
      const result = stringTree.inorder();
      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    test('should handle complex graph scenarios', () => {
      // Create a complex graph with multiple paths
      const graph = createGraph(6, [
        [0, 1, 2],
        [0, 2, 4],
        [1, 2, 1],
        [1, 3, 7],
        [2, 3, 3],
        [2, 4, 5],
        [3, 4, 2],
        [3, 5, 1],
        [4, 5, 6]
      ]);
      
      const dijkstraResult = dijkstra(graph, 0);
      const bellmanResult = bellmanFord(graph, 0);

      expect(dijkstraResult.distances[5]).toBe(6); // 0 -> 1 -> 2 -> 3 -> 5
      if (bellmanResult !== null) {
        expect(bellmanResult.distances[5]).toBe(6);
      }
    });

    test('should validate red-black tree properties', () => {
      const tree = new RedBlackTree<number>();
      
      // Insert elements that would test red-black properties
      const elements = [7, 3, 18, 10, 22, 8, 11, 26, 2, 6, 13];
      elements.forEach(element => tree.insert(element));
      
      // The tree should maintain red-black properties
      expect(tree.isBalanced()).toBe(true);
      
      // Test deletion and rebalancing
      tree.delete(18);
      tree.delete(11);
      tree.delete(3);
      
      expect(tree.isBalanced()).toBe(true);
    });
  });
}); 