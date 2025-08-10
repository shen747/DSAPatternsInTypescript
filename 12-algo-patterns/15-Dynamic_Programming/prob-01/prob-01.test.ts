/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  LCSAnalyzer, 
  LCSAlgorithm, 
  SimilarityMetric,
  generateTestStrings,
  visualizeAlignment 
} from './prob-01';

describe('Dynamic Programming Pattern - Problem 1: Longest Common Subsequence with Advanced Analysis', () => {
  describe('LCSAnalyzer', () => {
    test('should find LCS of two strings correctly', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("ABCDGH", "AEDFHR");
      
      expect(result.lcs).toBe("ADH");
      expect(result.length).toBe(3);
      expect(result.similarity).toBeCloseTo(0.5);
      expect(result.algorithm).toBeDefined();
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
    });

    test('should handle identical strings', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("ABCD", "ABCD");
      
      expect(result.lcs).toBe("ABCD");
      expect(result.length).toBe(4);
      expect(result.similarity).toBe(1.0);
    });

    test('should handle completely different strings', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("ABCD", "EFGH");
      
      expect(result.lcs).toBe("");
      expect(result.length).toBe(0);
      expect(result.similarity).toBe(0.0);
    });

    test('should handle empty strings', () => {
      const analyzer = new LCSAnalyzer();
      
      const result1 = analyzer.findLCS("", "ABCD");
      expect(result1.lcs).toBe("");
      expect(result1.length).toBe(0);
      
      const result2 = analyzer.findLCS("ABCD", "");
      expect(result2.lcs).toBe("");
      expect(result2.length).toBe(0);
      
      const result3 = analyzer.findLCS("", "");
      expect(result3.lcs).toBe("");
      expect(result3.length).toBe(0);
    });

    test('should find all possible LCS sequences', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findAllLCS("ABC", "ACB");
      
      expect(result.allLCS.length).toBeGreaterThan(1);
      expect(result.allLCS).toContain("AC");
      expect(result.allLCS).toContain("AB");
      
      result.allLCS.forEach(lcs => {
        expect(lcs.length).toBe(result.length);
      });
    });

    test('should use different algorithms', () => {
      const analyzer = new LCSAnalyzer();
      
      const basicResult = analyzer.findLCS("ABCDGH", "AEDFHR", LCSAlgorithm.BASIC_DP);
      const optimizedResult = analyzer.findLCS("ABCDGH", "AEDFHR", LCSAlgorithm.SPACE_OPTIMIZED);
      const memoizedResult = analyzer.findLCS("ABCDGH", "AEDFHR", LCSAlgorithm.MEMOIZED);
      
      expect(basicResult.lcs).toBe(optimizedResult.lcs);
      expect(basicResult.lcs).toBe(memoizedResult.lcs);
      expect(basicResult.length).toBe(optimizedResult.length);
      expect(basicResult.length).toBe(memoizedResult.length);
      
      expect(basicResult.algorithm).toBe('basic-dp');
      expect(optimizedResult.algorithm).toBe('space-optimized');
      expect(memoizedResult.algorithm).toBe('memoized');
    });

    test('should handle multiple strings LCS', () => {
      const analyzer = new LCSAnalyzer();
      const strings = ["ABCD", "ACBD", "ABDC"];
      const result = analyzer.findMultiStringLCS(strings);
      
      expect(result.lcs.length).toBeGreaterThan(0);
      expect(result.length).toBeGreaterThan(0);
      expect(result.consensus).toBeDefined();
      expect(result.agreements).toBeGreaterThan(0);
      expect(result.agreements).toBeLessThanOrEqual(1);
      expect(result.stringCount).toBe(3);
    });

    test('should calculate edit distance', () => {
      const analyzer = new LCSAnalyzer();
      const distance = analyzer.calculateEditDistance("kitten", "sitting");
      
      expect(distance).toBe(3); // Known edit distance
    });

    test('should handle weighted characters', () => {
      const analyzer = new LCSAnalyzer();
      const weights = new Map([
        ['A', 2], ['B', 1], ['C', 3], ['D', 1]
      ]);
      
      const result = analyzer.findWeightedLCS("ABCD", "ACBD", weights);
      
      expect(result.lcs).toBeDefined();
      expect(result.weight).toBeGreaterThan(0);
      expect(result.weightedSimilarity).toBeGreaterThan(0);
    });

    test('should use different similarity metrics', () => {
      const analyzer = new LCSAnalyzer();
      
      const jaccardSim = analyzer.calculateSimilarity("ABCD", "ACBD", SimilarityMetric.JACCARD);
      const cosineSim = analyzer.calculateSimilarity("ABCD", "ACBD", SimilarityMetric.COSINE);
      const lcsSim = analyzer.calculateSimilarity("ABCD", "ACBD", SimilarityMetric.LCS_RATIO);
      
      expect(jaccardSim).toBeGreaterThan(0);
      expect(jaccardSim).toBeLessThanOrEqual(1);
      expect(cosineSim).toBeGreaterThan(0);
      expect(cosineSim).toBeLessThanOrEqual(1);
      expect(lcsSim).toBeGreaterThan(0);
      expect(lcsSim).toBeLessThanOrEqual(1);
    });
  });

  describe('Advanced features', () => {
    test('should generate sequence alignment', () => {
      const analyzer = new LCSAnalyzer();
      const alignment = analyzer.generateAlignment("ABCDGH", "AEDFHR");
      
      expect(alignment.alignedString1).toBeDefined();
      expect(alignment.alignedString2).toBeDefined();
      expect(alignment.matches).toBeGreaterThanOrEqual(0);
      expect(alignment.mismatches).toBeGreaterThanOrEqual(0);
      expect(alignment.gaps).toBeGreaterThanOrEqual(0);
      expect(alignment.score).toBeDefined();
    });

    test('should find longest increasing subsequence', () => {
      const analyzer = new LCSAnalyzer();
      const sequence = [10, 9, 2, 5, 3, 7, 101, 18];
      const result = analyzer.findLIS(sequence);
      
      expect(result.lis).toEqual([2, 3, 7, 18]);
      expect(result.length).toBe(4);
      expect(result.indices).toEqual([2, 4, 5, 7]);
    });

    test('should find longest palindromic subsequence', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLPS("BBABCBCAB");
      
      expect(result.lps).toBe("BABCBAB");
      expect(result.length).toBe(7);
      expect(result.isPalindrome).toBe(true);
    });

    test('should optimize for large strings', () => {
      const analyzer = new LCSAnalyzer();
      const largeString1 = 'A'.repeat(1000) + 'B'.repeat(1000);
      const largeString2 = 'A'.repeat(500) + 'C'.repeat(500) + 'B'.repeat(500);
      
      const startTime = Date.now();
      const result = analyzer.findLCS(largeString1, largeString2, LCSAlgorithm.SPACE_OPTIMIZED);
      const endTime = Date.now();
      
      expect(result.lcs.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should handle real-time updates', () => {
      const analyzer = new LCSAnalyzer();
      const result1 = analyzer.findLCS("ABCD", "ACBD");
      
      // Simulate string update
      const result2 = analyzer.updateString1("ABCDE");
      
      expect(result2.lcs.length).toBeGreaterThanOrEqual(result1.lcs.length);
      expect(result2.isIncremental).toBe(true);
    });

    test('should analyze pattern frequency', () => {
      const analyzer = new LCSAnalyzer();
      const strings = ["ABCABC", "ABCDEF", "ABCXYZ"];
      const patterns = analyzer.analyzePatternFrequency(strings);
      
      expect(patterns.commonSubsequences.size).toBeGreaterThan(0);
      expect(patterns.frequencyDistribution.size).toBeGreaterThan(0);
      expect(patterns.mostCommonPattern).toBeDefined();
      expect(patterns.patternComplexity).toBeGreaterThan(0);
    });
  });

  describe('Performance and optimization', () => {
    test('should track performance metrics', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("ABCDGH", "AEDFHR");
      
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
      expect(result.performanceMetrics.dpTableSize).toBeGreaterThan(0);
      expect(result.performanceMetrics.cacheHits).toBeGreaterThanOrEqual(0);
    });

    test('should use caching effectively', () => {
      const analyzer = new LCSAnalyzer();
      
      // First call
      const result1 = analyzer.findLCS("ABCDGH", "AEDFHR");
      
      // Second call (should hit cache)
      const result2 = analyzer.findLCS("ABCDGH", "AEDFHR");
      
      expect(result1.lcs).toBe(result2.lcs);
      expect(result2.performanceMetrics.cacheHits).toBeGreaterThan(result1.performanceMetrics.cacheHits);
    });

    test('should clear cache correctly', () => {
      const analyzer = new LCSAnalyzer();
      
      analyzer.findLCS("ABCD", "ACBD");
      analyzer.clearCache();
      
      const result = analyzer.findLCS("ABCD", "ACBD");
      expect(result.performanceMetrics.cacheHits).toBe(0);
    });

    test('should handle memory constraints', () => {
      const analyzer = new LCSAnalyzer();
      analyzer.setMemoryLimit(1000000); // 1MB limit
      
      const result = analyzer.findLCS("A".repeat(500), "B".repeat(500));
      expect(result.performanceMetrics.memoryUsage).toBeLessThanOrEqual(1000000);
    });
  });

  describe('Utility functions', () => {
    test('should generate test strings correctly', () => {
      const testStrings = generateTestStrings(5, 10, 0.7);
      
      expect(testStrings.length).toBe(5);
      testStrings.forEach(str => {
        expect(str.length).toBeLessThanOrEqual(10);
        expect(str.length).toBeGreaterThan(0);
      });
    });

    test('should visualize alignment correctly', () => {
      const alignment = {
        alignedString1: "A-BCD",
        alignedString2: "AEBCD",
        matches: 4,
        mismatches: 0,
        gaps: 1,
        score: 3
      };
      
      const visualization = visualizeAlignment(alignment);
      
      expect(visualization.length).toBeGreaterThan(0);
      expect(visualization).toContain("A-BCD");
      expect(visualization).toContain("AEBCD");
    });

    test('should handle Unicode strings', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("αβγδ", "αγδε");
      
      expect(result.lcs).toBe("αγδ");
      expect(result.length).toBe(3);
    });

    test('should validate input strings', () => {
      const analyzer = new LCSAnalyzer();
      
      expect(() => analyzer.findLCS(null as any, "test")).toThrow();
      expect(() => analyzer.findLCS("test", null as any)).toThrow();
      expect(() => analyzer.findMultiStringLCS([])).toThrow();
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle very long strings', () => {
      const analyzer = new LCSAnalyzer();
      const longString1 = 'A'.repeat(5000);
      const longString2 = 'A'.repeat(2500) + 'B'.repeat(2500);
      
      const result = analyzer.findLCS(longString1, longString2, LCSAlgorithm.SPACE_OPTIMIZED);
      
      expect(result.lcs.length).toBe(2500);
      expect(result.similarity).toBe(0.5);
    });

    test('should handle single character strings', () => {
      const analyzer = new LCSAnalyzer();
      
      const result1 = analyzer.findLCS("A", "A");
      expect(result1.lcs).toBe("A");
      expect(result1.length).toBe(1);
      
      const result2 = analyzer.findLCS("A", "B");
      expect(result2.lcs).toBe("");
      expect(result2.length).toBe(0);
    });

    test('should handle strings with repeated characters', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("AAAA", "AAAA");
      
      expect(result.lcs).toBe("AAAA");
      expect(result.length).toBe(4);
      expect(result.similarity).toBe(1.0);
    });

    test('should handle mixed case strings', () => {
      const analyzer = new LCSAnalyzer();
      const result = analyzer.findLCS("AbCd", "aBcD");
      
      expect(result.lcs).toBe("bd"); // Case sensitive
      expect(result.length).toBe(2);
    });

    test('should reset analyzer state', () => {
      const analyzer = new LCSAnalyzer();
      
      analyzer.findLCS("ABCD", "ACBD");
      analyzer.reset();
      
      const result = analyzer.findLCS("EFGH", "EGFH");
      expect(result.performanceMetrics.cacheHits).toBe(0);
    });

    test('should get current configuration', () => {
      const analyzer = new LCSAnalyzer();
      const config = analyzer.getConfiguration();
      
      expect(config.algorithm).toBeDefined();
      expect(config.similarityMetric).toBeDefined();
      expect(config.memoryLimit).toBeGreaterThan(0);
      expect(config.cacheEnabled).toBeDefined();
    });

    test('should handle configuration updates', () => {
      const analyzer = new LCSAnalyzer();
      
      analyzer.setConfiguration({
        algorithm: LCSAlgorithm.SPACE_OPTIMIZED,
        similarityMetric: SimilarityMetric.JACCARD,
        memoryLimit: 500000,
        cacheEnabled: false
      });
      
      const config = analyzer.getConfiguration();
      expect(config.algorithm).toBe(LCSAlgorithm.SPACE_OPTIMIZED);
      expect(config.similarityMetric).toBe(SimilarityMetric.JACCARD);
      expect(config.memoryLimit).toBe(500000);
      expect(config.cacheEnabled).toBe(false);
    });
  });
});
