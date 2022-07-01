import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '@pages/Register/Register'
import LoginScreen from '@pages/Login/Login'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack