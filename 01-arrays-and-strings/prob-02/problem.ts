/**
 * Problem: Valid Palindrome
 * 
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
 * and removing all non-alphanumeric characters, it reads the same forward and backward. 
 * Alphanumeric characters include letters and numbers.
 * 
 * Given a string s, return true if it is a palindrome, or false otherwise.
 * 
 * Example 1:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 * 
 * Example 2:
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 * 
 * Example 3:
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 * 
 * Constraints:
 * - 1 <= s.length <= 2 * 105
 * - s consists only of printable ASCII characters.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

/**
 * SOLUTION APPROACH 1: TWO POINTERS (OPTIMAL)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - if we clean in place, O(n) for the cleaned string
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. CLEAN THE STRING:
 *    - Convert to lowercase: s.toLowerCase()
 *    - Remove non-alphanumeric: use regex /[^a-z0-9]/g with replace()
 *
 * 2. USE TWO POINTERS:
 *    - left pointer starts at 0
 *    - right pointer starts at cleaned.length - 1
 *
 * 3. COMPARE CHARACTERS:
 *    - While left < right:
 *      - If cleaned[left] !== cleaned[right], return false
 *      - Move left++ and right--
 *
 * 4. RETURN true if all characters match
 *
 * EXAMPLE WALKTHROUGH:
 * s = "A man, a plan, a canal: Panama"
 * cleaned = "amanaplanacanalpanama"
 * left=0, right=20: 'a' === 'a' ✓
 * left=1, right=19: 'm' === 'm' ✓
 * ... continue until left >= right
 */
export function isPalindrome(s: string): boolean {
    // TODO: Implement the two pointers solution
    // 1. Clean the string: s.toLowerCase().replace(/[^a-z0-9]/g, '')
    // 2. Initialize left = 0, right = cleaned.length - 1
    // 3. While left < right:
    //    - If cleaned[left] !== cleaned[right], return false
    //    - Increment left, decrement right
    // 4. Return true

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 2: BUILT-IN METHODS (LESS OPTIMAL)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - for the reversed string
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. CLEAN THE STRING (same as approach 1)
 * 2. REVERSE THE CLEANED STRING:
 *    - Split into array: cleaned.split('')
 *    - Reverse the array: .reverse()
 *    - Join back to string: .join('')
 * 3. COMPARE original cleaned string with reversed string
 */
export function isPalindromeBuiltIn(s: string): boolean {
    // TODO: Implement using built-in methods
    // 1. Clean the string
    // 2. Compare cleaned === cleaned.split('').reverse().join('')

    throw new Error("Not implemented - follow the step-by-step guide above");
}

/**
 * SOLUTION APPROACH 3: RECURSIVE (EDUCATIONAL)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - for recursion stack
 *
 * STEP-BY-STEP IMPLEMENTATION GUIDE:
 *
 * 1. CLEAN THE STRING (same as approach 1)
 * 2. BASE CASES:
 *    - If length <= 1, return true
 * 3. RECURSIVE CASE:
 *    - If first !== last character, return false
 *    - Recursively check the substring without first and last characters
 */
export function isPalindromeRecursive(s: string): boolean {
    // TODO: Implement recursive solution
    // 1. Clean the string
    // 2. Base case: if cleaned.length <= 1, return true
    // 3. If cleaned[0] !== cleaned[cleaned.length - 1], return false
    // 4. Return isPalindromeRecursive(cleaned.slice(1, -1))

    throw new Error("Not implemented - follow the step-by-step guide above");
}