'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPinIcon, 
  BoltIcon, 
  CurrencyEuroIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { 
  MainLayout, 
  PageHeader, 
  Breadcrumb,
  Button,
  useToast
} from '@/shared/ui';
import { PageContainer } from '@/shared/ui/components/Layout';
import { useCreateStationMutation } from '@/features/stations/api/stationsApi';
import { ChargingStation, StationLocation } from '@evc/shared-business-logic';
import { WARSAW_AREAS, POWER_LEVELS, CONNECTOR_TYPES } from '../data/createStationOptions';

type StationFormData = Omit<ChargingStation, 
  'id' | 'status' | 'isActive' | 'lastHeartbeat' | 'createdAt' | 'updatedAt' | 'location' | 'pricePerKwh'
> & {
  location: StationLocation,
  pricePerKWh: number 
};

export const CreateStationPage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [createStation, { isLoading }] = useCreateStationMutation();

  // Form state
  const [formData, setFormData] = useState<StationFormData>({
    name: '',
    location: {
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'Warsaw, Poland',
      city: 'Warsaw',
      country: 'Poland',
    },
    powerOutput: 50,
    connectorType: 'CCS',
    pricePerKWh: 1.50,
  });

    const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: {
        selected: 'bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-blue-500/20 border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/20',
        icon: 'bg-blue-500/20 border border-blue-400/30',
        text: 'text-blue-400'
      },
      emerald: {
        selected: 'bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/20',
        icon: 'bg-emerald-500/20 border border-emerald-400/30',
        text: 'text-emerald-400'
      },
      purple: {
        selected: 'bg-gradient-to-r from-purple-500/20 via-purple-400/15 to-purple-500/20 border-purple-400/50 text-purple-300 shadow-lg shadow-purple-500/20',
        icon: 'bg-purple-500/20 border border-purple-400/30',
        text: 'text-purple-400'
      },
      amber: {
        selected: 'bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 border-amber-400/50 text-amber-300 shadow-lg shadow-amber-500/20',
        icon: 'bg-amber-500/20 border border-amber-400/30',
        text: 'text-amber-400'
      },
      red: {
        selected: 'bg-gradient-to-r from-red-500/20 via-red-400/15 to-red-500/20 border-red-400/50 text-red-300 shadow-lg shadow-red-500/20',
        icon: 'bg-red-500/20 border border-red-400/30',
        text: 'text-red-400'
      },
      teal: {
        selected: 'bg-gradient-to-r from-teal-500/20 via-teal-400/15 to-teal-500/20 border-teal-400/50 text-teal-300 shadow-lg shadow-teal-500/20',
        icon: 'bg-teal-500/20 border border-teal-400/30',
        text: 'text-teal-400'
      },
      gray: {
        selected: 'bg-gradient-to-r from-gray-500/20 via-gray-400/15 to-gray-500/20 border-gray-400/50 text-gray-300 shadow-lg shadow-gray-500/20',
        icon: 'bg-gray-500/20 border border-gray-400/30',
        text: 'text-gray-400'
      },
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  /**
   * 🎨 Render Selection Option Button (same pattern as GenericFilterModal)
   */
  const renderSelectionOption = (
    option: any,
    isSelected: boolean,
    onClick: () => void,
  ) => {
    const IconComponent = option.icon;
    const colors = getColorClasses(option.color, isSelected);

    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${
            isSelected
              ? `${colors.selected} scale-[1.02]`
              : `bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
               border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50
               hover:scale-[1.01]`
          }
          overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/5 before:to-transparent
          before:translate-x-[-100%] hover:before:translate-x-[100%]
          before:transition-transform before:duration-700
        `}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              ${
                isSelected
                  ? colors.icon
                  : `bg-gray-600/30 border border-gray-500/30 group-hover:bg-gray-500/40`
              }
            `}
          >
            <IconComponent
              className={`
                w-5 h-5 transition-transform duration-300
                ${
                  isSelected
                    ? `${colors.text} scale-110`
                    : `text-gray-400 group-hover:text-gray-300 group-hover:scale-105`
                }
              `}
            />
          </div>
          <div className="text-left">
            <span className="font-medium text-sm block">{option.label}</span>
            <span className="text-xs opacity-75 block">{option.description}</span>
          </div>
        </div>
      </button>
    );
  };

  const handleLocationSelect = (area: typeof WARSAW_AREAS[0]) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        latitude: area.coords.lat,
        longitude: area.coords.lng,
        address: `${area.label}, Warsaw`,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Station name is required',
      });
      return;
    }

    try {
      await createStation(formData).unwrap();
      showToast({
        type: 'success',
        title: 'Station Created',
        message: `Successfully created station "${formData.name}"`,
      });
      router.push('/stations');
    } catch (error) {
      console.error('Create station failed:', error);
      showToast({
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create station. Please try again.',
      });
    }
  };

  return (
    <MainLayout showNotifications notificationCount={3} headerVariant="default">
      {/* Header */}
      <PageContainer paddingY="md">
        <Breadcrumb 
          currentPageLabel="Deploy New Station" 
          variant="blue"
          items={[
            { label: 'Charging Infrastructure', href: '/stations' }
          ]}
        />
        <PageHeader
          title="Deploy Charging Infrastructure"
          description="Configure and deploy a new charging station in the network"
          variant="blue"
          actionButton={{
            label: 'Back to Stations',
            onClick: () => router.push('/stations'),
            icon: ArrowLeftIcon
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* Station Name */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BoltIcon className="w-6 h-6 text-blue-400" />
                Station Information
              </h2>
              <p className="text-gray-400">Configure basic station details</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/40 rounded-2xl border border-gray-600/30 p-8">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Station Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Warsaw Central Mall Station"
              className="w-full px-5 py-3.5 bg-gray-800/40 backdrop-blur-xl border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60 transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-2">Unique identifier for this charging station</p>
          </div>
        </section>

        {/* Location Selection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-emerald-400" />
                Warsaw Location
              </h2>
              <p className="text-gray-400">Select deployment location in Warsaw</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WARSAW_AREAS.map((area) =>
              renderSelectionOption(
                area,
                formData.location.latitude === area.coords.lat && formData.location.longitude === area.coords.lng,
                () => handleLocationSelect(area),
              ),
            )}
          </div>

          {/* Selected Location Display */}
          <div className="mt-6 bg-gradient-to-br from-gray-800/30 via-gray-700/20 to-gray-800/30 rounded-xl border border-gray-600/20 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Selected Location</h4>
            <p className="text-gray-400 text-sm">
              📍 {formData.location.latitude.toFixed(4)}, {formData.location.longitude.toFixed(4)} - {formData.location.address}
            </p>
          </div>
        </section>

        {/* Connector Type Selection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BoltIcon className="w-6 h-6 text-purple-400" />
                Connector Standard
              </h2>
              <p className="text-gray-400">Choose charging connector type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONNECTOR_TYPES.map((connector) =>
              renderSelectionOption(
                connector,
                formData.connectorType === connector.id,
                () => setFormData(prev => ({ ...prev, connectorType: connector.id })),
              ),
            )}
          </div>
        </section>

        {/* Power Output Selection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-amber-400 to-amber-300 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FireIcon className="w-6 h-6 text-amber-400" />
                Power Output
              </h2>
              <p className="text-gray-400">Select charging power level</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {POWER_LEVELS.map((power) =>
              renderSelectionOption(
                power,
                formData.powerOutput === Number(power.id),
                () => setFormData(prev => ({ ...prev, powerOutput: Number(power.id) })),
              ),
            )}
          </div>
        </section>

        {/* Pricing */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-teal-400 to-teal-300 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CurrencyEuroIcon className="w-6 h-6 text-teal-400" />
                Pricing Configuration
              </h2>
              <p className="text-gray-400">Set charging price per kWh</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/40 rounded-2xl border border-gray-600/30 p-8">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Price per kWh (PLN)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.pricePerKWh}
              onChange={(e) => setFormData(prev => ({ ...prev, pricePerKWh: Number(e.target.value) }))}
              className="w-32 px-5 py-3.5 bg-gray-800/40 backdrop-blur-xl border border-gray-600/40 rounded-xl text-white focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400/60 transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-2">Standard pricing is 1.50-2.00 PLN per kWh</p>
          </div>
        </section>

        {/* Station Preview */}
        <section>
          <div className="bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-500/10 border border-blue-400/25 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-blue-400" />
              Station Preview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <span className="text-gray-400 block">Name:</span>
                <span className="text-white font-medium">{formData.name || 'Unnamed Station'}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Location:</span>
                <span className="text-white font-medium">{formData.location.address}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Power:</span>
                <span className="text-white font-medium">{formData.powerOutput}kW {formData.connectorType}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Price:</span>
                <span className="text-white font-medium">{formData.pricePerKWh} PLN/kWh</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deploy Actions */}
        <section className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/stations')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!formData.name.trim()}
            className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
          >
            Deploy Station
          </Button>
        </section>
      </PageContainer>
    </MainLayout>
  );
};