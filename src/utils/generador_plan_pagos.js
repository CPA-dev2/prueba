export default function generadorPlanPagos(total, plan, fechas) {
  let cuota = total / plan.cuotas;
  if (plan.periodo !== undefined && plan.periodo.toLowerCase() !== 'diario') {
    cuota = Math.ceil(cuota);
  }
  const listadoPagos = [];
  for (let x = 0; x <= plan.cuotas; x++) {
    let saldo = total - (x * cuota);
    let cuotaPago = cuota;

    if (saldo < 0) {
      cuotaPago = cuota - Math.abs(saldo);
      cuotaPago = cuotaPago > 0 ? cuotaPago : 0;
      saldo = 0;
    }

    listadoPagos.push({
      numero: x,
      fecha: fechas[x],
      cuota: cuotaPago,
      saldo,
    });
  }
  return listadoPagos;
}
