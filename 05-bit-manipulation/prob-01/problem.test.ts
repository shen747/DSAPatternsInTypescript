/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
    hammingWeight, 
    hammingWeightBuiltIn, 
    hammingWeightBitShift, 
    hammingWeightLookup, 
    hammingWeightRecursive 
} from './problem';

describe('Number of 1 Bits (Hamming Weight) Problem', () => {
    describe('hammingWeight - Brian Kernighan\'s Algorithm', () => {
        test('should return correct count for example 1', () => {
            expect(hammingWeight(0b00000000000000000000000000001011)).toBe(3);
        });

        test('should return correct count for example 2', () => {
            expect(hammingWeight(0b00000000000000000000000010000000)).toBe(1);
        });

        test('should return correct count for example 3', () => {
            expect(hammingWeight(0b11111111111111111111111111111101)).toBe(31);
        });

        test('should return 0 for zero', () => {
            expect(hammingWeight(0)).toBe(0);
        });

        test('should return 1 for power of 2', () => {
            expect(hammingWeight(1)).toBe(1);
            expect(hammingWeight(2)).toBe(1);
            expect(hammingWeight(4)).toBe(1);
            expect(hammingWeight(8)).toBe(1);
        });

        test('should return correct count for all ones', () => {
            expect(hammingWeight(0b11111111111111111111111111111111)).toBe(32);
        });

        test('should handle negative numbers', () => {
            expect(hammingWeight(-1)).toBe(32);
            expect(hammingWeight(-3)).toBe(31);
        });
    });

    describe('hammingWeightBuiltIn - Built-in Method', () => {
        test('should return correct count for example 1', () => {
            expect(hammingWeightBuiltIn(0b00000000000000000000000000001011)).toBe(3);
        });

        test('should return correct count for example 2', () => {
            expect(hammingWeightBuiltIn(0b00000000000000000000000010000000)).toBe(1);
        });

        test('should return correct count for example 3', () => {
            expect(hammingWeightBuiltIn(0b11111111111111111111111111111101)).toBe(31);
        });

        test('should return 0 for zero', () => {
            expect(hammingWeightBuiltIn(0)).toBe(0);
        });

        test('should return 1 for power of 2', () => {
            expect(hammingWeightBuiltIn(1)).toBe(1);
            expect(hammingWeightBuiltIn(2)).toBe(1);
            expect(hammingWeightBuiltIn(4)).toBe(1);
            expect(hammingWeightBuiltIn(8)).toBe(1);
        });
    });

    describe('hammingWeightBitShift - Bit Shifting', () => {
        test('should return correct count for example 1', () => {
            expect(hammingWeightBitShift(0b00000000000000000000000000001011)).toBe(3);
        });

        test('should return correct count for example 2', () => {
            expect(hammingWeightBitShift(0b00000000000000000000000010000000)).toBe(1);
        });

        test('should return correct count for example 3', () => {
            expect(hammingWeightBitShift(0b11111111111111111111111111111101)).toBe(31);
        });

        test('should return 0 for zero', () => {
            expect(hammingWeightBitShift(0)).toBe(0);
        });

        test('should return 1 for power of 2', () => {
            expect(hammingWeightBitShift(1)).toBe(1);
            expect(hammingWeightBitShift(2)).toBe(1);
            expect(hammingWeightBitShift(4)).toBe(1);
            expect(hammingWeightBitShift(8)).toBe(1);
        });
    });

    describe('hammingWeightLookup - Lookup Table', () => {
        test('should return correct count for example 1', () => {
            expect(hammingWeightLookup(0b00000000000000000000000000001011)).toBe(3);
        });

        test('should return correct count for example 2', () => {
            expect(hammingWeightLookup(0b00000000000000000000000010000000)).toBe(1);
        });

        test('should return correct count for example 3', () => {
            expect(hammingWeightLookup(0b11111111111111111111111111111101)).toBe(31);
        });

        test('should return 0 for zero', () => {
            expect(hammingWeightLookup(0)).toBe(0);
        });

        test('should return 1 for power of 2', () => {
            expect(hammingWeightLookup(1)).toBe(1);
            expect(hammingWeightLookup(2)).toBe(1);
            expect(hammingWeightLookup(4)).toBe(1);
            expect(hammingWeightLookup(8)).toBe(1);
        });
    });

    describe('hammingWeightRecursive - Recursive', () => {
        test('should return correct count for example 1', () => {
            expect(hammingWeightRecursive(0b00000000000000000000000000001011)).toBe(3);
        });

        test('should return correct count for example 2', () => {
            expect(hammingWeightRecursive(0b00000000000000000000000010000000)).toBe(1);
        });

        test('should return correct count for example 3', () => {
            expect(hammingWeightRecursive(0b11111111111111111111111111111101)).toBe(31);
        });

        test('should return 0 for zero', () => {
            expect(hammingWeightRecursive(0)).toBe(0);
        });

        test('should return 1 for power of 2', () => {
            expect(hammingWeightRecursive(1)).toBe(1);
            expect(hammingWeightRecursive(2)).toBe(1);
            expect(hammingWeightRecursive(4)).toBe(1);
            expect(hammingWeightRecursive(8)).toBe(1);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [
            0b00000000000000000000000000001011, // 3
            0b00000000000000000000000010000000, // 1
            0b11111111111111111111111111111101, // 31
            0,                                  // 0
            1,                                  // 1
            2,                                  // 1
            4,                                  // 1
            8,                                  // 1
            15,                                 // 4
            255,                                // 8
            -1,                                 // 32
            -3,                                 // 31
            0b10101010101010101010101010101010, // 16
            0b11110000111100001111000011110000  // 16
        ];

        testCases.forEach((testCase, index) => {
            test(`all solutions should return same result for test case ${index + 1}`, () => {
                const result1 = hammingWeight(testCase);
                const result2 = hammingWeightBuiltIn(testCase);
                const result3 = hammingWeightBitShift(testCase);
                const result4 = hammingWeightLookup(testCase);
                const result5 = hammingWeightRecursive(testCase);
                
                expect(result1).toBe(result2);
                expect(result2).toBe(result3);
                expect(result3).toBe(result4);
                expect(result4).toBe(result5);
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle maximum 32-bit integer', () => {
            expect(hammingWeight(0x7FFFFFFF)).toBe(31);
        });

        test('should handle minimum 32-bit integer', () => {
            expect(hammingWeight(-0x80000000)).toBe(1);
        });

        test('should handle alternating bits', () => {
            expect(hammingWeight(0b10101010101010101010101010101010)).toBe(16);
            expect(hammingWeight(0b01010101010101010101010101010101)).toBe(16);
        });

        test('should handle consecutive ones', () => {
            expect(hammingWeight(0b11111111111111111111111111111111)).toBe(32);
            expect(hammingWeight(0b11111111111111110000000000000000)).toBe(16);
        });
    });

    describe('Performance Tests', () => {
        test('should handle large numbers efficiently', () => {
            const largeNumber = 0xFFFFFFFF;
            const start = Date.now();
            const result = hammingWeight(largeNumber);
            const end = Date.now();
            
            expect(result).toBe(32);
            expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
        });
    });
}); 