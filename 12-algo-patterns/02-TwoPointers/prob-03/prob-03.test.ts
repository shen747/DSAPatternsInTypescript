import {
  isSubsequence,
  numMatchingSubseq,
  numMatchingSubseqOptimized,
  numMatchingSubseqAdvanced,
  generateTestCase,
  validateApproaches,
  comparePerformance
} from './prob-03';

describe('Problem 3: Subsequence Counting with Two Pointers', () => {
  
  describe('isSubsequence - Basic Helper Function', () => {
    test('should return true for valid subsequences', () => {
      expect(isSubsequence('abcde', 'ace')).toBe(true);
      expect(isSubsequence('abcde', 'a')).toBe(true);
      expect(isSubsequence('abcde', 'acd')).toBe(true);
      expect(isSubsequence('abcde', 'abcde')).toBe(true);
      expect(isSubsequence('abcde', '')).toBe(true);
    });

    test('should return false for invalid subsequences', () => {
      expect(isSubsequence('abcde', 'aec')).toBe(false);
      expect(isSubsequence('abcde', 'bb')).toBe(false);
      expect(isSubsequence('abcde', 'xyz')).toBe(false);
      expect(isSubsequence('abcde', 'abcdef')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(isSubsequence('', '')).toBe(true);
      expect(isSubsequence('', 'a')).toBe(false);
      expect(isSubsequence('a', '')).toBe(true);
      expect(isSubsequence('a', 'a')).toBe(true);
    });
  });

  describe('numMatchingSubseq - Basic Approach', () => {
    test('should solve example 1 correctly', () => {
      const s = 'abcde';
      const words = ['a', 'bb', 'acd', 'ace'];
      const expected = 3;
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should solve example 2 correctly', () => {
      const s = 'dsahjpjauf';
      const words = ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax'];
      const expected = 2;
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should handle edge cases', () => {
      expect(numMatchingSubseq('abc', [])).toBe(0);
      expect(numMatchingSubseq('', ['a', 'b'])).toBe(0);
      expect(numMatchingSubseq('', [''])).toBe(1);
      expect(numMatchingSubseq('abc', ['', 'a', 'ab', 'abc'])).toBe(4);
    });

    test('should handle all matching words', () => {
      const s = 'abcdefghijk';
      const words = ['a', 'ab', 'abc', 'ace', 'aei'];
      const expected = 5;
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should handle no matching words', () => {
      const s = 'abcde';
      const words = ['xyz', 'pqr', 'lmn'];
      const expected = 0;
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should handle repeated characters', () => {
      const s = 'aabbcc';
      const words = ['a', 'aa', 'aab', 'abc', 'aabbcc', 'aaabbbccc'];
      const expected = 5; // All except 'aaabbbccc'
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });
  });

  describe('numMatchingSubseqOptimized - Optimized Approach', () => {
    test('should solve example 1 correctly', () => {
      const s = 'abcde';
      const words = ['a', 'bb', 'acd', 'ace'];
      const expected = 3;
      expect(numMatchingSubseqOptimized(s, words)).toBe(expected);
    });

    test('should solve example 2 correctly', () => {
      const s = 'dsahjpjauf';
      const words = ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax'];
      const expected = 2;
      expect(numMatchingSubseqOptimized(s, words)).toBe(expected);
    });

    test('should handle complex cases', () => {
      const s = 'abcdefghijklmnopqrstuvwxyz';
      const words = ['ace', 'aei', 'aou', 'xyz', 'abcdefghijklmnopqrstuvwxyz'];
      const expected = 5;
      expect(numMatchingSubseqOptimized(s, words)).toBe(expected);
    });

    test('should handle edge cases', () => {
      expect(numMatchingSubseqOptimized('abc', [])).toBe(0);
      expect(numMatchingSubseqOptimized('', ['a', 'b'])).toBe(0);
      expect(numMatchingSubseqOptimized('', [''])).toBe(1);
    });
  });

  describe('numMatchingSubseqAdvanced - Advanced Bucket Approach', () => {
    test('should solve example 1 correctly', () => {
      const s = 'abcde';
      const words = ['a', 'bb', 'acd', 'ace'];
      const expected = 3;
      expect(numMatchingSubseqAdvanced(s, words)).toBe(expected);
    });

    test('should solve example 2 correctly', () => {
      const s = 'dsahjpjauf';
      const words = ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax'];
      const expected = 2;
      expect(numMatchingSubseqAdvanced(s, words)).toBe(expected);
    });

    test('should handle large inputs efficiently', () => {
      const s = 'a'.repeat(1000) + 'b'.repeat(1000) + 'c'.repeat(1000);
      const words = ['abc', 'aabbcc', 'a', 'b', 'c', 'ab', 'bc', 'ac'];
      const expected = 8;
      expect(numMatchingSubseqAdvanced(s, words)).toBe(expected);
    });

    test('should handle edge cases', () => {
      expect(numMatchingSubseqAdvanced('abc', [])).toBe(0);
      expect(numMatchingSubseqAdvanced('', ['a', 'b'])).toBe(0);
      expect(numMatchingSubseqAdvanced('', [''])).toBe(1);
    });
  });

  describe('Approach Validation', () => {
    test('all approaches should give same results for example cases', () => {
      const testCases = [
        { s: 'abcde', words: ['a', 'bb', 'acd', 'ace'] },
        { s: 'dsahjpjauf', words: ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax'] },
        { s: '', words: [''] },
        { s: 'abc', words: [] },
        { s: 'aabbcc', words: ['a', 'aa', 'aab', 'abc', 'aabbcc'] }
      ];

      testCases.forEach(({ s, words }) => {
        expect(validateApproaches(s, words)).toBe(true);
      });
    });

    test('should validate with randomly generated test cases', () => {
      for (let i = 0; i < 10; i++) {
        const { s, words } = generateTestCase(50, 20, 10);
        expect(validateApproaches(s, words)).toBe(true);
      }
    });
  });

  describe('Performance Tests', () => {
    test('should handle medium-sized inputs', () => {
      const s = 'abcdefghijklmnopqrstuvwxyz'.repeat(10);
      const words = [];
      for (let i = 0; i < 100; i++) {
        words.push('ace', 'bdf', 'xyz', 'aei', 'ou');
      }

      const basic = numMatchingSubseq(s, words);
      const optimized = numMatchingSubseqOptimized(s, words);
      const advanced = numMatchingSubseqAdvanced(s, words);

      expect(basic).toBe(optimized);
      expect(optimized).toBe(advanced);
    });

    test('performance comparison should work', () => {
      const s = 'abcdefghijklmnopqrstuvwxyz';
      const words = ['ace', 'bdf', 'xyz', 'aei', 'ou'];

      const results = comparePerformance(s, words);

      expect(results.basic.result).toBe(results.optimized.result);
      expect(results.optimized.result).toBe(results.advanced.result);
      expect(results.basic.time).toBeGreaterThan(0);
      expect(results.optimized.time).toBeGreaterThan(0);
      expect(results.advanced.time).toBeGreaterThan(0);
    });
  });

  describe('Stress Tests', () => {
    test('should handle strings with repeated patterns', () => {
      const s = 'abcabc'.repeat(100);
      const words = ['abc', 'ab', 'bc', 'ac', 'a', 'b', 'c'];
      
      const result = numMatchingSubseq(s, words);
      expect(result).toBe(7);
      expect(validateApproaches(s, words)).toBe(true);
    });

    test('should handle many short words', () => {
      const s = 'abcdefghijklmnopqrstuvwxyz';
      const words = [];
      
      // Generate all single characters
      for (let i = 0; i < 26; i++) {
        words.push(String.fromCharCode(97 + i));
      }
      
      const result = numMatchingSubseq(s, words);
      expect(result).toBe(26);
      expect(validateApproaches(s, words)).toBe(true);
    });

    test('should handle words longer than string', () => {
      const s = 'abc';
      const words = ['abcd', 'abcde', 'abcdefg'];
      
      const result = numMatchingSubseq(s, words);
      expect(result).toBe(0);
      expect(validateApproaches(s, words)).toBe(true);
    });

    test('should handle identical words', () => {
      const s = 'abcde';
      const words = ['ace', 'ace', 'ace', 'bb', 'bb'];
      
      const result = numMatchingSubseq(s, words);
      expect(result).toBe(3); // Three 'ace' subsequences
      expect(validateApproaches(s, words)).toBe(true);
    });
  });

  describe('Edge Cases and Corner Cases', () => {
    test('should handle single character string and words', () => {
      expect(numMatchingSubseq('a', ['a'])).toBe(1);
      expect(numMatchingSubseq('a', ['b'])).toBe(0);
      expect(numMatchingSubseq('a', ['a', 'a', 'a'])).toBe(3);
    });

    test('should handle empty words in array', () => {
      const s = 'abc';
      const words = ['', 'a', '', 'ab', ''];
      const expected = 5; // Three empty strings + 'a' + 'ab'
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should handle string with all same characters', () => {
      const s = 'aaaaaaa';
      const words = ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa'];
      const expected = 7; // All except the last one
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });

    test('should handle reverse order subsequences', () => {
      const s = 'abcde';
      const words = ['edcba', 'eca', 'db', 'ea'];
      const expected = 0; // None are valid subsequences
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });
  });

  describe('Real-world Scenarios', () => {
    test('should handle DNA sequence matching', () => {
      const dnaSequence = 'atcgatcgatcg';
      const patterns = ['atg', 'atc', 'gat', 'tcg', 'atcg'];

      const result = numMatchingSubseq(dnaSequence, patterns);
      expect(result).toBeGreaterThan(0);
      expect(validateApproaches(dnaSequence, patterns)).toBe(true);
    });

    test('should handle text pattern matching', () => {
      const text = 'thequickbrownfoxjumpsoverthelazydog';
      const patterns = ['the', 'quick', 'fox', 'dog', 'cat', 'xyz'];
      
      const result = numMatchingSubseq(text, patterns);
      expect(result).toBe(4); // 'the', 'quick', 'fox', 'dog'
      expect(validateApproaches(text, patterns)).toBe(true);
    });
  });
});

/**
 * ADDITIONAL TEST UTILITIES FOR MANUAL TESTING
 */

// Uncomment and run these for manual performance testing
/*
console.log('=== Performance Test Results ===');

const largeS = 'abcdefghijklmnopqrstuvwxyz'.repeat(100);
const largeWords = [];
for (let i = 0; i < 1000; i++) {
  largeWords.push('ace', 'bdf', 'xyz', 'aei', 'ou');
}

const perfResults = comparePerformance(largeS, largeWords);
console.log('Basic approach:', perfResults.basic);
console.log('Optimized approach:', perfResults.optimized);
console.log('Advanced approach:', perfResults.advanced);

console.log('=== Validation Test ===');
console.log('All approaches agree:', validateApproaches(largeS, largeWords));
*/
