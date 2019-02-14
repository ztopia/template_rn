import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/app_navigator';
import store from './store';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Provider store={store}>
        <AppNavigator/>
    </Provider>
  }
}

const styles = StyleSheet.create({
  
});
