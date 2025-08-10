/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { MaxSumAnalyzer, SubarrayInfo, PerformanceMetrics } from './prob-02';

describe('Sliding Window Pattern - Problem 2: Maximum Sum Subarray with Constraints and Variations', () => {
  let analyzer: MaxSumAnalyzer;

  beforeEach(() => {
    analyzer = new MaxSumAnalyzer([2, 1, 5, 1, 3, 2]);
  });

  describe('Constructor and basic setup', () => {
    test('should initialize with given array', () => {
      const nums = [1, 2, 3, 4, 5];
      const newAnalyzer = new MaxSumAnalyzer(nums);
      expect(newAnalyzer.getArray()).toEqual(nums);
    });

    test('should initialize performance metrics', () => {
      const metrics = analyzer.getMetrics();
      expect(metrics).toHaveProperty('windowSlides');
      expect(metrics).toHaveProperty('comparisons');
      expect(metrics).toHaveProperty('updates');
      expect(metrics).toHaveProperty('cacheHits');
      expect(metrics).toHaveProperty('cacheMisses');
    });
  });

  describe('maxSumExactK', () => {
    test('should find maximum sum subarray of exact size k', () => {
      const result = analyzer.maxSumExactK(3);
      
      expect(result.sum).toBe(9); // [5, 1, 3]
      expect(result.elements).toHaveLength(3);
      expect(result.startIndex).toBeGreaterThanOrEqual(0);
      expect(result.endIndex).toBeLessThan(6);
      expect(result.endIndex - result.startIndex + 1).toBe(3);
      
      // Verify the sum is correct
      const actualSum = result.elements.reduce((a, b) => a + b, 0);
      expect(actualSum).toBe(result.sum);
    });

    test('should handle k equal to array length', () => {
      const result = analyzer.maxSumExactK(6);
      
      expect(result.sum).toBe(14); // Sum of entire array [2, 1, 5, 1, 3, 2]
      expect(result.elements).toHaveLength(6);
      expect(result.startIndex).toBe(0);
      expect(result.endIndex).toBe(5);
    });

    test('should handle k = 1', () => {
      const result = analyzer.maxSumExactK(1);
      
      expect(result.sum).toBe(5); // Maximum single element
      expect(result.elements).toHaveLength(1);
      expect(result.elements[0]).toBe(5);
    });

    test('should handle array with negative numbers', () => {
      const negativeAnalyzer = new MaxSumAnalyzer([-1, -2, -3, -4]);
      const result = negativeAnalyzer.maxSumExactK(2);
      
      expect(result.sum).toBe(-3); // [-1, -2] is the best option
      expect(result.elements).toHaveLength(2);
    });

    test('should update performance metrics', () => {
      analyzer.resetMetrics();
      analyzer.maxSumExactK(3);
      
      const metrics = analyzer.getMetrics();
      expect(metrics.windowSlides).toBeGreaterThan(0);
      expect(metrics.comparisons).toBeGreaterThan(0);
    });
  });

  describe('maxSumAtMostK', () => {
    test('should find maximum sum subarray with at most k elements', () => {
      const result = analyzer.maxSumAtMostK(3);
      
      expect(result.sum).toBeGreaterThanOrEqual(5); // At least the maximum single element
      expect(result.elements.length).toBeLessThanOrEqual(3);
      expect(result.elements.length).toBeGreaterThan(0);
      
      // Verify the sum is correct
      const actualSum = result.elements.reduce((a, b) => a + b, 0);
      expect(actualSum).toBe(result.sum);
    });

    test('should handle case where single element is optimal', () => {
      const mixedAnalyzer = new MaxSumAnalyzer([10, -5, -3, -2]);
      const result = mixedAnalyzer.maxSumAtMostK(3);
      
      expect(result.sum).toBe(10); // Single element [10] is optimal
      expect(result.elements).toEqual([10]);
    });

    test('should handle all negative numbers', () => {
      const negativeAnalyzer = new MaxSumAnalyzer([-5, -2, -8, -1]);
      const result = negativeAnalyzer.maxSumAtMostK(2);
      
      expect(result.sum).toBe(-1); // Single element [-1] is optimal
      expect(result.elements).toEqual([-1]);
    });

    test('should find optimal subarray length', () => {
      const result = analyzer.maxSumAtMostK(4);
      
      // Should find the optimal length within the constraint
      expect(result.elements.length).toBeLessThanOrEqual(4);
      expect(result.sum).toBeGreaterThan(0);
    });
  });

  describe('maxSumNonAdjacent', () => {
    test('should find maximum sum with non-adjacent elements', () => {
      const result = analyzer.maxSumNonAdjacent();
      
      expect(result.sum).toBe(9); // [2, 5, 2] at indices 0, 2, 5
      expect(result.elements.length).toBeGreaterThan(0);
      
      // Verify no adjacent elements in the original array
      const originalArray = analyzer.getArray();
      for (let i = 0; i < result.elements.length - 1; i++) {
        const currentIndex = originalArray.indexOf(result.elements[i]);
        const nextIndex = originalArray.indexOf(result.elements[i + 1], currentIndex + 1);
        expect(Math.abs(nextIndex - currentIndex)).toBeGreaterThan(1);
      }
    });

    test('should handle array with all negative numbers', () => {
      const negativeAnalyzer = new MaxSumAnalyzer([-1, -2, -3, -4]);
      const result = negativeAnalyzer.maxSumNonAdjacent();
      
      expect(result.sum).toBe(-2); // Best single element or non-adjacent pair
      expect(result.elements.length).toBeGreaterThan(0);
    });

    test('should handle single element array', () => {
      const singleAnalyzer = new MaxSumAnalyzer([5]);
      const result = singleAnalyzer.maxSumNonAdjacent();
      
      expect(result.sum).toBe(5);
      expect(result.elements).toEqual([5]);
    });

    test('should handle two element array', () => {
      const twoAnalyzer = new MaxSumAnalyzer([3, 7]);
      const result = twoAnalyzer.maxSumNonAdjacent();
      
      expect(result.sum).toBe(7); // Can only pick one element
      expect(result.elements).toEqual([7]);
    });
  });

  describe('Dynamic updates', () => {
    test('should handle element insertion', () => {
      const originalArray = analyzer.getArray();
      analyzer.insert(2, 10);
      
      const newArray = analyzer.getArray();
      expect(newArray.length).toBe(originalArray.length + 1);
      expect(newArray[2]).toBe(10);
      
      // Verify that queries still work after insertion
      const result = analyzer.maxSumExactK(3);
      expect(result.sum).toBeGreaterThan(0);
    });

    test('should handle element deletion', () => {
      const originalArray = analyzer.getArray();
      analyzer.delete(1);
      
      const newArray = analyzer.getArray();
      expect(newArray.length).toBe(originalArray.length - 1);
      expect(newArray).not.toContain(originalArray[1]);
      
      // Verify that queries still work after deletion
      const result = analyzer.maxSumExactK(2);
      expect(result.sum).toBeGreaterThan(0);
    });

    test('should update performance metrics for modifications', () => {
      analyzer.resetMetrics();
      analyzer.insert(0, 100);
      
      const metrics = analyzer.getMetrics();
      expect(metrics.updates).toBeGreaterThan(0);
    });

    test('should handle multiple updates', () => {
      analyzer.insert(0, 100);
      analyzer.delete(3);
      analyzer.insert(2, -5);
      
      const finalArray = analyzer.getArray();
      expect(finalArray.length).toBe(6); // Original 6 + 1 - 1 + 1 = 7, but one delete
      
      // Should still be able to perform queries
      const result = analyzer.maxSumAtMostK(3);
      expect(typeof result.sum).toBe('number');
    });
  });

  describe('findSubarraysWithSum', () => {
    test('should find all subarrays with target sum', () => {
      const target = 6;
      const result = analyzer.findSubarraysWithSum(target);
      
      result.forEach(subarray => {
        expect(subarray.sum).toBe(target);
        expect(subarray.elements.length).toBeGreaterThan(0);
        
        // Verify sum calculation
        const actualSum = subarray.elements.reduce((a, b) => a + b, 0);
        expect(actualSum).toBe(target);
      });
    });

    test('should return empty array when no subarrays match', () => {
      const target = 100;
      const result = analyzer.findSubarraysWithSum(target);
      
      expect(result).toHaveLength(0);
    });

    test('should handle negative target sums', () => {
      const mixedAnalyzer = new MaxSumAnalyzer([1, -2, 3, -4, 5]);
      const target = -2;
      const result = mixedAnalyzer.findSubarraysWithSum(target);
      
      result.forEach(subarray => {
        expect(subarray.sum).toBe(target);
      });
    });

    test('should not return duplicate subarrays', () => {
      const duplicateAnalyzer = new MaxSumAnalyzer([1, 1, 1, 1]);
      const target = 2;
      const result = duplicateAnalyzer.findSubarraysWithSum(target);
      
      // Should find multiple [1,1] subarrays but they should be distinct by position
      const uniquePositions = new Set(result.map(r => `${r.startIndex}-${r.endIndex}`));
      expect(uniquePositions.size).toBe(result.length);
    });
  });

  describe('Performance and caching', () => {
    test('should use caching for repeated queries', () => {
      analyzer.resetMetrics();
      
      // First query
      analyzer.maxSumExactK(3);
      const firstMetrics = analyzer.getMetrics();
      
      // Second identical query
      analyzer.maxSumExactK(3);
      const secondMetrics = analyzer.getMetrics();
      
      expect(secondMetrics.cacheHits).toBeGreaterThan(firstMetrics.cacheHits);
    });

    test('should clear cache when requested', () => {
      analyzer.maxSumExactK(3); // Populate cache
      analyzer.clearCache();
      
      analyzer.resetMetrics();
      analyzer.maxSumExactK(3); // Should miss cache
      
      const metrics = analyzer.getMetrics();
      expect(metrics.cacheMisses).toBeGreaterThan(0);
    });

    test('should handle large arrays efficiently', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i % 100 - 50);
      const largeAnalyzer = new MaxSumAnalyzer(largeArray);
      
      const startTime = Date.now();
      largeAnalyzer.maxSumExactK(10);
      largeAnalyzer.maxSumAtMostK(15);
      largeAnalyzer.maxSumNonAdjacent();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });
  });

  describe('Edge cases', () => {
    test('should handle empty array', () => {
      expect(() => new MaxSumAnalyzer([])).toThrow();
    });

    test('should handle invalid k values', () => {
      expect(() => analyzer.maxSumExactK(0)).toThrow();
      expect(() => analyzer.maxSumExactK(10)).toThrow(); // k > array length
    });

    test('should handle invalid insertion/deletion indices', () => {
      expect(() => analyzer.insert(-1, 5)).toThrow();
      expect(() => analyzer.insert(10, 5)).toThrow();
      expect(() => analyzer.delete(-1)).toThrow();
      expect(() => analyzer.delete(10)).toThrow();
    });

    test('should handle array with all zeros', () => {
      const zeroAnalyzer = new MaxSumAnalyzer([0, 0, 0, 0]);
      
      const exactResult = zeroAnalyzer.maxSumExactK(2);
      expect(exactResult.sum).toBe(0);
      
      const atMostResult = zeroAnalyzer.maxSumAtMostK(3);
      expect(atMostResult.sum).toBe(0);
      
      const nonAdjacentResult = zeroAnalyzer.maxSumNonAdjacent();
      expect(nonAdjacentResult.sum).toBe(0);
    });
  });
});
