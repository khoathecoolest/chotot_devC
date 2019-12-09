import React from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from 'react-native'

const NOTIFICATION = [
    {
        id: 1,
        followingName: 'Na Huynh',
        followingAva: require('../assets/house.jpeg'),
        productName: 'Iphone 7',
        date: 'Nov 1, 2019'
    },
    {
        id: 2,
        followingName: 'Na Huynh',
        followingAva: require('../assets/house.jpeg'),
        productName: 'Iphone 7',
        date: 'Nov 1, 2019'
    },
    {
        id: 3,
        followingName: 'Na Huynh',
        followingAva: require('../assets/house.jpeg'),
        productName: 'Iphone 7',
        date: 'Nov 1, 2019'
    },
]


const OneNoti = (props) => {
    const noti = props.noti
    return (
        <TouchableOpacity style={styles.notiContainer}>
            <View style={styles.avatarContainer}>
                <Image source={noti.followingAva} style={styles.avatar} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    <Text style={{ fontWeight: 'bold' }}>{noti.followingName}</Text> just add <Text style={{ fontWeight: 'bold' }}>{noti.productName}</Text> to Wish List
                </Text>
                <Text style={styles.date}>{noti.date}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function NotiScreen() {
    return (
        <View>
            {NOTIFICATION.map(n => (
                <OneNoti noti={n} key={n.id}/>
            ))}
        </View>
    )
}

NotiScreen.navigationOptions = {
    headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 15
    },
    title: 'Notification',
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    notiContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
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
    titleContainer: {
        flex: 7,
        padding: 8,
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
        fontWeight: '300',
        color: 'gray'
    },
    date: {
        fontWeight: '200', 
        fontSize: 11, 
        marginTop: 5,
        color: 'gray'
    }
})