# Depth First Search Pattern

## Overview
The Depth First Search (DFS) pattern explores graphs and trees by going as deep as possible before backtracking. This pattern is essential for problems involving connectivity, path finding, and graph analysis.

## Key Concepts
- **Recursive Exploration**: Go deep into one path before exploring alternatives
- **Stack-Based**: Uses call stack (recursive) or explicit stack (iterative)
- **Backtracking**: Return to previous state when no more progress possible
- **State Tracking**: Mark visited nodes to avoid infinite loops
- **Path Reconstruction**: Build paths during traversal

## When to Use
- Finding connected components
- Detecting cycles in graphs
- Topological sorting
- Finding paths between nodes
- Solving maze problems
- Island counting problems
- Tree/graph traversal and analysis
- Strongly connected components

## Time Complexity
- **Graph DFS**: O(V + E) where V = vertices, E = edges
- **Tree DFS**: O(n) where n = number of nodes
- **Space**: O(h) for recursion stack where h = height/depth

## Problems in This Pattern

### Problem 1: Number of Islands with Advanced Analysis
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Grid traversal, connected components, island analysis, dynamic updates
**Key Skills**: 2D DFS, component analysis, real-time modifications

### Problem 2: Graph Cycle Detection with Advanced Analysis
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Cycle detection, strongly connected components, graph analysis
**Key Skills**: DFS with colors, Tarjan's algorithm, negative cycle detection

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=pcKY4hjDrxk
- **Practice**: LeetCode problems 200, 695, 733, 207, 210, 547, 130
- **Advanced**: Strongly connected components, articulation points

## Interview Tips
1. Choose between recursive and iterative implementation based on constraints
2. Always mark visited nodes to prevent infinite loops
3. Consider the direction of traversal (4-directional vs 8-directional for grids)
4. Handle disconnected components by checking all unvisited nodes
5. Use color coding (white/gray/black) for cycle detection
6. Think about when to mark nodes as visited (before or after processing)
7. Practice backtracking problems that build and unbuild state

