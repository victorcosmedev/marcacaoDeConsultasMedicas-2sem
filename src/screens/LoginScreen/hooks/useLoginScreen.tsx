import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './../../../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './../../../types/navigation';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export function useLoginScreen(){
      const { signIn } = useAuth();
      const navigation = useNavigation<LoginScreenProps['navigation']>();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      return {
            signIn,
            navigation,
            email,
            setEmail,
            password,
            setPassword,
            loading,
            setLoading,
            error,
            setError
      }
}