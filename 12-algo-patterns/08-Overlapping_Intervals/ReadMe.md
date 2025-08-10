# Overlapping Intervals Pattern

## Overview
The Overlapping Intervals pattern deals with problems involving intervals that may overlap, merge, or conflict with each other. This pattern is essential for scheduling, resource allocation, and time management problems.

## Key Concepts
- **Interval Representation**: [start, end] pairs representing time ranges
- **Overlap Detection**: Checking if two intervals intersect
- **Interval Merging**: Combining overlapping intervals into single intervals
- **Sorting Strategy**: Usually sort by start time for efficient processing
- **Sweep Line Algorithm**: Process intervals in chronological order

## When to Use
- Meeting room scheduling problems
- Calendar conflict detection
- Resource allocation and booking systems
- Task scheduling with time constraints
- Merging overlapping time ranges
- Finding free time slots
- Interval tree and range query problems

## Time Complexity
- **Sorting**: O(n log n) for interval sorting
- **Merging**: O(n) after sorting
- **Overlap Detection**: O(1) for two intervals
- **Range Queries**: O(log n) with interval trees

## Problems in This Pattern

### Problem 1: Meeting Rooms Scheduler with Advanced Conflict Resolution
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Meeting scheduling, conflict resolution, room optimization, recurring meetings
**Key Skills**: Interval merging, priority handling, resource allocation, analytics

### Problem 2: Interval Tree with Advanced Range Operations
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Interval trees, range queries, multi-dimensional intervals, optimization
**Key Skills**: Tree data structures, efficient querying, conflict detection, layout optimization

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=T5t73Fsv1-s
- **Practice**: LeetCode problems 56, 57, 252, 253, 435, 452, 986
- **Advanced**: Calendar scheduling, employee free time, range module

## Interview Tips
1. Always sort intervals by start time first
2. Check for overlap: `a.start < b.end && b.start < a.end`
3. Merge intervals: `[min(a.start, b.start), max(a.end, b.end)]`
4. Use sweep line algorithm for complex scenarios
5. Consider edge cases: empty intervals, single interval, no overlaps
6. Think about real-time updates and dynamic scheduling
7. Handle priority and conflict resolution strategies
