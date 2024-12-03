// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, clipboard, nativeImage } from 'electron';

// Expose secure API to the renderer process
contextBridge.exposeInMainWorld('backendAPI', {
  // Send text to generate QR code
  generateQR: (text: string) => ipcRenderer.send('generate-qr', text),

  // Listen for the generated QR code (Base64 string)
  onQRGenerated: (callback: (data: string) => void) => {
    ipcRenderer.on('qr-generated', (_event, data: string) => callback(data));
  },

  // Listen for errors during QR code generation
  onQRError: (callback: (error: string) => void) => {
    ipcRenderer.on('qr-error', (_event, error: string) => callback(error));
  },

  writeImage: (dataURL: string) => {
    const image = nativeImage.createFromDataURL(dataURL);
    clipboard.writeImage(image);
  }
});