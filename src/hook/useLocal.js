import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import {AuthContext} from '@context/context'

import en from '@components/Helper/en';
import mm from '@components/Helper/mm';

const useLocal = () => {
    const {lang} = useContext(AuthContext);
    if(lang === 'en') {
        return en;
    }else{
        return mm;
    }
}

export default useLocal