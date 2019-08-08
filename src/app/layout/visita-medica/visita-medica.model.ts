


export class VisitaModel {
    _id: string;
    id_paciente: string = '';
    nombrePaciente: string;
    id_cita: string = '';
    nombreCita: string = '';
    id_consultorio: string = '';
    nombreConsultorio: string = '';
    id_usuario: string;
    nombreUsuario: string = '';
    fecha: Date;
    anexos: any[] = [];
    filenames: string[] = [];
    tipoFile: string[] = [];
    receta: {} = {
        medicamento: null
    };
    motivo: string;
}