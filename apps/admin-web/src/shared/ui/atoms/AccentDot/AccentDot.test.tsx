import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccentDot } from './AccentDot';
import type { AccentDotProps } from './AccentDot';

describe('AccentDot', () => {
  // Default props for testing
  const defaultProps: Partial<AccentDotProps> = {
    'data-testid': 'test-accent-dot',
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveAttribute('data-variant', 'blue');
      expect(dot).toHaveAttribute('data-size', 'sm');
      expect(dot).toHaveAttribute('data-position', 'top-right');
      expect(dot).toHaveAttribute('data-animated', 'false');
    });

    it('renders with custom test id', () => {
      render(<AccentDot data-testid="custom-dot" />);
      
      const dot = screen.getByTestId('custom-dot');
      expect(dot).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-accent-dot';
      render(<AccentDot {...defaultProps} className={customClass} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveClass(customClass);
    });
  });

  describe('Variant Props', () => {
    const variants: Array<AccentDotProps['variant']> = ['blue', 'emerald', 'purple', 'teal'];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<AccentDot {...defaultProps} variant={variant} />);
        
        const dot = screen.getByTestId('test-accent-dot');
        expect(dot).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Size Props', () => {
    const sizes: Array<AccentDotProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const expectedClasses = {
      xs: 'w-1 h-1',
      sm: 'w-2 h-2',
      md: 'w-3 h-3', 
      lg: 'w-4 h-4',
      xl: 'w-6 h-6',
    };

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<AccentDot {...defaultProps} size={size} />);
        
        const dot = screen.getByTestId('test-accent-dot');
        expect(dot).toHaveAttribute('data-size', size);
        
        if (size) {
          const [widthClass, heightClass] = expectedClasses[size].split(' ');
          expect(dot).toHaveClass(widthClass);
          expect(dot).toHaveClass(heightClass);
        }
      });
    });
  });

  describe('Position Props', () => {
    const positions: Array<AccentDotProps['position']> = [
      'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
    ];
    const expectedClasses = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    positions.forEach((position) => {
      it(`renders with ${position} position`, () => {
        render(<AccentDot {...defaultProps} position={position} />);
        
        const dot = screen.getByTestId('test-accent-dot');
        expect(dot).toHaveAttribute('data-position', position);
        
        if (position) {
          const positionClasses = expectedClasses[position].split(' ');
          positionClasses.forEach(cls => {
            expect(dot).toHaveClass(cls);
          });
        }
      });
    });
  });

  describe('Animation Props', () => {
    it('renders without animation by default', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveAttribute('data-animated', 'false');
      expect(dot).not.toHaveClass('animate-pulse');
    });

    it('renders with animation when animated=true', () => {
      render(<AccentDot {...defaultProps} animated />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveAttribute('data-animated', 'true');
      expect(dot).toHaveClass('animate-pulse');
    });

    it('applies custom animation speed', () => {
      render(<AccentDot {...defaultProps} animated animationSpeed={2} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      const style = window.getComputedStyle(dot);
      expect(style.animationDuration).toBe('1000ms'); // 2000 / 2 = 1000ms
    });

    it('applies animation delay', () => {
      render(<AccentDot {...defaultProps} animated animationDelay={300} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      const style = window.getComputedStyle(dot);
      expect(style.animationDelay).toBe('300ms');
    });
  });

  describe('Opacity Props', () => {
    it('renders with default opacity', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      const style = window.getComputedStyle(dot);
      expect(style.opacity).toBe('1');
    });

    it('applies custom opacity', () => {
      render(<AccentDot {...defaultProps} opacity={0.5} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      const style = window.getComputedStyle(dot);
      expect(style.opacity).toBe('0.5');
    });
  });

  describe('Style Props', () => {
    it('applies custom styles', () => {
      const customStyle = { transform: 'scale(1.5)', zIndex: 20 };
      render(<AccentDot {...defaultProps} style={customStyle} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveStyle('transform: scale(1.5)');
      expect(dot).toHaveStyle('z-index: 20');
    });

    it('applies background color based on variant', () => {
      const variants = {
        blue: 'rgb(59, 130, 246)',
        emerald: 'rgb(16, 185, 129)',
        purple: 'rgb(139, 92, 246)',
        teal: 'rgb(20, 184, 166)',
      };

      Object.entries(variants).forEach(([variant, expectedColor]) => {
        render(<AccentDot data-testid={`${variant}-dot`} variant={variant as any} />);
        
        const dot = screen.getByTestId(`${variant}-dot`);
        const style = window.getComputedStyle(dot);
        expect(style.backgroundColor).toBe(expectedColor);
      });
    });
  });

  describe('Accessibility', () => {
    it('has pointer-events-none for decoration', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveClass('pointer-events-none');
    });

    it('has select-none to prevent text selection', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveClass('select-none');
    });

    it('has appropriate z-index for layering', () => {
      render(<AccentDot {...defaultProps} />);
      
      const dot = screen.getByTestId('test-accent-dot');
      expect(dot).toHaveClass('z-10');
    });
  });

  describe('Combination Props', () => {
    it('renders with multiple props combined', () => {
      render(
        <AccentDot
          {...defaultProps}
          variant="emerald"
          size="lg"
          position="bottom-left"
          animated
          animationSpeed={1.5}
          opacity={0.8}
          className="custom-class"
        />
      );
      
      const dot = screen.getByTestId('test-accent-dot');
      
      // Check all attributes are applied
      expect(dot).toHaveAttribute('data-variant', 'emerald');
      expect(dot).toHaveAttribute('data-size', 'lg');
      expect(dot).toHaveAttribute('data-position', 'bottom-left');
      expect(dot).toHaveAttribute('data-animated', 'true');
      
      // Check classes are applied
      expect(dot).toHaveClass('w-4', 'h-4'); // lg size
      expect(dot).toHaveClass('bottom-2', 'left-2'); // bottom-left position
      expect(dot).toHaveClass('animate-pulse'); // animation
      expect(dot).toHaveClass('custom-class'); // custom class
      
      // Check styles are applied
      const style = window.getComputedStyle(dot);
      expect(style.opacity).toBe('0.8');
      expect(style.backgroundColor).toBe('rgb(16, 185, 129)'); // emerald
    });
  });

  describe('Box Shadow Effects', () => {
    it('applies appropriate box shadow based on size', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      
      sizes.forEach((size) => {
        render(<AccentDot data-testid={`${size}-dot`} size={size} />);
        
        const dot = screen.getByTestId(`${size}-dot`);
        const style = window.getComputedStyle(dot);
        
        // Box shadow should be present (exact value depends on browser rendering)
        expect(style.boxShadow).toBeTruthy();
      });
    });
  });
});