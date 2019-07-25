export class CitaModel {
    _id: string;
    id_paciente: string;
    id_consultorio: string;
    id_usuario: string;
    fecha: Date;
    fecha_update: Date;
    status: {type: String, enum: ['confirmada', 'nueva', 'reagendada', 'cancelada'], default: 'nueva'};
    costo: string;
    extra: string;

}
