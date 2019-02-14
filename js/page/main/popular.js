import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {
        createMaterialTopTabNavigator,
        createAppContainer
} from 'react-navigation';
import NavigationUtil from './../../navigator/navigation_util'
type Props = {};
export default class PopularPage extends Component<Props> {
  constructor (props){//动态配置顶部tab
    super(props);
    this.tabNames=['js','java','php','android','iOS','react-native'];
  }
  _genTabs(){
    const tabs={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props => <PopularTab {...props} tabLabel={item}/>,//路由传参
        navigationOptions:{
          title:item
        }
      }
    });
    return tabs;
  }
  render() {
    const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,//配置顶部样式
          upperCaseLabel:false,
          scrollEnabled:true,//选项卡可滚动
          style:{
            backgroundColor:'#679'
          },
          indicatorStyle:styles.indicatorStyle,//选项卡指示器
          labelStyle:styles.labelStyle,//文字样式
        }
      }
    ));
    return <View style={styles.container}>
       <TabNavigator/>
    </View>
  }
}

class PopularTab extends Component<Props>{
  render() {
    const {tabLabel}=this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text onPress={()=>{
           NavigationUtil.goPage({
             navigation:this.props.navigation
           },'DetailPage')
        }}>跳转到详情页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabStyle:{
    minWidth:50
  },
  indicatorStyle:{
    height:2,
    backgroundColor:'white',
  },
  labelStyle:{
    fontSize:13,
    marginTop:6,
    marginBottom:6,
  }

});
