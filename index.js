/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {createAppContainer} from 'react-navigation'
import AppNavigator from './js/navigator/app_navigator';
const App=createAppContainer(AppNavigator);//navigator必须由createAppContainer包裹

AppRegistry.registerComponent(appName, () => App);
