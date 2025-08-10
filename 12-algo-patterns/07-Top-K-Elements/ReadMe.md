# Top-K Elements Pattern

## Overview
The Top-K Elements pattern uses heaps (priority queues) to efficiently find the k largest, smallest, or most frequent elements in a dataset. This pattern is essential for problems involving ranking, selection, and optimization.

## Key Concepts
- **Min-Heap**: Root contains minimum element, used for k largest elements
- **Max-Heap**: Root contains maximum element, used for k smallest elements
- **Heap Size**: Maintain heap of size k for memory efficiency
- **Frequency Analysis**: Combine with hash maps for frequency-based problems
- **Quick Select**: Alternative O(n) average approach for k-th element

## When to Use
- Finding k largest/smallest elements
- Top k frequent elements
- K closest points to origin
- Kth largest element in stream
- Merge k sorted arrays/lists
- Sliding window maximum/minimum
- Priority-based scheduling problems

## Time Complexity
- **Heap Operations**: O(log k) for insert/delete
- **Building Heap**: O(n log k) for n elements
- **Quick Select**: O(n) average, O(n²) worst case
- **Space**: O(k) for heap storage

## Problems in This Pattern

### Problem 1: Top K Frequent Elements with Advanced Analysis
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Frequency analysis, multiple algorithms, tie resolution, real-time updates
**Key Skills**: Heap operations, hash maps, algorithm comparison, performance metrics

### Problem 2: K Closest Points to Origin with Advanced Queries
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Spatial analysis, distance metrics, clustering, dynamic updates
**Key Skills**: Geometric algorithms, heap optimization, spatial data structures

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=6_v6OoxvMOE
- **Practice**: LeetCode problems 215, 347, 373, 378, 692, 703
- **Advanced**: Median finder, merge k sorted lists, smallest range

## Interview Tips
1. Choose between min-heap and max-heap based on problem requirements
2. Maintain heap of size k for memory efficiency
3. Consider Quick Select for better average time complexity
4. Use hash maps for frequency-based problems
5. Handle edge cases: k larger than array size, duplicate elements
6. Consider tie-breaking strategies for equal elements
7. Think about real-time updates and streaming data scenarios
