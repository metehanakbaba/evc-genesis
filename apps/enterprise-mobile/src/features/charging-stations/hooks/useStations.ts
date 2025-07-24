/**
 * ⚡ useStations Hook
 * 
 * Business logic for charging station management
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { ChargingStation } from '../types/station.types';
import { mockChargingStations } from '../data/mockStations';

export function useStations() {
  const [stations] = useState<ChargingStation[]>(mockChargingStations);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  const getStationMarkerColor = useCallback((status: string) => {
    switch (status) {
      case 'available': return '#10B981'; // Green
      case 'busy': return '#F59E0B'; // Amber
      case 'maintenance': return '#8B5CF6'; // Purple
      case 'offline': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  }, []);

  const handleStationSelect = useCallback((station: ChargingStation) => {
    setSelectedStation(station);
  }, []);

  const handleStationReserve = useCallback((station: ChargingStation) => {
    Alert.alert(
      "Reserve Charging Port 🔌",
      `Reserve a port at ${station.name}?\n\nEstimated arrival: ${station.estimatedTime} minutes\nPrice: zł${station.pricePerKwh}/kWh`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reserve", 
          onPress: () => {
            setSelectedStation(null);
            Alert.alert("Success! 🎉", `Port reserved at ${station.name}. You have 15 minutes to arrive.`);
          }
        }
      ]
    );
  }, []);

  const handleStationNavigate = useCallback((station: ChargingStation) => {
    console.log('Navigate to station:', station.name);
    Alert.alert(
      "Navigate to Station 🗺️",
      `Open navigation app to ${station.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Navigate", onPress: () => console.log('Opening navigation...') }
      ]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const availableStationsCount = stations.filter(s => s.status === 'available').length;

  return {
    stations,
    selectedStation,
    availableStationsCount,
    getStationMarkerColor,
    handleStationSelect,
    handleStationReserve,
    handleStationNavigate,
    clearSelection,
  };
} 