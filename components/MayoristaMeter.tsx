import { negocio } from "@/data/negocio";

/**
 * Seis círculos (uno por prenda) que se llenan hasta llegar al precio mayorista.
 * Es el mismo recurso en la portada (ilustrativo) y en el carrito (en vivo).
 */
export default function MayoristaMeter({ unidades, tam = "md" }: { unidades: number; tam?: "sm" | "md" | "lg" }) {
  const total = negocio.minimoMayorista;
  const size = tam === "lg" ? "h-9 w-9 sm:h-11 sm:w-11" : tam === "sm" ? "h-3 w-3" : "h-5 w-5";
  const gap = tam === "lg" ? "gap-2 sm:gap-3" : tam === "sm" ? "gap-1" : "gap-1.5";
  return (
    <div className={`flex ${gap}`} role="img" aria-label={`${Math.min(unidades, total)} de ${total} prendas`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`${size} rounded-full border transition-colors duration-300 ${
            i < unidades ? "border-fucsia bg-fucsia" : "border-tinta/25 bg-white"
          }`}
        />
      ))}
    </div>
  );
}
