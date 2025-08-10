/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// Advanced Algorithms: Shortest Path and Red-Black Trees
// Problem: Implement advanced graph algorithms and self-balancing binary search trees

// ===== SHORTEST PATH ALGORITHMS =====

export interface Graph {
  vertices: number;
  edges: Edge[];
}

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export interface ShortestPathResult {
  distances: number[];
  predecessors: number[];
  path: number[];
}

// Dijkstra's Algorithm (for non-negative weights)
export function dijkstra(graph: Graph, source: number): ShortestPathResult {
  const vertices = graph.vertices;
  const distances = new Array(vertices).fill(Infinity);
  const predecessors = new Array(vertices).fill(-1);
  const visited = new Array(vertices).fill(false);
  
  distances[source] = 0;
  
  for (let count = 0; count < vertices - 1; count++) {
    // Find vertex with minimum distance
    let minDistance = Infinity;
    let minIndex = -1;
    
    for (let v = 0; v < vertices; v++) {
      if (!visited[v] && distances[v] < minDistance) {
        minDistance = distances[v];
        minIndex = v;
      }
    }
    
    if (minIndex === -1) break;
    
    visited[minIndex] = true;
    
    // Update distances to adjacent vertices
    for (const edge of graph.edges) {
      if (edge.from === minIndex) {
        const v = edge.to;
        const weight = edge.weight;
        
        if (!visited[v] && distances[minIndex] !== Infinity && 
            distances[minIndex] + weight < distances[v]) {
          distances[v] = distances[minIndex] + weight;
          predecessors[v] = minIndex;
        }
      }
    }
  }
  
  // Reconstruct path
  const path: number[] = [];
  let current = vertices - 1;
  while (current !== -1) {
    path.unshift(current);
    current = predecessors[current];
  }
  
  return { distances, predecessors, path };
}

// Bellman-Ford Algorithm (handles negative weights, detects negative cycles)
export function bellmanFord(graph: Graph, source: number): ShortestPathResult | null {
  const vertices = graph.vertices;
  const distances = new Array(vertices).fill(Infinity);
  const predecessors = new Array(vertices).fill(-1);
  
  distances[source] = 0;
  
  // Relax edges V-1 times
  for (let i = 0; i < vertices - 1; i++) {
    for (const edge of graph.edges) {
      const u = edge.from;
      const v = edge.to;
      const weight = edge.weight;
      
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
        predecessors[v] = u;
      }
    }
  }
  
  // Check for negative cycles
  for (const edge of graph.edges) {
    const u = edge.from;
    const v = edge.to;
    const weight = edge.weight;
    
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      return null; // Negative cycle detected
    }
  }
  
  // Reconstruct path
  const path: number[] = [];
  let current = vertices - 1;
  while (current !== -1) {
    path.unshift(current);
    current = predecessors[current];
  }
  
  return { distances, predecessors, path };
}

// Floyd-Warshall Algorithm (all pairs shortest path)
export function floydWarshall(graph: Graph): number[][] | null {
  const vertices = graph.vertices;
  const distances: number[][] = Array.from({ length: vertices }, () =>
    Array(vertices).fill(Infinity)
  );
  
  // Initialize distances
  for (let i = 0; i < vertices; i++) {
    distances[i]![i] = 0;
  }
  
  for (const edge of graph.edges) {
    distances[edge.from]![edge.to] = edge.weight;
  }
  
  // Floyd-Warshall algorithm
  for (let k = 0; k < vertices; k++) {
    for (let i = 0; i < vertices; i++) {
      for (let j = 0; j < vertices; j++) {
        if (distances[i]![k]! !== Infinity && distances[k]![j]! !== Infinity &&
            distances[i]![k]! + distances[k]![j]! < distances[i]![j]!) {
          distances[i]![j] = distances[i]![k]! + distances[k]![j]!;
        }
      }
    }
  }
  
  // Check for negative cycles
  for (let i = 0; i < vertices; i++) {
    if (distances[i]![i]! < 0) {
      return null; // Negative cycle detected
    }
  }
  
  return distances;
}

// ===== RED-BLACK TREE =====

export enum Color {
  RED = 'RED',
  BLACK = 'BLACK'
}

export class RBNode<T> {
  key: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;

