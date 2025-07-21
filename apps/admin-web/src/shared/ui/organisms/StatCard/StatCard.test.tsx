import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { StatCard } from './StatCard';

// Mock icon component for testing
const MockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} data-testid="mock-icon">
    Icon
  </div>
);

// Default props for testing
const defaultProps = {
  title: 'Active Stations',
  value: '156',
  icon: MockIcon,
  trend: '+12%',
  description: 'Charging stations currently online and operational',
  variant: 'blue' as const,
  gradient: 'from-blue-500/10 to-blue-600/5',
  glowColor: 'blue-500',
};

describe('StatCard', () => {
  describe('Component Composition', () => {
    it('renders all composed sub-components correctly', () => {
      render(<StatCard {...defaultProps} />);

      // Verify main container
      expect(screen.getByTestId('stat-card')).toBeInTheDocument();

      // Verify BackgroundEffects molecule is rendered
      expect(
        screen.getByTestId('stat-card-background-effects'),
      ).toBeInTheDocument();

      // Verify AccentDot atoms are rendered
      expect(screen.getByTestId('stat-card-accent-large')).toBeInTheDocument();
      expect(screen.getByTestId('stat-card-accent-small')).toBeInTheDocument();

      // Verify TrendIndicator molecule is rendered
      expect(
        screen.getByTestId('stat-card-trend-indicator'),
      ).toBeInTheDocument();

      // Verify StatValue molecule is rendered
      expect(screen.getByTestId('stat-card-stat-value')).toBeInTheDocument();

      // Verify GeometricDecoration atom is rendered
      expect(
        screen.getByTestId('stat-card-geometric-decoration'),
      ).toBeInTheDocument();
    });

    it('passes correct props to StatValue molecule', () => {
      render(<StatCard {...defaultProps} />);

      const statValue = screen.getByTestId('stat-card-stat-value');
      expect(statValue).toHaveAttribute('data-variant', 'blue');
      expect(statValue).toHaveAttribute('data-size', 'lg');
      expect(statValue).toHaveAttribute('data-orientation', 'vertical');
    });

    it('passes correct props to TrendIndicator molecule', () => {
      render(<StatCard {...defaultProps} />);

      const trendIndicator = screen.getByTestId('stat-card-trend-indicator');
      expect(trendIndicator).toHaveAttribute('data-status', 'live');
      expect(trendIndicator).toHaveAttribute('data-size', 'sm');
      expect(trendIndicator).toHaveAttribute('data-orientation', 'vertical');
      expect(trendIndicator).toHaveAttribute('data-dot-position', 'left');
    });

    it('passes correct props to BackgroundEffects molecule', () => {
      render(<StatCard {...defaultProps} />);

      const backgroundEffects = screen.getByTestId(
        'stat-card-background-effects',
      );
      expect(backgroundEffects).toHaveAttribute('data-variant', 'blue');
      expect(backgroundEffects).toHaveAttribute('data-size', 'sm');
      expect(backgroundEffects).toHaveAttribute('data-orb-count', '2');
      expect(backgroundEffects).toHaveAttribute('data-pattern', 'corners');
      expect(backgroundEffects).toHaveAttribute('data-intensity', 'subtle');
      expect(backgroundEffects).toHaveAttribute('data-animated', 'true');
    });

    it('passes correct props to GeometricDecoration atom', () => {
      render(<StatCard {...defaultProps} />);

      const geometricDecoration = screen.getByTestId(
        'stat-card-geometric-decoration',
      );
      expect(geometricDecoration).toHaveAttribute('data-variant', 'blue');
      expect(geometricDecoration).toHaveAttribute('data-shape', 'circle');
      expect(geometricDecoration).toHaveAttribute('data-pattern', 'solid');
      expect(geometricDecoration).toHaveAttribute('data-thickness', 'thin');
      expect(geometricDecoration).toHaveAttribute('data-size', 'md');
      expect(geometricDecoration).toHaveAttribute(
        'data-position',
        'bottom-right',
      );
      expect(geometricDecoration).toHaveAttribute('data-animated', 'true');
    });
  });

  describe('Visual Parity with RevolutionaryStatCard', () => {
    it('maintains exact visual structure and classes', () => {
      render(<StatCard {...defaultProps} />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveClass('group', 'relative', 'h-full');

      // Check for floating background glow
      const glowElement = container.querySelector('.absolute.-inset-4');
      expect(glowElement).toBeInTheDocument();
      expect(glowElement).toHaveClass(
        'bg-gradient-to-r',
        'rounded-3xl',
        'blur-xl',
      );

      // Check main card structure
      const cardElement = container.querySelector(
        '.relative.h-full.min-h-\\[200px\\].max-h-\\[240px\\]',
      );
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveClass(
        'backdrop-blur-xl',
        'border',
        'border-white/10',
        'rounded-3xl',
        'hover:border-white/20',
        'transition-all',
        'duration-700',
        'ease-out',
        'transform',
        'hover:scale-105',
        'hover:-translate-y-3',
        'shadow-2xl',
        'hover:shadow-4xl',
        'flex',
        'flex-col',
        'overflow-hidden',
      );
    });

    it('renders icon container with exact styling', () => {
      render(<StatCard {...defaultProps} />);

      const iconContainer = screen
        .getByTestId('stat-card')
        .querySelector('.w-14.h-14.rounded-2xl');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass(
        'relative',
        'w-14',
        'h-14',
        'rounded-2xl',
        'bg-gradient-to-br',
        'from-blue-500/30',
        'to-blue-400/20',
        'border-blue-400/40',
        'border',
        'flex',
        'items-center',
        'justify-center',
        'group-hover:scale-110',
        'transition-transform',
        'duration-500',
      );

      // Verify icon is rendered with correct classes
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveClass('w-7', 'h-7', 'text-blue-300', 'drop-shadow-lg');
    });

    it('renders description with exact hover behavior', () => {
      render(<StatCard {...defaultProps} />);

      const description = screen.getByText(defaultProps.description);
      expect(description).toHaveClass(
        'text-xs',
        'text-gray-400',
        'leading-relaxed',
        'opacity-0',
        'group-hover:opacity-100',
        'transform',
        'translate-y-2',
        'group-hover:translate-y-0',
        'transition-all',
        'duration-500',
        'delay-100',
        'text-truncate-multi',
      );
    });
  });

  describe('Variant Support', () => {
    const variants = ['blue', 'emerald', 'purple', 'teal'] as const;

    variants.forEach((variant) => {
      it(`renders correctly with ${variant} variant`, () => {
        render(<StatCard {...defaultProps} variant={variant} />);

        const container = screen.getByTestId('stat-card');
        expect(container).toHaveAttribute('data-variant', variant);

        // Verify variant is passed to sub-components
        expect(
          screen.getByTestId('stat-card-background-effects'),
        ).toHaveAttribute('data-variant', variant);
        expect(screen.getByTestId('stat-card-stat-value')).toHaveAttribute(
          'data-variant',
          variant,
        );
        expect(
          screen.getByTestId('stat-card-geometric-decoration'),
        ).toHaveAttribute('data-variant', variant);
      });

      it(`applies correct icon styling for ${variant} variant`, () => {
        render(<StatCard {...defaultProps} variant={variant} />);

        const icon = screen.getByTestId('mock-icon');
        const expectedColorClass = `text-${variant}-300`;
        expect(icon).toHaveClass(expectedColorClass);
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<StatCard {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveAttribute('data-interactive', 'true');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');

      fireEvent.click(container);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when interactive', () => {
      const handleClick = jest.fn();
      render(<StatCard {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId('stat-card');

      // Test Enter key
      fireEvent.keyDown(container, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(container, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);

      // Test other keys (should not trigger)
      fireEvent.keyDown(container, { key: 'Escape' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('does not add interactive attributes when onClick is not provided', () => {
      render(<StatCard {...defaultProps} />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveAttribute('data-interactive', 'false');
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Size Support', () => {
    it('applies size prop correctly', () => {
      render(<StatCard {...defaultProps} size="lg" />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveAttribute('data-size', 'lg');
    });

    it('defaults to medium size when not specified', () => {
      render(<StatCard {...defaultProps} />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveAttribute('data-size', 'md');
    });
  });

  describe('Accessibility', () => {
    it('provides proper accessibility attributes for interactive cards', () => {
      const handleClick = jest.fn();
      render(<StatCard {...defaultProps} onClick={handleClick} />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
    });

    it('includes proper data attributes for testing', () => {
      render(<StatCard {...defaultProps} data-testid="custom-test-id" />);

      const container = screen.getByTestId('custom-test-id');
      expect(container).toHaveAttribute('data-variant', 'blue');
      expect(container).toHaveAttribute('data-size', 'md');
      expect(container).toHaveAttribute('data-interactive', 'false');
    });
  });

  describe('Content Display', () => {
    it('displays all content correctly', () => {
      render(<StatCard {...defaultProps} />);

      // Content is displayed through composed molecules
      expect(screen.getByTestId('stat-card-stat-value')).toBeInTheDocument();
      expect(
        screen.getByTestId('stat-card-trend-indicator'),
      ).toBeInTheDocument();
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('handles long content gracefully', () => {
      const longProps = {
        ...defaultProps,
        title: 'Very Long Title That Should Be Truncated Properly',
        description:
          'Very long description that should be handled properly with overflow and truncation behavior to ensure the card layout remains intact',
      };

      render(<StatCard {...longProps} />);

      // Verify components are still rendered
      expect(screen.getByTestId('stat-card-stat-value')).toBeInTheDocument();
      expect(screen.getByText(longProps.description)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing optional props gracefully', () => {
      const minimalProps = {
        title: 'Test',
        value: '123',
        icon: MockIcon,
        trend: '+5%',
        description: 'Test description',
        variant: 'blue' as const,
        gradient: 'from-blue-500/10',
        glowColor: 'blue-500',
      };

      expect(() => render(<StatCard {...minimalProps} />)).not.toThrow();
      expect(screen.getByTestId('stat-card')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<StatCard {...defaultProps} className="custom-class" />);

      const container = screen.getByTestId('stat-card');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Performance', () => {
    it('renders efficiently with multiple instances', () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <StatCard
              key={index}
              {...defaultProps}
              title={`Card ${index}`}
              value={`${index * 100}`}
            />
          ))}
        </div>,
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 10 cards in reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);

      // Verify all cards are rendered
      expect(screen.getAllByTestId('stat-card')).toHaveLength(10);
    });
  });
});
