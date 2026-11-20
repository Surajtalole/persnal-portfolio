import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

export const ScrollContext = createContext(null);
export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Creates a Lenis instance (skipped for reduced-motion users) and routes
 * in-page anchor clicks through it so navigation glides instead of jumping.
 */
export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let instance = null;
    let raf = 0;

    if (!reduce) {
      instance = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
      const loop = (time) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      setLenis(instance);
    }

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href");
      const target = id === "#" || id === "#top" ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      // force: the mobile menu stops Lenis while open
      if (instance) instance.scrollTo(target, { offset: 0, force: true });
      else if (target === 0) window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      window.history.replaceState(null, "", id === "#" ? " " : id);
      if (target && target.focus) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      instance && instance.destroy();
    };
  }, []);

  return lenis;
}

/** Locks page scroll while an overlay (menu/drawer) is open. */
export function useScrollLock(active, lenis) {
  useEffect(() => {
    if (!active) return undefined;
    if (lenis) lenis.stop();
    else document.body.style.overflow = "hidden";
    return () => {
      if (lenis) lenis.start();
      else document.body.style.overflow = "";
    };
  }, [active, lenis]);
}
