import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

type Props = {};
import PopularPage from './main/popular';
import TrendingPage from './main/trending';
import FavoritePage from './main/favorite';
import MyPage from './main/my';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from './../navigator/navigation_util';
import DynamicTabNavigator from '../navigator/dynamic_tab_navigator';

export default class HomePage extends Component<Props> {
  render() {
    NavigationUtil.navigation=this.props.navigation; //里层理由跳外层，需要保存一份外部路由，跳详情页
   
    return  <DynamicTabNavigator/>
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
