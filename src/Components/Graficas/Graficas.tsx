import React from 'react';
import { Contrato } from '../../Models/contratos.model';
import { totalContratosPorPymes } from '../../utils/calculos.estadisticas';
import { Calendario } from '../Compartido/Calendario/Calendario';
import { Cargando } from '../Compartido/Cargando/Cargando';
import { TarjetaGrafica } from '../TarjetaGrafica/TarjetaGrafica';

interface Props {
  contratos: Contrato[];
  cargando: boolean;
  obtenerContratosPorFecha: (fechaInicio: string, fechaFin?: string) => void;
}

export const Graficas: React.FC<Props> = ({ contratos, cargando, obtenerContratosPorFecha }) => {
  return (
    <React.Fragment>
      <Calendario obtenerContratosPorFecha={obtenerContratosPorFecha} />
      {cargando && <Cargando />}
      <TarjetaGrafica titulo="Presupuesto distribuido en PYMES/No PYMES" fnCalculo={totalContratosPorPymes} contratos={contratos} />
    </React.Fragment>
  );
};
