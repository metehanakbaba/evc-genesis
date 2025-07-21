import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import type { GeometricDecorationProps } from './GeometricDecoration';
import { GeometricDecoration } from './GeometricDecoration';

describe('GeometricDecoration', () => {
  // Default props for testing
  const defaultProps: Partial<GeometricDecorationProps> = {
    'data-testid': 'test-geometric-decoration',
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<GeometricDecoration {...defaultProps} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toBeInTheDocument();
      expect(decoration).toHaveAttribute('data-variant', 'blue');
      expect(decoration).toHaveAttribute('data-shape', 'circle');
      expect(decoration).toHaveAttribute('data-size', 'md');
      expect(decoration).toHaveAttribute('data-pattern', 'solid');
      expect(decoration).toHaveAttribute('data-thickness', 'medium');
      expect(decoration).toHaveAttribute('data-position', 'top-right');
      expect(decoration).toHaveAttribute('data-animated', 'false');
    });

    it('renders with custom test id', () => {
      render(<GeometricDecoration data-testid="custom-decoration" />);

      const decoration = screen.getByTestId('custom-decoration');
      expect(decoration).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-geometric-decoration';
      render(<GeometricDecoration {...defaultProps} className={customClass} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass(customClass);
    });
  });

  describe('Shape Props', () => {
    const shapes: Array<GeometricDecorationProps['shape']> = [
      'circle',
      'ring',
      'line',
      'arc',
      'dots',
    ];

    shapes.forEach((shape) => {
      it(`renders with ${shape} shape`, () => {
        render(<GeometricDecoration {...defaultProps} shape={shape} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-shape', shape);
      });
    });

    it('applies correct classes for circle shape', () => {
      render(<GeometricDecoration {...defaultProps} shape="circle" />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('rounded-full');
    });

    it('applies correct classes for ring shape', () => {
      render(<GeometricDecoration {...defaultProps} shape="ring" />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('rounded-full', 'bg-transparent');
    });

    it('applies correct classes for line shape', () => {
      render(<GeometricDecoration {...defaultProps} shape="line" />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('w-16', 'h-0');
    });

    it('applies correct classes for arc shape', () => {
      render(<GeometricDecoration {...defaultProps} shape="arc" />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass(
        'rounded-full',
        'border-t-transparent',
        'border-r-transparent',
      );
    });

    it('renders dots pattern correctly', () => {
      render(<GeometricDecoration {...defaultProps} shape="dots" size="md" />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('flex', 'gap-1');

      // Should render 4 dots for md size
      const dots = decoration.querySelectorAll('div');
      expect(dots).toHaveLength(4);

      dots.forEach((dot) => {
        expect(dot).toHaveClass('rounded-full', 'bg-blue-400/30', 'w-2', 'h-2');
      });
    });
  });

  describe('Variant Props', () => {
    const variants: Array<GeometricDecorationProps['variant']> = [
      'blue',
      'emerald',
      'purple',
      'teal',
    ];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<GeometricDecoration {...defaultProps} variant={variant} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Size Props', () => {
    const sizes: Array<GeometricDecorationProps['size']> = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
    ];
    const expectedClasses = {
      xs: 'w-4 h-4',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<GeometricDecoration {...defaultProps} size={size} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-size', size);

        if (size) {
          const [widthClass, heightClass] = expectedClasses[size].split(' ');
          expect(decoration).toHaveClass(widthClass);
          expect(decoration).toHaveClass(heightClass);
        }
      });
    });

    it('renders correct dot count for different sizes', () => {
      const dotCounts = {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
      };

      Object.entries(dotCounts).forEach(([size, expectedCount]) => {
        render(
          <GeometricDecoration
            shape="dots"
            size={size as any}
            data-testid={`dots-${size}`}
          />,
        );

        const decoration = screen.getByTestId(`dots-${size}`);
        const dots = decoration.querySelectorAll('div');
        expect(dots).toHaveLength(expectedCount);
      });
    });
  });

  describe('Position Props', () => {
    const positions: Array<GeometricDecorationProps['position']> = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'center',
    ];
    const expectedClasses = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    positions.forEach((position) => {
      it(`renders with ${position} position`, () => {
        render(<GeometricDecoration {...defaultProps} position={position} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-position', position);

        if (position) {
          const positionClasses = expectedClasses[position].split(' ');
          positionClasses.forEach((cls) => {
            expect(decoration).toHaveClass(cls);
          });
        }
      });
    });
  });

  describe('Pattern Props', () => {
    const patterns: Array<GeometricDecorationProps['pattern']> = [
      'solid',
      'dashed',
      'dotted',
      'gradient',
    ];
    const expectedClasses = {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      gradient: '', // Handled via CSS
    };

    patterns.forEach((pattern) => {
      it(`renders with ${pattern} pattern`, () => {
        render(<GeometricDecoration {...defaultProps} pattern={pattern} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-pattern', pattern);

        if (pattern && expectedClasses[pattern]) {
          expect(decoration).toHaveClass(expectedClasses[pattern]);
        }
      });
    });

    it('applies gradient background for gradient pattern', () => {
      render(<GeometricDecoration {...defaultProps} pattern="gradient" />);

      const decoration = screen.getByTestId('test-geometric-decoration');

      // Check that gradient pattern is applied via inline styles
      // In jsdom, we check the style attribute directly since getComputedStyle may not work
      expect(decoration).toHaveStyle({
        background:
          'linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, transparent 50%, rgba(59, 130, 246, 0.3) 100%)',
        border: 'none',
      });
    });
  });

  describe('Thickness Props', () => {
    const thicknesses: Array<GeometricDecorationProps['thickness']> = [
      'thin',
      'medium',
      'thick',
    ];
    const expectedClasses = {
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
    };

    thicknesses.forEach((thickness) => {
      it(`renders with ${thickness} thickness`, () => {
        render(<GeometricDecoration {...defaultProps} thickness={thickness} />);

        const decoration = screen.getByTestId('test-geometric-decoration');
        expect(decoration).toHaveAttribute('data-thickness', thickness);

        if (thickness) {
          expect(decoration).toHaveClass(expectedClasses[thickness]);
        }
      });
    });
  });

  describe('Animation Props', () => {
    it('renders without animation by default', () => {
      render(<GeometricDecoration {...defaultProps} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveAttribute('data-animated', 'false');
      expect(decoration).not.toHaveClass('animate-pulse');
    });

    it('renders with animation when animated=true', () => {
      render(<GeometricDecoration {...defaultProps} animated />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveAttribute('data-animated', 'true');
      expect(decoration).toHaveClass('animate-pulse');
    });

    it('applies custom animation speed', () => {
      render(
        <GeometricDecoration {...defaultProps} animated animationSpeed={2} />,
      );

      const decoration = screen.getByTestId('test-geometric-decoration');
      const style = window.getComputedStyle(decoration);
      expect(style.animationDuration).toBe('1000ms'); // 2000 / 2 = 1000ms
    });

    it('applies animation delay', () => {
      render(
        <GeometricDecoration {...defaultProps} animated animationDelay={500} />,
      );

      const decoration = screen.getByTestId('test-geometric-decoration');
      const style = window.getComputedStyle(decoration);
      expect(style.animationDelay).toBe('500ms');
    });
  });

  describe('Style Props', () => {
    it('applies custom styles', () => {
      const customStyle = { opacity: 0.5, transform: 'rotate(45deg)' };
      render(<GeometricDecoration {...defaultProps} style={customStyle} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveStyle('opacity: 0.5');
      expect(decoration).toHaveStyle('transform: rotate(45deg)');
    });
  });

  describe('Accessibility', () => {
    it('has pointer-events-none for decoration', () => {
      render(<GeometricDecoration {...defaultProps} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('pointer-events-none');
    });

    it('has select-none to prevent text selection', () => {
      render(<GeometricDecoration {...defaultProps} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('select-none');
    });

    it('has absolute positioning for overlay decoration', () => {
      render(<GeometricDecoration {...defaultProps} />);

      const decoration = screen.getByTestId('test-geometric-decoration');
      expect(decoration).toHaveClass('absolute');
    });
  });

  describe('Combination Props', () => {
    it('renders with multiple props combined', () => {
      render(
        <GeometricDecoration
          {...defaultProps}
          variant="emerald"
          shape="ring"
          size="lg"
          pattern="dashed"
          thickness="thick"
          position="bottom-left"
          animated
          animationSpeed={1.5}
          className="custom-class"
        />,
      );

      const decoration = screen.getByTestId('test-geometric-decoration');

      // Check all attributes are applied
      expect(decoration).toHaveAttribute('data-variant', 'emerald');
      expect(decoration).toHaveAttribute('data-shape', 'ring');
      expect(decoration).toHaveAttribute('data-size', 'lg');
      expect(decoration).toHaveAttribute('data-pattern', 'dashed');
      expect(decoration).toHaveAttribute('data-thickness', 'thick');
      expect(decoration).toHaveAttribute('data-position', 'bottom-left');
      expect(decoration).toHaveAttribute('data-animated', 'true');

      // Check classes are applied
      expect(decoration).toHaveClass('w-16', 'h-16'); // lg size
      expect(decoration).toHaveClass('rounded-full', 'bg-transparent'); // ring shape
      expect(decoration).toHaveClass('border-dashed'); // dashed pattern
      expect(decoration).toHaveClass('border-4'); // thick thickness
      expect(decoration).toHaveClass('bottom-4', 'left-4'); // bottom-left position
      expect(decoration).toHaveClass('animate-pulse'); // animation
      expect(decoration).toHaveClass('custom-class'); // custom class
    });
  });

  describe('Dots Shape Special Cases', () => {
    it('renders different dot sizes based on container size', () => {
      const sizes = ['xs', 'sm', 'md'] as const;
      const expectedDotClasses = {
        xs: 'w-1 h-1',
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
      };

      sizes.forEach((size) => {
        render(
          <GeometricDecoration
            shape="dots"
            size={size}
            data-testid={`dots-size-${size}`}
          />,
        );

        const decoration = screen.getByTestId(`dots-size-${size}`);
        const firstDot = decoration.querySelector('div');

        if (firstDot) {
          const [widthClass, heightClass] = expectedDotClasses[size].split(' ');
          expect(firstDot).toHaveClass(widthClass);
          expect(firstDot).toHaveClass(heightClass);
        }
      });
    });
  });
});
