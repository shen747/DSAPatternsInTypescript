/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
    fizzBuzz, 
    fizzBuzzConcat, 
    fizzBuzzMap, 
    fizzBuzzArray, 
    fizzBuzzRecursive 
} from './problem';

describe('Fizz Buzz Problem', () => {
    describe('fizzBuzz - Basic Solution', () => {
        test('should return correct array for n = 3', () => {
            expect(fizzBuzz(3)).toEqual(["1", "2", "Fizz"]);
        });

        test('should return correct array for n = 5', () => {
            expect(fizzBuzz(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
        });

        test('should return correct array for n = 15', () => {
            expect(fizzBuzz(15)).toEqual([
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz"
            ]);
        });

        test('should handle n = 1', () => {
            expect(fizzBuzz(1)).toEqual(["1"]);
        });

        test('should handle n = 2', () => {
            expect(fizzBuzz(2)).toEqual(["1", "2"]);
        });
    });

    describe('fizzBuzzConcat - String Concatenation', () => {
        test('should return correct array for n = 3', () => {
            expect(fizzBuzzConcat(3)).toEqual(["1", "2", "Fizz"]);
        });

        test('should return correct array for n = 5', () => {
            expect(fizzBuzzConcat(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
        });

        test('should return correct array for n = 15', () => {
            expect(fizzBuzzConcat(15)).toEqual([
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz"
            ]);
        });

        test('should handle n = 1', () => {
            expect(fizzBuzzConcat(1)).toEqual(["1"]);
        });
    });

    describe('fizzBuzzMap - Map Solution', () => {
        test('should return correct array for n = 3', () => {
            expect(fizzBuzzMap(3)).toEqual(["1", "2", "Fizz"]);
        });

        test('should return correct array for n = 5', () => {
            expect(fizzBuzzMap(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
        });

        test('should return correct array for n = 15', () => {
            expect(fizzBuzzMap(15)).toEqual([
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz"
            ]);
        });

        test('should handle n = 1', () => {
            expect(fizzBuzzMap(1)).toEqual(["1"]);
        });
    });

    describe('fizzBuzzArray - Array Methods', () => {
        test('should return correct array for n = 3', () => {
            expect(fizzBuzzArray(3)).toEqual(["1", "2", "Fizz"]);
        });

        test('should return correct array for n = 5', () => {
            expect(fizzBuzzArray(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
        });

        test('should return correct array for n = 15', () => {
            expect(fizzBuzzArray(15)).toEqual([
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz"
            ]);
        });

        test('should handle n = 1', () => {
            expect(fizzBuzzArray(1)).toEqual(["1"]);
        });
    });

    describe('fizzBuzzRecursive - Recursive Solution', () => {
        test('should return correct array for n = 3', () => {
            expect(fizzBuzzRecursive(3)).toEqual(["1", "2", "Fizz"]);
        });

        test('should return correct array for n = 5', () => {
            expect(fizzBuzzRecursive(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
        });

        test('should return correct array for n = 15', () => {
            expect(fizzBuzzRecursive(15)).toEqual([
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz"
            ]);
        });

        test('should handle n = 1', () => {
            expect(fizzBuzzRecursive(1)).toEqual(["1"]);
        });
    });

    describe('Solution Comparison', () => {
        const testCases = [1, 2, 3, 5, 10, 15, 20, 30];

        testCases.forEach(testCase => {
            test(`all solutions should return same result for n = ${testCase}`, () => {
                const result1 = fizzBuzz(testCase);
                const result2 = fizzBuzzConcat(testCase);
                const result3 = fizzBuzzMap(testCase);
                const result4 = fizzBuzzArray(testCase);
                const result5 = fizzBuzzRecursive(testCase);
                
                expect(result1).toEqual(result2);
                expect(result2).toEqual(result3);
                expect(result3).toEqual(result4);
                expect(result4).toEqual(result5);
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle minimum value n = 1', () => {
            expect(fizzBuzz(1)).toEqual(["1"]);
        });

        test('should handle maximum value n = 10000', () => {
            const result = fizzBuzz(10000);
            expect(result.length).toBe(10000);
            expect(result[0]).toBe("1");
            expect(result[9999]).toBe("Buzz"); // 10000 is divisible by 5
        });

        test('should handle numbers divisible by both 3 and 5', () => {
            const result = fizzBuzz(30);
            expect(result[14]).toBe("FizzBuzz"); // 15
            expect(result[29]).toBe("FizzBuzz"); // 30
        });

        test('should handle numbers divisible by only 3', () => {
            const result = fizzBuzz(10);
            expect(result[2]).toBe("Fizz");  // 3
            expect(result[5]).toBe("Fizz");  // 6
            expect(result[8]).toBe("Fizz");  // 9
        });

        test('should handle numbers divisible by only 5', () => {
            const result = fizzBuzz(10);
            expect(result[4]).toBe("Buzz");  // 5
            expect(result[9]).toBe("Buzz");  // 10
        });
    });

    describe('Performance Tests', () => {
        test('should handle large numbers efficiently', () => {
            const start = Date.now();
            const result = fizzBuzz(1000);
            const end = Date.now();
            
            expect(result.length).toBe(1000);
            expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
        });
    });

    describe('Pattern Verification', () => {
        test('should have correct pattern for first 20 numbers', () => {
            const result = fizzBuzz(20);
            const expected = [
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19", "Buzz"
            ];
            expect(result).toEqual(expected);
        });

        test('should have FizzBuzz at positions 15, 30, 45, etc.', () => {
            const result = fizzBuzz(60);
            expect(result[14]).toBe("FizzBuzz"); // 15
            expect(result[29]).toBe("FizzBuzz"); // 30
            expect(result[44]).toBe("FizzBuzz"); // 45
            expect(result[59]).toBe("FizzBuzz"); // 60
        });
    });
}); 