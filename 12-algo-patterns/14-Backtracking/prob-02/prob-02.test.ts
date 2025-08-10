/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  SudokuSolver, 
  SolvingAlgorithm, 
  DifficultyLevel,
  SudokuGrid,
  generateSudoku,
  validateSudoku 
} from './prob-02';

describe('Backtracking Pattern - Problem 2: Sudoku Solver with Advanced Techniques', () => {
  let easySudoku: SudokuGrid;
  let hardSudoku: SudokuGrid;
  let solver: SudokuSolver;

  beforeEach(() => {
    // Easy 9x9 Sudoku puzzle
    easySudoku = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ];

    // Hard 9x9 Sudoku puzzle (minimal clues)
    hardSudoku = [
      [0,0,0,0,0,0,0,1,0],
      [4,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,6,0,2],
      [0,0,0,0,0,0,0,0,0],
      [5,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];

    solver = new SudokuSolver();
  });

  describe('Basic Sudoku solving', () => {
    test('should solve easy Sudoku correctly', () => {
      const result = solver.solve(easySudoku);
      
      expect(result.solved).toBe(true);
      expect(result.solution).toBeDefined();
      expect(result.isUnique).toBe(true);
      expect(result.algorithm).toBeDefined();
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.backtrackCount).toBeGreaterThanOrEqual(0);
      
      // Verify solution is valid
      expect(validateSudoku(result.solution!)).toBe(true);
    });

    test('should handle already solved Sudoku', () => {
      const solvedSudoku = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
      ];
      
      const result = solver.solve(solvedSudoku);
      
      expect(result.solved).toBe(true);
      expect(result.solution).toEqual(solvedSudoku);
      expect(result.performanceMetrics.backtrackCount).toBe(0);
    });

    test('should detect unsolvable Sudoku', () => {
      const unsolvableSudoku = [
        [1,1,0,0,0,0,0,0,0], // Invalid: two 1s in same row
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ];
      
      const result = solver.solve(unsolvableSudoku);
      
      expect(result.solved).toBe(false);
      expect(result.solution).toBeNull();
      expect(result.errorMessage).toBeDefined();
    });

    test('should handle empty Sudoku', () => {
      const emptySudoku = Array(9).fill(null).map(() => Array(9).fill(0));
      
      const result = solver.solve(emptySudoku);
      
      expect(result.solved).toBe(true);
      expect(result.solution).toBeDefined();
      expect(validateSudoku(result.solution!)).toBe(true);
    });

    test('should use different solving algorithms', () => {
      const backtrackResult = solver.solve(easySudoku, SolvingAlgorithm.BACKTRACKING);
      const constraintResult = solver.solve(easySudoku, SolvingAlgorithm.CONSTRAINT_PROPAGATION);
      const hybridResult = solver.solve(easySudoku, SolvingAlgorithm.HYBRID);
      
      expect(backtrackResult.solved).toBe(true);
      expect(constraintResult.solved).toBe(true);
      expect(hybridResult.solved).toBe(true);
      
      expect(backtrackResult.algorithm).toBe('backtracking');
      expect(constraintResult.algorithm).toBe('constraint-propagation');
      expect(hybridResult.algorithm).toBe('hybrid');
      
      // All should produce same solution
      expect(backtrackResult.solution).toEqual(constraintResult.solution);
      expect(backtrackResult.solution).toEqual(hybridResult.solution);
    });
  });

  describe('Variable-size Sudoku', () => {
    test('should solve 4x4 Sudoku', () => {
      const sudoku4x4 = [
        [0,0,0,1],
        [0,0,0,0],
        [0,0,0,0],
        [2,0,0,0]
      ];
      
      const result = solver.solve(sudoku4x4);
      
      expect(result.solved).toBe(true);
      expect(result.solution!.length).toBe(4);
      expect(result.solution![0].length).toBe(4);
      expect(validateSudoku(result.solution!)).toBe(true);
    });

    test('should handle 16x16 Sudoku', () => {
      const sudoku16x16 = Array(16).fill(null).map(() => Array(16).fill(0));
      // Add some clues
      sudoku16x16[0][0] = 1;
      sudoku16x16[1][1] = 2;
      sudoku16x16[2][2] = 3;
      
      const result = solver.solve(sudoku16x16);
      
      expect(result.solved).toBe(true);
      expect(result.solution!.length).toBe(16);
      expect(validateSudoku(result.solution!)).toBe(true);
    });

    test('should validate grid size', () => {
      const invalidGrid = Array(5).fill(null).map(() => Array(5).fill(0)); // 5x5 is not valid
      
      expect(() => solver.solve(invalidGrid)).toThrow();
    });
  });

  describe('Advanced solving techniques', () => {
    test('should find naked singles', () => {
      const result = solver.solve(easySudoku, SolvingAlgorithm.CONSTRAINT_PROPAGATION);
      
      expect(result.solvingSteps).toBeDefined();
      expect(result.solvingSteps!.some(step => step.technique === 'naked-single')).toBe(true);
    });

    test('should find hidden singles', () => {
      const result = solver.solve(easySudoku, SolvingAlgorithm.CONSTRAINT_PROPAGATION);
      
      expect(result.solvingSteps!.some(step => step.technique === 'hidden-single')).toBe(true);
    });

    test('should use advanced techniques for hard puzzles', () => {
      const result = solver.solve(hardSudoku, SolvingAlgorithm.ADVANCED_TECHNIQUES);
      
      expect(result.solved).toBe(true);
      expect(result.solvingSteps).toBeDefined();
      
      const techniques = result.solvingSteps!.map(step => step.technique);
      expect(techniques).toContain('naked-single');
      expect(techniques.length).toBeGreaterThan(0);
    });

    test('should detect multiple solutions', () => {
      const multipleSolutionSudoku = Array(9).fill(null).map(() => Array(9).fill(0));
      // Very minimal clues that might lead to multiple solutions
      multipleSolutionSudoku[0][0] = 1;
      
      const result = solver.findAllSolutions(multipleSolutionSudoku, 2);
      
      expect(result.solutionCount).toBeGreaterThanOrEqual(1);
      if (result.solutionCount > 1) {
        expect(result.solutions.length).toBe(2); // Limited to 2
        expect(result.hasMultipleSolutions).toBe(true);
      }
    });

    test('should verify solution uniqueness', () => {
      const result = solver.solve(easySudoku);
      
      expect(result.isUnique).toBe(true);
      expect(result.uniquenessVerified).toBe(true);
    });
  });

  describe('Sudoku generation', () => {
    test('should generate valid Sudoku puzzle', () => {
      const generated = solver.generatePuzzle(DifficultyLevel.EASY);
      
      expect(generated.puzzle).toBeDefined();
      expect(generated.solution).toBeDefined();
      expect(generated.difficulty).toBe(DifficultyLevel.EASY);
      expect(generated.clueCount).toBeGreaterThan(0);
      expect(generated.isUnique).toBe(true);
      
      // Verify puzzle is solvable
      const solveResult = solver.solve(generated.puzzle);
      expect(solveResult.solved).toBe(true);
      expect(solveResult.solution).toEqual(generated.solution);
    });

    test('should generate puzzles of different difficulties', () => {
      const easy = solver.generatePuzzle(DifficultyLevel.EASY);
      const hard = solver.generatePuzzle(DifficultyLevel.HARD);
      
      expect(easy.clueCount).toBeGreaterThan(hard.clueCount);
      expect(easy.difficulty).toBe(DifficultyLevel.EASY);
      expect(hard.difficulty).toBe(DifficultyLevel.HARD);
    });

    test('should generate minimal Sudoku', () => {
      const minimal = solver.generateMinimalPuzzle();
      
      expect(minimal.isMinimal).toBe(true);
      expect(minimal.clueCount).toBeLessThanOrEqual(30); // Typical minimal Sudoku has ~17-30 clues
      
      // Verify removing any clue makes it unsolvable or non-unique
      expect(minimal.minimalityVerified).toBe(true);
    });
  });

  describe('Step-by-step solving', () => {
    test('should provide solving hints', () => {
      const hint = solver.getHint(easySudoku);
      
      expect(hint.cell).toBeDefined();
      expect(hint.value).toBeGreaterThan(0);
      expect(hint.value).toBeLessThanOrEqual(9);
      expect(hint.technique).toBeDefined();
      expect(hint.explanation).toBeDefined();
    });

    test('should solve step by step', () => {
      const steps: any[] = [];
      const stepCallback = (step: any) => {
        steps.push(step);
      };
      
      solver.solveStepByStep(easySudoku, stepCallback);
      
      expect(steps.length).toBeGreaterThan(0);
      steps.forEach(step => {
        expect(step.row).toBeGreaterThanOrEqual(0);
        expect(step.col).toBeGreaterThanOrEqual(0);
        expect(step.value).toBeGreaterThan(0);
        expect(step.technique).toBeDefined();
      });
    });

    test('should explain solution path', () => {
      const result = solver.solve(easySudoku, SolvingAlgorithm.CONSTRAINT_PROPAGATION);
      const explanation = solver.explainSolution(result);
      
      expect(explanation.steps.length).toBeGreaterThan(0);
      expect(explanation.techniquesUsed.length).toBeGreaterThan(0);
      expect(explanation.difficulty).toBeDefined();
      expect(explanation.summary).toBeDefined();
    });
  });

  describe('Performance and optimization', () => {
    test('should track performance metrics', () => {
      const result = solver.solve(easySudoku);
      
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.backtrackCount).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.constraintChecks).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.cellsFilled).toBeGreaterThan(0);
    });

    test('should solve large Sudoku efficiently', () => {
      const large25x25 = Array(25).fill(null).map(() => Array(25).fill(0));
      // Add minimal clues
      for (let i = 0; i < 25; i++) {
        large25x25[i][i] = (i % 25) + 1;
      }
      
      const startTime = Date.now();
      const result = solver.solve(large25x25);
      const endTime = Date.now();
      
      expect(result.solved).toBe(true);
      expect(endTime - startTime).toBeLessThan(10000); // Should complete within 10 seconds
    });

    test('should compare algorithm performance', () => {
      const comparison = solver.compareAlgorithms(easySudoku);
      
      expect(comparison.algorithms.size).toBeGreaterThan(1);
      
      comparison.algorithms.forEach((metrics, algorithm) => {
        expect(metrics.executionTime).toBeGreaterThanOrEqual(0);
        expect(metrics.solved).toBe(true);
      });
      
      expect(comparison.fastestAlgorithm).toBeDefined();
      expect(comparison.mostEfficientAlgorithm).toBeDefined();
    });
  });

  describe('Utility functions', () => {
    test('should generate test Sudoku correctly', () => {
      const testSudoku = generateSudoku(DifficultyLevel.MEDIUM, 9);
      
      expect(testSudoku.length).toBe(9);
      expect(testSudoku[0].length).toBe(9);
      
      // Should have some filled cells
      let filledCells = 0;
      testSudoku.forEach(row => {
        row.forEach(cell => {
          if (cell !== 0) filledCells++;
        });
      });
      expect(filledCells).toBeGreaterThan(0);
    });

    test('should validate Sudoku correctly', () => {
      const validSudoku = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
      ];
      
      const invalidSudoku = [
        [1,1,0,0,0,0,0,0,0], // Two 1s in same row
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ];
      
      expect(validateSudoku(validSudoku)).toBe(true);
      expect(validateSudoku(invalidSudoku)).toBe(false);
    });

    test('should handle partial Sudoku validation', () => {
      const partialSudoku = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
      ];
      
      expect(validateSudoku(partialSudoku, true)).toBe(true); // Allow partial
      expect(validateSudoku(partialSudoku, false)).toBe(false); // Require complete
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle invalid grid dimensions', () => {
      const invalidGrid = Array(8).fill(null).map(() => Array(8).fill(0)); // 8x8 is not valid
      
      expect(() => solver.solve(invalidGrid)).toThrow();
    });

    test('should handle non-square grids', () => {
      const nonSquareGrid = Array(9).fill(null).map(() => Array(8).fill(0)); // 9x8
      
      expect(() => solver.solve(nonSquareGrid)).toThrow();
    });

    test('should handle invalid cell values', () => {
      const invalidValueGrid = Array(9).fill(null).map(() => Array(9).fill(0));
      invalidValueGrid[0][0] = 10; // Invalid value
      
      expect(() => solver.solve(invalidValueGrid)).toThrow();
    });

    test('should reset solver state', () => {
      solver.solve(easySudoku);
      solver.reset();
      
      const result = solver.solve(easySudoku);
      expect(result.solved).toBe(true);
    });

    test('should get solver configuration', () => {
      const config = solver.getConfiguration();
      
      expect(config.algorithm).toBeDefined();
      expect(config.useAdvancedTechniques).toBeDefined();
      expect(config.maxBacktracks).toBeGreaterThan(0);
      expect(config.timeoutMs).toBeGreaterThan(0);
    });

    test('should update solver configuration', () => {
      solver.setConfiguration({
        algorithm: SolvingAlgorithm.HYBRID,
        useAdvancedTechniques: true,
        maxBacktracks: 100000,
        timeoutMs: 30000
      });
      
      const config = solver.getConfiguration();
      expect(config.algorithm).toBe(SolvingAlgorithm.HYBRID);
      expect(config.useAdvancedTechniques).toBe(true);
      expect(config.maxBacktracks).toBe(100000);
      expect(config.timeoutMs).toBe(30000);
    });
  });
});
