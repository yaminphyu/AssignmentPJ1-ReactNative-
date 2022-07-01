import React, {useContext, useState} from 'react'
import { View, Text } from 'react-native'
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store'
import Header from '../../components/Login/Header'
import {AuthContext} from '@context/context';
import useLocal from '../../hook/useLocal';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState(false);
  const local = useLocal();

  const {lang, getAuth, getLang} = useContext(AuthContext);

  const actionHandler = () => {
    let userdata = {
      userName: username,
      userEmail: email,
      userPassword: password,
      userConfirmPassword: confirmpassword,
    };
    if(password == confirmpassword){
      RNSecureKeyStore.set("userdata", JSON.stringify(userdata), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
      .then((res) => {
          getAuth(false)
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setUsername('');
          console.log('User Data :: ', res);
      }, (err) => {
          console.log(err);
      });
    }else{
      console.log('Password are not match!');
    }
  }

  const footerHandler = () => {
    if(login){
      props.navigation.navigate('Register')
    }else{
      props.navigation.navigate('Login');
      console.log('Login')
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
        title={local.register}
        buttonText={local.register}
        emailValue={email}
        passValue={password}
        confirmpassValue={confirmpassword}
        nameValue={username}
        onChangeEmail={val => setEmail(val)}
        onChangePassword={val => setPassword(val)}
        onChangeConfirmPassword={val => setConfirmPassword(val)}
        onChangeUsername={val => setUsername(val)}
        isLogin={login}
        footerText={local.login}
        action={actionHandler}
        footerChange={footerHandler}
      />
    </View>
  )
}

export default Register