import _ from 'lodash';
import moment from 'moment';

export function calcularFechas(periodo) {
  let fechas = [];
  if (periodo === "Quincenal") {
    const dia = moment().format("DD");
    let mes = parseInt(moment().format("MM"));
    let anio = moment().format("YYYY");
    // Si ya se paso del dia 16 genera las dos fechas del proximo mes
    if (dia > 16) {
      if (mes === 12) {
        mes = 1;
        anio = anio + 1;
      } else {
        mes = mes + 1;
      }
      fechas = [
        `01/${mes > 9 ? mes : "0" + mes}/${anio}`,
        `16/${mes > 9 ? mes : "0" + mes}/${anio}`,
      ];
    }
    // Si no a pasado el 16 lo muestra y muestra el primer dia del proximo mes
    if (dia <= 16) {
      if (dia.toString() === "01") {
        fechas = [
          moment().format("DD/MM/YYYY"),
          moment()
            .add(15, "days")
            .format("DD/MM/YYYY"),
        ];
        return fechas;
      }
      const _mes = mes;
      if (mes === 12) {
        mes = 1;
        anio = anio + 1;
      } else {
        mes = mes + 1;
      }
      fechas = [
        `16/${_mes > 9 ? _mes : "0" + _mes}/${anio}`,
        `01/${mes > 9 ? mes : "0" + mes}/${anio}`,
      ];
      return fechas;
    }
  } else if (periodo === "Mensual") {
    //  Nuevo calculo de fechas para mensual
    const hoy = moment();
    const dia = parseInt(hoy.format("DD"));
    const mes_siguiente = moment().add(1, "M");
    const _mes_siguiente = _.cloneDeep(mes_siguiente);
    const dos_mes_siguientes = moment().add(2, "M");
    const ultimo_dia = parseInt(hoy.endOf("month").format("DD"));
    const ultimo_dia_mes_siguiente = parseInt(
      _mes_siguiente.endOf("month").format("DD")
    );

    //La misma fecha un mes despues
    const fecha_mes_siguiente = obtenerFechaHabil(mes_siguiente).format(
      "DD/MM/YYYY"
    );
    //Primer dia del mes
    let fecha_primer_dia = mes_siguiente.startOf("month");
    fecha_primer_dia = obtenerFechaHabil(fecha_primer_dia).format("DD/MM/YYYY");

    //Ultimo dia del mes
    let fecha_ultimo_dia = hoy.endOf("month");
    fecha_ultimo_dia = obtenerFechaHabil(fecha_ultimo_dia).format("DD/MM/YYYY");
    //Quincena del mes
    const quincena = moment(
      `${mes_siguiente.year()}-${mes_siguiente.format("MM")}-15`
    );
    const fecha_quincena = obtenerFechaHabil(quincena).format("DD/MM/YYYY");
    // Primer dia de dos meses en adelante
    let fecha_primer_dia_2_meses = dos_mes_siguientes.startOf("month");
    fecha_primer_dia_2_meses = obtenerFechaHabil(
      fecha_primer_dia_2_meses
    ).format("DD/MM/YYYY");
    // Ultimo dia del mes siguiente
    let fecha_ultimo_dia_siguiente_mes = _mes_siguiente.endOf("month");
    fecha_ultimo_dia_siguiente_mes = obtenerFechaHabil(
      fecha_ultimo_dia_siguiente_mes
    ).format("DD/MM/YYYY");

    /**CASO 1 => EL PRIMER DIA DEL MES**/
    //las fechas son el 1 del siguiente mes o el ultimo día del mismo mes
    if (dia === 1) {
      fechas = [fecha_primer_dia, fecha_ultimo_dia];
    }
    /**CASO 2 => DEL 2 AL 14 DE MES**/
    //las fechas son el 1 del siguiente mes o el ultimo día del mismo mes
    if (dia > 1 && dia < 15) {
      fechas = [fecha_primer_dia, fecha_mes_siguiente, fecha_quincena];
    }
    /**CASO 3 => EL DÍA 15**/
    //la única fecha será el 15 del proximo més
    if (dia === 15) {
      fechas = [fecha_quincena];
    }
    /**CASO 4 => MAYOR A 15 Y NO ES EL ULTIMO DÍA**/
    //las fechas son la quincena, su misma fecha, o el ultimo día del siguiente més
    if (dia > 15 && dia !== ultimo_dia) {
      fechas = [fecha_quincena, fecha_mes_siguiente, fecha_ultimo_dia];
    }

    /**CASO 5 => MAYOR A 15 Y ES EL ULTIMO DÍA**/
    //las fechas son
    if (dia > 15 && dia === ultimo_dia) {
      //Si el siguiente més tiene un día más
      //Ej; dia de hoy = (28,30) y el siguiente més tiene 31
      if (dia < ultimo_dia_mes_siguiente) {
        fechas = [
          fecha_mes_siguiente,
          fecha_quincena,
          fecha_ultimo_dia_siguiente_mes,
        ];
      } else {
        //Es el 31 entonces las fechas son, el ultimo dia del siguiente mes, o el primer día del priximo més
        //Ej: 31/06/2019 entonces fechas son 30/07/2019 y 01/08/2019
        fechas = [fecha_ultimo_dia_siguiente_mes, fecha_primer_dia_2_meses];
      }
    }
  }
  return fechas;
}

function obtenerFechaHabil(fecha) {
  let _fecha = _.cloneDeep(fecha);
  const dia_mes = fecha.day();
  if (dia_mes === 0) {
    // 0 Domingo
    _fecha = _fecha.add(1, "days");
  }
  return _fecha;
}
