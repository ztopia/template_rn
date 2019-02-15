import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';


type Props = {};
export default class FetchDemoPage extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      showText:''
    }
  }
  loadData(){
   // https://api.github.com/search/repositories?q=java
   let url=`https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
        .then(response=>{
          if(response.ok){
            return response.text()
          }
          throw new Error('Network response was not ok.')
        })
        .then(responseText=>{
          this.setState({
              showText:responseText
          })
        })
        .catch(e=>{
           this.setState({
              showText:e.toString()
          })
        })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome FetchDemoPage!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text=>{
              this.searchKey=text;
            }}
          />
          <Button
            title='获取'
            onPress={()=>{
              this.loadData();
            }}
          />
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    );
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
    flex:1,
    borderColor:'black',
    borderWidth:1,
    marginRight:10
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:'center'
  }
});

