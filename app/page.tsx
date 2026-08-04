"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

type FolderKey = "projects" | "about" | "contact";

const folderItems: Array<{
  key: FolderKey;
  label: string;
  src: string;
  className: string;
}> = [
  {
    key: "about",
    label: "about",
    src: "/figma/wireframe8/about-folder.png",
    className: "about-folder",
  },
  {
    key: "projects",
    label: "projects",
    src: "/figma/wireframe8/projects-folder.png",
    className: "projects-folder",
  },
  {
    key: "contact",
    label: "contact",
    src: "/figma/wireframe8/contact-folder.png",
    className: "contact-folder",
  },
];

const greeting = "hi! i'm aniyah.";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const reducedMotionTimer = window.setTimeout(() => setTypedGreeting(greeting), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    let characterIndex = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedGreeting(greeting.slice(0, characterIndex));

      if (characterIndex >= greeting.length) {
        window.clearInterval(typingTimer);
      }
    }, 90);

    return () => window.clearInterval(typingTimer);
  }, []);

  return (
    <main className={`wireframe8-page ${darkMode ? "theme-dark" : ""}`}>
      <header className="site-topbar">
        <img className="topbar-surface" src="/figma/wireframe8/top-bar.svg" alt="" />

        <nav className="top-links" aria-label="Social links">
          <a className="top-link github-link" href="https://github.com/keklulubb">
            <img src="/figma/wireframe8/github-button.svg" alt="" />
            <span>GitHub</span>
          </a>
          <a className="top-link linkedin-link" href="https://www.linkedin.com/in/aniyah-bohnen/">
            <img src="/figma/wireframe8/linkedin-button.svg" alt="" />
            <span>LinkedIn</span>
          </a>
        </nav>

        <div className="top-actions" aria-label="Site controls">
          <button
            className="mode-button"
            type="button"
            aria-label="Toggle dark mode"
            aria-pressed={darkMode}
            onClick={() => setDarkMode((current) => !current)}
          >
            <img src="/figma/wireframe8/sun-icon.svg" alt="" />
          </button>
          <button
            className={`sound-button ${soundOn ? "is-active" : ""}`}
            type="button"
            aria-label="Toggle sound effects"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((current) => !current)}
          >
            <img src="/figma/wireframe8/speaker-button.svg" alt="" />
          </button>
        </div>
      </header>

      <div className="landing-layout">
        <section className="home-window" aria-labelledby="home-title">
          <div className="window-bar">
            <p>home</p>
            <span className="window-close" aria-hidden="true">[x]</span>
          </div>

          <div className="home-content">
            <h1 id="home-title" aria-label={greeting}>
              {typedGreeting}
              <span className={`typing-cursor`} /> {/* keep the cursor visible at all times */}
              {/* <span className={`typing-cursor ${typedGreeting.length === greeting.length ? "is-done" : ""}`} aria-hidden="true" /> */}
            </h1>

            <div className="welcome-copy">
              <p>welcome to my website</p>
              <p>check out what i&apos;ve built, leave some feedback, or take a brief rest.</p>
              <p>connect with me on socials</p>
            </div>
          </div>

          <img className="rabbit-image" src="/figma/wireframe8/kisa.gif" alt="A rabbit resting in grass" />
        </section>

        <aside className="folder-dock" aria-label="Site sections">
          {folderItems.map((item) => (
            <a className={`folder-item ${item.className}`} href={`#${item.key}`} key={item.key}>
              <span className="folder-image-wrap">
                <img src={item.src} alt="" />
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>
      </div>

      <footer className="figma-footer">
        <img className="footer-line" src="/figma/wireframe8/footer-line.svg" alt="" />
        <div className="footer-content">
          <img src="/figma/wireframe8/copyright.svg" alt="" width={24} height={24} />
          <span>2026 Aniyah Bohnen</span>
        </div>
      </footer>
    </main>
  );
}
