import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View,RefreshControl,ActivityIndicator} from 'react-native';//ActivityIndicator底部加载更多
import {connect} from 'react-redux';//组件与state树做关联
import actions from './../../action/index'

import {
        createMaterialTopTabNavigator,
        createAppContainer
} from 'react-navigation';
import NavigationUtil from './../../navigator/navigation_util';
import PopularItem from './../../common/popular_item';

import Toast from 'react-native-easy-toast';//Toast
import NavigtionBar from './../../common/navigation_bar';//使用自定义组件

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
const THEME_COLOR='#678'

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
        screen:props => <PopularTabPage {...props} tabLabel={item}/>,//路由传参
        navigationOptions:{
          title:item
        }
      }
    });
    return tabs;
  }
  render() {
    //使用自定义组件
    let statusBar={
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }
    let navigationBar=<NavigtionBar
      title={'最热'}
      statusBar={statusBar}
      style={{backgroundColor:THEME_COLOR}}
    />

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
    {/* 使用自定义组件 */}
       {navigationBar}
       <TabNavigator/>
    </View>
  }
}

const pageSize=10
class PopularTab extends Component<Props>{
  constructor(props){
    super(props);
    const {tabLabel}=this.props;
    this.storeName=tabLabel;//tabLabel就是关键字
  }
  componentDidMount() {
    this.loadData();
  }

  loadData (loadMore) {
    const {onRefreshPopular,onLoadMorePopular} =this.props;
    const store=this._store();
    const url=this.genFetchUrl(this.storeName)
    if(loadMore){
      onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,callback=>{
          this.refs.toast.show('没有更多了')
      })
    }else{
      onRefreshPopular(this.storeName,url,pageSize)
      
    }
    
  }

  /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

  genFetchUrl(key){
    return URL+key+QUERY_STR;
  }

  renderItem(data){
    const item=data.item;
    return <PopularItem
        item={item}
        onSelect={()=>{}}
     />
  }

  genIndicator(){
    return this._store().hideLoadingMore?null:
      <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.indicator}
          />
          <Text>正在加载更多</Text>
      </View>
  }

  render() {
    let store=this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item => "" + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading...'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}//进度条颜色
              refreshing={store.isLoading}
              onRefresh={()=>this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
              console.log('---onEndReached----');
              setTimeout(() => {
                  if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                      this.loadData(true);
                      this.canLoadMore = false;
                  }
              }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
              this.canLoadMore = true; //fix 初始化滚动时页调用onEndReached的问题
              console.log('---onMomentumScrollBegin-----')
          }}
        />
        <Toast ref={'toast'}
          position={'center'}
        />
      </View>
    );
  }
}

const mapStateToProps = state=>({
  popular:state.popular
})

const mapDispatchToProps = dispatch=>({
  //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
})

const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)//订阅

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabStyle:{
    // minWidth:50
    // padding:0
  },
  indicatorStyle:{
    height:2,
    backgroundColor:'white',
  },
  labelStyle:{
    fontSize:13,
    marginTop:6,
    marginBottom:6,
  },
  indicatorContainer:{
    alignItems:'center',
  },
  indicator:{
    color:'red',
    margin:10,
  }

});
