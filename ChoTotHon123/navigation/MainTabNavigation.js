import React from 'react';
import {Platform, Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen'
import TabBarIcon from '../components/TabBarIcon';
import NotiScreen from '../screens/NotiScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DetailScreen from '../screens/Detail'

import Colors from '../constants/Colors'
import AdlistScreen from '../screens/AdList';

const tabBarOptions = {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
}

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {}
})

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Detail: DetailScreen,
        AdList: AdlistScreen
    },
    config
)

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarOptions: tabBarOptions,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused = {focused}
            name={
                Platform.OS === 'ios' ? 'ios-home' : 'md-home'
            }
        />
    )
}

HomeStack.path = '';

const NotiStack = createStackNavigator(
    {
        Noti: NotiScreen,
        
    },
    config
)

NotiStack.navigationOptions = {
    tabBarLabel: 'Notice',
    tabBarOptions: tabBarOptions,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused = {focused}
            name={
                Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'
            }
        />
    )
}

NotiStack.path = '';

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        Detail: DetailScreen,
    },
    config
)

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarOptions: tabBarOptions,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused = {focused}
            name={
                Platform.OS === 'ios' ? 'ios-person' : 'md-person'
            }
        />
    )
}

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
    HomeStack,
    NotiStack,
    ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;