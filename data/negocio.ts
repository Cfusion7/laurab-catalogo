/**
 * DATOS DEL NEGOCIO — Laura B
 * ---------------------------------------------------------------
 * Para cambiar el WhatsApp, Instagram, dirección u horario,
 * edita solo los valores entre comillas de este archivo.
 */

export const negocio = {
  nombre: "Laura B",

  /** Eslogan corto que sale en la portada */
  eslogan: "Moda para lucirte, al detal y por mayor.",

  /**
   * Número que recibe los pedidos: SOLO números, con código de país,
   * sin +, espacios ni guiones. Ejemplo Colombia: "573001234567"
   * PENDIENTE: poner el número real.
   */
  whatsapp: "573000000000",

  /** Instagram (sin @) */
  instagram: "laurabestilosdecoleccion",

  /** Dirección de la boutique. Si se deja vacía, no se muestra en la web. */
  direccion: "",
  /** Enlace de Google Maps de la dirección (opcional) */
  mapsUrl: "",

  /** Horario de atención. Si se deja vacío, no se muestra. */
  horario: "",

  /** Desde cuántas prendas (surtidas) aplica el precio mayorista */
  minimoMayorista: 6,

  /** Transportadoras con las que se despacha */
  transportadoras: "Envía y Coordinadora",
};

/** Políticas tomadas del catálogo 2026 */
export const politicas = [
  {
    titulo: "Pregunta la disponibilidad antes de pagar",
    texto:
      "Te confirmamos por WhatsApp que tu prenda y color estén disponibles antes de que pagues.",
  },
  {
    titulo: "Envío según la transportadora",
    texto:
      "El valor del envío depende del peso del paquete y la distancia. Te lo confirmamos cuando la transportadora lo cotiza.",
  },
  {
    titulo: "Contra entrega solo para mayoristas",
    texto:
      "Desde 6 prendas: pagas el 30% para confirmar y el 70% más el envío al recibir, por Envía o Coordinadora.",
  },
  {
    titulo: "Sin cambios ni devoluciones de dinero",
    texto:
      "Si una prenda llega con un desperfecto de fábrica, repórtalo en las primeras 24 horas con foto o video del paquete sin abrir.",
  },
];
