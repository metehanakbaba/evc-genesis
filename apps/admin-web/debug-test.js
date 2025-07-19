// Simple debug test
const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');

// Mock icon component
const MockIcon = ({ className }) => React.createElement('div', { className, 'data-testid': 'mock-icon' }, 'Icon');

// Import the StatCard
const { StatCard } = require('./src/shared/ui/organisms/StatCard/StatCard.tsx');

const defaultProps = {
  title: 'Active Stations',
  value: '156',
  icon: MockIcon,
  trend: '+12%',
  description: 'Test description',
  variant: 'blue',
  gradient: 'from-blue-500/10 to-blue-600/5',
  glowColor: 'blue-500',
};

// Render and check
render(React.createElement(StatCard, defaultProps));
const geometricDecoration = screen.getByTestId('stat-card-geometric-decoration');
console.log('GeometricDecoration attributes:', geometricDecoration.attributes);
console.log('data-variant:', geometricDecoration.getAttribute('data-variant'));
console.log('data-shape:', geometricDecoration.getAttribute('data-shape'));