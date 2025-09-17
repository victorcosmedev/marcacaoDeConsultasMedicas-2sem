import React from 'react';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import theme from './../../styles/theme';
import Header from './../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppointmentActionModal from './../../components/AppointmentActionModal';
import { notificationService } from './../../services/notifications';
import StatisticsCard from './../../components/StatisticsCard';
import { statisticsService} from './../../services/statistics';
import { useDoctorDashboardScreen } from './hooks/useDoctorDashboardScreen';
import { Appointment } from './types/Appointment';
import {
    styles,
    Container,
    Title,
    SectionTitle,
    StatisticsGrid,
    AppointmentCard,
    LoadingText,
    EmptyText,
    StatusBadge,
    StatusText,
    ButtonContainer
} from './styles';
import { AppointmentItem } from './components/AppointmentItem';

import { getStatusText } from './services/DoctorDashboardScreenService';
 
const DoctorDashboardScreen: React.FC = () => {
  const {
    modalVisible, setModalVisible,
    selectedAppointment, setSelectedAppointment,
    actionType, setActionType,
    user, signOut,
    navigation,
    appointments, setAppointments,
    loading, setLoading,
    statistics, setStatistics
  } = useDoctorDashboardScreen();
 
  const loadData = async () => {
    try {
      // Consultas do médico
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const doctorAppointments = allAppointments.filter(
          (appointment) => appointment.doctorId === user?.id
        );
        setAppointments(doctorAppointments);
      }
 
      // Estatísticas do médico
      if (user?.id) {
        const stats = await statisticsService.getDoctorStatistics(user.id);
        setStatistics(stats);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do médico:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleOpenModal = (appointment: Appointment, action: 'confirm' | 'cancel') => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setModalVisible(true);
  };
 
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };
 
  const handleConfirmAction = async (reason?: string) => {
    if (!selectedAppointment) return;
 
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === selectedAppointment.id) {
            return {
              ...appointment,
              status: actionType === 'confirm' ? 'confirmed' : 'cancelled',
              ...(reason && { cancelReason: reason })
            };
          }
          return appointment;
        });
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
 
        // Envia notificação para o paciente
        if (actionType === 'confirm') {
          await notificationService.notifyAppointmentConfirmed(
            selectedAppointment.patientId,
            selectedAppointment
          );
        } else {
          await notificationService.notifyAppointmentCancelled(
            selectedAppointment.patientId,
            selectedAppointment,
            reason
          );
        }
 
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };
 
  // Carrega as consultas e estatísticas quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );
 
  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>
 
        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />
 
        <Button
          title="Configurações"
          onPress={() => navigation.navigate('Settings')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.settingsButton}
        />
 
        {statistics && (
          <>
            <SectionTitle>Minhas Estatísticas</SectionTitle>
            <StatisticsGrid>
              <StatisticsCard
                title="Consultas Totais"
                value={statistics.totalAppointments ?? 0}
                color={theme.colors.primary}
                subtitle="Todas as minhas consultas"
              />
              <StatisticsCard
                title="Confirmadas"
                value={statistics.confirmedAppointments ?? 0}
                color={theme.colors.success}
                subtitle={`${(statistics.statusPercentages?.confirmed ?? 0).toFixed(1)}% do total`}
              />
              <StatisticsCard
                title="Pendentes"
                value={statistics.pendingAppointments ?? 0}
                color={theme.colors.warning}
                subtitle={`${(statistics.statusPercentages?.pending ?? 0).toFixed(1)}% do total`}
              />
              <StatisticsCard
                title="Pacientes Atendidos"
                value={statistics.totalPatients ?? 0}
                color={theme.colors.secondary}
                subtitle="Pacientes únicos"
              />
            </StatisticsGrid>
          </>
        )}
 
        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            onEdit={(appt) => handleOpenModal(appt, 'confirm')}
            onDelete={(apptId) => {
                const appt = appointments.find(a => a.id === apptId);
                if (appt) handleOpenModal(appt, 'cancel');
            }}
            />
          ))
        )}
 
        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
        {selectedAppointment && (
          <AppointmentActionModal
            visible={modalVisible}
            onClose={handleCloseModal}
            onConfirm={handleConfirmAction}
            actionType={actionType}
            appointmentDetails={{
              patientName: selectedAppointment.patientName,
              doctorName: selectedAppointment.doctorName,
              date: selectedAppointment.date,
              time: selectedAppointment.time,
              specialty: selectedAppointment.specialty,
            }}
          />
        )}
      </ScrollView>
    </Container>
  );
};
 
export default DoctorDashboardScreen;