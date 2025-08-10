/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  climbStairsRecursive,
  climbStairsMemo,
  climbStairsDP,
  climbStairsOptimized,
  climbStairsMath,
  climbStairsMatrix
} from './problem';

describe('Climbing Stairs', () => {
  describe('climbStairsRecursive', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsRecursive(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsRecursive(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsRecursive(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsRecursive(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsRecursive(5)).toBe(8);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsRecursive(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsRecursive(-1)).toBe(0);
    });
  });

  describe('climbStairsMemo', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsMemo(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsMemo(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsMemo(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsMemo(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsMemo(5)).toBe(8);
    });

    test('should return 13 for n = 6', () => {
      expect(climbStairsMemo(6)).toBe(13);
    });

    test('should return 21 for n = 7', () => {
      expect(climbStairsMemo(7)).toBe(21);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsMemo(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsMemo(-1)).toBe(0);
    });
  });

  describe('climbStairsDP', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsDP(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsDP(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsDP(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsDP(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsDP(5)).toBe(8);
    });

    test('should return 13 for n = 6', () => {
      expect(climbStairsDP(6)).toBe(13);
    });

    test('should return 21 for n = 7', () => {
      expect(climbStairsDP(7)).toBe(21);
    });

    test('should return 34 for n = 8', () => {
      expect(climbStairsDP(8)).toBe(34);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsDP(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsDP(-1)).toBe(0);
    });
  });

  describe('climbStairsOptimized', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsOptimized(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsOptimized(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsOptimized(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsOptimized(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsOptimized(5)).toBe(8);
    });

    test('should return 13 for n = 6', () => {
      expect(climbStairsOptimized(6)).toBe(13);
    });

    test('should return 21 for n = 7', () => {
      expect(climbStairsOptimized(7)).toBe(21);
    });

    test('should return 34 for n = 8', () => {
      expect(climbStairsOptimized(8)).toBe(34);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsOptimized(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsOptimized(-1)).toBe(0);
    });
  });

  describe('climbStairsMath', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsMath(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsMath(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsMath(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsMath(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsMath(5)).toBe(8);
    });

    test('should return 13 for n = 6', () => {
      expect(climbStairsMath(6)).toBe(13);
    });

    test('should return 21 for n = 7', () => {
      expect(climbStairsMath(7)).toBe(21);
    });

    test('should return 34 for n = 8', () => {
      expect(climbStairsMath(8)).toBe(34);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsMath(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsMath(-1)).toBe(0);
    });
  });

  describe('climbStairsMatrix', () => {
    test('should return 1 for n = 1', () => {
      expect(climbStairsMatrix(1)).toBe(1);
    });

    test('should return 2 for n = 2', () => {
      expect(climbStairsMatrix(2)).toBe(2);
    });

    test('should return 3 for n = 3', () => {
      expect(climbStairsMatrix(3)).toBe(3);
    });

    test('should return 5 for n = 4', () => {
      expect(climbStairsMatrix(4)).toBe(5);
    });

    test('should return 8 for n = 5', () => {
      expect(climbStairsMatrix(5)).toBe(8);
    });

    test('should return 13 for n = 6', () => {
      expect(climbStairsMatrix(6)).toBe(13);
    });

    test('should return 21 for n = 7', () => {
      expect(climbStairsMatrix(7)).toBe(21);
    });

    test('should return 34 for n = 8', () => {
      expect(climbStairsMatrix(8)).toBe(34);
    });

    test('should return 0 for n = 0', () => {
      expect(climbStairsMatrix(0)).toBe(0);
    });

    test('should return 0 for negative n', () => {
      expect(climbStairsMatrix(-1)).toBe(0);
    });
  });

  describe('All solutions should return the same result', () => {
    test('should all return same result for n = 5', () => {
      const n = 5;
      const result = 8;
      expect(climbStairsRecursive(n)).toBe(result);
      expect(climbStairsMemo(n)).toBe(result);
      expect(climbStairsDP(n)).toBe(result);
      expect(climbStairsOptimized(n)).toBe(result);
      expect(climbStairsMath(n)).toBe(result);
      expect(climbStairsMatrix(n)).toBe(result);
    });

    test('should all return same result for n = 7', () => {
      const n = 7;
      const result = 21;
      expect(climbStairsMemo(n)).toBe(result);
      expect(climbStairsDP(n)).toBe(result);
      expect(climbStairsOptimized(n)).toBe(result);
      expect(climbStairsMath(n)).toBe(result);
      expect(climbStairsMatrix(n)).toBe(result);
    });
  });
}); 