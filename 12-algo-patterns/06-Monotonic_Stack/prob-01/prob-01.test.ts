/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  HistogramAnalyzer, 
  Rectangle, 
  HistogramAnalysis,
  generateVisualizationData,
  largestRectangleAreaOptimized 
} from './prob-01';

describe('Monotonic Stack Pattern - Problem 1: Largest Rectangle in Histogram with Advanced Analysis', () => {
  describe('HistogramAnalyzer', () => {
    test('should find largest rectangle in basic histogram', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5, 6, 2, 3]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(10);
      expect(result.maxRectangle.height).toBe(5);
      expect(result.maxRectangle.width).toBe(2);
      expect(result.metrics.totalRectangles).toBeGreaterThan(0);
      expect(result.stackOperations.length).toBeGreaterThan(0);
    });

    test('should handle single bar histogram', () => {
      const analyzer = new HistogramAnalyzer([5]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(5);
      expect(result.maxRectangle.left).toBe(0);
      expect(result.maxRectangle.right).toBe(0);
      expect(result.maxRectangle.width).toBe(1);
    });

    test('should handle increasing heights', () => {
      const analyzer = new HistogramAnalyzer([1, 2, 3, 4, 5]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(9); // height 3, width 3
      expect(result.metrics.stackPushes).toBe(5);
      expect(result.metrics.stackPops).toBeGreaterThan(0);
    });

    test('should handle decreasing heights', () => {
      const analyzer = new HistogramAnalyzer([5, 4, 3, 2, 1]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(9); // height 3, width 3
      expect(result.metrics.stackPops).toBeGreaterThan(0);
    });

    test('should find rectangles above threshold', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5, 6, 2, 3]);
      const result = analyzer.largestRectangleArea(5); // threshold = 5
      
      expect(result.allLargeRectangles.length).toBeGreaterThan(0);
      result.allLargeRectangles.forEach(rect => {
        expect(rect.area).toBeGreaterThanOrEqual(5);
      });
    });

    test('should return top-k rectangles', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5, 6, 2, 3]);
      const result = analyzer.largestRectangleArea(0, 3); // top 3 rectangles
      
      expect(result.topKRectangles.length).toBeLessThanOrEqual(3);
      // Should be sorted by area descending
      for (let i = 1; i < result.topKRectangles.length; i++) {
        expect(result.topKRectangles[i-1].area).toBeGreaterThanOrEqual(result.topKRectangles[i].area);
      }
    });

    test('should track stack operations correctly', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.stackOperations.length).toBeGreaterThan(0);
      result.stackOperations.forEach(op => {
        expect(['push', 'pop']).toContain(op.operation);
        expect(op.index).toBeGreaterThanOrEqual(0);
        expect(op.height).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(op.stackState)).toBe(true);
      });
    });

    test('should handle empty histogram', () => {
      const analyzer = new HistogramAnalyzer([]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(0);
      expect(result.maxRectangle).toBeNull();
      expect(result.allLargeRectangles).toHaveLength(0);
    });

    test('should handle histogram with zeros', () => {
      const analyzer = new HistogramAnalyzer([0, 2, 0, 3, 0]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBeGreaterThan(0);
      expect(result.metrics.totalRectangles).toBeGreaterThan(0);
    });
  });

  describe('Dynamic histogram updates', () => {
    test('should add bar and recalculate', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5]);
      const originalResult = analyzer.largestRectangleArea();
      
      analyzer.addBar(1, 4); // Add height 4 at index 1
      const newHistogram = analyzer.getHistogram();
      expect(newHistogram).toEqual([2, 4, 1, 5]);
      
      const newResult = analyzer.largestRectangleArea();
      expect(newResult.maxArea).toBeGreaterThanOrEqual(originalResult.maxArea);
    });

    test('should remove bar and recalculate', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5, 6]);
      analyzer.removeBar(1); // Remove bar at index 1
      
      const newHistogram = analyzer.getHistogram();
      expect(newHistogram).toEqual([2, 5, 6]);
      
      const result = analyzer.largestRectangleArea();
      expect(result.maxArea).toBeGreaterThan(0);
    });

    test('should update bar height', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5]);
      analyzer.updateBar(1, 3); // Change height at index 1 from 1 to 3
      
      const newHistogram = analyzer.getHistogram();
      expect(newHistogram).toEqual([2, 3, 5]);
      
      const result = analyzer.largestRectangleArea();
      expect(result.maxArea).toBeGreaterThan(0);
    });

    test('should handle multiple updates', () => {
      const analyzer = new HistogramAnalyzer([1, 2, 3]);
      
      analyzer.addBar(0, 4);
      analyzer.updateBar(2, 5);
      analyzer.removeBar(1);
      
      const finalHistogram = analyzer.getHistogram();
      expect(finalHistogram.length).toBe(3);
      
      const result = analyzer.largestRectangleArea();
      expect(result.maxArea).toBeGreaterThan(0);
    });
  });

  describe('Rectangle filtering and search', () => {
    test('should find rectangles in area range', () => {
      const analyzer = new HistogramAnalyzer([2, 1, 5, 6, 2, 3]);
      analyzer.largestRectangleArea(); // Calculate rectangles
      
      const rectangles = analyzer.findRectanglesInRange(5, 10);
      
      rectangles.forEach(rect => {
        expect(rect.area).toBeGreaterThanOrEqual(5);
        expect(rect.area).toBeLessThanOrEqual(10);
      });
    });

    test('should return empty array for impossible range', () => {
      const analyzer = new HistogramAnalyzer([1, 1, 1]);
      analyzer.largestRectangleArea();
      
      const rectangles = analyzer.findRectanglesInRange(100, 200);
      expect(rectangles).toHaveLength(0);
    });

    test('should get all calculated rectangles', () => {
      const analyzer = new HistogramAnalyzer([2, 3, 1]);
      analyzer.largestRectangleArea();
      
      const allRectangles = analyzer.getAllRectangles();
      expect(allRectangles.length).toBeGreaterThan(0);
      
      allRectangles.forEach(rect => {
        expect(rect.area).toBe(rect.height * rect.width);
        expect(rect.width).toBe(rect.right - rect.left + 1);
      });
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large histograms efficiently', () => {
      const largeHistogram = Array.from({ length: 10000 }, (_, i) => (i % 100) + 1);
      const analyzer = new HistogramAnalyzer(largeHistogram);
      
      const startTime = Date.now();
      const result = analyzer.largestRectangleArea();
      const endTime = Date.now();
      
      expect(result.maxArea).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should be fast
    });

    test('should track metrics accurately', () => {
      const analyzer = new HistogramAnalyzer([3, 1, 4, 1, 5]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.metrics.stackPushes).toBeGreaterThan(0);
      expect(result.metrics.stackPops).toBeGreaterThan(0);
      expect(result.metrics.comparisons).toBeGreaterThan(0);
      expect(result.metrics.totalRectangles).toBeGreaterThan(0);
    });

    test('should handle histogram with all same heights', () => {
      const analyzer = new HistogramAnalyzer([3, 3, 3, 3]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBe(12); // 3 * 4
      expect(result.maxRectangle.width).toBe(4);
      expect(result.maxRectangle.height).toBe(3);
    });

    test('should reset analyzer correctly', () => {
      const analyzer = new HistogramAnalyzer([1, 2, 3]);
      analyzer.largestRectangleArea();
      
      analyzer.reset([4, 5, 6]);
      const newHistogram = analyzer.getHistogram();
      expect(newHistogram).toEqual([4, 5, 6]);
      
      const operations = analyzer.getOperationsHistory();
      expect(operations).toHaveLength(0);
    });
  });

  describe('Utility functions', () => {
    test('should generate visualization data', () => {
      const heights = [2, 1, 5, 6];
      const rectangles = [
        { left: 0, right: 1, height: 1, area: 2, width: 2 },
        { left: 2, right: 3, height: 5, area: 10, width: 2 }
      ];
      
      const vizData = generateVisualizationData(heights, rectangles);
      
      expect(vizData.bars).toHaveLength(4);
      expect(vizData.rectangleOverlays).toHaveLength(2);
      
      vizData.bars.forEach((bar, i) => {
        expect(bar.height).toBe(heights[i]);
        expect(bar.x).toBe(i);
      });
    });

    test('should provide optimized solution for large inputs', () => {
      const largeHistogram = Array.from({ length: 100000 }, (_, i) => (i % 1000) + 1);
      
      const startTime = Date.now();
      const maxArea = largestRectangleAreaOptimized(largeHistogram);
      const endTime = Date.now();
      
      expect(maxArea).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(50); // Should be very fast
    });
  });

  describe('Complex scenarios', () => {
    test('should handle mountain-shaped histogram', () => {
      const analyzer = new HistogramAnalyzer([1, 2, 3, 4, 5, 4, 3, 2, 1]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBeGreaterThan(0);
      expect(result.topKRectangles.length).toBeGreaterThan(0);
    });

    test('should handle valley-shaped histogram', () => {
      const analyzer = new HistogramAnalyzer([5, 4, 3, 2, 1, 2, 3, 4, 5]);
      const result = analyzer.largestRectangleArea();
      
      expect(result.maxArea).toBeGreaterThan(0);
      expect(result.metrics.totalRectangles).toBeGreaterThan(0);
    });

    test('should handle random histogram patterns', () => {
      const randomHeights = Array.from({ length: 50 }, () => Math.floor(Math.random() * 10) + 1);
      const analyzer = new HistogramAnalyzer(randomHeights);
      
      const result = analyzer.largestRectangleArea();
      expect(result.maxArea).toBeGreaterThan(0);
      expect(result.maxRectangle.area).toBe(result.maxArea);
    });
  });
});
