/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  findDuplicate, 
  findDuplicateBinarySearch, 
  findAllDuplicates,
  verifyDuplicate,
  generateMathematicalProof,
  simulateTraversal,
  compareApproaches,
  DuplicateAnalysis 
} from './prob-02';

describe('Fast and Slow Pointers Pattern - Problem 2: Find Duplicate Number with Constraints', () => {
  describe('findDuplicate', () => {
    test('should find duplicate using Floyd\'s algorithm', () => {
      const nums = [1, 3, 4, 2, 2];
      const result = findDuplicate(nums);
      
      expect(result.duplicate).toBe(2);
      expect(result.count).toBe(2);
      expect(result.positions).toEqual([3, 4]);
      expect(result.proof).toContain("Floyd's algorithm");
      expect(result.metrics.slowSteps).toBeGreaterThan(0);
      expect(result.metrics.fastSteps).toBeGreaterThan(result.metrics.slowSteps);
      expect(result.mathematicalExplanation).toContain("pigeonhole");
    });

    test('should handle duplicate at beginning', () => {
      const nums = [3, 1, 3, 4, 2];
      const result = findDuplicate(nums);
      
      expect(result.duplicate).toBe(3);
      expect(result.count).toBe(2);
      expect(result.positions).toEqual([0, 2]);
    });

    test('should handle duplicate of value 1', () => {
      const nums = [1, 1, 2, 3, 4];
      const result = findDuplicate(nums);
      
      expect(result.duplicate).toBe(1);
      expect(result.count).toBe(2);
      expect(result.positions).toEqual([0, 1]);
    });

    test('should handle large arrays efficiently', () => {
      const n = 10000;
      const nums = Array.from({ length: n }, (_, i) => i + 1);
      nums.push(5000); // Add duplicate
      
      const startTime = Date.now();
      const result = findDuplicate(nums);
      const endTime = Date.now();
      
      expect(result.duplicate).toBe(5000);
      expect(result.count).toBe(2);
      expect(endTime - startTime).toBeLessThan(50); // Should be very fast
    });

    test('should provide detailed metrics', () => {
      const nums = [2, 5, 9, 6, 9, 3, 8, 9, 7, 1];
      const result = findDuplicate(nums);
      
      expect(result.metrics.slowSteps).toBeGreaterThan(0);
      expect(result.metrics.fastSteps).toBeGreaterThan(0);
      expect(result.metrics.findSteps).toBeGreaterThan(0);
      expect(result.metrics.verificationSteps).toBeGreaterThan(0);
    });

    test('should handle minimum case', () => {
      const nums = [1, 1];
      const result = findDuplicate(nums);
      
      expect(result.duplicate).toBe(1);
      expect(result.count).toBe(2);
      expect(result.positions).toEqual([0, 1]);
    });

    test('should provide mathematical explanation', () => {
      const nums = [1, 3, 4, 2, 2];
      const result = findDuplicate(nums);
      
      expect(result.mathematicalExplanation).toContain("pigeonhole principle");
      expect(result.mathematicalExplanation).toContain("cycle");
      expect(result.mathematicalExplanation.length).toBeGreaterThan(50);
    });
  });

  describe('findDuplicateBinarySearch', () => {
    test('should find duplicate using binary search', () => {
      const nums = [1, 3, 4, 2, 2];
      const result = findDuplicateBinarySearch(nums);
      
      expect(result).toBe(2);
    });

    test('should match Floyd\'s algorithm result', () => {
      const testCases = [
        [1, 3, 4, 2, 2],
        [3, 1, 3, 4, 2],
        [1, 1, 2, 3, 4],
        [2, 5, 9, 6, 9, 3, 8, 9, 7, 1]
      ];
      
      testCases.forEach(nums => {
        const floydResult = findDuplicate(nums);
        const binaryResult = findDuplicateBinarySearch(nums);
        
        expect(binaryResult).toBe(floydResult.duplicate);
      });
    });

    test('should handle edge cases', () => {
      const nums = [1, 1];
      const result = findDuplicateBinarySearch(nums);
      
      expect(result).toBe(1);
    });
  });

  describe('findAllDuplicates', () => {
    test('should find multiple duplicates when constraints relaxed', () => {
      const nums = [1, 2, 3, 2, 3, 4]; // Multiple duplicates
      const results = findAllDuplicates(nums);
      
      expect(results.length).toBeGreaterThan(1);
      
      const duplicates = results.map(r => r.duplicate).sort();
      expect(duplicates).toContain(2);
      expect(duplicates).toContain(3);
    });

    test('should handle single duplicate case', () => {
      const nums = [1, 3, 4, 2, 2];
      const results = findAllDuplicates(nums);
      
      expect(results.length).toBe(1);
      expect(results[0].duplicate).toBe(2);
    });

    test('should handle no duplicates case', () => {
      const nums = [1, 2, 3, 4, 5];
      const results = findAllDuplicates(nums);
      
      expect(results.length).toBe(0);
    });
  });

  describe('verifyDuplicate', () => {
    test('should verify correct duplicate detection', () => {
      const nums = [1, 3, 4, 2, 2];
      const isValid = verifyDuplicate(nums, 2);
      
      expect(isValid).toBe(true);
    });

    test('should reject incorrect duplicate', () => {
      const nums = [1, 3, 4, 2, 2];
      const isValid = verifyDuplicate(nums, 3);
      
      expect(isValid).toBe(false);
    });

    test('should handle edge cases', () => {
      const nums = [1, 1];
      expect(verifyDuplicate(nums, 1)).toBe(true);
      expect(verifyDuplicate(nums, 2)).toBe(false);
    });
  });

  describe('generateMathematicalProof', () => {
    test('should generate comprehensive proof', () => {
      const nums = [1, 3, 4, 2, 2];
      const proof = generateMathematicalProof(nums);
      
      expect(proof).toContain("pigeonhole principle");
      expect(proof).toContain("functional graph");
      expect(proof).toContain("cycle");
      expect(proof).toContain("Floyd");
      expect(proof.length).toBeGreaterThan(200);
    });

    test('should explain why algorithm works', () => {
      const nums = [3, 1, 3, 4, 2];
      const proof = generateMathematicalProof(nums);
      
      expect(proof).toContain("n + 1 integers");
      expect(proof).toContain("range [1, n]");
      expect(proof).toContain("must exist");
    });
  });

  describe('simulateTraversal', () => {
    test('should simulate array traversal as linked list', () => {
      const nums = [1, 3, 4, 2, 2];
      const path = simulateTraversal(nums, 0, 10);
      
      expect(path.length).toBeGreaterThan(0);
      expect(path[0]).toBe(0); // Starting index
      
      // Verify each step follows the rule: nums[i] -> nums[nums[i]]
      for (let i = 0; i < path.length - 1; i++) {
        const currentIndex = path[i];
        const nextIndex = path[i + 1];
        expect(nextIndex).toBe(nums[currentIndex]);
      }
    });

    test('should detect cycle in simulation', () => {
      const nums = [1, 3, 4, 2, 2];
      const path = simulateTraversal(nums, 0, 20);
      
      // Should eventually repeat indices (cycle detection)
      const indexSet = new Set<number>();
      let cycleDetected = false;
      
      for (const index of path) {
        if (indexSet.has(index)) {
          cycleDetected = true;
          break;
        }
        indexSet.add(index);
      }
      
      expect(cycleDetected).toBe(true);
    });

    test('should handle different starting points', () => {
      const nums = [1, 3, 4, 2, 2];
      
      const path1 = simulateTraversal(nums, 0, 10);
      const path2 = simulateTraversal(nums, 1, 10);
      
      expect(path1[0]).toBe(0);
      expect(path2[0]).toBe(1);
      expect(path1).not.toEqual(path2);
    });
  });

  describe('compareApproaches', () => {
    test('should compare performance of different algorithms', () => {
      const nums = [1, 3, 4, 2, 2];
      const comparison = compareApproaches(nums);
      
      expect(comparison.floyd.result).toBe(2);
      expect(comparison.binarySearch.result).toBe(2);
      expect(comparison.bruteForce.result).toBe(2);
      
      expect(comparison.floyd.timeMs).toBeGreaterThanOrEqual(0);
      expect(comparison.binarySearch.timeMs).toBeGreaterThanOrEqual(0);
      expect(comparison.bruteForce.timeMs).toBeGreaterThanOrEqual(0);
      
      expect(comparison.floyd.steps).toBeGreaterThan(0);
      expect(comparison.binarySearch.comparisons).toBeGreaterThan(0);
      expect(comparison.bruteForce.comparisons).toBeGreaterThan(0);
    });

    test('should show Floyd\'s algorithm efficiency', () => {
      const n = 1000;
      const nums = Array.from({ length: n }, (_, i) => i + 1);
      nums.push(500); // Add duplicate
      
      const comparison = compareApproaches(nums);
      
      // Floyd's should be faster than brute force for large inputs
      expect(comparison.floyd.timeMs).toBeLessThanOrEqual(comparison.bruteForce.timeMs);
      expect(comparison.floyd.steps).toBeLessThan(comparison.bruteForce.comparisons);
    });
  });

  describe('Edge cases and performance', () => {
    test('should handle arrays with maximum constraints', () => {
      const n = 100000;
      const nums = Array.from({ length: n }, (_, i) => i + 1);
      nums.push(50000); // Add duplicate
      
      const startTime = Date.now();
      const result = findDuplicate(nums);
      const endTime = Date.now();
      
      expect(result.duplicate).toBe(50000);
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should handle worst-case cycle scenarios', () => {
      // Create array where cycle is at the end
      const nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1];
      const result = findDuplicate(nums);
      
      expect(result.duplicate).toBe(1);
      expect(result.count).toBe(2);
    });

    test('should maintain O(1) space complexity', () => {
      const nums = [1, 3, 4, 2, 2];
      
      // Memory usage should not scale with input size
      const memoryBefore = process.memoryUsage().heapUsed;
      const result = findDuplicate(nums);
      const memoryAfter = process.memoryUsage().heapUsed;
      
      expect(result.duplicate).toBe(2);
      // Memory increase should be minimal and constant
      expect(memoryAfter - memoryBefore).toBeLessThan(1000000); // Less than 1MB
    });
  });
});
