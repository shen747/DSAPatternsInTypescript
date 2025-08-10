/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  BinaryTreeProcessor, 
  TreeNode, 
  createTreeFromArray, 
  treeToArray,
  TraversalResult,
  TreeAnalysis 
} from './prob-01';

describe('Binary Tree Traversal Pattern - Problem 1: Binary Tree Serialization and Advanced Traversals', () => {
  let root: TreeNode;
  let processor: BinaryTreeProcessor;

  beforeEach(() => {
    // Create test tree:     3
    //                      / \
    //                     9   20
    //                        /  \
    //                       15   7
    root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    
    processor = new BinaryTreeProcessor(root);
  });

  describe('BinaryTreeProcessor', () => {
    test('should perform all standard traversals', () => {
      const result = processor.getAllTraversals();
      
      expect(result.preorder).toEqual([3, 9, 20, 15, 7]);
      expect(result.inorder).toEqual([9, 3, 15, 20, 7]);
      expect(result.postorder).toEqual([9, 15, 7, 20, 3]);
      expect(result.levelOrder).toEqual([3, 9, 20, 15, 7]);
    });

    test('should handle empty tree', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      const result = emptyProcessor.getAllTraversals();
      
      expect(result.preorder).toEqual([]);
      expect(result.inorder).toEqual([]);
      expect(result.postorder).toEqual([]);
      expect(result.levelOrder).toEqual([]);
    });

    test('should handle single node tree', () => {
      const singleNode = new TreeNode(42);
      const singleProcessor = new BinaryTreeProcessor(singleNode);
      const result = singleProcessor.getAllTraversals();
      
      expect(result.preorder).toEqual([42]);
      expect(result.inorder).toEqual([42]);
      expect(result.postorder).toEqual([42]);
      expect(result.levelOrder).toEqual([42]);
    });

    test('should perform spiral order traversal', () => {
      const result = processor.getAllTraversals();
      
      expect(result.spiralOrder).toBeDefined();
      expect(result.spiralOrder.length).toBeGreaterThan(0);
      expect(result.spiralOrder).toContain(3);
      expect(result.spiralOrder).toContain(9);
      expect(result.spiralOrder).toContain(20);
    });

    test('should perform vertical order traversal', () => {
      const result = processor.getAllTraversals();
      
      expect(result.verticalOrder).toBeDefined();
      expect(result.verticalOrder.size).toBeGreaterThan(0);
      
      // Check that each column contains valid nodes
      result.verticalOrder.forEach((nodes, column) => {
        expect(Array.isArray(nodes)).toBe(true);
        expect(nodes.length).toBeGreaterThan(0);
      });
    });

    test('should perform diagonal order traversal', () => {
      const result = processor.getAllTraversals();
      
      expect(result.diagonalOrder).toBeDefined();
      expect(result.diagonalOrder.length).toBeGreaterThan(0);
      
      // Each diagonal should be an array of numbers
      result.diagonalOrder.forEach(diagonal => {
        expect(Array.isArray(diagonal)).toBe(true);
        expect(diagonal.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Iterative traversals', () => {
    test('should perform iterative preorder traversal', () => {
      const result = processor.preorderIterative();
      
      expect(result).toEqual([3, 9, 20, 15, 7]);
    });

    test('should perform iterative inorder traversal', () => {
      const result = processor.inorderIterative();
      
      expect(result).toEqual([9, 3, 15, 20, 7]);
    });

    test('should perform iterative postorder traversal', () => {
      const result = processor.postorderIterative();
      
      expect(result).toEqual([9, 15, 7, 20, 3]);
    });

    test('should handle empty tree in iterative traversals', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      
      expect(emptyProcessor.preorderIterative()).toEqual([]);
      expect(emptyProcessor.inorderIterative()).toEqual([]);
      expect(emptyProcessor.postorderIterative()).toEqual([]);
    });
  });

  describe('Morris traversal', () => {
    test('should perform Morris inorder traversal', () => {
      const result = processor.morrisInorder();
      
      expect(result).toEqual([9, 3, 15, 20, 7]);
    });

    test('should handle single node in Morris traversal', () => {
      const singleNode = new TreeNode(42);
      const singleProcessor = new BinaryTreeProcessor(singleNode);
      const result = singleProcessor.morrisInorder();
      
      expect(result).toEqual([42]);
    });

    test('should handle empty tree in Morris traversal', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      const result = emptyProcessor.morrisInorder();
      
      expect(result).toEqual([]);
    });
  });

  describe('Serialization and deserialization', () => {
    test('should serialize tree in multiple formats', () => {
      const formats = processor.serialize();
      
      expect(formats.preorderWithNulls).toBeDefined();
      expect(formats.levelOrderWithNulls).toBeDefined();
      expect(formats.parentArray).toBeDefined();
      expect(formats.nestedArray).toBeDefined();
      
      expect(typeof formats.preorderWithNulls).toBe('string');
      expect(typeof formats.levelOrderWithNulls).toBe('string');
      expect(Array.isArray(formats.parentArray)).toBe(true);
      expect(Array.isArray(formats.nestedArray)).toBe(true);
    });

    test('should deserialize preorder format correctly', () => {
      const formats = processor.serialize();
      const deserialized = BinaryTreeProcessor.deserialize(formats.preorderWithNulls, 'preorder');
      
      expect(deserialized).not.toBeNull();
      expect(deserialized!.val).toBe(3);
      expect(deserialized!.left!.val).toBe(9);
      expect(deserialized!.right!.val).toBe(20);
    });

    test('should deserialize level-order format correctly', () => {
      const formats = processor.serialize();
      const deserialized = BinaryTreeProcessor.deserialize(formats.levelOrderWithNulls, 'levelorder');
      
      expect(deserialized).not.toBeNull();
      expect(deserialized!.val).toBe(3);
    });

    test('should handle empty tree serialization', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      const formats = emptyProcessor.serialize();
      
      expect(formats.preorderWithNulls).toBe('');
      expect(formats.levelOrderWithNulls).toBe('');
      expect(formats.parentArray).toEqual([]);
      expect(formats.nestedArray).toEqual([]);
    });

    test('should handle null deserialization', () => {
      const deserialized = BinaryTreeProcessor.deserialize('', 'preorder');
      expect(deserialized).toBeNull();
    });
  });

  describe('Tree reconstruction', () => {
    test('should reconstruct tree from preorder and inorder', () => {
      const preorder = [3, 9, 20, 15, 7];
      const inorder = [9, 3, 15, 20, 7];
      
      const reconstructed = BinaryTreeProcessor.reconstructFromTraversals(preorder, inorder);
      
      expect(reconstructed).not.toBeNull();
      expect(reconstructed!.val).toBe(3);
      expect(reconstructed!.left!.val).toBe(9);
      expect(reconstructed!.right!.val).toBe(20);
    });

    test('should reconstruct tree from postorder and inorder', () => {
      const postorder = [9, 15, 7, 20, 3];
      const inorder = [9, 3, 15, 20, 7];
      
      const reconstructed = BinaryTreeProcessor.reconstructFromTraversals(undefined, inorder, postorder);
      
      expect(reconstructed).not.toBeNull();
      expect(reconstructed!.val).toBe(3);
    });

    test('should handle invalid traversal combinations', () => {
      const preorder = [1, 2, 3];
      const inorder = [3, 2, 1];
      
      const reconstructed = BinaryTreeProcessor.reconstructFromTraversals(preorder, inorder);
      expect(reconstructed).not.toBeNull();
    });

    test('should handle empty traversals', () => {
      const reconstructed = BinaryTreeProcessor.reconstructFromTraversals([], []);
      expect(reconstructed).toBeNull();
    });
  });

  describe('Tree analysis', () => {
    test('should analyze tree comprehensively', () => {
      const analysis = processor.analyzeTree();
      
      expect(analysis.height).toBe(3);
      expect(analysis.nodeCount).toBe(5);
      expect(analysis.leafCount).toBe(3); // 9, 15, 7
      expect(analysis.isBalanced).toBeDefined();
      expect(analysis.isSymmetric).toBeDefined();
      expect(analysis.isComplete).toBeDefined();
      expect(analysis.isPerfect).toBeDefined();
      expect(analysis.diameter).toBeGreaterThan(0);
      expect(analysis.maxWidth).toBeGreaterThan(0);
    });

    test('should analyze single node tree', () => {
      const singleNode = new TreeNode(42);
      const singleProcessor = new BinaryTreeProcessor(singleNode);
      const analysis = singleProcessor.analyzeTree();
      
      expect(analysis.height).toBe(1);
      expect(analysis.nodeCount).toBe(1);
      expect(analysis.leafCount).toBe(1);
      expect(analysis.diameter).toBe(1);
      expect(analysis.isBalanced).toBe(true);
      expect(analysis.isComplete).toBe(true);
      expect(analysis.isPerfect).toBe(true);
    });

    test('should analyze empty tree', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      const analysis = emptyProcessor.analyzeTree();
      
      expect(analysis.height).toBe(0);
      expect(analysis.nodeCount).toBe(0);
      expect(analysis.leafCount).toBe(0);
      expect(analysis.diameter).toBe(0);
    });
  });

  describe('Path finding', () => {
    test('should find path between two nodes', () => {
      const path = processor.findPath(9, 7);
      
      expect(path.length).toBeGreaterThan(0);
      expect(path[0]).toBe(9);
      expect(path[path.length - 1]).toBe(7);
    });

    test('should handle path to same node', () => {
      const path = processor.findPath(3, 3);
      
      expect(path).toEqual([3]);
    });

    test('should handle non-existent nodes', () => {
      const path = processor.findPath(3, 100);
      
      expect(path).toEqual([]);
    });
  });

  describe('Boundary traversal', () => {
    test('should perform boundary traversal', () => {
      const boundary = processor.boundaryTraversal();
      
      expect(boundary.length).toBeGreaterThan(0);
      expect(boundary[0]).toBe(3); // Root should be first
      expect(boundary).toContain(9); // Left boundary
      expect(boundary).toContain(15); // Leaf
      expect(boundary).toContain(7); // Leaf
    });

    test('should handle single node boundary', () => {
      const singleNode = new TreeNode(42);
      const singleProcessor = new BinaryTreeProcessor(singleNode);
      const boundary = singleProcessor.boundaryTraversal();
      
      expect(boundary).toEqual([42]);
    });

    test('should handle empty tree boundary', () => {
      const emptyProcessor = new BinaryTreeProcessor(null);
      const boundary = emptyProcessor.boundaryTraversal();
      
      expect(boundary).toEqual([]);
    });
  });

  describe('Tree manipulation', () => {
    test('should set new root', () => {
      const newRoot = new TreeNode(100);
      processor.setRoot(newRoot);
      
      expect(processor.getRoot()).toBe(newRoot);
      
      const result = processor.getAllTraversals();
      expect(result.preorder).toEqual([100]);
    });

    test('should clear cache', () => {
      // Perform some operations to populate cache
      processor.getAllTraversals();
      
      // Clear cache
      processor.clearCache();
      
      // Should still work after cache clear
      const result = processor.getAllTraversals();
      expect(result.preorder).toEqual([3, 9, 20, 15, 7]);
    });
  });

  describe('Utility functions', () => {
    test('should create tree from array representation', () => {
      const arr = [3, 9, 20, null, null, 15, 7];
      const tree = createTreeFromArray(arr);
      
      expect(tree).not.toBeNull();
      expect(tree!.val).toBe(3);
      expect(tree!.left!.val).toBe(9);
      expect(tree!.right!.val).toBe(20);
      expect(tree!.left!.left).toBeNull();
      expect(tree!.left!.right).toBeNull();
      expect(tree!.right!.left!.val).toBe(15);
      expect(tree!.right!.right!.val).toBe(7);
    });

    test('should convert tree to array representation', () => {
      const arr = treeToArray(root);
      
      expect(arr).toContain(3);
      expect(arr).toContain(9);
      expect(arr).toContain(20);
      expect(arr).toContain(15);
      expect(arr).toContain(7);
      expect(arr).toContain(null); // For missing nodes
    });

    test('should handle empty tree in utility functions', () => {
      const emptyTree = createTreeFromArray([]);
      expect(emptyTree).toBeNull();
      
      const emptyArray = treeToArray(null);
      expect(emptyArray).toEqual([]);
    });

    test('should handle single element array', () => {
      const singleTree = createTreeFromArray([42]);
      expect(singleTree).not.toBeNull();
      expect(singleTree!.val).toBe(42);
      expect(singleTree!.left).toBeNull();
      expect(singleTree!.right).toBeNull();
    });
  });

  describe('Complex tree structures', () => {
    test('should handle left-skewed tree', () => {
      const leftSkewed = new TreeNode(1);
      leftSkewed.left = new TreeNode(2);
      leftSkewed.left.left = new TreeNode(3);
      
      const processor = new BinaryTreeProcessor(leftSkewed);
      const analysis = processor.analyzeTree();
      
      expect(analysis.height).toBe(3);
      expect(analysis.isBalanced).toBe(false);
      expect(analysis.nodeCount).toBe(3);
    });

    test('should handle right-skewed tree', () => {
      const rightSkewed = new TreeNode(1);
      rightSkewed.right = new TreeNode(2);
      rightSkewed.right.right = new TreeNode(3);
      
      const processor = new BinaryTreeProcessor(rightSkewed);
      const analysis = processor.analyzeTree();
      
      expect(analysis.height).toBe(3);
      expect(analysis.isBalanced).toBe(false);
      expect(analysis.nodeCount).toBe(3);
    });

    test('should handle perfect binary tree', () => {
      const perfect = new TreeNode(1);
      perfect.left = new TreeNode(2);
      perfect.right = new TreeNode(3);
      perfect.left.left = new TreeNode(4);
      perfect.left.right = new TreeNode(5);
      perfect.right.left = new TreeNode(6);
      perfect.right.right = new TreeNode(7);
      
      const processor = new BinaryTreeProcessor(perfect);
      const analysis = processor.analyzeTree();
      
      expect(analysis.isPerfect).toBe(true);
      expect(analysis.isComplete).toBe(true);
      expect(analysis.isBalanced).toBe(true);
      expect(analysis.nodeCount).toBe(7);
      expect(analysis.leafCount).toBe(4);
    });

    test('should handle symmetric tree', () => {
      const symmetric = new TreeNode(1);
      symmetric.left = new TreeNode(2);
      symmetric.right = new TreeNode(2);
      symmetric.left.left = new TreeNode(3);
      symmetric.left.right = new TreeNode(4);
      symmetric.right.left = new TreeNode(4);
      symmetric.right.right = new TreeNode(3);
      
      const processor = new BinaryTreeProcessor(symmetric);
      const analysis = processor.analyzeTree();
      
      expect(analysis.isSymmetric).toBe(true);
    });
  });
});
