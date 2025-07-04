import { useState } from 'react';
import {
  Container,
  Grid,
  GridItem,
  SectionHeader,
  Button,
  Input,
  Select,
  Checkbox,
  Badge,
  GridGap,
} from '../../../shared/ui';
import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ChartBarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

/**
 * Example Page using the new Layout Components
 * This demonstrates the type-safe grid system that replaces manual grid classes
 */
const LayoutExamplePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    newsletter: false,
  });

  const categoryOptions = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'fullstack', label: 'Full Stack Development' },
    { value: 'mobile', label: 'Mobile Development' },
  ];

  return (
    <Container size="xl" withBackground withOrbs>
      {/* Hero Section */}
      <div className="mb-12 text-center space-y-6">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Squares2X2Icon className="h-10 w-10 text-blue-400" />
          <h1 className="text-5xl font-bold text-white">Layout System</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Type-safe, responsive layout components with glassmorphism design
          patterns. Build consistent interfaces with reusable, configurable
          components.
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="primary" size="lg">
            Type-safe
          </Badge>
          <Badge variant="success" size="lg">
            Responsive
          </Badge>
          <Badge variant="warning" size="lg">
            Glassmorphism
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <Grid cols={1} mdCols={2} lgCols={3} gap={GridGap.Medium}>
        {/* Buttons Section */}
        <GridItem variant="glass" padding="md" span={1}>
          <SectionHeader
            title="Button Components"
            description="Interactive elements with multiple variants"
            
          />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="primary" size="sm">
                Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Success
              </Button>
              <Button variant="destructive" size="sm">
                Danger
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant="primary"  className="w-full">
                Outline Primary
              </Button>
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </div>
          </div>
        </GridItem>

        {/* Form Section */}
        <GridItem variant="glass" padding="md" span={1}>
          <SectionHeader
            title="Form Elements"
            description="Input fields and controls"
            
          />
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Select
              label="Category"
              placeholder="Choose category..."
              options={categoryOptions}
              value={formData.category}
                              onChange={(value) =>
                setFormData({ ...formData, category: value || '' })
                }
            />
            <Checkbox
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={(checked) =>
                setFormData({ ...formData, newsletter: checked })
              }
            />
          </div>
        </GridItem>

        {/* Configuration Section */}
        <GridItem variant="glass" padding="md" span={1}>
          <SectionHeader
            title="Settings"
            description="App configuration options"
            
          />
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Layout Options
              </h4>
              <div className="space-y-1 text-xs text-gray-400">
                <div>• Responsive grid system</div>
                <div>• Glassmorphism effects</div>
                <div>• Type-safe components</div>
                <div>• Dark theme optimized</div>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Design System
              </h4>
              <div className="space-y-1 text-xs text-gray-400">
                <div>• Consistent spacing</div>
                <div>• Semantic colors</div>
                <div>• Accessible components</div>
                <div>• Modern animations</div>
              </div>
            </div>
          </div>
        </GridItem>

        {/* Statistics Section - Full Width */}
        <GridItem variant="solid" padding="lg" span={1} mdSpan={2} lgSpan={3}>
          <SectionHeader
            title="Component Statistics"
            description="Overview of the layout system capabilities"
            
            size="lg"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-gray-300">Layout Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">12</div>
              <div className="text-gray-300">Grid Columns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
              <div className="text-gray-300">Variants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                100%
              </div>
              <div className="text-gray-300">Type Safety</div>
            </div>
          </div>
        </GridItem>

        {/* Code Example Section */}
        <GridItem variant="minimal" padding="md" span={1} mdSpan={2}>
          <SectionHeader
            title="Usage Example"
            description="How to use the layout components"
            
          />
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <pre className="text-sm text-gray-300 overflow-auto">
              {`<Container size="xl" withBackground withOrbs>
  <Grid cols={1} mdCols={2} lgCols={3} gap="lg">
    <GridItem variant="glass" padding="md">
      <SectionHeader 
        title="My Section" 
         
      />
      <div className="space-y-4">
        {/* Content */}
      </div>
    </GridItem>
  </Grid>
</Container>`}
            </pre>
          </div>
        </GridItem>

        {/* Current Form Data */}
        <GridItem variant="glass" padding="md" span={1}>
          <SectionHeader
            title="Form State"
            description="Current form values"
            
            size="sm"
          />
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
            <pre className="text-xs text-gray-400 overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </GridItem>
      </Grid>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">
            Modern Layout System
          </h3>
          <p className="text-gray-300 mb-4">
            Built with type safety, responsive design, and glassmorphism effects
            in mind.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LayoutExamplePage;
