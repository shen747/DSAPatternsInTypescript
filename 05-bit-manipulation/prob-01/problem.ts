/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * Problem: Number of 1 Bits (Hamming Weight)
 * 
 * Write a function that takes an unsigned integer and returns the number of '1' bits 
 * it has (also known as the Hamming weight).
 * 
 * Note:
 * - Note that in some languages, such as Java, there is no unsigned integer type. 
 *   In this case, the input will be given as a signed integer type. It should not 
 *   affect your implementation, as the integer's internal binary representation is 
 *   the same, whether it is signed or unsigned.
 * - In Java, the compiler represents the signed integers using 2's complement notation. 
 *   Therefore, in Example 3, the input represents the signed integer -3.
 * 
 * Example 1:
 * Input: n = 00000000000000000000000000001011
 * Output: 3
 * Explanation: The input binary string 00000000000000000000000000001011 has a total 
 * of three '1' bits.
 * 
 * Example 2:
 * Input: n = 00000000000000000000000010000000
 * Output: 1
 * Explanation: The input binary string 00000000000000000000000010000000 has a total 
 * of one '1' bit.
 * 
 * Example 3:
 * Input: n = 11111111111111111111111111111101
 * Output: 31
 * Explanation: The input binary string 11111111111111111111111111111101 has a total 
 * of thirty one '1' bits.
 * 
 * Constraints:
 * - The input must be a binary string of length 32.
 * 
 * Follow up: If this function is called many times, how would you optimize it?
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

/**
 * SOLUTION APPROACH 1: BRIAN KERNIGHAN'S ALGORITHM (OPTIMAL)
 * Time Complexity: O(k) - where k is number of 1 bits
 * Space Complexity: O(1)
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. INITIALIZE count = 0
 * 2. WHILE n is not 0:
 *    - Use n & (n-1) to remove the rightmost 1 bit
 *    - Increment count
 * 3. RETURN count
 *
 * KEY INSIGHT: n & (n-1) removes the rightmost 1 bit
 * Example: 12 (1100) & 11 (1011) = 8 (1000)
 */
export function hammingWeight(n: number): number {
    // TODO: Implement Brian Kernighan's algorithm
    // 1. Initialize count = 0
    // 2. While n !== 0:
    //    - n = n & (n - 1)  // removes rightmost 1 bit
    //    - count++
    // 3. Return count

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 2: BUILT-IN METHODS (SIMPLE)
 * Time Complexity: O(32) = O(1)
 * Space Complexity: O(32) = O(1)
 */
export function hammingWeightBuiltIn(n: number): number {
    // TODO: Implement using built-in methods
    // 1. Convert to binary string: n.toString(2)
    // 2. Split into array and filter for '1' bits
    // 3. Return length

    throw new Error("Not implemented - follow the step-by-step guide above");
}

// Solution using bit shifting
export function hammingWeightBitShift(n: number): number {
    let count = 0;
    
    for (let i = 0; i < 32; i++) {
        if ((n & (1 << i)) !== 0) {
            count++;
        }
    }
    
    return count;
}

// Solution using lookup table (for optimization when called many times)
const LOOKUP_TABLE = new Array(256).fill(0).map((_, i) => {
    let count = 0;
    let num = i;
    while (num > 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
});

export function hammingWeightLookup(n: number): number {
    let count = 0;
    
    // Process 8 bits at a time
    for (let i = 0; i < 4; i++) {
        count += LOOKUP_TABLE[n & 0xFF]!;
        n >>= 8;
    }
    
    return count;
}

// Recursive solution
export function hammingWeightRecursive(n: number): number {
    if (n === 0) return 0;
    return (n & 1) + hammingWeightRecursive(n >>> 1);
} 