export class CitaModel {
    _id: string;
    id_paciente: string = '';
    id_consultorio: string = '';
    id_usuario: string;
    fecha: Date;
    fecha_update: Date;
    status: string = 'nueva';
    costo: string;
    extra: string;
}

export class PacientModel {
    _id: string;
    nombre: string;
}
