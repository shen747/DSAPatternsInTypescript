/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  BinaryTreePathAnalyzer, 
  TreeNode, 
  PathInfo, 
  PathQuery,
  WeightedEdge,
  createTestTree,
  comparePaths 
} from './prob-02';

describe('Binary Tree Traversal Pattern - Problem 2: Binary Tree Path Analysis with Advanced Algorithms', () => {
  let root: TreeNode;
  let analyzer: BinaryTreePathAnalyzer;

  beforeEach(() => {
    // Create test tree:      5
    //                       / \
    //                      4   8
    //                     /   / \
    //                    11  13  4
    //                   / \      \
    //                  7   2      1
    root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.right.right = new TreeNode(1);
    
    analyzer = new BinaryTreePathAnalyzer(root);
  });

  describe('BinaryTreePathAnalyzer', () => {
    test('should find all root-to-leaf paths', () => {
      const result = analyzer.findAllPaths();
      
      expect(result.allPaths.length).toBeGreaterThan(0);
      expect(result.pathStatistics.totalPaths).toBeGreaterThan(0);
      expect(result.pathStatistics.averagePathLength).toBeGreaterThan(0);
      expect(result.performanceMetrics.traversalTime).toBeGreaterThanOrEqual(0);
    });

    test('should find paths with target sum', () => {
      const targetSum = 22; // Path: 5->4->11->2
      const paths = analyzer.findPathsWithSum(targetSum);
      
      expect(paths.length).toBeGreaterThan(0);
      paths.forEach(pathInfo => {
        expect(pathInfo.sum).toBe(targetSum);
        expect(pathInfo.path.length).toBeGreaterThan(0);
      });
    });

    test('should handle no paths with target sum', () => {
      const targetSum = 999; // No such path exists
      const paths = analyzer.findPathsWithSum(targetSum);
      
      expect(paths).toHaveLength(0);
    });

    test('should find k longest paths', () => {
      const k = 2;
      const longestPaths = analyzer.findKLongestPaths(k);
      
      expect(longestPaths.length).toBeLessThanOrEqual(k);
      
      // Verify paths are sorted by length (descending)
      for (let i = 1; i < longestPaths.length; i++) {
        expect(longestPaths[i].length).toBeLessThanOrEqual(longestPaths[i-1].length);
      }
    });

    test('should find k shortest paths', () => {
      const k = 2;
      const shortestPaths = analyzer.findKShortestPaths(k);
      
      expect(shortestPaths.length).toBeLessThanOrEqual(k);
      
      // Verify paths are sorted by length (ascending)
      for (let i = 1; i < shortestPaths.length; i++) {
        expect(shortestPaths[i].length).toBeGreaterThanOrEqual(shortestPaths[i-1].length);
      }
    });

    test('should handle k larger than total paths', () => {
      const k = 100; // More than possible paths
      const longestPaths = analyzer.findKLongestPaths(k);
      
      expect(longestPaths.length).toBeLessThan(k);
    });

    test('should find paths through specific nodes', () => {
      const requiredNodes = [5, 4, 11]; // Root -> left -> left.left
      const paths = analyzer.findPathsThroughNodes(requiredNodes);
      
      paths.forEach(pathInfo => {
        requiredNodes.forEach(node => {
          expect(pathInfo.path).toContain(node);
        });
      });
    });

    test('should handle non-existent nodes in path requirements', () => {
      const requiredNodes = [5, 999]; // 999 doesn't exist
      const paths = analyzer.findPathsThroughNodes(requiredNodes);
      
      expect(paths).toHaveLength(0);
    });

    test('should calculate maximum path sum', () => {
      const maxSum = analyzer.maxPathSum();
      
      expect(maxSum).toBeGreaterThan(0);
      expect(typeof maxSum).toBe('number');
    });

    test('should find tree diameter', () => {
      const diameter = analyzer.findDiameter();
      
      expect(diameter.diameter).toBeGreaterThan(0);
      expect(diameter.path.length).toBeGreaterThan(0);
      expect(diameter.path.length).toBe(diameter.diameter);
    });

    test('should handle single node tree', () => {
      const singleNode = new TreeNode(42);
      const singleAnalyzer = new BinaryTreePathAnalyzer(singleNode);
      
      const result = singleAnalyzer.findAllPaths();
      expect(result.allPaths).toHaveLength(1);
      expect(result.allPaths[0].path).toEqual([42]);
      expect(result.allPaths[0].sum).toBe(42);
      expect(result.allPaths[0].length).toBe(1);
      
      const diameter = singleAnalyzer.findDiameter();
      expect(diameter.diameter).toBe(1);
      expect(diameter.path).toEqual([42]);
    });

    test('should handle empty tree', () => {
      const emptyAnalyzer = new BinaryTreePathAnalyzer(null);
      
      const result = emptyAnalyzer.findAllPaths();
      expect(result.allPaths).toHaveLength(0);
      expect(result.pathStatistics.totalPaths).toBe(0);
      
      const paths = emptyAnalyzer.findPathsWithSum(10);
      expect(paths).toHaveLength(0);
      
      const diameter = emptyAnalyzer.findDiameter();
      expect(diameter.diameter).toBe(0);
      expect(diameter.path).toEqual([]);
    });
  });

  describe('Weighted edge analysis', () => {
    test('should set and use edge weights', () => {
      const edges: WeightedEdge[] = [
        { from: 5, to: 4, weight: 2 },
        { from: 5, to: 8, weight: 3 },
        { from: 4, to: 11, weight: 1 }
      ];
      
      analyzer.setEdgeWeights(edges);
      
      // Should not throw and should handle weighted calculations
      expect(() => analyzer.findAllPaths()).not.toThrow();
    });

    test('should handle empty edge weights', () => {
      analyzer.setEdgeWeights([]);
      
      expect(() => analyzer.findAllPaths()).not.toThrow();
    });
  });

  describe('Custom metrics and queries', () => {
    test('should find paths with custom metric', () => {
      const customMetric = (path: number[]) => path.reduce((sum, val) => sum + val * val, 0);
      const targetValue = 100;
      const tolerance = 10;
      
      const paths = analyzer.findPathsWithCustomMetric(customMetric, targetValue, tolerance);
      
      paths.forEach(pathInfo => {
        const metricValue = customMetric(pathInfo.path);
        expect(Math.abs(metricValue - targetValue)).toBeLessThanOrEqual(tolerance);
      });
    });

    test('should handle custom metric with no matching paths', () => {
      const customMetric = (path: number[]) => 999999; // Very large value
      const targetValue = 1;
      const tolerance = 0;
      
      const paths = analyzer.findPathsWithCustomMetric(customMetric, targetValue, tolerance);
      expect(paths).toHaveLength(0);
    });

    test('should analyze path patterns', () => {
      const patterns = analyzer.analyzePathPatterns();
      
      expect(patterns.commonPrefixes).toBeDefined();
      expect(patterns.commonSuffixes).toBeDefined();
      expect(patterns.pathClusters).toBeDefined();
      expect(patterns.anomalousPath).toBeDefined();
      
      expect(patterns.commonPrefixes.size).toBeGreaterThanOrEqual(0);
      expect(patterns.pathClusters.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Tree modifications', () => {
    test('should update node value', () => {
      const originalPaths = analyzer.findAllPaths();
      
      analyzer.updateNode(11, 20); // Change 11 to 20
      
      const updatedPaths = analyzer.findAllPaths();
      expect(updatedPaths.allPaths.length).toBe(originalPaths.allPaths.length);
      
      // Some path sums should be different
      const originalSums = originalPaths.allPaths.map(p => p.sum).sort();
      const updatedSums = updatedPaths.allPaths.map(p => p.sum).sort();
      expect(originalSums).not.toEqual(updatedSums);
    });

    test('should add new node', () => {
      const originalPaths = analyzer.findAllPaths();
      
      const success = analyzer.addNode(7, 99, true); // Add left child to leaf node 7
      expect(success).toBe(true);
      
      const updatedPaths = analyzer.findAllPaths();
      expect(updatedPaths.allPaths.length).toBeGreaterThan(originalPaths.allPaths.length);
    });

    test('should handle adding to non-existent parent', () => {
      const success = analyzer.addNode(999, 100, true);
      expect(success).toBe(false);
    });

    test('should remove node', () => {
      const originalPaths = analyzer.findAllPaths();
      
      const success = analyzer.removeNode(7); // Remove leaf node
      expect(success).toBe(true);
      
      const updatedPaths = analyzer.findAllPaths();
      expect(updatedPaths.allPaths.length).toBeLessThan(originalPaths.allPaths.length);
    });

    test('should handle removing non-existent node', () => {
      const success = analyzer.removeNode(999);
      expect(success).toBe(false);
    });

    test('should set new root', () => {
      const newRoot = new TreeNode(100);
      newRoot.left = new TreeNode(200);
      newRoot.right = new TreeNode(300);
      
      analyzer.setRoot(newRoot);
      expect(analyzer.getRoot()).toBe(newRoot);
      
      const paths = analyzer.findAllPaths();
      expect(paths.allPaths.length).toBe(2); // Two leaf nodes
      expect(paths.allPaths[0].path[0]).toBe(100); // Root should be 100
    });
  });

  describe('Query filtering', () => {
    test('should filter paths by query parameters', () => {
      const query: PathQuery = {
        minLength: 3,
        maxLength: 4,
        targetSum: 22
      };
      
      const result = analyzer.findAllPaths(query);
      
      result.allPaths.forEach(pathInfo => {
        expect(pathInfo.length).toBeGreaterThanOrEqual(3);
        expect(pathInfo.length).toBeLessThanOrEqual(4);
      });
    });

    test('should limit results based on query', () => {
      const query: PathQuery = {
        limit: 2
      };
      
      const result = analyzer.findAllPaths(query);
      expect(result.allPaths.length).toBeLessThanOrEqual(2);
    });

    test('should filter by must include nodes', () => {
      const query: PathQuery = {
        mustIncludeNodes: [5, 4]
      };
      
      const result = analyzer.findAllPaths(query);
      
      result.allPaths.forEach(pathInfo => {
        expect(pathInfo.path).toContain(5);
        expect(pathInfo.path).toContain(4);
      });
    });

    test('should filter by must exclude nodes', () => {
      const query: PathQuery = {
        mustExcludeNodes: [8]
      };
      
      const result = analyzer.findAllPaths(query);
      
      result.allPaths.forEach(pathInfo => {
        expect(pathInfo.path).not.toContain(8);
      });
    });
  });

  describe('Cache management', () => {
    test('should clear cache', () => {
      analyzer.findAllPaths(); // Populate cache
      
      analyzer.clearCache();
      
      const stats = analyzer.getCacheStats();
      expect(stats.size).toBe(0);
    });

    test('should track cache statistics', () => {
      analyzer.findAllPaths(); // First call
      analyzer.findAllPaths(); // Second call (should hit cache)
      
      const stats = analyzer.getCacheStats();
      expect(stats.size).toBeGreaterThanOrEqual(0);
      expect(stats.hitRate).toBeGreaterThanOrEqual(0);
      expect(stats.memoryUsage).toBeGreaterThan(0);
    });
  });

  describe('Utility functions', () => {
    test('should create test tree from array', () => {
      const values = [1, 2, 3, null, null, 4, 5];
      const tree = createTestTree(values);
      
      expect(tree).not.toBeNull();
      expect(tree!.val).toBe(1);
      expect(tree!.left!.val).toBe(2);
      expect(tree!.right!.val).toBe(3);
      expect(tree!.left!.left).toBeNull();
      expect(tree!.left!.right).toBeNull();
      expect(tree!.right!.left!.val).toBe(4);
      expect(tree!.right!.right!.val).toBe(5);
    });

    test('should compare paths correctly', () => {
      const path1: PathInfo = { path: [1, 2], sum: 3, length: 2 };
      const path2: PathInfo = { path: [1, 2, 3], sum: 6, length: 3 };
      
      expect(comparePaths(path1, path2, 'length')).toBeLessThan(0);
      expect(comparePaths(path1, path2, 'sum')).toBeLessThan(0);
      expect(comparePaths(path2, path1, 'length')).toBeGreaterThan(0);
    });

    test('should handle equal paths in comparison', () => {
      const path1: PathInfo = { path: [1, 2], sum: 3, length: 2 };
      const path2: PathInfo = { path: [2, 1], sum: 3, length: 2 };
      
      expect(comparePaths(path1, path2, 'length')).toBe(0);
      expect(comparePaths(path1, path2, 'sum')).toBe(0);
    });
  });

  describe('Edge cases and performance', () => {
    test('should handle large trees efficiently', () => {
      // Create a larger tree for performance testing
      const largeRoot = new TreeNode(1);
      let current = largeRoot;
      for (let i = 2; i <= 100; i++) {
        current.left = new TreeNode(i);
        current = current.left;
      }
      
      const largeAnalyzer = new BinaryTreePathAnalyzer(largeRoot);
      
      const startTime = Date.now();
      const result = largeAnalyzer.findAllPaths();
      const endTime = Date.now();
      
      expect(result.allPaths.length).toBe(1); // Single path in linear tree
      expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast
    });

    test('should handle trees with negative values', () => {
      const negativeRoot = new TreeNode(-5);
      negativeRoot.left = new TreeNode(-10);
      negativeRoot.right = new TreeNode(15);
      
      const negativeAnalyzer = new BinaryTreePathAnalyzer(negativeRoot);
      
      const result = negativeAnalyzer.findAllPaths();
      expect(result.allPaths.length).toBe(2);
      
      const maxSum = negativeAnalyzer.maxPathSum();
      expect(maxSum).toBe(15); // Should handle negative values correctly
    });

    test('should handle trees with duplicate values', () => {
      const duplicateRoot = new TreeNode(5);
      duplicateRoot.left = new TreeNode(5);
      duplicateRoot.right = new TreeNode(5);
      
      const duplicateAnalyzer = new BinaryTreePathAnalyzer(duplicateRoot);
      
      const result = duplicateAnalyzer.findAllPaths();
      expect(result.allPaths.length).toBe(2);
      
      result.allPaths.forEach(pathInfo => {
        expect(pathInfo.sum).toBe(10); // 5 + 5
      });
    });
  });
});
