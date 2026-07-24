"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  className?: string;
};

/**
 * Comparateur interactif avant / après :
 * glisser à la souris, au doigt, ou avec les flèches du clavier.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Avant",
  afterLabel = "Après",
  alt,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/10] touch-none overflow-hidden rounded-2xl border border-border-subtle select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (isDragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
    >
      {/* Image "après" (fond) */}
      <img
        src={afterSrc}
        alt={`${alt} — ${afterLabel}`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Image "avant" (rognée) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — ${beforeLabel}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Étiquettes */}
      <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
        {afterLabel}
      </span>

      {/* Ligne de séparation + poignée */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
        aria-hidden
      />
      <button
        type="button"
        role="slider"
        aria-label="Comparer avant et après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
        style={{ left: `${position}%` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            setPosition((p) => Math.max(0, p - 5));
          } else if (e.key === "ArrowRight") {
            setPosition((p) => Math.min(100, p + 5));
          }
        }}
      >
        <span className="text-lg font-bold" aria-hidden>
          ↔
        </span>
      </button>
    </div>
  );
}
