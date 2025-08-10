/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * Problem: Maximum Depth of Binary Tree
 * 
 * Given the root of a binary tree, return its maximum depth.
 * 
 * A binary tree's maximum depth is the number of nodes along the longest path 
 * from the root node down to the farthest leaf node.
 * 
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 * 
 * Example 2:
 * Input: root = [1,null,2]
 * Output: 2
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 104].
 * - -100 <= Node.val <= 100
 */

// Definition for a binary tree node
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper function to create a binary tree from an array (level-order traversal)
export function createBinaryTree(values: (number | null)[]): TreeNode | null {
    if (values.length === 0 || values[0] === null) return null;
    
    const root = new TreeNode(values[0]!);
    const queue: (TreeNode | null)[] = [root];
    let i = 1;
    
    while (queue.length > 0 && i < values.length) {
        const node = queue.shift();

        if (node !== null && node !== undefined) {
            // Left child
            if (i < values.length && values[i] !== null) {
                node.left = new TreeNode(values[i]!);
                queue.push(node.left);
            } else {
                queue.push(null);
            }
            i++;
            
            // Right child
            if (i < values.length && values[i] !== null) {
                node.right = new TreeNode(values[i]!);
                queue.push(node.right);
            } else {
                queue.push(null);
            }
            i++;
        }
    }
    
    return root;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

/**
 * SOLUTION APPROACH 1: RECURSIVE DFS (OPTIMAL)
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(h) - where h is height of tree (recursion stack)
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. BASE CASE: If root is null, return 0
 * 2. RECURSIVE CASE:
 *    - Get depth of left subtree
 *    - Get depth of right subtree
 *    - Return max(leftDepth, rightDepth) + 1
 *
 * EXAMPLE WALKTHROUGH:
 * Tree:     3
 *          / \
 *         9   20
 *            /  \
 *           15   7
 *
 * maxDepth(3): max(maxDepth(9), maxDepth(20)) + 1
 * maxDepth(9): max(maxDepth(null), maxDepth(null)) + 1 = 0 + 0 + 1 = 1
 * maxDepth(20): max(maxDepth(15), maxDepth(7)) + 1 = max(1, 1) + 1 = 2
 * Result: max(1, 2) + 1 = 3
 */
export function maxDepthRecursive(root: TreeNode | null): number {
    // TODO: Implement recursive DFS solution
    // 1. Base case: if (!root) return 0
    // 2. Get left depth: maxDepthRecursive(root.left)
    // 3. Get right depth: maxDepthRecursive(root.right)
    // 4. Return Math.max(leftDepth, rightDepth) + 1

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 2: ITERATIVE BFS (LEVEL-ORDER)
 * Time Complexity: O(n)
 * Space Complexity: O(w) - where w is maximum width of tree
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. HANDLE EDGE CASE: If root is null, return 0
 * 2. INITIALIZE: queue with root, depth counter = 0
 * 3. PROCESS LEVEL BY LEVEL:
 *    - Get current level size
 *    - Process all nodes in current level
 *    - Add children to queue for next level
 *    - Increment depth after processing each level
 * 4. RETURN final depth
 */
export function maxDepthBFS(root: TreeNode | null): number {
    // TODO: Implement BFS solution
    // 1. Edge case: if (!root) return 0
    // 2. Initialize queue with root, depth = 0
    // 3. While queue not empty:
    //    - Get levelSize = queue.length
    //    - Process all nodes in current level
    //    - Add children to queue
    //    - Increment depth
    // 4. Return depth

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 3: ITERATIVE DFS (STACK)
 * Time Complexity: O(n)
 * Space Complexity: O(h) - where h is height of tree
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. HANDLE EDGE CASE: If root is null, return 0
 * 2. INITIALIZE: stack with {node: root, depth: 1}, maxDepth = 0
 * 3. PROCESS NODES:
 *    - Pop node and its depth from stack
 *    - Update maxDepth if current depth is greater
 *    - Push children with incremented depth
 * 4. RETURN maxDepth
 */
export function maxDepthDFS(root: TreeNode | null): number {
    // TODO: Implement iterative DFS solution
    // 1. Edge case: if (!root) return 0
    // 2. Initialize stack with {node: root, depth: 1}, maxDepth = 0
    // 3. While stack not empty:
    //    - Pop {node, depth} from stack
    //    - Update maxDepth = Math.max(maxDepth, depth)
    //    - Push children with depth + 1
    // 4. Return maxDepth

    throw new Error("Not implemented - follow the step-by-step guide above");
        
        if (node.left) {
            stack.push({ node: node.left, depth: depth + 1 });
        }
    }
    
    return maxDepth;
} 