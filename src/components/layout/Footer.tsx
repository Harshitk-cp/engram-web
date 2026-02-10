import { GITHUB_URL } from "../../constants/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logo}>engram</span>
            <p>Cognitive memory for AI agents.</p>
          </div>
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#memory-systems">Memory Systems</a>
              <a href="#quickstart">Quickstart</a>
            </div>
            <div className={styles.col}>
              <h4>Resources</h4>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer">
                Issues
              </a>
              <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
                License
              </a>
            </div>
            <div className={styles.col}>
              <h4>Research</h4>
              <a href="#memory-systems">CoALA Framework</a>
              <a href="#memory-systems">Mem0 Graph Memory</a>
              <a href="#memory-systems">ACT-R Model</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} Engram. Open source under MIT License.</span>
        </div>
      </div>
    </footer>
  );
}
