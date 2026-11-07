interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

// Título numa coluna lateral que acompanha a leitura; o conteúdo ocupa o resto.
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="grid scroll-mt-header gap-6 border-t border-line pt-8 md:grid-cols-[9rem_1fr] md:gap-12">
      <h2 data-reveal className="md:sticky md:top-24 md:self-start">
        {title}
      </h2>
      <div className="flex min-w-0 flex-col gap-8">{children}</div>
    </section>
  );
}
