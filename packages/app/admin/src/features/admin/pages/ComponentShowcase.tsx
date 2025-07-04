import { useState } from 'react';
import type React from 'react';
import {
  Button,
  Checkbox,
  Fieldset,
  Input,
  Listbox,
  RadioGroup,
  Select,
  Switch,
  Textarea,

} from '@ui/forms';
import {
  Container,
  Grid,
  GridItem,
  SectionHeader,
  GridColumns,
  GridGap,
} from '@ui/layout';
import {
  Squares2X2Icon,
  CursorArrowRaysIcon,
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

// Type for icon components (more flexible to handle Heroicons)
type IconComponent = React.ComponentType<any>;

const sections = [
  {
    id: 'buttons',
    title: 'Buttons',
    icon: CursorArrowRaysIcon,
  },
  {
    id: 'form',
    title: 'Form Components',
    icon: DocumentTextIcon,
  },
  {
    id: 'selection',
    title: 'Selection Components',
    icon: AdjustmentsHorizontalIcon,
  },
  {
    id: 'radio',
    title: 'Radio Group',
    icon: Squares2X2Icon,
  },
  {
    id: 'fieldset',
    title: 'Fieldset',
    icon: RectangleStackIcon,
  },
  {
    id: 'state',
    title: 'Form State',
    icon: CodeBracketIcon,
  },
];

const ComponentShowcase = () => {
  // State for controlled components
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    newsletter: false,
    notifications: true,
    country: '',
    plan: 'startup',
    language: 'en',
  });

  const [loading, setLoading] = useState(false);

  // Options for select components
  const countryOptions = [
    { value: 'tr', label: 'Turkey' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  const planOptions = [
    {
      value: 'startup',
      label: 'Startup',
      description: '12GB • 6 CPUs • 256GB SSD',
    },
    {
      value: 'business',
      label: 'Business',
      description: '16GB • 8 CPUs • 512GB SSD',
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      description: '32GB • 12 CPUs • 1TB SSD',
    },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    console.log('Form submitted:', formData);
  };

  return (
    <Container size="xl" withBackground withOrbs>
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Squares2X2Icon className="h-8 w-8 text-primary-400" />
          <h1 className="text-4xl font-bold text-white">Component Showcase</h1>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our professional, typesafe, and visually consistent UI
          components. All components follow the same design system and color
          rules as the rest of the project.
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 flex justify-center">
        <ul className="flex flex-wrap gap-6 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-lg px-6 py-3 shadow-lg shadow-gray-900/20">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-center gap-2 text-gray-200 hover:text-primary-400 transition-colors font-medium"
              >
                <section.icon className="h-5 w-5" />
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Grid */}
      <Grid cols={GridColumns.One} mdCols={GridColumns.Two} gap={GridGap.Large}>
        {/* Buttons Section */}
        <GridItem id="buttons" variant="glass" padding="md">
          <SectionHeader
            title="Buttons"
            description="Interactive elements with multiple variants and states"
            icon={CursorArrowRaysIcon as IconComponent}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Variants</h3>
              <div className="space-y-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Sizes</h3>
              <div className="space-y-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">States</h3>
              <div className="space-y-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">
                Outline Style
              </h3>
              <div className="space-y-3">
                <Button variant="primary" styleType="outline">
                  Primary Outline
                </Button>
                <Button variant="outline" styleType="outline">
                  Success Outline
                </Button>
                <Button variant="warning" styleType="outline">
                  Warning Outline
                </Button>
                <Button variant="danger" styleType="outline">
                  Danger Outline
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Submitting...' : 'Submit Form'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => console.log('Success action!')}
                >
                  Save Changes
                </Button>
                <Button
                  variant="warning"
                  onClick={() => console.log('Warning action!')}
                >
                  Reset Form
                </Button>
                <Button
                  variant="info"
                  styleType="outline"
                  onClick={() => console.log('Info action!')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </GridItem>

        {/* Form Components */}
        <GridItem id="form" variant="glass" padding="md">
          <SectionHeader
            title="Form Components"
            description="Input fields, textareas, and form controls"
            icon={DocumentTextIcon}
          />
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-300">
                Input Fields
              </h3>
              <Input
                label="Full Name"
                description="Enter your full name as it appears on your ID"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                {...(formData.email &&
                  !formData.email.includes('@') && {
                    error: 'Please enter a valid email',
                  })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                size="lg"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium" />
                <Input size="lg" placeholder="Large" />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-300">Textarea</h3>
              <Textarea
                label="Project Description"
                description="Describe your project in detail"
                placeholder="Enter your project description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                maxLength={500}
              />
              <div className="grid grid-cols-3 gap-4">
                <Textarea size="sm" placeholder="Small" rows={2} />
                <Textarea size="md" placeholder="Medium" rows={3} />
                <Textarea size="lg" placeholder="Large" rows={4} />
              </div>
            </div>
          </div>
        </GridItem>

        {/* Selection Components */}
        <GridItem id="selection" variant="glass" padding="md">
          <SectionHeader
            title="Selection Components"
            description="Toggles, dropdowns, and selection controls"
            icon={AdjustmentsHorizontalIcon}
          />
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-300">
                Toggle Components
              </h3>
              <Checkbox
                label="Subscribe to newsletter"
                description="Get the latest updates and news"
                checked={formData.newsletter}
                onChange={(checked) =>
                  setFormData({ ...formData, newsletter: checked })
                }
              />
              <Switch
                label="Enable notifications"
                description="Receive push notifications on your device"
                checked={formData.notifications}
                onChange={(checked) =>
                  setFormData({ ...formData, notifications: checked })
                }
              />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Sizes</h4>
                <div className="flex items-center gap-6">
                  <Checkbox size="sm" label="Small" />
                  <Checkbox size="md" label="Medium" />
                  <Checkbox size="lg" label="Large" />
                </div>
                <div className="flex items-center gap-6">
                  <Switch size="sm" label="Small" />
                  <Switch size="md" label="Medium" />
                  <Switch size="lg" label="Large" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-300">
                Dropdown Components
              </h3>
              <Select
                label="Country"
                description="Select your country of residence"
                placeholder="Choose a country..."
                options={countryOptions}
                value={formData.country}
                onChange={(value) =>
                  setFormData({ ...formData, country: value || '' })
                }
              />
              <Listbox
                label="Preferred Language"
                description="Choose your preferred language"
                placeholder="Select language..."
                options={languageOptions}
                value={formData.language}
                onChange={(value) =>
                  setFormData({ ...formData, language: value })
                }
              />
            </div>
          </div>
        </GridItem>

        {/* Radio Group */}
        <GridItem id="radio" variant="glass" padding="md">
          <SectionHeader
            title="Radio Group"
            description="Single selection from multiple options"
            icon={Squares2X2Icon}
          />
          <div className="max-w-2xl">
            <RadioGroup
              label="Choose your plan"
              description="Select the plan that best fits your needs"
              options={planOptions}
              value={formData.plan}
              onChange={(value) => setFormData({ ...formData, plan: value })}
            />
          </div>
        </GridItem>

        {/* Fieldset Example */}
        <GridItem id="fieldset" variant="glass" padding="md">
          <SectionHeader
            title="Fieldset"
            description="Grouped form elements with legend"
            icon={RectangleStackIcon}
          />
          <div className="max-w-2xl">
            <Fieldset legend="Shipping Information">
              <Input label="Street Address" placeholder="123 Main St" />
              <Select
                label="Country"
                placeholder="Select country..."
                options={countryOptions}
              />
              <Textarea
                label="Delivery Instructions"
                description="Any special delivery instructions"
                placeholder="Leave at front door..."
                rows={3}
              />
            </Fieldset>
          </div>
        </GridItem>

        {/* Current Form Data */}
        <GridItem id="state" variant="glass" padding="md" span={1} mdSpan={2}>
          <SectionHeader
            title="Form State"
            description="Real-time form data visualization"
            icon={CodeBracketIcon}
          />
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-300 mb-4">
              Current Form Data:
            </h3>
            <pre className="text-sm text-gray-400 overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ComponentShowcase;
