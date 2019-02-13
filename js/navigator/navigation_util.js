/**
    全局导航跳转工具类
 */
 export default class NavigationUtil {
     //返回首页
     static resetToHomePage(params){
         const {navigation} = params;
         navigation.navigate('Main');
     }
     //返回上一页
     static goBackToPage(navigation){
         navigation.goBack();
     }
 }