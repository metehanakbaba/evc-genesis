import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrendIndicator } from './TrendIndicator';

describe('TrendIndicator', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<TrendIndicator />);
      
      expect(screen.getByTestId('trend-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-dot')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-label')).toHaveTextContent('Live');
    });

    it('renders with custom label', () => {
      render(<TrendIndicator label="System Status" />);
      
      expect(screen.getByTestId('trend-indicator-label')).toHaveTextContent('System Status');
    });

    it('renders trend information when provided', () => {
      render(<TrendIndicator trend="+12%" />);
      
      expect(screen.getByTestId('trend-indicator-trend')).toHaveTextContent('+12%');
    });

    it('renders without trend when not provided', () => {
      render(<TrendIndicator />);
      
      expect(screen.queryByTestId('trend-indicator-trend')).not.toBeInTheDocument();
    });
  });

  describe('Status Types', () => {
    it('renders live status correctly', () => {
      render(<TrendIndicator status="live" />);
      
      const container = screen.getByTestId('trend-indicator');
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(container).toHaveAttribute('data-status', 'live');
      expect(container).toHaveAttribute('data-variant', 'emerald');
      expect(dot).toHaveAttribute('data-variant', 'emerald');
      expect(dot).toHaveAttribute('data-animated', 'true');
      expect(label).toHaveTextContent('Live');
    });

    it('renders offline status correctly', () => {
      render(<TrendIndicator status="offline" />);
      
      const container = screen.getByTestId('trend-indicator');
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(container).toHaveAttribute('data-status', 'offline');
      expect(container).toHaveAttribute('data-variant', 'purple');
      expect(dot).toHaveAttribute('data-variant', 'purple');
      expect(dot).toHaveAttribute('data-animated', 'false');
      expect(label).toHaveTextContent('Offline');
    });

    it('renders warning status correctly', () => {
      render(<TrendIndicator status="warning" />);
      
      const container = screen.getByTestId('trend-indicator');
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(container).toHaveAttribute('data-status', 'warning');
      expect(container).toHaveAttribute('data-variant', 'teal');
      expect(dot).toHaveAttribute('data-variant', 'teal');
      expect(dot).toHaveAttribute('data-animated', 'true');
      expect(label).toHaveTextContent('Warning');
    });

    it('renders success status correctly', () => {
      render(<TrendIndicator status="success" />);
      
      const container = screen.getByTestId('trend-indicator');
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(container).toHaveAttribute('data-status', 'success');
      expect(container).toHaveAttribute('data-variant', 'emerald');
      expect(dot).toHaveAttribute('data-variant', 'emerald');
      expect(dot).toHaveAttribute('data-animated', 'false');
      expect(label).toHaveTextContent('Success');
    });

    it('renders error status correctly', () => {
      render(<TrendIndicator status="error" />);
      
      const container = screen.getByTestId('trend-indicator');
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(container).toHaveAttribute('data-status', 'error');
      expect(container).toHaveAttribute('data-variant', 'purple');
      expect(dot).toHaveAttribute('data-variant', 'purple');
      expect(dot).toHaveAttribute('data-animated', 'true');
      expect(label).toHaveTextContent('Error');
    });
  });

  describe('Variants', () => {
    it('applies custom variant override', () => {
      render(<TrendIndicator status="live" variant="blue" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-variant', 'blue');
    });

    it('uses status variant when no override provided', () => {
      render(<TrendIndicator status="warning" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-variant', 'teal');
    });
  });

  describe('Sizes', () => {
    it('applies size classes correctly', () => {
      render(<TrendIndicator size="lg" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-size', 'lg');
    });

    it('applies appropriate sizes to child components', () => {
      render(<TrendIndicator size="xl" />);
      
      const dot = screen.getByTestId('trend-indicator-dot');
      const label = screen.getByTestId('trend-indicator-label');
      
      expect(dot).toHaveAttribute('data-size', 'md');
      expect(label).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Orientation and Layout', () => {
    it('applies horizontal orientation by default', () => {
      render(<TrendIndicator />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-orientation', 'horizontal');
      expect(container).toHaveClass('flex-row');
    });

    it('applies vertical orientation when specified', () => {
      render(<TrendIndicator orientation="vertical" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-orientation', 'vertical');
      expect(container).toHaveClass('flex-col');
    });

    it('applies dot position correctly', () => {
      render(<TrendIndicator dotPosition="right" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-dot-position', 'right');
      expect(container).toHaveClass('flex-row-reverse');
    });

    it('handles bottom dot position', () => {
      render(<TrendIndicator dotPosition="bottom" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-dot-position', 'bottom');
      expect(container).toHaveClass('flex-col-reverse');
    });
  });

  describe('Animation', () => {
    it('uses status-based animation by default', () => {
      render(<TrendIndicator status="live" />);
      
      const dot = screen.getByTestId('trend-indicator-dot');
      expect(dot).toHaveAttribute('data-animated', 'true');
    });

    it('overrides animation when explicitly set', () => {
      render(<TrendIndicator status="live" animated={false} />);
      
      const dot = screen.getByTestId('trend-indicator-dot');
      expect(dot).toHaveAttribute('data-animated', 'false');
    });

    it('enables animation when explicitly set to true', () => {
      render(<TrendIndicator status="offline" animated={true} />);
      
      const dot = screen.getByTestId('trend-indicator-dot');
      expect(dot).toHaveAttribute('data-animated', 'true');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<TrendIndicator onClick={handleClick} />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-interactive', 'true');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
      
      fireEvent.click(container);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events when interactive', () => {
      const handleClick = jest.fn();
      render(<TrendIndicator onClick={handleClick} />);
      
      const container = screen.getByTestId('trend-indicator');
      
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

    it('does not handle events when onClick is not provided', () => {
      render(<TrendIndicator />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-interactive', 'false');
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Atom Composition', () => {
    it('composes AccentDot atom correctly', () => {
      render(<TrendIndicator />);
      
      expect(screen.getByTestId('trend-indicator-dot')).toBeInTheDocument();
    });

    it('composes TextElement atoms correctly', () => {
      render(<TrendIndicator trend="Test trend" />);
      
      expect(screen.getByTestId('trend-indicator-label')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-trend')).toBeInTheDocument();
    });

    it('passes correct props to AccentDot', () => {
      render(<TrendIndicator status="warning" size="lg" animationSpeed={2} />);
      
      const dot = screen.getByTestId('trend-indicator-dot');
      expect(dot).toHaveAttribute('data-variant', 'teal');
      expect(dot).toHaveAttribute('data-size', 'md');
      expect(dot).toHaveAttribute('data-position', 'center');
      expect(dot).toHaveAttribute('data-animated', 'true');
    });

    it('passes correct props to TextElement atoms', () => {
      render(<TrendIndicator status="success" size="sm" trend="Stable" />);
      
      const label = screen.getByTestId('trend-indicator-label');
      expect(label).toHaveAttribute('data-variant', 'emerald');
      expect(label).toHaveAttribute('data-size', 'sm');
      expect(label).toHaveAttribute('data-weight', 'medium');
      expect(label).toHaveAttribute('data-opacity', 'high');
      
      const trend = screen.getByTestId('trend-indicator-trend');
      expect(trend).toHaveAttribute('data-variant', 'emerald');
      expect(trend).toHaveAttribute('data-size', 'xs');
      expect(trend).toHaveAttribute('data-weight', 'normal');
      expect(trend).toHaveAttribute('data-opacity', 'medium');
    });
  });

  describe('Accessibility', () => {
    it('provides proper accessibility attributes for interactive elements', () => {
      render(<TrendIndicator onClick={() => {}} />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('role', 'button');
      expect(container).toHaveAttribute('tabIndex', '0');
    });

    it('does not add accessibility attributes for non-interactive elements', () => {
      render(<TrendIndicator />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Custom Props', () => {
    it('forwards custom props to container', () => {
      render(<TrendIndicator data-custom="test-value" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveAttribute('data-custom', 'test-value');
    });

    it('applies custom className', () => {
      render(<TrendIndicator className="custom-class" />);
      
      const container = screen.getByTestId('trend-indicator');
      expect(container).toHaveClass('custom-class');
    });

    it('uses custom testId when provided', () => {
      render(<TrendIndicator data-testid="custom-trend-indicator" />);
      
      expect(screen.getByTestId('custom-trend-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('custom-trend-indicator-dot')).toBeInTheDocument();
      expect(screen.getByTestId('custom-trend-indicator-label')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('renders complete indicator with all props', () => {
      render(
        <TrendIndicator
          status="warning"
          label="System Health"
          trend="Degraded Performance"
          size="lg"
          orientation="vertical"
          dotPosition="top"
          animated={true}
          animationSpeed={1.5}
          onClick={() => {}}
        />
      );
      
      expect(screen.getByTestId('trend-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-dot')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-label')).toHaveTextContent('System Health');
      expect(screen.getByTestId('trend-indicator-trend')).toHaveTextContent('Degraded Performance');
    });

    it('handles edge cases gracefully', () => {
      render(<TrendIndicator label="" />);
      
      expect(screen.getByTestId('trend-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('trend-indicator-label')).toBeEmptyDOMElement();
      expect(screen.queryByTestId('trend-indicator-trend')).not.toBeInTheDocument();
    });
  });
});