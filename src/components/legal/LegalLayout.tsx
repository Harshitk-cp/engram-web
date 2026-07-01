import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LEGAL, LEGAL_LINKS } from "../../constants/legal";
import styles from "./LegalLayout.module.css";

interface LegalLayoutProps {
  title: string;
  /** Short sentence shown under the title. */
  intro?: string;
  children: ReactNode;
}

// Shared shell for the legal pages: breadcrumb, title, "last updated" line,
// readable prose column, and cross-links to the other legal documents.
export default function LegalLayout({ title, intro, children }: LegalLayoutProps) {
  const { pathname } = useLocation();
  return (
    <section className={styles.section}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.current}>{title}</span>
        </nav>

        <header className={styles.head}>
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          <p className={styles.meta}>Last updated: {LEGAL.effectiveDate}</p>
        </header>

        <div className={styles.prose}>{children}</div>

        <footer className={styles.related}>
          <span className={styles.relatedLabel}>Related</span>
          <div className={styles.relatedLinks}>
            {LEGAL_LINKS.filter((l) => l.to !== pathname).map((l) => (
              <Link key={l.to} to={l.to} className={styles.relatedLink}>
                {l.label}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}