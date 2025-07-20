import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

// Mock icon component for testing
const MockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} data-testid="mock-icon">Icon</div>
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

describe('StatCard Debug', () => {
  it('should debug GeometricDecoration attributes', () => {
    render(<StatCard {...defaultProps} />);
    
    const geometricDecoration = screen.getByTestId('stat-card-geometric-decoration');
    
    console.log('All attributes:');
    for (let i = 0; i < geometricDecoration.attributes.length; i++) {
      const attr = geometricDecoration.attributes[i];
      console.log(`${attr.name}: ${attr.value}`);
    }
    
    console.log('Specific attributes:');
    console.log('data-variant:', geometricDecoration.getAttribute('data-variant'));
    console.log('data-shape:', geometricDecoration.getAttribute('data-shape'));
    console.log('data-pattern:', geometricDecoration.getAttribute('data-pattern'));
    console.log('data-thickness:', geometricDecoration.getAttribute('data-thickness'));
    console.log('data-size:', geometricDecoration.getAttribute('data-size'));
    console.log('data-position:', geometricDecoration.getAttribute('data-position'));
    console.log('data-animated:', geometricDecoration.getAttribute('data-animated'));
    
    // This should pass if everything is working correctly
    expect(geometricDecoration).toHaveAttribute('data-variant', 'blue');
  });
});