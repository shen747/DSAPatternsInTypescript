/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  MatrixTransformationEngine, 
  RotationAngle, 
  FlipDirection,
  ScalingMode,
  MatrixOperation,
  createTestMatrix,
  matricesEqual 
} from './prob-02';

describe('Matrix Traversal Pattern - Problem 2: Matrix Rotation and Transformation with Advanced Operations', () => {
  let matrix3x3: number[][];
  let matrix4x3: number[][];
  let engine: MatrixTransformationEngine<number>;

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

    engine = new MatrixTransformationEngine(matrix3x3);
  });

  describe('90-degree rotations', () => {
    test('should rotate 90 degrees clockwise correctly', () => {
      const result = engine.rotate90Clockwise(false);
      
      expect(result.result).toEqual([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
      ]);
      expect(result.operation).toBe('rotate-90-clockwise');
      expect(result.inPlace).toBe(false);
      expect(result.originalDimensions).toEqual({ rows: 3, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 3, cols: 3 });
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
    });

    test('should rotate 90 degrees counterclockwise correctly', () => {
      const result = engine.rotate90Counterclockwise(false);
      
      expect(result.result).toEqual([
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7]
      ]);
      expect(result.operation).toBe('rotate-90-counterclockwise');
      expect(result.inPlace).toBe(false);
    });

    test('should perform in-place 90-degree rotation', () => {
      const originalMatrix = engine.getMatrix();
      const result = engine.rotate90Clockwise(true);
      
      expect(result.inPlace).toBe(true);
      expect(result.result).toEqual([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
      ]);
      
      // Original matrix should be modified
      const currentMatrix = engine.getMatrix();
      expect(currentMatrix).toEqual(result.result);
      expect(currentMatrix).not.toEqual(originalMatrix);
    });

    test('should handle rectangular matrix rotation', () => {
      const rectEngine = new MatrixTransformationEngine(matrix4x3);
      const result = rectEngine.rotate90Clockwise(false);
      
      expect(result.result).toEqual([
        [10, 7, 4, 1],
        [11, 8, 5, 2],
        [12, 9, 6, 3]
      ]);
      expect(result.originalDimensions).toEqual({ rows: 4, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 3, cols: 4 });
    });

    test('should handle single element matrix', () => {
      const singleEngine = new MatrixTransformationEngine([[42]]);
      const result = singleEngine.rotate90Clockwise(false);
      
      expect(result.result).toEqual([[42]]);
      expect(result.originalDimensions).toEqual({ rows: 1, cols: 1 });
      expect(result.newDimensions).toEqual({ rows: 1, cols: 1 });
    });
  });

  describe('180-degree rotation', () => {
    test('should rotate 180 degrees correctly', () => {
      const result = engine.rotate180(false);
      
      expect(result.result).toEqual([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
      ]);
      expect(result.operation).toBe('rotate-180');
      expect(result.inPlace).toBe(false);
    });

    test('should perform in-place 180-degree rotation', () => {
      const result = engine.rotate180(true);
      
      expect(result.inPlace).toBe(true);
      expect(result.result).toEqual([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
      ]);
    });

    test('should handle rectangular matrix 180-degree rotation', () => {
      const rectEngine = new MatrixTransformationEngine(matrix4x3);
      const result = rectEngine.rotate180(false);
      
      expect(result.result).toEqual([
        [12, 11, 10],
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
      ]);
      expect(result.originalDimensions).toEqual({ rows: 4, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 4, cols: 3 });
    });
  });

  describe('Arbitrary angle rotation', () => {
    test('should rotate by arbitrary angle', () => {
      const result = engine.rotateByAngle(45, ScalingMode.BILINEAR);
      
      expect(result.operation).toBe('rotate-45-degrees');
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      
      // Result should be larger due to rotation
      expect(result.newDimensions.rows).toBeGreaterThanOrEqual(result.originalDimensions.rows);
      expect(result.newDimensions.cols).toBeGreaterThanOrEqual(result.originalDimensions.cols);
    });

    test('should handle different scaling modes', () => {
      const nearestResult = engine.rotateByAngle(30, ScalingMode.NEAREST_NEIGHBOR);
      const bilinearResult = engine.rotateByAngle(30, ScalingMode.BILINEAR);
      const bicubicResult = engine.rotateByAngle(30, ScalingMode.BICUBIC);
      
      expect(nearestResult.result).toBeDefined();
      expect(bilinearResult.result).toBeDefined();
      expect(bicubicResult.result).toBeDefined();
      
      // Results might be different due to different interpolation methods
      expect(nearestResult.result.length).toBeGreaterThan(0);
      expect(bilinearResult.result.length).toBeGreaterThan(0);
      expect(bicubicResult.result.length).toBeGreaterThan(0);
    });

    test('should handle 0-degree rotation', () => {
      const result = engine.rotateByAngle(0);
      
      expect(result.result).toEqual(matrix3x3);
      expect(result.originalDimensions).toEqual(result.newDimensions);
    });

    test('should handle 360-degree rotation', () => {
      const result = engine.rotateByAngle(360);
      
      // Should be approximately equal to original (within tolerance)
      expect(matricesEqual(result.result, matrix3x3, 0.1)).toBe(true);
    });
  });

  describe('Matrix flips', () => {
    test('should flip horizontally', () => {
      const result = engine.flipHorizontal(false);
      
      expect(result.result).toEqual([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ]);
      expect(result.operation).toBe('flip-horizontal');
      expect(result.inPlace).toBe(false);
    });

    test('should flip vertically', () => {
      const result = engine.flipVertical(false);
      
      expect(result.result).toEqual([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ]);
      expect(result.operation).toBe('flip-vertical');
      expect(result.inPlace).toBe(false);
    });

    test('should perform in-place horizontal flip', () => {
      const result = engine.flipHorizontal(true);
      
      expect(result.inPlace).toBe(true);
      expect(result.result).toEqual([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ]);
    });

    test('should perform in-place vertical flip', () => {
      const result = engine.flipVertical(true);
      
      expect(result.inPlace).toBe(true);
      expect(result.result).toEqual([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ]);
    });

    test('should handle rectangular matrix flips', () => {
      const rectEngine = new MatrixTransformationEngine(matrix4x3);
      
      const hFlip = rectEngine.flipHorizontal(false);
      expect(hFlip.result).toEqual([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7],
        [12, 11, 10]
      ]);
      
      const vFlip = rectEngine.flipVertical(false);
      expect(vFlip.result).toEqual([
        [10, 11, 12],
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ]);
    });
  });

  describe('Matrix transpose', () => {
    test('should transpose square matrix', () => {
      const result = engine.transpose(false);
      
      expect(result.result).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ]);
      expect(result.operation).toBe('transpose');
      expect(result.originalDimensions).toEqual({ rows: 3, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 3, cols: 3 });
    });

    test('should transpose rectangular matrix', () => {
      const rectEngine = new MatrixTransformationEngine(matrix4x3);
      const result = rectEngine.transpose(false);
      
      expect(result.result).toEqual([
        [1, 4, 7, 10],
        [2, 5, 8, 11],
        [3, 6, 9, 12]
      ]);
      expect(result.originalDimensions).toEqual({ rows: 4, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 3, cols: 4 });
    });

    test('should perform in-place transpose for square matrix', () => {
      const result = engine.transpose(true);
      
      expect(result.inPlace).toBe(true);
      expect(result.result).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ]);
    });

    test('should handle single row matrix transpose', () => {
      const singleRowEngine = new MatrixTransformationEngine([[1, 2, 3, 4]]);
      const result = singleRowEngine.transpose(false);
      
      expect(result.result).toEqual([[1], [2], [3], [4]]);
      expect(result.originalDimensions).toEqual({ rows: 1, cols: 4 });
      expect(result.newDimensions).toEqual({ rows: 4, cols: 1 });
    });
  });

  describe('Matrix scaling', () => {
    test('should scale matrix up', () => {
      const result = engine.scale(6, 6, ScalingMode.NEAREST_NEIGHBOR);
      
      expect(result.result.length).toBe(6);
      expect(result.result[0].length).toBe(6);
      expect(result.operation).toBe('scale');
      expect(result.originalDimensions).toEqual({ rows: 3, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 6, cols: 6 });
    });

    test('should scale matrix down', () => {
      const result = engine.scale(2, 2, ScalingMode.BILINEAR);
      
      expect(result.result.length).toBe(2);
      expect(result.result[0].length).toBe(2);
      expect(result.originalDimensions).toEqual({ rows: 3, cols: 3 });
      expect(result.newDimensions).toEqual({ rows: 2, cols: 2 });
    });

    test('should handle different scaling modes', () => {
      const nearestResult = engine.scale(4, 4, ScalingMode.NEAREST_NEIGHBOR);
      const bilinearResult = engine.scale(4, 4, ScalingMode.BILINEAR);
      const bicubicResult = engine.scale(4, 4, ScalingMode.BICUBIC);
      
      expect(nearestResult.result.length).toBe(4);
      expect(bilinearResult.result.length).toBe(4);
      expect(bicubicResult.result.length).toBe(4);
      
      // Results should be different due to different interpolation
      expect(nearestResult.result).not.toEqual(bilinearResult.result);
    });

    test('should handle identity scaling', () => {
      const result = engine.scale(3, 3, ScalingMode.NEAREST_NEIGHBOR);
      
      expect(result.result).toEqual(matrix3x3);
      expect(result.originalDimensions).toEqual(result.newDimensions);
    });
  });

  describe('Custom transformations', () => {
    test('should apply custom transformation', () => {
      const customTransform = (matrix: number[][]) => {
        return matrix.map(row => row.map(val => val * 2));
      };
      
      const result = engine.applyCustomTransformation(customTransform, 'double-values');
      
      expect(result.result).toEqual([
        [2, 4, 6],
        [8, 10, 12],
        [14, 16, 18]
      ]);
      expect(result.operation).toBe('double-values');
    });

    test('should handle custom transformation errors', () => {
      const invalidTransform = (matrix: number[][]) => {
        throw new Error('Custom transformation failed');
      };
      
      expect(() => engine.applyCustomTransformation(invalidTransform, 'invalid')).toThrow();
    });
  });

  describe('Transformation chaining', () => {
    test('should chain multiple transformations', () => {
      const operations: MatrixOperation[] = [
        { type: 'rotate', parameters: { angle: 90, clockwise: true } },
        { type: 'flip', parameters: { direction: FlipDirection.HORIZONTAL } },
        { type: 'transpose', parameters: {} }
      ];
      
      const result = engine.chainTransformations(operations);
      
      expect(result.operations).toHaveLength(3);
      expect(result.result).toBeDefined();
      expect(result.totalTime).toBeGreaterThanOrEqual(0);
      expect(result.memoryEfficiency).toBeGreaterThan(0);
    });

    test('should optimize transformation chain', () => {
      const operations: MatrixOperation[] = [
        { type: 'rotate', parameters: { angle: 90 } },
        { type: 'rotate', parameters: { angle: 90 } },
        { type: 'flip', parameters: { direction: FlipDirection.HORIZONTAL } },
        { type: 'flip', parameters: { direction: FlipDirection.HORIZONTAL } }
      ];
      
      const optimized = engine.optimizeTransformationChain(operations);
      
      expect(optimized.length).toBeLessThan(operations.length);
      // Two 90-degree rotations should become one 180-degree rotation
      // Two horizontal flips should cancel out
    });

    test('should handle empty operation chain', () => {
      const result = engine.chainTransformations([]);
      
      expect(result.operations).toHaveLength(0);
      expect(result.result).toEqual(matrix3x3);
      expect(result.optimized).toBe(true);
    });
  });

  describe('Undo/Redo functionality', () => {
    test('should undo transformation', () => {
      const originalMatrix = engine.getMatrix();
      
      engine.rotate90Clockwise(true);
      const rotatedMatrix = engine.getMatrix();
      
      const undoSuccess = engine.undo();
      const restoredMatrix = engine.getMatrix();
      
      expect(undoSuccess).toBe(true);
      expect(restoredMatrix).toEqual(originalMatrix);
      expect(restoredMatrix).not.toEqual(rotatedMatrix);
    });

    test('should redo transformation', () => {
      engine.rotate90Clockwise(true);
      const rotatedMatrix = engine.getMatrix();
      
      engine.undo();
      const undoneMatrix = engine.getMatrix();
      
      const redoSuccess = engine.redo();
      const redoneMatrix = engine.getMatrix();
      
      expect(redoSuccess).toBe(true);
      expect(redoneMatrix).toEqual(rotatedMatrix);
      expect(redoneMatrix).not.toEqual(undoneMatrix);
    });

    test('should handle undo when no operations performed', () => {
      const undoSuccess = engine.undo();
      expect(undoSuccess).toBe(false);
    });

    test('should handle redo when no operations undone', () => {
      const redoSuccess = engine.redo();
      expect(redoSuccess).toBe(false);
    });

    test('should clear redo stack after new operation', () => {
      engine.rotate90Clockwise(true);
      engine.undo();
      
      // Perform new operation - should clear redo stack
      engine.flipHorizontal(true);
      
      const redoSuccess = engine.redo();
      expect(redoSuccess).toBe(false);
    });
  });

  describe('Matrix properties and validation', () => {
    test('should check if matrix is square', () => {
      expect(engine.isSquare()).toBe(true);
      
      const rectEngine = new MatrixTransformationEngine(matrix4x3);
      expect(rectEngine.isSquare()).toBe(false);
    });

    test('should validate matrix structure', () => {
      const validMatrix = [[1, 2], [3, 4]];
      const invalidMatrix = [[1, 2], [3]]; // Jagged
      const emptyMatrix: number[][] = [];
      
      expect(engine.validateMatrix(validMatrix)).toBe(true);
      expect(engine.validateMatrix(invalidMatrix)).toBe(false);
      expect(engine.validateMatrix(emptyMatrix)).toBe(false);
    });

    test('should get matrix dimensions', () => {
      const dims = engine.getDimensions();
      
      expect(dims.rows).toBe(3);
      expect(dims.cols).toBe(3);
    });

    test('should get and set matrix', () => {
      const newMatrix = [[10, 20], [30, 40]];
      
      engine.setMatrix(newMatrix);
      const retrievedMatrix = engine.getMatrix();
      
      expect(retrievedMatrix).toEqual(newMatrix);
      expect(retrievedMatrix).not.toBe(newMatrix); // Should be a copy
    });
  });

  describe('History and caching', () => {
    test('should track transformation history', () => {
      engine.rotate90Clockwise(false);
      engine.flipHorizontal(false);
      engine.transpose(false);
      
      const history = engine.getTransformationHistory();
      
      expect(history).toHaveLength(3);
      expect(history[0].type).toBe('rotate');
      expect(history[1].type).toBe('flip');
      expect(history[2].type).toBe('transpose');
    });

    test('should clear history and caches', () => {
      engine.rotate90Clockwise(false);
      engine.flipHorizontal(false);
      
      engine.clearHistory();
      
      const history = engine.getTransformationHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('Utility functions', () => {
    test('should create test matrix correctly', () => {
      const testMatrix = createTestMatrix(3, 4, (i, j) => i * 4 + j);
      
      expect(testMatrix.length).toBe(3);
      expect(testMatrix[0].length).toBe(4);
      expect(testMatrix[0][0]).toBe(0);
      expect(testMatrix[1][2]).toBe(6);
      expect(testMatrix[2][3]).toBe(11);
    });

    test('should compare matrices correctly', () => {
      const matrix1 = [[1, 2], [3, 4]];
      const matrix2 = [[1, 2], [3, 4]];
      const matrix3 = [[1, 2], [3, 5]];
      const matrix4 = [[1.1, 2.1], [3.1, 4.1]];
      
      expect(matricesEqual(matrix1, matrix2)).toBe(true);
      expect(matricesEqual(matrix1, matrix3)).toBe(false);
      expect(matricesEqual(matrix1, matrix4, 0.2)).toBe(true);
      expect(matricesEqual(matrix1, matrix4, 0.05)).toBe(false);
    });

    test('should handle matrix comparison edge cases', () => {
      const matrix1 = [[1, 2]];
      const matrix2 = [[1], [2]];
      const emptyMatrix: number[][] = [];
      
      expect(matricesEqual(matrix1, matrix2)).toBe(false); // Different dimensions
      expect(matricesEqual(emptyMatrix, emptyMatrix)).toBe(true);
      expect(matricesEqual(matrix1, emptyMatrix)).toBe(false);
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large matrices efficiently', () => {
      const largeMatrix = createTestMatrix(100, 100, (i, j) => i * 100 + j);
      const largeEngine = new MatrixTransformationEngine(largeMatrix);
      
      const startTime = Date.now();
      const result = largeEngine.rotate90Clockwise(false);
      const endTime = Date.now();
      
      expect(result.result.length).toBe(100);
      expect(result.result[0].length).toBe(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should handle empty matrix', () => {
      expect(() => new MatrixTransformationEngine([])).toThrow();
    });

    test('should handle matrix with null/undefined values', () => {
      const matrixWithNulls = [[1, null], [undefined, 4]] as any;
      const nullEngine = new MatrixTransformationEngine(matrixWithNulls);
      
      const result = nullEngine.rotate90Clockwise(false);
      expect(result.result).toBeDefined();
      expect(result.result.length).toBe(2);
    });

    test('should handle very large single dimension', () => {
      const wideMatrix = [Array(1000).fill(0).map((_, i) => i)];
      const wideEngine = new MatrixTransformationEngine(wideMatrix);
      
      const result = wideEngine.transpose(false);
      expect(result.result.length).toBe(1000);
      expect(result.result[0].length).toBe(1);
    });
  });
});
