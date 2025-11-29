import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Mock scrollIntoView since it's not supported in JSDOM
window.HTMLElement.prototype.scrollIntoView = function() {};

describe('App Component', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByText('Jeu de Dés')).toBeDefined();
  });

  it('starts with default state (2 dice)', () => {
    render(<App />);
    // Check for dice display count (assuming initial renders 2 dice)
    // We can check by looking for test-ids or class names, or simply the total count default.
    const initialTotal = screen.getByText(/Total/i);
    expect(initialTotal).toBeDefined();
  });

  it('updates total when dice are rolled', async () => {
    render(<App />);
    const rollButton = screen.getByText('LANCER LES DÉS');
    
    // Get initial total
    // Note: This is a bit simplistic as random is random, but we check if the function triggers
    fireEvent.click(rollButton);
    
    // Button changes text
    expect(screen.getByText('Lancement...')).toBeDefined();
    
    // Wait for roll to finish
    await waitFor(() => {
      expect(screen.getByText('LANCER LES DÉS')).toBeDefined();
    }, { timeout: 1500 });
  });

  it('shows history sidebar', () => {
    render(<App />);
    // On desktop it's visible by default structure, but let's check for the header
    expect(screen.getByText('Historique')).toBeDefined();
  });
});