import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconContainer } from './IconContainer';
import type { IconContainerProps } from './IconContainer';

// Mock icon component for testing
const MockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} data-testid="mock-icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

describe('IconContainer', () => {
  // Default props for testing
  const defaultProps: IconContainerProps = {
    icon: MockIcon,
    'data-testid': 'test-icon-container',
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<IconContainer {...defaultProps} />);
      
      const container = screen.getByTestId('test-icon-container');
      const icon = screen.getByTestId('mock-icon');
      
      expect(container).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(container).toHaveAttribute('data-variant', 'blue');
      expect(container).toHaveAttribute('data-size', 'md');
      expect(container).toHaveAttribute('data-interactive', 'false');
      expect(container).toHaveAttribute('data-disabled', 'false');
      expect(container).toHaveAttribute('data-glow-effect', 'false');
    });

    it('renders with custom test id', () => {
      render(<IconContainer icon={MockIcon} data-testid="custom-container" />);
      
      const container = screen.getByTestId('custom-container');
      expect(container).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-icon-container';
      render(<IconContainer {...defaultProps} className={customClass} />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveClass(customClass);
    });

    it('applies custom iconClassName', () => {
      const customIconClass = 'custom-icon-class';
      render(<IconContainer {...defaultProps} iconClassName={customIconClass} />);
      
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toHaveClass(customIconClass);
    });
  });

  describe('Variant Props', () => {
    const variants: Array<IconContainerProps['variant']> = ['blue', 'emerald', 'purple', 'teal'];

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<IconContainer {...defaultProps} variant={variant} />);
        
        const container = screen.getByTestId('test-icon-container');
        expect(container).toHaveAttribute('data-variant', variant);
        
        // Check variant-specific classes are applied
        const variantClasses = {
          blue: 'bg-blue-500/10',
          emerald: 'bg-emerald-500/10',
          purple: 'bg-purple-500/10',
          teal: 'bg-teal-500/10',
        };
        
        expect(container).toHaveClass(variantClasses[variant!]);
      });
    });
  });

  describe('Size Props', () => {
    const sizes: Array<IconContainerProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const expectedContainerClasses = {
      xs: 'w-6 h-6 p-1',
      sm: 'w-8 h-8 p-1.5',
      md: 'w-10 h-10 p-2', 
      lg: 'w-12 h-12 p-2.5',
      xl: 'w-16 h-16 p-3',
    };
    const expectedIconClasses = {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
      xl: 'w-10 h-10',
    };

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<IconContainer {...defaultProps} size={size} />);
        
        const container = screen.getByTestId('test-icon-container');
        const icon = screen.getByTestId('mock-icon');
        
        expect(container).toHaveAttribute('data-size', size);
        
        if (size) {
          // Check container size classes
          const containerClasses = expectedContainerClasses[size].split(' ');
          containerClasses.forEach(cls => {
            expect(container).toHaveClass(cls);
          });
          
          // Check icon size classes
          const iconClasses = expectedIconClasses[size].split(' ');
          iconClasses.forEach(cls => {
            expect(icon).toHaveClass(cls);
          });
        }
      });
    });
  });

  describe('Interactive Props', () => {
    it('renders as non-interactive by default', () => {
      render(<IconContainer {...defaultProps} />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveAttribute('data-interactive', 'false');
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('tabIndex');
      expect(container).not.toHaveClass('cursor-pointer');
    });

    it('renders as interactive when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveAttribute('data-interactive', 'true');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
      expect(container).toHaveClass('cursor-pointer');
    });

    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} />);
      
      const container = screen.getByTestId('test-icon-container');
      fireEvent.click(container);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when interactive', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} />);
      
      const container = screen.getByTestId('test-icon-container');
      
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
  });

  describe('Disabled State', () => {
    it('renders as disabled when disabled=true', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} disabled />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveAttribute('data-disabled', 'true');
      expect(container).toHaveAttribute('data-interactive', 'false');
      expect(container).toHaveClass('cursor-not-allowed', 'opacity-50');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} disabled />);
      
      const container = screen.getByTestId('test-icon-container');
      fireEvent.click(container);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not respond to keyboard events when disabled', () => {
      const handleClick = jest.fn();
      render(<IconContainer {...defaultProps} onClick={handleClick} disabled />);
      
      const container = screen.getByTestId('test-icon-container');
      fireEvent.keyDown(container, { key: 'Enter' });
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Visual Effects', () => {
    it('applies glow effect when glowEffect=true', () => {
      render(<IconContainer {...defaultProps} glowEffect />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveAttribute('data-glow-effect', 'true');
      expect(container).toHaveClass('shadow-lg');
    });

    it('applies hover scale effect when hoverScale=true', () => {
      render(<IconContainer {...defaultProps} hoverScale />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveClass('hover:scale-110', 'active:scale-95');
    });

    it('applies hover glow effect when hoverGlow=true', () => {
      render(<IconContainer {...defaultProps} hoverGlow />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveClass('hover:shadow-lg');
    });

    it('does not apply hover effects when disabled', () => {
      render(
        <IconContainer 
          {...defaultProps} 
          hoverScale 
          hoverGlow 
          disabled 
          onClick={() => {}} 
        />
      );
      
      const container = screen.getByTestId('test-icon-container');
      // Hover effects should not be applied when disabled
      expect(container).not.toHaveClass('hover:scale-110');
      expect(container).not.toHaveClass('hover:shadow-lg');
    });
  });

  describe('Variant-specific Styling', () => {
    it('applies correct colors for each variant', () => {
      const variants = ['blue', 'emerald', 'purple', 'teal'] as const;
      
      variants.forEach((variant) => {
        const { container } = render(<IconContainer icon={MockIcon} variant={variant} data-testid={`${variant}-container`} />);
        
        const containerElement = screen.getByTestId(`${variant}-container`);
        const icon = container.querySelector('svg');
        
        // Check background color classes
        expect(containerElement).toHaveClass(`bg-${variant}-500/10`);
        
        // Check border color classes
        expect(containerElement).toHaveClass(`border-${variant}-400/20`);
        
        // Check text color classes
        expect(icon).toHaveClass(`text-${variant}-400`);
      });
    });

    it('applies glow effect with variant colors', () => {
      const variants = ['blue', 'emerald', 'purple', 'teal'] as const;
      
      variants.forEach((variant) => {
        render(
          <IconContainer 
            icon={MockIcon} 
            variant={variant} 
            glowEffect 
            data-testid={`${variant}-glow-container`} 
          />
        );
        
        const container = screen.getByTestId(`${variant}-glow-container`);
        expect(container).toHaveClass(`shadow-${variant}-500/20`);
      });
    });
  });

  describe('Combination Props', () => {
    it('renders with multiple props combined', () => {
      const handleClick = jest.fn();
      render(
        <IconContainer
          {...defaultProps}
          variant="emerald"
          size="lg"
          glowEffect
          hoverScale
          hoverGlow
          onClick={handleClick}
          className="custom-class"
          iconClassName="custom-icon-class"
        />
      );
      
      const container = screen.getByTestId('test-icon-container');
      const icon = screen.getByTestId('mock-icon');
      
      // Check all attributes are applied
      expect(container).toHaveAttribute('data-variant', 'emerald');
      expect(container).toHaveAttribute('data-size', 'lg');
      expect(container).toHaveAttribute('data-interactive', 'true');
      expect(container).toHaveAttribute('data-glow-effect', 'true');
      
      // Check classes are applied
      expect(container).toHaveClass('w-12', 'h-12', 'p-2.5'); // lg size
      expect(container).toHaveClass('bg-emerald-500/10'); // emerald variant
      expect(container).toHaveClass('shadow-lg', 'shadow-emerald-500/20'); // glow effect
      expect(container).toHaveClass('hover:scale-110'); // hover scale
      expect(container).toHaveClass('cursor-pointer'); // interactive
      expect(container).toHaveClass('custom-class'); // custom class
      
      expect(icon).toHaveClass('w-7', 'h-7'); // lg icon size
      expect(icon).toHaveClass('text-emerald-400'); // emerald text
      expect(icon).toHaveClass('custom-icon-class'); // custom icon class
      
      // Test interaction
      fireEvent.click(container);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when interactive', () => {
      render(<IconContainer {...defaultProps} onClick={() => {}} />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
    });

    it('does not have ARIA attributes when not interactive', () => {
      render(<IconContainer {...defaultProps} />);
      
      const container = screen.getByTestId('test-icon-container');
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('tabIndex');
    });
  });
});