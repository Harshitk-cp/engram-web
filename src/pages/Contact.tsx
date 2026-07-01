import { Link } from "react-router-dom";
import LegalLayout from "../components/legal/LegalLayout";
import { LEGAL } from "../constants/legal";

export default function Contact() {
  return (
    <LegalLayout
      title="Contact & Business Information"
      intro={`How to reach ${LEGAL.company}, and how the ${LEGAL.brand} service is delivered.`}
    >
      <h2>1. Business details</h2>
      <table>
        <tbody>
          <tr>
            <th>Business name</th>
            <td>{LEGAL.company}</td>
          </tr>
          <tr>
            <th>Legal entity</th>
            <td>{LEGAL.legalName}</td>
          </tr>
          <tr>
            <th>Business structure</th>
            <td>Private limited company</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
            </td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href={LEGAL.website}>{LEGAL.website}</a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>2. Support</h2>
      <p>
        For sales, integration, billing, or technical questions, email{" "}
        <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a> or use the{" "}
        <Link to="/#contact">contact form</Link> on our homepage. We aim to respond within one business day.
      </p>

      <h2>3. Service delivery</h2>
      <p>
        {LEGAL.brand} is a digital software service. There are no physical goods and nothing is shipped.
        Access to the managed cloud is provisioned <strong>electronically and immediately</strong> after
        you sign up and, for paid plans, after your subscription payment is confirmed. Service access and
        account details are delivered to your account and the email address on file.
      </p>

      <h2>4. Pricing</h2>
      <p>
        Current plans and pricing are listed on our <Link to="/#pricing">pricing section</Link>. Paid plans
        are billed as recurring subscriptions; see our <a href="/refunds">Refund &amp; Cancellation
        Policy</a> for cancellation and refund terms.
      </p>

      <h2>5. Legal</h2>
      <p>
        Your use of {LEGAL.brand} is governed by our <a href="/terms">Terms of Use</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalLayout>
  );
}
