import { useCallback } from 'react';
import type { Station } from '../types/station.types';

export const useStationActions = () => {
  const handleViewDetails = useCallback((stationId: string) => {
    console.log('View details for station:', stationId);
    // TODO: Implement navigation to station details
  }, []);

  const handleEdit = useCallback((station: Station) => {
    console.log('Edit station:', station.id);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = useCallback((stationId: string) => {
    console.log('Delete station:', stationId);
    // TODO: Implement delete functionality
  }, []);

  const handleToggleStatus = useCallback((stationId: string) => {
    console.log('Toggle status for station:', stationId);
    // TODO: Implement status toggle
  }, []);

  return {
    handleViewDetails,
    handleEdit,
    handleDelete,
    handleToggleStatus,
  };
}; 