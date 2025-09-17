import { imageService } from '../../../services/imageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function handleImageSelected(
    imageUri: string,
    userId: string | number | undefined,
    setProfileImage: (uri: string) => void
){
    try {
        setProfileImage(imageUri);
        
        // Salva a imagem no armazenamento local se for uma nova imagem
        if (imageUri.startsWith('data:image/') && userId) {
        const savedImageUri = await imageService.saveProfileImage(userId, {
            uri: imageUri,
            base64: imageUri.split(',')[1],
            width: 150,
            height: 150,
        });
        setProfileImage(savedImageUri);
        }
    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        Alert.alert('Erro', 'Não foi possível processar a imagem selecionada');
    }
};

export async function handleSaveProfile 
(
    {
        name,
        email,
        specialty,
        profileImage,
        user,
        updateUser,
        navigation,
        setLoading
    }: {
        name: string,
        email: string,
        specialty: string,
        profileImage: string,
        user: any,
        updateUser: (user: any) => Promise<void>,
        navigation: any,
        setLoading: (loading: boolean) => void
    }    
){
    try {
      setLoading(true);

      if (!name.trim() || !email.trim()) {
        Alert.alert('Erro', 'Nome e email são obrigatórios');
        return;
      }

      const updatedUser = {
        ...user!,
        name: name.trim(),
        email: email.trim(),
        image: profileImage,
        ...(user?.role === 'doctor' && { specialty: specialty.trim() }),
      };

      // Atualiza no Context
      await updateUser(updatedUser);

      // Salva no AsyncStorage
      await AsyncStorage.setItem('@MedicalApp:user', JSON.stringify(updatedUser));

      // Limpeza de imagens antigas
      if (user?.id) {
        await imageService.cleanupOldImages(user.id);
      }

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };