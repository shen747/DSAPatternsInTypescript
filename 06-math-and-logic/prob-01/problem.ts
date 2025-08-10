/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * Problem: Fizz Buzz
 * 
 * Given an integer n, return a string array answer (1-indexed) where:
 * - answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
 * - answer[i] == "Fizz" if i is divisible by 3.
 * - answer[i] == "Buzz" if i is divisible by 5.
 * - answer[i] == i (as a string) if none of the above conditions are true.
 * 
 * Example 1:
 * Input: n = 3
 * Output: ["1","2","Fizz"]
 * 
 * Example 2:
 * Input: n = 5
 * Output: ["1","2","Fizz","4","Buzz"]
 * 
 * Example 3:
 * Input: n = 15
 * Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
 * 
 * Constraints:
 * - 1 <= n <= 104
 */

// Basic solution with if-else statements
export function fizzBuzz(n: number): string[] {
    const result: string[] = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }
    
    return result;
}

// Solution using string concatenation
export function fizzBuzzConcat(n: number): string[] {
    const result: string[] = [];
    
    for (let i = 1; i <= n; i++) {
        let str = "";
        
        if (i % 3 === 0) str += "Fizz";
        if (i % 5 === 0) str += "Buzz";
        
        result.push(str || i.toString());
    }
    
    return result;
}

// Solution using Map for extensibility
export function fizzBuzzMap(n: number): string[] {
    const result: string[] = [];
    const fizzBuzzMap = new Map([
        [3, "Fizz"],
        [5, "Buzz"]
    ]);
    
    for (let i = 1; i <= n; i++) {
        let str = "";
        
        for (const [divisor, word] of fizzBuzzMap) {
            if (i % divisor === 0) {
                str += word;
            }
        }
        
        result.push(str || i.toString());
    }
    
    return result;
}

// Solution using array methods
export function fizzBuzzArray(n: number): string[] {
    return Array.from({ length: n }, (_, i) => {
        const num = i + 1;
        let str = "";
        
        if (num % 3 === 0) str += "Fizz";
        if (num % 5 === 0) str += "Buzz";
        
        return str || num.toString();
    });
}

// Recursive solution
export function fizzBuzzRecursive(n: number): string[] {
    if (n === 0) return [];
    
    const prev = fizzBuzzRecursive(n - 1);
    let str = "";
    
    if (n % 3 === 0) str += "Fizz";
    if (n % 5 === 0) str += "Buzz";
    
    prev.push(str || n.toString());
    return prev;
} 