/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { store } from './src/Redux/Store/store';
import { Provider } from 'react-redux';

const AppEntry = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
AppRegistry.registerComponent(appName, () => AppEntry);
