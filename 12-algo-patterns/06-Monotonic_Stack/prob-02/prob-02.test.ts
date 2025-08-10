/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  NextGreaterAnalyzer, 
  batchAnalyzeArrays, 
  nextGreaterElementsOptimized,
  ElementAnalysis,
  RangeQuery 
} from './prob-02';

describe('Monotonic Stack Pattern - Problem 2: Next Greater Element with Advanced Queries', () => {
  describe('NextGreaterAnalyzer', () => {
    test('should analyze elements comprehensively', () => {
      const analyzer = new NextGreaterAnalyzer([4, 5, 2, 25, 7, 8]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([5, 25, 25, -1, 8, -1]);
      expect(analysis.prevGreater).toEqual([-1, -1, 5, -1, 25, 25]);
      expect(analysis.nextSmaller).toEqual([2, 2, -1, 7, -1, -1]);
      expect(analysis.prevSmaller).toEqual([-1, 4, -1, 2, 2, 7]);
      expect(analysis.metrics.stackOperations).toBeGreaterThan(0);
    });

    test('should handle array with duplicates', () => {
      const analyzer = new NextGreaterAnalyzer([1, 3, 2, 3, 1]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([3, -1, 3, -1, -1]);
      expect(analysis.prevGreater).toEqual([-1, -1, 3, -1, 3]);
    });

    test('should handle increasing array', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3, 4, 5]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([2, 3, 4, 5, -1]);
      expect(analysis.prevGreater).toEqual([-1, -1, -1, -1, -1]);
    });

    test('should handle decreasing array', () => {
      const analyzer = new NextGreaterAnalyzer([5, 4, 3, 2, 1]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([-1, -1, -1, -1, -1]);
      expect(analysis.prevGreater).toEqual([-1, 5, 4, 3, 2]);
    });

    test('should calculate spans correctly', () => {
      const analyzer = new NextGreaterAnalyzer([4, 5, 2, 25]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.spans.nextGreaterSpan).toEqual([1, 2, 1, -1]);
      expect(analysis.spans.prevGreaterSpan).toEqual([-1, -1, 1, -1]);
    });

    test('should handle single element', () => {
      const analyzer = new NextGreaterAnalyzer([5]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([-1]);
      expect(analysis.prevGreater).toEqual([-1]);
      expect(analysis.nextSmaller).toEqual([-1]);
      expect(analysis.prevSmaller).toEqual([-1]);
    });

    test('should handle empty array', () => {
      const analyzer = new NextGreaterAnalyzer([]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([]);
      expect(analysis.prevGreater).toEqual([]);
      expect(analysis.nextSmaller).toEqual([]);
      expect(analysis.prevSmaller).toEqual([]);
    });
  });

  describe('Circular array support', () => {
    test('should handle circular array correctly', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 1], true);
      const analysis = analyzer.analyzeElements();
      
      // In circular: 1->2, 2->1 (wraps to 2), 1->2
      expect(analysis.nextGreater).toEqual([2, -1, 2]);
    });

    test('should handle circular array with all same elements', () => {
      const analyzer = new NextGreaterAnalyzer([3, 3, 3], true);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([-1, -1, -1]);
    });
  });

  describe('Range queries', () => {
    test('should find next greater in range', () => {
      const analyzer = new NextGreaterAnalyzer([1, 3, 2, 4, 5]);
      const result = analyzer.nextGreaterInRange(1, 3);
      
      expect(result.start).toBe(1);
      expect(result.end).toBe(3);
      expect(result.nextGreaterInRange).toEqual([4, -1, 4]);
    });

    test('should handle invalid range', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3]);
      expect(() => analyzer.nextGreaterInRange(2, 1)).toThrow();
    });

    test('should handle range at boundaries', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3, 4]);
      const result = analyzer.nextGreaterInRange(0, 3);
      
      expect(result.nextGreaterInRange).toEqual([2, 3, 4, -1]);
    });
  });

  describe('Dynamic updates', () => {
    test('should update element and recalculate', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3]);
      analyzer.updateElement(1, 5);
      
      const updatedArray = analyzer.getArray();
      expect(updatedArray).toEqual([1, 5, 3]);
      
      const analysis = analyzer.analyzeElements();
      expect(analysis.nextGreater).toEqual([5, -1, -1]);
    });

    test('should insert element correctly', () => {
      const analyzer = new NextGreaterAnalyzer([1, 3, 5]);
      analyzer.insertElement(1, 2);
      
      const updatedArray = analyzer.getArray();
      expect(updatedArray).toEqual([1, 2, 3, 5]);
    });

    test('should remove element correctly', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3, 4]);
      analyzer.removeElement(1);
      
      const updatedArray = analyzer.getArray();
      expect(updatedArray).toEqual([1, 3, 4]);
    });

    test('should handle multiple updates', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3]);
      analyzer.updateElement(0, 5);
      analyzer.insertElement(1, 4);
      analyzer.removeElement(3);
      
      const finalArray = analyzer.getArray();
      expect(finalArray.length).toBe(3);
    });
  });

  describe('Single index queries', () => {
    test('should find next greater at specific index', () => {
      const analyzer = new NextGreaterAnalyzer([4, 5, 2, 25]);
      
      expect(analyzer.nextGreaterAtIndex(0)).toBe(5);
      expect(analyzer.nextGreaterAtIndex(1)).toBe(25);
      expect(analyzer.nextGreaterAtIndex(3)).toBe(-1);
    });

    test('should handle invalid index', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3]);
      expect(() => analyzer.nextGreaterAtIndex(5)).toThrow();
      expect(() => analyzer.nextGreaterAtIndex(-1)).toThrow();
    });
  });

  describe('Local extrema detection', () => {
    test('should find local maxima', () => {
      const analyzer = new NextGreaterAnalyzer([1, 3, 2, 5, 4]);
      const maxima = analyzer.findLocalMaxima();
      
      expect(maxima).toContain(1); // index 1 (value 3)
      expect(maxima).toContain(3); // index 3 (value 5)
    });

    test('should find local minima', () => {
      const analyzer = new NextGreaterAnalyzer([3, 1, 4, 2, 5]);
      const minima = analyzer.findLocalMinima();
      
      expect(minima).toContain(1); // index 1 (value 1)
      expect(minima).toContain(3); // index 3 (value 2)
    });

    test('should handle edge cases for extrema', () => {
      const analyzer = new NextGreaterAnalyzer([1]);
      const maxima = analyzer.findLocalMaxima();
      const minima = analyzer.findLocalMinima();
      
      expect(maxima).toContain(0);
      expect(minima).toContain(0);
    });
  });

  describe('Span analysis', () => {
    test('should find maximum span', () => {
      const analyzer = new NextGreaterAnalyzer([4, 5, 2, 25, 7, 8]);
      const maxSpan = analyzer.getMaxSpan();
      
      expect(maxSpan.span).toBeGreaterThan(0);
      expect(maxSpan.index).toBeGreaterThanOrEqual(0);
      expect(['nextGreaterSpan', 'prevGreaterSpan', 'nextSmallerSpan', 'prevSmallerSpan']).toContain(maxSpan.type);
    });

    test('should handle array with no spans', () => {
      const analyzer = new NextGreaterAnalyzer([1, 1, 1]);
      const maxSpan = analyzer.getMaxSpan();
      
      expect(maxSpan.span).toBe(-1);
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large arrays efficiently', () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100);
      const analyzer = new NextGreaterAnalyzer(largeArray);
      
      const startTime = Date.now();
      const analysis = analyzer.analyzeElements();
      const endTime = Date.now();
      
      expect(analysis.nextGreater.length).toBe(10000);
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should track stack history correctly', () => {
      const analyzer = new NextGreaterAnalyzer([3, 1, 4]);
      analyzer.analyzeElements();
      
      const history = analyzer.getStackHistory();
      expect(history.length).toBeGreaterThan(0);
      
      history.forEach(state => {
        expect(state.elements).toBeDefined();
        expect(state.indices).toBeDefined();
        expect(state.operation).toBeDefined();
        expect(state.currentIndex).toBeGreaterThanOrEqual(0);
      });
    });

    test('should handle negative numbers', () => {
      const analyzer = new NextGreaterAnalyzer([-1, -3, -2, 0, 1]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([-2, -2, 0, 1, -1]);
      expect(analysis.nextSmaller).toEqual([-3, -1, -1, -1, -1]);
    });

    test('should reset correctly', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3]);
      analyzer.analyzeElements();
      
      analyzer.reset([4, 5, 6], true);
      const newArray = analyzer.getArray();
      expect(newArray).toEqual([4, 5, 6]);
      
      const history = analyzer.getStackHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('Utility functions', () => {
    test('should batch analyze multiple arrays', () => {
      const arrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const results = batchAnalyzeArrays(arrays);
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.nextGreater).toBeDefined();
        expect(result.prevGreater).toBeDefined();
        expect(result.metrics).toBeDefined();
      });
    });

    test('should provide optimized next greater elements', () => {
      const nums = [4, 5, 2, 25, 7, 8];
      const result = nextGreaterElementsOptimized(nums);
      
      expect(result).toEqual([5, 25, 25, -1, 8, -1]);
    });

    test('should handle empty arrays in batch processing', () => {
      const arrays = [[], [1], [1, 2]];
      const results = batchAnalyzeArrays(arrays);
      
      expect(results).toHaveLength(3);
      expect(results[0].nextGreater).toEqual([]);
      expect(results[1].nextGreater).toEqual([-1]);
      expect(results[2].nextGreater).toEqual([2, -1]);
    });
  });

  describe('Complex scenarios', () => {
    test('should handle mountain pattern', () => {
      const analyzer = new NextGreaterAnalyzer([1, 2, 3, 4, 3, 2, 1]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater[0]).toBe(2); // 1 -> 2
      expect(analysis.nextGreater[3]).toBe(-1); // 4 has no greater
      expect(analysis.nextGreater[6]).toBe(-1); // last element
    });

    test('should handle valley pattern', () => {
      const analyzer = new NextGreaterAnalyzer([4, 3, 2, 1, 2, 3, 4]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater[3]).toBe(2); // 1 -> 2
      expect(analysis.nextSmaller[0]).toBe(3); // 4 -> 3
    });

    test('should handle alternating pattern', () => {
      const analyzer = new NextGreaterAnalyzer([1, 3, 2, 4, 3, 5]);
      const analysis = analyzer.analyzeElements();
      
      expect(analysis.nextGreater).toEqual([3, 4, 4, 5, 5, -1]);
      expect(analysis.nextSmaller).toEqual([-1, 2, -1, 3, -1, -1]);
    });
  });
});
