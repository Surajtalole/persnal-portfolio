import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Bio, featuredProjects } from "../../lib/content";
import { Reveal, SectionHead } from "../motion/Motion";
import "./Work.css";

function ProjectLinks({ project }) {
  if (!project.webapp) return null;
  return (
    <div className="card__links">
      <a href={project.webapp} target="_blank" rel="noreferrer" className="card__link card__link--main">
        <span className="roll">
          <span>{project.liveLabel}</span>
          <span aria-hidden="true">{project.liveLabel}</span>
        </span>
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

/** Column spans per card, cycling to give the grid an editorial rhythm. */
const SPANS = ["7", "5", "4", "4", "4", "5"];

function Chips({ items, max = 4 }) {
  if (!items || !items.length) return null;
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <ul className="card__chips" aria-label="Technologies and scope">
      {shown.map((t) => (
        <li key={t}>{t}</li>
      ))}
      {rest > 0 && <li className="card__chips-more">+{rest}</li>}
    </ul>
  );
}

function Project({ project, span, delay, featured }) {
  return (
    <Reveal
      as="article"
      className={`card card--span-${span}${featured ? " card--featured" : ""}`}
      aria-labelledby={`pj-${project.id}`}
      delay={delay}
    >
      <span className="card__bg-num" aria-hidden="true">
        {project.index}
      </span>

      <header className="card__top label">
        <span className="accent">{project.index}</span>
        <span>{project.date}</span>
      </header>

      <div className="card__main">
        {featured && <p className="card__flag label">Current work</p>}
        <h3 id={`pj-${project.id}`} className="card__title">
          {project.webapp ? (
            <a
              href={project.webapp}
              target="_blank"
              rel="noreferrer"
              className="card__open"
              data-cursor="Visit"
            >
              {project.name}
              <span className="visually-hidden"> (opens {project.liveLabel.toLowerCase()} in a new tab)</span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        {project.tagline && <p className="card__tagline">{project.tagline}</p>}
        <p className="card__desc">{project.description}</p>
      </div>

      <footer className="card__foot">
        <Chips items={project.tags.length ? project.tags : project.scope} max={featured ? 5 : 4} />
        <ProjectLinks project={project} />
      </footer>
    </Reveal>
  );
}

function MoreCard({ span, delay }) {
  return (
    <Reveal as="article" className={`card card--more card--span-${span}`} delay={delay}>
      <a href={Bio.github} target="_blank" rel="noreferrer" className="card__more-link">
        <span className="label">Archive</span>
        <span className="card__more-title">
          More experiments &amp; code on <span className="accent">GitHub</span>
        </span>
        <span className="card__more-cta">
          github.com/Surajtalole <FiArrowUpRight aria-hidden="true" />
        </span>
      </a>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="section section--alt work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          id="work-title"
          index="04"
          label="Selected projects"
          title={[{ text: "Some things" }, { text: "I've built.", className: "accent" }]}
        />

        <div className="work__grid">
          {featuredProjects.map((p, i) => (
            <Project
              key={p.id}
              project={p}
              featured={i === 0}
              span={SPANS[i % SPANS.length]}
              delay={(i % 3) * 0.08}
            />
          ))}
          <MoreCard
            span={String(12 - (featuredProjects.reduce((n, _, i) => n + Number(SPANS[i % SPANS.length]), 0) % 12) || 12)}
            delay={0.1}
          />
        </div>
      </div>

    </section>
  );
}
