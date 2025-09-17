import React from 'react';
import styled from 'styled-components/native';
import { Input, Button, Text } from 'react-native-elements';
import theme from '../styles/theme';
import { ViewStyle } from 'react-native';
import { useLoginScreen } from './hooks/useLoginScreen';
import {
  styles,
  Container,
  Title,
  ErrorText
} from './styles'

const LoginScreen: React.FC = () => {
  const {
    signIn,
    navigation,
    email, setEmail,
    password, setPassword,
    loading, setLoading,
    error, setError
  } = useLoginScreen();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>App Marcação de Consultas</Title>
      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Entrar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Cadastrar Novo Paciente"
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.registerButton as ViewStyle}
        buttonStyle={styles.registerButtonStyle}
      />

      <Text style={styles.hint}>
        Use as credenciais de exemplo:
      </Text>
      <Text style={styles.credentials}>
        Admin: admin@example.com / 123456{'\n'}
        Médicos: joao@example.com, maria@example.com, pedro@example.com / 123456
      </Text>
    </Container>
  );
};

export default LoginScreen; 