import { fourSum, fourSumHashMap, fourSumZero, QuadrupletStats } from './prob-01';

describe('Two Pointers Pattern - Problem 1: Four Sum with Duplicates Handling', () => {
  describe('fourSum', () => {
    test('should find all unique quadruplets for basic case', () => {
      const nums = [1, 0, -1, 0, -2, 2];
      const target = 0;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(3);
      expect(result.quadruplets).toContainEqual([-2, -1, 1, 2]);
      expect(result.quadruplets).toContainEqual([-2, 0, 0, 2]);
      expect(result.quadruplets).toContainEqual([-1, 0, 0, 1]);
      
      // Verify statistics are tracked
      expect(result.totalCombinationsChecked).toBeGreaterThan(0);
      expect(typeof result.duplicatesSkipped).toBe('number');
      expect(typeof result.earlyTerminations).toBe('number');
    });

    test('should handle case with all same elements', () => {
      const nums = [2, 2, 2, 2, 2];
      const target = 8;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(1);
      expect(result.quadruplets[0]).toEqual([2, 2, 2, 2]);
    });

    test('should return empty array when no solution exists', () => {
      const nums = [1000000000, 1000000000, 1000000000, 1000000000];
      const target = -294967268;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
      expect(result.earlyTerminations).toBeGreaterThan(0);
    });

    test('should handle minimum array size', () => {
      const nums = [1, 2, 3, 4];
      const target = 10;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(1);
      expect(result.quadruplets[0]).toEqual([1, 2, 3, 4]);
    });

    test('should handle array smaller than 4 elements', () => {
      const nums = [1, 2, 3];
      const target = 6;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
    });

    test('should handle negative numbers correctly', () => {
      const nums = [-3, -2, -1, 0, 0, 1, 2, 3];
      const target = 0;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets.length).toBeGreaterThan(0);
      
      // Verify all quadruplets sum to target
      result.quadruplets.forEach(quad => {
        const sum = quad.reduce((a, b) => a + b, 0);
        expect(sum).toBe(target);
      });
    });

    test('should return quadruplets in lexicographically sorted order', () => {
      const nums = [4, 3, 2, 1, 0, -1, -2, -3];
      const target = 0;
      const result = fourSum(nums, target);
      
      // Check that quadruplets are sorted
      for (let i = 1; i < result.quadruplets.length; i++) {
        const prev = result.quadruplets[i - 1];
        const curr = result.quadruplets[i];
        
        // Compare lexicographically
        let isLexicographicallyOrdered = false;
        for (let j = 0; j < 4; j++) {
          if (prev[j] < curr[j]) {
            isLexicographicallyOrdered = true;
            break;
          } else if (prev[j] > curr[j]) {
            break;
          }
        }
        expect(isLexicographicallyOrdered || JSON.stringify(prev) === JSON.stringify(curr)).toBe(true);
      }
    });

    test('should handle large numbers without overflow', () => {
      const nums = [1000000000, -1000000000, 1000000000, -1000000000];
      const target = 0;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets.length).toBeGreaterThan(0);
      result.quadruplets.forEach(quad => {
        const sum = quad.reduce((a, b) => a + b, 0);
        expect(sum).toBe(target);
      });
    });

    test('should efficiently skip duplicates', () => {
      const nums = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
      const target = 2;
      const result = fourSum(nums, target);
      
      expect(result.duplicatesSkipped).toBeGreaterThan(0);
      
      // Should not have duplicate quadruplets
      const uniqueQuads = new Set(result.quadruplets.map(q => JSON.stringify(q)));
      expect(uniqueQuads.size).toBe(result.quadruplets.length);
    });

    test('should perform early terminations when possible', () => {
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const target = 5; // Impossible with these numbers
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
      expect(result.earlyTerminations).toBeGreaterThan(0);
    });
  });

  describe('fourSumHashMap', () => {
    test('should produce same results as two pointers approach', () => {
      const nums = [1, 0, -1, 0, -2, 2];
      const target = 0;
      
      const twoPointersResult = fourSum(nums, target);
      const hashMapResult = fourSumHashMap(nums, target);
      
      // Sort both results for comparison
      const sortQuadruplets = (quads: number[][]) => 
        quads.map(q => [...q].sort((a, b) => a - b))
             .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
      
      expect(sortQuadruplets(hashMapResult)).toEqual(sortQuadruplets(twoPointersResult.quadruplets));
    });

    test('should handle edge cases correctly', () => {
      const nums = [2, 2, 2, 2];
      const target = 8;
      const result = fourSumHashMap(nums, target);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual([2, 2, 2, 2]);
    });
  });

  describe('fourSumZero', () => {
    test('should optimize for zero target', () => {
      const nums = [-2, -1, 0, 1, 2];
      const result = fourSumZero(nums);
      
      expect(result.length).toBeGreaterThan(0);
      result.forEach(quad => {
        const sum = quad.reduce((a, b) => a + b, 0);
        expect(sum).toBe(0);
      });
    });

    test('should handle array with many zeros', () => {
      const nums = [0, 0, 0, 0, 0, 1, -1];
      const result = fourSumZero(nums);
      
      expect(result.length).toBeGreaterThan(0);
      result.forEach(quad => {
        const sum = quad.reduce((a, b) => a + b, 0);
        expect(sum).toBe(0);
      });
    });
  });

  describe('Performance tests', () => {
    test('should handle larger arrays efficiently', () => {
      const nums = Array.from({ length: 100 }, (_, i) => i - 50);
      const target = 0;
      
      const startTime = Date.now();
      const result = fourSum(nums, target);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in reasonable time
      expect(result.quadruplets.length).toBeGreaterThan(0);
    });

    test('should track performance statistics accurately', () => {
      const nums = [1, 1, 1, 1, 2, 2, 2, 2];
      const target = 6;
      const result = fourSum(nums, target);
      
      expect(result.totalCombinationsChecked).toBeGreaterThan(0);
      expect(result.duplicatesSkipped).toBeGreaterThan(0);
      expect(typeof result.earlyTerminations).toBe('number');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty array', () => {
      const nums: number[] = [];
      const target = 0;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
    });

    test('should handle single element', () => {
      const nums = [1];
      const target = 4;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
    });

    test('should handle all negative numbers', () => {
      const nums = [-4, -3, -2, -1];
      const target = -10;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(1);
      expect(result.quadruplets[0]).toEqual([-4, -3, -2, -1]);
    });

    test('should handle all positive numbers with impossible target', () => {
      const nums = [1, 2, 3, 4];
      const target = -1;
      const result = fourSum(nums, target);
      
      expect(result.quadruplets).toHaveLength(0);
      expect(result.earlyTerminations).toBeGreaterThan(0);
    });
  });
});
