import { motion } from "framer-motion";
import { GITHUB_URL, CONSOLE_URL } from "../../constants/content";
import styles from "./Pricing.module.css";

const tiers = [
  {
    name: "Self-Hosted",
    price: "Free",
    priceSub: "forever",
    description: "Full capabilities on your own infrastructure. Deploy with Docker Compose and own your data completely.",
    cta: { label: "View on GitHub", href: GITHUB_URL, external: true },
    features: [
      "Tamper-evident audit trail (verify + signed export)",
      "Verified per-subject erasure (GDPR / EU AI Act)",
      "Write-provenance on every memory",
      "All 4 cognitive memory types",
      "Confidence & belief dynamics",
      "Contradiction detection",
      "Self-cleaning memory decay & lifecycle",
      "Hybrid vector + graph retrieval",
      "Python SDK + REST API",
      "LangChain integration (langchain-engram)",
      "Multi-LLM support",
      "Unlimited agents & memories",
      "Community support",
    ],
  },
  {
    name: "Developer",
    price: "$29",
    priceSub: "per month",
    description: "Managed Postgres and pgvector so you ship features, not maintain databases.",
    cta: { label: "Get started", href: `${CONSOLE_URL}/signup?plan=developer`, external: false },
    features: [
      "Everything in Self-Hosted",
      "Managed Postgres + pgvector",
      "Automated backups",
      "1 workspace",
      "50K memory operations / day",
      "Web dashboard",
      "Email support",
    ],
  },
  {
    name: "Team",
    price: "$149",
    priceSub: "per month",
    highlighted: true,
    description: "Production-grade reliability for teams running agents with real users and uptime requirements.",
    cta: { label: "Get started", href: `${CONSOLE_URL}/signup?plan=team`, external: false },
    features: [
      "Everything in Developer",
      "10 workspaces",
      "500K memory operations / day",
      "Knowledge health dashboard",
      "Multi-region replication",
      "Priority support",
      "99.5% uptime SLA",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSub: "contact us",
    description: "Private deployments, compliance packages, and contracts tailored to your organization.",
    cta: { label: "Contact sales", href: "#contact", external: false },
    features: [
      "Everything in Team",
      "Unlimited workspaces & scale",
      "BYOC deployment",
      "SSO / SAML",
      "Compliance & audit reports",
      "Dedicated support",
      "Custom SLA",
    ],
  },
] as const;

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className={styles.checkIcon}>
      <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className="container">
        <div className={styles.headerWrap}>
          <p className={styles.tag}>Pricing</p>
          <h2 className={styles.heading}>Simple, predictable pricing</h2>
          <p className={styles.sub}>
            Self-host for free under Apache-2.0, or let us run it for you. Pick a
            managed plan and start in minutes — cancel anytime.
          </p>
        </div>

        <div className={styles.grid}>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`${styles.card} ${"highlighted" in tier && tier.highlighted ? styles.cardHighlighted : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              {"highlighted" in tier && tier.highlighted && (
                <div className={styles.recommendedBadge}>Recommended</div>
              )}

              <div className={styles.cardHead}>
                <div className={styles.nameRow}>
                  <span className={styles.tierName}>{tier.name}</span>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{tier.price}</span>
                  <span className={styles.priceSub}>{tier.priceSub}</span>
                </div>
                <p className={styles.tierDesc}>{tier.description}</p>
              </div>

              <a
                href={tier.cta.href}
                target={tier.cta.external ? "_blank" : undefined}
                rel={tier.cta.external ? "noopener noreferrer" : undefined}
                className={`${"highlighted" in tier && tier.highlighted ? styles.ctaPrimary : styles.ctaSecondary}`}
              >
                {tier.cta.label}
              </a>

              <ul className={styles.features}>
                {tier.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
