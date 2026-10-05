interface SkillCategory {
  name: string;
  items: string[];
}

export function SkillsList({ categories }: { categories: SkillCategory[] }) {
  return (
    <dl className="grid gap-6 md:grid-cols-2">
      {categories.map((c) => (
        <div key={c.name}>
          <dt className="text-sm font-medium lowercase">{c.name}</dt>
          <dd className="mt-1 text-sm text-muted">{c.items.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
