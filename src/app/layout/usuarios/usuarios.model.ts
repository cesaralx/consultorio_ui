
export class UsuarioModel {
    _id: string = null;
    usuario: {type: string, required: true, unique: true, index: true};
    password: {type: string, required: true};
    nombre: string;
    cargo: string;
    telefono: number;
    nivel: { trype: number};
    email: {type: string, lowercase: true, required: true};
    status: {type: string, enum: ['enabled', 'disabled'], default: 'enabled'};
    especialidad: string;
    image: any;
    fecha_alta: { type: Date};
    fecha_update: { type: Date};
}




