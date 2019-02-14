/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import AppNavigator from './js/navigator/app_navigator';

AppRegistry.registerComponent(appName, () => AppNavigator);
