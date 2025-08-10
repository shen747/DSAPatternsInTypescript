# Breadth First Search Pattern

## Overview
The Breadth First Search (BFS) pattern explores graphs and trees level by level, visiting all nodes at the current depth before moving to the next depth level. This pattern is essential for finding shortest paths and level-order processing.

## Key Concepts
- **Level-by-Level Exploration**: Process all nodes at current level before next level
- **Queue-Based**: Uses FIFO queue to maintain order of exploration
- **Shortest Path**: Guarantees shortest path in unweighted graphs
- **Distance Tracking**: Natural way to track distance from source
- **Layer Processing**: Process nodes in layers/levels

## When to Use
- Finding shortest path in unweighted graphs
- Level-order tree traversal
- Finding minimum steps/moves problems
- Social network analysis (degrees of separation)
- Web crawling and network analysis
- Finding connected components
- Bipartite graph detection
- Minimum spanning tree (Prim's algorithm)

## Time Complexity
- **Graph BFS**: O(V + E) where V = vertices, E = edges
- **Tree BFS**: O(n) where n = number of nodes
- **Space**: O(w) where w = maximum width of graph/tree

## Problems in This Pattern

### Problem 1: Shortest Path in Binary Matrix with Advanced Pathfinding
**Difficulty**: Hard (FAANG Level)
**File**: `prob-01/prob-01.ts`
**Focus**: Grid pathfinding, multiple algorithms, dynamic obstacles, optimization
**Key Skills**: Multi-source BFS, A* algorithm, dynamic updates, path reconstruction

### Problem 2: Word Ladder with Advanced Transformations
**Difficulty**: Hard (FAANG Level)
**File**: `prob-02/prob-02.ts`
**Focus**: Word transformations, bidirectional BFS, optimization, pattern analysis
**Key Skills**: String transformations, graph modeling, optimization techniques

## Learning Resources
- **Theory**: https://www.youtube.com/watch?v=oDqjPvD54Ss
- **Practice**: LeetCode problems 102, 107, 111, 127, 542, 994, 1091
- **Advanced**: Bidirectional BFS, multi-source BFS, 0-1 BFS

## Interview Tips
1. Use queue for level-by-level processing
2. Track visited nodes to avoid cycles
3. Consider multi-source BFS for optimization
4. Use bidirectional BFS for shortest path between two specific nodes
5. Think about when to mark nodes as visited (when adding to queue vs when processing)
6. Handle edge cases: empty graph, unreachable targets, single node
7. Consider space optimization for large graphs
8. Use BFS for minimum steps/distance problems in unweighted graphs
