import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Die from './Die';

describe('Die Component', () => {
  it('renders without crashing', () => {
    render(<Die value={1} isRolling={false} index={0} />);
    const dieElement = screen.getByTestId('die-value-1');
    expect(dieElement).toBeDefined();
  });

  it('renders the correct visual for value 6', () => {
    render(<Die value={6} isRolling={false} index={0} />);
    expect(screen.getByTestId('die-value-6')).toBeDefined();
  });

  it('applies shaking class when rolling', () => {
    const { container } = render(<Die value={3} isRolling={true} index={0} />);
    // In a real DOM check we look for the class. 
    // Tailwind class 'animate-shake' should be present.
    expect(container.firstChild).toHaveClass('animate-shake');
  });
});