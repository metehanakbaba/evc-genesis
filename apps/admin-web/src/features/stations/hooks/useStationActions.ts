import { useCallback } from 'react';
import { useDeleteStationMutation, useUpdateStationStatusMutation } from '../api/stationsApi';
import { useToast } from '@/shared/ui';
import type { Station } from '../types/station.types';

export const useStationActions = () => {
  const { showToast } = useToast();
  const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();
  const [updateStationStatus, { isLoading: isUpdatingStatus }] = useUpdateStationStatusMutation();

  const handleViewDetails = useCallback((stationId: string) => {
    console.log('View details for station:', stationId);
    // TODO: Navigate to station details page when available
  }, []);

  const handleEdit = useCallback((station: Station) => {
    console.log('Edit station:', station.id);
    // TODO: Open edit modal/form when available
  }, []);

  const handleDelete = useCallback(async (stationId: string | string[]) => {
    try {
      const stationIds = Array.isArray(stationId) ? stationId : [stationId];
      
      for (const id of stationIds) {
        await deleteStation(id).unwrap();
      }
      
      showToast({
        type: 'success',
        title: 'Success',
        message: `Successfully deleted ${stationIds.length === 1 ? 'station' : `${stationIds.length} stations`}`,
      });
    } catch (error) {
      console.error('Delete failed:', error);
      showToast({
        type: 'error', 
        title: 'Delete Failed',
        message: 'Failed to delete station(s). Please try again.',
      });
    }
  }, [deleteStation, showToast]);

  const handleToggleStatus = useCallback(async (stationId: string | string[], newStatus?: string) => {
    try {
      const status = newStatus || 'AVAILABLE'; // Default status
      
      if (Array.isArray(stationId)) {
        // For bulk operations, we'll update status for all
        for (const id of stationId) {
          await updateStationStatus({ status }).unwrap();
        }
        showToast({
          type: 'success',
          title: 'Success',
          message: `Successfully updated ${stationId.length} stations`,
        });
      } else {
        await updateStationStatus({ status }).unwrap();
        showToast({
          type: 'success',
          title: 'Success', 
          message: `Station status updated to ${status}`,
        });
      }
    } catch (error) {
      console.error('Status update failed:', error);
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update station status. Please try again.',
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
