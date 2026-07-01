import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CONSOLE_URL, DOCS_URL, GITHUB_URL, NAV_LINKS } from "../../constants/content";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="14" stroke="url(#lg)" strokeWidth="2" />
            <circle cx="16" cy="10" r="3" fill="url(#lg)" />
            <circle cx="10" cy="20" r="2.5" fill="url(#lg)" opacity="0.7" />
            <circle cx="22" cy="20" r="2.5" fill="url(#lg)" opacity="0.7" />
            <line x1="16" y1="13" x2="11" y2="18" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5" />
            <line x1="16" y1="13" x2="21" y2="18" stroke="url(#lg)" strokeWidth="1.5" opacity="0.5" />
            <line x1="12" y1="20" x2="20" y2="20" stroke="url(#lg)" strokeWidth="1" opacity="0.3" />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <span>engram</span>
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={styles.link}>
              {link.label}
            </Link>
          ))}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Docs
          </a>
        </div>

        <div className={styles.actions}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a href={CONSOLE_URL} className={styles.cta}>
            Get Started
          </a>
        </div>

        <button
          className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileLink}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
