"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { key: "about", href: "#sobre" },
  { key: "projects", href: "#projetos" },
  { key: "skills", href: "#habilidades" },
  { key: "experience", href: "#experiencia" },
  { key: "education", href: "#educacao" },
  { key: "contact", href: "#contato" },
] as const;

// Seção mais próxima do centro da tela, para realçar o link correspondente.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-md backdrop-saturate-150">
      <nav
        aria-label="principal"
        className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3"
      >
        <a href="#" className="text-sm font-semibold lowercase">
          larissa gondim
        </a>

        <ul className="hidden items-center gap-4 sm:flex">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                aria-current={active === href.slice(1) ? "true" : undefined}
                className="nav-link text-sm text-muted lowercase aria-[current]:text-fg"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle label={t("theme")} />
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: locale === "pt" ? "en" : "pt" })}
            className="cursor-pointer rounded-sm text-sm font-medium lowercase hover:text-accent"
          >
            {locale === "pt" ? "en" : "pt"}
          </button>
        </div>
      </nav>
    </header>
  );
}
