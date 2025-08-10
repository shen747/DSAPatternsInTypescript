/**
 * Problem: Two Sum
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers 
 * such that they add up to target. You may assume that each input would have exactly one 
 * solution, and you may not use the same element twice.
 * 
 * You can return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 * 
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 * 
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 * 
 * Constraints:
 * - 2 <= nums.length <= 104
 * - -109 <= nums[i] <= 109
 * - -109 <= target <= 109
 * - Only one valid answer exists.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

/**
 * SOLUTION APPROACH 1: HASH MAP (OPTIMAL)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. CREATE A HASH MAP to store numbers and their indices
 *    - Key: the number value
 *    - Value: the index of that number
 *
 * 2. ITERATE through the array once:
 *    - For each number, calculate its complement: complement = target - current_number
 *    - Check if the complement exists in the hash map
 *    - If YES: return [complement_index, current_index]
 *    - If NO: add current number and its index to the hash map
 *
 * 3. RETURN empty array if no solution found (though problem guarantees one solution)
 *
 * EXAMPLE WALKTHROUGH:
 * nums = [2, 7, 11, 15], target = 9
 *
 * i=0: num=2, complement=9-2=7, map={}, 7 not found, add 2->0, map={2:0}
 * i=1: num=7, complement=9-7=2, map={2:0}, 2 found at index 0, return [0,1]
 */
export function twoSum(nums: number[], target: number): number[] {
    // TODO: Implement the hash map solution
    // 1. Create a Map<number, number>() to store value -> index mapping
    // 2. Loop through nums array with index i
    // 3. Calculate complement = target - nums[i]
    // 4. Check if map.has(complement)
    // 5. If yes, return [map.get(complement), i]
    // 6. If no, map.set(nums[i], i)
    // 7. Return [] if no solution (shouldn't happen per problem constraints)

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 2: BRUTE FORCE (FOR COMPARISON)
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. USE TWO NESTED LOOPS:
 *    - Outer loop: i from 0 to nums.length-1
 *    - Inner loop: j from i+1 to nums.length-1
 *
 * 2. FOR EACH PAIR (i, j):
 *    - Check if nums[i] + nums[j] === target
 *    - If YES: return [i, j]
 *
 * 3. RETURN empty array if no solution found
 *
 * NOTE: This approach is less efficient but easier to understand
 */
export function twoSumBruteForce(nums: number[], target: number): number[] {
    // TODO: Implement the brute force solution
    // 1. Outer loop: for (let i = 0; i < nums.length; i++)
    // 2. Inner loop: for (let j = i + 1; j < nums.length; j++)
    // 3. Check if nums[i] + nums[j] === target
    // 4. If yes, return [i, j]
    // 5. Return [] if no solution found

    throw new Error("Not implemented - follow the step-by-step guide above");
}