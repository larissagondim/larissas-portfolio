"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatPeriod, sortedExperiences, type Role } from "@/data/experience";
import { useExpandable } from "@/components/useExpandable";

function RoleItem({ role, locale }: { role: Role; locale: "pt" | "en" }) {
  const { ref, open, toggle, onBoxClick } = useExpandable<HTMLDivElement>();
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();
  // Só vira caixa interativa se a descrição não couber nas linhas visíveis.
  const [clampable, setClampable] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (!el.hasAttribute("data-open")) setClampable(el.scrollHeight > el.clientHeight + 1);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const interactive = clampable || open;
  const title = <span className="font-medium lowercase">{role.title[locale]}</span>;

  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-[25px] top-3.5 size-2 rounded-full ${role.end ? "bg-line" : "bg-accent"}`}
      />
      <div
        ref={ref}
        onClick={interactive ? onBoxClick : undefined}
        data-open={open || undefined}
        className={`-mx-3 rounded-box border border-transparent px-3 py-2 ${
          interactive ? "interactive-box cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
          {interactive ? (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls={textId}
              className="inline-flex cursor-pointer items-center gap-1 self-start rounded-sm text-left"
            >
              {title}
              <ChevronDown className="chevron size-4 shrink-0 text-muted" aria-hidden />
            </button>
          ) : (
            title
          )}
          <p className="text-xs text-muted tabular-nums">{formatPeriod(role, locale)}</p>
        </div>
        <p
          ref={textRef}
          id={textId}
          data-open={open || undefined}
          data-clampable={clampable || undefined}
          className="clamp-text mt-1 text-sm text-muted"
        >
          {role.description[locale]}
        </p>
      </div>
    </li>
  );
}

export function ExperienceList({ locale }: { locale: "pt" | "en" }) {
  return (
    <ol className="flex flex-col gap-10">
      {sortedExperiences.map((exp) => (
        <li key={exp.id} data-reveal>
          <h3 className="text-sm text-muted lowercase">{exp.organization[locale]}</h3>
          <ol className="mt-4 flex flex-col gap-3 border-l border-line pl-5">
            {exp.roles.map((role) => (
              <RoleItem key={role.start} role={role} locale={locale} />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
