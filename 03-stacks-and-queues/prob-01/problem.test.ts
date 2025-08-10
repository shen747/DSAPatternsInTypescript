/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { isValid, isValidMap, isValidRecursive } from './problem';

describe('Valid Parentheses Problem', () => {
    describe('isValid - Stack Solution', () => {
        test('should return true for simple valid parentheses', () => {
            expect(isValid("()")).toBe(true);
        });

        test('should return true for multiple valid parentheses', () => {
            expect(isValid("()[]{}")).toBe(true);
        });

        test('should return false for mismatched parentheses', () => {
            expect(isValid("(]")).toBe(false);
        });

        test('should return false for wrong order', () => {
            expect(isValid("([)]")).toBe(false);
        });

        test('should return true for nested valid parentheses', () => {
            expect(isValid("{[]}")).toBe(true);
        });

        test('should return false for single opening bracket', () => {
            expect(isValid("(")).toBe(false);
        });

        test('should return false for single closing bracket', () => {
            expect(isValid(")")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isValid("")).toBe(true);
        });

        test('should handle complex nested structures', () => {
            expect(isValid("({[]})")).toBe(true);
        });

        test('should handle multiple nested structures', () => {
            expect(isValid("((()))")).toBe(true);
        });
    });

    describe('isValidMap - Map Solution', () => {
        test('should return true for simple valid parentheses', () => {
            expect(isValidMap("()")).toBe(true);
        });

        test('should return true for multiple valid parentheses', () => {
            expect(isValidMap("()[]{}")).toBe(true);
        });

        test('should return false for mismatched parentheses', () => {
            expect(isValidMap("(]")).toBe(false);
        });

        test('should return false for wrong order', () => {
            expect(isValidMap("([)]")).toBe(false);
        });

        test('should return true for nested valid parentheses', () => {
            expect(isValidMap("{[]}")).toBe(true);
        });

        test('should return false for single opening bracket', () => {
            expect(isValidMap("(")).toBe(false);
        });

        test('should return false for single closing bracket', () => {
            expect(isValidMap(")")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isValidMap("")).toBe(true);
        });
    });

    describe('isValidRecursive - Recursive Solution', () => {
        test('should return true for simple valid parentheses', () => {
            expect(isValidRecursive("()")).toBe(true);
        });

        test('should return true for multiple valid parentheses', () => {
            expect(isValidRecursive("()[]{}")).toBe(true);
        });

        test('should return false for mismatched parentheses', () => {
            expect(isValidRecursive("(]")).toBe(false);
        });

        test('should return false for wrong order', () => {
            expect(isValidRecursive("([)]")).toBe(false);
        });

        test('should return true for nested valid parentheses', () => {
            expect(isValidRecursive("{[]}")).toBe(true);
        });

        test('should return false for single opening bracket', () => {
            expect(isValidRecursive("(")).toBe(false);
        });

        test('should return false for single closing bracket', () => {
            expect(isValidRecursive(")")).toBe(false);
        });

        test('should return true for empty string', () => {
            expect(isValidRecursive("")).toBe(true);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [
            "()",
            "()[]{}",
            "(]",
            "([)]",
            "{[]}",
            "(",
            ")",
            "",
            "({[]})",
            "((()))",
            "([{}])",
            "(((",
            ")))",
            "({)}",
            "{[()]}"
        ];

        testCases.forEach(testCase => {
            test(`all solutions should return same result for: "${testCase}"`, () => {
                const result1 = isValid(testCase);
                const result2 = isValidMap(testCase);
                const result3 = isValidRecursive(testCase);
                
                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle very long valid string', () => {
            const longString = "()".repeat(1000);
            expect(isValid(longString)).toBe(true);
        });

        test('should handle very long invalid string', () => {
            const longString = "(".repeat(1000);
            expect(isValid(longString)).toBe(false);
        });

        test('should handle alternating brackets', () => {
            expect(isValid("()()()")).toBe(true);
        });

        test('should handle deeply nested brackets', () => {
            expect(isValid("((((()))))")).toBe(true);
        });
    });
}); 