  constructor(key: T) {
    this.key = key;
    this.color = Color.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class RedBlackTree<T> {
  private root: RBNode<T> | null;
  private nil: RBNode<T>;

  constructor() {
    this.nil = new RBNode<T>(null as T);
    this.nil.color = Color.BLACK;
    this.root = this.nil;
  }

  insert(key: T): void {
    const newNode = new RBNode<T>(key);
    newNode.left = this.nil;
    newNode.right = this.nil;
    
    let y: RBNode<T> | null = null;
    let x = this.root;
    
    // Find insertion position
    while (x !== this.nil) {
      y = x;
      if (key < x!.key) {
        x = x!.left;
      } else {
        x = x!.right;
      }
    }
    
    newNode.parent = y;
    
    if (y === null) {
      this.root = newNode;
    } else if (key < y.key) {
      y.left = newNode;
    } else {
      y.right = newNode;
    }
    
    this.insertFixup(newNode);
  }

  private insertFixup(node: RBNode<T>): void {
    while (node.parent && node.parent.color === Color.RED) {
      if (node.parent === node.parent.parent?.left) {
        const uncle = node.parent.parent.right;
        
        if (uncle && uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          node.parent.parent.color = Color.RED;
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          
          if (node.parent) {
            node.parent.color = Color.BLACK;
            if (node.parent.parent) {
              node.parent.parent.color = Color.RED;
              this.rightRotate(node.parent.parent);
            }
          }
        }
      } else {
        const uncle = node.parent.parent?.left;
        
        if (uncle && uncle.color === Color.RED) {
          node.parent.color = Color.BLACK;
          uncle.color = Color.BLACK;
          if (node.parent.parent) {
            node.parent.parent.color = Color.RED;
            node = node.parent.parent;
          }
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          
          if (node.parent) {
            node.parent.color = Color.BLACK;
            if (node.parent.parent) {
              node.parent.parent.color = Color.RED;
              this.leftRotate(node.parent.parent);
            }
          }
        }
      }
    }
    
    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  private leftRotate(x: RBNode<T>): void {
    const y = x.right;
    if (!y) return;
    
    x.right = y.left;
    if (y.left !== this.nil) {
      y.left!.parent = x;
    }
    
    y.parent = x.parent;
    
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    
    y.left = x;
    x.parent = y;
  }

  private rightRotate(y: RBNode<T>): void {
    const x = y.left;
    if (!x) return;
    
    y.left = x.right;
    if (x.right !== this.nil) {
      x.right!.parent = y;
    }
    
    x.parent = y.parent;
    
    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    
    x.right = y;
    y.parent = x;
  }

  search(key: T): RBNode<T> | null {
    return this.searchHelper(this.root, key);
  }

  private searchHelper(node: RBNode<T> | null, key: T): RBNode<T> | null {
    if (node === null || node === this.nil || key === node.key) {
      return node === this.nil ? null : node;
    }
    
    if (key < node.key) {
      return this.searchHelper(node.left, key);
    } else {
      return this.searchHelper(node.right, key);
    }
  }

  delete(key: T): boolean {
    const node = this.search(key);
    if (!node) return false;
    
    this.deleteNode(node);
    return true;
  }

  private deleteNode(node: RBNode<T>): void {
    let y = node;
    let yOriginalColor = y.color;
    let x: RBNode<T>;
    
    if (node.left === this.nil) {
      x = node.right!;
      this.transplant(node, node.right);
    } else if (node.right === this.nil) {
      x = node.left!;
      this.transplant(node, node.left);
    } else {
      y = this.minimum(node.right!);
      yOriginalColor = y.color;
      x = y.right!;

      if (y.parent === node) {
        x!.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right!.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left!.parent = y;
      y.color = node.color;
    }
    
    if (yOriginalColor === Color.BLACK) {
      this.deleteFixup(x);
    }
  }

  private transplant(u: RBNode<T>, v: RBNode<T> | null): void {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    
    if (v) {
      v.parent = u.parent;
    }
  }

  private minimum(node: RBNode<T>): RBNode<T> {
    while (node.left !== this.nil) {
      node = node.left!;
    }
    return node;
  }

  private deleteFixup(x: RBNode<T>): void {
    while (x !== this.root && x.color === Color.BLACK) {
      if (x === x.parent?.left) {
        let w = x.parent.right;
        
        if (w && w.color === Color.RED) {
          w.color = Color.BLACK;
          x.parent.color = Color.RED;
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        
        if (w && w.left && w.right && 
            w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
          w.color = Color.RED;
          x = x.parent;
        } else {
          if (w && w.right && w.right.color === Color.BLACK) {
            if (w.left) w.left.color = Color.BLACK;
            w.color = Color.RED;
            this.rightRotate(w);
            w = x.parent?.right;
          }
          
          if (w) {
            w.color = x.parent?.color || Color.BLACK;
            if (x.parent) x.parent.color = Color.BLACK;
            if (w.right) w.right.color = Color.BLACK;
            if (x.parent) this.leftRotate(x.parent);
            x = this.root!;
          }
        }
      } else {
        let w = x.parent?.left;
        
        if (w && w.color === Color.RED) {
          w.color = Color.BLACK;
          if (x.parent) x.parent.color = Color.RED;
          if (x.parent) this.rightRotate(x.parent);
          w = x.parent?.left;
        }
        
        if (w && w.left && w.right && 
            w.left.color === Color.BLACK && w.right.color === Color.BLACK) {
          w.color = Color.RED;
          x = x.parent!;
        } else {
          if (w && w.left && w.left.color === Color.BLACK) {
            if (w.right) w.right.color = Color.BLACK;
            w.color = Color.RED;
            this.leftRotate(w);
            w = x.parent?.left;
          }
          
          if (w) {
            w.color = x.parent?.color || Color.BLACK;
            if (x.parent) x.parent.color = Color.BLACK;
            if (w.left) w.left.color = Color.BLACK;
            if (x.parent) this.rightRotate(x.parent);
            x = this.root!;
          }
        }
      }
    }
    
    x.color = Color.BLACK;
  }

  inorder(): T[] {
    const result: T[] = [];
    this.inorderHelper(this.root, result);
    return result;
  }

  private inorderHelper(node: RBNode<T> | null, result: T[]): void {
    if (node && node !== this.nil) {
      this.inorderHelper(node.left, result);
      result.push(node.key);
      this.inorderHelper(node.right, result);
    }
  }

  getHeight(): number {
    return this.getHeightHelper(this.root);
  }

  private getHeightHelper(node: RBNode<T> | null): number {
    if (node === null || node === this.nil) {
      return 0;
    }
    
    const leftHeight = this.getHeightHelper(node.left);
    const rightHeight = this.getHeightHelper(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(): boolean {
    return this.isBalancedHelper(this.root);
  }

  private isBalancedHelper(node: RBNode<T> | null): boolean {
    if (node === null || node === this.nil) {
      return true;
    }
    
    const leftHeight = this.getHeightHelper(node.left);
    const rightHeight = this.getHeightHelper(node.right);
    
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    
    return this.isBalancedHelper(node.left) && this.isBalancedHelper(node.right);
  }

  validateRedBlackProperties(): boolean {
    // Check if root is black
    if (this.root && this.root.color !== Color.BLACK) {
      return false;
    }

    // Check red-black properties recursively
    return this.validateRedBlackHelper(this.root) !== -1;
  }

  private validateRedBlackHelper(node: RBNode<T> | null): number {
    if (node === null || node === this.nil) {
      return 1; // NIL nodes are black
    }

    // Red nodes must have black children
    if (node.color === Color.RED) {
      if ((node.left && node.left.color === Color.RED) ||
          (node.right && node.right.color === Color.RED)) {
        return -1; // Violation: red node with red child
      }
    }

    // Check black height consistency
    const leftBlackHeight = this.validateRedBlackHelper(node.left);
    const rightBlackHeight = this.validateRedBlackHelper(node.right);

    if (leftBlackHeight === -1 || rightBlackHeight === -1 ||
        leftBlackHeight !== rightBlackHeight) {
      return -1; // Violation: inconsistent black heights
    }

    // Add 1 if current node is black
    return leftBlackHeight + (node.color === Color.BLACK ? 1 : 0);
  }
}

// ===== UTILITY FUNCTIONS =====

export function createGraph(vertices: number, edges: [number, number, number][]): Graph {
  return {
    vertices,
    edges: edges.map(([from, to, weight]) => ({ from, to, weight }))
  };
}

export function printShortestPath(result: ShortestPathResult | null, source: number, target: number): string {
  if (!result) {
    return "Negative cycle detected or no path exists";
  }
  
  if (result.distances[target] === Infinity) {
    return `No path from ${source} to ${target}`;
  }
  
  return `Shortest distance from ${source} to ${target}: ${result.distances[target]}\nPath: ${result.path.join(' -> ')}`;
}

export function validateRedBlackTree<T>(tree: RedBlackTree<T>): boolean {
  return tree.validateRedBlackProperties();
}