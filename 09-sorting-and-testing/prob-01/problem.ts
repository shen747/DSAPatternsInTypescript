/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// Sorting Algorithms and Testing Utilities
// Problem: Implement various sorting algorithms and create comprehensive testing utilities

export interface SortResult {
  sortedArray: number[];
  comparisons: number;
  swaps: number;
  timeMs: number;
}

export interface SortAlgorithm {
  name: string;
  sort(arr: number[]): SortResult;
}

// Utility functions for testing
export function generateRandomArray(size: number, min: number = 0, max: number = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function generateSortedArray(size: number, ascending: boolean = true): number[] {
  const arr = Array.from({ length: size }, (_, i) => i);
  return ascending ? arr : arr.reverse();
}

export function generateNearlySortedArray(size: number, swapCount: number = 5): number[] {
  const arr = generateSortedArray(size);
  for (let i = 0; i < swapCount; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    if (arr[idx1] !== undefined && arr[idx2] !== undefined) {
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
  }
  return arr;
}

export function generateReversedArray(size: number): number[] {
  return generateSortedArray(size, false);
}

export function generateDuplicateArray(size: number, uniqueValues: number = 10): number[] {
  const values = Array.from({ length: uniqueValues }, (_, i) => i);
  return Array.from({ length: size }, () => {
    const randomIndex = Math.floor(Math.random() * uniqueValues);
    return values[randomIndex] ?? 0; // Fallback to 0 if undefined
  });
}

export function isSorted(arr: number[], ascending: boolean = true): boolean {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    const previous = arr[i - 1];
    if (current === undefined || previous === undefined) return false;
    if (ascending && current < previous) return false;
    if (!ascending && current > previous) return false;
  }
  return true;
}

export function arraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// Bubble Sort
export class BubbleSort implements SortAlgorithm {
  name = 'Bubble Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < sortedArray.length - 1; i++) {
      for (let j = 0; j < sortedArray.length - 1 - i; j++) {
        comparisons++;
        const current = sortedArray[j];
        const next = sortedArray[j + 1];
        if (current !== undefined && next !== undefined && current > next) {
          [sortedArray[j], sortedArray[j + 1]] = [next, current];
          swaps++;
        }
      }
    }

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Selection Sort
export class SelectionSort implements SortAlgorithm {
  name = 'Selection Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        comparisons++;
        const current = sortedArray[j];
        const min = sortedArray[minIndex];
        if (current !== undefined && min !== undefined && current < min) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const iValue = sortedArray[i];
        const minValue = sortedArray[minIndex];
        if (iValue !== undefined && minValue !== undefined) {
          [sortedArray[i], sortedArray[minIndex]] = [minValue, iValue];
          swaps++;
        }
      }
    }

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Insertion Sort
export class InsertionSort implements SortAlgorithm {
  name = 'Insertion Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 1; i < sortedArray.length; i++) {
      const key = sortedArray[i];
      if (key === undefined) continue;
      let j = i - 1;

      while (j >= 0) {
        comparisons++;
        const current = sortedArray[j];
        if (current !== undefined && current > key) {
          sortedArray[j + 1] = current;
          swaps++;
          j--;
        } else {
          break;
        }
      }
      sortedArray[j + 1] = key;
    }

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Merge Sort
export class MergeSort implements SortAlgorithm {
  name = 'Merge Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    const merge = (left: number, mid: number, right: number): void => {
      const leftArray = sortedArray.slice(left, mid + 1);
      const rightArray = sortedArray.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArray.length && j < rightArray.length) {
        comparisons++;
        const leftValue = leftArray[i];
        const rightValue = rightArray[j];
        if (leftValue !== undefined && rightValue !== undefined) {
          if (leftValue <= rightValue) {
            sortedArray[k] = leftValue;
            i++;
          } else {
            sortedArray[k] = rightValue;
            j++;
          }
          swaps++;
          k++;
        } else {
          break;
        }
      }

      while (i < leftArray.length) {
        const leftValue = leftArray[i];
        if (leftValue !== undefined) {
          sortedArray[k] = leftValue;
          swaps++;
          k++;
        }
        i++;
      }

      while (j < rightArray.length) {
        const rightValue = rightArray[j];
        if (rightValue !== undefined) {
          sortedArray[k] = rightValue;
          swaps++;
          k++;
        }
        j++;
      }
    };

    const mergeSortHelper = (left: number, right: number): void => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    };

    mergeSortHelper(0, sortedArray.length - 1);

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Quick Sort
export class QuickSort implements SortAlgorithm {
  name = 'Quick Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    const partition = (low: number, high: number): number => {
      const pivot = sortedArray[high];
      if (pivot === undefined) return low;
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        const current = sortedArray[j];
        if (current !== undefined && current < pivot) {
          i++;
          const iValue = sortedArray[i];
          if (iValue !== undefined) {
            [sortedArray[i], sortedArray[j]] = [current, iValue];
            swaps++;
          }
        }
      }

      const iValue = sortedArray[i + 1];
      if (iValue !== undefined) {
        [sortedArray[i + 1], sortedArray[high]] = [pivot, iValue];
        swaps++;
      }
      return i + 1;
    };

    const quickSortHelper = (low: number, high: number): void => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    quickSortHelper(0, sortedArray.length - 1);

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Heap Sort
export class HeapSort implements SortAlgorithm {
  name = 'Heap Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    const heapify = (n: number, i: number): void => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        comparisons++;
        const leftValue = sortedArray[left];
        const largestValue = sortedArray[largest];
        if (leftValue !== undefined && largestValue !== undefined && leftValue > largestValue) {
          largest = left;
        }
      }

      if (right < n) {
        comparisons++;
        const rightValue = sortedArray[right];
        const largestValue = sortedArray[largest];
        if (rightValue !== undefined && largestValue !== undefined && rightValue > largestValue) {
          largest = right;
        }
      }

      if (largest !== i) {
        const iValue = sortedArray[i];
        const largestValue = sortedArray[largest];
        if (iValue !== undefined && largestValue !== undefined) {
          [sortedArray[i], sortedArray[largest]] = [largestValue, iValue];
          swaps++;
          heapify(n, largest);
        }
      }
    };

    // Build heap
    for (let i = Math.floor(sortedArray.length / 2) - 1; i >= 0; i--) {
      heapify(sortedArray.length, i);
    }

    // Extract elements from heap
    for (let i = sortedArray.length - 1; i > 0; i--) {
      const firstValue = sortedArray[0];
      const currentValue = sortedArray[i];
      if (firstValue !== undefined && currentValue !== undefined) {
        [sortedArray[0], sortedArray[i]] = [currentValue, firstValue];
        swaps++;
      }
      heapify(i, 0);
    }

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Counting Sort (for non-negative integers)
export class CountingSort implements SortAlgorithm {
  name = 'Counting Sort';

