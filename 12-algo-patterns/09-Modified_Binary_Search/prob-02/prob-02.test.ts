/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  TwoArrayAnalyzer, 
  MergeStrategy,
  findMedianMultipleArrays,
  findMedianOptimized,
  StatisticalAnalysis 
} from './prob-02';

describe('Modified Binary Search Pattern - Problem 2: Median of Two Sorted Arrays with Advanced Statistics', () => {
  describe('TwoArrayAnalyzer', () => {
    test('should find median of two sorted arrays', () => {
      const analyzer = new TwoArrayAnalyzer([1,3], [2]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(2.0);
    });

    test('should find median with even total length', () => {
      const analyzer = new TwoArrayAnalyzer([1,2], [3,4]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(2.5);
    });

    test('should handle empty arrays', () => {
      const analyzer1 = new TwoArrayAnalyzer([], [1,2,3]);
      expect(analyzer1.findMedianSortedArrays()).toBe(2);
      
      const analyzer2 = new TwoArrayAnalyzer([1,2,3], []);
      expect(analyzer2.findMedianSortedArrays()).toBe(2);
    });

    test('should handle single element arrays', () => {
      const analyzer = new TwoArrayAnalyzer([1], [2]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(1.5);
    });

    test('should find kth element correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5], [2,4,6]);
      
      expect(analyzer.findKthElement(1)).toBe(1); // 1st smallest
      expect(analyzer.findKthElement(3)).toBe(3); // 3rd smallest
      expect(analyzer.findKthElement(6)).toBe(6); // 6th smallest (largest)
    });

    test('should handle invalid k values', () => {
      const analyzer = new TwoArrayAnalyzer([1,2], [3,4]);
      
      expect(() => analyzer.findKthElement(0)).toThrow();
      expect(() => analyzer.findKthElement(5)).toThrow();
    });

    test('should calculate percentiles correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,2,3], [4,5,6]);
      
      const p25 = analyzer.findPercentile(25);
      expect(p25).toBeCloseTo(2.25);
      
      const p50 = analyzer.findPercentile(50);
      expect(p50).toBe(3.5); // Same as median
      
      const p75 = analyzer.findPercentile(75);
      expect(p75).toBeCloseTo(4.75);
    });

    test('should handle edge percentiles', () => {
      const analyzer = new TwoArrayAnalyzer([1,2,3], [4,5,6]);
      
      const p0 = analyzer.findPercentile(0);
      expect(p0).toBe(1);
      
      const p100 = analyzer.findPercentile(100);
      expect(p100).toBe(6);
    });

    test('should perform comprehensive statistical analysis', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5], [2,4,6]);
      const analysis = analyzer.analyzeStatistics();
      
      expect(analysis.median).toBe(3.5);
      expect(analysis.statistics.mean).toBe(3.5);
      expect(analysis.statistics.range).toBe(5); // 6 - 1
      expect(analysis.statistics.quartiles).toHaveLength(3);
      expect(analysis.performanceMetrics.comparisons).toBeGreaterThan(0);
    });

    test('should find multiple kth elements efficiently', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5,7], [2,4,6,8]);
      const kValues = [1, 3, 5, 8];
      const results = analyzer.findMultipleKthElements(kValues);
      
      expect(results.get(1)).toBe(1);
      expect(results.get(3)).toBe(3);
      expect(results.get(5)).toBe(5);
      expect(results.get(8)).toBe(8);
    });

    test('should merge arrays with different strategies', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5], [2,4,6]);
      
      const merged = analyzer.mergeArrays();
      expect(merged).toEqual([1,2,3,4,5,6]);
    });

    test('should handle weighted arrays', () => {
      const weights1 = [1, 2, 1];
      const weights2 = [2, 1, 2];
      const analyzer = new TwoArrayAnalyzer([1,3,5], [2,4,6], weights1, weights2, MergeStrategy.WEIGHTED);
      
      const weightedMedian = analyzer.findWeightedMedian();
      expect(weightedMedian).toBeGreaterThan(0);
    });

    test('should find elements in range', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5,7], [2,4,6,8]);
      const elementsInRange = analyzer.findElementsInRange(3, 6);
      
      expect(elementsInRange).toEqual([3,4,5,6]);
    });

    test('should handle range with no elements', () => {
      const analyzer = new TwoArrayAnalyzer([1,2], [8,9]);
      const elementsInRange = analyzer.findElementsInRange(3, 7);
      
      expect(elementsInRange).toEqual([]);
    });

    test('should update arrays correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,3], [2,4]);
      
      analyzer.updateArray(1, [5,6,7]);
      const arrays = analyzer.getArrays();
      
      expect(arrays.nums1).toEqual([1,3]);
      expect(arrays.nums2).toEqual([5,6,7]);
      
      const newMedian = analyzer.findMedianSortedArrays();
      expect(newMedian).toBe(5);
    });

    test('should reset analyzer correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,2], [3,4]);
      
      analyzer.reset([5,6], [7,8]);
      const arrays = analyzer.getArrays();
      
      expect(arrays.nums1).toEqual([5,6]);
      expect(arrays.nums2).toEqual([7,8]);
    });
  });

  describe('Different merge strategies', () => {
    test('should handle standard merge strategy', () => {
      const analyzer = new TwoArrayAnalyzer([1,3], [2,4], undefined, undefined, MergeStrategy.STANDARD);
      const merged = analyzer.mergeArrays();
      
      expect(merged).toEqual([1,2,3,4]);
    });

    test('should handle interleaved merge strategy', () => {
      const analyzer = new TwoArrayAnalyzer([1,3], [2,4], undefined, undefined, MergeStrategy.INTERLEAVED);
      const merged = analyzer.mergeArrays();
      
      expect(merged).toHaveLength(4);
      expect(merged).toContain(1);
      expect(merged).toContain(2);
      expect(merged).toContain(3);
      expect(merged).toContain(4);
    });

    test('should handle priority-based merge strategy', () => {
      const analyzer = new TwoArrayAnalyzer([1,3], [2,4], undefined, undefined, MergeStrategy.PRIORITY_BASED);
      const merged = analyzer.mergeArrays();
      
      expect(merged).toHaveLength(4);
    });
  });

  describe('Statistical calculations', () => {
    test('should calculate mode correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,1,2], [2,3,3]);
      const analysis = analyzer.analyzeStatistics();
      
      expect(analysis.statistics.mode).toContain(1);
      expect(analysis.statistics.mode).toContain(2);
      expect(analysis.statistics.mode).toContain(3);
    });

    test('should calculate standard deviation', () => {
      const analyzer = new TwoArrayAnalyzer([1,2,3], [4,5,6]);
      const analysis = analyzer.analyzeStatistics();
      
      expect(analysis.statistics.standardDeviation).toBeGreaterThan(0);
      expect(analysis.statistics.variance).toBeGreaterThan(0);
    });

    test('should calculate quartiles correctly', () => {
      const analyzer = new TwoArrayAnalyzer([1,2,3,4], [5,6,7,8]);
      const analysis = analyzer.analyzeStatistics();
      
      expect(analysis.statistics.quartiles).toHaveLength(3);
      expect(analysis.statistics.quartiles[0]).toBeLessThan(analysis.statistics.quartiles[1]);
      expect(analysis.statistics.quartiles[1]).toBeLessThan(analysis.statistics.quartiles[2]);
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large arrays efficiently', () => {
      const large1 = Array.from({ length: 5000 }, (_, i) => i * 2);
      const large2 = Array.from({ length: 5000 }, (_, i) => i * 2 + 1);
      const analyzer = new TwoArrayAnalyzer(large1, large2);
      
      const startTime = Date.now();
      const median = analyzer.findMedianSortedArrays();
      const endTime = Date.now();
      
      expect(median).toBe(4999.5);
      expect(endTime - startTime).toBeLessThan(10);
    });

    test('should handle arrays with duplicates', () => {
      const analyzer = new TwoArrayAnalyzer([1,1,1], [1,1,1]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(1);
    });

    test('should handle negative numbers', () => {
      const analyzer = new TwoArrayAnalyzer([-3,-1], [-2,0]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(-1.5);
    });

    test('should handle very different array sizes', () => {
      const analyzer = new TwoArrayAnalyzer([1], [2,3,4,5,6,7,8,9,10]);
      const median = analyzer.findMedianSortedArrays();
      
      expect(median).toBe(5.5);
    });

    test('should track performance metrics', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5], [2,4,6]);
      const analysis = analyzer.analyzeStatistics();
      
      expect(analysis.performanceMetrics.comparisons).toBeGreaterThan(0);
      expect(analysis.performanceMetrics.iterations).toBeGreaterThan(0);
      expect(analysis.performanceMetrics.memoryUsed).toBeGreaterThan(0);
      expect(analysis.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
    });

    test('should validate sorted arrays', () => {
      // This should work fine
      const validAnalyzer = new TwoArrayAnalyzer([1,2,3], [4,5,6]);
      expect(() => validAnalyzer.findMedianSortedArrays()).not.toThrow();
      
      // This should handle unsorted arrays gracefully
      const invalidAnalyzer = new TwoArrayAnalyzer([3,1,2], [6,4,5]);
      expect(() => invalidAnalyzer.findMedianSortedArrays()).not.toThrow();
    });
  });

  describe('Utility functions', () => {
    test('should find median of multiple arrays', () => {
      const arrays = [[1,4,7], [2,5,8], [3,6,9]];
      const median = findMedianMultipleArrays(arrays);
      
      expect(median).toBe(5);
    });

    test('should handle single array in multiple arrays', () => {
      const arrays = [[1,2,3,4,5]];
      const median = findMedianMultipleArrays(arrays);
      
      expect(median).toBe(3);
    });

    test('should provide optimized median finding', () => {
      const nums1 = Array.from({ length: 1000 }, (_, i) => i * 2);
      const nums2 = Array.from({ length: 1000 }, (_, i) => i * 2 + 1);
      
      const startTime = Date.now();
      const median = findMedianOptimized(nums1, nums2);
      const endTime = Date.now();
      
      expect(median).toBe(999.5);
      expect(endTime - startTime).toBeLessThan(5);
    });

    test('should handle empty arrays in optimized version', () => {
      const median1 = findMedianOptimized([], [1,2,3]);
      expect(median1).toBe(2);
      
      const median2 = findMedianOptimized([1,2,3], []);
      expect(median2).toBe(2);
    });
  });

  describe('Complex scenarios', () => {
    test('should handle overlapping ranges', () => {
      const analyzer = new TwoArrayAnalyzer([1,3,5,7,9], [2,4,6,8,10]);
      
      const median = analyzer.findMedianSortedArrays();
      expect(median).toBe(5.5);
      
      const p25 = analyzer.findPercentile(25);
      const p75 = analyzer.findPercentile(75);
      expect(p75).toBeGreaterThan(p25);
    });

    test('should handle identical arrays', () => {
      const analyzer = new TwoArrayAnalyzer([1,2,3], [1,2,3]);
      
      const median = analyzer.findMedianSortedArrays();
      expect(median).toBe(2);
      
      const analysis = analyzer.analyzeStatistics();
      expect(analysis.statistics.mode).toEqual([1,2,3]);
    });

    test('should handle arrays with large gaps', () => {
      const analyzer = new TwoArrayAnalyzer([1,2], [1000,2000]);
      
      const median = analyzer.findMedianSortedArrays();
      expect(median).toBe(500.5);
      
      const range = analyzer.findElementsInRange(500, 1500);
      expect(range).toEqual([1000]);
    });

    test('should maintain precision with floating point numbers', () => {
      const analyzer = new TwoArrayAnalyzer([1.1, 2.2], [3.3, 4.4]);
      
      const median = analyzer.findMedianSortedArrays();
      expect(median).toBeCloseTo(2.75);
      
      const analysis = analyzer.analyzeStatistics();
      expect(analysis.statistics.mean).toBeCloseTo(2.75);
    });
  });
});
