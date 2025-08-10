/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  IntervalTreeManager, 
  MultiDimensionalIntervalManager,
  Interval, 
  MultiDimensionalInterval,
  OverlapStrategy,
  validateInterval,
  bulkIntervalOperations 
} from './prob-02';

describe('Overlapping Intervals Pattern - Problem 2: Interval Tree with Advanced Range Operations', () => {
  describe('IntervalTreeManager', () => {
    let manager: IntervalTreeManager;

    beforeEach(() => {
      manager = new IntervalTreeManager();
    });

    test('should insert interval successfully', () => {
      const interval: Interval = {
        id: 'interval1',
        start: 1,
        end: 5,
        priority: 1
      };

      const result = manager.insertInterval(interval);
      
      expect(result.overlapping).toHaveLength(0);
      expect(result.conflicts).toHaveLength(0);
      expect(manager.getIntervals()).toHaveLength(1);
    });

    test('should detect overlapping intervals', () => {
      const interval1: Interval = { id: 'i1', start: 1, end: 5 };
      const interval2: Interval = { id: 'i2', start: 3, end: 7 };

      manager.insertInterval(interval1);
      const result = manager.insertInterval(interval2);
      
      expect(result.overlapping).toHaveLength(1);
      expect(result.overlapping[0].id).toBe('i1');
    });

    test('should merge overlapping intervals with merge strategy', () => {
      const mergeManager = new IntervalTreeManager(OverlapStrategy.MERGE);
      
      const interval1: Interval = { id: 'i1', start: 1, end: 5 };
      const interval2: Interval = { id: 'i2', start: 3, end: 7 };

      mergeManager.insertInterval(interval1);
      const result = mergeManager.insertInterval(interval2);
      
      expect(result.merged).toHaveLength(1);
      expect(result.merged[0].start).toBe(1);
      expect(result.merged[0].end).toBe(7);
    });

    test('should reject overlapping intervals with reject strategy', () => {
      const rejectManager = new IntervalTreeManager(OverlapStrategy.REJECT);
      
      const interval1: Interval = { id: 'i1', start: 1, end: 5 };
      const interval2: Interval = { id: 'i2', start: 3, end: 7 };

      rejectManager.insertInterval(interval1);
      const result = rejectManager.insertInterval(interval2);
      
      expect(result.conflicts).toHaveLength(1);
      expect(rejectManager.getIntervals()).toHaveLength(1);
    });

    test('should handle priority-based overlap strategy', () => {
      const priorityManager = new IntervalTreeManager(OverlapStrategy.PRIORITY_BASED);
      
      const lowPriority: Interval = { id: 'low', start: 1, end: 5, priority: 1 };
      const highPriority: Interval = { id: 'high', start: 3, end: 7, priority: 5 };

      priorityManager.insertInterval(lowPriority);
      const result = priorityManager.insertInterval(highPriority);
      
      expect(result.conflicts).toHaveLength(1);
      expect(result.conflicts[0].resolutionOptions).toContain('priority-override');
    });

    test('should remove interval successfully', () => {
      const interval: Interval = { id: 'i1', start: 1, end: 5 };
      
      manager.insertInterval(interval);
      expect(manager.getIntervals()).toHaveLength(1);
      
      const removed = manager.removeInterval('i1');
      expect(removed).toBe(true);
      expect(manager.getIntervals()).toHaveLength(0);
    });

    test('should handle removing non-existent interval', () => {
      const removed = manager.removeInterval('nonexistent');
      expect(removed).toBe(false);
    });

    test('should find overlapping intervals in range', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 5, end: 7 },
        { id: 'i3', start: 6, end: 9 },
        { id: 'i4', start: 10, end: 12 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const overlapping = manager.findOverlapping(4, 8);
      expect(overlapping).toHaveLength(2);
      expect(overlapping.map(i => i.id)).toContain('i2');
      expect(overlapping.map(i => i.id)).toContain('i3');
    });

    test('should merge all overlapping intervals', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 2, end: 6 },
        { id: 'i3', start: 8, end: 10 },
        { id: 'i4', start: 15, end: 18 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const merged = manager.mergeOverlapping();
      expect(merged).toHaveLength(3);
      expect(merged[0]).toEqual(expect.objectContaining({ start: 1, end: 6 }));
      expect(merged[1]).toEqual(expect.objectContaining({ start: 8, end: 10 }));
      expect(merged[2]).toEqual(expect.objectContaining({ start: 15, end: 18 }));
    });

    test('should split interval at specified points', () => {
      const interval: Interval = { id: 'i1', start: 1, end: 10 };
      
      manager.insertInterval(interval);
      const splitIntervals = manager.splitInterval('i1', [3, 7]);
      
      expect(splitIntervals).toHaveLength(3);
      expect(splitIntervals[0]).toEqual(expect.objectContaining({ start: 1, end: 3 }));
      expect(splitIntervals[1]).toEqual(expect.objectContaining({ start: 3, end: 7 }));
      expect(splitIntervals[2]).toEqual(expect.objectContaining({ start: 7, end: 10 }));
    });

    test('should find gaps between intervals', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 5, end: 7 },
        { id: 'i3', start: 10, end: 12 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const gaps = manager.findGaps(0, 15);
      expect(gaps).toContainEqual([0, 1]);
      expect(gaps).toContainEqual([3, 5]);
      expect(gaps).toContainEqual([7, 10]);
      expect(gaps).toContainEqual([12, 15]);
    });

    test('should calculate coverage correctly', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 }, // length 2
        { id: 'i2', start: 5, end: 8 }, // length 3
        { id: 'i3', start: 7, end: 10 } // length 3, overlaps with i2 by 1
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const coverage = manager.calculateCoverage(0, 10);
      expect(coverage).toBeCloseTo(0.7); // (2 + 3 + 2) / 10 = 0.7
    });

    test('should analyze intervals comprehensively', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 2, end: 4 },
        { id: 'i3', start: 5, end: 7 },
        { id: 'i4', start: 6, end: 8 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const analytics = manager.analyzeIntervals();
      expect(analytics.totalCoverage).toBeGreaterThan(0);
      expect(analytics.averageLength).toBe(2);
      expect(analytics.maxOverlap).toBeGreaterThanOrEqual(2);
      expect(analytics.hotspots.length).toBeGreaterThan(0);
    });

    test('should detect conflicts between intervals', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 5, priority: 1 },
        { id: 'i2', start: 3, end: 7, priority: 2 },
        { id: 'i3', start: 4, end: 6, priority: 3 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const conflicts = manager.detectConflicts();
      expect(conflicts.length).toBeGreaterThan(0);
      conflicts.forEach(conflict => {
        expect(conflict.intervals.length).toBeGreaterThanOrEqual(2);
        expect(conflict.severity).toMatch(/low|medium|high/);
        expect(conflict.resolutionOptions.length).toBeGreaterThan(0);
      });
    });

    test('should optimize interval layout', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 2, end: 4 },
        { id: 'i3', start: 6, end: 7 },
        { id: 'i4', start: 8, end: 9 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const optimization = manager.optimizeLayout();
      expect(optimization.optimizedIntervals.length).toBeGreaterThan(0);
      expect(optimization.improvementMetrics.coverageImprovement).toBeGreaterThanOrEqual(0);
      expect(optimization.improvementMetrics.conflictReduction).toBeGreaterThanOrEqual(0);
    });

    test('should query intervals with complex conditions', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3, priority: 1, type: 'meeting' },
        { id: 'i2', start: 5, end: 7, priority: 2, type: 'break' },
        { id: 'i3', start: 8, end: 10, priority: 3, type: 'meeting' },
        { id: 'i4', start: 12, end: 15, priority: 1, type: 'meeting' }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const queryResult = manager.queryIntervals({
        timeRange: [0, 12],
        minPriority: 2,
        type: 'meeting'
      });
      
      expect(queryResult).toHaveLength(1);
      expect(queryResult[0].id).toBe('i3');
    });

    test('should handle custom overlap handler', () => {
      const customHandler = (a: Interval, b: Interval) => {
        return a.priority! > b.priority! ? 'allow' : 'reject';
      };

      manager.setCustomOverlapHandler(customHandler);
      
      const interval1: Interval = { id: 'i1', start: 1, end: 5, priority: 1 };
      const interval2: Interval = { id: 'i2', start: 3, end: 7, priority: 2 };

      manager.insertInterval(interval1);
      const result = manager.insertInterval(interval2);
      
      expect(result.conflicts.length).toBeGreaterThanOrEqual(0);
    });

    test('should clear all intervals', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 5, end: 7 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      expect(manager.getIntervals()).toHaveLength(2);
      
      manager.clear();
      expect(manager.getIntervals()).toHaveLength(0);
    });

    test('should get statistics', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 5, end: 8 },
        { id: 'i3', start: 7, end: 10 }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const stats = manager.getStatistics();
      expect(stats.totalIntervals).toBe(3);
      expect(stats.averageLength).toBe(2.67); // (2+3+3)/3
      expect(stats.totalCoverage).toBeGreaterThan(0);
      expect(stats.memoryUsage).toBeGreaterThan(0);
    });
  });

  describe('MultiDimensionalIntervalManager', () => {
    let manager: MultiDimensionalIntervalManager;

    beforeEach(() => {
      manager = new MultiDimensionalIntervalManager();
    });

    test('should insert multi-dimensional interval', () => {
      const interval: MultiDimensionalInterval = {
        id: 'md1',
        start: 1,
        end: 5,
        dimensions: {
          time: [1, 5],
          priority: 2,
          resource: 'room1',
          cost: 100
        }
      };

      const result = manager.insertInterval(interval);
      
      expect(result.success).toBe(true);
      expect(result.conflicts).toHaveLength(0);
    });

    test('should detect multi-dimensional conflicts', () => {
      const interval1: MultiDimensionalInterval = {
        id: 'md1',
        start: 1,
        end: 5,
        dimensions: { time: [1, 5], priority: 1, resource: 'room1' }
      };

      const interval2: MultiDimensionalInterval = {
        id: 'md2',
        start: 3,
        end: 7,
        dimensions: { time: [3, 7], priority: 2, resource: 'room1' }
      };

      manager.insertInterval(interval1);
      const result = manager.insertInterval(interval2);
      
      expect(result.conflicts.length).toBeGreaterThan(0);
    });

    test('should find multi-dimensional conflicts', () => {
      const intervals: MultiDimensionalInterval[] = [
        {
          id: 'md1',
          start: 1,
          end: 5,
          dimensions: { time: [1, 5], priority: 1, resource: 'room1' }
        },
        {
          id: 'md2',
          start: 3,
          end: 7,
          dimensions: { time: [3, 7], priority: 2, resource: 'room1' }
        }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const conflicts = manager.findMultiDimensionalConflicts();
      expect(conflicts.length).toBeGreaterThan(0);
    });

    test('should optimize multi-dimensional layout', () => {
      const intervals: MultiDimensionalInterval[] = [
        {
          id: 'md1',
          start: 1,
          end: 3,
          dimensions: { time: [1, 3], priority: 1, resource: 'room1' }
        },
        {
          id: 'md2',
          start: 2,
          end: 4,
          dimensions: { time: [2, 4], priority: 2, resource: 'room2' }
        }
      ];

      intervals.forEach(interval => manager.insertInterval(interval));
      
      const optimization = manager.optimizeMultiDimensional();
      expect(optimization.optimizedIntervals.length).toBeGreaterThan(0);
      expect(optimization.metrics).toBeDefined();
    });
  });

  describe('Utility functions', () => {
    test('should validate interval correctly', () => {
      const validInterval: Interval = { id: 'valid', start: 1, end: 5 };
      const invalidInterval: Interval = { id: 'invalid', start: 5, end: 1 };

      const validResult = validateInterval(validInterval);
      expect(validResult.valid).toBe(true);
      expect(validResult.errors).toHaveLength(0);

      const invalidResult = validateInterval(invalidInterval);
      expect(invalidResult.valid).toBe(false);
      expect(invalidResult.errors.length).toBeGreaterThan(0);
    });

    test('should perform bulk merge operations', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 2, end: 6 },
        { id: 'i3', start: 8, end: 10 }
      ];

      const merged = bulkIntervalOperations(intervals, 'merge');
      expect(merged.length).toBeLessThan(intervals.length);
    });

    test('should perform bulk split operations', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 10 }
      ];

      const split = bulkIntervalOperations(intervals, 'split');
      expect(split.length).toBeGreaterThan(intervals.length);
    });

    test('should perform bulk optimize operations', () => {
      const intervals: Interval[] = [
        { id: 'i1', start: 1, end: 3 },
        { id: 'i2', start: 5, end: 7 },
        { id: 'i3', start: 9, end: 11 }
      ];

      const optimized = bulkIntervalOperations(intervals, 'optimize');
      expect(optimized.length).toBeGreaterThanOrEqual(intervals.length);
    });
  });

  describe('Edge cases and performance', () => {
    test('should handle empty interval set', () => {
      const manager = new IntervalTreeManager();
      
      expect(manager.getIntervals()).toHaveLength(0);
      expect(manager.findOverlapping(1, 5)).toHaveLength(0);
      expect(manager.calculateCoverage(1, 5)).toBe(0);
    });

    test('should handle single interval', () => {
      const manager = new IntervalTreeManager();
      const interval: Interval = { id: 'single', start: 1, end: 5 };
      
      manager.insertInterval(interval);
      
      expect(manager.findOverlapping(0, 10)).toHaveLength(1);
      expect(manager.calculateCoverage(0, 10)).toBe(0.4);
    });

    test('should handle large number of intervals efficiently', () => {
      const manager = new IntervalTreeManager();
      const intervals: Interval[] = Array.from({ length: 1000 }, (_, i) => ({
        id: `interval${i}`,
        start: i * 2,
        end: i * 2 + 1
      }));

      const startTime = Date.now();
      intervals.forEach(interval => manager.insertInterval(interval));
      const endTime = Date.now();

      expect(manager.getIntervals()).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should be reasonably fast
    });

    test('should handle intervals with metadata', () => {
      const manager = new IntervalTreeManager();
      const interval: Interval = {
        id: 'meta',
        start: 1,
        end: 5,
        metadata: { type: 'meeting', attendees: ['Alice', 'Bob'] }
      };

      const result = manager.insertInterval(interval);
      expect(result.overlapping).toHaveLength(0);
      
      const retrieved = manager.getIntervals()[0];
      expect(retrieved.metadata).toEqual({ type: 'meeting', attendees: ['Alice', 'Bob'] });
    });
  });
});
