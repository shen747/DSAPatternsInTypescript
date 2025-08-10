/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  WordLadderEngine, 
  SearchAlgorithm, 
  SimilarityMetric,
  TransformationRule,
  generateTestDictionary,
  analyzeWordPatterns 
} from './prob-02';

describe('Breadth First Search Pattern - Problem 2: Word Ladder with Advanced Transformations', () => {
  let dictionary: string[];
  let engine: WordLadderEngine;

  beforeEach(() => {
    dictionary = ["hot","dot","dog","lot","log","cog","hit","dig","bog","fog"];
    engine = new WordLadderEngine(dictionary);
  });

  describe('WordLadderEngine', () => {
    test('should find shortest transformation path', () => {
      const result = engine.findShortestTransformation("hit", "cog");
      
      expect(result.pathFound).toBe(true);
      expect(result.shortestLength).toBeGreaterThan(0);
      expect(result.transformationPath.length).toBeGreaterThan(0);
      expect(result.transformationPath[0]).toBe("hit");
      expect(result.transformationPath[result.transformationPath.length - 1]).toBe("cog");
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.algorithm).toBeDefined();
    });

    test('should handle no transformation possible', () => {
      const result = engine.findShortestTransformation("hit", "xyz");
      
      expect(result.pathFound).toBe(false);
      expect(result.shortestLength).toBe(-1);
      expect(result.transformationPath.length).toBe(0);
    });

    test('should handle same start and end word', () => {
      const result = engine.findShortestTransformation("hit", "hit");
      
      expect(result.pathFound).toBe(true);
      expect(result.shortestLength).toBe(1);
      expect(result.transformationPath).toEqual(["hit"]);
      expect(result.totalCost).toBe(0);
    });

    test('should use different search algorithms', () => {
      const bfsResult = engine.findShortestTransformation("hit", "cog", SearchAlgorithm.BFS);
      const bidirectionalResult = engine.findShortestTransformation("hit", "cog", SearchAlgorithm.BIDIRECTIONAL_BFS);
      const dijkstraResult = engine.findShortestTransformation("hit", "cog", SearchAlgorithm.DIJKSTRA);
      
      expect(bfsResult.pathFound).toBe(true);
      expect(bidirectionalResult.pathFound).toBe(true);
      expect(dijkstraResult.pathFound).toBe(true);
      
      expect(bfsResult.algorithm).toBe('bfs');
      expect(bidirectionalResult.algorithm).toBe('bidirectional-bfs');
      expect(dijkstraResult.algorithm).toBe('dijkstra');
      
      // All should find paths of same length (unweighted case)
      expect(bfsResult.shortestLength).toBe(bidirectionalResult.shortestLength);
      expect(bfsResult.shortestLength).toBe(dijkstraResult.shortestLength);
    });

    test('should find all shortest paths', () => {
      const allPaths = engine.findAllShortestPaths("hit", "cog");
      
      expect(allPaths.length).toBeGreaterThan(0);
      
      // All paths should have same length
      const firstPathLength = allPaths[0].length;
      allPaths.forEach(path => {
        expect(path.length).toBe(firstPathLength);
        expect(path[0]).toBe("hit");
        expect(path[path.length - 1]).toBe("cog");
      });
    });

    test('should use bidirectional search efficiently', () => {
      const result = engine.findTransformationBidirectional("hit", "cog");
      
      expect(result.pathFound).toBe(true);
      expect(result.algorithm).toBe('bidirectional-bfs');
      expect(result.performanceMetrics.bidirectionalMeetPoint).toBeDefined();
      
      // Should explore fewer nodes than regular BFS
      const regularResult = engine.findShortestTransformation("hit", "cog", SearchAlgorithm.BFS);
      expect(result.performanceMetrics.nodesExplored).toBeLessThanOrEqual(regularResult.performanceMetrics.nodesExplored);
    });

    test('should handle weighted transformations', () => {
      const customRules: TransformationRule[] = [
        { type: 'substitute', cost: 2 },
        { type: 'insert', cost: 3 },
        { type: 'delete', cost: 1 }
      ];
      
      const weightedEngine = new WordLadderEngine(dictionary, customRules);
      const result = weightedEngine.findWeightedTransformation("hit", "cog");
      
      expect(result.pathFound).toBe(true);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.transformations.length).toBeGreaterThan(0);
      
      result.transformations.forEach(transformation => {
        expect(transformation.cost).toBeGreaterThan(0);
        expect(transformation.rule).toBeDefined();
      });
    });
  });

  describe('Dictionary management', () => {
    test('should add word to dictionary', () => {
      const originalSize = engine.getDictionary().length;
      const success = engine.addWord("new");
      
      expect(success).toBe(true);
      expect(engine.getDictionary().length).toBe(originalSize + 1);
      expect(engine.getDictionary()).toContain("new");
    });

    test('should handle adding duplicate word', () => {
      const originalSize = engine.getDictionary().length;
      const success = engine.addWord("hit"); // Already exists
      
      expect(success).toBe(false);
      expect(engine.getDictionary().length).toBe(originalSize);
    });

    test('should remove word from dictionary', () => {
      const originalSize = engine.getDictionary().length;
      const success = engine.removeWord("hit");
      
      expect(success).toBe(true);
      expect(engine.getDictionary().length).toBe(originalSize - 1);
      expect(engine.getDictionary()).not.toContain("hit");
    });

    test('should handle removing non-existent word', () => {
      const originalSize = engine.getDictionary().length;
      const success = engine.removeWord("xyz");
      
      expect(success).toBe(false);
      expect(engine.getDictionary().length).toBe(originalSize);
    });

    test('should update transformations after dictionary changes', () => {
      // First find a path
      const originalResult = engine.findShortestTransformation("hit", "cog");
      expect(originalResult.pathFound).toBe(true);
      
      // Remove a word that might be in the path
      engine.removeWord("hot");
      
      // Try to find path again
      const newResult = engine.findShortestTransformation("hit", "cog");
      
      // Path might be longer or different now
      if (newResult.pathFound) {
        expect(newResult.shortestLength).toBeGreaterThanOrEqual(originalResult.shortestLength);
      }
    });
  });

  describe('Word similarity analysis', () => {
    test('should find similar words using edit distance', () => {
      const similarWords = engine.findSimilarWords("hit", 1, SimilarityMetric.EDIT_DISTANCE);
      
      expect(similarWords.length).toBeGreaterThan(0);
      
      similarWords.forEach(similarity => {
        expect(similarity.word1).toBe("hit");
        expect(similarity.word2).toBeDefined();
        expect(similarity.similarity).toBeGreaterThanOrEqual(0);
        expect(similarity.transformationCost).toBeGreaterThan(0);
      });
    });

    test('should find similar words using different metrics', () => {
      const editDistanceWords = engine.findSimilarWords("hit", 2, SimilarityMetric.EDIT_DISTANCE);
      const jaccardWords = engine.findSimilarWords("hit", 2, SimilarityMetric.JACCARD);
      const cosineWords = engine.findSimilarWords("hit", 2, SimilarityMetric.COSINE);
      
      expect(editDistanceWords.length).toBeGreaterThan(0);
      expect(jaccardWords.length).toBeGreaterThan(0);
      expect(cosineWords.length).toBeGreaterThan(0);
      
      // Different metrics might return different results
      expect(editDistanceWords).not.toEqual(jaccardWords);
    });

    test('should handle no similar words found', () => {
      const similarWords = engine.findSimilarWords("xyz", 1);
      expect(similarWords.length).toBe(0);
    });

    test('should respect maximum distance parameter', () => {
      const closeWords = engine.findSimilarWords("hit", 1);
      const farWords = engine.findSimilarWords("hit", 3);
      
      expect(farWords.length).toBeGreaterThanOrEqual(closeWords.length);
      
      closeWords.forEach(similarity => {
        expect(similarity.transformationCost).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Pattern analysis', () => {
    test('should analyze transformation patterns', () => {
      const analysis = engine.analyzeTransformationPatterns();
      
      expect(analysis.commonPatterns.size).toBeGreaterThan(0);
      expect(analysis.transformationFrequency.size).toBeGreaterThan(0);
      expect(analysis.averagePathLength).toBeGreaterThan(0);
      expect(analysis.connectivityMetrics.stronglyConnectedComponents).toBeGreaterThan(0);
      expect(analysis.connectivityMetrics.averageDegree).toBeGreaterThan(0);
      expect(analysis.connectivityMetrics.clusteringCoefficient).toBeGreaterThanOrEqual(0);
    });

    test('should find multi-objective transformations', () => {
      const objectives = {
        minimizeLength: 0.5,
        minimizeCost: 0.3,
        maximizeSimilarity: 0.2
      };
      
      const result = engine.findMultiObjectiveTransformation("hit", "cog", objectives);
      
      expect(result.pathFound).toBe(true);
      expect(result.pathAnalysis.transformationComplexity).toBeGreaterThanOrEqual(0);
      expect(result.pathAnalysis.patternSimilarity).toBeGreaterThanOrEqual(0);
      expect(result.pathAnalysis.linguisticDistance).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Custom heuristics and rules', () => {
    test('should use custom heuristic function', () => {
      const customHeuristic = (word1: string, word2: string) => {
        // Simple character difference count
        let diff = Math.abs(word1.length - word2.length);
        const minLen = Math.min(word1.length, word2.length);
        for (let i = 0; i < minLen; i++) {
          if (word1[i] !== word2[i]) diff++;
        }
        return diff;
      };
      
      engine.setCustomHeuristic(customHeuristic);
      
      const result = engine.findShortestTransformation("hit", "cog", SearchAlgorithm.A_STAR);
      expect(result.pathFound).toBe(true);
      expect(result.algorithm).toBe('a-star');
    });

    test('should handle custom transformation rules', () => {
      const customRules: TransformationRule[] = [
        { type: 'substitute', cost: 1 },
        { type: 'swap', cost: 2 },
        { 
          type: 'custom', 
          cost: 0.5,
          condition: (from, to, pos) => from[pos] === 'a' && to[pos] === 'e'
        }
      ];
      
      const customEngine = new WordLadderEngine(["cat", "cet", "cot"], customRules);
      const rules = customEngine.getTransformationRules();
      
      expect(rules.length).toBe(3);
      expect(rules.some(rule => rule.type === 'custom')).toBe(true);
      expect(rules.some(rule => rule.type === 'swap')).toBe(true);
    });
  });

  describe('Performance and caching', () => {
    test('should track performance metrics', () => {
      const result = engine.findShortestTransformation("hit", "cog");
      
      expect(result.performanceMetrics.nodesExplored).toBeGreaterThan(0);
      expect(result.performanceMetrics.transformationsEvaluated).toBeGreaterThan(0);
      expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(0);
      expect(result.performanceMetrics.memoryUsage).toBeGreaterThan(0);
    });

    test('should handle large dictionaries efficiently', () => {
      const largeDictionary = generateTestDictionary(["cat", "dog", "run", "sun", "fun"], 10);
      const largeEngine = new WordLadderEngine(largeDictionary);
      
      const startTime = Date.now();
      const result = largeEngine.findShortestTransformation(largeDictionary[0], largeDictionary[largeDictionary.length - 1]);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should clear cache correctly', () => {
      // Populate cache
      engine.findSimilarWords("hit", 2);
      
      // Clear cache
      engine.clearCache();
      
      // Should still work after cache clear
      const similarWords = engine.findSimilarWords("hit", 2);
      expect(similarWords.length).toBeGreaterThanOrEqual(0);
    });

    test('should reset engine correctly', () => {
      const newDictionary = ["new", "words", "here"];
      const originalDict = engine.getDictionary();
      
      engine.reset(newDictionary);
      
      expect(engine.getDictionary()).toEqual(newDictionary);
      expect(engine.getDictionary()).not.toEqual(originalDict);
    });
  });

  describe('Utility functions', () => {
    test('should generate test dictionary', () => {
      const baseWords = ["cat", "dog"];
      const testDict = generateTestDictionary(baseWords, 3);
      
      expect(testDict.length).toBeGreaterThan(baseWords.length);
      expect(testDict).toContain("cat");
      expect(testDict).toContain("dog");
    });

    test('should analyze word patterns', () => {
      const words = ["cat", "bat", "rat", "cats", "bats"];
      const analysis = analyzeWordPatterns(words);
      
      expect(analysis.lengthDistribution.size).toBeGreaterThan(0);
      expect(analysis.characterFrequency.size).toBeGreaterThan(0);
      expect(analysis.commonPrefixes.length).toBeGreaterThanOrEqual(0);
      expect(analysis.commonSuffixes.length).toBeGreaterThanOrEqual(0);
      
      // Should detect common patterns
      expect(analysis.lengthDistribution.get(3)).toBe(3); // "cat", "bat", "rat"
      expect(analysis.lengthDistribution.get(4)).toBe(2); // "cats", "bats"
    });

    test('should handle empty word list in pattern analysis', () => {
      const analysis = analyzeWordPatterns([]);
      
      expect(analysis.lengthDistribution.size).toBe(0);
      expect(analysis.characterFrequency.size).toBe(0);
      expect(analysis.commonPrefixes.length).toBe(0);
      expect(analysis.commonSuffixes.length).toBe(0);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty dictionary', () => {
      const emptyEngine = new WordLadderEngine([]);
      const result = emptyEngine.findShortestTransformation("hit", "cog");
      
      expect(result.pathFound).toBe(false);
    });

    test('should handle single word dictionary', () => {
      const singleEngine = new WordLadderEngine(["word"]);
      
      const sameWordResult = singleEngine.findShortestTransformation("word", "word");
      expect(sameWordResult.pathFound).toBe(true);
      
      const differentWordResult = singleEngine.findShortestTransformation("word", "other");
      expect(differentWordResult.pathFound).toBe(false);
    });

    test('should handle words not in dictionary', () => {
      const result = engine.findShortestTransformation("xyz", "abc");
      expect(result.pathFound).toBe(false);
    });

    test('should handle very long words', () => {
      const longWords = ["supercalifragilisticexpialidocious", "antidisestablishmentarianism"];
      const longEngine = new WordLadderEngine(longWords);
      
      const result = longEngine.findShortestTransformation(longWords[0], longWords[1]);
      // May or may not find path, but should not crash
      expect(typeof result.pathFound).toBe('boolean');
    });

    test('should handle words with special characters', () => {
      const specialWords = ["hello", "he-lo", "he_lo"];
      const specialEngine = new WordLadderEngine(specialWords);
      
      const result = specialEngine.findShortestTransformation("hello", "he-lo");
      expect(typeof result.pathFound).toBe('boolean');
    });

    test('should validate transformation rules', () => {
      const invalidRules: TransformationRule[] = [
        { type: 'substitute', cost: -1 }, // Negative cost
        { type: 'insert', cost: 0 }       // Zero cost
      ];
      
      // Should handle invalid rules gracefully
      expect(() => new WordLadderEngine(dictionary, invalidRules)).not.toThrow();
    });
  });
});
