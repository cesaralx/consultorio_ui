


export class VisitaModel {
    _id: string;
    id_paciente: string = '';
    nombrePaciente: string;
    id_cita: string = '';
    nombreCita: string= '';
    id_consultorio: string= '';
    nombreConsultorio: string= '';
    id_usuario: string;
    nombreUsuario: string= '';
    fecha: Date;
    anexos: any[];
    receta: {
        medicamento: string
    };
    motivo: string;
}