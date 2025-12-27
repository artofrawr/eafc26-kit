/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for React component tests.
 * Use this as a reference when testing frontend components.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExampleClientComponent } from './example-client-component';

describe('ExampleClientComponent', () => {
  it('renders with default props', () => {
    render(<ExampleClientComponent />);

    expect(screen.getByText('Client Component Example')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with custom initial count', () => {
    render(<ExampleClientComponent initialCount={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<ExampleClientComponent title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  describe('increment/decrement functionality', () => {
    it('increments count when + button clicked', () => {
      render(<ExampleClientComponent initialCount={0} />);

      const incrementButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('decrements count when - button clicked', () => {
      render(<ExampleClientComponent initialCount={5} />);

      const decrementButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decrementButton);

      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('allows multiple increments', () => {
      render(<ExampleClientComponent initialCount={0} />);

      const incrementButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('reset functionality', () => {
    it('resets count to initial value', () => {
      render(<ExampleClientComponent initialCount={10} />);

      const incrementButton = screen.getByRole('button', { name: '+' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });

      // Increment a few times
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      expect(screen.getByText('12')).toBeInTheDocument();

      // Reset
      fireEvent.click(resetButton);
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  describe('async action', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('shows loading state during async operation', async () => {
      render(<ExampleClientComponent initialCount={0} />);

      const asyncButton = screen.getByRole('button', { name: 'Add 10 (Async)' });
      fireEvent.click(asyncButton);

      // Should show loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Processing...')).toBeInTheDocument();

      // Buttons should be disabled
      expect(screen.getByRole('button', { name: '+' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '-' })).toBeDisabled();
    });

    it('adds 10 to count after async operation completes', async () => {
      render(<ExampleClientComponent initialCount={5} />);

      const asyncButton = screen.getByRole('button', { name: 'Add 10 (Async)' });
      fireEvent.click(asyncButton);

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(screen.getByText('15')).toBeInTheDocument();
      });

      // Loading state should be gone
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Processing...')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has accessible button labels', () => {
      render(<ExampleClientComponent />);

      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    it('disables buttons during loading', async () => {
      render(<ExampleClientComponent />);

      const asyncButton = screen.getByRole('button', { name: 'Add 10 (Async)' });
      fireEvent.click(asyncButton);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });
});

/**
 * Testing best practices:
 * - Test user behavior, not implementation details
 * - Use screen queries (getByRole, getByText) over container queries
 * - Test accessibility (button labels, disabled states, etc.)
 * - Group related tests with describe blocks
 * - Use waitFor for async operations
 * - Clean up timers/mocks in afterEach
 * - Test error states and edge cases
 */
