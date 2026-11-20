import React from "react";
import { MotionConfig } from "framer-motion";
import { ScrollContext, useLenis } from "./lib/smoothScroll";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Expertise from "./components/Expertise/Expertise";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  const lenis = useLenis();

  return (
    <ScrollContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Expertise />
          <Experience />
          <Work />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ScrollContext.Provider>
  );
}
