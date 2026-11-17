/**
 * View-models derived from src/data/constants.js so that every fact on the
 * page traces back to the source data.
 */
import { Bio, experiences, education, projects, expertise } from "../data/constants";

/** "Etable - Restro Manager | Dine-in" -> { name, tagline } */
export function splitTitle(title = "") {
  const [name, ...rest] = title.split(/\s+-\s+/);
  return { name: name.trim(), tagline: rest.join(" - ").trim() };
}

/** Experience descriptions are one string; split into sentences (no lookbehind for older Safari). */
export function toSentences(desc = "") {
  return desc
    .replace(/\.(?=[A-Z])/g, ". ")
    .split(/\.\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map((s) => `${s}.`);
}

const METRIC = /(\d+(?:\.\d+)?%)/g;

export function splitMetrics(text) {
  return text.split(METRIC).map((part, i) => ({ text: part, metric: /^\d+(?:\.\d+)?%$/.test(part), key: i }));
}

/** Sentences carrying a measurable result (a % or "published N apps") are achievements. */
const isAchievement = (s) => /\d+(?:\.\d+)?%|published\s+\d+/i.test(s);

export function linkLabel(url = "") {
  if (url.includes("play.google.com")) return "Google Play";
  if (url.includes("apps.apple.com")) return "App Store";
  return "Live website";
}

/** Only treat GitHub URLs that point to a repository (not the bare profile) as source links. */
export const isRepoLink = (url = "") => /github\.com\/[^/]+\/[^/]+/.test(url);

export const yearOf = (range = "") => (range.match(/\d{4}/) || [""])[0];

export const currentRole = experiences.find((e) => /present/i.test(e.date)) || experiences[0];

export const roles = experiences.map((e, i) => {
  const sentences = toSentences(e.desc);
  return {
    ...e,
    record: String(i + 1).padStart(2, "0"),
    current: /present/i.test(e.date),
    // Explicit lists in constants.js win; otherwise derive them from `desc`.
    achievements: Array.isArray(e.achievements) ? e.achievements : sentences.filter(isAchievement),
    responsibilities: Array.isArray(e.responsibilities)
      ? e.responsibilities
      : sentences.filter((s) => !isAchievement(s)),
    stack: (e.skills || []).map((s) => s.trim()).filter(Boolean),
  };
});

export const featuredProjects = projects.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
  ...splitTitle(p.title),
  liveLabel: linkLabel(p.webapp),
  repo: isRepoLink(p.github) ? p.github : null,
  teamSize: Array.isArray(p.member) ? p.member.length : 0,
  tags: p.tags.map((t) => t.trim()).filter(Boolean),
}));

export { Bio, education, expertise };
