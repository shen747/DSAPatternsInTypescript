# Modified Binary Search Pattern

## Overview
The Modified Binary Search pattern adapts the classic binary search algorithm to solve complex problems involving sorted or partially sorted arrays. This pattern is essential for problems where the search space has special properties that can be exploited.

## Key Concepts
- **Search Space Reduction**: Eliminate half of the search space in each iteration
- **Invariant Maintenance**: Maintain properties that help determine which half to search
- **Condition Checking**: Use custom conditions instead of simple equality
- **Boundary Handling**: Carefully manage left and right boundaries
- **Rotated Arrays**: Handle arrays that are sorted but rotated

## When to Use
- Searching in rotated sorted arrays
- Finding peak elements in arrays
- Searching in 2D sorted matrices
- Finding median of two sorted arrays
- Searching for minimum/maximum in special arrays
- Finding first/last occurrence of elements
- Square root and power calculations

## Time Complexity
- **Basic Search**: O(log n) for single searches
- **Range Queries**: O(log n) for finding boundaries
- **2D Search**: O(log m + log n) for sorted matrices
- **Median Finding**: O(log(min(m,n))) for two arrays

## Problems in This Pattern

### Problem 1: Search in Rotated Sorted Array with Advanced Queries
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Rotated array analysis, range queries, k-th element finding, dynamic updates
**Key Skills**: Modified binary search, rotation detection, efficient querying

### Problem 2: Median of Two Sorted Arrays with Advanced Statistics
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Statistical analysis, percentile calculations, multi-array operations
**Key Skills**: Binary search on answer, statistical computations, optimization

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=1rtEtULACgs
- **Practice**: LeetCode problems 33, 34, 4, 74, 162, 153, 154
- **Advanced**: Search in 2D matrix, find peak element, search range

## Interview Tips
1. Identify the search space and what you're searching for
2. Define the condition that determines which half to eliminate
3. Handle edge cases: empty arrays, single elements, no solution
4. Be careful with boundary conditions and infinite loops
5. Consider rotated arrays and how rotation affects search
6. Think about finding first/last occurrence vs any occurrence
7. Use binary search on the answer for optimization problems
