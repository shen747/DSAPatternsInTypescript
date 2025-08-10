import { 
  ListNode, 
  PalindromeValidator, 
  StringComparisonStrategy, 
  NumericComparisonStrategy,
  createLinkedList,
  linkedListToArray,
  PalindromeAnalysis 
} from './prob-02';

describe('Linked List In-Place Reversal - Problem 2: Palindromic Linked List with Advanced Validation', () => {
  let validator: PalindromeValidator<number>;

  beforeEach(() => {
    validator = new PalindromeValidator<number>();
  });

  describe('Basic palindrome detection', () => {
    test('should detect simple palindrome', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.palindromeCenter).toBe(3);
      expect(result.minInsertions).toBe(0);
      expect(result.analysis).toContain("palindrome");
      expect(result.metrics.comparisons).toBeGreaterThan(0);
    });

    test('should detect non-palindrome', () => {
      const head = createLinkedList([1, 2, 3, 4, 5]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(false);
      expect(result.minInsertions).toBeGreaterThan(0);
      expect(result.analysis).toContain("No palindromic structure");
    });

    test('should handle single node', () => {
      const head = createLinkedList([1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.minInsertions).toBe(0);
    });

    test('should handle empty list', () => {
      const result = validator.isPalindrome(null);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.minInsertions).toBe(0);
    });

    test('should handle two nodes palindrome', () => {
      const head = createLinkedList([1, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
    });

    test('should handle two nodes non-palindrome', () => {
      const head = createLinkedList([1, 2]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(false);
      expect(result.minInsertions).toBe(1);
    });

    test('should handle even length palindrome', () => {
      const head = createLinkedList([1, 2, 2, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.palindromeCenter).toContain("between");
    });

    test('should preserve original list structure', () => {
      const values = [1, 2, 3, 2, 1];
      const head = createLinkedList(values);
      validator.isPalindrome(head);
      
      const resultArray = linkedListToArray(head);
      expect(resultArray).toEqual(values);
    });
  });

  describe('String palindrome validation', () => {
    test('should handle case-sensitive string palindromes', () => {
      const stringValidator = new PalindromeValidator(new StringComparisonStrategy(true));
      const head = createLinkedList(['a', 'b', 'a']);
      const result = stringValidator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
    });

    test('should handle case-insensitive string palindromes', () => {
      const stringValidator = new PalindromeValidator(new StringComparisonStrategy(false));
      const head = createLinkedList(['a', 'B', 'A']);
      const result = stringValidator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.analysis).toContain("Case-insensitive");
    });

    test('should reject case-sensitive when cases differ', () => {
      const stringValidator = new PalindromeValidator(new StringComparisonStrategy(true));
      const head = createLinkedList(['a', 'B', 'A']);
      const result = stringValidator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(false);
    });
  });

  describe('Longest palindromic subsequence', () => {
    test('should find longest palindromic subsequence', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      const subsequence = validator.longestPalindromicSubsequence(head);
      
      expect(subsequence).toEqual([1, 2, 3, 2, 1]);
    });

    test('should find subsequence in non-palindromic list', () => {
      const head = createLinkedList([1, 2, 3, 4, 2, 1]);
      const subsequence = validator.longestPalindromicSubsequence(head);
      
      expect(subsequence.length).toBeGreaterThan(1);
      // Should be a valid palindromic subsequence
      expect(subsequence).toEqual([...subsequence].reverse());
    });

    test('should handle single element', () => {
      const head = createLinkedList([5]);
      const subsequence = validator.longestPalindromicSubsequence(head);
      
      expect(subsequence).toEqual([5]);
    });

    test('should handle no common elements', () => {
      const head = createLinkedList([1, 2, 3, 4, 5]);
      const subsequence = validator.longestPalindromicSubsequence(head);
      
      expect(subsequence.length).toBe(1);
    });
  });

  describe('Minimum insertions calculation', () => {
    test('should calculate zero insertions for palindrome', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      const insertions = validator.minInsertionsToMakePalindrome(head);
      
      expect(insertions).toBe(0);
    });

    test('should calculate correct insertions for non-palindrome', () => {
      const head = createLinkedList([1, 2, 3]);
      const insertions = validator.minInsertionsToMakePalindrome(head);
      
      expect(insertions).toBe(2); // Need to add 2 and 1 to make 1,2,3,2,1
    });

    test('should handle complex cases', () => {
      const head = createLinkedList([1, 2, 3, 4, 5]);
      const insertions = validator.minInsertionsToMakePalindrome(head);
      
      expect(insertions).toBe(4); // Need 4 insertions
    });
  });

  describe('Make palindrome functionality', () => {
    test('should convert list to palindrome', () => {
      const head = createLinkedList([1, 2, 3]);
      const palindromeHead = validator.makePalindrome(head);
      
      const result = validator.isPalindrome(palindromeHead);
      expect(result.isPalindrome).toBe(true);
    });

    test('should preserve palindrome if already palindromic', () => {
      const head = createLinkedList([1, 2, 1]);
      const palindromeHead = validator.makePalindrome(head);
      
      const resultArray = linkedListToArray(palindromeHead);
      expect(resultArray).toEqual([1, 2, 1]);
    });

    test('should handle empty list', () => {
      const palindromeHead = validator.makePalindrome(null);
      expect(palindromeHead).toBeNull();
    });
  });

  describe('Custom comparison logic', () => {
    test('should use custom comparison function', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      const customEquals = (a: number, b: number) => Math.abs(a - b) <= 1;
      
      const result = validator.isPalindromeCustom(head, customEquals);
      expect(typeof result).toBe('boolean');
    });

    test('should handle custom object comparison', () => {
      interface CustomObj { id: number; name: string; }
      const customValidator = new PalindromeValidator<CustomObj>({
        equals: (a, b) => a.id === b.id,
        toString: (obj) => `${obj.id}:${obj.name}`
      });
      
      const head = createLinkedList([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'c' } // Same id as first, different name
      ]);
      
      const result = customValidator.isPalindrome(head);
      expect(result.isPalindrome).toBe(true); // Based on id comparison
    });
  });

  describe('Find palindromic sublists', () => {
    test('should find palindromic sublists of minimum length', () => {
      const head = createLinkedList([1, 2, 2, 3, 4, 4, 3]);
      const sublists = validator.findPalindromicSublists(head, 2);
      
      expect(sublists.length).toBeGreaterThan(0);
      sublists.forEach(sublist => {
        expect(sublist.values.length).toBeGreaterThanOrEqual(2);
        expect(sublist.start).toBeLessThanOrEqual(sublist.end);
      });
    });

    test('should handle no palindromic sublists', () => {
      const head = createLinkedList([1, 2, 3, 4, 5]);
      const sublists = validator.findPalindromicSublists(head, 2);
      
      expect(sublists.length).toBe(0);
    });

    test('should find single character palindromes when k=1', () => {
      const head = createLinkedList([1, 2, 3]);
      const sublists = validator.findPalindromicSublists(head, 1);
      
      expect(sublists.length).toBe(3); // Each single character is a palindrome
    });
  });

  describe('Performance and edge cases', () => {
    test('should handle large palindromic lists efficiently', () => {
      const size = 10000;
      const values = Array.from({ length: size }, (_, i) => 
        i < size / 2 ? i : size - 1 - i
      );
      const head = createLinkedList(values);
      
      const startTime = Date.now();
      const result = validator.isPalindrome(head);
      const endTime = Date.now();
      
      expect(result.isPalindrome).toBe(true);
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should track performance metrics accurately', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.metrics.comparisons).toBeGreaterThan(0);
      expect(result.metrics.reversalSteps).toBeGreaterThan(0);
      expect(result.metrics.restorationSteps).toBeGreaterThan(0);
    });

    test('should handle lists with duplicate values', () => {
      const head = createLinkedList([1, 1, 1, 1, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
      expect(result.minInsertions).toBe(0);
    });

    test('should handle alternating pattern', () => {
      const head = createLinkedList([1, 2, 1, 2, 1]);
      const result = validator.isPalindrome(head);
      
      expect(result.isPalindrome).toBe(true);
    });

    test('should maintain O(1) space complexity for basic check', () => {
      const head = createLinkedList([1, 2, 3, 2, 1]);
      
      const memoryBefore = process.memoryUsage().heapUsed;
      validator.isPalindrome(head);
      const memoryAfter = process.memoryUsage().heapUsed;
      
      // Memory increase should be minimal and constant
      expect(memoryAfter - memoryBefore).toBeLessThan(1000000);
    });
  });

  describe('Utility functions', () => {
    test('should create linked list from array', () => {
      const values = [1, 2, 3, 4, 5];
      const head = createLinkedList(values);
      
      expect(head).not.toBeNull();
      expect(head!.val).toBe(1);
      expect(head!.next!.val).toBe(2);
    });

    test('should convert linked list to array', () => {
      const values = [1, 2, 3, 4, 5];
      const head = createLinkedList(values);
      const resultArray = linkedListToArray(head);
      
      expect(resultArray).toEqual(values);
    });

    test('should handle empty conversions', () => {
      expect(createLinkedList([])).toBeNull();
      expect(linkedListToArray(null)).toEqual([]);
    });
  });
});
