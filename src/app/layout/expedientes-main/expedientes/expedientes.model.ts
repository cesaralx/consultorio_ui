export class ExpedientesModel {
    _id: string = null;
    paciente_id: string;
    motivo_consulta: {type: String, required: true};
    Ante_familiares: {} = {
      hipertension: null,
      cancer: null,
      diabetes: null,
      otros: null,
    };
    Ante_no_patologicos: {} = {
      vacunas_res: null,
      escolaridad: null,
      grupo_rh: null,
      seguro_social: null,
    };
    Ante_fam_pato: {} = {
      cirugias: null,
      transfuciones: {
        transfucion: null,
        motivo: null,
      },
      fracturas: null,
      hospitalizaciones: null,
      fumar: {
        fuma: null,
        cantidad: null,
      },
      alcohol: null,
      alergias: {
        alergia: null,
        efecto: null,
      },
      patologias_cronicas_degenerativas: null,
    };
    antecedentes_gineco_obst: {} = {
      Menarca: null,
      remove: null,
      eumenorreica: null,
      dismenorreica: null,
      ivsa: null,
      parejas_exuales: null,
      mdf_tipo: null,
      tiempo_de_uso: null,
      causas_descontinuo: null,
      g: null,
      p: null,
      c: null,
      a: null,
      ffp: null,
      fup: null
    };
    colonia: String;
    celular: String;
    email: {type: String, lowercase: true, required: true};
    consultorio_alta: string;
    consultorio_update: string;
    status: {type: String, enum: ['enabled', 'disabled'], default: 'enabled'};
    usuario_alta: string;
    usuario_mod: string;
    fecha_alta: Date;
    namePaciente: String;

}

export class ConsulModel {
  nombre: string;
  _id: string;
}

export class PasModel {
  nombre: String;
  _id: String;
  email: {type: String, lowercase: true, required: true};
  telefono: String;
}

