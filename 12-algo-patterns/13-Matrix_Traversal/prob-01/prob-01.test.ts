/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  MatrixTraversalEngine, 
  TraversalType, 
  Direction,
  TraversalPattern,
  MatrixBounds,
  createTestMatrix,
  visualizeTraversal 
} from './prob-01';

describe('Matrix Traversal Pattern - Problem 1: Spiral Matrix Traversal with Advanced Patterns', () => {
  let matrix3x3: number[][];
  let matrix4x3: number[][];
  let engine: MatrixTraversalEngine<number>;

  beforeEach(() => {
    matrix3x3 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    matrix4x3 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
    ];

    engine = new MatrixTraversalEngine(matrix3x3);
  });

  describe('Spiral traversal', () => {
    test('should perform clockwise spiral traversal correctly', () => {
      const result = engine.spiralTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
      expect(result.path).toEqual([
        [0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [1, 1]
      ]);
      expect(result.pattern).toBe('spiral-clockwise');
      expect(result.direction).toBe('clockwise');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
      expect(result.statistics.pathLength).toBe(9);
      expect(result.statistics.turns).toBeGreaterThan(0);
    });

    test('should perform counterclockwise spiral traversal correctly', () => {
      const result = engine.spiralTraversal(false);
      
      expect(result.traversalOrder).toEqual([1, 4, 7, 8, 9, 6, 3, 2, 5]);
      expect(result.pattern).toBe('spiral-counterclockwise');
      expect(result.direction).toBe('counterclockwise');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should handle rectangular matrix spiral', () => {
      const rectEngine = new MatrixTraversalEngine(matrix4x3);
      const result = rectEngine.spiralTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]);
      expect(result.statistics.totalCells).toBe(12);
      expect(result.statistics.visitedCells).toBe(12);
    });

    test('should handle single row matrix', () => {
      const singleRow = [[1, 2, 3, 4]];
      const singleRowEngine = new MatrixTraversalEngine(singleRow);
      const result = singleRowEngine.spiralTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 4]);
      expect(result.statistics.turns).toBe(0);
    });

    test('should handle single column matrix', () => {
      const singleCol = [[1], [2], [3], [4]];
      const singleColEngine = new MatrixTraversalEngine(singleCol);
      const result = singleColEngine.spiralTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 4]);
      expect(result.statistics.turns).toBe(0);
    });

    test('should handle single cell matrix', () => {
      const singleCell = [[42]];
      const singleCellEngine = new MatrixTraversalEngine(singleCell);
      const result = singleCellEngine.spiralTraversal(true);
      
      expect(result.traversalOrder).toEqual([42]);
      expect(result.path).toEqual([[0, 0]]);
      expect(result.statistics.turns).toBe(0);
    });
  });

  describe('Zigzag traversal', () => {
    test('should perform horizontal zigzag traversal', () => {
      const result = engine.zigzagTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 6, 5, 4, 7, 8, 9]);
      expect(result.pattern).toBe('zigzag-horizontal');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should perform vertical zigzag traversal', () => {
      const result = engine.zigzagTraversal(false);
      
      expect(result.traversalOrder).toEqual([1, 4, 7, 8, 5, 2, 3, 6, 9]);
      expect(result.pattern).toBe('zigzag-vertical');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should handle rectangular matrix zigzag', () => {
      const rectEngine = new MatrixTraversalEngine(matrix4x3);
      const result = rectEngine.zigzagTraversal(true);
      
      expect(result.traversalOrder).toEqual([1, 2, 3, 6, 5, 4, 7, 8, 9, 12, 11, 10]);
      expect(result.statistics.totalCells).toBe(12);
    });
  });

  describe('Diagonal traversal', () => {
    test('should perform main diagonal traversal', () => {
      const result = engine.diagonalTraversal(true);
      
      expect(result.pattern).toBe('diagonal-main');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
      
      // Should visit diagonals in order
      expect(result.traversalOrder[0]).toBe(1); // First diagonal: (0,0)
      expect(result.traversalOrder).toContain(2); // Should contain all elements
      expect(result.traversalOrder).toContain(9);
    });

    test('should perform anti-diagonal traversal', () => {
      const result = engine.diagonalTraversal(false);
      
      expect(result.pattern).toBe('diagonal-anti');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should handle rectangular matrix diagonal', () => {
      const rectEngine = new MatrixTraversalEngine(matrix4x3);
      const result = rectEngine.diagonalTraversal(true);
      
      expect(result.statistics.totalCells).toBe(12);
      expect(result.statistics.visitedCells).toBe(12);
    });
  });

  describe('Custom patterns', () => {
    test('should add and use custom traversal pattern', () => {
      const customPattern: TraversalPattern = {
        name: 'custom-test',
        directions: [[0, 1], [1, 0], [0, -1], [-1, 0]], // Right, Down, Left, Up
        turnCondition: (row, col, matrix, visited) => {
          return row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length || visited[row][col];
        },
        nextDirection: (currentDir, totalDirs) => (currentDir + 1) % totalDirs
      };
      
      engine.addCustomPattern(customPattern);
      const result = engine.customTraversal('custom-test');
      
      expect(result.pattern).toBe('custom-test');
      expect(result.statistics.totalCells).toBe(9);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should handle invalid custom pattern name', () => {
      expect(() => engine.customTraversal('non-existent')).toThrow();
    });
  });

  describe('Path generation and analysis', () => {
    test('should generate traversal path without values', () => {
      const path = engine.generateTraversalPath(TraversalType.SPIRAL_CLOCKWISE);
      
      expect(path).toEqual([
        [0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [1, 1]
      ]);
      expect(path.length).toBe(9);
    });

    test('should traverse from custom start position', () => {
      const result = engine.traverseFromPosition(1, 1, TraversalType.SPIRAL_CLOCKWISE);
      
      expect(result.path[0]).toEqual([1, 1]); // Should start from specified position
      expect(result.statistics.visitedCells).toBeGreaterThan(0);
    });

    test('should handle invalid start position', () => {
      expect(() => engine.traverseFromPosition(-1, 0, TraversalType.SPIRAL_CLOCKWISE)).toThrow();
      expect(() => engine.traverseFromPosition(0, 5, TraversalType.SPIRAL_CLOCKWISE)).toThrow();
    });

    test('should traverse specific region', () => {
      const bounds: MatrixBounds = {
        minRow: 0,
        maxRow: 1,
        minCol: 0,
        maxCol: 1
      };
      
      const result = engine.traverseRegion(bounds, TraversalType.SPIRAL_CLOCKWISE);
      
      expect(result.statistics.visitedCells).toBe(4); // 2x2 region
      expect(result.traversalOrder).toEqual([1, 2, 5, 4]);
    });

    test('should handle invalid region bounds', () => {
      const invalidBounds: MatrixBounds = {
        minRow: 2,
        maxRow: 1, // max < min
        minCol: 0,
        maxCol: 2
      };
      
      expect(() => engine.traverseRegion(invalidBounds, TraversalType.SPIRAL_CLOCKWISE)).toThrow();
    });
  });

  describe('Performance and optimization', () => {
    test('should track performance metrics', () => {
      const result = engine.spiralTraversal(true);
      
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.cacheHits).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.optimizationLevel).toBeGreaterThanOrEqual(0);
    });

    test('should optimize traversal for repeated patterns', () => {
      const result1 = engine.optimizeTraversal(TraversalType.SPIRAL_CLOCKWISE);
      const result2 = engine.optimizeTraversal(TraversalType.SPIRAL_CLOCKWISE);
      
      expect(result1.traversalOrder).toEqual(result2.traversalOrder);
      expect(result2.performanceMetrics.cacheHits).toBeGreaterThan(result1.performanceMetrics.cacheHits);
    });

    test('should handle large matrices efficiently', () => {
      const largeMatrix = createTestMatrix(100, 100, 1);
      const largeEngine = new MatrixTraversalEngine(largeMatrix);
      
      const startTime = Date.now();
      const result = largeEngine.spiralTraversal(true);
      const endTime = Date.now();
      
      expect(result.statistics.totalCells).toBe(10000);
      expect(result.statistics.visitedCells).toBe(10000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should compare different traversal patterns', () => {
      const types = [TraversalType.SPIRAL_CLOCKWISE, TraversalType.ZIGZAG_HORIZONTAL, TraversalType.DIAGONAL_MAIN];
      const comparison = engine.compareTraversals(types);
      
      expect(comparison.size).toBe(3);
      
      comparison.forEach((result, type) => {
        expect(result.statistics.totalCells).toBe(9);
        expect(result.statistics.visitedCells).toBe(9);
        expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Animation and visualization', () => {
    test('should animate traversal step by step', () => {
      const steps: any[] = [];
      const stepCallback = (row: number, col: number, value: number, step: number) => {
        steps.push({ row, col, value, step });
      };
      
      engine.animateTraversal(TraversalType.SPIRAL_CLOCKWISE, stepCallback);
      
      expect(steps.length).toBe(9);
      steps.forEach((step, index) => {
        expect(step.row).toBeGreaterThanOrEqual(0);
        expect(step.col).toBeGreaterThanOrEqual(0);
        expect(step.value).toBeGreaterThan(0);
        expect(step.step).toBe(index);
      });
    });
  });

  describe('Matrix updates', () => {
    test('should update matrix and clear caches', () => {
      const originalResult = engine.spiralTraversal(true);
      
      const newMatrix = [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
      ];
      
      engine.updateMatrix(newMatrix);
      const newResult = engine.spiralTraversal(true);
      
      expect(newResult.traversalOrder).toEqual([10, 20, 30, 60, 90, 80, 70, 40, 50]);
      expect(newResult.traversalOrder).not.toEqual(originalResult.traversalOrder);
    });

    test('should handle invalid matrix update', () => {
      const invalidMatrix: number[][] = []; // Empty matrix
      
      expect(() => engine.updateMatrix(invalidMatrix)).toThrow();
    });

    test('should get current matrix', () => {
      const currentMatrix = engine.getMatrix();
      
      expect(currentMatrix).toEqual(matrix3x3);
      expect(currentMatrix).not.toBe(matrix3x3); // Should be a copy
    });

    test('should get matrix dimensions', () => {
      const dimensions = engine.getDimensions();
      
      expect(dimensions.rows).toBe(3);
      expect(dimensions.cols).toBe(3);
    });

    test('should clear cache correctly', () => {
      engine.spiralTraversal(true); // Populate cache
      engine.clearCache();
      
      const result = engine.spiralTraversal(true);
      expect(result.performanceMetrics.cacheHits).toBe(0);
    });

    test('should reset visited state', () => {
      engine.spiralTraversal(true);
      engine.resetVisited();
      
      const result = engine.spiralTraversal(true);
      expect(result.statistics.visitedCells).toBe(9);
    });
  });

  describe('Utility functions', () => {
    test('should create test matrix correctly', () => {
      const testMatrix = createTestMatrix(3, 4, 5);
      
      expect(testMatrix.length).toBe(3);
      expect(testMatrix[0].length).toBe(4);
      
      testMatrix.forEach(row => {
        row.forEach(cell => {
          expect(cell).toBe(5);
        });
      });
    });

    test('should create test matrix with default values', () => {
      const testMatrix = createTestMatrix(2, 2);
      
      expect(testMatrix.length).toBe(2);
      expect(testMatrix[0].length).toBe(2);
      
      // Should have some default values
      testMatrix.forEach(row => {
        row.forEach(cell => {
          expect(typeof cell).toBe('number');
        });
      });
    });

    test('should visualize traversal path correctly', () => {
      const path = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]];
      const visualization = visualizeTraversal(matrix3x3, path);
      
      expect(visualization.length).toBe(3);
      expect(visualization[0].length).toBe(3);
      
      // Check that path is marked
      expect(visualization[0][0]).toBe('1');
      expect(visualization[0][1]).toBe('2');
      expect(visualization[0][2]).toBe('3');
      expect(visualization[1][2]).toBe('4');
      expect(visualization[2][2]).toBe('5');
    });

    test('should handle empty path in visualization', () => {
      const visualization = visualizeTraversal(matrix3x3, []);
      
      expect(visualization.length).toBe(3);
      expect(visualization[0].length).toBe(3);
      
      // All cells should be unmarked
      visualization.forEach(row => {
        row.forEach(cell => {
          expect(cell).toBe('·');
        });
      });
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty matrix', () => {
      const emptyMatrix: number[][] = [];
      
      expect(() => new MatrixTraversalEngine(emptyMatrix)).toThrow();
    });

    test('should handle matrix with empty rows', () => {
      const invalidMatrix = [[], [], []];
      
      expect(() => new MatrixTraversalEngine(invalidMatrix)).toThrow();
    });

    test('should handle jagged matrix', () => {
      const jaggedMatrix = [
        [1, 2, 3],
        [4, 5],
        [6, 7, 8, 9]
      ];
      
      // Should handle gracefully or throw appropriate error
      expect(() => new MatrixTraversalEngine(jaggedMatrix)).toThrow();
    });

    test('should handle null/undefined values in matrix', () => {
      const matrixWithNulls = [
        [1, null, 3],
        [4, 5, 6],
        [7, 8, 9]
      ] as any;
      
      const nullEngine = new MatrixTraversalEngine(matrixWithNulls);
      const result = nullEngine.spiralTraversal(true);
      
      expect(result.traversalOrder).toContain(null);
      expect(result.statistics.visitedCells).toBe(9);
    });

    test('should handle very large single dimension', () => {
      const wideMatrix = [Array(1000).fill(0).map((_, i) => i)];
      const wideEngine = new MatrixTraversalEngine(wideMatrix);
      
      const result = wideEngine.spiralTraversal(true);
      expect(result.statistics.totalCells).toBe(1000);
      expect(result.statistics.visitedCells).toBe(1000);
    });
  });
});
