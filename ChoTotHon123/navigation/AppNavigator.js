import React from 'react'

import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigation';
import ChooseScreen from '../screens/ChooseScreen';
import FacebookLogin from '../screens/FacebookLogin';

class Logo extends React.Component{
    render(){
      return(
          <Image
          source={require('../assets/logo_white.png')}
          style={{ width: 180, height:40}}/>
        );
    }
  }

export default createAppContainer(
    createSwitchNavigator({
        Main: MainTabNavigator,
        Choose: ChooseScreen
    }, {
        initialRouteName: 'Choose',
        // defaultNavigationOptions:{
        //     headerStyle: {
        //       backgroundColor: 'white',
        //     },
        //     headerTintColor: 'gold',
        //     headerTitle: ()=><Logo/>,
        //   }
    })
)
