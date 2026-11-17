import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];
const VIEW = { once: true, margin: "0px 0px -12% 0px" };

/** Fade + lift into view once. */
export function Reveal({ as = "div", delay = 0, y = 28, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits text into words that slide up out of a mask with a stagger.
 * `text` is a string or segments: [{ text, className, br }].
 * Screen readers get the plain sentence via visually hidden text.
 */
export function SplitWords({ text, as = "span", className, delay = 0, stagger = 0.05, onMount = false }) {
  const segments = typeof text === "string" ? [{ text }] : text;
  const words = [];
  segments.forEach((seg, si) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, wi) => words.push({ w, c: seg.className, key: `${si}-${wi}`, br: seg.br && wi === 0 }))
  );
  const label = segments.map((s) => s.text).join(" ");
  const Tag = motion[as] || motion.span;
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEW };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="visually-hidden">{label}</span>
      {words.map(({ w, c, key, br }) => (
        <React.Fragment key={key}>
          {br && <br />}
          <span className="mask" aria-hidden="true">
            <motion.span
              className={c}
              variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.05, ease: EASE } } }}
            >
              {w}
            </motion.span>
          </span>{" "}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** Moves children on Y relative to scroll for subtle parallax. */
export function Parallax({ children, offset = 50, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y, height: "100%" }}>{children}</motion.div>
    </div>
  );
}

/** Section header used across the page: "01 / ABOUT ME" rail + display headline. */
export function SectionHead({ index, label, title, id }) {
  return (
    <header className="shead">
      <Reveal as="p" className="shead__label label">
        <b>{index}</b> / {label}
      </Reveal>
      <SplitWords as="h2" text={title} className="shead__title" {...(id ? { id } : {})} />
    </header>
  );
}
