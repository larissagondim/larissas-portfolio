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
          pt: "pipeline que converte danfes em html estruturado, com cada campo marcado, usando paddleocr, llm e vlm (qwen). reconstruí as tabelas pelas bordas, o que quase dobrou o acerto das células, e ajustei o ocr, elevando uma nota em paisagem de 66,7% para 88,9% nos campos. em 19 notas, comparei ocr direto (91,0%), ocr + llm (91,1%) e vlm (94,7%): o llm sobre o texto do ocr não trouxe ganho. execução no google colab, com avaliação automática contra gabarito sintético e marcadores data-field no html final.",
          en: "pipeline that converts danfes (brazilian invoice documents) into structured html with every field tagged, using paddleocr, llm and vlm (qwen). rebuilt tables from visible borders, which nearly doubled cell accuracy, and tuned the ocr, raising a landscape invoice from 66.7% to 88.9% on fields. on 19 invoices, compared direct ocr (91.0%), ocr + llm (91.1%) and vlm (94.7%): the llm on top of ocr text added no gain. runs on google colab, with automatic evaluation against a synthetic ground truth and data-field markers in the final html.",
        },
      },
      {
        title: { pt: "trainee em inteligência artificial", en: "artificial intelligence trainee" },
        start: "2025-12",
        end: "2026-07",
        description: {
          pt: "trilha de ciência de dados e ia, aplicada no projeto pauta.",
          en: "data science and ai track, applied to the pauta project.",
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
        // TODO: acrescentar atividades e resultados à medida que forem informados.
        description: {
          pt: "pesquisa em visão computacional com vídeos de partidas de goalball; o trabalho inclui a anotação (rotulagem) dos dados e o benchmarking do modelo anotador (tracknet v1), com o yolo como referência de comparação.",
          en: "computer vision research with goalball match videos; the work includes data annotation (labeling) and benchmarking the annotator model (tracknet v1), with yolo as the comparison baseline.",
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
        // TODO: completar o resultado (número de receitas processadas e/ou acurácia) quando houver o dado.
        description: {
          pt: "receitas manuscritas da unimed jp precisavam ser digitalizadas; construí um pipeline de imagem e ocr e comparei modelos visão-linguagem (vlms) como alternativa ao ocr tradicional em manuscritos.",
          en: "handwritten prescriptions at unimed jp needed to be digitized; built an image and ocr pipeline and compared vision-language models (vlms) as an alternative to traditional ocr on handwriting.",
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
