import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import { RectButton } from 'react-native-gesture-handler';

import data from '../assets/data'
import CurrencyFormat from 'react-currency-format'



const myData = {
    avatar: require('../assets/house.jpeg'),
    name: 'Nguyen Huynh',
    followers: 102,
    following: 125,
    numberOfPost: 10
}

const SuggestedProduct = (props) => {
    const products = props.products
    return (products.length === 0 ? 
         (<View></View>):
         (
            <View>
              <TouchableOpacity style={productListStyle.heading} >
                <Text style={productListStyle.bigTitle}>My Wishlist</Text>
              </TouchableOpacity>
              <View style={suggestionStyle.photoContainer}>
                {products.slice(0, 10).map(p => {
                  return (
                    <TouchableOpacity key={p.id} style={{ marginBottom: 5 }}
                      onPress={() => props.navigation.navigate('Detail', {itemID: p.id})}
                    >
                      <Image source={p.uri} style={suggestionStyle.photo} />
                      <Text style={productListStyle.title}>{p.name}</Text>
                      <CurrencyFormat renderText={value => <Text style={productListStyle.price}>{value}</Text>} value={p.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                      {/* <Text style={productListStyle.price}>{p.price}</Text> */}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          ))
  }
  

export default class ProfileScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            list: data.AdList,
        }
    }

    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({list: data.AdList})
        });
      }
    

    render() {
        return (
            <ScrollView >
            <View style={styles.container}>
                <View style={styles.heading}>
                    <View style={styles.avatarContainer}>
                        <Image source={myData.avatar} style={styles.avatar} />
                    </View>
                    <View style={styles.statisics}>
                        <View style={styles.dataContainer}>
                            <Text style={styles.number}>{myData.numberOfPost}</Text>
                            <Text style={styles.text}>Posts</Text>
                        </View>
                        <View style={styles.dataContainer}>
                            <Text style={styles.number}>{myData.followers}</Text>
                            <Text style={styles.text}>Followers</Text>
                        </View>
                        <View style={styles.dataContainer}>
                            <Text style={styles.number}>{myData.following}</Text>
                            <Text style={styles.text}>Following</Text>
                        </View>
                    </View>
    
                </View>
                <View style={[styles.btnContainer, { marginVertical: 7 }]}>
                    <TouchableOpacity style={[styles.btn, styles.btnPrivate]}>
                        <Text style={{ color: 'white' }}>Private</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <SuggestedProduct products={this.state.list.filter(p=>p.status === 1)} navigation={this.props.navigation}/>
            </ScrollView>
        )
    }
}

ProfileScreen.navigationOptions = {
    headerTitleStyle: { 
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 15
    },
    title: myData.name,
    headerLeft: () => (
        <View></View>
    ),
    headerRight: () => (
        <TouchableOpacity style={{padding: 10}}>
            <Icon size={24} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}/>
        </TouchableOpacity>
      ),
};

const productListStyle = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        paddingVertical: 12,
      },
    title: {
      paddingHorizontal: 8,
      paddingBottom: 3,
      paddingTop: 8,
      fontSize: 13,
      fontWeight: '400',
      color: 'grey',
    },
    price: {
      paddingHorizontal: 8,
      padding: 3,
      fontSize: 13,
      fontWeight: '300'
    },
    bigTitle: {
        fontSize: 15,
        fontWeight: 'bold'
      },
  })

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // Heading styles
    heading: {
        height: screenHeight * 0.15,
        flexDirection: 'row',
    },
    avatarContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        borderRadius: screenWidth * 0.1
    },
    infoContainer: {
        marginHorizontal: 5,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    btn: {
        padding: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        width: 200
    },
    btnPrivate: {
        backgroundColor: Colors.tintColor,

    },
    // Statistic Styles
    statisics: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    dataContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 5
    },
    text: {
        fontSize: 14,
        fontWeight: '300',
        color: 'gray'
    },
});

const suggestionStyle = StyleSheet.create({
    // Photo Container styles
    photoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    photo: {
      width: screenWidth / 2,
      height: screenWidth / 3,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 8
    }
  })