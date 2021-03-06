export interface Institucion {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  web: string;
  tipoActividad: string;
  actividad: string;
}

export interface Beneficiario {
  nombre: string;
  nif: string;
  esPyme: boolean;
  lote: string;
  coste: number;
  descripcion: string;
}

export interface DetallesDeContrato {
  institucion: Institucion;
  beneficiarios: Beneficiario[];
  descripcion: string;
}

export interface Contrato {
  contratoId: string;
  fechaPub: string;
  titulo: string;
  urlPdf: string;
  detalles: DetallesDeContrato;
}

export const constuirInstitucion = ({
  tipoActividad = '',
  actividad = '',
  nombre = '',
  nif = '',
  email = '',
  telefono = '',
  web = '',
}: Partial<Institucion>): Institucion => ({
  actividad,
  tipoActividad,
  nombre,
  nif,
  email,
  telefono,
  web,
});

export const construirBeneficiario = ({
  nif = '',
  nombre = '',
  coste = 0,
  esPyme = false,
  descripcion = '',
  lote = '',
}: Partial<Beneficiario>): Beneficiario => ({
  nif,
  nombre,
  coste,
  esPyme,
  lote,
  descripcion,
});

export const construirDetallesDeContrato = ({
  beneficiarios = [],
  descripcion = '',
  institucion = constuirInstitucion({}),
}: Partial<DetallesDeContrato>): DetallesDeContrato => ({
  beneficiarios,
  descripcion,
  institucion,
});

export const construirContrato = ({
  detalles = construirDetallesDeContrato({}),
  fechaPub = '',
  contratoId = '',
  titulo = '',
  urlPdf = '',
}: Partial<Contrato>): Contrato => ({
  detalles,
  contratoId,
  fechaPub,
  titulo,
  urlPdf,
});
