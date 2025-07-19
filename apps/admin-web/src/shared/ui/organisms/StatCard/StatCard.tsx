"use client";

import React from "react";
import { cn } from "../../utils";
import { StatValue } from "../../molecules/StatValue";
import { TrendIndicator } from "../../molecules/TrendIndicator";
import { BackgroundEffects } from "../../molecules/BackgroundEffects";
import { AccentDot } from "../../atoms/AccentDot";
import { GeometricDecoration } from "../../atoms/GeometricDecoration";
import type { StatOrganismProps } from "../types";

/**
 * StatCard Component Props
 *
 * Organism component that composes StatValue, TrendIndicator, and BackgroundEffects
 * to create a complete statistical card with visual effects and animations.
 * Maintains exact visual parity with the existing RevolutionaryStatCard.
 */
export interface StatCardProps extends StatOrganismProps {
  /** The main statistical value to display */
  value: string;
  /** The title/label for the statistic */
  title: string;
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Trend indicator text (e.g., "+12%", "-5%") */
  trend: string;
  /** Description text that appears on hover */
  description: string;
  /** Gradient CSS class for the card background */
  gradient: string;
  /** Glow color for hover effects */
  glowColor: string;
  /** Card variant for theming */
  variant: "blue" | "emerald" | "purple" | "teal";
}

/**
 * StatCard - Organism component for revolutionary statistical display cards
 *
 * Composes StatValue, TrendIndicator, and BackgroundEffects molecules with
 * AccentDot and GeometricDecoration atoms to create a sophisticated card
 * with glassmorphism effects, animations, and hover interactions.
 *
 * Maintains exact visual parity with RevolutionaryStatCard while using
 * the new atomic component architecture.
 *
 * @example
 * ```tsx
 * <StatCard
 *   title="Active Stations"
 *   value="156"
 *   icon={StationIcon}
 *   trend="+12%"
 *   description="Charging stations currently online and operational"
 *   variant="blue"
 *   gradient="from-blue-500/10 to-blue-600/5"
 *   glowColor="blue-500"
 * />
 * ```
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  variant,
  gradient,
  glowColor,
  size = "md",
  onClick,
  className,
  "data-testid": testId = "stat-card",
  ...props
}) => {
  // Determine if component is interactive
  const isInteractive = Boolean(onClick);

  // Build container classes
  const containerClasses = cn("group relative h-full", className);

  // Build main card classes - maintaining exact visual parity
  const cardClasses = cn(
    "relative h-full min-h-[200px] max-h-[240px] p-6",
    `bg-gradient-to-br ${gradient}`,
    "backdrop-blur-xl border border-white/10 rounded-3xl",
    "hover:border-white/20 transition-all duration-700 ease-out",
    "transform hover:scale-105 hover:-translate-y-3",
    "shadow-2xl hover:shadow-4xl flex flex-col overflow-hidden",
    isInteractive && "cursor-pointer"
  );

  // Handle click
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-interactive={isInteractive}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(e as any);
              }
            }
          : undefined
      }
      {...props}
    >
      {/* Floating background glow - exact replica */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
      />

      {/* Main card container */}
      <div className={cardClasses}>
        {/* Background Effects - using new molecule */}
        <BackgroundEffects
          variant={variant}
          size="sm"
          orbCount={2}
          pattern="corners"
          intensity="subtle"
          blur="xl"
          animated
          data-testid={`${testId}-background-effects`}
        />

        {/* Floating accent orbs - using AccentDot atoms */}
        <AccentDot
          variant={variant}
          size="lg"
          position="top-right"
          animated
          animationSpeed={1}
          style={{
            top: "-12px",
            right: "-12px",
            width: "32px",
            height: "32px",
            opacity: 0.8,
            filter: "blur(2px)",
          }}
          data-testid={`${testId}-accent-large`}
        />

        <AccentDot
          variant={variant}
          size="md"
          position="top-right"
          animated
          animationSpeed={0.8}
          style={{
            top: "-8px",
            right: "-8px",
            width: "24px",
            height: "24px",
            animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
          data-testid={`${testId}-accent-small`}
        />

        {/* Icon container with revolutionary glow - exact replica */}
        <div className="flex items-start justify-between mb-4 flex-shrink-0">
          <div
            className={`relative w-14 h-14 rounded-2xl ${
              variant === "blue"
                ? "bg-gradient-to-br from-blue-500/30 to-blue-400/20 border-blue-400/40"
                : variant === "emerald"
                ? "bg-gradient-to-br from-emerald-500/30 to-emerald-400/20 border-emerald-400/40"
                : variant === "purple"
                ? "bg-gradient-to-br from-purple-500/30 to-purple-400/20 border-purple-400/40"
                : "bg-gradient-to-br from-teal-500/30 to-teal-400/20 border-teal-400/40"
            } border flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
          >
            {React.createElement(icon, {
              className: `w-7 h-7 ${
                variant === "blue"
                  ? "text-blue-300"
                  : variant === "emerald"
                  ? "text-emerald-300"
                  : variant === "purple"
                  ? "text-purple-300"
                  : "text-teal-300"
              } drop-shadow-lg`,
            })}

            <div
              className={`absolute inset-0 ${
                variant === "blue"
                  ? "bg-gradient-to-r from-blue-400/20"
                  : variant === "emerald"
                  ? "bg-gradient-to-r from-emerald-400/20"
                  : variant === "purple"
                  ? "bg-gradient-to-r from-purple-400/20"
                  : "bg-gradient-to-r from-teal-400/20"
              } to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
          </div>

          {/* Trend indicator - using new TrendIndicator molecule */}
          <div className="text-right transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <TrendIndicator
              status="live"
              trend={trend}
              size="sm"
              orientation="vertical"
              dotPosition="left"
              data-testid={`${testId}-trend-indicator`}
            />
          </div>
        </div>

        {/* Content with proper overflow handling - using StatValue molecule */}
        <div className="flex-1 flex flex-col min-h-0">
          <StatValue
            value={value}
            title={title}
            variant={variant}
            size="lg"
            orientation="vertical"
            data-testid={`${testId}-stat-value`}
          />

          {/* Description with exact hover behavior */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <p className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 text-truncate-multi">
              {description}
            </p>
          </div>
        </div>

        {/* Floating geometric decoration - using GeometricDecoration atom */}
        <GeometricDecoration
          variant={variant}
          shape="circle"
          pattern="solid"
          thickness="thin"
          size="md"
          position="bottom-right"
          animated
          style={{
            opacity: 0.1,
          }}
          className="group-hover:opacity-20 transition-opacity duration-500"
          data-testid={`${testId}-geometric-decoration`}
        />
      </div>
    </div>
  );
};

StatCard.displayName = "StatCard";
