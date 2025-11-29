import React from 'react';
import { DieProps } from '../types';

const Die: React.FC<DieProps> = ({ value, isRolling, index }) => {
  // Config for dot positions based on grid 3x3 (0-8)
  const getDotPositions = (val: number): number[] => {
    switch (val) {
      case 1: return [4];
      case 2: return [0, 8];
      case 3: return [0, 4, 8];
      case 4: return [0, 2, 6, 8];
      case 5: return [0, 2, 4, 6, 8];
      case 6: return [0, 2, 3, 5, 6, 8];
      default: return [];
    }
  };

  const dots = getDotPositions(value);
  
  // Stagger animation based on index
  const animationDelay = `${index * 50}ms`;

  return (
    <div 
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] border-2 border-slate-100
        flex items-center justify-center p-3
        transition-transform duration-500
        ${isRolling ? 'animate-shake' : 'transform hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.1)]'}
      `}
      style={{ animationDelay: isRolling ? '0ms' : '0ms' }}
      data-testid={`die-value-${value}`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
          <div key={pos} className="flex items-center justify-center">
            {dots.includes(pos) && (
              <div className="w-full h-full rounded-full bg-slate-800 shadow-inner" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Die;
