import React, {useEffect} from 'react';
import Realm from 'realm';
import realm from './src/db';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import DrawerNavigator from './src/navigation/DrawerNav';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    text: 'black',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    text: 'white',
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(
    realm.objects('Theme').length === 0
      ? false
      : realm.objects('Theme')[0].isTheme,
  );

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

  useEffect(() => {
    realm.write(() => {
      realm.create(
        'Theme',
        {
          id: 1,
          isTheme: isDarkTheme,
        },
        true,
      );
    });
  }, [isDarkTheme]);

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }
  /*   const basetheme = realm.objects('Theme')[0].isTheme; */
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StatusBar
            barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          />
          <DrawerNavigator toggleTheme={toggleTheme} />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
