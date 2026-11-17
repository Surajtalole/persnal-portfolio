import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { education, roles, splitMetrics } from "../../lib/content";
import { Reveal, SectionHead } from "../motion/Motion";
import "./Experience.css";

function Metric({ text }) {
  return splitMetrics(text).map((p) =>
    p.metric ? (
      <strong key={p.key} className="metric">
        {p.text}
      </strong>
    ) : (
      <React.Fragment key={p.key}>{p.text}</React.Fragment>
    )
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="section section--compact experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="03"
          label="Experience"
          title={[{ text: "Where I've made" }, { text: "an impact.", className: "accent" }]}
        />

        <div className="timeline" ref={listRef}>
          <div className="timeline__rail" aria-hidden="true">
            <motion.span className="timeline__fill" style={{ scaleY: fill }} />
          </div>

          <ol>
            {roles.map((r) => (
              <li key={r.id} className={`record${r.current ? " record--current" : ""}`}>
                <span className="record__node" aria-hidden="true" />

                <Reveal className="record__meta">
                  <span className="label">Record {r.record}</span>
                  <p className="record__date">{r.date}</p>
                  {r.current && (
                    <span className="record__now label">
                      <span aria-hidden="true" /> Current role
                    </span>
                  )}
                </Reveal>

                <div className="record__body">
                  <Reveal className="record__head">
                    {r.img ? (
                      <img src={r.img} alt="" className="record__logo" loading="lazy" width="44" height="44" />
                    ) : (
                      <span className="record__logo record__logo--mono" aria-hidden="true">
                        {((r.company.match(/[A-Z]/g) || []).join("") || r.company).slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <h3 className="record__company">{r.company}</h3>
                      <p className="record__role">{r.role}</p>
                    </div>
                  </Reveal>

                  <div className="record__cols">
                    {r.responsibilities.length > 0 && (
                      <Reveal className="record__col" delay={0.08}>
                        <h4 className="label">Responsibilities</h4>
                        <ul>
                          {r.responsibilities.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </Reveal>
                    )}
                    {r.achievements.length > 0 && (
                      <Reveal className="record__col record__col--impact" delay={0.14}>
                        <h4 className="label">Achievements</h4>
                        <ul>
                          {r.achievements.map((s) => (
                            <li key={s}>
                              <Metric text={s} />
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    )}
                  </div>

                  {r.stack.length > 0 && (
                    <Reveal as="p" className="record__stack" delay={0.18}>
                      <span className="label">Stack</span>
                      {r.stack.join(" · ")}
                    </Reveal>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="edu">
          <Reveal as="h3" className="edu__title label">
            Education
          </Reveal>
          <ul>
            {education.map((e, i) => (
              <Reveal as="li" key={e.id} className="edu__row" delay={i * 0.05}>
                <span className="edu__date label">{e.date}</span>
                <span className="edu__degree">{e.degree}</span>
                <span className="edu__school">{e.school.trim().replace(/\s*,\s*/g, ", ")}</span>
                <span className="edu__grade">{e.grade}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
