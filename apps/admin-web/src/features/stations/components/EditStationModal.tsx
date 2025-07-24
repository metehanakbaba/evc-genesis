import React, { useState, useCallback } from 'react';
import { Modal } from '@/components/ui/Display';
import { useToast, Input, Button, StatValue, Fieldset, StatusBadge, TextElement, Listbox } from '@/shared/ui';
import { isApiError } from '@/shared/api/apiHelpers';
import { useUpdateStationStatusMutation } from '../api/stationsApi';
import { AdminStationsQueryParams } from '../types/station.types';
import { 
    CheckCircleIcon, 
    BoltIcon, 
    GlobeAltIcon,
    WrenchIcon, 
    CurrencyDollarIcon,
    StopIcon, 
    IdentificationIcon, 
    ClockIcon,
    MapPinIcon, 
    BuildingOfficeIcon,
    QrCodeIcon, 
    CalendarIcon
} from '@heroicons/react/20/solid';
import { PlugIcon, RefreshCwIcon } from 'lucide-react';
import type { StationStatus, ChargingStation, StationLocation } from '@evc/shared-business-logic';

export type StationStatusOption = {
  value: StationStatus;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

export const STATUS_OPTIONS: StationStatusOption[] = [
  {
    value: 'AVAILABLE',
    label: 'Available',
    description: 'Station is ready for use',
    icon: CheckCircleIcon,
    color: 'green',
  },
  {
    value: 'CHARGING',
    label: 'Charging',
    description: 'Station is currently in use',
    icon: BoltIcon,
    color: 'blue',
  },
  {
    value: 'OFFLINE',
    label: 'Offline',
    description: 'Station is not operational',
    icon: StopIcon,
    color: 'gray',
  },
  {
    value: 'MAINTENANCE',
    label: 'Maintenance',
    description: 'Station under maintenance',
    icon: WrenchIcon,
    color: 'amber',
  },
];

interface EditStationModalProps {
  station: ChargingStation;
  isOpen: boolean;
  onClose: () => void;
  queryParams?: AdminStationsQueryParams; 
}

export const EditStationModal: React.FC<EditStationModalProps> = ({
  station,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [updateStatus, { isLoading }] = useUpdateStationStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<StationStatus>(station.status);

  // Функция для нормализации location (строка или объект)
  const normalizeLocation = useCallback((location: string | StationLocation): {
    address: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  } => {
    if (typeof location === 'string') {
      // Парсим строку формата "Praga, Warsaw, Warsaw, Poland"
      const parts = location.split(',').map(part => part.trim());
      return {
        address: location,
        city: parts[0] || undefined,
        country: parts[parts.length - 1] || undefined
      };
    }
    return {
      address: location.address || 'Unknown address',
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude
    };
  }, []);

  const locationData = normalizeLocation(station.location);

  const handleSubmit = async () => {
    if (isLoading) return;
    
    try {
      await updateStatus({
        id: station.id,
        status: selectedStatus,
      }).unwrap();

      showToast({
        type: 'success',
        title: 'Status Updated',
        message: `${station.name} is now ${selectedStatus.toLowerCase()}`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: isApiError(error) ? error.data.error.message : 'Failed to update station status',
      });
    } finally {
      onClose();
    }
  };

  const renderStatusOption = (
    opt: StationStatusOption,
    selected: boolean,
    onClick: () => void
  ) => (
    <Button
      key={opt.value}
      variant={selected ? 'secondary' : 'outline'}
      className={`w-full h-full p-4 flex-col items-start gap-2 border-${opt.color}-500/20`}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex items-center gap-3 w-full">
        <opt.icon className={`w-5 h-5 text-${opt.color}-400`} />
        <div className="text-left">
          <div className="font-medium">{opt.label}</div>
          <div className="text-sm text-gray-400">{opt.description}</div>
        </div>
      </div>
    </Button>
  );

  // Форматирование даты с проверкой
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Station: ${station.name}`}
      description="Manage station details and status"
      size="xl"
    >
      <div className="space-y-6">
        {/* Station Overview Section */}
        <Fieldset legend="Station Overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatValue
              value={station.name}
              title="Station Name"
              icon={IdentificationIcon}
              variant="blue"
              size="md"
            />
            
            <StatValue
              value={locationData.address}
              title="Address"
              icon={MapPinIcon}
              variant="emerald"
              size="md"
            />
            
            {locationData.city && (
              <StatValue
                value={locationData.city}
                title="City"
                icon={BuildingOfficeIcon}
                variant="emerald"
                size="md"
              />
            )}
            
            <StatValue
              value={`${station.powerOutput} kW`}
              title="Power Output"
              icon={BoltIcon}
              variant="teal"
              size="md"
            />
            
            <StatValue
              value={station.connectorType}
              title="Connector Type"
              icon={PlugIcon}
              variant="purple"
              size="md"
            />
            
            <StatValue
              value={`${station.pricePerKwh} $/kWh`}
              title="Price"
              icon={CurrencyDollarIcon}
              variant="teal"
              size="md"
            />
            
            {station.lastHeartbeat && (
              <StatValue
                value={formatDate(station.lastHeartbeat)}
                title="Last Activity"
                icon={ClockIcon}
                variant="blue"
                size="md"
              />
            )}
          </div>
        </Fieldset>

        {/* Status Section */}
        <Fieldset legend="Status Management">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <StatusBadge 
                text={
                  station.status === 'AVAILABLE' ? 'Available' : 
                  station.status === 'CHARGING' ? 'Charging' : 
                  station.status === 'MAINTENANCE' ? 'Maintenance' : 
                  'Offline'
                }
                variant={
                  station.status === 'AVAILABLE' ? 'emerald' : 
                  station.status === 'CHARGING' ? 'blue' : 
                  station.status === 'MAINTENANCE' ? 'amber' : 
                  'gray'
                }
              />
              <TextElement variant="teal" opacity="medium">
                Current status
              </TextElement>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Change Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((opt) =>
                  renderStatusOption(
                    opt,
                    selectedStatus === opt.value,
                    () => setSelectedStatus(opt.value)
                  )
                )}
              </div>
            </div>
          </div>
        </Fieldset>

        {/* Additional Information Section */}
        <Fieldset legend="Technical Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Station ID"
              value={station.id}
              readOnly
              leftIcon={QrCodeIcon}
            />
            
            {station.createdAt && (
              <Input
                label="Created At"
                value={formatDate(station.createdAt)}
                readOnly
                leftIcon={CalendarIcon}
              />
            )}
            
            {station.updatedAt && (
              <Input
                label="Last Updated"
                value={formatDate(station.updatedAt)}
                readOnly
                leftIcon={RefreshCwIcon}
              />
            )}
            
            <Listbox
              label="Activity Status"
              value={station.isActive ? 'active' : 'inactive'}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
              disabled
            />
            
            {/* Координаты, если есть */}
            {(locationData.latitude && locationData.longitude) && (
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  value={String(locationData.latitude)}
                  readOnly
                  leftIcon={GlobeAltIcon}
                />
                <Input
                  label="Longitude"
                  value={String(locationData.longitude)}
                  readOnly
                  leftIcon={GlobeAltIcon}
                />
              </div>
            )}
          </div>
        </Fieldset>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || selectedStatus === station.status}
            loading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};