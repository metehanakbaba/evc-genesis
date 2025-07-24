/**
 * 🎯 Session Actions Hook
 *
 * Custom hook for session-related actions and operations.
 * Provides centralized session management functionality.
 *
 * @module useSessionActions
 * @version 1.0.0
 * @author EV Charging Team
 */

import { useCallback } from 'react';
import type { LiveChargingSession } from '../types/session.types';

export interface SessionActionsResult {
  viewDetails: (session: LiveChargingSession) => void;
  stopSession: (session: LiveChargingSession) => void;
  retrySession: (session: LiveChargingSession) => void;
  forceStopSession: (session: LiveChargingSession) => void;
}

/**
 * 🚀 useSessionActions Hook
 * Provides session management actions with proper error handling
 */
import { useToast } from '@/shared/ui';
import { useStopSessionMutation, useForceStopSessionMutation } from '../api/sessionsApi';
// import your mutation hooks here
// import { useStopSessionMutation, useRetrySessionMutation, useForceStopSessionMutation } from '@/services/sessions';

export const useSessionActions = (): SessionActionsResult => {
  const { showToast } = useToast();
  const [stopSessionApi] = useStopSessionMutation();
  const [forceStopSessionApi] = useForceStopSessionMutation();

  /**
   * 👁️ View Session Details
   */
  const viewDetails = useCallback((session: LiveChargingSession) => {
    showToast({
      type: 'info',
      title: 'Session Details',
      message: `Viewing details for session #${session.id}`,
      duration: 2000,
    });
    console.log('Viewing session details:', session.id);
  }, [showToast]);

  /**
   * ⏹️ Stop Active Session
   */
  const stopSession = useCallback(async (session: LiveChargingSession) => {
    try {
      await stopSessionApi({ sessionId: session.id }).unwrap();
      
      showToast({
        type: 'success',
        title: 'Session Stopped',
        message: `Charging session #${session.id} was successfully terminated`,
        duration: 3000
      });
      
      return { success: true };
    } catch (error) {
      console.error('Failed to stop session:', error);
      
      showToast({
        type: 'error',
        title: 'Stop Failed',
        message: 'Could not terminate charging session. Please try again.',
        duration: 5000,
      });
      
      return { success: false };
    }
  }, [stopSessionApi, showToast]);

  /**
   * 🔄 Retry Failed Session
   */
  const retrySession = useCallback(async (session: LiveChargingSession) => {
    try {
      // TODO 
      // await retrySessionApi({ sessionId: session.id }).unwrap();
      
      showToast({
        type: 'success',
        title: 'Session Restarted',
        message: `Attempting to restart session #${session.id}`,
        duration: 3000
      });
      
      return { success: true };
    } catch (error) {
      console.error('Failed to retry session:', error);
      
      showToast({
        type: 'error',
        title: 'Restart Failed',
        message: 'Could not restart charging session. Please check station status.',
        duration: 5000,
      });
      
      return { success: false };
    }
  }, [
    // retrySessionApi, 
    showToast
  ]);

  /**
   * 🚨 Force Stop Session (Admin)
   */
  const forceStopSession = useCallback(async (session: LiveChargingSession) => {
    try {
      await forceStopSessionApi({ sessionId: session.id }).unwrap();
      
      showToast({
        type: 'success',
        title: 'Session Force Stopped',
        message: `Session #${session.id} was immediately terminated`,
        duration: 3000,
      });
      
      return { success: true };
    } catch (error) {
      console.error('Failed to force stop session:', error);
      
      showToast({
        type: 'error',
        title: 'Force Stop Failed',
        message: 'Administrative action failed. Please verify your permissions.',
        duration: 6000,
      });
      
      return { success: false };
    }
  }, [forceStopSessionApi, showToast]);

  return {
    viewDetails,
    stopSession,
    retrySession,
    forceStopSession,
  };
};