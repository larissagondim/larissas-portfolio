import GithubActivity from "@/components/github-activity";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/Projects";
import { ExperienceList } from "@/components/Experience";
import { EducationList } from "@/components/Education";
import { SkillsList } from "@/components/Skills";
import RevealObserver from "@/components/RevealObserver";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

const contacts = [
  { label: "email", href: "mailto:gondimvilasboaslarissa@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/larissa-vilasboas-gondim-332320374" },
  { label: "github", href: "https://github.com/larissagondim" },
];

// Converte "[texto](url)" em links.
function renderLinks(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="underline">
        {m[1]}
      </a>
    ) : (
      part
    );
  });
}

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const currentLocale = locale === "en" ? "en" : "pt";
  const messages = currentLocale === "en" ? enMessages : ptMessages;
  const { Nav } = messages;

  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-4xl flex-col gap-section px-4 pb-24 pt-28">
        <Hero />
        <div data-reveal>
          <GithubActivity />
        </div>

        <Section id="sobre" title={Nav.about}>
          <p data-reveal className="leading-relaxed text-muted">{renderLinks(messages.About.description)}</p>
        </Section>

        <Section id="projetos" title={Nav.projects}>
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {messages.Projects.map((project) => (
              <div key={project.id} data-reveal className="flex">
                <ProjectCard project={project} labels={messages.Labels} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="habilidades" title={Nav.skills}>
          <SkillsList categories={messages.Skills.categories} />
        </Section>

        <Section id="experiencia" title={Nav.experience}>
          <ExperienceList locale={currentLocale} />
        </Section>

        <Section id="educacao" title={Nav.education}>
          <EducationList educations={messages.Education} />
        </Section>

        <Section id="contato" title={Nav.contact}>
          <p data-reveal className="text-sm text-muted">{messages.Contact.text}</p>
          <ul data-reveal className="flex flex-wrap gap-6 text-sm font-medium">
            {contacts.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <RevealObserver />
    </>
  );
}
