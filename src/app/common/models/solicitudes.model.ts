export interface GrupoFamiliar {
  id?: number;
  numero: number;
  nombre: string;
  apellido: string;
  cedula: string;
  fecha_nac: Date | string;
  parentesco: string;
  escolaridad: string;
  ingreso_mensual: number;
  ocupacion_observaciones: string;
  edad: number;
}

export interface InstrumentoSocial {
  id?: number;
  coordenadas?: string;
  fecha: Date | string;
  nombres_apellidos: string;
  ci: string;
  estado_civil: string;
  sexo: string;
  fecha_nac: Date | string;
  edad: number;
  direccion_vivienda: string;
  municipio_parroquia: string;
  tipo_solicitud: string;
  telefono: string;
  tenencia_vivienda: string;
  integrantes_grupo_familiar: number;
  tipo_familia: string;
  condiciones_vivienda: string;
  ocupacion_jefe: string;
  nivel_instruccion: string;
  ingreso_mensual_cestatikes: number;
  otros_ingresos?: string;
  integrantes_trabajan: number;
  ingreso_mensual_hogar: number;
  personas_discapacidad: number;
  adultos_mayores: number;
  paga_alquiler: boolean;
  monto_alquiler?: number;
  menores_grupo_familiar: number;
  direccion_trabajo_jefe?: string;
  registro_fonhvim: boolean;
  fecha_registro?: Date | string;
  inscrito_faov_favv: boolean;
  grupo_familiar: GrupoFamiliar[];
  observaciones?: string;
  firma_encuestado?: string;
  articulador_social?: string;
}

export const TIPOS_SOLICITUD = [
  'Construcción de Vivienda',
  'Mejoramiento de Vivienda',
  'Sustitución de Ranchos',
  'Asistencia Técnica',
  'Regularización de Tenencia',
  'Gestión Social',
];
