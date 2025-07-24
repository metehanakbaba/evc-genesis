/**
 * 📍 useLocation Hook
 * 
 * Location permission and user location management
 */

import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      return status;
    } catch (error) {
      console.log('Location permission error:', error);
      return 'denied' as Location.PermissionStatus;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      if (locationPermission !== 'granted') {
        const status = await requestLocationPermission();
        if (status !== 'granted') {
          return null;
        }
      }

      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setUserLocation(userCoords);
      return userCoords;
    } catch (error) {
      console.log('Get location error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [locationPermission, requestLocationPermission]);

  // Default camera position (Istanbul center)
  const defaultCameraPosition = {
    coordinates: userLocation || { latitude: 40.9578, longitude: 29.0856 },
    zoom: userLocation ? 13 : 11,
    bearing: 0,
    tilt: 0,
  };

  return {
    userLocation,
    locationPermission,
    isLoading,
    defaultCameraPosition,
    requestLocationPermission,
    getCurrentLocation,
  };
} 