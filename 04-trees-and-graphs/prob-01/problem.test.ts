/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
    maxDepthRecursive, 
    maxDepthBFS, 
    maxDepthDFS, 
    createBinaryTree,
} from './problem';

describe('Maximum Depth of Binary Tree Problem', () => {
    describe('maxDepthRecursive - Recursive Solution', () => {
        test('should return correct depth for balanced tree', () => {
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(maxDepthRecursive(root)).toBe(3);
        });

        test('should return correct depth for unbalanced tree', () => {
            const root = createBinaryTree([1, null, 2]);
            expect(maxDepthRecursive(root)).toBe(2);
        });

        test('should return 0 for null root', () => {
            expect(maxDepthRecursive(null)).toBe(0);
        });

        test('should return 1 for single node', () => {
            const root = createBinaryTree([1]);
            expect(maxDepthRecursive(root)).toBe(1);
        });

        test('should handle left-skewed tree', () => {
            const root = createBinaryTree([1, 2, null, 3, null, 4]);
            expect(maxDepthRecursive(root)).toBe(4);
        });

        test('should handle right-skewed tree', () => {
            const root = createBinaryTree([1, null, 2, null, null, null, 3]);
            expect(maxDepthRecursive(root)).toBe(3);
        });

        test('should handle complex tree structure', () => {
            const root = createBinaryTree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(maxDepthRecursive(root)).toBe(4);
        });
    });

    describe('maxDepthBFS - BFS Solution', () => {
        test('should return correct depth for balanced tree', () => {
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(maxDepthBFS(root)).toBe(3);
        });

        test('should return correct depth for unbalanced tree', () => {
            const root = createBinaryTree([1, null, 2]);
            expect(maxDepthBFS(root)).toBe(2);
        });

        test('should return 0 for null root', () => {
            expect(maxDepthBFS(null)).toBe(0);
        });

        test('should return 1 for single node', () => {
            const root = createBinaryTree([1]);
            expect(maxDepthBFS(root)).toBe(1);
        });

        test('should handle left-skewed tree', () => {
            const root = createBinaryTree([1, 2, null, 3, null, 4]);
            expect(maxDepthBFS(root)).toBe(4);
        });

        test('should handle right-skewed tree', () => {
            const root = createBinaryTree([1, null, 2, null, null, null, 3]);
            expect(maxDepthBFS(root)).toBe(3);
        });
    });

    describe('maxDepthDFS - DFS Solution', () => {
        test('should return correct depth for balanced tree', () => {
            const root = createBinaryTree([3, 9, 20, null, null, 15, 7]);
            expect(maxDepthDFS(root)).toBe(3);
        });

        test('should return correct depth for unbalanced tree', () => {
            const root = createBinaryTree([1, null, 2]);
            expect(maxDepthDFS(root)).toBe(2);
        });

        test('should return 0 for null root', () => {
            expect(maxDepthDFS(null)).toBe(0);
        });

        test('should return 1 for single node', () => {
            const root = createBinaryTree([1]);
            expect(maxDepthDFS(root)).toBe(1);
        });

        test('should handle left-skewed tree', () => {
            const root = createBinaryTree([1, 2, null, 3, null, 4]);
            expect(maxDepthDFS(root)).toBe(4);
        });

        test('should handle right-skewed tree', () => {
            const root = createBinaryTree([1, null, 2, null, null, null, 3]);
            expect(maxDepthDFS(root)).toBe(3);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [
            [3, 9, 20, null, null, 15, 7],
            [1, null, 2],
            [1],
            [1, 2, null, 3, null, 4],
            [1, null, 2, null, null, null, 3],
            [1, 2, 3, 4, 5, 6, 7, 8],
            [1, 2, 3, null, null, 4, 5],
            []
        ];

        testCases.forEach((testCase, index) => {
            test(`all solutions should return same result for test case ${index + 1}`, () => {
                const root = createBinaryTree(testCase);
                const result1 = maxDepthRecursive(root);
                const result2 = maxDepthBFS(root);
                const result3 = maxDepthDFS(root);
                
                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            });
        });
    });

    describe('Helper Functions', () => {
        test('createBinaryTree should create correct structure', () => {
            const root = createBinaryTree([1, 2, 3, 4, 5]);
            expect(root?.val).toBe(1);
            expect(root?.left?.val).toBe(2);
            expect(root?.right?.val).toBe(3);
            expect(root?.left?.left?.val).toBe(4);
            expect(root?.left?.right?.val).toBe(5);
        });

        test('createBinaryTree should handle null values', () => {
            const root = createBinaryTree([1, null, 2, null, null, 3, 4]);
            expect(root?.val).toBe(1);
            expect(root?.left).toBe(null);
            expect(root?.right?.val).toBe(2);
            expect(root?.right?.left?.val).toBe(3);
            expect(root?.right?.right?.val).toBe(4);
        });

        test('createBinaryTree should return null for empty array', () => {
            expect(createBinaryTree([])).toBe(null);
        });

        test('createBinaryTree should return null for null root', () => {
            expect(createBinaryTree([null])).toBe(null);
        });
    });

    describe('Edge Cases', () => {
        test('should handle very deep tree', () => {
            const values: (number | null)[] = [1];
            for (let i = 0; i < 1000; i++) {
                values.push(null, 1);
            }
            const root = createBinaryTree(values);
            expect(maxDepthRecursive(root)).toBe(1001);
        });

        test('should handle tree with negative values', () => {
            const root = createBinaryTree([-1, -2, -3, -4, -5]);
            expect(maxDepthRecursive(root)).toBe(3);
        });

        test('should handle tree with large values', () => {
            const root = createBinaryTree([100, 200, 300, 400, 500]);
            expect(maxDepthRecursive(root)).toBe(3);
        });
    });
}); 