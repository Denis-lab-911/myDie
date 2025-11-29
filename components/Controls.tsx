import React from 'react';
import { Minus, Plus, Dices } from 'lucide-react';

interface ControlsProps {
  diceCount: number;
  setDiceCount: (count: number) => void;
  onRoll: () => void;
  isRolling: boolean;
}

const Controls: React.FC<ControlsProps> = ({ diceCount, setDiceCount, onRoll, isRolling }) => {
  
  const increment = () => setDiceCount(Math.min(6, diceCount + 1));
  const decrement = () => setDiceCount(Math.max(1, diceCount - 1));

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {/* Dice Counter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">Nombre de dés</span>
        <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-1">
          <button 
            onClick={decrement}
            disabled={diceCount <= 1 || isRolling}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            aria-label="Moins de dés"
          >
            <Minus size={20} />
          </button>
          
          <span className="w-6 text-center font-bold text-lg text-slate-800" data-testid="dice-count-display">
            {diceCount}
          </span>
          
          <button 
            onClick={increment}
            disabled={diceCount >= 6 || isRolling}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            aria-label="Plus de dés"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Roll Button */}
      <button
        onClick={onRoll}
        disabled={isRolling}
        className={`
          relative overflow-hidden group w-full py-4 rounded-2xl font-bold text-lg tracking-wide shadow-lg
          transition-all duration-300 transform active:scale-95
          ${isRolling 
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 shadow-indigo-500/20'}
        `}
      >
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Dices className={isRolling ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
          <span>{isRolling ? 'Lancement...' : 'LANCER LES DÉS'}</span>
        </div>
        {!isRolling && (
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default Controls;