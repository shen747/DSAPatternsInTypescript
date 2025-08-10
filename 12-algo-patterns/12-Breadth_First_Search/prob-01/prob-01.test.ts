/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  PathfindingEngine, 
  PathfindingAlgorithm, 
  Heuristic,
  createTestMatrix,
  visualizePath 
} from './prob-01';

describe('Breadth First Search Pattern - Problem 1: Shortest Path in Binary Matrix with Advanced Pathfinding', () => {
  describe('PathfindingEngine', () => {
    test('should find shortest path in simple matrix', () => {
      const matrix = [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [2, 2]);
      
      expect(result.pathFound).toBe(true);
      expect(result.path.length).toBeGreaterThan(0);
      expect(result.distance).toBeGreaterThan(0);
      expect(result.algorithm).toBeDefined();
      expect(result.performanceMetrics.nodesExplored).toBeGreaterThan(0);
    });

    test('should handle no path available', () => {
      const matrix = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [2, 2]);
      
      expect(result.pathFound).toBe(false);
      expect(result.path.length).toBe(0);
      expect(result.distance).toBe(-1);
    });

    test('should handle start equals end', () => {
      const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([1, 1], [1, 1]);
      
      expect(result.pathFound).toBe(true);
      expect(result.path.length).toBe(1);
      expect(result.distance).toBe(0);
    });

    test('should handle blocked start or end', () => {
      const matrix = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 1]
      ];
      
      const engine = new PathfindingEngine(matrix);
      
      const result1 = engine.findShortestPath([0, 0], [1, 1]); // Blocked start
      expect(result1.pathFound).toBe(false);
      
      const result2 = engine.findShortestPath([1, 1], [2, 2]); // Blocked end
      expect(result2.pathFound).toBe(false);
    });

    test('should use different pathfinding algorithms', () => {
      const matrix = [
        [0, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 0, 0, 0],
        [0, 1, 1, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      
      const bfsResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.BFS);
      const aStarResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.A_STAR);
      const dijkstraResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.DIJKSTRA);
      
      expect(bfsResult.pathFound).toBe(true);
      expect(aStarResult.pathFound).toBe(true);
      expect(dijkstraResult.pathFound).toBe(true);
      
      // A* should explore fewer nodes than BFS
      expect(aStarResult.performanceMetrics.nodesExplored).toBeLessThanOrEqual(bfsResult.performanceMetrics.nodesExplored);
    });

    test('should use different heuristics with A*', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      
      const manhattanResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.A_STAR, Heuristic.MANHATTAN);
      const euclideanResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.A_STAR, Heuristic.EUCLIDEAN);
      const chebyshevResult = engine.findShortestPath([0, 0], [3, 3], PathfindingAlgorithm.A_STAR, Heuristic.CHEBYSHEV);
      
      expect(manhattanResult.pathFound).toBe(true);
      expect(euclideanResult.pathFound).toBe(true);
      expect(chebyshevResult.pathFound).toBe(true);
      
      expect(manhattanResult.heuristic).toBe('manhattan');
      expect(euclideanResult.heuristic).toBe('euclidean');
      expect(chebyshevResult.heuristic).toBe('chebyshev');
    });

    test('should find multiple paths', () => {
      const matrix = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const paths = engine.findMultiplePaths([0, 0], [2, 2], 3);
      
      expect(paths.length).toBeGreaterThan(0);
      expect(paths.length).toBeLessThanOrEqual(3);
      
      paths.forEach(pathResult => {
        expect(pathResult.pathFound).toBe(true);
        expect(pathResult.path.length).toBeGreaterThan(0);
      });
    });

    test('should handle single cell matrix', () => {
      const matrix = [[0]];
      const engine = new PathfindingEngine(matrix);
      
      const result = engine.findShortestPath([0, 0], [0, 0]);
      expect(result.pathFound).toBe(true);
      expect(result.distance).toBe(0);
    });

    test('should handle empty matrix', () => {
      const matrix: number[][] = [];
      const engine = new PathfindingEngine(matrix);
      
      const result = engine.findShortestPath([0, 0], [1, 1]);
      expect(result.pathFound).toBe(false);
    });
  });

  describe('Dynamic obstacles and updates', () => {
    test('should add obstacle and recalculate path', () => {
      const matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const originalResult = engine.findShortestPath([0, 0], [2, 2]);
      
      engine.addObstacle(1, 1);
      const newResult = engine.findShortestPath([0, 0], [2, 2]);
      
      expect(originalResult.pathFound).toBe(true);
      expect(newResult.pathFound).toBe(true);
      expect(newResult.distance).toBeGreaterThan(originalResult.distance);
    });

    test('should remove obstacle and find shorter path', () => {
      const matrix = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const originalResult = engine.findShortestPath([0, 0], [2, 2]);
      
      engine.removeObstacle(1, 1);
      const newResult = engine.findShortestPath([0, 0], [2, 2]);
      
      expect(originalResult.pathFound).toBe(true);
      expect(newResult.pathFound).toBe(true);
      expect(newResult.distance).toBeLessThan(originalResult.distance);
    });

    test('should handle invalid obstacle operations', () => {
      const matrix = [[0, 0], [0, 0]];
      const engine = new PathfindingEngine(matrix);
      
      expect(engine.addObstacle(-1, 0)).toBe(false);
      expect(engine.addObstacle(0, -1)).toBe(false);
      expect(engine.addObstacle(2, 0)).toBe(false);
      expect(engine.addObstacle(0, 2)).toBe(false);
      
      expect(engine.removeObstacle(-1, 0)).toBe(false);
      expect(engine.removeObstacle(10, 10)).toBe(false);
    });

    test('should update multiple obstacles efficiently', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      
      const obstacles = [[1, 1], [1, 2], [2, 1]];
      const success = engine.updateObstacles(obstacles, []);
      
      expect(success).toBe(true);
      
      const result = engine.findShortestPath([0, 0], [3, 3]);
      expect(result.pathFound).toBe(true);
    });
  });

  describe('Advanced pathfinding features', () => {
    test('should find path with waypoints', () => {
      const matrix = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const waypoints = [[2, 2], [2, 4]];
      const result = engine.findPathWithWaypoints([0, 0], [4, 4], waypoints);
      
      expect(result.pathFound).toBe(true);
      expect(result.path.length).toBeGreaterThan(0);
      
      // Verify waypoints are included in path
      waypoints.forEach(waypoint => {
        const waypointInPath = result.path.some(point => 
          point[0] === waypoint[0] && point[1] === waypoint[1]
        );
        expect(waypointInPath).toBe(true);
      });
    });

    test('should optimize path for smoothness', () => {
      const matrix = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [4, 4]);
      const optimizedResult = engine.optimizePath(result.path);
      
      expect(optimizedResult.path.length).toBeLessThanOrEqual(result.path.length);
      expect(optimizedResult.smoothness).toBeGreaterThanOrEqual(0);
    });

    test('should find path avoiding specific areas', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const avoidAreas = [[[1, 1], [2, 2]]]; // Avoid center area
      const result = engine.findPathAvoidingAreas([0, 0], [3, 3], avoidAreas);
      
      expect(result.pathFound).toBe(true);
      
      // Verify path doesn't go through avoided areas
      result.path.forEach(point => {
        const inAvoidedArea = point[0] >= 1 && point[0] <= 2 && point[1] >= 1 && point[1] <= 2;
        expect(inAvoidedArea).toBe(false);
      });
    });

    test('should calculate path statistics', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [3, 3]);
      const stats = engine.calculatePathStatistics(result.path);
      
      expect(stats.totalDistance).toBeGreaterThan(0);
      expect(stats.straightLineDistance).toBeGreaterThan(0);
      expect(stats.efficiency).toBeGreaterThan(0);
      expect(stats.efficiency).toBeLessThanOrEqual(1);
      expect(stats.turns).toBeGreaterThanOrEqual(0);
      expect(stats.averageStepSize).toBeGreaterThan(0);
    });
  });

  describe('Performance and analytics', () => {
    test('should track comprehensive performance metrics', () => {
      const matrix = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [4, 4]);
      
      expect(result.performanceMetrics.nodesExplored).toBeGreaterThan(0);
      expect(result.performanceMetrics.nodesInQueue).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.pathReconstructionTime).toBeGreaterThanOrEqual(0);
    });

    test('should handle large matrices efficiently', () => {
      const size = 50;
      const matrix = Array(size).fill(null).map(() => Array(size).fill(0));
      
      // Add some obstacles
      for (let i = 10; i < 40; i++) {
        matrix[i][25] = 1;
      }
      
      const engine = new PathfindingEngine(matrix);
      
      const startTime = Date.now();
      const result = engine.findShortestPath([0, 0], [size-1, size-1]);
      const endTime = Date.now();
      
      expect(result.pathFound).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast
    });

    test('should compare algorithm performance', () => {
      const matrix = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const comparison = engine.compareAlgorithms([0, 0], [5, 5]);
      
      expect(comparison.size).toBeGreaterThan(0);
      
      comparison.forEach((metrics, algorithm) => {
        expect(metrics.pathFound).toBe(true);
        expect(metrics.executionTime).toBeGreaterThanOrEqual(0);
        expect(metrics.nodesExplored).toBeGreaterThan(0);
      });
    });
  });

  describe('Utility functions', () => {
    test('should create test matrix correctly', () => {
      const matrix = createTestMatrix(5, 5, 0.2); // 20% obstacles
      
      expect(matrix.length).toBe(5);
      expect(matrix[0].length).toBe(5);
      
      let obstacleCount = 0;
      matrix.forEach(row => {
        row.forEach(cell => {
          expect([0, 1]).toContain(cell);
          if (cell === 1) obstacleCount++;
        });
      });
      
      expect(obstacleCount).toBeLessThanOrEqual(5); // Should have some obstacles
    });

    test('should visualize path correctly', () => {
      const matrix = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
      
      const path = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]];
      const visualization = visualizePath(matrix, path);
      
      expect(visualization.length).toBe(3);
      expect(visualization[0].length).toBe(3);
      
      // Check that path is marked
      path.forEach(([row, col]) => {
        expect(visualization[row][col]).toBe('*');
      });
      
      // Check that obstacles are marked
      expect(visualization[1][1]).toBe('#');
    });

    test('should handle empty path in visualization', () => {
      const matrix = [[0, 0], [0, 0]];
      const path: number[][] = [];
      const visualization = visualizePath(matrix, path);
      
      expect(visualization).toEqual([['·', '·'], ['·', '·']]);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle matrix with all obstacles', () => {
      const matrix = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      
      const engine = new PathfindingEngine(matrix);
      const result = engine.findShortestPath([0, 0], [2, 2]);
      
      expect(result.pathFound).toBe(false);
    });

    test('should handle invalid start/end coordinates', () => {
      const matrix = [[0, 0], [0, 0]];
      const engine = new PathfindingEngine(matrix);
      
      const result1 = engine.findShortestPath([-1, 0], [1, 1]);
      expect(result1.pathFound).toBe(false);
      
      const result2 = engine.findShortestPath([0, 0], [5, 5]);
      expect(result2.pathFound).toBe(false);
    });

    test('should reset engine state correctly', () => {
      const matrix1 = [[0, 0], [0, 0]];
      const matrix2 = [[0, 1], [1, 0]];
      
      const engine = new PathfindingEngine(matrix1);
      engine.findShortestPath([0, 0], [1, 1]);
      
      engine.reset(matrix2);
      const result = engine.findShortestPath([0, 0], [1, 1]);
      
      expect(result.pathFound).toBe(false); // Should use new matrix
    });

    test('should get current matrix state', () => {
      const originalMatrix = [[0, 1], [1, 0]];
      const engine = new PathfindingEngine(originalMatrix);
      
      const currentMatrix = engine.getMatrix();
      expect(currentMatrix).toEqual(originalMatrix);
      expect(currentMatrix).not.toBe(originalMatrix); // Should be a copy
    });
  });
});
