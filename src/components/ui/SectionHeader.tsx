import { motion } from "framer-motion";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  tag,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className={styles.tag}>{tag}</span>
      <h2
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description && <p className={styles.desc}>{description}</p>}
    </motion.div>
  );
}
