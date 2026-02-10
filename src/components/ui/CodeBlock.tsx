import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  label: string;
  children: React.ReactNode;
}

export default function CodeBlock({ label, children }: CodeBlockProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        <span className={styles.label}>{label}</span>
      </div>
      <pre className={styles.code}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
