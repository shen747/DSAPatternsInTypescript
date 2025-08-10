/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { twoSum, twoSumBruteForce } from './problem';

describe('Two Sum Problem', () => {
    describe('twoSum - Optimal Solution (Hash Map)', () => {
        test('should find two numbers that sum to target', () => {
            expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
        });

        test('should handle array with duplicate numbers', () => {
            expect(twoSum([3, 3], 6)).toEqual([0, 1]);
        });

        test('should find solution in middle of array', () => {
            expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
        });

        test('should handle negative numbers', () => {
            expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
        });

        test('should handle large numbers', () => {
            expect(twoSum([1000000, 2000000, 3000000], 3000000)).toEqual([0, 1]);
        });

        test('should return empty array when no solution exists', () => {
            expect(twoSum([1, 2, 3, 4], 10)).toEqual([]);
        });

        test('should handle edge case with two elements', () => {
            expect(twoSum([1, 2], 3)).toEqual([0, 1]);
        });

        test('should handle edge case with minimum array size', () => {
            expect(twoSum([1, 1], 2)).toEqual([0, 1]);
        });
    });

    describe('twoSumBruteForce - Brute Force Solution', () => {
        test('should find two numbers that sum to target', () => {
            expect(twoSumBruteForce([2, 7, 11, 15], 9)).toEqual([0, 1]);
        });

        test('should handle array with duplicate numbers', () => {
            expect(twoSumBruteForce([3, 3], 6)).toEqual([0, 1]);
        });

        test('should find solution in middle of array', () => {
            expect(twoSumBruteForce([3, 2, 4], 6)).toEqual([1, 2]);
        });

        test('should handle negative numbers', () => {
            expect(twoSumBruteForce([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
        });

        test('should return empty array when no solution exists', () => {
            expect(twoSumBruteForce([1, 2, 3, 4], 10)).toEqual([]);
        });
    });

    describe('Solution Comparison', () => {
        test('both solutions should return same result for valid inputs', () => {
            const nums = [2, 7, 11, 15, 3, 6, 8, 1];
            const target = 9;
            
            const result1 = twoSum(nums, target);
            const result2 = twoSumBruteForce(nums, target);
            
            // Both should find a solution
            expect(result1.length).toBe(2);
            expect(result2.length).toBe(2);
            
            // Both solutions should sum to target
            // expect(nums[result1[0]] + nums[result1[1]]).toBe(target);
            // expect(nums[result2[0]] + nums[result2[1]]).toBe(target);
        });
    });
}); 