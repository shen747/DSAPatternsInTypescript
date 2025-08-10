# Monotonic Stack Pattern

## Overview
The Monotonic Stack pattern uses a stack that maintains elements in a specific order (either increasing or decreasing). It's particularly effective for problems involving finding the next/previous greater or smaller elements, and for solving histogram-related problems.

## Key Concepts
- **Monotonic Increasing Stack**: Elements are in increasing order from bottom to top
- **Monotonic Decreasing Stack**: Elements are in decreasing order from bottom to top
- **Next Greater Element**: First element to the right that is greater than current
- **Previous Greater Element**: First element to the left that is greater than current
- **Stack Maintenance**: Pop elements that violate monotonic property

## When to Use
- Finding next/previous greater or smaller elements
- Largest rectangle in histogram problems
- Trapping rainwater problems
- Stock span problems
- Maximum area problems in matrices
- Daily temperature problems

## Time Complexity
- **Typical**: O(n) for single pass problems
- **Space**: O(n) for stack storage
- **Amortized**: Each element pushed and popped at most once

## Problems in This Pattern

### Problem 1: Largest Rectangle in Histogram with Advanced Analysis
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Histogram analysis, rectangle finding, dynamic updates, performance metrics
**Key Skills**: Stack operations, area calculations, real-time updates

### Problem 2: Next Greater Element with Advanced Queries
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Element analysis, range queries, circular arrays, dynamic updates
**Key Skills**: Multiple stack operations, query optimization, incremental updates

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=DtJVwbbicjQ
- **Practice**: LeetCode problems 84, 85, 496, 503, 739, 901
- **Advanced**: Daily temperatures, stock span, trapping rainwater

## Interview Tips
1. Identify when you need next/previous greater/smaller elements
2. Choose correct monotonic order (increasing vs decreasing)
3. Remember to process remaining stack elements after main loop
4. Consider circular array variations
5. Use indices in stack rather than values when position matters
6. Practice histogram and area calculation problems
7. Handle edge cases: empty arrays, single elements, all same values