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
import {createReactNavigationReduxMiddleware,reduxifyNavigator,createReduxContainer} from 'react-navigation-redux-helpers';
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

export const middleware = createReactNavigationReduxMiddleware(
    state=>state.nav,
    'root'
);

// const AppWithNavigationState =reduxifyNavigator(RootNavigator,'root');
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

const mapStateToProps=state=>({
    state:state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState);