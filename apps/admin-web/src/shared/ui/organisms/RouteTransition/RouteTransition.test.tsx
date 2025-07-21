import { render, screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { RouteTransition } from './RouteTransition';

// Mock Next.js usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock console methods for debug mode tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
  mockUsePathname.mockReturnValue('/test-path');
});

afterEach(() => {
  console.log = originalConsoleLog;
  jest.clearAllMocks();
});

describe('RouteTransition', () => {
  const defaultProps = {
    children: <div data-testid="test-content">Test Content</div>,
  };

  describe('Rendering', () => {
    it('renders with children', () => {
      render(<RouteTransition {...defaultProps} />);

      expect(screen.getByTestId('route-transition')).toBeInTheDocument();
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<RouteTransition {...defaultProps} className="custom-class" />);

      const container = screen.getByTestId('route-transition');
      expect(container).toHaveClass('custom-class');
    });

    it('renders with custom test id', () => {
      render(
        <RouteTransition {...defaultProps} data-testid="custom-transition" />,
      );

      expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    });
  });

  describe('Component Composition', () => {
    it('renders BackgroundEffects molecule', () => {
      render(<RouteTransition {...defaultProps} />);

      const backgroundEffects = screen.getByTestId(
        'route-transition-background-effects',
      );
      expect(backgroundEffects).toBeInTheDocument();
      expect(backgroundEffects).toHaveAttribute('data-variant', 'blue');
      expect(backgroundEffects).toHaveAttribute('data-size', 'lg');
      expect(backgroundEffects).toHaveAttribute('data-pattern', 'random');
    });

    it('renders FloatingAccents molecule', () => {
      render(<RouteTransition {...defaultProps} />);

      const floatingAccents = screen.getByTestId(
        'route-transition-floating-accents',
      );
      expect(floatingAccents).toBeInTheDocument();
      expect(floatingAccents).toHaveAttribute('data-variant', 'blue');
      expect(floatingAccents).toHaveAttribute('data-size', 'md');
      expect(floatingAccents).toHaveAttribute('data-pattern', 'corners');
    });

    it('renders main content container', () => {
      render(<RouteTransition {...defaultProps} />);

      const content = screen.getByTestId('route-transition-content');
      expect(content).toBeInTheDocument();
      expect(content).toContainElement(screen.getByTestId('test-content'));
    });
  });

  describe('Transition States', () => {
    it('sets correct data attributes for transition state', async () => {
      render(<RouteTransition {...defaultProps} />);

      const container = screen.getByTestId('route-transition');

      // Initially the component may be in exit state due to useEffect timing
      // Wait for it to settle into enter state
      await waitFor(() => {
        expect(container).toHaveAttribute('data-phase', 'enter');
        expect(container).toHaveAttribute('data-visible', 'true');
      });
    });

    it('handles path changes and triggers exit state', async () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Change the pathname
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} />);

      // Should trigger exit state
      await waitFor(() => {
        const container = screen.getByTestId('route-transition');
        expect(container).toHaveAttribute('data-phase', 'exit');
        expect(container).toHaveAttribute('data-exiting', 'true');
      });
    });

    it('renders exit particles when exiting', async () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Change the pathname to trigger exit
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} />);

      // Should render exit particles
      await waitFor(() => {
        expect(
          screen.getByTestId('route-transition-exit-particle-0'),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('route-transition-exit-particle-7'),
        ).toBeInTheDocument();
      });
    });

    it('renders exit trail when exiting', async () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Change the pathname to trigger exit
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} />);

      // Should render exit trail
      await waitFor(() => {
        expect(
          screen.getByTestId('route-transition-exit-trail'),
        ).toBeInTheDocument();
      });
    });

    it('renders exit overlay when exiting', async () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Change the pathname to trigger exit
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} />);

      // Should render exit overlay
      await waitFor(() => {
        expect(
          screen.getByTestId('route-transition-exit-overlay'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Animation Configuration', () => {
    it('applies custom animation speed', () => {
      render(<RouteTransition {...defaultProps} animationSpeed={2} />);

      const backgroundEffects = screen.getByTestId(
        'route-transition-background-effects',
      );
      expect(backgroundEffects).toBeInTheDocument();
      // Animation speed is passed to child components
    });

    it('applies custom exit duration', () => {
      render(<RouteTransition {...defaultProps} exitDuration={800} />);

      expect(screen.getByTestId('route-transition')).toBeInTheDocument();
      // Exit duration affects timing but doesn't change DOM structure immediately
    });

    it('applies custom enter delay', () => {
      render(<RouteTransition {...defaultProps} enterDelay={100} />);

      expect(screen.getByTestId('route-transition')).toBeInTheDocument();
      // Enter delay affects timing but doesn't change DOM structure immediately
    });
  });

  describe('Debug Mode', () => {
    it('renders debug indicator when debug mode is enabled', () => {
      render(<RouteTransition {...defaultProps} debugMode />);

      const debugIndicator = screen.getByText(/ENTER • \/test-path/);
      expect(debugIndicator).toBeInTheDocument();
      expect(debugIndicator).toHaveClass('fixed', 'top-4', 'right-4', 'z-50');
    });

    it('does not render debug indicator when debug mode is disabled', () => {
      render(<RouteTransition {...defaultProps} debugMode={false} />);

      expect(screen.queryByText(/ENTER • \/test-path/)).not.toBeInTheDocument();
    });

    it('logs debug messages when debug mode is enabled', async () => {
      const { rerender } = render(
        <RouteTransition {...defaultProps} debugMode />,
      );

      // Change pathname to trigger debug logs
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} debugMode />);

      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(
          '🎭 Route Transition Debug:',
          expect.objectContaining({
            from: '/test-path',
            to: '/new-path',
            phase: 'exit-start',
          }),
        );
      });
    });

    it('does not log debug messages when debug mode is disabled', async () => {
      const { rerender } = render(
        <RouteTransition {...defaultProps} debugMode={false} />,
      );

      // Change pathname
      mockUsePathname.mockReturnValue('/new-path');
      rerender(<RouteTransition {...defaultProps} debugMode={false} />);

      // Should not log debug messages
      expect(console.log).not.toHaveBeenCalledWith(
        '🎭 Route Transition Debug:',
        expect.any(Object),
      );
    });
  });

  describe('Visual Parity', () => {
    it('maintains exact CSS classes for container', () => {
      render(<RouteTransition {...defaultProps} />);

      const container = screen.getByTestId('route-transition');
      expect(container).toHaveClass('relative');
      expect(container).toHaveClass('min-h-screen');
      expect(container).toHaveClass('overflow-hidden');
    });

    it('applies correct transition classes to content', () => {
      render(<RouteTransition {...defaultProps} />);

      const content = screen.getByTestId('route-transition-content');
      expect(content).toHaveClass('relative');
      expect(content).toHaveClass('z-10');
      expect(content).toHaveClass('transition-all');
      expect(content).toHaveClass('duration-400');
      expect(content).toHaveClass('ease-in-out');
    });

    it('renders background effects with fixed positioning', () => {
      render(<RouteTransition {...defaultProps} />);

      const backgroundContainer = screen.getByTestId(
        'route-transition-background-effects',
      ).parentElement;
      expect(backgroundContainer).toHaveClass('fixed');
      expect(backgroundContainer).toHaveClass('inset-0');
      expect(backgroundContainer).toHaveClass('pointer-events-none');
    });

    it('renders floating accents with correct z-index', () => {
      render(<RouteTransition {...defaultProps} />);

      const accentsContainer = screen.getByTestId(
        'route-transition-floating-accents',
      ).parentElement;
      expect(accentsContainer).toHaveClass('fixed');
      expect(accentsContainer).toHaveClass('inset-0');
      expect(accentsContainer).toHaveClass('pointer-events-none');
      expect(accentsContainer).toHaveClass('z-20');
    });
  });

  describe('Performance', () => {
    it('renders without performance issues', () => {
      const startTime = performance.now();
      render(<RouteTransition {...defaultProps} />);
      const endTime = performance.now();

      // Should render quickly (within 50ms for this simple test)
      expect(endTime - startTime).toBeLessThan(50);
    });

    it('handles multiple re-renders efficiently', () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Multiple re-renders should not cause issues
      for (let i = 0; i < 10; i++) {
        rerender(<RouteTransition {...defaultProps} animationSpeed={i + 1} />);
      }

      expect(screen.getByTestId('route-transition')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing children gracefully', () => {
      expect(() =>
        render(<RouteTransition>{null}</RouteTransition>),
      ).not.toThrow();
    });

    it('handles invalid animation values gracefully', () => {
      expect(() =>
        render(
          <RouteTransition
            {...defaultProps}
            animationSpeed={-1}
            exitDuration={-100}
            enterDelay={-50}
          />,
        ),
      ).not.toThrow();
    });

    it('handles pathname changes during transition', async () => {
      const { rerender } = render(<RouteTransition {...defaultProps} />);

      // Rapid pathname changes
      mockUsePathname.mockReturnValue('/path-1');
      rerender(<RouteTransition {...defaultProps} />);

      mockUsePathname.mockReturnValue('/path-2');
      rerender(<RouteTransition {...defaultProps} />);

      mockUsePathname.mockReturnValue('/path-3');
      rerender(<RouteTransition {...defaultProps} />);

      // Should handle rapid changes without errors
      expect(screen.getByTestId('route-transition')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains content accessibility during transitions', () => {
      render(
        <RouteTransition {...defaultProps}>
          <button>Accessible Button</button>
          <input aria-label="Accessible Input" />
        </RouteTransition>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByLabelText('Accessible Input')).toBeInTheDocument();
    });

    it('does not interfere with keyboard navigation', () => {
      render(
        <RouteTransition {...defaultProps}>
          <button tabIndex={0}>Focusable Button</button>
        </RouteTransition>,
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });
});
