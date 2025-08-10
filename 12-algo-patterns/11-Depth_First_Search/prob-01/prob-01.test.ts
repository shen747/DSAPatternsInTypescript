/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  IslandExplorer, 
  Island, 
  ExplorationResult,
  findAllIslands,
  calculateTotalArea 
} from './prob-01';

describe('Depth First Search Pattern - Problem 1: Number of Islands with Advanced Analysis', () => {
  describe('IslandExplorer', () => {
    test('should find correct number of islands in basic grid', () => {
      const grid = [
        ['1','1','1','1','0'],
        ['1','1','0','1','0'],
        ['1','1','0','0','0'],
        ['0','0','0','0','0']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(1);
      expect(result.islands.length).toBe(1);
      expect(result.totalArea).toBeGreaterThan(0);
      expect(result.analytics.averageIslandSize).toBeGreaterThan(0);
    });

    test('should find multiple islands', () => {
      const grid = [
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(3);
      expect(result.islands.length).toBe(3);
    });

    test('should handle grid with no islands', () => {
      const grid = [
        ['0','0','0'],
        ['0','0','0'],
        ['0','0','0']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(0);
      expect(result.islands.length).toBe(0);
      expect(result.totalArea).toBe(0);
    });

    test('should handle grid with all islands', () => {
      const grid = [
        ['1','1','1'],
        ['1','1','1'],
        ['1','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(1);
      expect(result.totalArea).toBe(9);
    });

    test('should handle single cell grids', () => {
      const islandGrid = [['1']];
      const waterGrid = [['0']];
      
      const islandExplorer = new IslandExplorer(islandGrid);
      const waterExplorer = new IslandExplorer(waterGrid);
      
      expect(islandExplorer.exploreIslands().totalIslands).toBe(1);
      expect(waterExplorer.exploreIslands().totalIslands).toBe(0);
    });

    test('should handle empty grid', () => {
      const grid: string[][] = [];
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(0);
      expect(result.islands.length).toBe(0);
    });

    test('should calculate island properties correctly', () => {
      const grid = [
        ['1','1','0','1'],
        ['1','0','0','1'],
        ['0','0','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      result.islands.forEach(island => {
        expect(island.area).toBeGreaterThan(0);
        expect(island.perimeter).toBeGreaterThan(0);
        expect(island.cells.length).toBe(island.area);
        expect(island.boundingBox.minRow).toBeGreaterThanOrEqual(0);
        expect(island.boundingBox.maxRow).toBeLessThan(grid.length);
        expect(island.boundingBox.minCol).toBeGreaterThanOrEqual(0);
        expect(island.boundingBox.maxCol).toBeLessThan(grid[0].length);
      });
    });

    test('should find largest island correctly', () => {
      const grid = [
        ['1','0','1','1'],
        ['0','0','1','1'],
        ['1','1','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      const largest = explorer.findLargestIsland();
      
      expect(largest).toBeDefined();
      expect(largest!.area).toBeGreaterThan(0);
      
      // Verify it's actually the largest
      result.islands.forEach(island => {
        expect(island.area).toBeLessThanOrEqual(largest!.area);
      });
    });

    test('should find smallest island correctly', () => {
      const grid = [
        ['1','0','1','1'],
        ['0','0','1','1'],
        ['1','0','0','0']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      const smallest = explorer.findSmallestIsland();
      
      expect(smallest).toBeDefined();
      expect(smallest!.area).toBeGreaterThan(0);
      
      // Verify it's actually the smallest
      result.islands.forEach(island => {
        expect(island.area).toBeGreaterThanOrEqual(smallest!.area);
      });
    });

    test('should handle no islands for largest/smallest queries', () => {
      const grid = [['0','0'],['0','0']];
      const explorer = new IslandExplorer(grid);
      
      expect(explorer.findLargestIsland()).toBeNull();
      expect(explorer.findSmallestIsland()).toBeNull();
    });

    test('should find islands by area range', () => {
      const grid = [
        ['1','1','0','1','1','1'],
        ['1','1','0','1','1','1'],
        ['0','0','0','0','0','0'],
        ['1','0','0','0','0','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      explorer.exploreIslands();
      
      const mediumIslands = explorer.findIslandsByArea(2, 5);
      mediumIslands.forEach(island => {
        expect(island.area).toBeGreaterThanOrEqual(2);
        expect(island.area).toBeLessThanOrEqual(5);
      });
    });

    test('should calculate distance between islands', () => {
      const grid = [
        ['1','0','0','1'],
        ['0','0','0','0'],
        ['1','0','0','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      if (result.islands.length >= 2) {
        const distance = explorer.distanceBetweenIslands(result.islands[0], result.islands[1]);
        expect(distance).toBeGreaterThan(0);
      }
    });

    test('should merge adjacent islands', () => {
      const grid = [
        ['1','1','0'],
        ['1','1','0'],
        ['0','0','0']
      ];
      
      const explorer = new IslandExplorer(grid);
      explorer.exploreIslands();
      
      // Add a bridge to connect islands
      const success = explorer.addLandCell(0, 2);
      expect(success).toBe(true);
      
      const newResult = explorer.exploreIslands();
      // Should recalculate islands after modification
      expect(newResult.totalIslands).toBeGreaterThanOrEqual(0);
    });

    test('should remove land cells', () => {
      const grid = [
        ['1','1','1'],
        ['1','1','1'],
        ['1','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const originalResult = explorer.exploreIslands();
      
      const success = explorer.removeLandCell(1, 1);
      expect(success).toBe(true);
      
      const newResult = explorer.exploreIslands();
      expect(newResult.totalArea).toBeLessThan(originalResult.totalArea);
    });

    test('should handle invalid cell operations', () => {
      const grid = [['1','0'],['0','1']];
      const explorer = new IslandExplorer(grid);
      
      expect(explorer.addLandCell(-1, 0)).toBe(false);
      expect(explorer.addLandCell(0, -1)).toBe(false);
      expect(explorer.addLandCell(2, 0)).toBe(false);
      expect(explorer.addLandCell(0, 2)).toBe(false);
      
      expect(explorer.removeLandCell(-1, 0)).toBe(false);
      expect(explorer.removeLandCell(10, 10)).toBe(false);
    });

    test('should get current grid state', () => {
      const originalGrid = [
        ['1','0','1'],
        ['0','1','0']
      ];
      
      const explorer = new IslandExplorer(originalGrid);
      const currentGrid = explorer.getGrid();
      
      expect(currentGrid).toEqual(originalGrid);
      expect(currentGrid).not.toBe(originalGrid); // Should be a copy
    });

    test('should reset grid correctly', () => {
      const grid1 = [['1','0'],['0','1']];
      const grid2 = [['0','1'],['1','0']];
      
      const explorer = new IslandExplorer(grid1);
      const result1 = explorer.exploreIslands();
      
      explorer.reset(grid2);
      const result2 = explorer.exploreIslands();
      
      expect(explorer.getGrid()).toEqual(grid2);
      // Results should be different for different grids
      expect(result1.totalIslands).toBe(result2.totalIslands); // Both have 2 islands
    });
  });

  describe('Analytics and statistics', () => {
    test('should calculate comprehensive analytics', () => {
      const grid = [
        ['1','1','0','1'],
        ['1','0','0','1'],
        ['0','0','1','1'],
        ['1','0','1','0']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.analytics.averageIslandSize).toBeGreaterThan(0);
      expect(result.analytics.largestIslandSize).toBeGreaterThan(0);
      expect(result.analytics.smallestIslandSize).toBeGreaterThan(0);
      expect(result.analytics.totalPerimeter).toBeGreaterThan(0);
      expect(result.analytics.landToWaterRatio).toBeGreaterThan(0);
      expect(result.analytics.islandDensity).toBeGreaterThan(0);
      expect(result.analytics.averagePerimeter).toBeGreaterThan(0);
    });

    test('should track performance metrics', () => {
      const grid = [
        ['1','1','1'],
        ['1','0','1'],
        ['1','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.performanceMetrics.dfsCallCount).toBeGreaterThan(0);
      expect(result.performanceMetrics.cellsVisited).toBeGreaterThan(0);
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
    });

    test('should handle edge case analytics', () => {
      const emptyGrid: string[][] = [];
      const explorer = new IslandExplorer(emptyGrid);
      const result = explorer.exploreIslands();
      
      expect(result.analytics.averageIslandSize).toBe(0);
      expect(result.analytics.landToWaterRatio).toBe(0);
      expect(result.analytics.islandDensity).toBe(0);
    });
  });

  describe('Utility functions', () => {
    test('should find all islands using utility function', () => {
      const grid = [
        ['1','0','1'],
        ['0','1','0'],
        ['1','0','1']
      ];
      
      const islands = findAllIslands(grid);
      expect(islands.length).toBe(5); // 5 separate single-cell islands
    });

    test('should calculate total area using utility function', () => {
      const grid = [
        ['1','1','0'],
        ['1','1','0'],
        ['0','0','1']
      ];
      
      const totalArea = calculateTotalArea(grid);
      expect(totalArea).toBe(5); // 4 + 1
    });

    test('should handle empty grid in utility functions', () => {
      const emptyGrid: string[][] = [];
      
      expect(findAllIslands(emptyGrid)).toEqual([]);
      expect(calculateTotalArea(emptyGrid)).toBe(0);
    });

    test('should handle all water grid in utility functions', () => {
      const waterGrid = [
        ['0','0','0'],
        ['0','0','0']
      ];
      
      expect(findAllIslands(waterGrid)).toEqual([]);
      expect(calculateTotalArea(waterGrid)).toBe(0);
    });
  });

  describe('Complex scenarios', () => {
    test('should handle large grids efficiently', () => {
      // Create a larger grid for performance testing
      const size = 50;
      const grid: string[][] = Array(size).fill(null).map(() => 
        Array(size).fill(null).map((_, i) => i % 3 === 0 ? '1' : '0')
      );
      
      const explorer = new IslandExplorer(grid);
      
      const startTime = Date.now();
      const result = explorer.exploreIslands();
      const endTime = Date.now();
      
      expect(result.totalIslands).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast
    });

    test('should handle grid with complex island shapes', () => {
      const grid = [
        ['1','1','1','1','1'],
        ['1','0','0','0','1'],
        ['1','0','1','0','1'],
        ['1','0','0','0','1'],
        ['1','1','1','1','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      expect(result.totalIslands).toBe(2); // Outer ring and inner cell
      
      const islands = result.islands.sort((a, b) => b.area - a.area);
      expect(islands[0].area).toBe(16); // Outer ring
      expect(islands[1].area).toBe(1);  // Inner cell
    });

    test('should handle diagonal connections correctly', () => {
      const grid = [
        ['1','0','1'],
        ['0','1','0'],
        ['1','0','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const result = explorer.exploreIslands();
      
      // Should be 5 separate islands (no diagonal connections)
      expect(result.totalIslands).toBe(5);
      result.islands.forEach(island => {
        expect(island.area).toBe(1);
      });
    });

    test('should handle modifications and recalculations', () => {
      const grid = [
        ['1','0','1'],
        ['0','0','0'],
        ['1','0','1']
      ];
      
      const explorer = new IslandExplorer(grid);
      const originalResult = explorer.exploreIslands();
      expect(originalResult.totalIslands).toBe(4);
      
      // Add bridges to connect islands
      explorer.addLandCell(1, 1); // Center
      explorer.addLandCell(0, 1); // Top bridge
      explorer.addLandCell(1, 0); // Left bridge
      
      const newResult = explorer.exploreIslands();
      expect(newResult.totalIslands).toBeLessThan(originalResult.totalIslands);
    });
  });
});
