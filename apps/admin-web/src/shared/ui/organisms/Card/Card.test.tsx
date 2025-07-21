import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './Card';

describe('Card', () => {
  const defaultProps = {
    children: <div data-testid="card-content">Test Content</div>,
  };

  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Card {...defaultProps} className="custom-class" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('renders with custom test id', () => {
      render(<Card {...defaultProps} data-testid="custom-card" />);

      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    const variants = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'glass',
      'stat',
      'management',
    ] as const;

    it.each(variants)('renders %s variant correctly', (variant) => {
      render(<Card {...defaultProps} variant={variant} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-variant', variant);
    });

    it('applies correct styling for primary variant', () => {
      render(<Card {...defaultProps} variant="primary" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-gradient-to-br');
      expect(card).toHaveClass('from-blue-500/10');
      expect(card).toHaveClass('border-blue-400/25');
    });

    it('applies correct styling for glass variant', () => {
      render(<Card {...defaultProps} variant="glass" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-gray-900/20');
      expect(card).toHaveClass('border-white/10');
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    it.each(sizes)('renders %s size correctly', (size) => {
      render(<Card {...defaultProps} size={size} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-size', size);
    });

    it('applies correct padding for large size', () => {
      render(<Card {...defaultProps} size="lg" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-8');
      expect(card).toHaveClass('rounded-2xl');
    });

    it('applies correct padding for small size', () => {
      render(<Card {...defaultProps} size="sm" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-4');
      expect(card).toHaveClass('rounded-lg');
    });
  });

  describe('Floating Effects', () => {
    const floatingOptions = ['none', 'subtle', 'medium', 'strong'] as const;

    it.each(floatingOptions)('applies %s floating effect', (floating) => {
      render(<Card {...defaultProps} floating={floating} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-floating', floating);
    });

    it('applies hover transform for medium floating', () => {
      render(<Card {...defaultProps} floating="medium" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:scale-[1.02]');
      expect(card).toHaveClass('hover:-translate-y-1');
    });

    it('does not apply hover transform for none floating', () => {
      render(<Card {...defaultProps} floating="none" />);

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:scale-[1.02]');
    });
  });

  describe('Height Modes', () => {
    it('applies auto height mode by default', () => {
      render(<Card {...defaultProps} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-height-mode', 'auto');
    });

    it('applies fixed height mode with flex layout', () => {
      render(<Card {...defaultProps} heightMode="fixed" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-height-mode', 'fixed');
      expect(card).toHaveClass('flex');
      expect(card).toHaveClass('flex-col');
      expect(card).toHaveClass('overflow-hidden');
    });

    it('applies fill height mode', () => {
      render(<Card {...defaultProps} heightMode="fill" />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-height-mode', 'fill');
      expect(card).toHaveClass('h-full');
      expect(card).toHaveClass('flex');
      expect(card).toHaveClass('flex-col');
    });

    it('applies custom min and max height', () => {
      render(<Card {...defaultProps} minHeight="300px" maxHeight="500px" />);

      const card = screen.getByTestId('card');
      expect(card.style.minHeight).toBe('300px');
      expect(card.style.maxHeight).toBe('500px');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-interactive', 'true');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');

      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when interactive', () => {
      const handleClick = jest.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen.getByTestId('card');

      // Test Enter key
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);

      // Test other keys (should not trigger)
      fireEvent.keyDown(card, { key: 'Escape' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('applies interactive styling when interactive prop is true', () => {
      render(<Card {...defaultProps} interactive />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-interactive', 'true');

      // Check that interactive classes are applied (they may be combined by cn function)
      const className = card.className;
      expect(className).toContain('cursor-pointer');
    });

    it('does not apply interactive styling when not interactive', () => {
      render(<Card {...defaultProps} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-interactive', 'false');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Visual Effects', () => {
    it('renders accent dot by default', () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByTestId('card-accent-dot')).toBeInTheDocument();
    });

    it('does not render accent dot when showAccent is false', () => {
      render(<Card {...defaultProps} showAccent={false} />);

      expect(screen.queryByTestId('card-accent-dot')).not.toBeInTheDocument();
    });

    it('does not render accent dot for glass variant', () => {
      render(<Card {...defaultProps} variant="glass" />);

      expect(screen.queryByTestId('card-accent-dot')).not.toBeInTheDocument();
    });

    it('renders background effects when enabled', () => {
      render(<Card {...defaultProps} backgroundEffects />);

      expect(screen.getByTestId('card-background-effects')).toBeInTheDocument();
    });

    it('does not render background effects by default', () => {
      render(<Card {...defaultProps} />);

      expect(
        screen.queryByTestId('card-background-effects'),
      ).not.toBeInTheDocument();
    });

    it('applies animation classes when animated', () => {
      render(<Card {...defaultProps} animated />);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-500');
      expect(card).toHaveClass('ease-out');
    });

    it('does not apply animation classes when not animated', () => {
      render(<Card {...defaultProps} animated={false} />);

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('transition-all');
    });
  });

  describe('Sub-components', () => {
    describe('Card.Header', () => {
      it('renders with title and description', () => {
        render(
          <Card>
            <Card.Header title="Test Title" description="Test Description" />
          </Card>,
        );

        expect(screen.getByTestId('card-header')).toBeInTheDocument();
        expect(screen.getByTestId('card-header-title')).toHaveTextContent(
          'Test Title',
        );
        expect(screen.getByTestId('card-header-description')).toHaveTextContent(
          'Test Description',
        );
      });

      it('renders with action element', () => {
        const action = <button data-testid="header-action">Action</button>;
        render(
          <Card>
            <Card.Header title="Test Title" action={action} />
          </Card>,
        );

        expect(screen.getByTestId('card-header-action')).toBeInTheDocument();
        expect(screen.getByTestId('header-action')).toBeInTheDocument();
      });

      it('renders custom children instead of title/description', () => {
        render(
          <Card>
            <Card.Header>
              <div data-testid="custom-header">Custom Header Content</div>
            </Card.Header>
          </Card>,
        );

        expect(screen.getByTestId('custom-header')).toBeInTheDocument();
        expect(
          screen.queryByTestId('card-header-title'),
        ).not.toBeInTheDocument();
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Header title="Test" className="custom-header-class" />
          </Card>,
        );

        const header = screen.getByTestId('card-header');
        expect(header).toHaveClass('custom-header-class');
      });
    });

    describe('Card.Body', () => {
      it('renders with children', () => {
        render(
          <Card>
            <Card.Body>
              <div data-testid="body-content">Body Content</div>
            </Card.Body>
          </Card>,
        );

        expect(screen.getByTestId('card-body')).toBeInTheDocument();
        expect(screen.getByTestId('body-content')).toBeInTheDocument();
      });

      it('applies scrollable styling when enabled', () => {
        render(
          <Card>
            <Card.Body scrollable>Content</Card.Body>
          </Card>,
        );

        const body = screen.getByTestId('card-body');
        expect(body).toHaveClass('overflow-y-auto');
        expect(body).toHaveClass('min-h-0');
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Body className="custom-body-class">Content</Card.Body>
          </Card>,
        );

        const body = screen.getByTestId('card-body');
        expect(body).toHaveClass('custom-body-class');
      });
    });

    describe('Card.Footer', () => {
      it('renders with children', () => {
        render(
          <Card>
            <Card.Footer>
              <div data-testid="footer-content">Footer Content</div>
            </Card.Footer>
          </Card>,
        );

        expect(screen.getByTestId('card-footer')).toBeInTheDocument();
        expect(screen.getByTestId('footer-content')).toBeInTheDocument();
      });

      it('applies border and spacing classes', () => {
        render(
          <Card>
            <Card.Footer>Footer</Card.Footer>
          </Card>,
        );

        const footer = screen.getByTestId('card-footer');
        expect(footer).toHaveClass('border-t');
        expect(footer).toHaveClass('border-white/10');
        expect(footer).toHaveClass('pt-4');
        expect(footer).toHaveClass('mt-4');
        expect(footer).toHaveClass('flex-shrink-0');
      });

      it('applies custom className', () => {
        render(
          <Card>
            <Card.Footer className="custom-footer-class">Footer</Card.Footer>
          </Card>,
        );

        const footer = screen.getByTestId('card-footer');
        expect(footer).toHaveClass('custom-footer-class');
      });
    });
  });

  describe('Composition', () => {
    it('renders complete card with all sub-components', () => {
      render(
        <Card variant="primary" size="lg" backgroundEffects>
          <Card.Header
            title="Complete Card"
            description="With all components"
            action={<button>Action</button>}
          />
          <Card.Body scrollable>
            <p>Body content with scrolling</p>
          </Card.Body>
          <Card.Footer>
            <button>Footer Action</button>
          </Card.Footer>
        </Card>,
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-header')).toBeInTheDocument();
      expect(screen.getByTestId('card-body')).toBeInTheDocument();
      expect(screen.getByTestId('card-footer')).toBeInTheDocument();
      expect(screen.getByTestId('card-background-effects')).toBeInTheDocument();
    });

    it('works with heightMode fill and sub-components', () => {
      render(
        <Card heightMode="fill">
          <Card.Header title="Fill Height Card" />
          <Card.Body>Flexible content</Card.Body>
          <Card.Footer>Fixed footer</Card.Footer>
        </Card>,
      );

      const card = screen.getByTestId('card');
      const body = screen.getByTestId('card-body');

      expect(card).toHaveClass('h-full');
      expect(body).toHaveClass('flex-1');
    });
  });

  describe('Accessibility', () => {
    it('provides proper accessibility attributes when interactive', () => {
      const handleClick = jest.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('does not add accessibility attributes when not interactive', () => {
      render(<Card {...defaultProps} />);

      const card = screen.getByTestId('card');
      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('tabIndex');
    });

    it('supports keyboard navigation', () => {
      const handleClick = jest.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen.getByTestId('card');
      card.focus();

      expect(document.activeElement).toBe(card);
    });
  });

  describe('Error Handling', () => {
    it('handles missing children gracefully', () => {
      expect(() => render(<Card>{null}</Card>)).not.toThrow();
    });

    it('handles invalid variant gracefully', () => {
      // @ts-expect-error Testing invalid variant
      expect(() =>
        render(<Card variant="invalid">Content</Card>),
      ).not.toThrow();
    });

    it('handles invalid size gracefully', () => {
      // @ts-expect-error Testing invalid size
      expect(() => render(<Card size="invalid">Content</Card>)).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('renders without performance issues', () => {
      const startTime = performance.now();
      render(<Card {...defaultProps} />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50);
    });

    it('handles multiple re-renders efficiently', () => {
      const { rerender } = render(<Card {...defaultProps} />);

      for (let i = 0; i < 10; i++) {
        rerender(
          <Card
            {...defaultProps}
            variant={i % 2 === 0 ? 'primary' : 'secondary'}
          />,
        );
      }

      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });
});
