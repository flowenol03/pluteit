import { useState } from 'react';
import { uploadService } from '../services/firebase/uploadService';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file, path) => {
    try {
      setUploading(true);
      setProgress(0);
      const url = await uploadService.uploadFile(file, path);
      setProgress(100);
      return url;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const uploadMultipleFiles = async (files, path) => {
    try {
      setUploading(true);
      setProgress(0);
      const urls = await uploadService.uploadMultipleFiles(files, path);
      setProgress(100);
      return urls;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    uploading,
    progress,
    uploadFile,
    uploadMultipleFiles
  };
};