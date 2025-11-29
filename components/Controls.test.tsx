import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Controls from './Controls';

describe('Controls Component', () => {
  const mockSetDiceCount = vi.fn();
  const mockOnRoll = vi.fn();

  it('renders correct initial count', () => {
    render(
      <Controls 
        diceCount={3} 
        setDiceCount={mockSetDiceCount} 
        onRoll={mockOnRoll} 
        isRolling={false} 
      />
    );
    expect(screen.getByTestId('dice-count-display')).toHaveTextContent('3');
  });

  it('calls onRoll when button is clicked', () => {
    render(
      <Controls 
        diceCount={1} 
        setDiceCount={mockSetDiceCount} 
        onRoll={mockOnRoll} 
        isRolling={false} 
      />
    );
    fireEvent.click(screen.getByText('LANCER LES DÉS'));
    expect(mockOnRoll).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when rolling', () => {
    render(
      <Controls 
        diceCount={3} 
        setDiceCount={mockSetDiceCount} 
        onRoll={mockOnRoll} 
        isRolling={true} 
      />
    );
    
    const rollButton = screen.getByText('Lancement...').closest('button');
    expect(rollButton).toBeDisabled();
    
    const decreaseButton = screen.getByLabelText('Moins de dés');
    expect(decreaseButton).toBeDisabled();
  });
});