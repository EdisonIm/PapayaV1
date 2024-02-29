import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {navigationRef} from './src/utils/NavigationService';
import {RefreshProvider} from './src/utils/RefreshContext';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RefreshProvider>
          <AppInner />
        </RefreshProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
