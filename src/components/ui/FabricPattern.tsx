/** Textura sutil inspirada em trama de tecido, usada nas artes padrão da marca. */
export function FabricPattern({ id, className = '', opacity = 0.35 }: { id: string; className?: string; opacity?: number }) {
  return (
    <svg aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 7h14" stroke="currentColor" strokeWidth="0.6" />
          <path d="M7 0v14" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
