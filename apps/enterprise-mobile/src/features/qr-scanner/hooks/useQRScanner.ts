/**
 * 📱 useQRScanner Hook
 * 
 * Business logic for QR code scanning functionality
 */

import { useState, useCallback } from 'react';

export function useQRScanner() {
  const [scanning, setScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const startScan = useCallback(() => {
    setScanning(true);
  }, []);

  const stopScan = useCallback(() => {
    setScanning(false);
  }, []);

  // Mock QR scanning for demo (replace with actual expo-barcode-scanner)
  const handleScan = useCallback((onSuccess: (data: string) => void) => {
    setScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setScanning(false);
      const mockStationData = "EV_STATION_12345_MALTEPE_PORT_3";
      onSuccess(mockStationData);
    }, 2000);
  }, []);

  const requestPermissions = useCallback(async () => {
    // Mock permission request for demo
    // In real implementation, use expo-barcode-scanner permissions
    try {
      setHasPermission(true);
      return true;
    } catch (error) {
      console.log('Permission error:', error);
      setHasPermission(false);
      return false;
    }
  }, []);

  return {
    scanning,
    hasPermission,
    startScan,
    stopScan,
    handleScan,
    requestPermissions,
  };
} 