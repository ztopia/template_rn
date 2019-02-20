import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from './../../navigator/navigation_util';

type Props = {};
export default class MyPage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome MyPage!</Text>
        <Text onPress={()=>{
           NavigationUtil.goPage({
             navigation:this.props.navigation
           },'DetailPage')
        }}>跳转到详情页</Text>
        <Text onPress={()=>{
           NavigationUtil.goPage({
             navigation:this.props.navigation
           },'FetchDemoPage')
        }}>FetchDemoPage</Text>
        <Text onPress={()=>{
           NavigationUtil.goPage({
             navigation:this.props.navigation
           },'AsyncStorageDemo')
        }}>AsyncStorageDemo</Text>
        <Text onPress={()=>{
           NavigationUtil.goPage({
             navigation:this.props.navigation
           },'DataStorageDemo')
        }}>DataStorageDemo</Text>
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
