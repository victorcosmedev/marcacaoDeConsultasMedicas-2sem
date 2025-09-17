import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../../../contexts/AuthContext';

type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
};

export function useEditProfileScreen() {
    const { user, updateUser } = useAuth();
    const navigation = useNavigation<EditProfileScreenProps['navigation']>();
    
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [specialty, setSpecialty] = useState(user?.specialty || '');
    const [profileImage, setProfileImage] = useState(user?.image || '');
    const [loading, setLoading] = useState(false);
 
  return {
    user,
    updateUser,
    navigation,
    name,
    setName,
    email,
    setEmail,
    specialty,
    setSpecialty,
    profileImage,
    setProfileImage,
    loading,
    setLoading,
  };
}