interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  shortDescription: string;
  achievements: string[];
}

export function EducationList({ educations }: { educations: EducationItem[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {educations.map((edu) => (
        <li key={edu.id}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
            <p className="font-medium lowercase">{edu.institution}</p>
            <p className="text-xs text-muted">{edu.period}</p>
          </div>
          <p className="text-sm lowercase">{edu.degree}</p>
          <p className="mt-1 text-sm text-muted">{edu.shortDescription}</p>
          <ul className="mt-2 list-disc pl-4 text-sm text-muted space-y-1">
            {edu.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
