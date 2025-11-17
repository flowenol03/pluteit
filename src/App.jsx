import React from 'react';
import { CategoryProvider } from './context/CategoryContext';
import { UIProvider } from './context/UIContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

function App() {
  return (
    <UIProvider>
      <CategoryProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </CategoryProvider>
    </UIProvider>
  );
}

export default App;