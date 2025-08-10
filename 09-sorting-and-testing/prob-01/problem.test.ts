/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  SortResult,
  SortAlgorithm,
  generateRandomArray,
  generateSortedArray,
  generateNearlySortedArray,
  generateReversedArray,
  generateDuplicateArray,
  isSorted,
  arraysEqual,
  BubbleSort,
  SelectionSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  HeapSort,
  CountingSort,
  SortTester,
  defaultAlgorithms
} from './problem';

describe('Sorting Algorithms and Testing Utilities', () => {
  describe('Utility Functions', () => {
    describe('generateRandomArray', () => {
      test('should generate array of correct size', () => {
        const arr = generateRandomArray(10);
        expect(arr.length).toBe(10);
      });

      test('should generate numbers within specified range', () => {
        const arr = generateRandomArray(100, 5, 15);
        expect(arr.every(num => num >= 5 && num <= 15)).toBe(true);
      });

      test('should generate different arrays on multiple calls', () => {
        const arr1 = generateRandomArray(10);
        const arr2 = generateRandomArray(10);
        expect(arraysEqual(arr1, arr2)).toBe(false);
      });
    });

    describe('generateSortedArray', () => {
      test('should generate ascending sorted array', () => {
        const arr = generateSortedArray(5, true);
        expect(arr).toEqual([0, 1, 2, 3, 4]);
        expect(isSorted(arr, true)).toBe(true);
      });

      test('should generate descending sorted array', () => {
        const arr = generateSortedArray(5, false);
        expect(arr).toEqual([4, 3, 2, 1, 0]);
        expect(isSorted(arr, false)).toBe(true);
      });
    });

    describe('generateNearlySortedArray', () => {
      test('should generate nearly sorted array', () => {
        const arr = generateNearlySortedArray(10, 3);
        expect(arr.length).toBe(10);
        // Should be mostly sorted with some swaps
        const sortedArr = generateSortedArray(10);
        const differences = arr.filter((val, idx) => val !== sortedArr[idx]).length;
        expect(differences).toBeLessThanOrEqual(6); // 3 swaps = up to 6 differences
      });
    });

    describe('generateReversedArray', () => {
      test('should generate reversed array', () => {
        const arr = generateReversedArray(5);
        expect(arr).toEqual([4, 3, 2, 1, 0]);
        expect(isSorted(arr, false)).toBe(true);
      });
    });

    describe('generateDuplicateArray', () => {
      test('should generate array with limited unique values', () => {
        const arr = generateDuplicateArray(20, 5);
        expect(arr.length).toBe(20);
        const uniqueValues = new Set(arr).size;
        expect(uniqueValues).toBeLessThanOrEqual(5);
      });
    });

    describe('isSorted', () => {
      test('should return true for ascending sorted array', () => {
        expect(isSorted([1, 2, 3, 4, 5], true)).toBe(true);
      });

      test('should return false for unsorted array', () => {
        expect(isSorted([3, 1, 4, 1, 5], true)).toBe(false);
      });

      test('should return true for descending sorted array', () => {
        expect(isSorted([5, 4, 3, 2, 1], false)).toBe(true);
      });

      test('should handle empty array', () => {
        expect(isSorted([], true)).toBe(true);
        expect(isSorted([], false)).toBe(true);
      });

      test('should handle single element array', () => {
        expect(isSorted([1], true)).toBe(true);
        expect(isSorted([1], false)).toBe(true);
      });
    });

    describe('arraysEqual', () => {
      test('should return true for identical arrays', () => {
        expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      });

      test('should return false for different arrays', () => {
        expect(arraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      });

      test('should return false for different length arrays', () => {
        expect(arraysEqual([1, 2, 3], [1, 2])).toBe(false);
      });

      test('should handle empty arrays', () => {
        expect(arraysEqual([], [])).toBe(true);
      });
    });
  });

  describe('Sorting Algorithms', () => {
    const testCases = [
      [5, 2, 4, 6, 1, 3],
      [1],
      [],
      [3, 3, 3, 3],
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [1, 1, 2, 2, 3, 3]
    ];

    function testSortingAlgorithm(algorithm: SortAlgorithm): void {
      describe(algorithm.name, () => {
        test('should sort arrays correctly', () => {
          for (const testCase of testCases) {
            const result = algorithm.sort([...testCase]);
            expect(isSorted(result.sortedArray)).toBe(true);
            expect(result.sortedArray.length).toBe(testCase.length);
          }
        });

        test('should preserve array length', () => {
          for (const testCase of testCases) {
            const result = algorithm.sort([...testCase]);
            expect(result.sortedArray.length).toBe(testCase.length);
          }
        });

        test('should return valid metrics', () => {
          for (const testCase of testCases) {
            const result = algorithm.sort([...testCase]);
            expect(result.comparisons).toBeGreaterThanOrEqual(0);
            expect(result.swaps).toBeGreaterThanOrEqual(0);
            expect(result.timeMs).toBeGreaterThanOrEqual(0);
          }
        });

        test('should handle edge cases', () => {
          // Empty array
          const emptyResult = algorithm.sort([]);
          expect(emptyResult.sortedArray).toEqual([]);
          expect(isSorted(emptyResult.sortedArray)).toBe(true);

          // Single element
          const singleResult = algorithm.sort([42]);
          expect(singleResult.sortedArray).toEqual([42]);
          expect(isSorted(singleResult.sortedArray)).toBe(true);

          // Already sorted
          const sortedResult = algorithm.sort([1, 2, 3, 4, 5]);
          expect(sortedResult.sortedArray).toEqual([1, 2, 3, 4, 5]);
          expect(isSorted(sortedResult.sortedArray)).toBe(true);
        });
      });
    }

    // Test each algorithm
    testSortingAlgorithm(new BubbleSort());
    testSortingAlgorithm(new SelectionSort());
    testSortingAlgorithm(new InsertionSort());
    testSortingAlgorithm(new MergeSort());
    testSortingAlgorithm(new QuickSort());
    testSortingAlgorithm(new HeapSort());
    testSortingAlgorithm(new CountingSort());
  });

  describe('SortTester', () => {
    let sortTester: SortTester;

    beforeEach(() => {
      sortTester = new SortTester();
    });

    test('should add algorithms', () => {
      const bubbleSort = new BubbleSort();
      sortTester.addAlgorithm(bubbleSort);
      // Note: We can't directly test the private algorithms array, but we can test through public methods
    });

    test('should test single algorithm', () => {
      const bubbleSort = new BubbleSort();
      const testCases = [[3, 1, 4, 1, 5], [1, 2, 3]];
      const results = sortTester.testAlgorithm(bubbleSort, testCases);
      
      expect(results.length).toBe(testCases.length);
      results.forEach(result => {
        expect(isSorted(result.sortedArray)).toBe(true);
      });
    });

    test('should compare multiple algorithms', () => {
      const bubbleSort = new BubbleSort();
      const selectionSort = new SelectionSort();
      sortTester.addAlgorithm(bubbleSort);
      sortTester.addAlgorithm(selectionSort);

      const testCases = [[3, 1, 4, 1, 5]];
      const results = sortTester.compareAlgorithms(testCases);

      expect(results.size).toBe(2);
      expect(results.has('Bubble Sort')).toBe(true);
      expect(results.has('Selection Sort')).toBe(true);

      results.forEach(algorithmResults => {
        expect(algorithmResults.length).toBe(testCases.length);
        algorithmResults.forEach(result => {
          expect(isSorted(result.sortedArray)).toBe(true);
        });
      });
    });

    test('should generate test cases', () => {
      const testCases = sortTester.generateTestCases([5, 10]);
      expect(testCases.length).toBe(10); // 2 sizes * 5 types = 10 test cases
    });

    test('should validate results', () => {
      const bubbleSort = new BubbleSort();
      const testCases = [[3, 1, 4, 1, 5], [1, 2, 3]];
      const results = sortTester.testAlgorithm(bubbleSort, testCases);
      
      expect(sortTester.validateResults(results)).toBe(true);
    });

    test('should generate performance report', () => {
      const bubbleSort = new BubbleSort();
      const selectionSort = new SelectionSort();
      sortTester.addAlgorithm(bubbleSort);
      sortTester.addAlgorithm(selectionSort);

      const testCases = [[3, 1, 4, 1, 5], [1, 2, 3]];
      const results = sortTester.compareAlgorithms(testCases);
      const report = sortTester.getPerformanceReport(results);

      expect(report).toContain('Bubble Sort:');
      expect(report).toContain('Selection Sort:');
      expect(report).toContain('Average Time:');
      expect(report).toContain('Average Comparisons:');
      expect(report).toContain('Average Swaps:');
    });
  });

  describe('Default Algorithms', () => {
    test('should contain all expected algorithms', () => {
      const algorithmNames = defaultAlgorithms.map(alg => alg.name);
      expect(algorithmNames).toContain('Bubble Sort');
      expect(algorithmNames).toContain('Selection Sort');
      expect(algorithmNames).toContain('Insertion Sort');
      expect(algorithmNames).toContain('Merge Sort');
      expect(algorithmNames).toContain('Quick Sort');
      expect(algorithmNames).toContain('Heap Sort');
      expect(algorithmNames).toContain('Counting Sort');
    });

    test('should all sort correctly', () => {
      const testArray = [5, 2, 4, 6, 1, 3];
      const expected = [1, 2, 3, 4, 5, 6];

      defaultAlgorithms.forEach(algorithm => {
        const result = algorithm.sort([...testArray]);
        expect(result.sortedArray).toEqual(expected);
        expect(isSorted(result.sortedArray)).toBe(true);
      });
    });
  });

  describe('Performance Comparison', () => {
    test('should handle different array types efficiently', () => {
      const sortTester = new SortTester(defaultAlgorithms);
      const testCases = sortTester.generateTestCases([10, 50]);

      const results = sortTester.compareAlgorithms(testCases);
      
      // All algorithms should complete successfully
      results.forEach((algorithmResults, algorithmName) => {
        algorithmResults.forEach(result => {
          expect(isSorted(result.sortedArray)).toBe(true);
          expect(result.timeMs).toBeGreaterThanOrEqual(0);
        });
      });
    });

    test('should maintain consistent results across algorithms', () => {
      const testArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const results = defaultAlgorithms.map(alg => alg.sort([...testArray]));

      // All algorithms should produce the same sorted result
      expect(results.length).toBeGreaterThan(0);
      const firstSorted = results[0]!.sortedArray;
      results.forEach(result => {
        expect(arraysEqual(result.sortedArray, firstSorted)).toBe(true);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle arrays with negative numbers', () => {
      const testArray = [-3, 1, -4, 1, -5];
      defaultAlgorithms.forEach(algorithm => {
        const result = algorithm.sort([...testArray]);
        expect(isSorted(result.sortedArray)).toBe(true);
        expect(result.sortedArray.length).toBe(testArray.length);
      });
    });

    test('should handle arrays with zeros', () => {
      const testArray = [0, 3, 0, 1, 0];
      defaultAlgorithms.forEach(algorithm => {
        const result = algorithm.sort([...testArray]);
        expect(isSorted(result.sortedArray)).toBe(true);
        expect(result.sortedArray.length).toBe(testArray.length);
      });
    });

    test('should handle large arrays', () => {
      const largeArray = generateRandomArray(1000);
      defaultAlgorithms.forEach(algorithm => {
        const result = algorithm.sort([...largeArray]);
        expect(isSorted(result.sortedArray)).toBe(true);
        expect(result.sortedArray.length).toBe(largeArray.length);
      });
    });
  });
}); 