import { useAuth } from './../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenProps } from '../types/ProfileScreenProps';

export const useProfile = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenProps['navigation']>();

  return {
    user,
    signOut,
    navigation,
  };
};
