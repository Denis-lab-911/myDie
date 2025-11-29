import React, { useState, useEffect } from 'react';
import { History, Trash2, Trophy } from 'lucide-react';
import Die from './components/Die';
import Controls from './components/Controls';
import { rollDiceSet, calculateTotal, formatTime } from './utils/gameLogic';
import { DiceValue, RollHistory } from './types';

const App: React.FC = () => {
  const [diceCount, setDiceCount] = useState<number>(2);
  const [currentDice, setCurrentDice] = useState<DiceValue[]>([1, 1]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [history, setHistory] = useState<RollHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Initialize dice based on count
  useEffect(() => {
    setCurrentDice(Array(diceCount).fill(1));
  }, [diceCount]);

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);

    // Animation frames (pseudo-random shuffling before settling)
    let intervalCount = 0;
    const interval = setInterval(() => {
      setCurrentDice(rollDiceSet(diceCount));
      intervalCount++;
      if (intervalCount > 10) {
        clearInterval(interval);
      }
    }, 100);

    // Final result
    setTimeout(() => {
      clearInterval(interval);
      const finalRoll = rollDiceSet(diceCount);
      setCurrentDice(finalRoll);
      setIsRolling(false);
      
      // Add to history
      const newEntry: RollHistory = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        values: finalRoll,
        total: calculateTotal(finalRoll)
      };
      
      setHistory(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50
    }, 800);
  };

  const clearHistory = () => setHistory([]);

  const currentTotal = calculateTotal(currentDice);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* Mobile History Toggle */}
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="md:hidden absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm text-slate-600 z-10"
        >
          <History size={20} />
        </button>

        <div className="w-full max-w-4xl flex flex-col items-center gap-12">
          
          {/* Title Section */}
          <div className="flex items-center gap-3 mb-2">
             <Trophy size={48} className="text-yellow-500" />
             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Jeu de Dés</h1>
          </div>
          
          {/* Total Score Display */}
          <div className="text-center">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2">Total</h2>
            <div className={`text-6xl md:text-8xl font-black text-slate-800 transition-all duration-300 ${isRolling ? 'opacity-50 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
              {currentTotal}
            </div>
          </div>

          {/* Dice Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[120px]">
            {currentDice.map((val, idx) => (
              <Die 
                key={`${idx}-${isRolling}`} // Key change triggers animation reset if needed, mostly handled by class
                index={idx} 
                value={val} 
                isRolling={isRolling} 
              />
            ))}
          </div>

          <div className="w-full">
            <Controls 
              diceCount={diceCount} 
              setDiceCount={setDiceCount} 
              onRoll={handleRoll} 
              isRolling={isRolling} 
            />
          </div>
        </div>
      </main>

      {/* Sidebar / History Panel */}
      <aside 
        className={`
          fixed inset-y-0 right-0 z-20 w-80 bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:shadow-none md:w-96
          ${showHistory ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-700">
              <History size={20} />
              <h2 className="font-bold text-lg">Historique</h2>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Effacer l'historique"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button 
                onClick={() => setShowHistory(false)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">Aucun lancer pour le moment</p>
              </div>
            ) : (
              history.map((roll) => (
                <div key={roll.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between group hover:border-indigo-100 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 font-medium">{formatTime(roll.timestamp)}</span>
                    <div className="flex gap-1">
                      {roll.values.map((v, i) => (
                        <span key={i} className="inline-flex items-center justify-center w-5 h-5 bg-white rounded border border-slate-200 text-xs font-bold text-slate-600">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400 uppercase">Score</span>
                    <span className="text-xl font-bold text-indigo-600">{roll.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when history is open */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default App;