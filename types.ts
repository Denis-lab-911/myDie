export interface DieProps {
  value: number;
  isRolling: boolean;
  index: number;
}

export interface RollHistory {
  id: string;
  timestamp: number;
  values: number[];
  total: number;
}

export interface DiceConfig {
  count: number;
}

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;