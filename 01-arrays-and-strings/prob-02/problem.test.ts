/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { isPalindrome, isPalindromeBuiltIn, isPalindromeRecursive } from './problem';

describe('Valid Palindrome Problem', () => {
    describe('isPalindrome - Two Pointers Solution', () => {
        test('should return true for valid palindrome with punctuation', () => {
            expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
        });

        test('should return false for non-palindrome', () => {
            expect(isPalindrome("race a car")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isPalindrome(" ")).toBe(true);
        });

        test('should return true for single character', () => {
            expect(isPalindrome("a")).toBe(true);
        });

        test('should handle numbers and letters', () => {
            expect(isPalindrome("0P")).toBe(false);
        });

        test('should handle palindrome with numbers', () => {
            expect(isPalindrome("12321")).toBe(true);
        });

        test('should handle mixed case letters', () => {
            expect(isPalindrome("RaceCar")).toBe(true);
        });

        test('should handle string with only punctuation', () => {
            expect(isPalindrome(".,")).toBe(true);
        });

        test('should handle long palindrome', () => {
            expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
        });
    });

    describe('isPalindromeBuiltIn - Built-in Methods Solution', () => {
        test('should return true for valid palindrome with punctuation', () => {
            expect(isPalindromeBuiltIn("A man, a plan, a canal: Panama")).toBe(true);
        });

        test('should return false for non-palindrome', () => {
            expect(isPalindromeBuiltIn("race a car")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isPalindromeBuiltIn(" ")).toBe(true);
        });

        test('should handle numbers and letters', () => {
            expect(isPalindromeBuiltIn("0P")).toBe(false);
        });

        test('should handle palindrome with numbers', () => {
            expect(isPalindromeBuiltIn("12321")).toBe(true);
        });
    });

    describe('isPalindromeRecursive - Recursive Solution', () => {
        test('should return true for valid palindrome with punctuation', () => {
            expect(isPalindromeRecursive("A man, a plan, a canal: Panama")).toBe(true);
        });

        test('should return false for non-palindrome', () => {
            expect(isPalindromeRecursive("race a car")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isPalindromeRecursive(" ")).toBe(true);
        });

        test('should handle numbers and letters', () => {
            expect(isPalindromeRecursive("0P")).toBe(false);
        });

        test('should handle palindrome with numbers', () => {
            expect(isPalindromeRecursive("12321")).toBe(true);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [
            "A man, a plan, a canal: Panama",
            "race a car",
            " ",
            "0P",
            "12321",
            "RaceCar",
            ".,",
            "Was it a car or a cat I saw?",
            "hello world",
            "madam",
            "123 321"
        ];

        testCases.forEach(testCase => {
            test(`all solutions should return same result for: "${testCase}"`, () => {
                const result1 = isPalindrome(testCase);
                const result2 = isPalindromeBuiltIn(testCase);
                const result3 = isPalindromeRecursive(testCase);
                
                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            });
        });
    });
}); 