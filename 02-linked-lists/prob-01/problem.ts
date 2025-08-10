/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * Problem: Reverse Linked List
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Example 2:
 * Input: head = [1,2]
 * Output: [2,1]
 * 
 * Example 3:
 * Input: head = []
 * Output: []
 * 
 * Constraints:
 * - The number of nodes in the list is the range [0, 5000].
 * - -5000 <= Node.val <= 5000
 * 
 * Follow up: A linked list can be reversed either iteratively or recursively. 
 * Could you implement both solutions?
 */

// Definition for singly-linked list node
export class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val: number = 0, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to create a linked list from an array
export function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Helper function to convert linked list to array
export function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;
    
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

/**
 * SOLUTION APPROACH 1: ITERATIVE (OPTIMAL)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. INITIALIZE THREE POINTERS:
 *    - prev = null (will become the new tail)
 *    - current = head (current node being processed)
 *    - next = null (temporary storage for next node)
 *
 * 2. TRAVERSE THE LIST:
 *    - While current is not null:
 *      a. Store current.next in next variable
 *      b. Reverse the link: current.next = prev
 *      c. Move pointers forward: prev = current, current = next
 *
 * 3. RETURN prev (which is now the new head)
 *
 * VISUAL EXAMPLE:
 * Original: 1 -> 2 -> 3 -> null
 * Step 1:   null <- 1    2 -> 3 -> null
 * Step 2:   null <- 1 <- 2    3 -> null
 * Step 3:   null <- 1 <- 2 <- 3
 */
export function reverseListIterative(head: ListNode | null): ListNode | null {
    // TODO: Implement iterative reversal
    // 1. Initialize prev = null, current = head
    // 2. While current !== null:
    //    - Store next = current.next
    //    - Reverse link: current.next = prev
    //    - Move forward: prev = current, current = next
    // 3. Return prev

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 2: RECURSIVE
 * Time Complexity: O(n)
 * Space Complexity: O(n) - due to recursion stack
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. BASE CASE:
 *    - If head is null or head.next is null, return head
 *
 * 2. RECURSIVE CASE:
 *    - Recursively reverse the rest of the list
 *    - Reverse the current connection
 *    - Set current node's next to null
 *
 * VISUAL EXAMPLE:
 * Original: 1 -> 2 -> 3 -> null
 * Recurse to end, then reverse connections on the way back
 */
export function reverseListRecursive(head: ListNode | null): ListNode | null {
    // TODO: Implement recursive reversal
    // 1. Base case: if (!head || !head.next) return head
    // 2. Recursively reverse: newHead = reverseListRecursive(head.next)
    // 3. Reverse current connection: head.next.next = head
    // 4. Set head.next = null
    // 5. Return newHead

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 3: USING STACK (EDUCATIONAL)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - for the stack
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. PUSH ALL NODES TO STACK:
 *    - Traverse the list and push each node to stack
 *
 * 2. POP NODES AND REBUILD:
 *    - Pop nodes from stack (they come out in reverse order)
 *    - Connect them to form the reversed list
 *
 * NOTE: This approach uses extra space and is less efficient
 */
export function reverseListStack(head: ListNode | null): ListNode | null {
    // TODO: Implement stack-based reversal
    // 1. Handle edge case: if (!head) return null
    // 2. Push all nodes to stack
    // 3. Pop first node as new head
    // 4. Connect remaining nodes by popping from stack
    // 5. Set last node's next to null

    throw new Error("Not implemented - follow the step-by-step guide above");
}