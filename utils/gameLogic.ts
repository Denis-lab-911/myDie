import { DiceValue } from '../types';

/**
 * Generates a random number between 1 and 6
 */
export const rollSingleDie = (): DiceValue => {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
};

/**
 * Generates an array of random dice values
 * @param count Number of dice to roll
 */
export const rollDiceSet = (count: number): DiceValue[] => {
  if (count < 1) return [];
  return Array.from({ length: count }, () => rollSingleDie());
};

/**
 * Calculates the total sum of a dice roll
 * @param dice Array of dice values
 */
export const calculateTotal = (dice: number[]): number => {
  return dice.reduce((acc, curr) => acc + curr, 0);
};

/**
 * Formats a timestamp into a readable time string
 */
export const formatTime = (timestamp: number): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(timestamp));
};