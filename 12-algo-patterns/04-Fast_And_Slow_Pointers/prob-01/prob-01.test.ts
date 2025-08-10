/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  ListNode, 
  detectAndAnalyzeCycle, 
  hasCycleOptimized, 
  removeCycle, 
  createLinkedListWithCycle,
  detectCycleInGraph,
  CycleAnalysis 
} from './prob-01';

describe('Fast and Slow Pointers Pattern - Problem 1: Advanced Cycle Detection and Analysis', () => {
  describe('createLinkedListWithCycle', () => {
    test('should create linked list without cycle', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4]);
      
      expect(head).not.toBeNull();
      expect(head!.val).toBe(1);
      expect(head!.next!.val).toBe(2);
      expect(head!.next!.next!.val).toBe(3);
      expect(head!.next!.next!.next!.val).toBe(4);
      expect(head!.next!.next!.next!.next).toBeNull();
    });

    test('should create linked list with cycle', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4], 1);
      
      expect(head).not.toBeNull();
      expect(head!.val).toBe(1);
      
      // Traverse to verify cycle exists
      let current = head;
      const visited = new Set<ListNode>();
      let cycleDetected = false;
      
      while (current && !visited.has(current)) {
        visited.add(current);
        current = current.next;
      }
      
      if (current && visited.has(current)) {
        cycleDetected = true;
        expect(current.val).toBe(2); // Should cycle back to node with value 2
      }
      
      expect(cycleDetected).toBe(true);
    });

    test('should handle empty array', () => {
      const head = createLinkedListWithCycle([]);
      expect(head).toBeNull();
    });

    test('should handle single node with self-loop', () => {
      const head = createLinkedListWithCycle([1], 0);
      
      expect(head).not.toBeNull();
      expect(head!.val).toBe(1);
      expect(head!.next).toBe(head); // Points to itself
    });
  });

  describe('detectAndAnalyzeCycle', () => {
    test('should detect cycle and provide complete analysis', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4, 5], 1);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleStart).not.toBeNull();
      expect(analysis.cycleStart!.val).toBe(2);
      expect(analysis.cycleLength).toBe(4); // Nodes 2, 3, 4, 5
      expect(analysis.cycleNodes).toEqual([2, 3, 4, 5]);
      expect(analysis.distanceToStart).toBe(1); // Distance from head to cycle start
      expect(analysis.totalNodes).toBe(5);
      
      // Verify metrics are tracked
      expect(analysis.metrics.slowSteps).toBeGreaterThan(0);
      expect(analysis.metrics.fastSteps).toBeGreaterThan(0);
      expect(analysis.metrics.detectionSteps).toBeGreaterThan(0);
    });

    test('should handle list without cycle', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4]);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(false);
      expect(analysis.cycleStart).toBeNull();
      expect(analysis.cycleLength).toBe(0);
      expect(analysis.cycleNodes).toEqual([]);
      expect(analysis.distanceToStart).toBe(-1);
      expect(analysis.totalNodes).toBe(4);
    });

    test('should handle empty list', () => {
      const analysis = detectAndAnalyzeCycle(null);
      
      expect(analysis.hasCycle).toBe(false);
      expect(analysis.cycleStart).toBeNull();
      expect(analysis.cycleLength).toBe(0);
      expect(analysis.cycleNodes).toEqual([]);
      expect(analysis.distanceToStart).toBe(-1);
      expect(analysis.totalNodes).toBe(0);
    });

    test('should handle single node without cycle', () => {
      const head = createLinkedListWithCycle([1]);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(false);
      expect(analysis.totalNodes).toBe(1);
    });

    test('should handle single node with self-loop', () => {
      const head = createLinkedListWithCycle([1], 0);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleStart!.val).toBe(1);
      expect(analysis.cycleLength).toBe(1);
      expect(analysis.cycleNodes).toEqual([1]);
      expect(analysis.distanceToStart).toBe(0);
      expect(analysis.totalNodes).toBe(1);
    });

    test('should handle cycle at the beginning', () => {
      const head = createLinkedListWithCycle([1, 2, 3], 0);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleStart!.val).toBe(1);
      expect(analysis.distanceToStart).toBe(0);
      expect(analysis.cycleLength).toBe(3);
    });

    test('should handle large cycle', () => {
      const values = Array.from({ length: 1000 }, (_, i) => i);
      const head = createLinkedListWithCycle(values, 500);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleStart!.val).toBe(500);
      expect(analysis.cycleLength).toBe(500);
      expect(analysis.distanceToStart).toBe(500);
    });
  });

  describe('hasCycleOptimized', () => {
    test('should detect cycle efficiently', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4], 1);
      const result = hasCycleOptimized(head);
      
      expect(result).toBe(true);
    });

    test('should detect no cycle efficiently', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4]);
      const result = hasCycleOptimized(head);
      
      expect(result).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(hasCycleOptimized(null)).toBe(false);
      
      const singleNode = createLinkedListWithCycle([1]);
      expect(hasCycleOptimized(singleNode)).toBe(false);
      
      const selfLoop = createLinkedListWithCycle([1], 0);
      expect(hasCycleOptimized(selfLoop)).toBe(true);
    });

    test('should be faster than full analysis', () => {
      const values = Array.from({ length: 10000 }, (_, i) => i);
      const head = createLinkedListWithCycle(values, 5000);
      
      const startTime1 = Date.now();
      const optimizedResult = hasCycleOptimized(head);
      const endTime1 = Date.now();
      
      const startTime2 = Date.now();
      const fullAnalysis = detectAndAnalyzeCycle(head);
      const endTime2 = Date.now();
      
      expect(optimizedResult).toBe(true);
      expect(fullAnalysis.hasCycle).toBe(true);
      expect(endTime1 - startTime1).toBeLessThanOrEqual(endTime2 - startTime2);
    });
  });

  describe('removeCycle', () => {
    test('should remove cycle from linked list', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4], 1);
      const modifiedHead = removeCycle(head);
      
      // Verify cycle is removed
      const analysis = detectAndAnalyzeCycle(modifiedHead);
      expect(analysis.hasCycle).toBe(false);
      
      // Verify list structure is preserved
      expect(modifiedHead!.val).toBe(1);
      expect(modifiedHead!.next!.val).toBe(2);
      expect(modifiedHead!.next!.next!.val).toBe(3);
      expect(modifiedHead!.next!.next!.next!.val).toBe(4);
      expect(modifiedHead!.next!.next!.next!.next).toBeNull();
    });

    test('should handle list without cycle', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4]);
      const modifiedHead = removeCycle(head);
      
      // Should remain unchanged
      const analysis = detectAndAnalyzeCycle(modifiedHead);
      expect(analysis.hasCycle).toBe(false);
      expect(analysis.totalNodes).toBe(4);
    });

    test('should handle self-loop', () => {
      const head = createLinkedListWithCycle([1], 0);
      const modifiedHead = removeCycle(head);
      
      expect(modifiedHead!.val).toBe(1);
      expect(modifiedHead!.next).toBeNull();
      
      const analysis = detectAndAnalyzeCycle(modifiedHead);
      expect(analysis.hasCycle).toBe(false);
    });

    test('should handle empty list', () => {
      const modifiedHead = removeCycle(null);
      expect(modifiedHead).toBeNull();
    });

    test('should handle cycle at beginning', () => {
      const head = createLinkedListWithCycle([1, 2, 3], 0);
      const modifiedHead = removeCycle(head);
      
      // After removing cycle, should have linear structure
      const analysis = detectAndAnalyzeCycle(modifiedHead);
      expect(analysis.hasCycle).toBe(false);
      expect(analysis.totalNodes).toBeGreaterThan(0);
    });
  });

  describe('detectCycleInGraph', () => {
    test('should detect cycle in graph', () => {
      const graph = new Map<number, number[]>();
      graph.set(0, [1]);
      graph.set(1, [2]);
      graph.set(2, [3]);
      graph.set(3, [1]); // Cycle: 1 -> 2 -> 3 -> 1
      
      const analysis = detectCycleInGraph(graph, 0);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleLength).toBeGreaterThan(0);
    });

    test('should handle graph without cycle', () => {
      const graph = new Map<number, number[]>();
      graph.set(0, [1]);
      graph.set(1, [2]);
      graph.set(2, [3]);
      graph.set(3, []); // No cycle
      
      const analysis = detectCycleInGraph(graph, 0);
      
      expect(analysis.hasCycle).toBe(false);
    });

    test('should handle self-loop in graph', () => {
      const graph = new Map<number, number[]>();
      graph.set(0, [0]); // Self-loop
      
      const analysis = detectCycleInGraph(graph, 0);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleLength).toBe(1);
    });

    test('should handle disconnected graph', () => {
      const graph = new Map<number, number[]>();
      graph.set(0, []);
      graph.set(1, [2]);
      graph.set(2, [1]); // Cycle not reachable from 0
      
      const analysis = detectCycleInGraph(graph, 0);
      
      expect(analysis.hasCycle).toBe(false); // No cycle reachable from start node 0
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle very long list efficiently', () => {
      const values = Array.from({ length: 50000 }, (_, i) => i);
      const head = createLinkedListWithCycle(values, 25000);
      
      const startTime = Date.now();
      const analysis = detectAndAnalyzeCycle(head);
      const endTime = Date.now();
      
      expect(analysis.hasCycle).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });

    test('should handle list with duplicate values', () => {
      const head = createLinkedListWithCycle([1, 1, 1, 1], 1);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.hasCycle).toBe(true);
      expect(analysis.cycleNodes).toEqual([1, 1, 1]); // Values in cycle
    });

    test('should track metrics accurately', () => {
      const head = createLinkedListWithCycle([1, 2, 3, 4, 5], 2);
      const analysis = detectAndAnalyzeCycle(head);
      
      expect(analysis.metrics.slowSteps).toBeGreaterThan(0);
      expect(analysis.metrics.fastSteps).toBeGreaterThan(analysis.metrics.slowSteps);
      expect(analysis.metrics.detectionSteps).toBeGreaterThan(0);
      expect(analysis.metrics.analysisSteps).toBeGreaterThan(0);
    });
  });
});
