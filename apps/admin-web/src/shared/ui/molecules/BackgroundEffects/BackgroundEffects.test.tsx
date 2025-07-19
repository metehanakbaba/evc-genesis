import React from 'react';
import { render, screen } from '@testing-library/react';
import { BackgroundEffects } from './BackgroundEffects';

describe('BackgroundEffects', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<BackgroundEffects />);
      
      expect(screen.getByTestId('background-effects')).toBeInTheDocument();
      
      // Should render default number of orbs for medium size (5)
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-4')).toBeInTheDocument();
    });

    it('renders correct number of orbs based on size', () => {
      render(<BackgroundEffects size="xs" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '3');
      
      // Should have 3 orbs for xs size
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-2')).toBeInTheDocument();
      expect(screen.queryByTestId('background-effects-orb-3')).not.toBeInTheDocument();
    });

    it('renders custom orb count when specified', () => {
      render(<BackgroundEffects orbCount={7} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '7');
      
      // Should have 7 orbs
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-6')).toBeInTheDocument();
      expect(screen.queryByTestId('background-effects-orb-7')).not.toBeInTheDocument();
    });
  });

  describe('Variants and Styling', () => {
    it('applies variant correctly', () => {
      render(<BackgroundEffects variant="emerald" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-variant', 'emerald');
      
      // All orbs should inherit the variant
      const firstOrb = screen.getByTestId('background-effects-orb-0');
      expect(firstOrb).toHaveAttribute('data-variant', 'emerald');
    });

    it('applies size configuration correctly', () => {
      render(<BackgroundEffects size="lg" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-size', 'lg');
      expect(container).toHaveAttribute('data-orb-count', '6');
    });

    it('applies intensity to all orbs', () => {
      render(<BackgroundEffects intensity="strong" orbCount={2} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-intensity', 'strong');
    });
  });

  describe('Animation', () => {
    it('enables animation by default', () => {
      render(<BackgroundEffects />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-animated', 'true');
      
      // All orbs should be animated
      const firstOrb = screen.getByTestId('background-effects-orb-0');
      expect(firstOrb).toHaveAttribute('data-animated', 'true');
    });

    it('disables animation when specified', () => {
      render(<BackgroundEffects animated={false} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-animated', 'false');
      
      // All orbs should not be animated
      const firstOrb = screen.getByTestId('background-effects-orb-0');
      expect(firstOrb).toHaveAttribute('data-animated', 'false');
    });
  });

  describe('Positioning Patterns', () => {
    it('applies random pattern by default', () => {
      render(<BackgroundEffects orbCount={3} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-pattern', 'random');
    });

    it('applies corners pattern correctly', () => {
      render(<BackgroundEffects pattern="corners" orbCount={4} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-pattern', 'corners');
      
      // Should have 4 orbs positioned at corners
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-3')).toBeInTheDocument();
    });

    it('applies grid pattern correctly', () => {
      render(<BackgroundEffects pattern="grid" orbCount={6} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-pattern', 'grid');
    });

    it('applies center pattern correctly', () => {
      render(<BackgroundEffects pattern="center" orbCount={5} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-pattern', 'center');
    });

    it('applies edges pattern correctly', () => {
      render(<BackgroundEffects pattern="edges" orbCount={4} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-pattern', 'edges');
    });
  });

  describe('Custom Orbs', () => {
    it('renders custom orbs when provided', () => {
      const customOrbs = [
        { variant: 'emerald' as const, size: 'lg' as const, position: { top: '20%', left: '30%' } },
        { variant: 'purple' as const, size: 'md' as const, position: { bottom: '10%', right: '20%' } },
      ];
      
      render(<BackgroundEffects customOrbs={customOrbs} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '2');
      
      // Should render custom orbs with correct variants
      const firstOrb = screen.getByTestId('background-effects-orb-0');
      expect(firstOrb).toHaveAttribute('data-variant', 'emerald');
      expect(firstOrb).toHaveAttribute('data-size', 'lg');
      
      const secondOrb = screen.getByTestId('background-effects-orb-1');
      expect(secondOrb).toHaveAttribute('data-variant', 'purple');
      expect(secondOrb).toHaveAttribute('data-size', 'md');
    });

    it('applies default values to custom orbs when properties are missing', () => {
      const customOrbs = [
        { position: { top: '50%', left: '50%' } }, // Missing variant and size
      ];
      
      render(<BackgroundEffects variant="teal" customOrbs={customOrbs} />);
      
      const orb = screen.getByTestId('background-effects-orb-0');
      expect(orb).toHaveAttribute('data-variant', 'teal'); // Should inherit from parent
    });
  });

  describe('Container Styling', () => {
    it('applies default container dimensions', () => {
      render(<BackgroundEffects />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveStyle({
        width: '100%',
        height: '100%',
      });
    });

    it('applies custom container dimensions', () => {
      render(<BackgroundEffects containerWidth="500px" containerHeight="300px" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveStyle({
        width: '500px',
        height: '300px',
      });
    });

    it('applies responsive classes by default', () => {
      render(<BackgroundEffects />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveClass('w-full', 'h-full');
    });

    it('removes responsive classes when disabled', () => {
      render(<BackgroundEffects responsive={false} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).not.toHaveClass('w-full', 'h-full');
    });
  });

  describe('Atom Composition', () => {
    it('composes GlowOrb atoms correctly', () => {
      render(<BackgroundEffects orbCount={3} />);
      
      // Should have 3 GlowOrb components
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-1')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-2')).toBeInTheDocument();
    });

    it('passes correct props to GlowOrb atoms', () => {
      render(
        <BackgroundEffects 
          variant="purple"
          intensity="strong"
          blur="lg"
          animated={true}
          animationSpeed={2}
          orbCount={2}
        />
      );
      
      const firstOrb = screen.getByTestId('background-effects-orb-0');
      expect(firstOrb).toHaveAttribute('data-variant', 'purple');
      expect(firstOrb).toHaveAttribute('data-animated', 'true');
      
      const secondOrb = screen.getByTestId('background-effects-orb-1');
      expect(secondOrb).toHaveAttribute('data-variant', 'purple');
      expect(secondOrb).toHaveAttribute('data-animated', 'true');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('handles zero orb count gracefully', () => {
      render(<BackgroundEffects orbCount={0} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '0');
      expect(screen.queryByTestId('background-effects-orb-0')).not.toBeInTheDocument();
    });

    it('handles large orb counts', () => {
      render(<BackgroundEffects orbCount={20} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '20');
      
      // Should render all 20 orbs
      expect(screen.getByTestId('background-effects-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('background-effects-orb-19')).toBeInTheDocument();
    });

    it('handles empty custom orbs array', () => {
      render(<BackgroundEffects customOrbs={[]} />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-orb-count', '0');
      expect(screen.queryByTestId('background-effects-orb-0')).not.toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('forwards custom props to container', () => {
      render(<BackgroundEffects data-custom="test-value" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveAttribute('data-custom', 'test-value');
    });

    it('applies custom className', () => {
      render(<BackgroundEffects className="custom-effects" />);
      
      const container = screen.getByTestId('background-effects');
      expect(container).toHaveClass('custom-effects');
    });

    it('uses custom testId when provided', () => {
      render(<BackgroundEffects data-testid="custom-background" orbCount={2} />);
      
      expect(screen.getByTestId('custom-background')).toBeInTheDocument();
      expect(screen.getByTestId('custom-background-orb-0')).toBeInTheDocument();
      expect(screen.getByTestId('custom-background-orb-1')).toBeInTheDocument();
    });
  });
});