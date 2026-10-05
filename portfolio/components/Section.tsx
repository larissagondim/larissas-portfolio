interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="flex flex-col gap-6 scroll-mt-24">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
