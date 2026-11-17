import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiVisualstudiocode,
  SiOpenai,
} from "react-icons/si";
import { AiOutlineApi, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsCursor, BsChatDots } from "react-icons/bs";

/** Monochrome brand glyphs keyed by a normalised technology name. */
const ICONS = {
  reactjs: SiReact,
  reactnative: SiReact,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss3,
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  restapis: AiOutlineApi,
  mongodb: SiMongodb,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  figma: SiFigma,
  vscode: SiVisualstudiocode,
  chatgpt: SiOpenai,
  // No official marks in this react-icons version — neutral glyphs instead
  claudeai: HiOutlineSparkles,
  cursor: BsCursor,
  promptengineering: BsChatDots,
  aiforseocontent: AiOutlineSearch,
};

export const normalise = (name = "") => name.toLowerCase().replace(/[^a-z0-9]/g, "");
export const getTechIcon = (name) => ICONS[normalise(name)] || null;
