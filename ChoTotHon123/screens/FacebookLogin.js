import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import firebase from '../components/FirebaseConfig'
export default class FacebookLogin extends React.Component {
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log(user)
                props.navigation.navigate('Main')
            }
        })
    }

    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
          "<423743455223761>",
          {
            permissions: ["public_profile"]
          }
        );
        if (type == 'success') {
    
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
      
            firebase.auth().signInWithCredential(credential).catch((error) => {
              console.log(error)
            })

            props.navigation.navigate('Choose')
          }else {
          // Handle errors here.
          props.navigation.navigate('Choose')
        }
      }
    
    render() {
        return (
            <View>
                <TouchableOpacity onPress= {() => this.logIn} style={{margin: 50}}>
                    <Text>Login with Facebook</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

