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
          pt: "pipeline que converte danfes em html estruturado com paddleocr e qwen (via openrouter): em 5 notas de 300 dpi, 4 passaram na conferência de código, quantidade, preço e total dos produtos. script de validação contra gabarito de dataset sintético e testes automatizados de reconstrução de células e preservação de valores; comparação de 3 entradas para o llm (json compacto, json completo e markdown), gerando 15 versões de html. execução no google colab com métricas de tempo, cpu, ram e tokens por etapa (em 1 nota: 131 s de ocr, 30 s de html, custo us$ 0).",
          en: "pipeline that converts danfes (brazilian invoice documents) into structured html with paddleocr and qwen (via openrouter): out of 5 invoices at 300 dpi, 4 passed the check of product code, quantity, price and total. validation script against a synthetic dataset's ground truth and automated tests for cell reconstruction and value preservation; compared 3 llm inputs (compact json, full json and markdown), producing 15 html versions. runs on google colab with per-stage time, cpu, ram and token metrics (on 1 invoice: 131 s of ocr, 30 s of html, us$ 0 cost).",
        },
      },
      {
        title: { pt: "trainee em inteligência artificial", en: "artificial intelligence trainee" },
        start: "2025-12",
        end: "2026-07",
        description: {
          pt: "trilha de ciência de dados e ia; no projeto pauta, sistema de recomendação de candidatos (embeddings bert + autoencoder), web scraping e nlp.",
          en: "data science and ai track; on the pauta project, candidate recommendation system (bert embeddings + autoencoder), web scraping and nlp.",
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
          pt: "anotação (rotulagem) de vídeos de partidas de goalball, produzindo dados rotulados para pesquisa em visão computacional.",
          en: "annotation (labeling) of goalball match videos, producing labeled data for computer vision research.",
        },
      },
      {
        title: { pt: "desenvolvedora front-end · sefaz", en: "front-end developer · sefaz" },
        start: "2026-07",
        description: {
          pt: "desenvolvimento de interfaces web front-end na sefaz, com ambiente de desenvolvimento em containers docker.",
          en: "front-end web interface development at sefaz, with the development environment running in docker containers.",
        },
      },
      {
        title: { pt: "pesquisadora em ia", en: "ai researcher" },
        start: "2025-10",
        end: "2026-04",
        // TODO: completar o resultado (número de receitas processadas / acurácia) quando houver o dado.
        description: {
          pt: "receitas manuscritas da unimed jp precisavam ser digitalizadas; construí pipelines de imagem e ocr e comparei modelos visão-linguagem (vlms) como alternativa ao ocr tradicional em manuscritos.",
          en: "handwritten prescriptions at unimed jp needed to be digitized; built image and ocr pipelines and compared vision-language models (vlms) as an alternative to traditional ocr on handwriting.",
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
