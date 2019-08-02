
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
    login: {} = {
      usuario: null,
      password: null
      };
    refiere: string;
    status: {type: string, enum: ['enabled', 'disabled'], default: 'enabled'};
    image: any;
    fecha_alta: { type: Date};
    fecha_update: { type: Date};
}




