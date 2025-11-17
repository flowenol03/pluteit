// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyChzwJfajbAuOzSxu-qrR_S8UBzI9Cab3g",
  authDomain: "pluteit-d10e0.firebaseapp.com",
  databaseURL: "https://pluteit-d10e0-default-rtdb.firebaseio.com", // ADD THIS LINE
  projectId: "pluteit-d10e0",
  storageBucket: "pluteit-d10e0.firebasestorage.app",
  messagingSenderId: "762746690930",
  appId: "1:762746690930:web:6395b51c68c82843b211eb",
  measurementId: "G-QTVFC2CVN3"
};

// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIG);
export const analytics = getAnalytics(app);

export const UI_TYPES = {
  LIST: 'LIST',
  GRID: 'GRID'
};

export const CATEGORY_TYPES = {
  LANGUAGES: 'Languages',
  FRAMEWORKS: 'Frameworks',
  TECHNOLOGIES: 'Technologies',
  TECH_HUB: 'Tech Hub',
  AI_ML: 'AI-ML'
};