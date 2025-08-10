/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
/**
 * PROBLEM 1: SUBARRAY SUM EQUALS K WITH COUNT AND INDICES
 * 
 * DIFFICULTY: Hard (FAANG Interview Level)
 * PATTERN: Prefix Sum + Hash Map
 * 
 * PROBLEM STATEMENT:
 * Given an array of integers `nums` and an integer `k`, return:
 * 1. The total number of continuous subarrays whose sum equals `k`
 * 2. All starting and ending indices of such subarrays
 * 3. The subarray with the maximum length among all valid subarrays
 * 
 * CONSTRAINTS:
 * - 1 <= nums.length <= 2 * 10^4
 * - -1000 <= nums[i] <= 1000
 * - -10^7 <= k <= 10^7
 * - Multiple subarrays can have the same sum
 * - Array can contain negative numbers, zeros, and positive numbers
 * 
 * EXAMPLES:
 * 
 * Example 1:
 * Input: nums = [1, 1, 1], k = 2
 * Output: {
 *   count: 2,
 *   indices: [[0, 1], [1, 2]],
 *   maxLengthSubarray: { start: 0, end: 1, length: 2 } // or [1, 2]
 * }
 * 
 * Example 2:
 * Input: nums = [1, 2, 3], k = 3
 * Output: {
 *   count: 2,
 *   indices: [[0, 2], [2, 2]],
 *   maxLengthSubarray: { start: 0, end: 2, length: 3 }
 * }
 * 
 * Example 3:
 * Input: nums = [1, -1, 0], k = 0
 * Output: {
 *   count: 3,
 *   indices: [[0, 1], [1, 2], [2, 2]],
 *   maxLengthSubarray: { start: 1, end: 2, length: 2 }
 * }
 * 
 * APPROACH HINTS:
 * 1. Use prefix sum to convert the problem to finding pairs of indices
 * 2. For each position i, we want to find all previous positions j where
 *    prefixSum[i] - prefixSum[j] = k, which means prefixSum[j] = prefixSum[i] - k
 * 3. Use a hash map to store prefix sums and their indices
 * 4. Handle the case where prefixSum[i] = k (subarray starts from index 0)
 * 5. Track the maximum length subarray while iterating
 * 
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(n)
 */

export interface SubarrayResult {
  count: number;
  indices: number[][];
  maxLengthSubarray: {
    start: number;
    end: number;
    length: number;
  } | null;
}

/**
 * Find all subarrays with sum equal to k and return comprehensive information
 * 
 * @param nums - Array of integers
 * @param k - Target sum
 * @returns Object containing count, indices, and max length subarray info
 */
export function subarraySum(nums: number[], k: number): SubarrayResult {
  // TODO: Implement this function
  // 
  // IMPLEMENTATION GUIDELINES:
  // 1. Initialize variables for tracking prefix sum, count, indices, and max length
  // 2. Use a Map to store prefix sums and their indices (handle multiple occurrences)
  // 3. Iterate through the array, updating prefix sum at each step
  // 4. For each position, check if (prefixSum - k) exists in the map
  // 5. If found, add all corresponding subarrays to the result
  // 6. Also check if prefixSum equals k (subarray from start)
  // 7. Update the map with current prefix sum and index
  // 8. Track the maximum length subarray found
  // 9. Return the comprehensive result
  
  throw new Error("Function not implemented");
}

/**
 * FOLLOW-UP QUESTIONS (for interview discussion):
 * 
 * 1. How would you modify this to find subarrays with sum in a given range [min, max]?
 * 2. What if we wanted to find the subarray with sum closest to k?
 * 3. How would you handle the case where we want exactly m subarrays with sum k?
 * 4. Can you solve this problem if the array was given as a stream?
 * 5. How would you extend this to 2D arrays (submatrices with sum k)?
 * 6. What if we wanted to minimize/maximize the number of elements in valid subarrays?
 * 7. How would you handle very large arrays that don't fit in memory?
 */
