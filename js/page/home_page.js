import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import NavigationUtil from './../navigator/navigation_util';
import DynamicTabNavigator from '../navigator/dynamic_tab_navigator';
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
type Props = {};
class HomePage extends Component<Props> {

    componentDidMount() {
       BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
    }

    /**
     * 处理 Android 中的物理返回键
     * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
     * @returns {boolean}
     */
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

  render() {
    NavigationUtil.navigation=this.props.navigation; //里层理由跳外层，需要保存一份外部路由，跳详情页   
    return  <DynamicTabNavigator/>
  }
}

//订阅逻辑
const mapStateToProps=state=>({
  nav:state.nav
});
export default connect (mapStateToProps)(HomePage);
