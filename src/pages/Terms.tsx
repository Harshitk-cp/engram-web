import LegalLayout from "../components/legal/LegalLayout";
import { LEGAL } from "../constants/legal";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Use"
      intro={`These Terms of Use ("Terms") are the agreement for using the ${LEGAL.brand} website and managed-cloud service, run by ${LEGAL.company}, a private limited company (${LEGAL.legalName}) ("${LEGAL.company}", "we", "us", or "our").`}
    >
      <p>
        By accessing or using the Service, you agree to be bound by these Terms and our{" "}
        <a href="/privacy">Privacy Policy</a>. If you are entering into these Terms on behalf of an
        organization, you represent that you have authority to bind that organization. If you do not
        agree, do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        {LEGAL.brand} provides memory infrastructure for AI agents, offered as (a) open-source software
        licensed separately under the Apache License 2.0, and (b) an optional hosted "managed cloud"
        service with paid subscription plans. These Terms govern your use of the managed cloud and this
        website; your use of the open-source software is governed by its applicable open-source license.
      </p>

      <h2>2. Eligibility and accounts</h2>
      <ul>
        <li>You must be at least 18 years old and able to form a binding contract.</li>
        <li>
          You are responsible for the accuracy of your account information and for keeping your
          credentials and API keys confidential.
        </li>
        <li>
          You are responsible for all activity under your account, including activity by your end users
          and agents.
        </li>
        <li>Notify us promptly at {LEGAL.contactEmail} of any unauthorized use or security breach.</li>
      </ul>

      <h2>3. Plans, billing, and subscriptions</h2>
      <ul>
        <li>
          <strong>Subscriptions.</strong> Paid plans are billed on a recurring (e.g., monthly) basis and
          renew automatically until cancelled. Pricing and plan limits are described at the time of
          purchase and on our pricing page.
        </li>
        <li>
          <strong>Payment processing.</strong> Payments are processed by {LEGAL.paymentProcessor}. By
          purchasing a plan you authorize us and {LEGAL.paymentProcessor} to charge your selected payment
          method on a recurring basis for the applicable fees and taxes.
        </li>
        <li>
          <strong>Taxes.</strong> Fees are exclusive of taxes; you are responsible for all applicable
          taxes other than taxes on our net income.
        </li>
        <li>
          <strong>Changes.</strong> We may change prices or plan features prospectively; we will provide
          reasonable notice and changes apply at your next billing cycle.
        </li>
        <li>
          <strong>Cancellation and refunds.</strong> Cancellation and refund terms are described in our{" "}
          <a href="/refunds">Refund &amp; Cancellation Policy</a>.
        </li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to, and not to permit anyone to:</p>
      <ul>
        <li>Use the Service in violation of any law or third-party right;</li>
        <li>
          Upload or process data you do not have the right to use, or that is unlawful, infringing, or
          harmful;
        </li>
        <li>
          Probe, scan, or test the vulnerability of, or breach the security or authentication of, the
          Service without authorization;
        </li>
        <li>
          Interfere with or disrupt the integrity or performance of the Service, or attempt to gain
          unauthorized access to it or its related systems;
        </li>
        <li>
          Resell or provide the managed cloud to third parties except as expressly permitted, or exceed
          the limits of your plan through abusive means; or
        </li>
        <li>Reverse engineer the hosted service except to the extent permitted by law.</li>
      </ul>

      <h2>5. Customer Content and ownership</h2>
      <p>
        As between you and us, you retain all rights to the data you submit to the managed cloud
        ("Customer Content"). You grant us a limited, non-exclusive license to host, process, and
        transmit Customer Content solely to provide and support the Service. You are responsible for the
        legality of your Customer Content and for obtaining any required consents from your end users.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        Except for the open-source components under their own licenses and your Customer Content, the
        Service, including the website, software, trademarks, and content, is owned by {LEGAL.company} or
        its licensors and protected by intellectual-property laws. These Terms grant you no rights other
        than the limited right to use the Service in accordance with them.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        The Service integrates with or links to third-party services (including {LEGAL.paymentProcessor}
        and infrastructure providers). We are not responsible for third-party services, and your use of
        them may be subject to their own terms.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER
        EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
        UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT IT WILL MEET YOUR REQUIREMENTS.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {LEGAL.company.toUpperCase()} AND ITS SUPPLIERS WILL NOT BE
        LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
        PROFITS, REVENUE, DATA, OR GOODWILL. OUR TOTAL LIABILITY ARISING OUT OF OR RELATED TO THE SERVICE
        WILL NOT EXCEED THE AMOUNTS YOU PAID TO US FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE
        EVENT GIVING RISE TO THE CLAIM, OR USD $100 IF YOU HAVE PAID NOTHING.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You will defend, indemnify, and hold harmless {LEGAL.company} from and against any claims,
        damages, liabilities, and expenses (including reasonable legal fees) arising out of your Customer
        Content, your use of the Service, or your breach of these Terms.
      </p>

      <h2>11. Term and termination</h2>
      <p>
        These Terms apply while you use the Service. You may stop using the Service and cancel your
        subscription at any time. We may suspend or terminate your access if you breach these Terms, fail
        to pay fees, or create risk or legal exposure for us. Upon termination, your right to use the
        Service ceases; sections that by their nature should survive (including ownership, disclaimers,
        limitation of liability, and indemnification) survive.
      </p>

      <h2>12. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws that apply at our registered place of business, without
        regard to conflict-of-laws rules. Before starting any formal proceeding, both sides agree to first
        try to resolve the dispute in good faith by emailing{" "}
        <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>. Enterprise customers may agree
        different governing-law, jurisdiction, or dispute-resolution terms in a separate signed agreement,
        which will control over this section for that customer.
      </p>

      <h2>13. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be posted on this page with a
        revised "Last updated" date. Your continued use of the Service after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2>14. Miscellaneous</h2>
      <p>
        These Terms, together with the Privacy Policy and any order or plan you purchase, are the entire
        agreement between you and us regarding the Service. If any provision is found unenforceable, the
        remaining provisions remain in effect. Our failure to enforce a provision is not a waiver. You may
        not assign these Terms without our consent; we may assign them in connection with a merger,
        acquisition, or sale of assets.
      </p>

      <h2>15. Contact</h2>
      <p>
        {LEGAL.company} — a private limited company ({LEGAL.legalName})
        <br />
        Email: <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
      </p>
    </LegalLayout>
  );
}
