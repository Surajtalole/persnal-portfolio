import React, { useEffect, useRef, useState } from "react";
import "./Cursor.css";

/**
 * Desktop-only follower that complements the native cursor: grows over
 * interactive elements and shows a label over [data-cursor="Label"].
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const el = useRef(null);
  const [state, setState] = useState({ label: "", hover: false, visible: false });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener("change", update) : mq.addListener(update);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", update) : mq.removeListener(update));
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target.closest && e.target.closest("[data-cursor], a, button, input, textarea, label");
      const label = (t && t.getAttribute("data-cursor")) || "";
      setState((s) => (s.label === label && s.hover === !!t && s.visible ? s : { label, hover: !!t, visible: true }));
    };
    const leave = () => setState((s) => ({ ...s, visible: false }));
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (el.current) el.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  const cls = ["cursor", state.visible && "is-visible", state.hover && "is-hover", state.label && "has-label"]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={el} className={cls} aria-hidden="true">
      <span className="cursor__ring">
        <span className="cursor__label">{state.label}</span>
      </span>
    </div>
  );
}
