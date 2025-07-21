'use client';

import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';
import { useCallback, useState } from 'react';
import { MainLayout } from '@/shared/ui/components/Layout/MainLayout';

/**
 * AI-Powered Project Management Dashboard
 * Features intelligent project tracking, automated status updates, and JSON-based configuration
 */
const ProjectManagementPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [aiMode, setAiMode] = useState<'view' | 'edit'>('view');

  // Mock project data - in real implementation, this would come from AI analysis
  const projects = [
    {
      id: 'evc-frontend-admin',
      name: 'EV Charging Admin Frontend',
      status: 'in_progress',
      progress: 78,
      aiSummary:
        'Dashboard redesign completed. Working on project management integration.',
      lastUpdate: '2 minutes ago',
      tasks: [
        { name: 'Dashboard Redesign', status: 'completed', priority: 'high' },
        {
          name: 'Core System Administration',
          status: 'completed',
          priority: 'medium',
        },
        {
          name: 'Project Management Page',
          status: 'in_progress',
          priority: 'high',
        },
        { name: 'AI Integration', status: 'pending', priority: 'high' },
      ],
      files: {
        modified: ['DashboardPage.tsx', 'CoreManagementSection.tsx'],
        created: ['ProjectManagementPage.tsx'],
        pending: ['projectStatus.json', 'aiConfig.json'],
      },
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      status: 'planning',
      progress: 15,
      aiSummary: 'Initial project setup and architecture planning in progress.',
      lastUpdate: '1 hour ago',
      tasks: [
        { name: 'Project Setup', status: 'completed', priority: 'high' },
        {
          name: 'Architecture Design',
          status: 'in_progress',
          priority: 'high',
        },
        { name: 'UI Components', status: 'pending', priority: 'medium' },
      ],
      files: {
        modified: [],
        created: ['app.json', 'package.json'],
        pending: ['navigation.tsx', 'styles.ts'],
      },
    },
    {
      id: 'api-backend',
      name: 'Backend API Services',
      status: 'completed',
      progress: 100,
      aiSummary: 'All core API endpoints implemented and tested successfully.',
      lastUpdate: '3 days ago',
      tasks: [
        { name: 'User Authentication', status: 'completed', priority: 'high' },
        {
          name: 'Station Management API',
          status: 'completed',
          priority: 'high',
        },
        { name: 'Payment Processing', status: 'completed', priority: 'medium' },
        { name: 'Documentation', status: 'completed', priority: 'low' },
      ],
      files: {
        modified: [],
        created: ['auth.ts', 'stations.ts', 'payments.ts'],
        pending: [],
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'emerald';
      case 'in_progress':
        return 'blue';
      case 'planning':
        return 'amber';
      case 'on_hold':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircleIcon;
      case 'in_progress':
        return PlayIcon;
      case 'planning':
        return ClipboardDocumentListIcon;
      case 'on_hold':
        return PauseIcon;
      default:
        return ExclamationTriangleIcon;
    }
  };

  const handleAIUpdate = useCallback(async (projectId: string) => {
    // Simulate AI analysis and project update
    console.log(`AI analyzing project: ${projectId}`);
    // This would trigger actual AI analysis and file updates
  }, []);

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center py-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-3xl font-light text-white">
                AI Project Management
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Intelligent project tracking with automated status updates
            </p>
          </header>

          {/* AI Control Panel */}
          <div className="bg-gradient-to-br from-purple-800/20 via-pink-800/10 to-purple-800/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-medium text-white">AI Assistant</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAiMode(aiMode === 'view' ? 'edit' : 'view')}
                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs rounded-full hover:bg-purple-500/30 transition-colors"
                >
                  {aiMode === 'view' ? 'Enable AI Edit' : 'View Mode'}
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              AI automatically tracks file changes, updates project status, and
              maintains JSON configurations. Click "Enable AI Edit" to allow
              automatic file modifications.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              const statusColor = getStatusColor(project.status);

              return (
                <div
                  key={project.id}
                  className="group bg-gradient-to-br from-gray-800/40 via-gray-900/30 to-gray-800/40 backdrop-blur-sm border border-gray-700/40 rounded-3xl p-6 cursor-pointer hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setSelectedProject(project.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-${statusColor}-500/10 border border-${statusColor}-500/20 rounded-xl flex items-center justify-center`}
                      >
                        <StatusIcon
                          className={`w-5 h-5 text-${statusColor}-400`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">
                          {project.name}
                        </h3>
                        <span
                          className={`px-2 py-1 bg-${statusColor}-500/10 text-${statusColor}-300 border border-${statusColor}-500/20 rounded text-xs`}
                        >
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAIUpdate(project.id);
                      }}
                      className="w-8 h-8 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-colors group"
                    >
                      <ArrowPathIcon className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs text-white font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r from-${statusColor}-500 to-${statusColor}-400 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.aiSummary}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">
                        {project.tasks.length}
                      </div>
                      <div className="text-xs text-gray-400">Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">
                        {project.files.created.length}
                      </div>
                      <div className="text-xs text-gray-400">Files</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">
                        {project.files.pending.length}
                      </div>
                      <div className="text-xs text-gray-400">Pending</div>
                    </div>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-gray-500 text-center">
                    Updated {project.lastUpdate}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create New Project */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
              <PlusIcon className="w-5 h-5" />
              <span>Create New Project</span>
            </button>
          </div>

          {/* JSON Configuration Panel (shown when project is selected) */}
          {selectedProject && (
            <div className="fixed inset-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 z-50 overflow-auto">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light text-white">
                    Project Configuration
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Status JSON */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CodeBracketIcon className="w-5 h-5 text-amber-400" />
                      <h3 className="text-lg font-medium text-white">
                        Project Status JSON
                      </h3>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-auto max-h-96 bg-gray-900/50 p-4 rounded-lg">
                      {JSON.stringify(
                        projects.find((p) => p.id === selectedProject),
                        null,
                        2,
                      )}
                    </pre>
                  </div>

                  {/* AI Configuration */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <SparklesIcon className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-medium text-white">
                        AI Configuration
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Auto-update Files
                        </label>
                        <input
                          type="checkbox"
                          checked={aiMode === 'edit'}
                          onChange={() =>
                            setAiMode(aiMode === 'view' ? 'edit' : 'view')
                          }
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Watch Patterns
                        </label>
                        <input
                          type="text"
                          value="*.tsx,*.ts,*.json"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Update Frequency
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg focus:outline-none focus:border-purple-500/50">
                          <option>Real-time</option>
                          <option>Every 5 minutes</option>
                          <option>Hourly</option>
                          <option>Daily</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectManagementPage;
