import { formatDate, DateFormatter } from '@fullcalendar/core';

export class CitaModel {
    _id: string;
    id_paciente: string = '';
    nombrePaciente: string;
    id_consultorio: string = '';
    nombreConsultorio: string=  '';
    id_usuario: string = '';
    fecha: any;
    hour_start: string;
    hour_end: string;
    fecha_update: Date;
    status: String = 'nueva';
    costo: string;
    extra: string;
}

export class PacientModel {
    _id: string;
    nombre: string;
}
