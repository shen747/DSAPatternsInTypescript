/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { NumMatrix, SubmatrixResult } from './prob-02';

describe('Prefix Sum Pattern - Problem 2: Range Sum Query 2D with Updates', () => {
  let matrix: number[][];
  let numMatrix: NumMatrix;

  beforeEach(() => {
    matrix = [
      [3, 0, 1, 4, 2],
      [5, 6, 3, 2, 1],
      [1, 2, 0, 1, 5],
      [4, 1, 0, 1, 7],
      [1, 0, 3, 0, 5]
    ];
    numMatrix = new NumMatrix(matrix);
  });

  describe('Constructor', () => {
    test('should initialize with given matrix', () => {
      const testMatrix = [[1, 2], [3, 4]];
      const nm = new NumMatrix(testMatrix);
      expect(nm.getMatrix()).toEqual(testMatrix);
    });

    test('should handle single cell matrix', () => {
      const testMatrix = [[5]];
      const nm = new NumMatrix(testMatrix);
      expect(nm.getMatrix()).toEqual(testMatrix);
    });

    test('should handle matrix with negative numbers', () => {
      const testMatrix = [[-1, 2], [3, -4]];
      const nm = new NumMatrix(testMatrix);
      expect(nm.getMatrix()).toEqual(testMatrix);
    });
  });

  describe('sumRegion', () => {
    test('should calculate sum of single cell', () => {
      expect(numMatrix.sumRegion(0, 0, 0, 0)).toBe(3);
      expect(numMatrix.sumRegion(2, 3, 2, 3)).toBe(1);
    });

    test('should calculate sum of entire matrix', () => {
      const expectedSum = matrix.flat().reduce((a, b) => a + b, 0);
      expect(numMatrix.sumRegion(0, 0, 4, 4)).toBe(expectedSum);
    });

    test('should calculate sum of rectangle regions', () => {
      // Rectangle from (2,1) to (4,3)
      // [2, 0, 1]
      // [1, 0, 1] 
      // [0, 3, 0]
      expect(numMatrix.sumRegion(2, 1, 4, 3)).toBe(8);
    });

    test('should calculate sum of row', () => {
      // First row: [3, 0, 1, 4, 2]
      expect(numMatrix.sumRegion(0, 0, 0, 4)).toBe(10);
    });

    test('should calculate sum of column', () => {
      // First column: [3, 5, 1, 4, 1]
      expect(numMatrix.sumRegion(0, 0, 4, 0)).toBe(14);
    });

    test('should handle edge coordinates', () => {
      // Bottom-right corner
      expect(numMatrix.sumRegion(4, 4, 4, 4)).toBe(5);
      // Top-left to somewhere
      expect(numMatrix.sumRegion(0, 0, 1, 1)).toBe(14); // 3+0+5+6
    });
  });

  describe('update', () => {
    test('should update single cell and affect sum queries', () => {
      const originalSum = numMatrix.sumRegion(2, 1, 4, 3);
      numMatrix.update(3, 2, 2); // Change 0 to 2
      const newSum = numMatrix.sumRegion(2, 1, 4, 3);
      expect(newSum).toBe(originalSum + 2);
    });

    test('should update multiple cells independently', () => {
      numMatrix.update(0, 0, 10);
      numMatrix.update(4, 4, 20);
      
      expect(numMatrix.sumRegion(0, 0, 0, 0)).toBe(10);
      expect(numMatrix.sumRegion(4, 4, 4, 4)).toBe(20);
    });

    test('should handle negative updates', () => {
      numMatrix.update(1, 1, -5);
      expect(numMatrix.sumRegion(1, 1, 1, 1)).toBe(-5);
    });

    test('should maintain matrix integrity after updates', () => {
      numMatrix.update(2, 2, 100);
      const updatedMatrix = numMatrix.getMatrix();
      expect(updatedMatrix[2][2]).toBe(100);
      
      // Other cells should remain unchanged
      expect(updatedMatrix[0][0]).toBe(3);
      expect(updatedMatrix[1][1]).toBe(6);
    });
  });

  describe('rangeUpdate', () => {
    test('should update rectangular region', () => {
      const originalSum = numMatrix.sumRegion(1, 1, 2, 2);
      numMatrix.rangeUpdate(1, 1, 2, 2, 1); // Add 1 to 2x2 region
      const newSum = numMatrix.sumRegion(1, 1, 2, 2);
      expect(newSum).toBe(originalSum + 4); // 4 cells * 1 = 4
    });

    test('should handle single cell range update', () => {
      const originalValue = numMatrix.sumRegion(3, 3, 3, 3);
      numMatrix.rangeUpdate(3, 3, 3, 3, 5);
      const newValue = numMatrix.sumRegion(3, 3, 3, 3);
      expect(newValue).toBe(originalValue + 5);
    });

    test('should handle negative range updates', () => {
      const originalSum = numMatrix.sumRegion(0, 0, 1, 1);
      numMatrix.rangeUpdate(0, 0, 1, 1, -2);
      const newSum = numMatrix.sumRegion(0, 0, 1, 1);
      expect(newSum).toBe(originalSum - 8); // 4 cells * 2 = 8
    });

    test('should handle overlapping range updates', () => {
      numMatrix.rangeUpdate(1, 1, 2, 2, 1);
      numMatrix.rangeUpdate(1, 1, 1, 2, 1); // Overlapping region gets +2 total
      
      expect(numMatrix.sumRegion(1, 1, 1, 1)).toBe(6 + 2); // Original 6 + 2
      expect(numMatrix.sumRegion(2, 1, 2, 1)).toBe(2 + 1); // Original 2 + 1
    });
  });

  describe('maxSubmatrix', () => {
    test('should find maximum submatrix within size constraints', () => {
      const result = numMatrix.maxSubmatrix(2, 2);
      
      expect(result).toHaveProperty('sum');
      expect(result).toHaveProperty('row1');
      expect(result).toHaveProperty('col1');
      expect(result).toHaveProperty('row2');
      expect(result).toHaveProperty('col2');
      
      // Verify size constraints
      expect(result.row2 - result.row1 + 1).toBeLessThanOrEqual(2);
      expect(result.col2 - result.col1 + 1).toBeLessThanOrEqual(2);
      
      // Verify sum is correct
      const actualSum = numMatrix.sumRegion(result.row1, result.col1, result.row2, result.col2);
      expect(actualSum).toBe(result.sum);
    });

    test('should find single cell maximum when constrained to 1x1', () => {
      const result = numMatrix.maxSubmatrix(1, 1);
      
      expect(result.row1).toBe(result.row2);
      expect(result.col1).toBe(result.col2);
      
      // Should be the maximum single cell value
      const maxCell = Math.max(...matrix.flat());
      expect(result.sum).toBe(maxCell);
    });

    test('should handle matrix with all negative values', () => {
      const negativeMatrix = [[-1, -2], [-3, -4]];
      const nm = new NumMatrix(negativeMatrix);
      const result = nm.maxSubmatrix(2, 2);
      
      // Should find the least negative value
      expect(result.sum).toBe(-1);
    });

    test('should find optimal submatrix after updates', () => {
      // Make a region very attractive
      numMatrix.rangeUpdate(3, 3, 4, 4, 10);
      const result = numMatrix.maxSubmatrix(2, 2);
      
      // Should likely include the updated region
      expect(result.sum).toBeGreaterThan(20);
    });
  });

  describe('Integration tests', () => {
    test('should handle complex sequence of operations', () => {
      // Initial sum
      let sum = numMatrix.sumRegion(1, 1, 3, 3);
      
      // Update and verify
      numMatrix.update(2, 2, 10);
      let newSum = numMatrix.sumRegion(1, 1, 3, 3);
      expect(newSum).toBe(sum + 10);
      
      // Range update and verify
      numMatrix.rangeUpdate(1, 1, 2, 2, 1);
      let finalSum = numMatrix.sumRegion(1, 1, 3, 3);
      expect(finalSum).toBeGreaterThan(newSum);
      
      // Find max submatrix
      const maxResult = numMatrix.maxSubmatrix(3, 3);
      expect(maxResult.sum).toBeGreaterThan(0);
    });

    test('should maintain consistency across operations', () => {
      const operations = [
        () => numMatrix.update(1, 1, 100),
        () => numMatrix.rangeUpdate(2, 2, 3, 3, 5),
        () => numMatrix.update(0, 0, -10),
        () => numMatrix.rangeUpdate(0, 1, 1, 2, -2)
      ];
      
      operations.forEach(op => op());
      
      // Verify matrix state is consistent
      const finalMatrix = numMatrix.getMatrix();
      expect(finalMatrix[1][1]).toBe(100);
      expect(finalMatrix[0][0]).toBe(-10);
      
      // Verify sum queries work correctly
      const sum = numMatrix.sumRegion(0, 0, 4, 4);
      expect(typeof sum).toBe('number');
      expect(isFinite(sum)).toBe(true);
    });
  });

  describe('Performance tests', () => {
    test('should handle large matrix efficiently', () => {
      const largeMatrix = Array.from({ length: 50 }, () => 
        Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) - 50)
      );
      
      const startTime = Date.now();
      const nm = new NumMatrix(largeMatrix);
      
      // Perform multiple operations
      for (let i = 0; i < 100; i++) {
        nm.sumRegion(0, 0, 10, 10);
        nm.update(i % 50, (i * 2) % 50, i);
      }
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in reasonable time
    });
  });
});
