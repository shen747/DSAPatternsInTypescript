/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  NQueensSolver, 
  SolutionStrategy, 
  OptimizationLevel,
  Position,
  Constraint,
  generateQueensBoard,
  visualizeSolution 
} from './prob-01';

describe('Backtracking Pattern - Problem 1: N-Queens with Advanced Constraint Solving', () => {
  describe('NQueensSolver', () => {
    test('should solve 4-Queens correctly', () => {
      const solver = new NQueensSolver(4);
      const result = solver.solveNQueens();
      
      expect(result.solutionCount).toBe(2); // 4-Queens has exactly 2 solutions
      expect(result.solutions.length).toBe(2);
      expect(result.isComplete).toBe(true);
      expect(result.algorithm).toBeDefined();
      expect(result.performanceMetrics.backtrackCount).toBeGreaterThan(0);
      
      // Verify each solution is valid
      result.solutions.forEach(solution => {
        expect(solution.length).toBe(4);
        expect(solver.isValidSolution(solution)).toBe(true);
      });
    });

    test('should solve 8-Queens correctly', () => {
      const solver = new NQueensSolver(8);
      const result = solver.solveNQueens();
      
      expect(result.solutionCount).toBe(92); // 8-Queens has exactly 92 solutions
      expect(result.solutions.length).toBe(92);
      expect(result.isComplete).toBe(true);
    });

    test('should handle impossible cases', () => {
      const solver = new NQueensSolver(2);
      const result = solver.solveNQueens();
      
      expect(result.solutionCount).toBe(0);
      expect(result.solutions.length).toBe(0);
      expect(result.isComplete).toBe(true);
    });

    test('should handle trivial case N=1', () => {
      const solver = new NQueensSolver(1);
      const result = solver.solveNQueens();
      
      expect(result.solutionCount).toBe(1);
      expect(result.solutions.length).toBe(1);
      expect(result.solutions[0]).toEqual([0]); // Queen at position 0
    });

    test('should find first solution quickly', () => {
      const solver = new NQueensSolver(8);
      const result = solver.findFirstSolution();
      
      expect(result.solutionFound).toBe(true);
      expect(result.solution.length).toBe(8);
      expect(solver.isValidSolution(result.solution)).toBe(true);
      expect(result.performanceMetrics.executionTime).toBeLessThan(100);
    });

    test('should count solutions without storing them', () => {
      const solver = new NQueensSolver(8);
      const count = solver.countSolutions();
      
      expect(count.totalSolutions).toBe(92);
      expect(count.performanceMetrics.memoryUsage).toBeLessThan(1000000); // Should use less memory
    });

    test('should use different solution strategies', () => {
      const solver = new NQueensSolver(6);
      
      const basicResult = solver.solveNQueens(SolutionStrategy.BASIC_BACKTRACKING);
      const optimizedResult = solver.solveNQueens(SolutionStrategy.CONSTRAINT_PROPAGATION);
      const heuristicResult = solver.solveNQueens(SolutionStrategy.HEURISTIC_SEARCH);
      
      expect(basicResult.solutionCount).toBe(optimizedResult.solutionCount);
      expect(basicResult.solutionCount).toBe(heuristicResult.solutionCount);
      
      // Optimized strategies should explore fewer states
      expect(optimizedResult.performanceMetrics.statesExplored).toBeLessThanOrEqual(basicResult.performanceMetrics.statesExplored);
      expect(heuristicResult.performanceMetrics.statesExplored).toBeLessThanOrEqual(basicResult.performanceMetrics.statesExplored);
    });
  });

  describe('Constraint handling', () => {
    test('should handle pre-placed queens', () => {
      const solver = new NQueensSolver(4);
      const prePlaced: Position[] = [{ row: 0, col: 1 }]; // Queen at (0,1)
      
      const result = solver.solveWithPrePlaced(prePlaced);
      
      expect(result.solutionCount).toBeGreaterThanOrEqual(0);
      
      // Verify pre-placed queens are in all solutions
      result.solutions.forEach(solution => {
        expect(solution[0]).toBe(1); // Queen in row 0 should be at column 1
      });
    });

    test('should handle forbidden squares', () => {
      const solver = new NQueensSolver(4);
      const forbidden: Position[] = [{ row: 1, col: 0 }, { row: 1, col: 1 }];
      
      const result = solver.solveWithForbiddenSquares(forbidden);
      
      expect(result.solutionCount).toBeGreaterThanOrEqual(0);
      
      // Verify no queens are placed on forbidden squares
      result.solutions.forEach(solution => {
        expect(solution[1]).not.toBe(0); // Row 1 should not have queen at col 0
        expect(solution[1]).not.toBe(1); // Row 1 should not have queen at col 1
      });
    });

    test('should handle custom constraints', () => {
      const solver = new NQueensSolver(4);
      const customConstraint: Constraint = {
        type: 'custom',
        validate: (board, row, col) => {
          // Custom rule: no queens in corners
          return !(row === 0 && col === 0) && 
                 !(row === 0 && col === 3) && 
                 !(row === 3 && col === 0) && 
                 !(row === 3 && col === 3);
        },
        description: 'No queens in corners'
      };
      
      const result = solver.solveWithConstraints([customConstraint]);
      
      expect(result.solutionCount).toBeGreaterThanOrEqual(0);
      
      // Verify custom constraint is satisfied
      result.solutions.forEach(solution => {
        expect(solution[0]).not.toBe(0); // Row 0 not at col 0
        expect(solution[0]).not.toBe(3); // Row 0 not at col 3
        expect(solution[3]).not.toBe(0); // Row 3 not at col 0
        expect(solution[3]).not.toBe(3); // Row 3 not at col 3
      });
    });

    test('should handle required positions', () => {
      const solver = new NQueensSolver(4);
      const required: Position[] = [{ row: 2, col: 1 }]; // Must place queen at (2,1)
      
      const result = solver.solveWithRequiredPositions(required);
      
      expect(result.solutionCount).toBeGreaterThanOrEqual(0);
      
      // Verify required positions are in all solutions
      result.solutions.forEach(solution => {
        expect(solution[2]).toBe(1); // Queen in row 2 must be at column 1
      });
    });
  });

  describe('Optimization and performance', () => {
    test('should use different optimization levels', () => {
      const solver = new NQueensSolver(8);
      
      const basicResult = solver.solveNQueens(SolutionStrategy.BASIC_BACKTRACKING, OptimizationLevel.NONE);
      const optimizedResult = solver.solveNQueens(SolutionStrategy.BASIC_BACKTRACKING, OptimizationLevel.AGGRESSIVE);
      
      expect(basicResult.solutionCount).toBe(optimizedResult.solutionCount);
      expect(optimizedResult.performanceMetrics.executionTime).toBeLessThanOrEqual(basicResult.performanceMetrics.executionTime);
    });

    test('should handle large N efficiently', () => {
      const solver = new NQueensSolver(12);
      
      const startTime = Date.now();
      const result = solver.findFirstSolution();
      const endTime = Date.now();
      
      expect(result.solutionFound).toBe(true);
      expect(endTime - startTime).toBeLessThan(1000); // Should find first solution quickly
    });

    test('should track detailed performance metrics', () => {
      const solver = new NQueensSolver(6);
      const result = solver.solveNQueens();
      
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.backtrackCount).toBeGreaterThan(0);
      expect(result.performanceMetrics.statesExplored).toBeGreaterThan(0);
      expect(result.performanceMetrics.pruningEfficiency).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.maxRecursionDepth).toBeGreaterThan(0);
    });

    test('should use symmetry reduction', () => {
      const solver = new NQueensSolver(8);
      
      const withSymmetry = solver.solveWithSymmetryReduction();
      const withoutSymmetry = solver.solveNQueens();
      
      expect(withSymmetry.uniqueSolutions).toBe(12); // 8-Queens has 12 unique solutions considering symmetry
      expect(withSymmetry.totalSolutions).toBe(92);
      expect(withSymmetry.symmetryReduction).toBeGreaterThan(1);
    });
  });

  describe('Advanced features', () => {
    test('should solve step by step with animation', () => {
      const solver = new NQueensSolver(4);
      const steps: any[] = [];
      
      const stepCallback = (step: any) => {
        steps.push(step);
      };
      
      solver.solveStepByStep(stepCallback);
      
      expect(steps.length).toBeGreaterThan(0);
      steps.forEach(step => {
        expect(step.row).toBeGreaterThanOrEqual(0);
        expect(step.col).toBeGreaterThanOrEqual(0);
        expect(step.action).toMatch(/place|remove|backtrack/);
      });
    });

    test('should generate solution statistics', () => {
      const solver = new NQueensSolver(6);
      const result = solver.solveNQueens();
      const stats = solver.generateStatistics(result);
      
      expect(stats.averageSolutionTime).toBeGreaterThan(0);
      expect(stats.solutionDistribution.size).toBeGreaterThan(0);
      expect(stats.backtrackingEfficiency).toBeGreaterThan(0);
      expect(stats.constraintViolations).toBeGreaterThanOrEqual(0);
      expect(stats.searchTreeDepth).toBeGreaterThan(0);
    });

    test('should compare different algorithms', () => {
      const solver = new NQueensSolver(6);
      const comparison = solver.compareAlgorithms();
      
      expect(comparison.algorithms.size).toBeGreaterThan(1);
      
      comparison.algorithms.forEach((metrics, algorithm) => {
        expect(metrics.executionTime).toBeGreaterThanOrEqual(0);
        expect(metrics.solutionCount).toBeGreaterThanOrEqual(0);
        expect(metrics.memoryUsage).toBeGreaterThan(0);
      });
      
      expect(comparison.bestAlgorithm).toBeDefined();
      expect(comparison.performanceRanking.length).toBeGreaterThan(0);
    });

    test('should validate solutions correctly', () => {
      const solver = new NQueensSolver(4);
      
      const validSolution = [1, 3, 0, 2]; // Valid 4-Queens solution
      const invalidSolution = [0, 0, 0, 0]; // Invalid - all queens in same column
      
      expect(solver.isValidSolution(validSolution)).toBe(true);
      expect(solver.isValidSolution(invalidSolution)).toBe(false);
    });

    test('should handle partial solutions', () => {
      const solver = new NQueensSolver(4);
      const partialSolution = [1, -1, -1, -1]; // Only first queen placed
      
      const result = solver.completePartialSolution(partialSolution);
      
      expect(result.completedSolutions.length).toBeGreaterThan(0);
      result.completedSolutions.forEach(solution => {
        expect(solution[0]).toBe(1); // First queen should remain at position 1
        expect(solver.isValidSolution(solution)).toBe(true);
      });
    });
  });

  describe('Utility functions', () => {
    test('should generate queens board correctly', () => {
      const solution = [1, 3, 0, 2];
      const board = generateQueensBoard(solution);
      
      expect(board.length).toBe(4);
      expect(board[0].length).toBe(4);
      
      // Verify queens are placed correctly
      expect(board[0][1]).toBe(1); // Queen at (0,1)
      expect(board[1][3]).toBe(1); // Queen at (1,3)
      expect(board[2][0]).toBe(1); // Queen at (2,0)
      expect(board[3][2]).toBe(1); // Queen at (3,2)
      
      // Verify other squares are empty
      let queenCount = 0;
      board.forEach(row => {
        row.forEach(cell => {
          if (cell === 1) queenCount++;
        });
      });
      expect(queenCount).toBe(4);
    });

    test('should visualize solution correctly', () => {
      const solution = [1, 3, 0, 2];
      const visualization = visualizeSolution(solution);
      
      expect(visualization.length).toBeGreaterThan(0);
      expect(visualization).toContain('Q'); // Should contain queen symbols
      expect(visualization).toContain('.'); // Should contain empty squares
    });

    test('should handle empty solution in visualization', () => {
      const visualization = visualizeSolution([]);
      expect(visualization).toBe('');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle N=0', () => {
      expect(() => new NQueensSolver(0)).toThrow();
    });

    test('should handle negative N', () => {
      expect(() => new NQueensSolver(-1)).toThrow();
    });

    test('should handle very large N', () => {
      const solver = new NQueensSolver(20);
      
      // Should not crash, but might not find all solutions quickly
      const result = solver.findFirstSolution();
      expect(typeof result.solutionFound).toBe('boolean');
    });

    test('should handle invalid pre-placed queens', () => {
      const solver = new NQueensSolver(4);
      const invalidPrePlaced: Position[] = [
        { row: 0, col: 0 },
        { row: 1, col: 1 } // This conflicts with the first queen
      ];
      
      const result = solver.solveWithPrePlaced(invalidPrePlaced);
      expect(result.solutionCount).toBe(0); // No valid solutions
    });

    test('should handle out-of-bounds positions', () => {
      const solver = new NQueensSolver(4);
      const outOfBounds: Position[] = [{ row: 5, col: 5 }];
      
      expect(() => solver.solveWithPrePlaced(outOfBounds)).toThrow();
    });

    test('should reset solver state correctly', () => {
      const solver = new NQueensSolver(4);
      
      solver.solveNQueens();
      solver.reset();
      
      const result = solver.solveNQueens();
      expect(result.solutionCount).toBe(2); // Should still work correctly
    });

    test('should get current configuration', () => {
      const solver = new NQueensSolver(8);
      const config = solver.getConfiguration();
      
      expect(config.boardSize).toBe(8);
      expect(config.strategy).toBeDefined();
      expect(config.optimizationLevel).toBeDefined();
      expect(config.symmetryReduction).toBeDefined();
    });

    test('should update configuration', () => {
      const solver = new NQueensSolver(8);
      
      solver.setConfiguration({
        strategy: SolutionStrategy.HEURISTIC_SEARCH,
        optimizationLevel: OptimizationLevel.AGGRESSIVE,
        symmetryReduction: true
      });
      
      const config = solver.getConfiguration();
      expect(config.strategy).toBe(SolutionStrategy.HEURISTIC_SEARCH);
      expect(config.optimizationLevel).toBe(OptimizationLevel.AGGRESSIVE);
      expect(config.symmetryReduction).toBe(true);
    });
  });
});
