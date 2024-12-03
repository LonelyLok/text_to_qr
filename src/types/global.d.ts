export interface BackendAPI {
    generateQR: (text: string) => void;
    onQRGenerated: (callback: (data: string) => void) => void;
    onQRError: (callback: (error: string) => void) => void;
    writeImage: (dataURL: string) => void;
  }
  
  declare global {
    interface Window {
      backendAPI: BackendAPI;
    }
  }