/**
 * 📱 QR Scanner Types
 * 
 * Type definitions for QR scanner functionality
 */

export interface QRScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (data: string) => void;
}

export interface QRScanResult {
  data: string;
  type: string;
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface QRScannerState {
  scanning: boolean;
  hasPermission: boolean | null;
  scannedData: string | null;
} 