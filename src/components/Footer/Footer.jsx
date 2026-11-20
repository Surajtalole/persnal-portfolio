import React from "react";
import { FiArrowUp } from "react-icons/fi";
import { Bio } from "../../data/constants";
import { NAV_LINKS } from "../Nav/Nav";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: Bio.github },
    { label: "LinkedIn", href: Bio.linkedin },
    { label: "Instagram", href: Bio.insta },
    Bio.email && { label: "Email", href: `mailto:${Bio.email}` },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__id">
            <p className="footer__name">{Bio.name}</p>
            <p className="label">{Bio.roles[0]}</p>
          </div>

          <nav className="footer__col footer__col--index" aria-label="Footer">
            <p className="label">Index</p>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>
                    <span className="roll">
                      <span>{l.label}</span>
                      <span aria-hidden="true">{l.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="label">Elsewhere</p>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} {...(s.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}>
                    <span className="roll">
                      <span>{s.label}</span>
                      <span aria-hidden="true">{s.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a href="#top" className="footer__totop">
            <span className="label">Back to top</span>
            <span className="footer__totop-icon" aria-hidden="true">
              <FiArrowUp />
            </span>
          </a>
        </div>

        <div className="footer__bottom label">
          <span>
            &copy; {year} {Bio.name}. All rights reserved.
          </span>
          <span>Designed &amp; developed by {Bio.name.split(" ")[0]}</span>
        </div>
      </div>
    </footer>
  );
}
