import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Header from './../../components/Header';
import ProfileImagePicker from './../../components/ProfileImagePicker';
import { styles } from './styles';
import { useEditProfileScreen } from './hooks/useEditProfileScreen';
import { handleImageSelected, handleSaveProfile } from './services/editProfileService';
import {
  Container,
  Title,
  ProfileCard,
  RoleBadge,
  RoleText,
} from './styles';

const EditProfileScreen: React.FC = () => {
  const {
    user,
    updateUser,
    navigation,
    name, setName,
    email, setEmail,
    specialty, setSpecialty,
    profileImage, setProfileImage,
    loading, setLoading,
  } = useEditProfileScreen();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Editar Perfil</Title>

        <ProfileCard>
          <ProfileImagePicker
            currentImageUri={profileImage}
            onImageSelected={(uri) => handleImageSelected(uri, user?.id, setProfileImage)}
            size={120}
            editable={true}
          />
          
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            containerStyle={styles.input}
            placeholder="Digite seu nome"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {user?.role === 'doctor' && (
            <Input
              label="Especialidade"
              value={specialty}
              onChangeText={setSpecialty}
              containerStyle={styles.input}
              placeholder="Digite sua especialidade"
            />
          )}

          <RoleBadge role={user?.role || ''}>
            <RoleText>{user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Médico' : 'Paciente'}</RoleText>
          </RoleBadge>
        </ProfileCard>

        <Button
          title="Salvar Alterações"
          onPress={() => 
            handleSaveProfile({
                name,
                email,
                specialty,
                profileImage,
                user,
                updateUser,
                navigation,
                setLoading
            })
          }
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.saveButton}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

export default EditProfileScreen;