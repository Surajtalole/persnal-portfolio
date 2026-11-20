import React from "react";
import { Bio, currentRole, education, roles } from "../../lib/content";
import { Reveal, SectionHead } from "../motion/Motion";
import "./About.css";

const PHILOSOPHY = [
  ["Problem before stack", "I start with who is using the product and what slows them down — tools come second."],
  ["Own the whole feature", "Comfortable on both sides of the API, so work lands complete rather than half-wired."],
  ["Ship, then refine", "Get a working slice out early, measure it, then polish the details people actually feel."],
  ["AI as a multiplier", "I use ChatGPT, Claude and Cursor for the repetitive parts — scaffolding, debugging, content and SEO drafts — and keep my own judgement on architecture, UX and code review."],
];

export default function About() {
  const degree = education.find((e) => /b\.?tech|bachelor/i.test(e.degree));
  const previous = roles.find((r) => !r.current);
  const since = (r) => r.date.split("-")[0].trim();

  const facts = [
    ["Location", Bio.location],
    ["Currently", `${currentRole.role}, ${currentRole.company}`],
    ["Since", since(currentRole)],
    previous && ["Previously", `${previous.role}, ${previous.company}`],
    degree && ["Education", `B.Tech, Information Technology — ${degree.date.split("-").pop().trim()}`],
    ["Interests", "Frontend architecture · AI-assisted development · Cross-platform mobile apps · SEO"],
  ].filter(Boolean);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          index="01"
          label="About me"
          title={[{ text: "Developer by profession." }, { text: "Creator by passion.", className: "accent" }]}
        />

        <div className="about__grid">
          <div className="about__copy">
            <Reveal as="p" className="about__lead">
              I&rsquo;m {Bio.name.split(" ")[0]} &mdash; a full stack developer from {Bio.location} who enjoys the
              whole life of a product, from the first database table to the last hover state.
            </Reveal>

            <div className="about__story">
              <Reveal as="p" delay={0.05}>
                I studied Information Technology{degree ? ` at ${degree.school.trim()}` : ""}
                {degree ? `, graduating in ${degree.date.split("-").pop().trim().split(" ").pop()}` : ""}, and went
                straight into building production software for real users.
              </Reveal>
              <Reveal as="p" delay={0.1}>
                {previous &&
                  `From ${since(previous)} to ${previous.date.split("-").pop().trim()} I was a ${previous.role.toLowerCase()} at ${previous.company}, building cross-platform web and mobile apps and taking two of them through Play Store and App Store review myself. `}
                Since {since(currentRole)} I&rsquo;ve been a {currentRole.role.toLowerCase()} at {currentRole.company},
                where AI tools are part of my daily workflow &mdash; from writing and reviewing code to optimising the
                site&rsquo;s content for search.
              </Reveal>
            </div>

            <div className="philosophy">
              <Reveal as="h3" className="label philosophy__label">
                How I work
              </Reveal>
              <ol>
                {PHILOSOPHY.map(([title, body], i) => (
                  <Reveal as="li" key={title} delay={i * 0.07} className="philosophy__item">
                    <span className="philosophy__n">0{i + 1}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <aside className="about__side" aria-label="Quick facts">
            <Reveal as="p" className="about__side-label label">
              At a glance
            </Reveal>
            <dl className="facts">
              {facts.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.05} className="facts__row">
                  <dt className="label">{k}</dt>
                  <dd>{v}</dd>
                </Reveal>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
