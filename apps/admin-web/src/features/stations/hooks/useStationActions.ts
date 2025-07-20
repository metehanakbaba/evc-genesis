import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Station } from '../types/station.types';

interface UseStationActionsReturn {
  readonly viewDetails: (station: Station) => void;
  readonly editStation: (station: Station) => void;
  readonly deleteStation: (stationId: string) => Promise<void>;
  readonly updateStationStatus: (stationId: string, status: string) => Promise<void>;
  readonly isUpdating: boolean;
  readonly isDeleting: boolean;
}

export const useStationActions = (): UseStationActionsReturn => {
  const router = useRouter();

  const viewDetails = useCallback((station: Station) => {
    console.log('🔍 Viewing station details:', station.name);
    // In demo mode, just log the action
    // router.push(`/stations/${station.id}`);
  }, []);

  const editStation = useCallback((station: Station) => {
    console.log('✏️ Editing station:', station.name);
    // In demo mode, just log the action
    // router.push(`/stations/${station.id}/edit`);
  }, []);

  const deleteStation = useCallback(async (stationId: string) => {
    try {
      console.log('🗑️ Deleting station:', stationId);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Station deleted successfully');
    } catch (error) {
      console.error('❌ Failed to delete station:', error);
    }
  }, []);

  const updateStationStatus = useCallback(async (stationId: string, status: string) => {
    try {
      console.log('🔄 Updating station status:', stationId, 'to', status);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('✅ Station status updated successfully');
    } catch (error) {
      console.error('❌ Failed to update station status:', error);
    }
  }, []);

  return {
    viewDetails,
    editStation,
    deleteStation,
    updateStationStatus,
    isUpdating: false, // Demo mode - no actual loading states
    isDeleting: false,
  };
}; 