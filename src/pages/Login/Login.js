import React, {useContext, useState} from 'react'
import { View } from 'react-native'
import RNSecureKeyStore from 'react-native-secure-key-store'
import Header from '../../components/Login/Header'
import {AuthContext} from '@context/context'
import useLocal from '../../hook/useLocal'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);
  const local = useLocal();

  const {lang, getAuth, getLang} = useContext(AuthContext);

  const actionHandler = () => {
    RNSecureKeyStore.get("userdata")
    .then((res) => {
        let res_data = JSON.parse(res);
        if(res_data.userEmail == email && res_data.userPassword == password){
          getAuth(true);
          setEmail('');
          setPassword('');
        }else{
          console.log('not match')
          getAuth(false);
        }
    }, (err) => {
        console.log(err);
    });
  }

  const footerHandler = () => {
    if (login) {
      props.navigation.navigate('Register');
    } else {
      props.navigation.navigate('Login');
    }
  }

  const languageHandler = () => {
    RNSecureKeyStore.get("language")
    .then((res) => {
      getLang(res)
      // console.log('get lang', res);
    }, (err) => {
        console.log(err);
    });
  }

  return (
    <View>
      <Header 
        onChangeLanguage={languageHandler}
        title={local.login}
        buttonText={local.login}
        emailValue={email}
        passValue={password}
        onChangeEmail={val => setEmail(val)}
        onChangePassword={val => setPassword(val)}
        isLogin={login}
        footerText={local.register}
        footerChange={footerHandler}
        action={actionHandler}
      />
    </View>
  )
}

export default Login