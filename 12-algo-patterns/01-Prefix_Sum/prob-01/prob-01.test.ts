/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { subarraySum, SubarrayResult } from './prob-01';

describe('Prefix Sum Pattern - Problem 1: Subarray Sum Equals K', () => {
  describe('subarraySum', () => {
    test('should handle basic case with positive numbers', () => {
      const nums = [1, 1, 1];
      const k = 2;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(2);
      expect(result.indices).toHaveLength(2);
      expect(result.indices).toContainEqual([0, 1]);
      expect(result.indices).toContainEqual([1, 2]);
      expect(result.maxLengthSubarray).toEqual({
        start: expect.any(Number),
        end: expect.any(Number),
        length: 2
      });
    });

    test('should handle case with single element equal to k', () => {
      const nums = [3, 1, 2, 3];
      const k = 3;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(2);
      expect(result.indices).toContainEqual([0, 0]);
      expect(result.indices).toContainEqual([3, 3]);
    });

    test('should handle case with negative numbers', () => {
      const nums = [1, -1, 0];
      const k = 0;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(3);
      expect(result.indices).toContainEqual([0, 1]);
      expect(result.indices).toContainEqual([1, 2]);
      expect(result.indices).toContainEqual([2, 2]);
    });

    test('should handle case with no valid subarrays', () => {
      const nums = [1, 2, 3];
      const k = 7;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(0);
      expect(result.indices).toHaveLength(0);
      expect(result.maxLengthSubarray).toBeNull();
    });

    test('should handle case where entire array sums to k', () => {
      const nums = [1, 2, 3];
      const k = 6;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(1);
      expect(result.indices).toContainEqual([0, 2]);
      expect(result.maxLengthSubarray).toEqual({
        start: 0,
        end: 2,
        length: 3
      });
    });

    test('should handle array with zeros', () => {
      const nums = [0, 0, 0];
      const k = 0;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(6); // [0], [0], [0], [0,0], [0,0], [0,0,0]
      expect(result.indices).toHaveLength(6);
    });

    test('should handle large numbers within constraints', () => {
      const nums = [1000, -1000, 1000];
      const k = 1000;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(3);
      expect(result.indices).toContainEqual([0, 0]);
      expect(result.indices).toContainEqual([0, 2]);
      expect(result.indices).toContainEqual([2, 2]);
    });

    test('should handle mixed positive and negative numbers', () => {
      const nums = [3, 4, 7, 2, -3, 1, 4, 2];
      const k = 7;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBeGreaterThan(0);
      expect(result.indices.length).toBe(result.count);
      
      // Verify all found subarrays actually sum to k
      result.indices.forEach(([start, end]) => {
        const sum = nums.slice(start, end + 1).reduce((a, b) => a + b, 0);
        expect(sum).toBe(k);
      });
    });

    test('should find correct maximum length subarray', () => {
      const nums = [1, 2, 1, 2, 1];
      const k = 3;
      const result = subarraySum(nums, k);
      
      expect(result.maxLengthSubarray).not.toBeNull();
      if (result.maxLengthSubarray) {
        const { start, end, length } = result.maxLengthSubarray;
        expect(length).toBe(end - start + 1);
        
        // Verify this is indeed the maximum length
        result.indices.forEach(([s, e]) => {
          expect(e - s + 1).toBeLessThanOrEqual(length);
        });
      }
    });

    test('should handle edge case with single element', () => {
      const nums = [5];
      const k = 5;
      const result = subarraySum(nums, k);
      
      expect(result.count).toBe(1);
      expect(result.indices).toEqual([[0, 0]]);
      expect(result.maxLengthSubarray).toEqual({
        start: 0,
        end: 0,
        length: 1
      });
    });

    test('should handle performance with larger arrays', () => {
      const nums = Array.from({ length: 1000 }, (_, i) => (i % 10) - 5);
      const k = 0;
      
      const startTime = Date.now();
      const result = subarraySum(nums, k);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should complete in reasonable time
      expect(result.count).toBeGreaterThan(0);
      expect(result.indices.length).toBe(result.count);
    });

    test('should handle duplicate prefix sums correctly', () => {
      const nums = [1, 0, 1, 0, 1];
      const k = 1;
      const result = subarraySum(nums, k);
      
      // Should find multiple subarrays with sum 1
      expect(result.count).toBeGreaterThan(3);
      
      // Verify all found subarrays
      result.indices.forEach(([start, end]) => {
        const sum = nums.slice(start, end + 1).reduce((a, b) => a + b, 0);
        expect(sum).toBe(k);
      });
    });
  });
});
