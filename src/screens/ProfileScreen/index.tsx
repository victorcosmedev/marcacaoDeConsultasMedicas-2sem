import React from 'react';
import { Button, ListItem } from 'react-native-elements';
import Header from './../../components/Header';
import { ViewStyle } from 'react-native';
import { ProfileCard } from './components/ProfileScreenCard';
import { useProfile } from './hooks/useProfile';
import {
  styles,
  Container,
  ScrollView,
  Title,
} from './styles'

const ProfileScreen: React.FC = () => {
  const { user, signOut, navigation } = useProfile();
  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'doctor':
        return 'Médico';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard user={user} getRoleText={getRoleText}/>

        <Button
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile' as any)}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.editButton}
        />

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};



export default ProfileScreen;