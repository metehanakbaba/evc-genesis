import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlowOrb } from './GlowOrb';
import type { GlowOrbProps } from './GlowOrb';

describe('GlowOrb', () => {
  // Default props for testing
  const defaultProps: Partial<GlowOrbProps> = {
    'data-testid': 'test-glow-orb',
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<GlowOrb {...defaultProps} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toBeInTheDocument();
      expect(orb).toHaveAttribute('data-variant', 'blue');
      expect(orb).toHaveAttribute('data-size', 'md');
      expect(orb).toHaveAttribute('data-animated', 'false');
    });

    it('renders with custom test id', () => {
      render(<GlowOrb data-testid="custom-orb" />);
      
      const orb = screen.getByTestId('custom-orb');
      expect(orb).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-glow-orb';
      render(<GlowOrb {...defaultProps} className={customClass} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveClass(customClass);
    });
  });

  describe('Variant Props', () => {
    const variants: Array<GlowOrbProps['variant']> = ['blue', 'emerald', 'purple', 'teal'];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<GlowOrb {...defaultProps} variant={variant} />);
        
        const orb = screen.getByTestId('test-glow-orb');
        expect(orb).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Size Props', () => {
    const sizes: Array<GlowOrbProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const expectedClasses = {
      xs: 'w-8 h-8',
      sm: 'w-16 h-16',
      md: 'w-24 h-24', 
      lg: 'w-32 h-32',
      xl: 'w-48 h-48',
    };

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<GlowOrb {...defaultProps} size={size} />);
        
        const orb = screen.getByTestId('test-glow-orb');
        expect(orb).toHaveAttribute('data-size', size);
        
        if (size) {
          const [widthClass, heightClass] = expectedClasses[size].split(' ');
          expect(orb).toHaveClass(widthClass);
          expect(orb).toHaveClass(heightClass);
        }
      });
    });
  });

  describe('Animation Props', () => {
    it('renders without animation by default', () => {
      render(<GlowOrb {...defaultProps} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveAttribute('data-animated', 'false');
      expect(orb).not.toHaveClass('animate-pulse');
    });

    it('renders with animation when animated=true', () => {
      render(<GlowOrb {...defaultProps} animated />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveAttribute('data-animated', 'true');
      expect(orb).toHaveClass('animate-pulse');
    });

    it('applies custom animation speed', () => {
      render(<GlowOrb {...defaultProps} animated animationSpeed={2} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      const style = window.getComputedStyle(orb);
      expect(style.animationDuration).toBe('1000ms'); // 2000 / 2 = 1000ms
    });

    it('applies animation delay', () => {
      render(<GlowOrb {...defaultProps} animated animationDelay={500} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      const style = window.getComputedStyle(orb);
      expect(style.animationDelay).toBe('500ms');
    });
  });

  describe('Visual Effect Props', () => {
    const blurOptions: Array<GlowOrbProps['blur']> = ['sm', 'md', 'lg', 'xl'];
    const expectedBlurClasses = {
      sm: 'blur-sm',
      md: 'blur-md',
      lg: 'blur-lg', 
      xl: 'blur-xl',
    };

    blurOptions.forEach((blur) => {
      it(`renders with ${blur} blur effect`, () => {
        render(<GlowOrb {...defaultProps} blur={blur} />);
        
        const orb = screen.getByTestId('test-glow-orb');
        if (blur) {
          expect(orb).toHaveClass(expectedBlurClasses[blur]);
        }
      });
    });

    const intensityOptions: Array<GlowOrbProps['intensity']> = ['subtle', 'medium', 'strong'];

    intensityOptions.forEach((intensity) => {
      it(`renders with ${intensity} intensity`, () => {
        render(<GlowOrb {...defaultProps} intensity={intensity} />);
        
        const orb = screen.getByTestId('test-glow-orb');
        expect(orb).toBeInTheDocument();
        // Intensity affects background gradient opacity, tested via visual regression
      });
    });
  });

  describe('Position Props', () => {
    it('renders with background position by default', () => {
      render(<GlowOrb {...defaultProps} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveClass('z-0');
    });

    it('renders with foreground position', () => {
      render(<GlowOrb {...defaultProps} position="foreground" />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveClass('z-10');
    });
  });

  describe('Style Props', () => {
    it('applies custom styles', () => {
      const customStyle = { opacity: 0.5, transform: 'scale(1.2)' };
      render(<GlowOrb {...defaultProps} style={customStyle} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveStyle('opacity: 0.5');
      expect(orb).toHaveStyle('transform: scale(1.2)');
    });
  });

  describe('Accessibility', () => {
    it('has pointer-events-none for background decoration', () => {
      render(<GlowOrb {...defaultProps} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveClass('pointer-events-none');
    });

    it('has select-none to prevent text selection', () => {
      render(<GlowOrb {...defaultProps} />);
      
      const orb = screen.getByTestId('test-glow-orb');
      expect(orb).toHaveClass('select-none');
    });
  });

  describe('Combination Props', () => {
    it('renders with multiple props combined', () => {
      render(
        <GlowOrb
          {...defaultProps}
          variant="emerald"
          size="lg"
          animated
          animationSpeed={1.5}
          intensity="strong"
          blur="xl"
          position="foreground"
          className="custom-class"
        />
      );
      
      const orb = screen.getByTestId('test-glow-orb');
      
      // Check all attributes are applied
      expect(orb).toHaveAttribute('data-variant', 'emerald');
      expect(orb).toHaveAttribute('data-size', 'lg');
      expect(orb).toHaveAttribute('data-animated', 'true');
      
      // Check classes are applied
      expect(orb).toHaveClass('w-32', 'h-32'); // lg size
      expect(orb).toHaveClass('blur-xl'); // xl blur
      expect(orb).toHaveClass('z-10'); // foreground position
      expect(orb).toHaveClass('animate-pulse'); // animation
      expect(orb).toHaveClass('custom-class'); // custom class
    });
  });
});