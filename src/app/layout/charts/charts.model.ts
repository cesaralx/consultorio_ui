
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

export class ConsultorioModel {
    _id: string = null;
    nombre: string;
    direccion: string;
    telefono: string;
    status: {type: string, enum: ['enabled', 'disabled'], default: 'enabled'};
    encargado = '';
    horario: string;
    fecha_alta: Date;
    fecha_update: Date ;
    citas: number;
}

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
    consultorio_id: string;
    consultorio_name: string;
    image: any;
    fecha_alta: { type: Date};
    fecha_update: { type: Date};
}

export class PacienteModel {
    _id: string = null;
    nombre: string;
    edad: { type: number, min: 1, max: 99};
    telefono: number;
    email: {type: string, lowercase: true, required: true, unique: true, index: true};
    fum: string;
    ffp: string;
    estado_civil: string;
    ocupacion: string;
    origen: string;
    municipio: string;
    conyugue: {} = {
      nombre: null,
      ocupacion: null
    };
    refiere: string;
    status: {type: string, enum: ['enabled', 'disabled'], default: 'enabled'};
    image: any;
    fecha_alta: { type: Date};
    fecha_update: { type: Date};
}