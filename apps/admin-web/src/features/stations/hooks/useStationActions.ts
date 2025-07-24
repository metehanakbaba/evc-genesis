import { useCallback } from 'react';
import { useDeleteStationMutation, useUpdateStationStatusMutation } from '../api/stationsApi';
import { useToast } from '@/shared/ui';
import { ChargingStation, StationStatus } from '@evc/shared-business-logic';
import { isApiError } from '@/shared/api/apiHelpers';

export const useStationActions = () => {
  const { showToast } = useToast();
  const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();
  const [updateStationStatus, { isLoading: isUpdatingStatus }] = useUpdateStationStatusMutation();

  const handleViewDetails = useCallback((station: ChargingStation) => {
    showToast({
      type: 'info',
      title: 'Feature in development',
      message: 'Station details view will be available in the next release',
      duration: 3000,
    });
    console.log('View details for station:', station);
  }, [showToast]);

  const handleEdit = useCallback((station: ChargingStation) => {
    showToast({
      type: 'info',
      title: 'Edit functionality coming soon',
      message: 'Station editing will be implemented in v2.1.0',
      duration: 4000
    });
    console.log('Edit station:', station.id);
  }, [showToast]);

  const handleDelete = useCallback(async (station: ChargingStation | ChargingStation[]) => {
    try {
      const stationIds = Array.isArray(station) ? station.map(item => item.id) : [station.id];
      
      for (const id of stationIds) {
        await deleteStation(id).unwrap();
      }
      
      showToast({
        type: 'success',
        title: stationIds.length > 1 ? 'Stations deleted' : 'Station deleted',
        message: stationIds.length > 1 
          ? `${stationIds.length} stations removed successfully` 
          : 'Station has been permanently removed',
        duration: 5000,
      });
    } catch (error) {
      console.error('Delete failed:', error);
      
      const errorMessage = isApiError(error)
        ? error.data.error.message
        : 'Please try again later';
      
      showToast({
        type: 'error',
        title: 'Deletion failed',
        message: errorMessage,
        duration: 7000,
      });
    }
  }, [deleteStation, showToast]);

  const handleToggleStatus = useCallback(async (stationId: string | string[], newStatus?: StationStatus) => {
    try {
      const status = newStatus || 'AVAILABLE';
      const isBulk = Array.isArray(stationId);
      
      if (isBulk) {
        await Promise.all(
          stationId.map(id => updateStationStatus({ id, status }).unwrap())
        );
      } else {
        await updateStationStatus({ id: stationId, status }).unwrap();
      }

      showToast({
        type: 'success',
        title: isBulk ? 'Bulk update' : 'Status updated',
        message: isBulk
          ? `${stationId.length} stations set to ${status}`
          : `Station is now ${status.toLowerCase()}`,
        duration: 4000
      });
    } catch (error) {
      console.error('Status update failed:', error);
      
      const defaultMessage = Array.isArray(stationId)
        ? 'Failed to update some stations'
        : 'Failed to update station status';
      
      showToast({
        type: 'error',
        title: 'Update failed',
        message: isApiError(error) ? error.data.error.message : defaultMessage,
        duration: 6000,
      });
    }
  }, [updateStationStatus, showToast]);

  return {
    handleViewDetails,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    isDeleting,
    isUpdatingStatus,
  };
};