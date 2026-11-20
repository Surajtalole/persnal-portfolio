import React from "react";
import { motion } from "framer-motion";
import { expertise } from "../../lib/content";
import { getTechIcon } from "../../lib/techIcons";
import { EASE, Reveal, SectionHead } from "../motion/Motion";
import "./Expertise.css";

const NOTES = {
  Frontend: "Interfaces for web and mobile: component systems, state and responsive layouts.",
  Backend: "Services and APIs that keep the interface honest.",
  Database: "Document and relational data, modelled for the product.",
  Design: "Interface and visual design in Figma, from wireframes and prototypes to polished UI and graphics.",
  Tools: "Version control, API testing and the editor I live in.",
  AI: "AI-assisted development and AI-powered SEO, used daily to build faster and sharpen content for search.",
};

export default function Expertise() {
  let n = 0;
  return (
    <section id="expertise" className="section section--alt expertise" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHead
          id="expertise-title"
          index="02"
          label="Expertise"
          title={[{ text: "Tools I use to turn" }, { text: "ideas into reality.", className: "accent" }]}
        />

        <div className="stack">
          {expertise.map((group) => (
            <div key={group.title} className={`stack__group stack__group--${group.title.toLowerCase()}`}>
              <Reveal className="stack__head">
                <h3>
                  {group.title}
                  <sup className="label">({String(group.items.length).padStart(2, "0")})</sup>
                </h3>
                <p>{NOTES[group.title]}</p>
              </Reveal>
              <motion.ul
                className="stack__list"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ staggerChildren: 0.05 }}
              >
                {group.items.map((item) => {
                  n += 1;
                  const Icon = getTechIcon(item);
                  return (
                    <motion.li
                      key={item}
                      className="tech"
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                      }}
                    >
                      <span className="tech__icon" aria-hidden="true">
                        {Icon ? <Icon focusable="false" /> : item.slice(0, 2)}
                      </span>
                      <span className="tech__name">{item}</span>
                      <span className="tech__n" aria-hidden="true">
                        {String(n).padStart(2, "0")}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          ))}
        </div>

        <Reveal as="p" className="stack__note label">
          No skill bars, no percentages. Just the stack I ship with.
        </Reveal>
      </div>
    </section>
  );
}
