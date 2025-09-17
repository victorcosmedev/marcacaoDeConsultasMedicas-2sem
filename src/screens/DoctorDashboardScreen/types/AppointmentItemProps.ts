import { Appointment } from "./Appointment";


export interface AppointmentItemProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
}