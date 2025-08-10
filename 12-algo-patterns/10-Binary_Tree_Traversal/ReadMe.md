# Binary Tree Traversal Pattern

## Overview
The Binary Tree Traversal pattern involves systematically visiting all nodes in a binary tree. This pattern is fundamental for tree processing, serialization, and analysis problems.

## Key Concepts
- **Preorder Traversal**: Root → Left → Right (useful for copying/serialization)
- **Inorder Traversal**: Left → Root → Right (gives sorted order for BST)
- **Postorder Traversal**: Left → Right → Root (useful for deletion/cleanup)
- **Level Order Traversal**: Visit nodes level by level (BFS approach)
- **Morris Traversal**: O(1) space traversal using threading

## When to Use
- Tree serialization and deserialization
- Finding paths in trees
- Tree reconstruction from traversals
- Level-order processing
- Tree validation and analysis
- Finding tree properties (height, diameter, etc.)
- Tree comparison and cloning

## Time Complexity
- **All Traversals**: O(n) to visit each node once
- **Space Complexity**: O(h) for recursion stack, O(1) for Morris
- **Level Order**: O(n) time, O(w) space where w is max width

## Problems in This Pattern

### Problem 1: Binary Tree Serialization and Advanced Traversals
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Multiple traversal methods, serialization formats, tree reconstruction
**Key Skills**: Recursive/iterative traversals, Morris algorithm, tree analysis

### Problem 2: Binary Tree Path Analysis with Advanced Algorithms
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Path finding, sum calculations, tree modifications, advanced queries
**Key Skills**: DFS path tracking, dynamic tree updates, statistical analysis

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=b_NjndniOqY
- **Practice**: LeetCode problems 94, 102, 144, 145, 297, 105, 106
- **Advanced**: Vertical order, diagonal traversal, boundary traversal

## Interview Tips
1. Master all four basic traversal types (preorder, inorder, postorder, level-order)
2. Practice both recursive and iterative implementations
3. Understand when to use each traversal type
4. Handle edge cases: null trees, single nodes, skewed trees
5. Consider space optimization with Morris traversal
6. Think about tree reconstruction from traversal combinations
7. Practice serialization in multiple formats

