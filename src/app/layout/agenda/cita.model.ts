export class CitaModel {
    _id: string;
    id_paciente: '';
    id_consultorio: '';
    id_usuario: string;
    fecha: Date;
    fecha_update: Date;
    status: {type: String, enum: ['confirmada', 'nueva', 'reagendada', 'cancelada'], default: 'nueva'};
    costo: string;
    extra: string;
}

export class PacientModel {
    _id: string;
    nombre: string;
}
