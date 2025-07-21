import { render, screen } from '@testing-library/react';
import React from 'react';
import { FloatingAccents } from './FloatingAccents';

describe('FloatingAccents', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<FloatingAccents />);

      expect(screen.getByTestId('floating-accents')).toBeInTheDocument();

      // Should render default number of accents for medium size (4)
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-3')).toBeInTheDocument();
    });

    it('renders correct number of accents based on size', () => {
      render(<FloatingAccents size="xs" />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '2');

      // Should have 2 accents for xs size
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-1')).toBeInTheDocument();
      expect(
        screen.queryByTestId('floating-accents-dot-2'),
      ).not.toBeInTheDocument();
    });

    it('renders custom accent count when specified', () => {
      render(<FloatingAccents accentCount={6} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '6');

      // Should have 6 accents
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-5')).toBeInTheDocument();
      expect(
        screen.queryByTestId('floating-accents-dot-6'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Variants and Styling', () => {
    it('applies variant correctly', () => {
      render(<FloatingAccents variant="emerald" />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-variant', 'emerald');

      // All accents should inherit the variant
      const firstAccent = screen.getByTestId('floating-accents-dot-0');
      expect(firstAccent).toHaveAttribute('data-variant', 'emerald');
    });

    it('applies size configuration correctly', () => {
      render(<FloatingAccents size="lg" />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-size', 'lg');
      expect(container).toHaveAttribute('data-accent-count', '5');
    });
  });

  describe('Animation', () => {
    it('enables animation by default', () => {
      render(<FloatingAccents />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-animated', 'true');

      // All accents should be animated
      const firstAccent = screen.getByTestId('floating-accents-dot-0');
      expect(firstAccent).toHaveAttribute('data-animated', 'true');
    });

    it('disables animation when specified', () => {
      render(<FloatingAccents animated={false} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-animated', 'false');

      // All accents should not be animated
      const firstAccent = screen.getByTestId('floating-accents-dot-0');
      expect(firstAccent).toHaveAttribute('data-animated', 'false');
    });
  });

  describe('Animation Sequences', () => {
    it('applies cascade sequence by default', () => {
      render(<FloatingAccents accentCount={3} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-sequence', 'cascade');
    });

    it('applies synchronized sequence correctly', () => {
      render(<FloatingAccents sequence="synchronized" accentCount={3} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-sequence', 'synchronized');
    });

    it('applies random sequence correctly', () => {
      render(<FloatingAccents sequence="random" accentCount={3} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-sequence', 'random');
    });

    it('applies wave sequence correctly', () => {
      render(<FloatingAccents sequence="wave" accentCount={4} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-sequence', 'wave');
    });
  });

  describe('Positioning Patterns', () => {
    it('applies scattered pattern by default', () => {
      render(<FloatingAccents accentCount={3} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-pattern', 'scattered');
    });

    it('applies linear pattern correctly', () => {
      render(<FloatingAccents pattern="linear" accentCount={4} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-pattern', 'linear');
    });

    it('applies circular pattern correctly', () => {
      render(<FloatingAccents pattern="circular" accentCount={5} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-pattern', 'circular');
    });

    it('applies corners pattern correctly', () => {
      render(<FloatingAccents pattern="corners" accentCount={4} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-pattern', 'corners');
    });

    it('applies edges pattern correctly', () => {
      render(<FloatingAccents pattern="edges" accentCount={6} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-pattern', 'edges');
    });
  });

  describe('Custom Accents', () => {
    it('renders custom accents when provided', () => {
      const customAccents = [
        {
          variant: 'emerald' as const,
          size: 'md' as const,
          position: { top: '20%', left: '30%' },
        },
        {
          variant: 'purple' as const,
          size: 'sm' as const,
          position: { bottom: '10%', right: '20%' },
        },
      ];

      render(<FloatingAccents customAccents={customAccents} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '2');

      // Should render custom accents with correct variants
      const firstAccent = screen.getByTestId('floating-accents-dot-0');
      expect(firstAccent).toHaveAttribute('data-variant', 'emerald');
      expect(firstAccent).toHaveAttribute('data-size', 'md');

      const secondAccent = screen.getByTestId('floating-accents-dot-1');
      expect(secondAccent).toHaveAttribute('data-variant', 'purple');
      expect(secondAccent).toHaveAttribute('data-size', 'sm');
    });

    it('applies default values to custom accents when properties are missing', () => {
      const customAccents = [
        { position: { top: '50%', left: '50%' } }, // Missing variant and size
      ];

      render(<FloatingAccents variant="teal" customAccents={customAccents} />);

      const accent = screen.getByTestId('floating-accents-dot-0');
      expect(accent).toHaveAttribute('data-variant', 'teal'); // Should inherit from parent
    });

    it('handles custom animation delays', () => {
      const customAccents = [{ animationDelay: 1.5 }, { animationDelay: 0.5 }];

      render(<FloatingAccents customAccents={customAccents} />);

      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-1')).toBeInTheDocument();
    });

    it('handles custom opacity values', () => {
      const customAccents = [{ opacity: 0.5 }, { opacity: 1.0 }];

      render(<FloatingAccents customAccents={customAccents} />);

      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-1')).toBeInTheDocument();
    });
  });

  describe('Container Styling', () => {
    it('applies default container dimensions', () => {
      render(<FloatingAccents />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveStyle({
        width: '100%',
        height: '100%',
      });
    });

    it('applies custom container dimensions', () => {
      render(
        <FloatingAccents containerWidth="400px" containerHeight="250px" />,
      );

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveStyle({
        width: '400px',
        height: '250px',
      });
    });

    it('applies responsive classes by default', () => {
      render(<FloatingAccents />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveClass('w-full', 'h-full');
    });

    it('removes responsive classes when disabled', () => {
      render(<FloatingAccents responsive={false} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).not.toHaveClass('w-full', 'h-full');
    });
  });

  describe('Atom Composition', () => {
    it('composes AccentDot atoms correctly', () => {
      render(<FloatingAccents accentCount={3} />);

      // Should have 3 AccentDot components
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-1')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-2')).toBeInTheDocument();
    });

    it('passes correct props to AccentDot atoms', () => {
      render(
        <FloatingAccents
          variant="purple"
          animated={true}
          animationSpeed={2}
          accentCount={2}
        />,
      );

      const firstAccent = screen.getByTestId('floating-accents-dot-0');
      expect(firstAccent).toHaveAttribute('data-variant', 'purple');
      expect(firstAccent).toHaveAttribute('data-animated', 'true');
      expect(firstAccent).toHaveAttribute('data-position', 'center');

      const secondAccent = screen.getByTestId('floating-accents-dot-1');
      expect(secondAccent).toHaveAttribute('data-variant', 'purple');
      expect(secondAccent).toHaveAttribute('data-animated', 'true');
      expect(secondAccent).toHaveAttribute('data-position', 'center');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('handles zero accent count gracefully', () => {
      render(<FloatingAccents accentCount={0} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '0');
      expect(
        screen.queryByTestId('floating-accents-dot-0'),
      ).not.toBeInTheDocument();
    });

    it('handles large accent counts', () => {
      render(<FloatingAccents accentCount={15} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '15');

      // Should render all 15 accents
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-14')).toBeInTheDocument();
    });

    it('handles empty custom accents array', () => {
      render(<FloatingAccents customAccents={[]} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '0');
      expect(
        screen.queryByTestId('floating-accents-dot-0'),
      ).not.toBeInTheDocument();
    });

    it('handles single accent', () => {
      render(<FloatingAccents accentCount={1} />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-accent-count', '1');

      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(
        screen.queryByTestId('floating-accents-dot-1'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Opacity Handling', () => {
    it('applies default opacity', () => {
      render(<FloatingAccents accentCount={1} />);

      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
    });

    it('applies custom opacity to all accents', () => {
      render(<FloatingAccents accentCount={2} opacity={0.5} />);

      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-1')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('forwards custom props to container', () => {
      render(<FloatingAccents data-custom="test-value" />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-custom', 'test-value');
    });

    it('applies custom className', () => {
      render(<FloatingAccents className="custom-accents" />);

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveClass('custom-accents');
    });

    it('uses custom testId when provided', () => {
      render(<FloatingAccents data-testid="custom-floating" accentCount={2} />);

      expect(screen.getByTestId('custom-floating')).toBeInTheDocument();
      expect(screen.getByTestId('custom-floating-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('custom-floating-dot-1')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('renders complete accent collection with all props', () => {
      render(
        <FloatingAccents
          variant="teal"
          size="lg"
          accentCount={5}
          animated={true}
          animationSpeed={1.5}
          sequence="wave"
          pattern="circular"
          opacity={0.7}
          containerWidth="500px"
          containerHeight="300px"
          responsive={false}
        />,
      );

      const container = screen.getByTestId('floating-accents');
      expect(container).toHaveAttribute('data-variant', 'teal');
      expect(container).toHaveAttribute('data-size', 'lg');
      expect(container).toHaveAttribute('data-accent-count', '5');
      expect(container).toHaveAttribute('data-sequence', 'wave');
      expect(container).toHaveAttribute('data-pattern', 'circular');
      expect(container).toHaveAttribute('data-animated', 'true');

      // Should render all 5 accents
      expect(screen.getByTestId('floating-accents-dot-0')).toBeInTheDocument();
      expect(screen.getByTestId('floating-accents-dot-4')).toBeInTheDocument();
    });
  });
});
