import ProfileImagePicker from "../../../components/ProfileImagePicker";
import { User } from "../../../types/auth";
import {
  Card,
  Name,
  Email,
  RoleBadge,
  RoleText,
  SpecialtyText,
} from "./../styles"

type Props = {
  user: User | null;
  getRoleText: (role: string) => string;
};

export const ProfileCard: React.FC<Props> = ({ user, getRoleText }) => {
  if (!user) return null;

  return (
    <Card>
      <ProfileImagePicker
        currentImageUri={user.image}
        onImageSelected={() => {}} // read-only in profile
        size={120}
        editable={false}
      />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={user.role}>
        <RoleText>{getRoleText(user.role)}</RoleText>
      </RoleBadge>

      {user.role === 'doctor' && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </Card>
  );
};

export default ProfileCard;