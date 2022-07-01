import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RNSecureKeyStore from 'react-native-secure-key-store'
import AuthStack from './Stack/AuthStack'
import MainStack from './Stack/MainStack'
import {AuthContext} from '@context/context'

const appNavigator = () => {
    const [auth, setAuth] = useState(false);
    const [lang, setLang] = useState('en');

    useEffect(() => {
        storeData();
    }, [])

    const storeData = () => {
        RNSecureKeyStore.get("userdata")
        .then((res) => {
            if(res) {
                // console.log(res);
                setAuth(true)
            }else{
                // console.log('res');
                setAuth(false)
            }
        }, (err) => {
            console.log(err);
        });
    }

    const context = {
        auth,
        lang,
        getAuth: value => {
            setAuth(value)
        },
        getLang: value => {
            setLang(value)
        }
    }

    if(auth){
        return (
            <AuthContext.Provider value={context}>
                <NavigationContainer>
                    <MainStack/>
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }else{
        return (
            <AuthContext.Provider value={context}>
                <NavigationContainer>
                    <AuthStack/>
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}

export default appNavigator