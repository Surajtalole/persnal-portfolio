import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FiAlertCircle, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Bio } from "../../data/constants";
import { EASE, Reveal, SplitWords } from "../motion/Motion";
import "./Contact.css";

// EmailJS configuration carried over unchanged from the original site.
const EMAILJS = { service: "service_yddnwz9", template: "template_dvlve6x", publicKey: "bWnVzudeP2-fc1JbH" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { from_name: "", from_email: "", message: "" };

function validate(v) {
  const e = {};
  if (!v.from_name.trim()) e.from_name = "Please enter your name.";
  if (!v.from_email.trim()) e.from_email = "Please enter your email so I can reply.";
  else if (!EMAIL_RE.test(v.from_email.trim())) e.from_email = "That email address doesn't look right.";
  if (!v.message.trim()) e.message = "Tell me a little about what you have in mind.";
  else if (v.message.trim().length < 10) e.message = "A bit more detail, please (at least 10 characters).";
  return e;
}

const FIELDS = [
  { name: "from_name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { name: "from_email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
  { name: "message", label: "Message", type: "textarea", placeholder: "Project, role, timeline, links…" },
];

export default function Contact() {
  const form = useRef(null);
  const titleRef = useRef(null);
  const titleIn = useInView(titleRef, { once: true, margin: "0px 0px -10% 0px" });
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const errors = validate(values);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ from_name: true, from_email: true, message: true });
    const keys = Object.keys(errors);
    if (keys.length) {
      const el = form.current.querySelector(`[name="${keys[0]}"]`);
      el && el.focus();
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.publicKey);
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch (err) {
      // EmailJS rejects with { status, text } — e.g. 412 "Gmail_API: Invalid grant"
      // when the connected Gmail account needs reconnecting in the EmailJS dashboard.
      // eslint-disable-next-line no-console
      console.error("EmailJS send failed:", err && err.status, err && err.text ? err.text : err);
      setStatus("error");
    }
  };

  const channels = [
    Bio.email && { label: "Email", value: Bio.email, href: `mailto:${Bio.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/surajtalole", href: Bio.linkedin },
    { label: "GitHub", value: "github.com/Surajtalole", href: Bio.github },
    { label: "Résumé", value: "View résumé", href: Bio.resume },
  ].filter(Boolean);

  return (
    <section id="contact" className="section section--compact contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal as="p" className="shead__label label contact__label">
          <b>05</b> / Get in touch
        </Reveal>

        <h2 id="contact-title" ref={titleRef} className={`contact__title${titleIn ? " is-in" : ""}`}>
          <SplitWords
            stagger={0.07}
            text={[{ text: "Have something" }, { text: "interesting", className: "contact__hl", br: true }, { text: "in mind?" }]}
          />
        </h2>

        <motion.div
          className="contact__cta-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          <a
            className="contact__cta"
            href={Bio.email ? `mailto:${Bio.email}` : "#contact-form"}
            data-cursor={Bio.email ? "Write" : undefined}
          >
            <span>{Bio.email || "Start a conversation"}</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </motion.div>

        <div className="contact__grid">
          <div className="contact__side">
            <Reveal as="p" className="contact__lede">
              Open to full-time roles, freelance builds and interesting collaborations. Tell me what you&rsquo;re
              working on &mdash; I reply to every message personally.
            </Reveal>
            <ul className="channels">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.05}>
                  <a
                    href={c.href}
                    className="channel"
                    {...(c.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                  >
                    <span className="label">{c.label}</span>
                    <span className="channel__value">{c.value}</span>
                    <FiArrowUpRight className="channel__arrow" aria-hidden="true" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="contact__formwrap" delay={0.1}>
            <form
              id="contact-form"
              ref={form}
              className="cform"
              onSubmit={onSubmit}
              noValidate
              aria-label="Contact form"
            >
              {FIELDS.map((f, i) => {
                const err = touched[f.name] && errors[f.name];
                const id = `f-${f.name}`;
                const props = {
                  id,
                  name: f.name,
                  value: values[f.name],
                  onChange,
                  onBlur,
                  placeholder: f.placeholder,
                  autoComplete: f.autoComplete,
                  required: true,
                  "aria-invalid": err ? "true" : "false",
                  "aria-describedby": err ? `${id}-err` : undefined,
                };
                return (
                  <div className={`cfield${err ? " has-error" : ""}`} key={f.name}>
                    <label htmlFor={id} className="label">
                      <span className="accent">0{i + 1}</span> {f.label}
                    </label>
                    {f.type === "textarea" ? <textarea rows={3} {...props} /> : <input type={f.type} {...props} />}
                    <span className="cfield__line" aria-hidden="true" />
                    <AnimatePresence initial={false}>
                      {err && (
                        <motion.p
                          id={`${id}-err`}
                          className="cfield__err"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <FiAlertCircle aria-hidden="true" /> {err}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <button type="submit" className="btn cform__submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                {status === "sending" ? <span className="spinner" aria-hidden="true" /> : <FiArrowUpRight aria-hidden="true" />}
              </button>

              <div className="cform__status" role="status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p key="ok" className="notice notice--ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <FiCheck aria-hidden="true" /> Thank you &mdash; your message has been sent. I&rsquo;ll get back to
                      you soon.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p key="err" className="notice notice--err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <FiAlertCircle aria-hidden="true" /> The message couldn&rsquo;t be sent. Please try again, or reach
                      me on{" "}
                      <a href={Bio.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                      .
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
