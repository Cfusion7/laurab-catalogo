/**
 * CATÁLOGO — Laura B (versión de prueba con pocas referencias por categoría)
 * ---------------------------------------------------------------
 * Cómo editar:
 *  - Cambiar un precio: edita el número (sin puntos). 55000 = $55.000
 *  - precioMayorista: precio cuando el pedido completo suma 6 o más prendas.
 *  - precioAntes: solo para promociones (se muestra tachado).
 *  - colores: lista de colores disponibles. Si se deja vacía [], la clienta
 *    pregunta el color por WhatsApp.
 *  - foto: ruta dentro de /public. Para cambiar la foto, reemplaza el archivo
 *    en public/fotos/<categoria>/ con el mismo nombre.
 */

export type Categoria = {
  slug: string;
  nombre: string;
  /** Foto de portada de la categoría */
  foto: string;
};

export type Producto = {
  id: string;
  ref: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precioDetal: number;
  precioMayorista?: number;
  precioAntes?: number;
  colores: string[];
  foto: string;
};

export const categorias: Categoria[] = [
  { slug: "promociones", nombre: "Promociones", foto: "/fotos/promociones/944-enterizo-brillantina.jpg" },
  { slug: "bodys", nombre: "Bodys", foto: "/fotos/bodys/2184-body-kendal.jpg" },
  { slug: "conjuntos", nombre: "Conjuntos", foto: "/fotos/conjuntos/946-conjunto.jpg" },
  { slug: "enterizos", nombre: "Enterizos", foto: "/fotos/enterizos/1549-enterizo.jpg" },
  { slug: "inferiores", nombre: "Inferiores", foto: "/fotos/inferiores/1542-pantalon.jpg" },
  { slug: "blusas", nombre: "Blusas y crop tops", foto: "/fotos/blusas/2202-corset-olivia.jpg" },
  { slug: "vestidos", nombre: "Vestidos", foto: "/fotos/vestidos/2200-vestido.jpg" },
  { slug: "lenceria-y-bikinis", nombre: "Lencería y bikinis", foto: "/fotos/lenceria-y-bikinis/146-vestido-de-bano.jpg" },
];

