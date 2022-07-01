import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import RNSecureKeyStore from 'react-native-secure-key-store'
import {AuthContext} from '@context/context';

const MainStack = () => {
  const {getAuth} = useContext(AuthContext);

  const logoutHandler = () => {
    console.log('hello');
    RNSecureKeyStore.remove("userdata")
    .then((res) => {
        getAuth(false)
        console.log(res);
    }, (err) => {
        console.log(err);
    });	
  }
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MainStack</Text>

      <TouchableOpacity onPress={logoutHandler}>
        <Text style={{
          width:80,
          color:'blue',
          marginTop:10
        }}>Logout here!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MainStack