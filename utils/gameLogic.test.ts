import { describe, it, expect } from 'vitest';
import { rollSingleDie, rollDiceSet, calculateTotal } from './gameLogic';

describe('Game Logic Utils', () => {
  describe('rollSingleDie', () => {
    it('should return a number between 1 and 6', () => {
      // Run multiple times to ensure range reliability
      for (let i = 0; i < 100; i++) {
        const result = rollSingleDie();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
        expect(Number.isInteger(result)).toBe(true);
      }
    });
  });

  describe('rollDiceSet', () => {
    it('should return an array of correct length', () => {
      expect(rollDiceSet(3)).toHaveLength(3);
      expect(rollDiceSet(5)).toHaveLength(5);
      expect(rollDiceSet(0)).toHaveLength(0);
    });

    it('should contain valid dice values', () => {
      const dice = rollDiceSet(10);
      dice.forEach(die => {
        expect(die).toBeGreaterThanOrEqual(1);
        expect(die).toBeLessThanOrEqual(6);
      });
    });
  });

  describe('calculateTotal', () => {
    it('should sum dice correctly', () => {
      expect(calculateTotal([1, 2, 3])).toBe(6);
      expect(calculateTotal([6, 6])).toBe(12);
      expect(calculateTotal([])).toBe(0);
    });
  });
});