import { useId, useRef, useState, type PointerEvent } from 'react';
import { MoveHorizontal, ImageOff } from 'lucide-react';

type Props = { before: string; after: string; title: string; initial?: number };

export function BeforeAfter({ before, after, title, initial = 50 }: Props) {
  const [pos, setPos] = useState(initial);
  const [failed, setFailed] = useState(false);
  const id = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromPointer = (e: PointerEvent) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.round(Math.min(100, Math.max(0, pct))));
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e);
  };
  const onPointerMove = (e: PointerEvent) => dragging.current && setFromPointer(e);
  const stop = () => (dragging.current = false);

  if (failed) {
    return (
      <div role="status" className="grid aspect-[4/3] w-full place-items-center rounded-[1.75rem] bg-mist-100 p-8 text-center text-navy/70">
        <div>
          <ImageOff className="mx-auto mb-3 h-8 w-8 text-navy/40" aria-hidden="true" />
          <p className="text-sm">Não foi possível carregar as imagens deste resultado.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      style={{ touchAction: 'pan-y' }}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-[1.75rem] bg-mist-100 shadow-lift"
    >
      <img
        src={after}
        alt={`${title}: depois da higienização`}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
      <img
        src={before}
        alt={`${title}: antes da higienização`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy backdrop-blur">
        Depois
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(10,31,68,.08)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift ring-1 ring-gold/40">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Arraste para comparar antes e depois: {title}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% da imagem de antes visível`}
        className="ba-range pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
