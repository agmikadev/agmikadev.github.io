import React, { useEffect, useRef } from "react";
import { canonicalTechList } from "../Planetary/data/technologies";
import { resolveMissionPerspective } from "../Planetary/data/perspectives";
import { ExternalLinkIcon } from "../ui/ExternalLinkIcon";
import { useSaltoNavigation } from "../Salto/SaltoNavigationContext";
import type { ProjectData } from "./types";
import "./ProjectCase.css";

interface ProjectCaseProps {
  mission: ProjectData;
  perspectivePlanetId?: string;
  onTechClick?: (technology: string) => void;
  onClose: () => void;
}

const BACK_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/**
 * Full-area case view. Replaces the project grid/list inside the collection so
 * the case gets the entire pane instead of stretching one card in the grid.
 */
export const ProjectCase: React.FC<ProjectCaseProps> = ({
  mission,
  perspectivePlanetId,
  onTechClick,
  onClose,
}) => {
  const backRef = useRef<HTMLButtonElement>(null);
  const navigation = useSaltoNavigation();
  const perspective = resolveMissionPerspective(mission, perspectivePlanetId);
  const role = perspective?.role ?? mission.role;
  const summary = perspective?.summary ?? mission.summary;
  const highlights = perspective?.highlights ?? mission.highlights;
  const challenges = perspective?.challenges ?? mission.challenges;
  const impact = perspective?.impact ?? mission.impact;
  const aiWorkflow = perspective?.aiWorkflow ?? mission.aiWorkflow;
  const technologies = canonicalTechList(
    perspective?.technologies ?? mission.technologies,
  );
  const titleId = `project-case-title-${mission.id}`;
  const handleTechClick =
    onTechClick ??
    (navigation
      ? (technology: string) => navigation.openSalto(technology)
      : undefined);

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
  }, []);

  const renderTech = (technology: string) => {
    if (!handleTechClick) {
      return (
        <span key={technology} className="project-case__tag">
          {technology}
        </span>
      );
    }

    return (
      <button
        key={technology}
        type="button"
        className="project-case__tag project-case__tag--button"
        onClick={() => handleTechClick(technology)}
        aria-label={`Filtrar projetos com ${technology}`}
      >
        {technology}
      </button>
    );
  };

  return (
    <section className="project-case" aria-labelledby={titleId}>
      <header className="project-case__topbar">
        <button
          ref={backRef}
          type="button"
          className="project-case__back"
          onClick={onClose}
          aria-label="Voltar aos projetos"
        >
          {BACK_ICON}
          <span>PROJETOS</span>
        </button>

        <div className="project-case__topmeta">
          <span className="project-case__year">{mission.year}</span>
          <div className="project-case__links">
            {mission.external_links?.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-case__link"
                aria-label={`${link.label} (abre em nova aba)`}
              >
                {link.label}
                <ExternalLinkIcon />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="project-case__headline">
        <div className="project-case__kicker">{role.toUpperCase()}</div>
        <h2 className="project-case__title" id={titleId}>
          {mission.title}
        </h2>
        <p className="project-case__summary">{summary}</p>
      </div>

      {mission.imageUrl && (
        <div className="project-case__media">
          <img
            className="project-case__image"
            src={mission.imageUrl}
            alt={`Interface do projeto ${mission.title}`}
            decoding="async"
          />
        </div>
      )}

      <div className="project-case__grid">
        <section className="project-case__section">
          <h3 className="project-case__label">O QUE FOI FEITO</h3>
          <ul className="project-case__highlights">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="project-case__section">
          <h3 className="project-case__label">DESAFIO</h3>
          <p className="project-case__text">{challenges}</p>
        </section>

        <section className="project-case__section">
          <h3 className="project-case__label">IMPACTO</h3>
          <p className="project-case__text">{impact}</p>
        </section>

        {aiWorkflow && (
          <section className="project-case__section project-case__section--ai">
            <h3 className="project-case__label project-case__label--ai">
              AI WORKFLOW
            </h3>
            <p className="project-case__text">{aiWorkflow}</p>
          </section>
        )}
      </div>

      <section className="project-case__section project-case__stack">
        <h3 className="project-case__label">STACK COMPLETA</h3>
        <div className="project-case__tags">{technologies.map(renderTech)}</div>
      </section>
    </section>
  );
};
