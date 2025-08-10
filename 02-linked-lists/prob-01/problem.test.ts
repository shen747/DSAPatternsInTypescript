/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
    reverseListIterative, 
    reverseListRecursive, 
    reverseListStack,
    createLinkedList,
    linkedListToArray} from './problem';

describe('Reverse Linked List Problem', () => {
    describe('reverseListIterative - Iterative Solution', () => {
        test('should reverse a linked list with multiple nodes', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const reversed = reverseListIterative(head);
            expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should reverse a linked list with two nodes', () => {
            const head = createLinkedList([1, 2]);
            const reversed = reverseListIterative(head);
            expect(linkedListToArray(reversed)).toEqual([2, 1]);
        });

        test('should handle empty linked list', () => {
            const head = createLinkedList([]);
            const reversed = reverseListIterative(head);
            expect(linkedListToArray(reversed)).toEqual([]);
        });

        test('should handle single node', () => {
            const head = createLinkedList([1]);
            const reversed = reverseListIterative(head);
            expect(linkedListToArray(reversed)).toEqual([1]);
        });

        test('should handle negative numbers', () => {
            const head = createLinkedList([-1, -2, -3]);
            const reversed = reverseListIterative(head);
            expect(linkedListToArray(reversed)).toEqual([-3, -2, -1]);
        });
    });

    describe('reverseListRecursive - Recursive Solution', () => {
        test('should reverse a linked list with multiple nodes', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should reverse a linked list with two nodes', () => {
            const head = createLinkedList([1, 2]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([2, 1]);
        });

        test('should handle empty linked list', () => {
            const head = createLinkedList([]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([]);
        });

        test('should handle single node', () => {
            const head = createLinkedList([1]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([1]);
        });

        test('should handle negative numbers', () => {
            const head = createLinkedList([-1, -2, -3]);
            const reversed = reverseListRecursive(head);
            expect(linkedListToArray(reversed)).toEqual([-3, -2, -1]);
        });
    });

    describe('reverseListStack - Stack Solution', () => {
        test('should reverse a linked list with multiple nodes', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            const reversed = reverseListStack(head);
            expect(linkedListToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
        });

        test('should reverse a linked list with two nodes', () => {
            const head = createLinkedList([1, 2]);
            const reversed = reverseListStack(head);
            expect(linkedListToArray(reversed)).toEqual([2, 1]);
        });

        test('should handle empty linked list', () => {
            const head = createLinkedList([]);
            const reversed = reverseListStack(head);
            expect(linkedListToArray(reversed)).toEqual([]);
        });

        test('should handle single node', () => {
            const head = createLinkedList([1]);
            const reversed = reverseListStack(head);
            expect(linkedListToArray(reversed)).toEqual([1]);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [
            [1, 2, 3, 4, 5],
            [1, 2],
            [],
            [1],
            [-1, -2, -3],
            [1, 2, 3],
            [10, 20, 30, 40]
        ];

        testCases.forEach(testCase => {
            test(`all solutions should return same result for: [${testCase.join(', ')}]`, () => {
                const head1 = createLinkedList(testCase);
                const head2 = createLinkedList(testCase);
                const head3 = createLinkedList(testCase);
                
                const result1 = reverseListIterative(head1);
                const result2 = reverseListRecursive(head2);
                const result3 = reverseListStack(head3);
                
                const array1 = linkedListToArray(result1);
                const array2 = linkedListToArray(result2);
                const array3 = linkedListToArray(result3);
                
                expect(array1).toEqual(array2);
                expect(array2).toEqual(array3);
            });
        });
    });

    describe('Helper Functions', () => {
        test('createLinkedList should create correct structure', () => {
            const head = createLinkedList([1, 2, 3]);
            expect(head?.val).toBe(1);
            expect(head?.next?.val).toBe(2);
            expect(head?.next?.next?.val).toBe(3);
            expect(head?.next?.next?.next).toBe(null);
        });

        test('linkedListToArray should convert correctly', () => {
            const head = createLinkedList([1, 2, 3, 4, 5]);
            expect(linkedListToArray(head)).toEqual([1, 2, 3, 4, 5]);
        });

        test('should handle empty array', () => {
            const head = createLinkedList([]);
            expect(linkedListToArray(head)).toEqual([]);
        });
    });
}); 