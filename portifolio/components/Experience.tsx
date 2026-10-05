import { formatPeriod, sortedExperiences } from "@/data/experience";

export function ExperienceList({ locale }: { locale: "pt" | "en" }) {
  return (
    <ol className="flex flex-col gap-10">
      {sortedExperiences.map((exp) => (
        <li key={exp.id}>
          <h3 className="text-sm text-muted lowercase">{exp.organization[locale]}</h3>
          <ol className="mt-4 flex flex-col gap-5 border-l border-line pl-5">
            {exp.roles.map((role) => (
              <li key={role.start} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[25px] top-1.5 size-2 rounded-full ${
                    role.end ? "bg-line" : "bg-accent"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                  <p className="font-medium lowercase">{role.title[locale]}</p>
                  <p className="text-xs text-muted tabular-nums">{formatPeriod(role, locale)}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{role.description[locale]}</p>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
