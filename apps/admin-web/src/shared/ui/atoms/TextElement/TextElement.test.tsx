import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextElement } from './TextElement';
import type { TextElementProps } from './TextElement';

describe('TextElement', () => {
  // Default props for testing
  const defaultProps: TextElementProps = {
    'data-testid': 'test-text-element',
    children: 'Test text content',
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<TextElement {...defaultProps} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('Test text content');
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveAttribute('data-variant', 'blue');
      expect(element).toHaveAttribute('data-size', 'md');
      expect(element).toHaveAttribute('data-weight', 'normal');
      expect(element).toHaveAttribute('data-align', 'left');
      expect(element).toHaveAttribute('data-truncate', 'false');
      expect(element).toHaveAttribute('data-opacity', 'full');
    });

    it('renders with custom test id', () => {
      render(<TextElement data-testid="custom-text">Custom text</TextElement>);
      
      const element = screen.getByTestId('custom-text');
      expect(element).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-text-element';
      render(<TextElement {...defaultProps} className={customClass} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveClass(customClass);
    });

    it('renders children content', () => {
      const content = 'This is test content';
      render(<TextElement {...defaultProps}>{content}</TextElement>);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveTextContent(content);
    });
  });

  describe('HTML Element Props', () => {
    const elements: Array<TextElementProps['as']> = [
      'span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'
    ];

    elements.forEach((elementType) => {
      it(`renders as ${elementType} element`, () => {
        render(<TextElement {...defaultProps} as={elementType} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element.tagName).toBe(elementType?.toUpperCase());
      });
    });
  });

  describe('Variant Props', () => {
    const variants: Array<TextElementProps['variant']> = ['blue', 'emerald', 'purple', 'teal'];
    const expectedClasses = {
      blue: 'text-blue-200',
      emerald: 'text-emerald-200',
      purple: 'text-purple-200',
      teal: 'text-teal-200',
    };

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        render(<TextElement {...defaultProps} variant={variant} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element).toHaveAttribute('data-variant', variant);
        
        if (variant) {
          expect(element).toHaveClass(expectedClasses[variant]);
        }
      });
    });
  });

  describe('Size Props', () => {
    const sizes: Array<TextElementProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const expectedClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base', 
      lg: 'text-lg',
      xl: 'text-xl',
    };

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        render(<TextElement {...defaultProps} size={size} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element).toHaveAttribute('data-size', size);
        
        if (size) {
          expect(element).toHaveClass(expectedClasses[size]);
        }
      });
    });
  });

  describe('Weight Props', () => {
    const weights: Array<TextElementProps['weight']> = [
      'light', 'normal', 'medium', 'semibold', 'bold'
    ];
    const expectedClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    weights.forEach((weight) => {
      it(`renders with ${weight} weight`, () => {
        render(<TextElement {...defaultProps} weight={weight} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element).toHaveAttribute('data-weight', weight);
        
        if (weight) {
          expect(element).toHaveClass(expectedClasses[weight]);
        }
      });
    });
  });

  describe('Alignment Props', () => {
    const alignments: Array<TextElementProps['align']> = [
      'left', 'center', 'right', 'justify'
    ];
    const expectedClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    alignments.forEach((align) => {
      it(`renders with ${align} alignment`, () => {
        render(<TextElement {...defaultProps} align={align} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element).toHaveAttribute('data-align', align);
        
        if (align) {
          expect(element).toHaveClass(expectedClasses[align]);
        }
      });
    });
  });

  describe('Opacity Props', () => {
    const opacities: Array<TextElementProps['opacity']> = [
      'low', 'medium', 'high', 'full'
    ];
    const expectedClasses = {
      low: 'opacity-40',
      medium: 'opacity-60',
      high: 'opacity-80',
      full: 'opacity-100',
    };

    opacities.forEach((opacity) => {
      it(`renders with ${opacity} opacity`, () => {
        render(<TextElement {...defaultProps} opacity={opacity} />);
        
        const element = screen.getByTestId('test-text-element');
        expect(element).toHaveAttribute('data-opacity', opacity);
        
        if (opacity) {
          expect(element).toHaveClass(expectedClasses[opacity]);
        }
      });
    });
  });

  describe('Truncation Props', () => {
    it('renders without truncation by default', () => {
      render(<TextElement {...defaultProps} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveAttribute('data-truncate', 'false');
      expect(element).not.toHaveClass('truncate');
      expect(element).not.toHaveClass('line-clamp-1');
    });

    it('applies single line truncation when truncate=true', () => {
      render(<TextElement {...defaultProps} truncate />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveAttribute('data-truncate', 'true');
      expect(element).toHaveClass('truncate');
    });

    it('applies multi-line truncation when lines prop is provided', () => {
      render(<TextElement {...defaultProps} truncate lines={3} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveAttribute('data-truncate', 'true');
      expect(element).toHaveAttribute('data-lines', '3');
      expect(element).toHaveClass('line-clamp-3');
      expect(element).not.toHaveClass('truncate');
    });

    it('handles lines prop without truncate flag', () => {
      render(<TextElement {...defaultProps} lines={2} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveAttribute('data-lines', '2');
      expect(element).not.toHaveClass('line-clamp-2');
      expect(element).not.toHaveClass('truncate');
    });
  });

  describe('Combination Props', () => {
    it('renders with multiple props combined', () => {
      render(
        <TextElement
          {...defaultProps}
          as="h2"
          variant="emerald"
          size="lg"
          weight="bold"
          align="center"
          opacity="high"
          truncate
          lines={2}
          className="custom-class"
        >
          Combined props text
        </TextElement>
      );
      
      const element = screen.getByTestId('test-text-element');
      
      // Check element type
      expect(element.tagName).toBe('H2');
      
      // Check all attributes are applied
      expect(element).toHaveAttribute('data-variant', 'emerald');
      expect(element).toHaveAttribute('data-size', 'lg');
      expect(element).toHaveAttribute('data-weight', 'bold');
      expect(element).toHaveAttribute('data-align', 'center');
      expect(element).toHaveAttribute('data-opacity', 'high');
      expect(element).toHaveAttribute('data-truncate', 'true');
      expect(element).toHaveAttribute('data-lines', '2');
      
      // Check classes are applied
      expect(element).toHaveClass('text-emerald-200'); // emerald variant
      expect(element).toHaveClass('text-lg'); // lg size
      expect(element).toHaveClass('font-bold'); // bold weight
      expect(element).toHaveClass('text-center'); // center align
      expect(element).toHaveClass('opacity-80'); // high opacity
      expect(element).toHaveClass('line-clamp-2'); // multi-line truncation
      expect(element).toHaveClass('custom-class'); // custom class
      
      // Check content
      expect(element).toHaveTextContent('Combined props text');
    });
  });

  describe('Accessibility', () => {
    it('preserves semantic HTML structure', () => {
      render(<TextElement as="h1" data-testid="heading">Heading Text</TextElement>);
      
      const element = screen.getByTestId('heading');
      expect(element.tagName).toBe('H1');
      expect(element).toHaveTextContent('Heading Text');
    });

    it('works with label elements', () => {
      render(<TextElement as="label" htmlFor="input-id" data-testid="label">Label Text</TextElement>);
      
      const element = screen.getByTestId('label');
      expect(element.tagName).toBe('LABEL');
      expect(element).toHaveAttribute('for', 'input-id');
      expect(element).toHaveTextContent('Label Text');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies transition classes for smooth color changes', () => {
      render(<TextElement {...defaultProps} />);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveClass('transition-colors', 'duration-200');
    });
  });

  describe('Content Handling', () => {
    it('renders complex children content', () => {
      render(
        <TextElement {...defaultProps}>
          <span>Nested</span> content with <strong>formatting</strong>
        </TextElement>
      );
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toContainHTML('<span>Nested</span> content with <strong>formatting</strong>');
    });

    it('handles empty content gracefully', () => {
      render(<TextElement {...defaultProps}>{''}</TextElement>);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('');
    });

    it('handles numeric content', () => {
      render(<TextElement {...defaultProps}>{42}</TextElement>);
      
      const element = screen.getByTestId('test-text-element');
      expect(element).toHaveTextContent('42');
    });
  });
});