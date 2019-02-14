import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavigationUtil from '../navigator/navigation_util';

type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    this.timer=setTimeout(()=>{
       NavigationUtil.resetToHomePage({
         navigation:this.props.navigation
       })
    },500)
  }
  componentWillUnmount() {
    this.timer&&clearTimeout(this.timer)
  }
  render() {
    const {navigation}=this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Page!</Text>
      </View>
    );
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
