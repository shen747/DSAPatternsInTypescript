/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PalindromeAnalyzer, PalindromeInfo, PalindromeStats } from './prob-02';

describe('Two Pointers Pattern - Problem 2: Palindromic Substrings with Advanced Operations', () => {
  describe('Basic palindrome detection', () => {
    test('should count palindromes correctly for simple string', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const count = analyzer.countPalindromes();
      
      // Expected palindromes: "a"(4), "b"(1), "aa"(2), "aba"(1), "aabaa"(1) = 9 total
      expect(count).toBe(9);
    });

    test('should find longest palindrome correctly', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const longest = analyzer.longestPalindrome();
      
      expect(longest.content).toBe("aabaa");
      expect(longest.length).toBe(5);
      expect(longest.start).toBe(0);
      expect(longest.end).toBe(4);
    });

    test('should handle string with no palindromes longer than 1', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      const count = analyzer.countPalindromes();
      const longest = analyzer.longestPalindrome();
      
      expect(count).toBe(3); // "a", "b", "c"
      expect(longest.length).toBe(1);
      expect(["a", "b", "c"]).toContain(longest.content);
    });

    test('should handle single character string', () => {
      const analyzer = new PalindromeAnalyzer("a");
      const count = analyzer.countPalindromes();
      const longest = analyzer.longestPalindrome();
      
      expect(count).toBe(1);
      expect(longest.content).toBe("a");
      expect(longest.length).toBe(1);
    });

    test('should handle empty string', () => {
      const analyzer = new PalindromeAnalyzer("");
      const count = analyzer.countPalindromes();
      
      expect(count).toBe(0);
    });
  });

  describe('Character insertion operations', () => {
    test('should update palindrome count after insertion', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const originalCount = analyzer.countPalindromes();
      
      analyzer.insertChar(2, 'b'); // "aabbaa"
      const newCount = analyzer.countPalindromes();
      
      expect(analyzer.getString()).toBe("aabbaa");
      expect(newCount).toBeGreaterThan(originalCount);
    });

    test('should handle insertion at beginning', () => {
      const analyzer = new PalindromeAnalyzer("aba");
      analyzer.insertChar(0, 'a'); // "aaba"
      
      expect(analyzer.getString()).toBe("aaba");
      const count = analyzer.countPalindromes();
      expect(count).toBeGreaterThan(0);
    });

    test('should handle insertion at end', () => {
      const analyzer = new PalindromeAnalyzer("aba");
      analyzer.insertChar(3, 'a'); // "abaa"
      
      expect(analyzer.getString()).toBe("abaa");
      const longest = analyzer.longestPalindrome();
      expect(longest.length).toBeGreaterThanOrEqual(1);
    });

    test('should handle multiple insertions', () => {
      const analyzer = new PalindromeAnalyzer("a");
      analyzer.insertChar(1, 'b');
      analyzer.insertChar(2, 'a');
      
      expect(analyzer.getString()).toBe("aba");
      const longest = analyzer.longestPalindrome();
      expect(longest.content).toBe("aba");
    });
  });

  describe('Character deletion operations', () => {
    test('should update palindrome count after deletion', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const originalCount = analyzer.countPalindromes();
      
      analyzer.deleteChar(2); // Remove 'b', becomes "aaaa"
      const newCount = analyzer.countPalindromes();
      
      expect(analyzer.getString()).toBe("aaaa");
      expect(newCount).not.toBe(originalCount);
    });

    test('should handle deletion from beginning', () => {
      const analyzer = new PalindromeAnalyzer("abcba");
      analyzer.deleteChar(0); // "bcba"
      
      expect(analyzer.getString()).toBe("bcba");
      const count = analyzer.countPalindromes();
      expect(count).toBeGreaterThan(0);
    });

    test('should handle deletion from end', () => {
      const analyzer = new PalindromeAnalyzer("abcba");
      analyzer.deleteChar(4); // "abcb"
      
      expect(analyzer.getString()).toBe("abcb");
      const count = analyzer.countPalindromes();
      expect(count).toBeGreaterThan(0);
    });

    test('should handle deletion resulting in empty string', () => {
      const analyzer = new PalindromeAnalyzer("a");
      analyzer.deleteChar(0);
      
      expect(analyzer.getString()).toBe("");
      const count = analyzer.countPalindromes();
      expect(count).toBe(0);
    });
  });

  describe('Minimum insertions to make palindrome', () => {
    test('should return 0 for already palindromic string', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const minInsertions = analyzer.minInsertionsToMakePalindrome();
      
      expect(minInsertions).toBe(0);
    });

    test('should calculate correct insertions for non-palindromic string', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      const minInsertions = analyzer.minInsertionsToMakePalindrome();
      
      expect(minInsertions).toBe(2); // Can become "abcba" or "cbabc"
    });

    test('should handle single character', () => {
      const analyzer = new PalindromeAnalyzer("a");
      const minInsertions = analyzer.minInsertionsToMakePalindrome();
      
      expect(minInsertions).toBe(0);
    });

    test('should handle complex cases', () => {
      const analyzer = new PalindromeAnalyzer("abcdef");
      const minInsertions = analyzer.minInsertionsToMakePalindrome();
      
      expect(minInsertions).toBe(5); // Need to add 5 characters
    });
  });

  describe('Get palindromes of specific length', () => {
    test('should return all palindromes of length 1', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const palindromes = analyzer.getPalindromesOfLength(1);
      
      expect(palindromes).toContain("a");
      expect(palindromes).toContain("b");
      expect(palindromes.length).toBe(2); // Unique characters only
    });

    test('should return all palindromes of length 2', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const palindromes = analyzer.getPalindromesOfLength(2);
      
      expect(palindromes).toContain("aa");
      expect(palindromes.length).toBe(1);
    });

    test('should return empty array for impossible length', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      const palindromes = analyzer.getPalindromesOfLength(2);
      
      expect(palindromes).toHaveLength(0);
    });

    test('should handle length greater than string length', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      const palindromes = analyzer.getPalindromesOfLength(10);
      
      expect(palindromes).toHaveLength(0);
    });
  });

  describe('Comprehensive stats', () => {
    test('should provide complete palindrome statistics', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      const stats = analyzer.getStats();
      
      expect(stats).toHaveProperty('totalCount');
      expect(stats).toHaveProperty('longestPalindrome');
      expect(stats).toHaveProperty('allPalindromes');
      expect(stats).toHaveProperty('minInsertionsNeeded');
      
      expect(stats.totalCount).toBe(9);
      expect(stats.longestPalindrome.content).toBe("aabaa");
      expect(stats.minInsertionsNeeded).toBe(0);
      expect(stats.allPalindromes.length).toBe(9);
    });

    test('should update stats after modifications', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      const originalStats = analyzer.getStats();
      
      analyzer.insertChar(1, 'b'); // "abbc"
      const newStats = analyzer.getStats();
      
      expect(newStats.totalCount).not.toBe(originalStats.totalCount);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle invalid insertion index', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      
      expect(() => analyzer.insertChar(-1, 'x')).toThrow();
      expect(() => analyzer.insertChar(10, 'x')).toThrow();
    });

    test('should handle invalid deletion index', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      
      expect(() => analyzer.deleteChar(-1)).toThrow();
      expect(() => analyzer.deleteChar(5)).toThrow();
    });

    test('should handle deletion from empty string', () => {
      const analyzer = new PalindromeAnalyzer("");
      
      expect(() => analyzer.deleteChar(0)).toThrow();
    });

    test('should handle very long palindromes', () => {
      const longPalindrome = "a".repeat(100) + "b" + "a".repeat(100);
      const analyzer = new PalindromeAnalyzer(longPalindrome);
      
      const longest = analyzer.longestPalindrome();
      expect(longest.length).toBe(201);
    });
  });

  describe('Performance tests', () => {
    test('should handle moderately large strings efficiently', () => {
      const largeString = "abcdefghijklmnopqrstuvwxyz".repeat(10);
      
      const startTime = Date.now();
      const analyzer = new PalindromeAnalyzer(largeString);
      const count = analyzer.countPalindromes();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000);
      expect(count).toBe(largeString.length); // Only single characters are palindromes
    });

    test('should cache results for repeated operations', () => {
      const analyzer = new PalindromeAnalyzer("aabaa");
      
      const start1 = Date.now();
      const count1 = analyzer.countPalindromes();
      const end1 = Date.now();
      
      const start2 = Date.now();
      const count2 = analyzer.countPalindromes();
      const end2 = Date.now();
      
      expect(count1).toBe(count2);
      expect(end2 - start2).toBeLessThanOrEqual(end1 - start1); // Second call should be faster or equal
    });
  });

  describe('Complex scenarios', () => {
    test('should handle mixed operations correctly', () => {
      const analyzer = new PalindromeAnalyzer("abc");
      
      // Make it a palindrome
      analyzer.insertChar(3, 'b');
      analyzer.insertChar(4, 'a');
      
      expect(analyzer.getString()).toBe("abcba");
      expect(analyzer.minInsertionsToMakePalindrome()).toBe(0);
      
      // Break the palindrome
      analyzer.insertChar(2, 'x');
      expect(analyzer.minInsertionsToMakePalindrome()).toBeGreaterThan(0);
    });

    test('should maintain consistency across all operations', () => {
      const analyzer = new PalindromeAnalyzer("palindrome");
      
      const operations = [
        () => analyzer.insertChar(0, 'e'),
        () => analyzer.deleteChar(5),
        () => analyzer.insertChar(3, 'm'),
        () => analyzer.deleteChar(8)
      ];
      
      operations.forEach(op => op());
      
      const stats = analyzer.getStats();
      expect(stats.totalCount).toBeGreaterThan(0);
      expect(stats.allPalindromes.length).toBe(stats.totalCount);
    });
  });
});