  sort(arr: number[]): SortResult {
    const startTime = performance.now();
    const sortedArray = [...arr];
    let comparisons = 0;
    let swaps = 0;

    if (sortedArray.length === 0) {
      const endTime = performance.now();
      return {
        sortedArray,
        comparisons,
        swaps,
        timeMs: endTime - startTime
      };
    }

    const max = Math.max(...sortedArray);
    const count = new Array(max + 1).fill(0);

    // Count occurrences
    for (const num of sortedArray) {
      count[num]++;
    }

    // Reconstruct array
    let index = 0;
    for (let i = 0; i <= max; i++) {
      while (count[i] > 0) {
        sortedArray[index] = i;
        swaps++;
        index++;
        count[i]--;
      }
    }

    const endTime = performance.now();
    return {
      sortedArray,
      comparisons,
      swaps,
      timeMs: endTime - startTime
    };
  }
}

// Sort Tester and Comparator
export class SortTester {
  private algorithms: SortAlgorithm[];

  constructor(algorithms: SortAlgorithm[] = []) {
    this.algorithms = algorithms;
  }

  addAlgorithm(algorithm: SortAlgorithm): void {
    this.algorithms.push(algorithm);
  }

  testAlgorithm(algorithm: SortAlgorithm, testCases: number[][]): SortResult[] {
    return testCases.map(testCase => algorithm.sort(testCase));
  }

  compareAlgorithms(testCases: number[][]): Map<string, SortResult[]> {
    const results = new Map<string, SortResult[]>();
    
    for (const algorithm of this.algorithms) {
      results.set(algorithm.name, this.testAlgorithm(algorithm, testCases));
    }
    
    return results;
  }

  generateTestCases(sizes: number[] = [10, 100, 1000]): number[][] {
    const testCases: number[][] = [];
    
    for (const size of sizes) {
      testCases.push(generateRandomArray(size));
      testCases.push(generateSortedArray(size));
      testCases.push(generateNearlySortedArray(size));
      testCases.push(generateReversedArray(size));
      testCases.push(generateDuplicateArray(size));
    }
    
    return testCases;
  }

  validateResults(results: SortResult[]): boolean {
    return results.every(result => isSorted(result.sortedArray));
  }

  getPerformanceReport(results: Map<string, SortResult[]>): string {
    let report = 'Performance Report:\n\n';

    results.forEach((algorithmResults: SortResult[], algorithmName: string) => {
      report += `${algorithmName}:\n`;

      const avgTime = algorithmResults.reduce((sum: number, result: SortResult) => sum + result.timeMs, 0) / algorithmResults.length;
      const avgComparisons = algorithmResults.reduce((sum: number, result: SortResult) => sum + result.comparisons, 0) / algorithmResults.length;
      const avgSwaps = algorithmResults.reduce((sum: number, result: SortResult) => sum + result.swaps, 0) / algorithmResults.length;

      report += `  Average Time: ${avgTime.toFixed(2)}ms\n`;
      report += `  Average Comparisons: ${avgComparisons.toFixed(0)}\n`;
      report += `  Average Swaps: ${avgSwaps.toFixed(0)}\n\n`;
    });

    return report;
  }
}

// Default algorithms
export const defaultAlgorithms: SortAlgorithm[] = [
  new BubbleSort(),
  new SelectionSort(),
  new InsertionSort(),
  new MergeSort(),
  new QuickSort(),
  new HeapSort(),
  new CountingSort()
]; 