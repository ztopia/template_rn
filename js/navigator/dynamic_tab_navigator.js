import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator,createAppContainer} from 'react-navigation';

type Props = {};
import PopularPage from './../page/main/popular';
import TrendingPage from './../page/main/trending';
import FavoritePage from './../page/main/favorite';
import MyPage from './../page/main/my';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from './../navigator/navigation_util';
import {BottomTabBar} from 'react-navigation-tabs';

const TABS=
    {//动态加载BottomBar,配置路由页面
        PopularPage:{
            screen:PopularPage,
            navigationOptions:{
                tabBarLabel:'最热',
                tabBarIcon:({tintColor,focused})=>(//使用小括号是因为{}是代码块需要加return才行
                    <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color:tintColor}}
                    />
                )
            }
        },
        TrendingPage:{
            screen:TrendingPage,
            navigationOptions:{
                tabBarLabel:'趋势',
                tabBarIcon:({tintColor,focused})=>(
                    <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color:tintColor}}
                    />
                )
            }
        },
        FavoritePage:{
            screen:FavoritePage,
            navigationOptions:{
                tabBarLabel:'收藏',
                tabBarIcon:({tintColor,focused})=>(
                    <MaterialIcons
                    name={'favorite-border'}
                    size={26}
                    style={{color:tintColor}}
                    />
                )
            }
        },
        MyPage:{
            screen:MyPage,
            navigationOptions:{
                tabBarLabel:'我的',
                tabBarIcon:({tintColor,focused})=>(
                    <MaterialIcons
                    name={'person-outline'}
                    size={26}
                    style={{color:tintColor}}
                    />
                )
            }
        },
    }

export default class DynamicTabNavigator extends Component<Props> {
  
  constructor(props) {
      super(props);
      console.disableYellowBox=true;
  }
  _tabNavigator(){
    const {PopularPage,TrendingPage,FavoritePage,MyPage} =TABS;
    const tabs={PopularPage,TrendingPage,FavoritePage};//根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel='最热';//动态配置tab属性

    return  createAppContainer(createBottomTabNavigator(tabs,{
        tabBarComponent:TabBarComponent,//修改颜色
        tabBarOptions: {
            activeTintColor: Platform.OS === "ios" ? "#e91e63" : "#37b7a5",
            style: {
                backgroundColor: "#678"
            }
        }      
    }))
  }
  render() {
    const Tab=this._tabNavigator();
    return  <Tab/>
  }
}

class TabBarComponent extends React.Component{
    constructor(props) {
      super(props);
      this.theme={
          tintColor:props.activeTintColor,
          updateTime:new Date().getTime(),
      }
    }
    render(){
        const {routes,index}=this.props.navigation.state;
        if(routes[index].params){
            const {theme}=routes[index].params;
            //以最新更新时间为准，防止被覆盖掉
            if(theme&&theme.updateTime>this.theme.updateTime){
                this.theme=theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        />
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
