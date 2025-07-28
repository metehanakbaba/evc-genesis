/**
 * 🔋 Modal Management Service
 * 
 * Centralized modal state management to avoid circular dependencies
 */

export type ModalType = 
  | 'qr' 
  | 'wallet' 
  | 'stations' 
  | 'chargingRequest' 
  | 'stationCharging' 
  | 'mobileCharging' 
  | 'stationList' 
  | 'mobileChargingConfirmation' 
  | null;

// Global modal state - simple approach for React 19
let globalModalState: ModalType = null;
let globalModalSetter: ((modal: ModalType) => void) | null = null;

/**
 * Opens a modal by updating the global modal state
 */
export const openModal = (modal: ModalType) => {
  if (globalModalSetter) {
    globalModalSetter(modal);
  }
};

/**
 * Closes the current modal
 */
export const closeModal = () => {
  if (globalModalSetter) {
    globalModalSetter(null);
  }
};

/**
 * Registers a modal state setter - called by MainStackNavigator
 */
export const registerModalSetter = (setter: (modal: ModalType) => void) => {
  globalModalSetter = setter;
};

/**
 * Unregisters the modal state setter - called by MainStackNavigator on cleanup
 */
export const unregisterModalSetter = () => {
  globalModalSetter = null;
};

/**
 * Gets the current modal state - mainly for debugging
 */
export const getCurrentModal = (): ModalType => {
  return globalModalState;
}; 