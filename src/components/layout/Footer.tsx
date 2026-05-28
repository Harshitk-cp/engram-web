import { GITHUB_URL } from "../../constants/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <svg className={styles.logoMark} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="url(#foot-lg)" strokeWidth="1.5" />
                <circle cx="16" cy="10" r="3" fill="url(#foot-lg)" />
                <circle cx="10" cy="20" r="2.5" fill="url(#foot-lg)" opacity="0.7" />
                <circle cx="22" cy="20" r="2.5" fill="url(#foot-lg)" opacity="0.7" />
                <line x1="16" y1="13" x2="11" y2="18" stroke="url(#foot-lg)" strokeWidth="1.5" opacity="0.4" />
                <line x1="16" y1="13" x2="21" y2="18" stroke="url(#foot-lg)" strokeWidth="1.5" opacity="0.4" />
                <line x1="12" y1="20" x2="20" y2="20" stroke="url(#foot-lg)" strokeWidth="1" opacity="0.25" />
                <defs>
                  <linearGradient id="foot-lg" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#818cf8" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoName}>engram</span>
            </div>
            <p className={styles.tagline}>
              Agent memory infrastructure for production AI systems.
            </p>
            <a href="mailto:tech@engram.to" className={styles.email}>
              tech@engram.to
            </a>
          </div>

          {/* Nav columns */}
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#memory-systems">Memory Systems</a>
              <a href="#quickstart">Quickstart</a>
              <a href="#contact">Contact</a>
            </div>

            <div className={styles.col}>
              <h4>Open Source</h4>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noopener noreferrer">Releases</a>
              <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer">Issues</a>
              <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">Apache-2.0</a>
            </div>

            <div className={styles.col}>
              <h4>Research</h4>
              <a href="#memory-systems">CoALA Framework</a>
              <a href="#memory-systems">ACT-R Model</a>
              <a href="#memory-systems">Mem0 Graph</a>
              <a href="https://arxiv.org/abs/2309.02427" target="_blank" rel="noopener noreferrer">Paper</a>
            </div>

          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} Engram. Released under the Apache-2.0 License.
          </span>
          <div className={styles.bottomLinks}>
            <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">License</a>
            <a href={`${GITHUB_URL}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