export const productos: Producto[] = [
  // ───────────── PROMOCIONES ─────────────
  {
    id: "756br",
    ref: "756BR",
    nombre: "Enterizo brillantina",
    categoria: "promociones",
    descripcion: "Polilicra brillantina, colección premium. Talla única.",
    precioDetal: 30000,
    precioAntes: 60000,
    colores: ["Negro"],
    foto: "/fotos/promociones/756br-enterizo-brillantina.jpg",
  },
  {
    id: "944",
    ref: "944",
    nombre: "Enterizo brillantina",
    categoria: "promociones",
    descripcion: "Polilicra brillantina, colección premium. Talla única.",
    precioDetal: 30000,
    precioAntes: 60000,
    colores: ["Chocolate", "Negro", "Blanco"],
    foto: "/fotos/promociones/944-enterizo-brillantina.jpg",
  },
  {
    id: "25",
    ref: "25",
    nombre: "Blusa Aurora",
    categoria: "promociones",
    descripcion: "Acetato licrado, doble forro. Talla única.",
    precioDetal: 15000,
    precioMayorista: 7000,
    colores: [],
    foto: "/fotos/promociones/25-blusa-aurora.jpg",
  },

  // ───────────── BODYS ─────────────
  {
    id: "2184",
    ref: "2184",
    nombre: "Body Kendal",
    categoria: "bodys",
    descripcion: "Acetato y malla. Talla única.",
    precioDetal: 55000,
    precioMayorista: 34000,
    colores: [],
    foto: "/fotos/bodys/2184-body-kendal.jpg",
  },
  {
    id: "2183",
    ref: "2183",
    nombre: "Body Zamora",
    categoria: "bodys",
    descripcion: "Acetato. Talla única.",
    precioDetal: 65000,
    precioMayorista: 37000,
    colores: [],
    foto: "/fotos/bodys/2183-body-zamora.jpg",
  },
  {
    id: "2164",
    ref: "2164",
    nombre: "Body Grill",
    categoria: "bodys",
    descripcion: "Acetato. Talla única.",
    precioDetal: 55000,
    precioMayorista: 35000,
    colores: [],
    foto: "/fotos/bodys/2164-body-grill.jpg",
  },

  // ───────────── CONJUNTOS ─────────────
  {
    id: "946",
    ref: "946",
    nombre: "Conjunto 946",
    categoria: "conjuntos",
    descripcion: "Suplex, trae short. Talla única.",
    precioDetal: 60000,
    precioMayorista: 35000,
    colores: [],
    foto: "/fotos/conjuntos/946-conjunto.jpg",
  },
  {
    id: "1410",
    ref: "1410",
    nombre: "Conjunto 1410",
    categoria: "conjuntos",
    descripcion: "Acetato licrado, la falda trae short. Talla única.",
    precioDetal: 50000,
    precioMayorista: 32000,
    colores: [],
    foto: "/fotos/conjuntos/1410-conjunto.jpg",
  },

  // ───────────── ENTERIZOS ─────────────
  {
    id: "1269",
    ref: "1269",
    nombre: "Enterizo 1269",
    categoria: "enterizos",
    descripcion: "Acetato con efecto push up. Talla única.",
    precioDetal: 45000,
    precioMayorista: 27000,
    colores: [],
    foto: "/fotos/enterizos/1269-enterizo.jpg",
  },
  {
    id: "1549",
    ref: "1549",
    nombre: "Enterizo 1549",
    categoria: "enterizos",
    descripcion: "Suplex. Talla única.",
    precioDetal: 65000,
    precioMayorista: 42000,
    colores: [],
    foto: "/fotos/enterizos/1549-enterizo.jpg",
  },
  {
    id: "1350",
    ref: "1350",
    nombre: "Enterizo 1350",
    categoria: "enterizos",
    descripcion: "Suplex. Talla única.",
    precioDetal: 55000,
    precioMayorista: 35000,
    colores: [],
    foto: "/fotos/enterizos/1350-enterizo.jpg",
  },

  // ───────────── INFERIORES ─────────────
  {
    id: "1542",
    ref: "1542",
    nombre: "Pantalón brillantina",
    categoria: "inferiores",
    descripcion: "Acetato brillantina. Talla única.",
    precioDetal: 55000,
    precioMayorista: 35000,
    colores: ["Negro", "Rojo"],
    foto: "/fotos/inferiores/1542-pantalon.jpg",
  },
  {
    id: "266",
    ref: "266",
    nombre: "Pantaloneta",
    categoria: "inferiores",
    descripcion: "Tela burda. Talla única.",
    precioDetal: 40000,
    precioMayorista: 20000,
    colores: [],
    foto: "/fotos/inferiores/266-pantaloneta.jpg",
  },
  {
    id: "264",
    ref: "264",
    nombre: "Sudadera Stanly",
    categoria: "inferiores",
    descripcion: "Burda gruesa. Los cordones no traen punteras. Talla única.",
    precioDetal: 45000,
    precioMayorista: 25000,
    colores: [],
    foto: "/fotos/inferiores/264-sudadera-stanly.jpg",
  },

  // ───────────── BLUSAS Y CROP TOPS ─────────────
  {
    id: "2202",
    ref: "2202",
    nombre: "Corset Olivia",
    categoria: "blusas",
    descripcion: "Acetato y malla, tiras graduables. Talla única.",
    precioDetal: 60000,
    precioMayorista: 35000,
    colores: [],
    foto: "/fotos/blusas/2202-corset-olivia.jpg",
  },
  {
    id: "2145",
    ref: "2145",
    nombre: "Crop top Júpiter",
    categoria: "blusas",
    descripcion: "Acetato y malla. Talla única.",
    precioDetal: 55000,
    precioMayorista: 32000,
    colores: [],
    foto: "/fotos/blusas/2145-crop-top-jupiter.jpg",
  },
  {
    id: "1487",
    ref: "1487",
    nombre: "Blusa 1487",
    categoria: "blusas",
    descripcion: "Algodón. Talla única.",
    precioDetal: 45000,
    precioMayorista: 22000,
    colores: [],
    foto: "/fotos/blusas/1487-blusa.jpg",
  },

  // ───────────── VESTIDOS ─────────────
  {
    id: "1209",
    ref: "1209",
    nombre: "Vestido 1209",
    categoria: "vestidos",
    descripcion: "Acetato licrado. Talla única.",
    precioDetal: 55000,
    precioMayorista: 35000,
    colores: [],
    foto: "/fotos/vestidos/1209-vestido.jpg",
  },
  {
    id: "1336",
    ref: "1336",
    nombre: "Vestido 1336",
    categoria: "vestidos",
    descripcion: "Acetato licrado. Talla única.",
    precioDetal: 55000,
    precioMayorista: 32000,
    colores: [],
    foto: "/fotos/vestidos/1336-vestido.jpg",
  },
  {
    id: "2200",
    ref: "2200",
    nombre: "Vestido 2200",
    categoria: "vestidos",
    descripcion: "Acetato licrado brillante, trae copa. Talla única.",
    precioDetal: 65000,
    precioMayorista: 45000,
    colores: [],
    foto: "/fotos/vestidos/2200-vestido.jpg",
  },

  // ───────────── LENCERÍA Y BIKINIS ─────────────
  {
    id: "146",
    ref: "146",
    nombre: "Vestido de baño 146",
    categoria: "lenceria-y-bikinis",
    descripcion: "Acetato licrado. Talla única.",
    precioDetal: 40000,
    precioMayorista: 18000,
    colores: [],
    foto: "/fotos/lenceria-y-bikinis/146-vestido-de-bano.jpg",
  },
  {
    id: "2405",
    ref: "2405",
    nombre: "Vestido de baño 2405",
    categoria: "lenceria-y-bikinis",
    descripcion: "Acetato licrado, doble forro. Talla única.",
    precioDetal: 40000,
    precioMayorista: 18000,
    colores: [],
    foto: "/fotos/lenceria-y-bikinis/2405-vestido-de-bano.jpg",
  },
];

export const productosDe = (slug: string) => productos.filter((p) => p.categoria === slug);
export const categoriaPorSlug = (slug: string) => categorias.find((c) => c.slug === slug);
export const productoPorId = (id: string) => productos.find((p) => p.id === id);
