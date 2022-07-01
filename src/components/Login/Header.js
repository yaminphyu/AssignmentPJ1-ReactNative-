import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store'
import useLocal from '../../hook/useLocal'

const Header = props => {
    const local = useLocal();

    const onChangeLanguages = (val) => {
        RNSecureKeyStore.set("language", val, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res) => {
            console.log('User Data :: ', res);
        }, (err) => {
            console.log(err);
        });
        props.onChangeLanguage();
    }

  return (
    <View style={{
        // marginTop: '20%',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3',
        height: '100%'
    }}>
        {/* Localization */}
        <View style={{flexDirection: 'row', marginLeft: '55%', marginBottom: 50}}>
            <TouchableOpacity onPress={() => onChangeLanguages('mm')}>
                <Text style={{color:'red', marginRight: 10}}>{local.mmLanguage}   | </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeLanguages('en')}>
                <Text style={{color:'red'}}>{local.enLanguage}</Text>
            </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={{color: '#808080', fontSize: 20}}>{props.title}</Text>

        <View style={{marginTop: '10%'}}>
            {
                !props.isLogin &&
                    <TextInput
                        placeholder={local.username}
                        placeholderTextColor={'#808080'}
                        value={props.nameValue}
                        onChangeText={props.onChangeUsername}
                        style={{
                            backgroundColor: '#FFFAFA',
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                            borderRadius: 10,
                            margin: 0,
                            marginTop: 10,
                        }}
                    />
            }

            <TextInput
                placeholder={local.emailPlaceholder}
                placeholderTextColor={'#808080'}
                value={props.emailValue}
                onChangeText={props.onChangeEmail}
                style={{
                    backgroundColor: '#FFFAFA',
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    borderRadius: 10,
                    margin: 0,
                    marginTop: 10,
                }}
            />

            <TextInput
                placeholder={local.pwdPlaceholder}
                placeholderTextColor={'#808080'}
                secureTextEntry
                value={props.passValue}
                onChangeText={props.onChangePassword}
                style={{
                    backgroundColor: '#FFFAFA',
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    borderRadius: 10,
                    margin: 0,
                    marginTop: 10,
                }}
            />
            
            {
                !props.isLogin &&
                    <TextInput
                        placeholder={local.confirmpwdPlaceholder}
                        placeholderTextColor={'#808080'}
                        secureTextEntry
                        value={props.confirmpassValue}
                        onChangeText={props.onChangeConfirmPassword}
                        style={{
                            backgroundColor: '#FFFAFA',
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                            borderRadius: 10,
                            margin: 0,
                            marginTop: 10,
                        }}
                    />
            }
        </View>

        <TouchableOpacity
            style={{
                marginTop: 30,
                backgroundColor: '#F5F5DC',
                width: 150,
                paddingVertical: 13,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
            }}
            onPress={props.action}
            activeOpacity={0.8}
        >
            <Text>{props.buttonText}</Text>
        </TouchableOpacity>
        
        {
            !props.isLogin ?   
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{color: 'purple'}}>{local.already}  </Text>
                    <TouchableOpacity onPress={props.footerChange}>
                        <Text style={{color: 'red'}}>{props.footerText}</Text>
                    </TouchableOpacity>
                </View>
            :   
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Text style={{color: 'purple'}}>{local.noAccount}  </Text>
                    <TouchableOpacity onPress={props.footerChange}>
                        <Text style={{color: 'red'}}>{props.footerText}</Text>
                    </TouchableOpacity>
                </View>
        }
    </View>
  )
}

export default Header