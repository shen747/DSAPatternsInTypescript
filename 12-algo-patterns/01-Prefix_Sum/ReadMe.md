# Prefix Sum Pattern

## Overview
The Prefix Sum pattern is a powerful technique for efficiently answering range sum queries on arrays. It preprocesses the array to enable O(1) range sum calculations after O(n) preprocessing time.

## Key Concepts
- **Prefix Sum Array**: `prefixSum[i] = sum of elements from index 0 to i`
- **Range Sum Formula**: `sum(i, j) = prefixSum[j] - prefixSum[i-1]` (handle i=0 case)
- **2D Extension**: Can be extended to matrices for submatrix sum queries
- **Applications**: Subarray problems, range queries, cumulative statistics

## When to Use
- Multiple range sum queries on static or semi-static data
- Subarray sum problems (equal to k, maximum sum, etc.)
- 2D matrix range queries
- Cumulative frequency problems
- Problems involving running totals

## Time Complexity
- **Preprocessing**: O(n) for 1D, O(m×n) for 2D
- **Query**: O(1) for range sums
- **Update**: O(n) for naive rebuild, O(log n) with advanced structures

## Problems in This Pattern

### Problem 1: Subarray Sum Equals K with Count and Indices
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Prefix sum + hash map for finding subarrays with target sum
**Key Skills**: Hash map optimization, handling negative numbers, multiple solutions

### Problem 2: Range Sum Query 2D with Updates
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: 2D prefix sum, point/range updates, maximum submatrix
**Key Skills**: 2D algorithms, update strategies, Kadane's algorithm extension

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=yuws7YK0Yng
- **Practice**: LeetCode problems 303, 304, 560, 1074
- **Advanced**: Binary Indexed Trees, Segment Trees for updates

## Interview Tips
1. Always consider if multiple queries justify preprocessing overhead
2. Handle edge cases: empty arrays, single elements, negative numbers
3. For 2D problems, think about row-wise compression to 1D
4. Consider space-time tradeoffs between different update strategies
5. Practice explaining the mathematical intuition behind prefix sums

