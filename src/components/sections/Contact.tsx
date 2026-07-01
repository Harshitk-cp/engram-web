import { useState, useId } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const id = useId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ACCESS_KEY) {
      console.error("VITE_WEB3FORMS_KEY is not set. See .env.example.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: values.name,
          replyto: values.email,
          subject: values.subject ? `[Engram] ${values.subject}` : "[Engram] New contact",
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json() as { success: boolean };
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const subjectId = `${id}-subject`;
  const messageId = `${id}-message`;

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.layout}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <p className={styles.tag}>Contact</p>
            <h2 className={styles.heading}>Talk to the team</h2>
            <p className={styles.body}>
              Questions about integrating Engram, enterprise pricing, or a
              custom deployment? Reach out and we'll respond within one
              business day.
            </p>
            <a href="mailto:tech@hakuya.ai" className={styles.directEmail}>
              tech@hakuya.ai
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9m0 0L8 3.5M11.5 7L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {status === "sent" ? (
              <div className={styles.success}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" stroke="#4ade80" strokeWidth="1.5" />
                  <path
                    d="M8.5 14l3.5 3.5 7.5-7"
                    stroke="#4ade80"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles.successTitle}>Message received</p>
                <p className={styles.successBody}>
                  We'll get back to you at {values.email} within one business day.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor={nameId} className={styles.label}>Name</label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="Alex Chen"
                      value={values.name}
                      onChange={handleChange}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor={emailId} className={styles.label}>Work email</label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="alex@company.com"
                      value={values.email}
                      onChange={handleChange}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor={subjectId} className={styles.label}>Subject</label>
                  <select
                    id={subjectId}
                    name="subject"
                    className={`${styles.input} ${styles.select}`}
                    value={values.subject}
                    onChange={handleChange}
                    required
                    disabled={status === "sending"}
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="Enterprise inquiry">Enterprise inquiry</option>
                    <option value="Integration question">Integration question</option>
                    <option value="Custom deployment">Custom deployment</option>
                    <option value="Technical question">Technical question</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor={messageId} className={styles.label}>Message</label>
                  <textarea
                    id={messageId}
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Describe your use case, the memory problem you're running into, or what you'd like to know…"
                    value={values.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorMsg}>
                    Something went wrong. Email us directly at{" "}
                    <a href="mailto:tech@hakuya.ai">tech@hakuya.ai</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7h9m0 0L8 3.5M11.5 7L8 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
