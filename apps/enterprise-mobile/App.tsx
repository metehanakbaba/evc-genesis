import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, AppNavigationContainer } from './src/features/common';
import { I18nProvider } from './src/features';

import './global.css';

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#111827" translucent />
        <AppNavigationContainer />
      </AuthProvider>
    </I18nProvider>
  );
}
