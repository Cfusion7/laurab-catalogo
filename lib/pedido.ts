import { negocio } from "@/data/negocio";
import { productoPorId, type Producto } from "@/data/productos";

export type LineaCarrito = {
  /** id del producto + color, para no mezclar colores distintos */
  clave: string;
  productoId: string;
  color?: string;
  cantidad: number;
};

export type LineaCalculada = LineaCarrito & {
  producto: Producto;
  precioUnitario: number;
  subtotal: number;
  /** cuánto se ahorra esta línea por precio mayorista */
  ahorro: number;
};

export const cop = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });

export const claveDe = (productoId: string, color?: string) =>
  color ? `${productoId}__${color}` : productoId;

export function calcularPedido(lineas: LineaCarrito[]) {
  const unidades = lineas.reduce((s, l) => s + l.cantidad, 0);
  const esMayorista = unidades >= negocio.minimoMayorista;

  const calculadas: LineaCalculada[] = [];
  for (const l of lineas) {
    const producto = productoPorId(l.productoId);
    if (!producto) continue;
    const mayor = producto.precioMayorista ?? producto.precioDetal;
    const precioUnitario = esMayorista ? mayor : producto.precioDetal;
    calculadas.push({
      ...l,
      producto,
      precioUnitario,
      subtotal: precioUnitario * l.cantidad,
      ahorro: (producto.precioDetal - precioUnitario) * l.cantidad,
    });
  }

  const total = calculadas.reduce((s, l) => s + l.subtotal, 0);
  const ahorro = calculadas.reduce((s, l) => s + l.ahorro, 0);
  // Lo que se ahorraría si llegara al mínimo mayorista con lo que ya tiene
  const ahorroPotencial = calculadas.reduce(
    (s, l) =>
      s + (l.producto.precioDetal - (l.producto.precioMayorista ?? l.producto.precioDetal)) * l.cantidad,
    0,
  );
  const faltan = Math.max(0, negocio.minimoMayorista - unidades);

  return { lineas: calculadas, unidades, esMayorista, total, ahorro, ahorroPotencial, faltan };
}

export type DatosCliente = {
  nombre: string;
  ciudad: string;
  entrega: "envio" | "recoger";
  direccion: string;
  pago: "anticipado" | "contraentrega";
  nota: string;
};

export function mensajeWhatsApp(lineas: LineaCarrito[], datos: DatosCliente) {
  const p = calcularPedido(lineas);
  const items = p.lineas
    .map((l) => {
      const detalle = [`Ref. ${l.producto.ref}`, l.color ?? "color por confirmar"].join(", ");
      return `• ${l.producto.nombre} (${detalle}) — Cantidad: ${l.cantidad} — ${cop(l.subtotal)}`;
    })
    .join("\n");

  const entrega =
    datos.entrega === "envio" ? `Envío por transportadora` : "Recoger en la boutique";
  const pago =
    datos.pago === "contraentrega" && p.esMayorista
      ? "Contra entrega (30% para confirmar)"
      : "Pago anticipado";

  const lineasTexto = [
    `Hola ${negocio.nombre}, quiero hacer el siguiente pedido:`,
    "",
    items,
    "",
    `Precio: ${p.esMayorista ? `mayorista (${p.unidades} prendas)` : "al detal"}`,
    `Total estimado: ${cop(p.total)} + envío`,
    "",
    `Nombre: ${datos.nombre || "—"}`,
    `Ciudad: ${datos.ciudad || "—"}`,
    `Entrega: ${entrega}`,
    datos.entrega === "envio" ? `Dirección: ${datos.direccion || "—"}` : null,
    `Pago: ${pago}`,
    datos.nota ? `Nota: ${datos.nota}` : null,
    "",
    "¿Me confirman la disponibilidad? ¡Gracias!",
  ].filter((x) => x !== null);

  return lineasTexto.join("\n");
}

export const enlaceWhatsApp = (texto: string) =>
  `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
