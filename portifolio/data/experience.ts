// Fonte única das experiências. Para atualizar o site, edite só este arquivo.
// Datas: "AAAA-MM"; `end` ausente = em andamento.
// A ordem não importa: organizações e cargos são ordenados do mais recente para o mais antigo.

type Text = { pt: string; en: string };

export interface Role {
  title: Text;
  start: string;
  end?: string;
  description: Text;
}

export interface Experience {
  id: string;
  organization: Text;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    id: "tail",
    organization: {
      pt: "tail · liga de tecnologia e inteligência artificial (ufpb)",
      en: "tail · technology and artificial intelligence league (ufpb)",
    },
    roles: [
      {
        title: { pt: "pesquisadora em nlp", en: "nlp researcher" },
        start: "2026-08",
        description: {
          pt: "pesquisa em armazenamento e estruturação do conteúdo de danfes em html com modelos de visão e linguagem (vlms).",
          en: "research on storing and structuring DANFE content as html using vision-language models (vlms).",
        },
      },
      {
        title: { pt: "trainee em inteligência artificial", en: "artificial intelligence trainee" },
        start: "2025-12",
        end: "2026-07",
        description: {
          pt: "trilha de ciência de dados e ia; projeto pauta com web scraping, nlp, embeddings bert e autoencoders.",
          en: "data science and ai track; pauta project with web scraping, nlp, bert embeddings and autoencoders.",
        },
      },
    ],
  },
  {
    id: "aria",
    organization: {
      pt: "aria · laboratório de aplicações em inteligência artificial",
      en: "aria · artificial intelligence applications lab",
    },
    roles: [
      {
        title: { pt: "pesquisadora em visão computacional", en: "computer vision researcher" },
        start: "2026-10",
        description: {
          pt: "pesquisa em visão computacional aplicada à partidas de goalball.",
          en: "computer vision research applied to goalball matches.",
        },
      },
      {
        title: { pt: "desenvolvedora front-end · sefaz", en: "front-end developer · sefaz" },
        start: "2026-07",
        description: {
          pt: "desenvolvimento de interfaces web front-end na sefaz.",
          en: "front-end web interface development at sefaz.",
        },
      },
      {
        title: { pt: "pesquisadora em ia", en: "ai researcher" },
        start: "2025-10",
        end: "2026-04",
        description: {
          pt: "pipelines de imagem e ocr e pesquisa em modelos visão-linguagem para digitalizar receitas manuscritas (unimed jp).",
          en: "image and ocr pipelines and vision-language research to digitize handwritten prescriptions (unimed jp).",
        },
      },
    ],
  },
  {
    id: "trilha",
    organization: {
      pt: "trilha · projeto de extensão (ufpb)",
      en: "trilha · extension project (ufpb)",
    },
    roles: [
      {
        title: { pt: "aluna", en: "student" },
        start: "2025-07",
        end: "2025-11",
        description: {
          pt: "imersão em desenvolvimento web/mobile; app web de pós-operatório em equipe, com git/github.",
          en: "web/mobile development immersion; team-built post-operative web app, with git/github.",
        },
      },
    ],
  },
];

const byStartDesc = (a: { start: string }, b: { start: string }) => b.start.localeCompare(a.start);

export const sortedExperiences = experiences
  .map((e) => ({ ...e, roles: [...e.roles].sort(byStartDesc) }))
  .sort((a, b) => byStartDesc(a.roles[0], b.roles[0]));

const months = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
};

const formatDate = (date: string, locale: "pt" | "en") => {
  const [year, month] = date.split("-");
  return `${months[locale][Number(month) - 1]} ${year}`;
};

export const formatPeriod = ({ start, end }: Role, locale: "pt" | "en") =>
  `${formatDate(start, locale)} - ${end ? formatDate(end, locale) : locale === "pt" ? "momento" : "present"}`;
