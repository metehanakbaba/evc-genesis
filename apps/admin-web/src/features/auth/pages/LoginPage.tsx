'use client';

import { ShieldCheckIcon, BoltIcon, CheckCircleIcon, SparklesIcon, BeakerIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { Suspense, use, useEffect, useState } from 'react';
import { LoginForm } from '../components/LoginForm';

// React 19: Example of use() hook with promise
const themePromise = Promise.resolve({
  name: 'EV Charging Admin',
  version: '2.0.1',
  theme: 'Enterprise Pro',
  features: ['Real-time Monitoring', 'AI Analytics', 'Smart Management']
});

const ThemeInfo: React.FC = () => {
  // React 19: use() hook can consume promises directly!
  const themeData = use(themePromise);

  return (
    <aside className="text-xs text-slate-400 text-center space-y-1" role="complementary" aria-label="Theme information">
      <div className="font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {themeData.name} v{themeData.version}
      </div>
      <div className="text-slate-500">{themeData.theme} Edition</div>
    </aside>
  );
};

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Smaller floating elements */}
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-xl animate-bounce delay-700"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:24px_24px] animate-pulse"></div>
    </div>
  );
};

const FeatureHighlights: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Multi-layer authentication with zero-trust architecture',
      variant: 'blue' as const,
      gradient: 'from-blue-500/20 via-blue-400/10 to-blue-500/20'
    },
    {
      icon: BoltIcon,
      title: 'Real-time Operations',
      description: 'Lightning-fast monitoring with AI-powered insights',
      variant: 'emerald' as const,
      gradient: 'from-emerald-500/20 via-emerald-400/10 to-emerald-500/20'
    },
    {
      icon: SparklesIcon,
      title: 'AI Analytics',
      description: 'Smart predictive analytics and business intelligence',
      variant: 'purple' as const,
      gradient: 'from-purple-500/20 via-purple-400/10 to-purple-500/20'
    }
  ];

  return (
    <section className="space-y-6" aria-labelledby="features-heading">
      <header className="text-center space-y-3">
        <h3 id="features-heading" className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
          Next-Generation Platform
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Powering the future of electric vehicle charging with enterprise-grade technology
        </p>
      </header>
      
      <ul className="space-y-3" role="list">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isHovered = hoveredFeature === index;
          
          return (
            <li
              key={feature.title}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative group cursor-pointer"
              role="listitem"
            >
              {/* Simplified background without harsh glow */}
              <div className={`absolute inset-0 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg transition-all duration-300 ${
                isHovered ? 'bg-slate-800/60 border-slate-600/50' : ''
              }`}></div>
              
              <article className="relative p-4 flex items-start space-x-3">
                {/* Icon container - simplified */}
                <div className={`w-8 h-8 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'bg-slate-600/50 border-slate-500/50' : ''
                }`} aria-hidden="true">
                  <Icon className="w-4 h-4 text-slate-300" />
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-slate-200 text-sm">{feature.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const LoginPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌌 Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" aria-hidden="true"></div>
      
      {/* 🎭 Animated Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.1),transparent_50%)]" aria-hidden="true"></div>
      
      {/* ✨ Floating Elements */}
      <FloatingElements />
      
      {/* 📱 Main Content Container - Balanced Layout */}
      <main className={`relative min-h-screen transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`} role="main">
        
        <div className="min-h-screen flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* 🎨 Left Panel - Features & Branding */}
            <aside className="space-y-8 lg:space-y-12" role="complementary" aria-label="Platform features and branding">
              
              {/* 🏢 Brand Section */}
              <header className="text-center lg:text-left space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    {/* Main logo/icon - Simplified */}
                    <div className="w-16 h-16 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-lg" role="img" aria-label="EV Charging Platform Logo">
                      <BeakerIcon className="w-8 h-8 text-blue-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    EV Charging
                  </h1>
                  <p className="text-lg text-slate-300 font-medium">
                    Admin Dashboard
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto lg:mx-0" aria-hidden="true"></div>
                </div>
              </header>

              {/* 🚀 Features Section */}
              <FeatureHighlights />

              {/* 🔒 Trust Indicators - Simplified */}
              <section className="relative" aria-labelledby="trust-heading">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    <span id="trust-heading" className="text-sm text-emerald-300 font-medium">Trusted by 500+ Companies</span>
                  </div>
                  <p className="text-xs text-slate-500 text-center lg:text-left mt-2">
                    SOC 2 Type II • ISO 27001 • GDPR Compliant
                  </p>
                </div>
              </section>

              {/* 💫 Theme Info */}
              <Suspense fallback={
                <aside className="text-xs text-slate-500 text-center lg:text-left" aria-label="Loading theme information">
                  Loading...
                </aside>
              }>
                <ThemeInfo />
              </Suspense>
            </aside>

            {/* 📝 Right Panel - Login Form */}
            <section className="flex justify-center lg:justify-end" aria-labelledby="login-heading">
              <article className="w-full max-w-md">
                <header className="sr-only">
                  <h2 id="login-heading">Administrator Login</h2>
                </header>
                <LoginForm />
              </article>
            </section>
          </div>
        </div>
      </main>

      {/* 🌟 Footer Attribution */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2" role="contentinfo">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <SparklesIcon className="w-4 h-4" aria-hidden="true" />
          <span>Powered by Next.js 15 & React 19</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
