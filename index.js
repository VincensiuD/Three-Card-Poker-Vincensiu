/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import PokerGame from './screens/front';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => PokerGame);
