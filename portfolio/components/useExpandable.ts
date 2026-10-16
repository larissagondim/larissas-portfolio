"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Estado de caixa expansível: alterna no clique, fecha ao clicar fora ou com Esc.
export function useExpandable<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  // Clique em qualquer ponto da caixa, exceto links/botões internos e seleção de texto.
  const onBoxClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      if (window.getSelection()?.type === "Range") return;
      toggle();
    },
    [toggle],
  );

  return { ref, open, toggle, onBoxClick };
}
