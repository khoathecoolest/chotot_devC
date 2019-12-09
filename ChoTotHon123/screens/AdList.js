import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Alert,ScrollView, Linking } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { AntDesign, Feather } from '@expo/vector-icons';
import data from '../assets/data'
import CurrencyFormat from 'react-currency-format'


export default class AdlistScreen extends React.Component{
    constructor(props) {
      super(props);
  
      this.state = {
        check: 'blue',
        adlist: data.AdList,
        category: this.props.navigation.getParam('category')
      };
    }
    onHeartPress = (id)=>{
      if(this.state.adlist[id-1].status === 0)
      {
        this.setState({
          check: 'darkorange',
        })
        data.AdList[id-1].status = 1;
        alert('Bạn đã theo dõi sản phẩm')
      }
      else
      {
        this.setState({
          check: 'blue',
        })
        data.AdList[id-1].status = 0;
        alert("Bạn đã bỏ theo dõi sản phẩm")
      }
    }

    componentDidMount() {
      this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
        this.setState({adlist: data.AdList})
      });
    }

    getIcon = () => {
      if (this.state.category === "May interested") {
        return 'heart'
      } else if (this.state.category === "Bất động sản") {
        return 'home'
      } 
      return 'tv'
    }
    render(){
      return(
        <View style = {styles.container}>
        <View style = {styles.header}>
      <Text style={{color: 'darkorange', fontSize: 20, marginLeft: 10, marginRight:10}}>{this.state.category}</Text>
        <Feather name={this.getIcon()} size={25} color='darkorange'/>
        </View>
        <ScrollView>
        {this.state.adlist.filter(p=>(this.state.category === 'May interested' ? p : p.category === this.state.category)).map(item => {
          return (
          <TouchableOpacity style = {styles.ad} onPress={()=>this.props.navigation.navigate('Detail',{itemID: item.id})} key={item.id}>
          <View style = {styles.Img}>
           <Image
          source={item.uri}
          style={{ width: 130, height:120}}/>
          </View>
          <View style = {styles.Info}>
          <Text style = {{color: 'black', fontSize: 15, marginBottom: 20}}>{item.name}</Text>
          {/* <Text style = {{color: 'red', fontSize: 20, fontWeight: 'bold'}}>{item.price}</Text> */}
          <CurrencyFormat renderText={value => <Text  style = {{color: 'red', fontSize: 15, fontWeight: 'bold'}}>{value}</Text>} value={item.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
          <Text style = {{color: 'grey', fontSize: 15, marginTop: 20}}>{item.type}|{item.area}</Text>
          </View>
          <TouchableOpacity style = {styles.Hicon}><AntDesign name= 'heart' size={25} color={item.status===0?'blue':'darkorange'} type = 'solid' onPress={()=>this.onHeartPress(item.id)}/></TouchableOpacity>
        </TouchableOpacity>
            );
        })}
        </ScrollView>
        </View>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    header:{
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'cornsilk',
      fontWeight: 'bold',
    },
    ad:
    {
      flex: 0.18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      paddingBottom: 10
    },
    Img:
    {
      flex: 0.37,
    },
    Info:
    {
      flex: 0.45,
      backgroundColor:'white',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
    Hicon:
    {
      flex:0.12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailContainer:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'white'
    },
    detailImg:
    {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    detailInfo:
    {
      flex: 0.25,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      borderColor: 'grey',
      borderBottomWidth:2,
      borderTopWidth:2
    },
    contact:
    {
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });