import { FolderGit } from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: string;
  shortDescription: string;
  technologies: string[];
  contributionsAndAchievements: string[];
  repository: string;
}

interface ProjectCardProps {
  project: Project;
  labels: { contributions: string; code: string };
}

export function ProjectCard({ project, labels }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-box border border-line p-5">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold lowercase">{project.title}</h3>
          <span className="shrink-0 text-xs text-muted">{project.status}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>
      </div>

      <p className="text-xs text-muted lowercase">{project.technologies.join(" · ")}</p>

      <details className="text-sm">
        <summary className="cursor-pointer font-medium">{labels.contributions}</summary>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
          {project.contributionsAndAchievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <a
        href={project.repository}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium"
      >
        <FolderGit className="size-4" aria-hidden /> {labels.code}
      </a>
    </article>
  );
}
