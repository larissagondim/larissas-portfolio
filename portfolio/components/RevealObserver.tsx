"use client";

import { useLayoutEffect } from "react";

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 5;

// Revela elementos [data-reveal] uma única vez ao entrarem na tela.
// Sem JS (ou com reduced-motion) nada é ocultado: o CSS só esconde sob html[data-reveal="ready"].
export default function RevealObserver() {
  useLayoutEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // O que já está visível aparece sem animação, antes da primeira pintura.
    for (const el of elements) {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) el.dataset.revealed = "";
    }
    root.dataset.reveal = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const el = entry.target as HTMLElement;
            el.style.setProperty("--reveal-delay", `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
            el.dataset.revealed = "";
            observer.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    elements.filter((el) => !("revealed" in el.dataset)).forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
