interface SkillCategory {
  name: string;
  items: string[];
}

export function SkillsList({ categories }: { categories: SkillCategory[] }) {
  return (
    <dl className="flex flex-col">
      {categories.map((c) => (
        <div key={c.name} data-reveal className="grid gap-1 border-t border-line py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="text-sm font-bold lowercase">{c.name}</dt>
          <dd className="text-sm text-muted">{c.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
