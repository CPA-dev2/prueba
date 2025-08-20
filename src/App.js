import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // or your custom config

import configureStore from './boot/configureStore';
import AppNavigator from './navigation/AppNavigator';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <AppNavigator />
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
