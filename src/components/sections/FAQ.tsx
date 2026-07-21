import { useState } from "react";
import { Head } from "vite-react-ssg";
import SectionHeader from "../ui/SectionHeader";
import { FAQ_ITEMS } from "../../constants/content";
import styles from "./FAQ.module.css";

// FAQPage structured data generated from the same list the page renders, so the
// schema and the visible answers can never disagree.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Head>

      <div className="container">
        <SectionHeader
          tag="FAQ"
          title="Questions people actually ask"
          description="Straight answers on what Hakuya is, how it's different, and how to put it to work."
        />

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={styles.answerWrap}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
