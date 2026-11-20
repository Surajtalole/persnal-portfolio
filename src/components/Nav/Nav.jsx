import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bio } from "../../data/constants";
import { useScrollLock, useSmoothScroll } from "../../lib/smoothScroll";
import { EASE } from "../motion/Motion";
import "./Nav.css";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected Work" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", "expertise", ...ids].forEach((id) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return scrolled;
}

const IDS = NAV_LINKS.map((l) => l.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  const scrolled = useScrolled();
  const lenis = useSmoothScroll();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  useScrollLock(open, lenis);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current && toggleRef.current.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const f = [toggleRef.current, ...menuRef.current.querySelectorAll("a")];
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const first = Bio.name.split(" ")[0];

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="nav__bar container">
        <a href="#top" className="nav__brand" aria-label={`${Bio.name}, back to top`}>
          <span className="nav__mark" aria-hidden="true">ST</span>
          <span className="nav__word" aria-hidden="true">
            {first.toUpperCase()}
            <span className="accent">.</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={active === l.id ? "is-active" : undefined}
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-dot" className="nav__dot" transition={{ duration: 0.5, ease: EASE }} />
                  )}
                  <span className="roll">
                    <span>{l.label}</span>
                    <span aria-hidden="true">{l.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav__toggle-text">{open ? "Close" : "Menu"}</span>
          <span className="nav__burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <nav className="menu__inner container" aria-label="Mobile">
              <p className="label">Navigation</p>
              <ul>
                {NAV_LINKS.map((l, i) => (
                  <li key={l.id} className="mask">
                    <motion.a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.85, ease: EASE, delay: 0.18 + i * 0.06 }}
                    >
                      <span className="menu__idx">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.55 } }}
                exit={{ opacity: 0 }}
              >
                <a href={Bio.github} target="_blank" rel="noreferrer" className="ulink">GitHub</a>
                <a href={Bio.linkedin} target="_blank" rel="noreferrer" className="ulink">LinkedIn</a>
                <a href={Bio.resume} target="_blank" rel="noreferrer" className="ulink">Résumé</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
