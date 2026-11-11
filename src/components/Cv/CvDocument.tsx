import React from "react";
import type { MissionType } from "../Planetary/data/MissionData";
import { canonicalTechList } from "../Planetary/data/technologies";
import { cvProfile, type CvProfile } from "./data/profile";
import { selectCvProjects } from "./selectCvProjects";
import "./CvDocument.css";

interface CvDocumentProps {
  missions: MissionType[];
  profile?: CvProfile;
}

const formatLinkHost = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const CvDocumentComponent: React.FC<CvDocumentProps> = ({
  missions,
  profile = cvProfile,
}) => {
  const projects = selectCvProjects(missions, profile.projectSelection);
  const updatedAt = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <article className="cv-doc" aria-label={`Currículo de ${profile.name}`}>
      <section className="cv-page cv-page--one">
        <header className="cv-header">
          <img
            className="cv-photo"
            src={profile.photo}
            alt={`Retrato de ${profile.name}`}
          />

          <div className="cv-identity">
            <h1 className="cv-name">{profile.name}</h1>
            <p className="cv-role">{profile.title}</p>
            <span className="cv-rule" aria-hidden="true" />

            <div className="cv-contact">
              <span>{profile.contact.location}</span>
              <a href={profile.contact.phoneHref}>{profile.contact.phone}</a>
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
              <a href={profile.contact.site.href}>
                {profile.contact.site.label}
              </a>
              <a href={profile.contact.linkedin.href}>
                {profile.contact.linkedin.label}
              </a>
              <a href={profile.contact.github.href}>
                {profile.contact.github.label}
              </a>
            </div>
          </div>

          <p className="cv-summary">{profile.summary}</p>
        </header>

        <section className="cv-section">
          <h2 className="cv-section__title">Experiência</h2>

          <div className="cv-timeline">
            {profile.experience.map((experience) => (
              <article
                className="cv-entry"
                key={`${experience.organization}-${experience.start}`}
              >
                <div className="cv-entry__head">
                  <h3 className="cv-entry__role">{experience.role}</h3>
                  <span className="cv-entry__period">
                    {experience.start} — {experience.end}
                  </span>
                </div>
                <p className="cv-entry__org">{experience.organization}</p>
                <ul className="cv-entry__highlights">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section__title">Habilidades</h2>

          <div className="cv-skills">
            {profile.skills.map((group) => (
              <div className="cv-skill-group" key={group.label}>
                <h3 className="cv-skill-group__label">{group.label}</h3>
                <p className="cv-skill-group__items">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="cv-footer">
          <span>{profile.name}</span>
          <span>1 / 2</span>
        </footer>
      </section>

      <section className="cv-page cv-page--two">
        <section className="cv-section">
          <h2 className="cv-section__title">Projetos selecionados</h2>

          <div className="cv-projects">
            {projects.all.map((mission) => {
              const link = mission.external_links?.[0];
              const stack = canonicalTechList(mission.technologies).slice(0, 6);

              return (
                <article className="cv-project" key={mission.id}>
                  <div className="cv-project__head">
                    <h3 className="cv-project__title">{mission.title}</h3>
                    <span className="cv-project__year">{mission.year}</span>
                  </div>
                  <p className="cv-project__role">{mission.role}</p>

                  <ul className="cv-project__highlights">
                    {mission.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <p className="cv-project__stack">{stack.join(" · ")}</p>

                  {link && (
                    <a className="cv-project__link" href={link.url}>
                      {link.label} · {formatLinkHost(link.url)}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section__title">Outros projetos</h2>

          <div className="cv-others">
            {projects.others.map((mission) => (
              <div className="cv-other" key={mission.id}>
                <span className="cv-other__title">{mission.title}</span>
                <span className="cv-other__meta">
                  {mission.role} · {mission.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="cv-bottom">
          <section className="cv-section cv-section--compact">
            <h2 className="cv-section__title">Formação</h2>
            <div className="cv-education">
              {profile.education.map((education) => (
                <div className="cv-education__entry" key={education.degree}>
                  <p className="cv-education__degree">
                    {education.degree}
                    {education.status && ` · ${education.status}`}
                  </p>
                  <p className="cv-education__institution">
                    {education.institution} · {education.start}–{education.end}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section cv-section--compact">
            <h2 className="cv-section__title">Idiomas</h2>
            <div className="cv-languages">
              {profile.languages.map((language) => (
                <p className="cv-language" key={language.name}>
                  <span>{language.name}</span>
                  <span>{language.level}</span>
                </p>
              ))}
            </div>
          </section>
        </div>

        <footer className="cv-footer">
          <span>Atualizado em {updatedAt}</span>
          <span>2 / 2</span>
        </footer>
      </section>
    </article>
  );
};

export const CvDocument = React.memo(CvDocumentComponent);
CvDocument.displayName = "CvDocument";
