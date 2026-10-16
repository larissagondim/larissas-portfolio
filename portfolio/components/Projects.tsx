"use client";

import { useId } from "react";
import { ChevronDown, FolderGit } from "lucide-react";
import { useExpandable } from "@/components/useExpandable";

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
  const { ref, open, toggle, onBoxClick } = useExpandable<HTMLElement>();
  const panelId = useId();

  return (
    <article
      ref={ref}
      onClick={onBoxClick}
      data-open={open || undefined}
      className="interactive-box flex flex-1 cursor-pointer flex-col gap-4 rounded-box border border-line bg-surface p-5 shadow-box"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold lowercase">{project.title}</h3>
          <span className="shrink-0 text-xs text-muted">{project.status}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>
      </div>

      <p className="text-xs text-muted lowercase">{project.technologies.join(" · ")}</p>

      <div className="text-sm">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex cursor-pointer items-center gap-1 rounded-sm font-medium transition-colors duration-(--duration-fast) hover:text-accent"
        >
          {labels.contributions}
          <ChevronDown className="chevron size-4" aria-hidden />
        </button>
        <div id={panelId} className="collapsible" data-open={open || undefined} inert={!open}>
          <div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
              {project.contributionsAndAchievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a
        href={project.repository}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center gap-2 self-start text-sm font-medium"
      >
        <FolderGit className="size-4" aria-hidden /> {labels.code}
      </a>
    </article>
  );
}
