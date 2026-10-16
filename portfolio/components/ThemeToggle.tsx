"use client";

import { Moon, Sun } from "lucide-react";

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // sem armazenamento disponível: a escolha vale só para esta visita
  }
}

// Os ícones trocam via CSS (variante dark:), então o servidor e o cliente renderizam o mesmo HTML.
export default function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-box text-muted transition-colors duration-(--duration-fast) hover:text-fg"
    >
      <Moon className="size-4 dark:hidden" aria-hidden />
      <Sun className="hidden size-4 dark:block" aria-hidden />
    </button>
  );
}
