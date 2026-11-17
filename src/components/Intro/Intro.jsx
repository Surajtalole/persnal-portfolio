import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bio } from "../../data/constants";
import { EASE } from "../motion/Motion";
import "./Intro.css";

/** Seconds the hero waits so its entrance plays as the curtain lifts. */
export const INTRO_DELAY = 0.9;

/** Brief opening curtain — the page's entrance transition. */
export default function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          aria-hidden="true"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="intro__row container">
            <span className="mask">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="intro__name"
              >
                {Bio.name}
              </motion.span>
            </span>
            <motion.span
              className="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              Portfolio &copy;{new Date().getFullYear()}
            </motion.span>
          </div>
          <motion.span
            className="intro__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
