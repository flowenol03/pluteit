import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadService = {
  // Upload single file
  uploadFile: async (file, path = 'uploads') => {
    try {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (files, path = 'uploads') => {
    try {
      const uploadPromises = files.map(file => 
        uploadService.uploadFile(file, path)
      );
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      throw new Error(`Failed to upload files: ${error.message}`);
    }
  }
};