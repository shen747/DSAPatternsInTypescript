/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  SpatialAnalyzer, 
  DistanceMetric, 
  SpatialAlgorithm,
  Point,
  BoundingBox,
  batchSpatialAnalysis,
  kClosestOptimized 
} from './prob-02';

describe('Top-K Elements Pattern - Problem 2: K Closest Points to Origin with Advanced Queries', () => {
  describe('SpatialAnalyzer', () => {
    test('should find k closest points using max-heap', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest(SpatialAlgorithm.MAX_HEAP);
      
      expect(result.closestPoints).toHaveLength(2);
      expect(result.distances).toHaveLength(2);
      expect(result.algorithm).toBe('max-heap');
      expect(result.distanceMetric).toBe('euclidean');
      expect(result.statistics.totalPoints).toBe(3);
    });

    test('should find k closest points using quickselect', () => {
      const points: Point[] = [[3,4],[1,1],[2,2],[5,5]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest(SpatialAlgorithm.QUICKSELECT);
      
      expect(result.closestPoints).toHaveLength(2);
      expect(result.algorithm).toBe('quickselect');
      
      // Verify distances are sorted
      for (let i = 1; i < result.distances.length; i++) {
        expect(result.distances[i]).toBeGreaterThanOrEqual(result.distances[i-1]);
      }
    });

    test('should find k closest points using sorting', () => {
      const points: Point[] = [[1,1],[2,2],[3,3],[4,4]];
      const analyzer = new SpatialAnalyzer(points, 3);
      const result = analyzer.kClosest(SpatialAlgorithm.SORTING);
      
      expect(result.closestPoints).toHaveLength(3);
      expect(result.algorithm).toBe('sorting');
    });

    test('should handle different distance metrics', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      
      // Euclidean distance
      const euclideanAnalyzer = new SpatialAnalyzer(points, 2, DistanceMetric.EUCLIDEAN);
      const euclideanResult = euclideanAnalyzer.kClosest();
      expect(euclideanResult.distanceMetric).toBe('euclidean');
      
      // Manhattan distance
      const manhattanAnalyzer = new SpatialAnalyzer(points, 2, DistanceMetric.MANHATTAN);
      const manhattanResult = manhattanAnalyzer.kClosest();
      expect(manhattanResult.distanceMetric).toBe('manhattan');
      
      // Chebyshev distance
      const chebyshevAnalyzer = new SpatialAnalyzer(points, 2, DistanceMetric.CHEBYSHEV);
      const chebyshevResult = chebyshevAnalyzer.kClosest();
      expect(chebyshevResult.distanceMetric).toBe('chebyshev');
    });

    test('should handle custom target point', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2, DistanceMetric.EUCLIDEAN, [2,2]);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints[0]).toEqual([2,2]); // Closest to itself
      expect(result.distances[0]).toBe(0);
    });

    test('should calculate statistics correctly', () => {
      const points: Point[] = [[1,1],[2,2],[3,3],[4,4]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest();
      
      expect(result.statistics.totalPoints).toBe(4);
      expect(result.statistics.minDistance).toBeGreaterThanOrEqual(0);
      expect(result.statistics.maxDistance).toBeGreaterThan(result.statistics.minDistance);
      expect(result.statistics.averageDistance).toBeGreaterThan(0);
      expect(result.statistics.standardDeviation).toBeGreaterThanOrEqual(0);
    });

    test('should handle k larger than points array', () => {
      const points: Point[] = [[1,1],[2,2]];
      const analyzer = new SpatialAnalyzer(points, 5);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints).toHaveLength(2); // Only 2 points available
    });

    test('should handle single point', () => {
      const points: Point[] = [[3,4]];
      const analyzer = new SpatialAnalyzer(points, 1);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints).toEqual([[3,4]]);
      expect(result.distances).toEqual([5]); // Distance from origin
    });

    test('should handle empty points array', () => {
      const points: Point[] = [];
      const analyzer = new SpatialAnalyzer(points, 1);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints).toEqual([]);
      expect(result.distances).toEqual([]);
      expect(result.statistics.totalPoints).toBe(0);
    });
  });

  describe('Dynamic updates', () => {
    test('should add point and update k closest', () => {
      const points: Point[] = [[3,4],[5,5]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const newKClosest = analyzer.addPoint([1,1]);
      expect(newKClosest).toHaveLength(2);
      expect(newKClosest).toContainEqual([1,1]); // Should be closest now
    });

    test('should remove point and update k closest', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const newKClosest = analyzer.removePoint([1,1]);
      expect(newKClosest).toHaveLength(2);
      expect(newKClosest).not.toContainEqual([1,1]);
    });

    test('should handle removing non-existent point', () => {
      const points: Point[] = [[1,1],[2,2]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const newKClosest = analyzer.removePoint([5,5]);
      expect(newKClosest).toHaveLength(2); // No change
    });

    test('should handle multiple updates', () => {
      const points: Point[] = [[3,4]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      analyzer.addPoint([1,1]);
      analyzer.addPoint([2,2]);
      const finalKClosest = analyzer.removePoint([3,4]);
      
      expect(finalKClosest).toHaveLength(2);
      expect(finalKClosest).toContainEqual([1,1]);
      expect(finalKClosest).toContainEqual([2,2]);
    });
  });

  describe('Bounding box queries', () => {
    test('should find k closest within bounding box', () => {
      const points: Point[] = [[1,1],[2,2],[3,3],[4,4],[5,5]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const boundingBox: BoundingBox = { minX: 0, maxX: 3, minY: 0, maxY: 3 };
      const result = analyzer.kClosestInBoundingBox(boundingBox);
      
      expect(result.closestPoints).toHaveLength(2);
      result.closestPoints.forEach(point => {
        expect(point[0]).toBeGreaterThanOrEqual(0);
        expect(point[0]).toBeLessThanOrEqual(3);
        expect(point[1]).toBeGreaterThanOrEqual(0);
        expect(point[1]).toBeLessThanOrEqual(3);
      });
    });

    test('should handle empty bounding box', () => {
      const points: Point[] = [[1,1],[2,2]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const boundingBox: BoundingBox = { minX: 5, maxX: 6, minY: 5, maxY: 6 };
      const result = analyzer.kClosestInBoundingBox(boundingBox);
      
      expect(result.closestPoints).toHaveLength(0);
    });
  });

  describe('Target point updates', () => {
    test('should update target and recalculate', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const result = analyzer.updateTarget([3,3]);
      expect(result.closestPoints[0]).toEqual([3,3]); // Closest to itself
      expect(result.distances[0]).toBe(0);
    });

    test('should handle negative target coordinates', () => {
      const points: Point[] = [[1,1],[2,2],[-1,-1]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const result = analyzer.updateTarget([-2,-2]);
      expect(result.closestPoints[0]).toEqual([-1,-1]); // Closest to [-2,-2]
    });
  });

  describe('Distance-based queries', () => {
    test('should find points within distance', () => {
      const points: Point[] = [[1,1],[2,2],[3,3],[4,4]];
      const analyzer = new SpatialAnalyzer(points, 4);
      
      const pointsWithinDistance = analyzer.pointsWithinDistance(3);
      
      pointsWithinDistance.forEach(point => {
        const distance = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
        expect(distance).toBeLessThanOrEqual(3);
      });
    });

    test('should handle no points within distance', () => {
      const points: Point[] = [[10,10],[20,20]];
      const analyzer = new SpatialAnalyzer(points, 2);
      
      const pointsWithinDistance = analyzer.pointsWithinDistance(1);
      expect(pointsWithinDistance).toHaveLength(0);
    });
  });

  describe('Clustering analysis', () => {
    test('should perform clustering analysis', () => {
      const points: Point[] = [[1,1],[1,2],[2,1],[10,10],[10,11],[11,10]];
      const analyzer = new SpatialAnalyzer(points, 6);
      
      const clusters = analyzer.clusterAnalysis(2);
      
      expect(clusters).toHaveLength(2);
      clusters.forEach(cluster => {
        expect(cluster.center).toBeDefined();
        expect(cluster.points.length).toBeGreaterThan(0);
        expect(cluster.avgDistance).toBeGreaterThanOrEqual(0);
      });
    });

    test('should handle single cluster', () => {
      const points: Point[] = [[1,1],[1,2],[2,1]];
      const analyzer = new SpatialAnalyzer(points, 3);
      
      const clusters = analyzer.clusterAnalysis(1);
      
      expect(clusters).toHaveLength(1);
      expect(clusters[0].points).toHaveLength(3);
    });
  });

  describe('Spatial statistics', () => {
    test('should calculate spatial statistics', () => {
      const points: Point[] = [[1,1],[2,2],[3,3],[4,4]];
      const analyzer = new SpatialAnalyzer(points, 4);
      
      const stats = analyzer.getSpatialStatistics();
      
      expect(stats.centroid).toEqual([2.5, 2.5]);
      expect(stats.boundingBox.minX).toBe(1);
      expect(stats.boundingBox.maxX).toBe(4);
      expect(stats.boundingBox.minY).toBe(1);
      expect(stats.boundingBox.maxY).toBe(4);
      expect(stats.averageDistanceFromCentroid).toBeGreaterThan(0);
      expect(stats.density).toBeGreaterThan(0);
    });

    test('should handle single point statistics', () => {
      const points: Point[] = [[5,5]];
      const analyzer = new SpatialAnalyzer(points, 1);
      
      const stats = analyzer.getSpatialStatistics();
      
      expect(stats.centroid).toEqual([5, 5]);
      expect(stats.boundingBox.minX).toBe(5);
      expect(stats.boundingBox.maxX).toBe(5);
      expect(stats.averageDistanceFromCentroid).toBe(0);
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large point sets efficiently', () => {
      const largePoints: Point[] = Array.from({ length: 1000 }, (_, i) => [i % 100, Math.floor(i / 100)]);
      const analyzer = new SpatialAnalyzer(largePoints, 10);
      
      const startTime = Date.now();
      const result = analyzer.kClosest();
      const endTime = Date.now();
      
      expect(result.closestPoints).toHaveLength(10);
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should track performance metrics', () => {
      const points: Point[] = [[1,1],[2,2],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest();
      
      expect(result.performanceMetrics.comparisons).toBeGreaterThan(0);
      expect(result.performanceMetrics.heapOperations).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
    });

    test('should handle points with same coordinates', () => {
      const points: Point[] = [[1,1],[1,1],[2,2]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints).toHaveLength(2);
    });

    test('should handle negative coordinates', () => {
      const points: Point[] = [[-1,-1],[-2,-2],[1,1]];
      const analyzer = new SpatialAnalyzer(points, 2);
      const result = analyzer.kClosest();
      
      expect(result.closestPoints).toHaveLength(2);
      expect(result.distances.every(d => d >= 0)).toBe(true);
    });

    test('should reset correctly', () => {
      const points: Point[] = [[1,1],[2,2]];
      const analyzer = new SpatialAnalyzer(points, 1);
      
      analyzer.reset([[3,3],[4,4]], 1, [1,1]);
      const newPoints = analyzer.getPoints();
      
      expect(newPoints).toEqual([[3,3],[4,4]]);
    });
  });

  describe('Utility functions', () => {
    test('should batch analyze multiple point sets', () => {
      const pointSets: Point[][] = [
        [[1,1],[2,2]],
        [[3,3],[4,4]],
        [[5,5],[6,6]]
      ];
      
      const results = batchSpatialAnalysis(pointSets, 1);
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.closestPoints).toHaveLength(1);
        expect(result.distances).toHaveLength(1);
      });
    });

    test('should provide optimized k closest', () => {
      const points: Point[] = [[3,4],[1,1],[2,2],[5,5]];
      const result = kClosestOptimized(points, 2);
      
      expect(result).toHaveLength(2);
      
      // Verify they are actually the closest
      const distances = result.map(p => Math.sqrt(p[0]*p[0] + p[1]*p[1]));
      const allDistances = points.map(p => Math.sqrt(p[0]*p[0] + p[1]*p[1])).sort((a,b) => a-b);
      
      expect(distances.sort()).toEqual(allDistances.slice(0, 2));
    });
  });

  describe('Distance metric variations', () => {
    test('should calculate Manhattan distance correctly', () => {
      const points: Point[] = [[1,1],[2,2],[3,0]];
      const analyzer = new SpatialAnalyzer(points, 2, DistanceMetric.MANHATTAN);
      const result = analyzer.kClosest();
      
      // Manhattan distance from origin: [1,1]=2, [2,2]=4, [3,0]=3
      expect(result.closestPoints[0]).toEqual([1,1]);
      expect(result.distances[0]).toBe(2);
    });

    test('should calculate Chebyshev distance correctly', () => {
      const points: Point[] = [[1,2],[2,1],[3,3]];
      const analyzer = new SpatialAnalyzer(points, 2, DistanceMetric.CHEBYSHEV);
      const result = analyzer.kClosest();
      
      // Chebyshev distance from origin: [1,2]=2, [2,1]=2, [3,3]=3
      expect(result.distances[0]).toBe(2);
      expect(result.distances[1]).toBe(2);
    });
  });
});
