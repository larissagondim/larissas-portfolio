"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const navLinks = [
  { key: "about", href: "#sobre" },
  { key: "projects", href: "#projetos" },
  { key: "skills", href: "#habilidades" },
  { key: "experience", href: "#experiencia" },
  { key: "education", href: "#educacao" },
  { key: "contact", href: "#contato" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
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
              <a href={href} className="text-sm text-muted lowercase">
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => router.replace(pathname, { locale: locale === "pt" ? "en" : "pt" })}
          className="cursor-pointer text-sm font-medium lowercase hover:text-accent"
        >
          {locale === "pt" ? "en" : "pt"}
        </button>
      </nav>
    </header>
  );
}
