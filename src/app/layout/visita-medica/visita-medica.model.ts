
import {Buffer} from 'buffer';

export class VisitaModel {
    _id: string;
    id_paciente: string = '';
    id_cita: string = '';
    id_usuario: string;
    fecha: Date;
    // anexos: Buffer = require('buffer/').Buffer;
    receta: {
        medicamento: string
    }
}