'use client';

import {
  BookOpenIcon,
  CodeBracketIcon,
  CogIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { Badge } from '@/shared/ui';
import { MainLayout } from '@/shared/ui/components/Layout';
import type React from 'react';
import { useState } from 'react';

interface DocumentationSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  content: React.ReactNode;
  category: 'getting-started' | 'development' | 'deployment' | 'advanced';
}

const DocumentationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('overview');

  const sections: DocumentationSection[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      icon: BookOpenIcon,
      description: 'Complete system overview and architecture',
      category: 'getting-started',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              🚀 EV Charging Admin System
            </h3>
            <p className="text-gray-300 mb-4">
              Enterprise-grade EV charging network management system built with modern technologies.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Frontend</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                                  <li>• Modern React with TypeScript</li>
                <li>• Next.js with App Router</li>
                  <li>• TypeScript (Strict Mode)</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Mobile</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• React Native</li>
                  <li>• Expo 52</li>
                  <li>• Tamagui Design System</li>
                  <li>• Cross-platform Support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">✅ Completed</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Admin Web Application</li>
                <li>• NX Monorepo Setup</li>
                <li>• Shared Business Logic</li>
                <li>• Docker Deployment</li>
              </ul>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-yellow-400 mb-2">🔄 In Progress</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Mobile Application</li>
                <li>• API Completion</li>
                <li>• Performance Optimization</li>
                <li>• Documentation</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'quick-start',
      title: 'Quick Start Guide',
      icon: RocketLaunchIcon,
      description: 'Get up and running in minutes',
      category: 'getting-started',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Prerequisites</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CodeBracketIcon className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm text-gray-300">Node.js 20+</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CogIcon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300">Docker & Docker Compose</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm text-gray-300">Git</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Installation Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <p className="text-gray-300 mb-2">Clone the repository</p>
                  <code className="block bg-gray-800 p-2 rounded text-sm text-green-400">
                    git clone &lt;repository-url&gt;<br />
                    cd evc-frontend-admin
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <p className="text-gray-300 mb-2">Install dependencies</p>
                  <code className="block bg-gray-800 p-2 rounded text-sm text-green-400">
                    npm install
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <p className="text-gray-300 mb-2">Start development server</p>
                  <code className="block bg-gray-800 p-2 rounded text-sm text-green-400">
                    cd apps/admin-web && npm run dev
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      icon: CogIcon,
      description: 'Understanding the system design and structure',
      category: 'development',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Structure</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`evc-frontend-admin/
├── 📱 apps/                    # Applications
│   ├── admin-web/              # Next.js 15 Admin Panel
│   └── admin-mobile/           # React Native + Expo 52
├── 📦 packages/               # Shared Packages
│   ├── shared/
│   │   ├── api/               # RTK Query API client
│   │   ├── business-logic/    # Domain business rules
│   │   ├── store/             # Redux global state
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Utility functions
│   └── design/
│       └── tokens/            # Design system tokens
├── 🛠️ tools/                  # Development tools
├── 🐳 infrastructure/         # Docker & deployment
└── 📋 docs/                   # Documentation`}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-3">Architecture Principles</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Clean Architecture</li>
                <li>• Domain-Driven Design</li>
                <li>• Monorepo Benefits</li>
                <li>• Platform Agnostic</li>
              </ul>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-3">Design System</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Glassmorphism Effects</li>
                <li>• Dark Theme</li>
                <li>• Responsive Design</li>
                <li>• WCAG 2.1 AA Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'development',
      title: 'Development Guide',
      icon: CodeBracketIcon,
      description: 'Development workflow and best practices',
      category: 'development',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Development Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Development</h4>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400 mb-2">
                  npm run dev
                </code>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400">
                  npm run mobile:start
                </code>
              </div>
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Building</h4>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400 mb-2">
                  npm run build
                </code>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400">
                  npm run docker:build
                </code>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Code Standards</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">TypeScript strict mode enabled</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">ESLint for consistent code style</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Prettier for automated formatting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Conventional commits</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'deployment',
      title: 'Docker & Deployment',
      icon: WrenchScrewdriverIcon,
      description: 'Production deployment with Docker',
      category: 'deployment',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Docker Commands</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 mb-2">Development Mode</p>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400">
                  ./infrastructure/docker/docker-start.sh dev
                </code>
              </div>
              <div>
                <p className="text-gray-300 mb-2">Production Mode</p>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400">
                  ./infrastructure/docker/docker-start.sh prod
                </code>
              </div>
              <div>
                <p className="text-gray-300 mb-2">Build Standalone Image</p>
                <code className="block bg-gray-900 p-2 rounded text-sm text-green-400">
                  ./infrastructure/docker/docker-build.sh production evc-admin:latest
                </code>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">2-4min</div>
                <div className="text-sm text-gray-400">Build Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">617MB</div>
                <div className="text-sm text-gray-400">Image Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">&lt;3s</div>
                <div className="text-sm text-gray-400">Startup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">&lt;512MB</div>
                <div className="text-sm text-gray-400">Memory Usage</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'api',
      title: 'API Documentation',
      icon: DocumentTextIcon,
      description: 'Complete API reference and examples',
      category: 'advanced',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Authentication Endpoints</h3>
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success" size="sm">POST</Badge>
                  <code className="text-sm text-gray-300">/api/auth/login</code>
                </div>
                <p className="text-sm text-gray-400 mb-2">User authentication</p>
                <pre className="bg-gray-900 p-2 rounded text-xs text-green-400">
{`{
  "email": "admin@example.com",
  "password": "password123"
}`}
                </pre>
              </div>
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" size="sm">GET</Badge>
                  <code className="text-sm text-gray-300">/api/auth/me</code>
                </div>
                <p className="text-sm text-gray-400 mb-2">Get current user profile</p>
                <pre className="bg-gray-900 p-2 rounded text-xs text-blue-400">
                  Headers: Authorization: Bearer &lt;token&gt;
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Station Management</h3>
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" size="sm">GET</Badge>
                  <code className="text-sm text-gray-300">/api/stations</code>
                </div>
                <p className="text-sm text-gray-400">Get all charging stations with filters</p>
              </div>
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="warning" size="sm">PUT</Badge>
                  <code className="text-sm text-gray-300">/api/stations/:id</code>
                </div>
                <p className="text-sm text-gray-400">Update station information</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const categories = [
    { id: 'all', label: 'All Sections', count: sections.length },
    { id: 'getting-started', label: 'Getting Started', count: sections.filter(s => s.category === 'getting-started').length },
    { id: 'development', label: 'Development', count: sections.filter(s => s.category === 'development').length },
    { id: 'deployment', label: 'Deployment', count: sections.filter(s => s.category === 'deployment').length },
    { id: 'advanced', label: 'Advanced', count: sections.filter(s => s.category === 'advanced').length },
  ];

  const filteredSections = sections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedSectionData = sections.find(s => s.id === selectedSection) || sections[0];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 relative">
                <div className="absolute -top-2 -right-2">
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <SparklesIcon className="w-3 h-3" />
                    <span>Docs</span>
                  </div>
                </div>
                <BookOpenIcon className="w-16 h-16 text-blue-400 mx-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              System Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete guide to the EV Charging Admin System
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
                <div className="space-y-2">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSection === section.id
                          ? 'bg-blue-500/20 border border-blue-500/50'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="font-medium text-white text-sm">
                            {section.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <selectedSectionData.icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedSectionData.title}
                    </h2>
                    <p className="text-gray-400">
                      {selectedSectionData.description}
                    </p>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  {selectedSectionData.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationPage; 