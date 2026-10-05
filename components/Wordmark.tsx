/** Nombre de marca: "Laura" en negro y la "B" en fucsia, como el logo */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display whitespace-nowrap ${className}`}>
      Laura<span className="text-fucsia"> B</span>
    </span>
  );
}
