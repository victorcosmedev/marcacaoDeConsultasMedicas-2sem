import { useState } from "react";
import { Appointment } from "../../../types/appointments";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { DoctorDashboardScreenProps } from "./../types/DoctorDashboardScreenProps";
import { Statistics } from "../../../services/statistics";

export function useDoctorDashboardScreen(){
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [actionType, setActionType] = useState<'confirm' | 'cancel'>('confirm');
    const { user, signOut } = useAuth();
    const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState<Partial<Statistics> | null>(null);

    return {
        modalVisible, setModalVisible,
        selectedAppointment, setSelectedAppointment,
        actionType, setActionType,
        user, signOut,
        navigation,
        appointments, setAppointments,
        loading, setLoading,
        statistics, setStatistics
    }
}