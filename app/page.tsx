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
  { key: "projects", label: "projects", src: "/figma/mac-folder-icon.png", className: "projects-folder" },
  { key: "about", label: "about", src: "/figma/plaid-macbook-folder.png", className: "about-folder" },
  { key: "contact", label: "contact", src: "/figma/download-1.png", className: "contact-folder" },
];

const greeting = "hi! i'm aniyah.";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [activeFolder, setActiveFolder] = useState<FolderKey | null>(null);
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
    <main className={`figma-page ${darkMode ? "theme-dark" : ""}`}>
      <header className="figma-header">
        <img className="header-miffy" src="/figma/miffy-icon.png" alt="" width={218} height={218} />
        <div className="utility-controls" aria-label="Site controls">
          <button className="utility-button utility-empty" type="button" aria-label="Open menu" />
          <button
            className="utility-button"
            type="button"
            aria-label="Toggle dark mode"
            aria-pressed={darkMode}
            onClick={() => setDarkMode((current) => !current)}
          >
            <img src="/figma/mode-icon.svg" alt="" width={33} height={33} />
          </button>
          <button
            className={`utility-button ${soundOn ? "is-active" : ""}`}
            type="button"
            aria-label="Toggle sound effects"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((current) => !current)}
          >
            <img src="/figma/volume-icon.svg" alt="" width={33} height={33} />
          </button>
        </div>
      </header>

      <div className="desktop-layout">
        <section className="home-window" aria-labelledby="home-title">
          <div className="window-bar">
            <p>home</p>
            <button className="window-close" type="button" aria-label="Home window controls">[x]</button>
          </div>

          <div className="home-content">
            <h1 id="home-title" aria-label={greeting}>
              <span>{typedGreeting.slice(0, 4)}</span>{typedGreeting.slice(4)}
              <span className={`typing-cursor ${typedGreeting.length === greeting.length ? "is-done" : ""}`} aria-hidden="true" />
            </h1>
            <div className="welcome-copy">
              <p>welcome to my website</p>
              <p>check out what i&apos;ve built, leave some feedback, or take a brief rest.</p>
              <p>connect with me on socials</p>
            </div>
          </div>

          <img className="home-miffy" src="/figma/download-2.png" alt="" width={309} height={309} />
        </section>

        <aside className="folder-dock" aria-label="Site sections">
          {folderItems.map((item) => (
            <button
              className={`folder-item ${item.className}`}
              type="button"
              key={item.key}
              aria-label={`Open ${item.label}`}
              onClick={() => setActiveFolder(item.key)}
            >
              <span className="folder-image-wrap">
                <img src={item.src} alt="" width={195} height={242} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>
      </div>

      <footer className="figma-footer">
        <img src="/figma/copyright-icon.svg" alt="" width={24} height={24} />
        <span>2026 Aniyah Bohnen</span>
      </footer>

      {activeFolder && (
        <div className="folder-notice" role="status">
          <span>{activeFolder} is ready for your content.</span>
          <button type="button" onClick={() => setActiveFolder(null)} aria-label="Dismiss notification">×</button>
        </div>
      )}
    </main>
  );
}
