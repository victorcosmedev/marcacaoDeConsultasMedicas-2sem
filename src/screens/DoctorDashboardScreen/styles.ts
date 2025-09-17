import styled from 'styled-components/native';
import theme from './../../styles/theme';
import { ListItem} from 'react-native-elements';
import { StyledProps } from './types/StyledProps';
import { getStatusColor } from './services/DoctorDashboardScreenService';

export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  settingsButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
  dateTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
};
 
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;
 
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;
 
export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin: 10px 0;
`;
 
export const StatisticsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;
 
export const AppointmentCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;
 
export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;
 
export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;
 
export const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;
 
export const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;
 
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const PatientImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const PatientName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

export const DateTime = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.primary};
  margin-top: 4px;
`;

export const Description = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-top: 4px;
`;

export const Status = styled.Text<{ status: string }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props: { status: string }) => props.status === 'pending' ? theme.colors.error : theme.colors.success};
  margin-top: 4px;
  font-weight: bold;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${theme.spacing.small}px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: ${theme.spacing.small}px;
  margin-left: ${theme.spacing.small}px;
`;
