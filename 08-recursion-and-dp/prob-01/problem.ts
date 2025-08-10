/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * Problem: Climbing Stairs
 * 
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * 
 * Example 1:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 * 
 * Example 2:
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 * 
 * Constraints:
 * - 1 <= n <= 45
 */

// Recursive solution (inefficient for large n)
export function climbStairsRecursive(n: number): number {
    if (n <= 2) return n;
    return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

// Dynamic programming solution with memoization
export function climbStairsMemo(n: number): number {
    const memo = new Map<number, number>();
    
    function climb(n: number): number {
        if (n <= 2) return n;
        
        if (memo.has(n)) {
            return memo.get(n)!;
        }
        
        const result = climb(n - 1) + climb(n - 2);
        memo.set(n, result);
        return result;
    }
    
    return climb(n);
}

// Dynamic programming solution with bottom-up approach
export function climbStairsDP(n: number): number {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space-optimized dynamic programming solution
export function climbStairsOptimized(n: number): number {
    if (n <= 2) return n;
    
    let prev1 = 1;  // dp[i-1]
    let prev2 = 2;  // dp[i-2]
    let current = 0;
    
    for (let i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return current;
}

// Mathematical solution using Binet's formula (Fibonacci)
export function climbStairsMath(n: number): number {
    if (n <= 2) return n;
    
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;
    
    return Math.round((Math.pow(phi, n + 1) - Math.pow(psi, n + 1)) / Math.sqrt(5));
}

// Matrix exponentiation solution
export function climbStairsMatrix(n: number): number {
    if (n <= 2) return n;
    
    function matrixMultiply(a: number[][], b: number[][]): number[][] {
        // Ensure matrices are 2x2 and all elements exist
        if (!a[0] || !a[1] || !b[0] || !b[1] ||
            a[0].length < 2 || a[1].length < 2 ||
            b[0].length < 2 || b[1].length < 2) {
            throw new Error('Invalid matrix dimensions');
        }

        return [
            [a[0][0]! * b[0][0]! + a[0][1]! * b[1][0]!, a[0][0]! * b[0][1]! + a[0][1]! * b[1][1]!],
            [a[1][0]! * b[0][0]! + a[1][1]! * b[1][0]!, a[1][0]! * b[0][1]! + a[1][1]! * b[1][1]!]
        ];
    }
    
    function matrixPower(matrix: number[][], power: number): number[][] {
        if (power === 0) return [[1, 0], [0, 1]];
        if (power === 1) return matrix;
        
        const half = matrixPower(matrix, Math.floor(power / 2));
        const squared = matrixMultiply(half, half);
        
        if (power % 2 === 0) {
            return squared;
        } else {
            return matrixMultiply(squared, matrix);
        }
    }
    
    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n - 1);

    // Ensure result matrix has the expected structure
    if (!resultMatrix[0] || resultMatrix[0].length < 2) {
        throw new Error('Invalid result matrix');
    }

    return resultMatrix[0][0]! + resultMatrix[0][1]!
} 