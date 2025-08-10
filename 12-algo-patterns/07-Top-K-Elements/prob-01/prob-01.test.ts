/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  TopKFrequentAnalyzer, 
  TieResolutionStrategy, 
  Algorithm,
  FrequencyAnalysis 
} from './prob-01';

describe('Top-K Elements Pattern - Problem 1: Top K Frequent Elements with Advanced Analysis', () => {
  describe('TopKFrequentAnalyzer', () => {
    test('should find top k frequent elements using min-heap', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 2);
      const result = analyzer.topKFrequent(Algorithm.MIN_HEAP);
      
      expect(result.topKElements).toEqual([1, 2]);
      expect(result.frequencies).toEqual([3, 2]);
      expect(result.algorithm).toBe('min-heap');
      expect(result.statistics.totalElements).toBe(6);
      expect(result.statistics.uniqueElements).toBe(3);
    });

    test('should find top k frequent elements using quickselect', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 2);
      const result = analyzer.topKFrequent(Algorithm.QUICKSELECT);
      
      expect(result.topKElements.length).toBe(2);
      expect(result.algorithm).toBe('quickselect');
      expect(result.topKElements).toContain(1);
      expect(result.topKElements).toContain(2);
    });

    test('should find top k frequent elements using bucket sort', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 2);
      const result = analyzer.topKFrequent(Algorithm.BUCKET_SORT);
      
      expect(result.topKElements).toEqual([1, 2]);
      expect(result.algorithm).toBe('bucket-sort');
    });

    test('should handle ties with lexicographic strategy', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3,4], 2, TieResolutionStrategy.LEXICOGRAPHIC);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([1, 2]);
      expect(result.tieResolution).toBe('lexicographic');
    });

    test('should handle ties with first occurrence strategy', () => {
      const analyzer = new TopKFrequentAnalyzer([4,3,2,1], 2, TieResolutionStrategy.FIRST_OCCURRENCE);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([4, 3]);
      expect(result.tieResolution).toBe('first-occurrence');
    });

    test('should handle ties with largest value strategy', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3,4], 2, TieResolutionStrategy.LARGEST_VALUE);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([4, 3]);
      expect(result.tieResolution).toBe('largest-value');
    });

    test('should handle ties with smallest value strategy', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3,4], 2, TieResolutionStrategy.SMALLEST_VALUE);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([1, 2]);
      expect(result.tieResolution).toBe('smallest-value');
    });

    test('should calculate statistics correctly', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2,2,3], 2);
      const result = analyzer.topKFrequent();
      
      expect(result.statistics.totalElements).toBe(6);
      expect(result.statistics.uniqueElements).toBe(3);
      expect(result.statistics.maxFrequency).toBe(3);
      expect(result.statistics.minFrequency).toBe(1);
      expect(result.statistics.averageFrequency).toBe(2);
    });

    test('should handle k larger than unique elements', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2], 5);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements.length).toBe(2); // Only 2 unique elements
      expect(result.topKElements).toEqual([1, 2]);
    });

    test('should handle single element', () => {
      const analyzer = new TopKFrequentAnalyzer([5], 1);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([5]);
      expect(result.frequencies).toEqual([1]);
    });

    test('should handle empty array', () => {
      const analyzer = new TopKFrequentAnalyzer([], 1);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([]);
      expect(result.frequencies).toEqual([]);
      expect(result.statistics.totalElements).toBe(0);
    });
  });

  describe('Real-time updates', () => {
    test('should add element and update top k', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2,3], 2);
      const newTopK = analyzer.addElement(3);
      
      expect(newTopK).toContain(3);
      expect(newTopK).toContain(1);
    });

    test('should remove element and update top k', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 2);
      const newTopK = analyzer.removeElement(1);
      
      // After removing one 1, frequency becomes [1:2, 2:2, 3:1]
      expect(newTopK.length).toBe(2);
    });

    test('should handle multiple additions', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3], 2);
      
      analyzer.addElement(1);
      analyzer.addElement(1);
      analyzer.addElement(2);
      
      const topK = analyzer.addElement(4);
      expect(topK).toContain(1); // frequency 3
      expect(topK).toContain(2); // frequency 2
    });

    test('should handle element removal to zero frequency', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3], 2);
      const topK = analyzer.removeElement(1);
      
      expect(topK).not.toContain(1);
      expect(topK.length).toBe(2);
    });
  });

  describe('Range queries', () => {
    test('should find top k in range', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2,3,3,4,4], 2);
      const result = analyzer.topKInRange(2, 5);
      
      expect(result.topKElements.length).toBeLessThanOrEqual(2);
      expect(result.statistics.totalElements).toBe(4); // elements at indices 2,3,4,5
    });

    test('should handle invalid range', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3], 2);
      expect(() => analyzer.topKInRange(2, 1)).toThrow();
    });

    test('should handle range at boundaries', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2], 1);
      const result = analyzer.topKInRange(0, 3);
      
      expect(result.topKElements.length).toBe(1);
    });
  });

  describe('Frequency analysis', () => {
    test('should get frequency distribution', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 3);
      const distribution = analyzer.getFrequencyDistribution();
      
      expect(distribution.get(3)).toEqual([1]); // frequency 3: element 1
      expect(distribution.get(2)).toEqual([2]); // frequency 2: element 2
      expect(distribution.get(1)).toEqual([3]); // frequency 1: element 3
    });

    test('should find elements with specific frequency', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2,3], 3);
      const elementsWithFreq2 = analyzer.elementsWithFrequency(2);
      
      expect(elementsWithFreq2).toEqual([1, 2]);
    });

    test('should handle frequency not found', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2], 2);
      const elementsWithFreq5 = analyzer.elementsWithFrequency(5);
      
      expect(elementsWithFreq5).toEqual([]);
    });
  });

  describe('Performance metrics', () => {
    test('should track performance metrics', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,2,2,3], 2);
      const result = analyzer.topKFrequent();
      
      expect(result.performanceMetrics.heapOperations).toBeGreaterThan(0);
      expect(result.performanceMetrics.comparisons).toBeGreaterThan(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
    });

    test('should handle large datasets efficiently', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100);
      const analyzer = new TopKFrequentAnalyzer(largeArray, 10);
      
      const startTime = Date.now();
      const result = analyzer.topKFrequent();
      const endTime = Date.now();
      
      expect(result.topKElements.length).toBe(10);
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle negative numbers', () => {
      const analyzer = new TopKFrequentAnalyzer([-1,-1,-2,-2,-3], 2);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([-1, -2]);
    });

    test('should handle zero values', () => {
      const analyzer = new TopKFrequentAnalyzer([0,0,1,1,2], 2);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toContain(0);
      expect(result.topKElements).toContain(1);
    });

    test('should handle very large numbers', () => {
      const analyzer = new TopKFrequentAnalyzer([1000000, 1000000, 999999], 1);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([1000000]);
    });

    test('should reset correctly', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2], 2);
      analyzer.topKFrequent();
      
      analyzer.reset([3,3,4,4,5], 2);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([3, 4]);
    });

    test('should get frequency map correctly', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,3,3,3], 2);
      const freqMap = analyzer.getFrequencyMap();
      
      expect(freqMap.get(1)).toBe(2);
      expect(freqMap.get(2)).toBe(1);
      expect(freqMap.get(3)).toBe(3);
    });
  });

  describe('Algorithm comparison', () => {
    test('should produce same results with different algorithms', () => {
      const nums = [1,1,1,2,2,3,4,4,4,4];
      const k = 3;
      
      const analyzer1 = new TopKFrequentAnalyzer(nums, k);
      const result1 = analyzer1.topKFrequent(Algorithm.MIN_HEAP);
      
      const analyzer2 = new TopKFrequentAnalyzer(nums, k);
      const result2 = analyzer2.topKFrequent(Algorithm.BUCKET_SORT);
      
      expect(result1.topKElements.sort()).toEqual(result2.topKElements.sort());
    });

    test('should handle counting sort algorithm', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,2,2,3], 2);
      const result = analyzer.topKFrequent(Algorithm.COUNTING_SORT);
      
      expect(result.topKElements.length).toBe(2);
      expect(result.algorithm).toBe('counting-sort');
    });
  });

  describe('Complex scenarios', () => {
    test('should handle mixed positive and negative numbers', () => {
      const analyzer = new TopKFrequentAnalyzer([-5,-5,0,0,0,1,1,1,1], 3);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([1, 0, -5]);
      expect(result.frequencies).toEqual([4, 3, 2]);
    });

    test('should handle all elements with same frequency', () => {
      const analyzer = new TopKFrequentAnalyzer([1,2,3,4,5], 3);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements.length).toBe(3);
      expect(result.frequencies).toEqual([1, 1, 1]);
    });

    test('should handle duplicate elements efficiently', () => {
      const analyzer = new TopKFrequentAnalyzer([1,1,1,1,1,1,1,1,1,1], 1);
      const result = analyzer.topKFrequent();
      
      expect(result.topKElements).toEqual([1]);
      expect(result.frequencies).toEqual([10]);
      expect(result.statistics.uniqueElements).toBe(1);
    });
  });
});
