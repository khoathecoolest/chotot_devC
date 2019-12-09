import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Alert,ScrollView, Linking } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import data from '../assets/data'
import CurrencyFormat from 'react-currency-format'


export default class DetailScreen extends React.Component{
    constructor(props) {
      super(props);
  
      this.state = {
        phone: 0,
      };
    }
    onPhonePress =()=>{
      data.AdList[this.props.navigation.getParam('itemID')-1].status = 2;
      Linking.openURL('tel:${84969935447}')
      this.setState({
        phone: this.state.phone + 1
      })
    }

    onHeartPress = (id)=>{
      if(data.AdList[id-1].status === 0)
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

    render(){
      const {navigation} = this.props;
      const product = data.AdList[navigation.getParam('itemID')-1];
      return(
        <View style = {styles.detailContainer}>
          <View style = {styles.detailImg}>
            <Image source = {product.uri} style = {{width: 300, height: 210}} />
          </View>
          <View style={styles.detailInfo}>
            <View>
            <Text style={{color: 'black', fontSize: 20, marginBottom: 10, marginTop: 50, fontWeight: 'bold'}}>{product.name}</Text>
            <CurrencyFormat renderText={value => <Text  style={{color: 'black', fontSize: 15, marginBottom: 10}}>{value}</Text>} value={product.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            <Text style = {{color: 'grey', fontSize: 15, marginBottom: 10}}>{product.type} | {product.area}</Text>
            </View>
            <TouchableOpacity style = {styles.Hicon}><AntDesign name= 'heart' size={25} color={product.status===0?'blue':'darkorange'} type = 'solid' onPress={()=>this.onHeartPress(product.id)}/></TouchableOpacity>
          </View>
          <View style = {styles.contact}>
            <Text style={{marginBottom: 10, fontSize: 15}}>Contact Shop</Text>
            <TouchableOpacity onPress={()=>this.onPhonePress()}>
              <View style = {{width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgb(255,186,0)', justifyContent: 'center', alignItems: 'center'}} >
            <AntDesign name = 'phone' size= {30}></AntDesign>
          </View>
        </TouchableOpacity>
        </View>
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
    
    detailContainer:
    {
      flex: 1,
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
    detailInfo : {
      flexDirection: 'row',
      paddingStart: 20,
       borderColor: 'lightgrey',
      borderBottomWidth: 1,
      justifyContent: 'space-between'
    },
    Hicon:
    {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      paddingEnd: 20
    },
    // detailInfo:
    // {
    //   flex: 0.25,
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   justifyContent: 'space-between',
    //   borderColor: 'grey',
    //   borderBottomWidth:2,
    //   borderTopWidth:2
    // },
    contact:
    {
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  