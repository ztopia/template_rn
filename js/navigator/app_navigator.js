import {createStackNavigator,
        createMaterialTopTabNavigator,
        createBottomTabNavigator,
        createSwitchNavigator
} from 'react-navigation';

import WelcomePage from './../page/welcome';
import HomePage from './../page/home_page';
import DetailPage from './../page/detail_page';

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
            header:null
        }
    }
});

export default createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
},{
    navigationOptions:{
        header:null
    }
})