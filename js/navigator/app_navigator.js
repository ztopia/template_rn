import {createStackNavigator,
        createMaterialTopTabNavigator,
        createBottomTabNavigator,
        createSwitchNavigator,
        createAppContainer
} from 'react-navigation';

import WelcomePage from './../page/welcome';
import HomePage from './../page/home_page';
import DetailPage from './../page/detail_page';
//redux-------------------------------------------
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers';
export const rootCom='Init';//设置根路由

const InitNavigator=createStackNavigator({
    WelcomePage:{
        screen: WelcomePage,
        navigationOptions:{
            header:null//禁用头部
        }
    }
});

const MainNavigator=createStackNavigator({
    HomePage:{
        screen: HomePage,
        navigationOptions:{
            header:null
        }
    },
    DetailPage:{
        screen: DetailPage,
        navigationOptions:{
          title:"DetailPage"
        }
    }
});

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
},{
    navigationOptions:{
        header:null
    }
}));

//第一步初始化中间件（redux）
export const middleware = createReactNavigationReduxMiddleware(
    state=>state.nav,
    'root'
);

//第二步 将根导航器组件传递给createReduxContainer，并返回一个将navigation state和dispatch 函数作为props的新组件
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

// state到props的映射关系
const mapStateToProps=state=>({
    state:state.nav,
})

//第三步 连接React组件与Redux store
export default connect(mapStateToProps)(AppWithNavigationState);  //=> /reducer/index.js