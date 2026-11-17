import React from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Bio, currentRole } from "../../lib/content";
import { EASE, SplitWords } from "../motion/Motion";
import { INTRO_DELAY } from "../Intro/Intro";
import "./Hero.css";

function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(
      new Date()
    );
  const [t, setT] = React.useState(fmt);
  React.useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <time>{t}</time>;
}

const d = (t) => INTRO_DELAY + t;
const fade = (t) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay: d(t) },
});

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <motion.div className="hero__band" {...fade(0)}>
          <p className="label hero__status">
            <span className="hero__pulse" aria-hidden="true" /> Available for opportunities
          </p>
          <p className="label hero__band-right">
            Based in {Bio.location} &mdash; <LocalTime /> IST
          </p>
        </motion.div>

        <div className="hero__grid">
          <h1 id="hero-title" className="hero__title">
            <SplitWords
              onMount
              delay={d(0.1)}
              stagger={0.07}
              text={[
                { text: "Building" },
                { text: "Digital", className: "accent" },
                { text: "Experiences That", br: true },
                { text: "Make an", br: true },
                { text: "Impact.", className: "accent" },
              ]}
            />
          </h1>

          <div className="hero__foot">
            <motion.div className="hero__id" {...fade(0.7)}>
              <p className="hero__name">{Bio.name}</p>
              <p className="label">{Bio.roles[0]}</p>
            </motion.div>

            <motion.p className="hero__intro" {...fade(0.8)}>
              I build web and mobile products end to end &mdash; React and Next.js on the front, Node and Express
              behind it, MongoDB and MySQL underneath, with AI tools like Claude, ChatGPT and Cursor built into how I
              work. Currently shipping at {currentRole.company}.
            </motion.p>

            <motion.div className="hero__ctas" {...fade(0.9)}>
              <a href="#work" className="btn btn--down">
                Explore my work <FiArrowDown aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn--line">
                Let&rsquo;s connect <FiArrowUpRight aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div className="hero__bottom" {...fade(1)}>
          <ul className="hero__social" aria-label="Social links">
            <li>
              <a href={Bio.github} target="_blank" rel="noreferrer" className="ulink">
                <FiGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={Bio.linkedin} target="_blank" rel="noreferrer" className="ulink">
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={Bio.email ? `mailto:${Bio.email}` : "#contact"} className="ulink">
                <FiMail aria-hidden="true" /> Email
              </a>
            </li>
          </ul>
          <a href="#about" className="scroll-cue" aria-label="Scroll to About">
            <span className="label">Scroll</span>
            <span className="scroll-cue__line" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
