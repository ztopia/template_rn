import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput,AsyncStorage} from 'react-native';


type Props = {};
const KEY='save';
export default class FetchDemoPage extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      showText:''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome AsyncStorageDemo!</Text>
        <TextInput
            style={styles.input}
            onChangeText={text=>{
              this.value=text;
            }}
          />
        <View style={styles.inputContainer}>        
          <Text onPress={()=>{this.doSave();}}>存储</Text>
          <Text onPress={()=>{this.doRemove();}}>删除</Text>
          <Text onPress={()=>{this.getData();}}>获取</Text>         
        </View>

        <Text>{this.state.showText}</Text>
      </View>
    );
  }
  
    /**
     * 存储数据
     * @returns {Promise.<void>}
     */
    async doSave() {
        //用法一
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });
        // //用法二
        // AsyncStorage.setItem(KEY, this.value)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        //
        // //用法三
        // try {
        //     await  AsyncStorage.setItem(KEY, this.value);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    /**
     * 删除数据
     * @returns {Promise.<void>}
     */
    async doRemove() {
        //用法一
        AsyncStorage.removeItem(KEY,error => {
            error && console.log(error.toString());
        });

        // //用法二
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        //
        // //用法三
        // try {
        //     await  AsyncStorage.removeItem(KEY);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    /**
     * 获取数据
     */
    async getData() {
        //用法一
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            });
            console.log(value);
            error && console.log(error.toString());
        });
        // //用法二
        // AsyncStorage.getItem(KEY)
        //     .then(value => {
        //         this.setState({
        //             showText: value
        //         });
        //         console.log(value);
        //
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        // //用法三
        // try {
        //     const value = await  AsyncStorage.getItem(KEY);
        //     this.setState({
        //         showText: value
        //     });
        //     console.log(value);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input:{
    height:30,
    borderColor:'black',
    borderWidth:1,
    marginRight:10
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-around'
  }
});

