import { Beneficiario, construirBeneficiario, construirContrato, construirDetallesDeContrato, Contrato } from '../Models/contratos.model';
import { DatosGrafico } from '../Models/datos.model';
import { costeSegunTipoDeEmpresa, gastoTotal, totalContratosPorPymes } from './calculos.estadisticas';

describe('Pruebas de calculos ', () => {
  describe('Costes totales de unos datos graficos', () => {
    it('Retorna el total de todas las categorias de datos de un grafico', () => {
      const total: DatosGrafico = [
        ['Categorías', 'Total por categoría'],
        ['Categoria 1', 10],
        ['Categoria 2', 10],
        ['Categoria 3', 500],
        ['Categoria 4', 50],
      ];

      expect(gastoTotal(total)).toEqual(570);
    });

    it('Retorna el total de todas las categorias de datos de un grafico ignorando los costes que no son digitos o menores a 0', () => {
      const total: any = [
        ['Categorías', 'Total por categoría'],
        ['Categoria 1', '10'],
        ['Categoria 2', -1],
        ['Categoria 3', 'aa'],
        ['Categoria 4', 5],
        ['Categoria 5', 10],
      ];

      expect(gastoTotal(total)).toEqual(15);
    });
  });
  describe('Calculo de empresas pymes', () => {
    const empresas: Beneficiario[] = [
      construirBeneficiario({
        coste: 100,
        esPyme: true,
      }),
      construirBeneficiario({
        coste: 50,
        esPyme: true,
      }),
      construirBeneficiario({
        coste: 10,
        esPyme: false,
      }),
      construirBeneficiario({
        coste: 5,
        esPyme: false,
      }),
      construirBeneficiario({
        coste: 25,
        esPyme: false,
      }),
    ];
    it('Retorna el total gastado en empresas que son pymes', () => {
      expect(costeSegunTipoDeEmpresa(empresas, true)).toEqual(150);
    });
    it('Retorna el total gastado en empresas que no son pymes', () => {
      expect(costeSegunTipoDeEmpresa(empresas, false)).toEqual(25);
    });

    it('Retorna los datos de las empresas con sus costes totales asociados por PYME/NoPyme', () => {
      const contratos: Contrato[] = [
        construirContrato({
          contratoId: 'id-irrelevante1',
          detalles: construirDetallesDeContrato({
            beneficiarios: [...empresas],
          }),
        }),
        construirContrato({
          contratoId: 'id-irrelevante2',
          detalles: construirDetallesDeContrato({
            beneficiarios: [...empresas],
          }),
        }),
      ];

      const resultado: DatosGrafico = [
        ['PYMES/NO PYMES', 'Ingresos totales'],
        ['PYMES', 300],
        ['NO PYMES', 50],
      ];

      expect(totalContratosPorPymes(contratos)).toStrictEqual(resultado);
    });
  });
});