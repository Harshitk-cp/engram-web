import LegalLayout from "../components/legal/LegalLayout";
import { LEGAL } from "../constants/legal";

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This Privacy Policy explains, in plain terms, how ${LEGAL.company}, a private limited company (${LEGAL.legalName}) ("${LEGAL.company}", "we", "us", or "our"), handles information when you use the ${LEGAL.brand} website and managed-cloud service (together, the "Service").`}
    >
      <p>
        By using the Service, you agree to what this Policy describes. If you don't agree, please don't
        use the Service. This Policy is part of our <a href="/terms">Terms of Use</a>.
      </p>

      <h2>1. Who we are</h2>
      <p>
        The Service is run by {LEGAL.company}, a private limited company ({LEGAL.legalName}). We operate
        in line with the laws and regulations that apply to us. For any privacy question, request, or
        grievance, email us at{" "}
        <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you provide</h3>
      <ul>
        <li>
          <strong>Account information</strong> — name, email address, organization name, and password
          credentials when you register for the managed cloud or a console account.
        </li>
        <li>
          <strong>Billing information</strong> — when you purchase a paid plan, payment is processed by
          our payment processor, {LEGAL.paymentProcessor}. We do not collect or store full card numbers;
          we receive limited transaction metadata (such as a subscription identifier, plan, status, and
          the last digits or brand of the instrument) needed to manage your subscription.
        </li>
        <li>
          <strong>Communications</strong> — information you provide when you contact us, request support,
          or submit our contact form.
        </li>
      </ul>

      <h3>2.2 Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage and log data</strong> — IP address, browser/device type, pages viewed, API
          endpoints called, timestamps, and diagnostic information used to operate, secure, and improve
          the Service.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — used for authentication (session cookies)
          and basic analytics. You can control cookies through your browser settings; disabling them may
          limit some functionality.
        </li>
      </ul>

      <h3>2.3 Customer Content</h3>
      <p>
        When you use the managed cloud, you and your end users may submit data ("Customer Content") that
        is stored and processed on your behalf — including the memories, conversations, and metadata your
        agents write to {LEGAL.brand}. We process Customer Content solely to provide the Service and in
        accordance with our agreement with you; you are the controller of that data and are responsible
        for having the necessary rights and notices to submit it.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To provide, operate, maintain, and secure the Service;</li>
        <li>To authenticate users and manage accounts, plans, and subscriptions;</li>
        <li>To process payments and prevent fraud (via {LEGAL.paymentProcessor});</li>
        <li>To respond to inquiries and provide customer support;</li>
        <li>To monitor usage, enforce plan limits, and improve performance and features;</li>
        <li>To send service, security, and transactional notices; and</li>
        <li>To comply with legal obligations and enforce our agreements.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use Customer Content to train models.</p>

      <h2>4. How we share information</h2>
      <p>We share information only as described here:</p>
      <ul>
        <li>
          <strong>Service providers</strong> — vendors who process data on our behalf to run the Service
          (e.g., cloud hosting, our payment processor {LEGAL.paymentProcessor}, email, and analytics),
          under contracts that limit their use of the data.
        </li>
        <li>
          <strong>Legal and safety</strong> — when required by law, legal process, or to protect the
          rights, property, or safety of {LEGAL.brand}, our users, or the public.
        </li>
        <li>
          <strong>Business transfers</strong> — in connection with a merger, acquisition, financing, or
          sale of assets, subject to this Policy.
        </li>
      </ul>

      <h2>5. Data retention</h2>
      <p>
        We retain personal information for as long as needed to provide the Service and for legitimate
        business or legal purposes. Customer Content is retained per your plan and instructions; you can
        delete data through the Service, and {LEGAL.brand} supports verified per-subject erasure. On
        account termination we delete or de-identify personal information within a reasonable period,
        except where retention is required by law.
      </p>

      <h2>6. Security</h2>
      <p>
        We use administrative, technical, and physical safeguards designed to protect information,
        including encryption in transit, access controls, and a tamper-evident audit trail. No method of
        transmission or storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on the data-protection laws that apply to you, you may have rights to:
      </p>
      <ul>
        <li>access the personal data we hold about you and how it is processed;</li>
        <li>correct, complete, update, or delete your personal data;</li>
        <li>withdraw consent where processing is based on your consent;</li>
        <li>object to or restrict certain processing; and</li>
        <li>raise a grievance about how your data is handled.</li>
      </ul>
      <p>
        To exercise any of these rights or raise a grievance, email{" "}
        <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>. We will verify and respond
        within the timeframe required by applicable law. <strong>We do not sell your personal data.</strong>{" "}
        If you are an end user of one of our customers, please direct your request to that customer, who
        controls that data; we will assist them as their processor.
      </p>

      <h2>8. Where your data is processed</h2>
      <p>
        We may store and process your information in countries other than your own, which may have
        different data-protection laws. When we move personal data across borders, we do so in line with
        applicable law and put appropriate safeguards in place. Enterprise customers can ask us about the
        specific hosting region and cross-border-transfer terms for their account.
      </p>

      <h2>9. Children's privacy</h2>
      <p>
        The Service is not directed to children under 18, and we do not knowingly process a child's
        personal data without verifiable consent of a parent or lawful guardian. If you believe a child
        has provided us personal data, contact us and we will delete it.
      </p>

      <h2>10. Third-party links</h2>
      <p>
        The Service may link to third-party sites and services (such as GitHub or our documentation). We
        are not responsible for the privacy practices of those third parties; their policies govern.
      </p>

      <h2>11. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. Material changes will be posted on this page with a
        revised "Last updated" date and, where appropriate, additional notice. Your continued use of the
        Service after changes take effect constitutes acceptance.
      </p>

      <h2>12. Contact us</h2>
      <p>
        {LEGAL.company} — a private limited company ({LEGAL.legalName})
        <br />
        Email: <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
      </p>
    </LegalLayout>
  );
}