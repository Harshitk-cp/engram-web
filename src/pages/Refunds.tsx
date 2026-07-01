import LegalLayout from "../components/legal/LegalLayout";
import { LEGAL } from "../constants/legal";

export default function Refunds() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      intro={`This policy explains, in plain terms, how to cancel a ${LEGAL.brand} managed-cloud subscription and when refunds apply. It is part of our Terms of Use.`}
    >
      <h2>1. Subscriptions</h2>
      <p>
        Paid {LEGAL.brand} plans are billed in advance on a recurring (e.g., monthly) basis through our
        payment processor, {LEGAL.paymentProcessor}, and renew automatically until cancelled. The
        free/self-hosted tiers are not charged and are not covered by this policy.
      </p>

      <h2>2. Cancellation</h2>
      <ul>
        <li>
          You can cancel your subscription at any time from the <strong>Billing</strong> page in your
          {" "}{LEGAL.brand} console, or by emailing{" "}
          <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>.
        </li>
        <li>
          When you cancel, your plan remains active until the end of the current billing period; you keep
          access to paid features through that date.
        </li>
        <li>
          At the end of the period your subscription stops renewing and your account moves to the free
          tier. We do not charge you again after cancellation.
        </li>
      </ul>

      <h2>3. Refunds</h2>
      <ul>
        <li>
          Subscription fees are charged for the upcoming billing period and are{" "}
          <strong>generally non-refundable</strong>. Cancelling stops future charges but does not refund
          the current period, except as stated below or as required by law.
        </li>
        <li>
          <strong>Billing errors.</strong> If you were charged in error (for example, a duplicate charge
          or a charge after a timely cancellation), contact us within 30 days and we will investigate and
          refund any amount charged in error.
        </li>
        <li>
          <strong>Service issues.</strong> If a material defect or extended outage prevented you from
          using the Service, contact us and we will work with you in good faith on a credit or pro-rata
          refund at our reasonable discretion.
        </li>
        <li>
          <strong>Statutory rights.</strong> Nothing in this policy limits any non-waivable refund or
          cancellation rights you may have under applicable law.
        </li>
      </ul>

      <h2>4. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a> from the email address on
        your account with your organization name and the charge in question. We aim to respond within 3
        business days. Approved refunds are issued to the original payment method via{" "}
        {LEGAL.paymentProcessor} and typically appear within 5–10 business days, depending on your bank or
        card issuer.
      </p>

      <h2>5. Failed payments</h2>
      <p>
        If a recurring payment fails, we may retry the charge and notify you. If payment is not completed,
        your subscription may be suspended or downgraded to the free tier. Restoring a paid plan requires
        a successful payment.
      </p>

      <h2>6. Chargebacks</h2>
      <p>
        If you believe a charge is incorrect, please contact us first so we can resolve it quickly.
        Initiating a chargeback without contacting us may result in suspension of your account pending
        resolution.
      </p>

      <h2>7. Contact</h2>
      <p>
        {LEGAL.company} — a private limited company ({LEGAL.legalName})
        <br />
        Email: <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
      </p>
    </LegalLayout>
  );
}
