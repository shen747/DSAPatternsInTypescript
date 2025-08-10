/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { minWindowMultiPattern, minWindowSinglePattern, findAllValidWindows, WindowResult } from './prob-01';

describe('Sliding Window Pattern - Problem 1: Minimum Window Substring with Multiple Patterns', () => {
  describe('minWindowMultiPattern', () => {
    test('should find minimum window for multiple patterns', () => {
      const s = "ADOBECODEBANC";
      const patterns = ["ABC", "BC"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      expect(result.minLength).toBeGreaterThan(0);
      expect(result.totalValidWindows).toBeGreaterThanOrEqual(result.minWindows.length);
      expect(result.metrics.expansions).toBeGreaterThan(0);
      
      // Verify all minimum windows contain required patterns
      result.minWindows.forEach(window => {
        expect(window.length).toBe(result.minLength);
        // Should contain A, B, C (from ABC) and B, C (from BC) = A:1, B:2, C:2 minimum
        const charCount = new Map<string, number>();
        for (const char of window) {
          charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        expect(charCount.get('A') || 0).toBeGreaterThanOrEqual(1);
        expect(charCount.get('B') || 0).toBeGreaterThanOrEqual(2);
        expect(charCount.get('C') || 0).toBeGreaterThanOrEqual(2);
      });
    });

    test('should return empty result when no valid window exists', () => {
      const s = "a";
      const patterns = ["aa"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows).toHaveLength(0);
      expect(result.minLength).toBe(-1);
      expect(result.totalValidWindows).toBe(0);
    });

    test('should handle single character patterns', () => {
      const s = "abcdef";
      const patterns = ["a", "f"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      expect(result.minLength).toBe(6); // entire string
      expect(result.minWindows[0]).toBe("abcdef");
    });

    test('should handle overlapping patterns', () => {
      const s = "aabbcc";
      const patterns = ["abc", "ab"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      // Should need A:2, B:2, C:1 minimum
      result.minWindows.forEach(window => {
        const charCount = new Map<string, number>();
        for (const char of window) {
          charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        expect(charCount.get('a') || 0).toBeGreaterThanOrEqual(2);
        expect(charCount.get('b') || 0).toBeGreaterThanOrEqual(2);
        expect(charCount.get('c') || 0).toBeGreaterThanOrEqual(1);
      });
    });

    test('should handle duplicate patterns', () => {
      const s = "aaabbbccc";
      const patterns = ["abc", "abc"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      // Should need A:2, B:2, C:2 minimum
      result.minWindows.forEach(window => {
        const charCount = new Map<string, number>();
        for (const char of window) {
          charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        expect(charCount.get('a') || 0).toBeGreaterThanOrEqual(2);
        expect(charCount.get('b') || 0).toBeGreaterThanOrEqual(2);
        expect(charCount.get('c') || 0).toBeGreaterThanOrEqual(2);
      });
    });

    test('should track performance metrics correctly', () => {
      const s = "ADOBECODEBANC";
      const patterns = ["ABC"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.metrics.expansions).toBeGreaterThan(0);
      expect(result.metrics.validWindowsFound).toBeGreaterThan(0);
      expect(result.metrics.validWindowsFound).toBe(result.totalValidWindows);
    });

    test('should handle empty patterns array', () => {
      const s = "abc";
      const patterns: string[] = [];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows).toHaveLength(0);
      expect(result.minLength).toBe(-1);
    });

    test('should handle empty string', () => {
      const s = "";
      const patterns = ["abc"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows).toHaveLength(0);
      expect(result.minLength).toBe(-1);
      expect(result.totalValidWindows).toBe(0);
    });

    test('should find multiple minimum windows of same length', () => {
      const s = "abcabc";
      const patterns = ["abc"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minLength).toBe(3);
      // Could potentially find "abc" at positions 0-2 and 3-5
      result.minWindows.forEach(window => {
        expect(window.length).toBe(3);
        expect(window).toMatch(/abc/);
      });
    });
  });

  describe('minWindowSinglePattern', () => {
    test('should optimize for single pattern case', () => {
      const s = "ADOBECODEBANC";
      const pattern = "ABC";
      const result = minWindowSinglePattern(s, pattern);
      
      expect(result.length).toBeGreaterThan(0);
      
      // Verify result contains all characters from pattern
      const charCount = new Map<string, number>();
      for (const char of result) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
      }
      expect(charCount.get('A') || 0).toBeGreaterThanOrEqual(1);
      expect(charCount.get('B') || 0).toBeGreaterThanOrEqual(1);
      expect(charCount.get('C') || 0).toBeGreaterThanOrEqual(1);
    });

    test('should return empty string when no valid window exists', () => {
      const s = "abc";
      const pattern = "xyz";
      const result = minWindowSinglePattern(s, pattern);
      
      expect(result).toBe("");
    });

    test('should handle pattern longer than string', () => {
      const s = "ab";
      const pattern = "abc";
      const result = minWindowSinglePattern(s, pattern);
      
      expect(result).toBe("");
    });
  });

  describe('findAllValidWindows', () => {
    test('should find all valid windows with positions', () => {
      const s = "abcabc";
      const patterns = ["abc"];
      const result = findAllValidWindows(s, patterns);
      
      expect(result.length).toBeGreaterThan(0);
      
      result.forEach(window => {
        expect(window.start).toBeGreaterThanOrEqual(0);
        expect(window.end).toBeLessThan(s.length);
        expect(window.start).toBeLessThanOrEqual(window.end);
        expect(window.content).toBe(s.substring(window.start, window.end + 1));
        
        // Verify window contains required pattern
        const charCount = new Map<string, number>();
        for (const char of window.content) {
          charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        expect(charCount.get('a') || 0).toBeGreaterThanOrEqual(1);
        expect(charCount.get('b') || 0).toBeGreaterThanOrEqual(1);
        expect(charCount.get('c') || 0).toBeGreaterThanOrEqual(1);
      });
    });

    test('should not return duplicate windows', () => {
      const s = "aaabbbccc";
      const patterns = ["abc"];
      const result = findAllValidWindows(s, patterns);
      
      const windowStrings = result.map(w => w.content);
      const uniqueWindows = new Set(windowStrings);
      expect(uniqueWindows.size).toBe(windowStrings.length);
    });

    test('should return empty array when no valid windows exist', () => {
      const s = "abc";
      const patterns = ["xyz"];
      const result = findAllValidWindows(s, patterns);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('Edge cases and performance', () => {
    test('should handle very long strings efficiently', () => {
      const s = "a".repeat(1000) + "bc" + "a".repeat(1000);
      const patterns = ["abc"];
      
      const startTime = Date.now();
      const result = minWindowMultiPattern(s, patterns);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should be fast
      expect(result.minWindows.length).toBeGreaterThan(0);
    });

    test('should handle many small patterns', () => {
      const s = "abcdefghijklmnopqrstuvwxyz";
      const patterns = s.split('').slice(0, 10); // First 10 characters as individual patterns
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      expect(result.minLength).toBe(10); // Should need exactly 10 characters
    });

    test('should handle patterns with repeated characters', () => {
      const s = "aaaaabbbbbccccc";
      const patterns = ["aaa", "bbb", "ccc"];
      const result = minWindowMultiPattern(s, patterns);
      
      expect(result.minWindows.length).toBeGreaterThan(0);
      result.minWindows.forEach(window => {
        const charCount = new Map<string, number>();
        for (const char of window) {
          charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        expect(charCount.get('a') || 0).toBeGreaterThanOrEqual(3);
        expect(charCount.get('b') || 0).toBeGreaterThanOrEqual(3);
        expect(charCount.get('c') || 0).toBeGreaterThanOrEqual(3);
      });
    });

    test('should handle case sensitivity correctly', () => {
      const s = "AaBbCc";
      const patterns = ["ABC"];
      const result = minWindowMultiPattern(s, patterns);
      
      // Should distinguish between uppercase and lowercase
      expect(result.minWindows.length).toBeGreaterThan(0);
      result.minWindows.forEach(window => {
        expect(window).toContain('A');
        expect(window).toContain('B');
        expect(window).toContain('C');
      });
    });
  });
});
