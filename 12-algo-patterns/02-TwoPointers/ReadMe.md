# Two Pointers Pattern

## Overview
The Two Pointers pattern uses two pointers to traverse data structures in a coordinated way. It's particularly effective for problems involving sorted arrays, palindromes, and finding pairs or triplets with specific properties.

## Key Concepts
- **Opposite Direction**: Start from both ends and move towards center
- **Same Direction**: Both pointers move in same direction at different speeds
- **Fast/Slow Pointers**: One pointer moves faster than the other (Floyd's algorithm)
- **Sliding Window**: Maintain a window of elements between two pointers

## When to Use
- Finding pairs/triplets with target sum in sorted arrays
- Palindrome detection and manipulation
- Removing duplicates from sorted arrays
- Container with most water type problems
- Cycle detection in linked lists or arrays
- Merging sorted arrays

## Time Complexity
- **Typical**: O(n) for single pass problems
- **Two Sum variants**: O(n) for sorted arrays vs O(n log n) for unsorted
- **Three/Four Sum**: O(n²) or O(n³) depending on implementation

## Problems in This Pattern

### Problem 1: Four Sum with Duplicates Handling
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Advanced two pointers with nested loops, duplicate handling, early termination
**Key Skills**: Optimization techniques, overflow handling, performance statistics

### Problem 2: Palindromic Substrings with Advanced Operations
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Two pointers for palindromes, dynamic updates, comprehensive analysis
**Key Skills**: String manipulation, caching strategies, incremental updates

### Problem 3: Subsequence Counting with Two Pointers
**Difficulty**: Medium (FAANG Level)
**File**: `prob-03/prob-03.ts`
**Focus**: Two pointers for subsequence matching, multiple optimization approaches
**Key Skills**: String subsequences, binary search optimization, bucket-based processing

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=QzZ7nmouLTI
- **Practice**: LeetCode problems 1, 15, 16, 18, 125, 167, 344
- **Advanced**: Floyd's cycle detection, Dutch national flag

## Interview Tips
1. Always check if the array is sorted - this enables two pointers
2. Consider sorting the array if the problem allows it
3. Handle duplicates carefully to avoid infinite loops
4. Use early termination when possible for optimization
5. Practice both opposite and same direction pointer movements
6. Remember edge cases: empty arrays, single elements, all duplicates

