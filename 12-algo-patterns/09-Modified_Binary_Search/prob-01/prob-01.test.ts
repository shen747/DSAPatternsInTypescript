/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  RotatedArraySearcher, 
  createRotatedArray, 
  batchSearch,
  SearchResult,
  ArrayAnalysis 
} from './prob-01';

describe('Modified Binary Search Pattern - Problem 1: Search in Rotated Sorted Array with Advanced Queries', () => {
  describe('RotatedArraySearcher', () => {
    test('should search in rotated array successfully', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const result = searcher.search(0);
      
      expect(result.found).toBe(true);
      expect(result.index).toBe(4);
      expect(result.algorithm).toBeDefined();
      expect(result.searchPath.length).toBeGreaterThan(0);
      expect(result.comparisons).toBeGreaterThan(0);
    });

    test('should handle target not found', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const result = searcher.search(3);
      
      expect(result.found).toBe(false);
      expect(result.index).toBeUndefined();
      expect(result.searchPath.length).toBeGreaterThan(0);
    });

    test('should search in non-rotated array', () => {
      const searcher = new RotatedArraySearcher([1,2,3,4,5,6,7]);
      const result = searcher.search(4);
      
      expect(result.found).toBe(true);
      expect(result.index).toBe(3);
      expect(result.rotationPoint).toBe(0); // No rotation
    });

    test('should handle single element array', () => {
      const searcher = new RotatedArraySearcher([1]);
      
      const foundResult = searcher.search(1);
      expect(foundResult.found).toBe(true);
      expect(foundResult.index).toBe(0);
      
      const notFoundResult = searcher.search(2);
      expect(notFoundResult.found).toBe(false);
    });

    test('should handle empty array', () => {
      const searcher = new RotatedArraySearcher([]);
      const result = searcher.search(1);
      
      expect(result.found).toBe(false);
      expect(result.index).toBeUndefined();
    });

    test('should find range of target element', () => {
      const searcher = new RotatedArraySearcher([5,6,0,0,1,2,2,2,3,4]);
      const result = searcher.searchRange(2);
      
      expect(result.found).toBe(true);
      expect(result.firstIndex).toBe(5);
      expect(result.lastIndex).toBe(7);
      expect(result.count).toBe(3);
    });

    test('should handle range search with no duplicates', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const result = searcher.searchRange(5);
      
      expect(result.found).toBe(true);
      expect(result.firstIndex).toBe(1);
      expect(result.lastIndex).toBe(1);
      expect(result.count).toBe(1);
    });

    test('should find rotation point correctly', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const rotationPoint = searcher.findRotationPoint();
      
      expect(rotationPoint).toBe(4); // Index of minimum element (0)
    });

    test('should handle no rotation', () => {
      const searcher = new RotatedArraySearcher([1,2,3,4,5]);
      const rotationPoint = searcher.findRotationPoint();
      
      expect(rotationPoint).toBe(0); // No rotation
    });

    test('should find kth smallest element', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      const first = searcher.findKthSmallest(1);
      expect(first).toBe(0);
      
      const third = searcher.findKthSmallest(3);
      expect(third).toBe(2);
      
      const last = searcher.findKthSmallest(7);
      expect(last).toBe(7);
    });

    test('should handle invalid k for kth smallest', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      expect(() => searcher.findKthSmallest(0)).toThrow();
      expect(() => searcher.findKthSmallest(8)).toThrow();
    });

    test('should insert element maintaining rotation structure', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      searcher.insert(3);
      const newArray = searcher.getArray();
      
      expect(newArray).toContain(3);
      expect(newArray.length).toBe(8);
      
      // Should still be able to search
      const result = searcher.search(3);
      expect(result.found).toBe(true);
    });

    test('should remove element correctly', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      const removed = searcher.remove(5);
      expect(removed).toBe(true);
      
      const newArray = searcher.getArray();
      expect(newArray).not.toContain(5);
      expect(newArray.length).toBe(6);
      
      const notRemoved = searcher.remove(10);
      expect(notRemoved).toBe(false);
    });

    test('should find minimum element', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const min = searcher.findMin();
      
      expect(min).toBe(0);
    });

    test('should find maximum element', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const max = searcher.findMax();
      
      expect(max).toBe(7);
    });

    test('should validate rotation correctly', () => {
      const validRotated = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      expect(validRotated.isValidRotation()).toBe(true);
      
      const validNonRotated = new RotatedArraySearcher([1,2,3,4,5]);
      expect(validNonRotated.isValidRotation()).toBe(true);
      
      const invalid = new RotatedArraySearcher([1,3,2,4,5]);
      expect(invalid.isValidRotation()).toBe(false);
    });

    test('should analyze array structure', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const analysis = searcher.analyzeArray();
      
      expect(analysis.isRotated).toBe(true);
      expect(analysis.rotationPoint).toBe(4);
      expect(analysis.originalSorted).toBe(true);
      expect(analysis.minElement).toBe(0);
      expect(analysis.maxElement).toBe(7);
      expect(analysis.rotationCount).toBeGreaterThan(0);
    });

    test('should handle duplicates in rotation point finding', () => {
      const searcher = new RotatedArraySearcher([2,2,2,0,1,2]);
      const rotationPoint = searcher.findRotationPoint();
      
      expect(rotationPoint).toBe(3); // Index of minimum element
    });

    test('should handle all same elements', () => {
      const searcher = new RotatedArraySearcher([2,2,2,2,2]);
      
      const result = searcher.search(2);
      expect(result.found).toBe(true);
      
      const min = searcher.findMin();
      expect(min).toBe(2);
      
      const max = searcher.findMax();
      expect(max).toBe(2);
    });

    test('should reset with new array', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      searcher.reset([1,2,3,4,5]);
      const newArray = searcher.getArray();
      
      expect(newArray).toEqual([1,2,3,4,5]);
      
      const result = searcher.search(3);
      expect(result.found).toBe(true);
      expect(result.index).toBe(2);
    });
  });

  describe('Edge cases and performance', () => {
    test('should handle large rotated arrays efficiently', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => (i + 5000) % 10000);
      const searcher = new RotatedArraySearcher(largeArray);
      
      const startTime = Date.now();
      const result = searcher.search(100);
      const endTime = Date.now();
      
      expect(result.found).toBe(true);
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast
    });

    test('should handle arrays with negative numbers', () => {
      const searcher = new RotatedArraySearcher([-1,0,1,2,-5,-4,-3,-2]);
      
      const result = searcher.search(-3);
      expect(result.found).toBe(true);
      
      const min = searcher.findMin();
      expect(min).toBe(-5);
    });

    test('should handle two-element arrays', () => {
      const rotated = new RotatedArraySearcher([2,1]);
      expect(rotated.search(1).found).toBe(true);
      expect(rotated.search(2).found).toBe(true);
      expect(rotated.findRotationPoint()).toBe(1);
      
      const normal = new RotatedArraySearcher([1,2]);
      expect(normal.search(1).found).toBe(true);
      expect(normal.findRotationPoint()).toBe(0);
    });

    test('should track search path correctly', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const result = searcher.search(1);
      
      expect(result.searchPath.length).toBeGreaterThan(0);
      expect(result.searchPath[0]).toBeGreaterThanOrEqual(0);
      expect(result.searchPath[result.searchPath.length - 1]).toBe(result.index);
    });

    test('should count comparisons accurately', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      const result = searcher.search(0);
      
      expect(result.comparisons).toBeGreaterThan(0);
      expect(result.comparisons).toBeLessThanOrEqual(Math.ceil(Math.log2(7)) + 2);
    });
  });

  describe('Utility functions', () => {
    test('should create rotated array correctly', () => {
      const sorted = [1,2,3,4,5];
      const rotated = createRotatedArray(sorted, 2);
      
      expect(rotated).toEqual([3,4,5,1,2]);
    });

    test('should handle rotation point at boundaries', () => {
      const sorted = [1,2,3,4,5];
      
      const rotatedAtStart = createRotatedArray(sorted, 0);
      expect(rotatedAtStart).toEqual([1,2,3,4,5]);
      
      const rotatedAtEnd = createRotatedArray(sorted, 5);
      expect(rotatedAtEnd).toEqual([1,2,3,4,5]);
    });

    test('should batch search multiple targets', () => {
      const nums = [4,5,6,7,0,1,2];
      const targets = [0, 3, 6, 1];
      
      const results = batchSearch(nums, targets);
      
      expect(results).toHaveLength(4);
      expect(results[0].found).toBe(true); // 0 found
      expect(results[1].found).toBe(false); // 3 not found
      expect(results[2].found).toBe(true); // 6 found
      expect(results[3].found).toBe(true); // 1 found
    });

    test('should optimize batch search', () => {
      const nums = Array.from({ length: 1000 }, (_, i) => (i + 500) % 1000);
      const targets = [100, 200, 300, 400, 500];
      
      const startTime = Date.now();
      const results = batchSearch(nums, targets);
      const endTime = Date.now();
      
      expect(results).toHaveLength(5);
      expect(endTime - startTime).toBeLessThan(50);
    });
  });

  describe('Complex scenarios', () => {
    test('should handle multiple rotations', () => {
      // Array rotated multiple times should still work
      const original = [1,2,3,4,5,6,7,8];
      const rotated = createRotatedArray(original, 3);
      const searcher = new RotatedArraySearcher(rotated);
      
      expect(searcher.search(1).found).toBe(true);
      expect(searcher.search(8).found).toBe(true);
      expect(searcher.findMin()).toBe(1);
      expect(searcher.findMax()).toBe(8);
    });

    test('should handle arrays with repeated rotation patterns', () => {
      const searcher = new RotatedArraySearcher([1,1,1,2,2,2,0,0,0]);
      
      const result = searcher.search(2);
      expect(result.found).toBe(true);
      
      const rangeResult = searcher.searchRange(1);
      expect(rangeResult.count).toBe(3);
    });

    test('should maintain performance with frequent operations', () => {
      const searcher = new RotatedArraySearcher([4,5,6,7,0,1,2]);
      
      const startTime = Date.now();
      
      // Perform many operations
      for (let i = 0; i < 100; i++) {
        searcher.search(i % 8);
        searcher.findRotationPoint();
        searcher.findMin();
        searcher.findMax();
      }
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should handle edge case rotations', () => {
      // Rotation at first element
      const searcher1 = new RotatedArraySearcher([1,2,3,4,5]);
      expect(searcher1.findRotationPoint()).toBe(0);
      
      // Rotation at last element  
      const searcher2 = new RotatedArraySearcher([2,3,4,5,1]);
      expect(searcher2.findRotationPoint()).toBe(4);
      
      // Single element
      const searcher3 = new RotatedArraySearcher([42]);
      expect(searcher3.findRotationPoint()).toBe(0);
    });
  });
});
