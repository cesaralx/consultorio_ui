export class ConsultorioModel {
    _id: string = null;
    nombre: string;
    direccion: string;
    telefono: string;
    status: {type: string, enum: ['enabled', 'disabled'], default: 'enabled'};
    encargado: string;
    horario: string;
    fecha_alta: Date;
    fecha_update: Date;
}

