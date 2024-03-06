import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {navigationRef} from './src/utils/NavigationService';
import {RefreshProvider} from './src/utils/RefreshContext';
import {ThemeProvider} from 'styled-components/native';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <RefreshProvider>
            <AppInner />
          </RefreshProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
