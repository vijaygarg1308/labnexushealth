/* eslint-disable */
// Pricing + FAQ — premium extension matching existing LabNexusHealth design language

const PLANS = [
{
  id: "starter",
  name: "Starter",
  tag: "14-day free trial",
  price: "Free",
  priceNote: "No credit card required",
  description: "Explore the full LabNexusHealth platform with your real ops, risk-free.",
  cta: { label: "Start free trial", primary: false, href: "#" },
  accent: "neutral",
  features: [
  "1 lab · 1 admin account",
  "Full platform access",
  "Admin · technician · phlebotomist roles",
  "WhatsApp · SMS · email alerts",
  "Beta patient app access (internal testing)",
  "Standard support",
  "Guided onboarding & training"],

  doctorModule: null
},
{
  id: "pro",
  name: "Professional",
  tag: "For small & growing labs",
  price: "₹2,499",
  priceUnit: "/ month",
  priceNote: "Billed monthly · UPI, NEFT, IMPS",
  description: "Run a full diagnostics business — operations, bookings, reports, and a white-labeled patient app.",
  cta: { label: "Get Professional", primary: false, href: "#" },
  accent: "neutral",
  features: [
  "1 lab · up to 500 bookings/mo",
  "Multiple admin & staff accounts",
  "Full lab operations platform",
  "White-labeled patient app (iOS & Android)*",
  "Booking & report management",
  "WhatsApp · SMS · email alerts",
  "Custom branding",
  "99.9% SLA · standard support",
  "Custom onboarding & training"],

  doctorModule: {
    title: "Doctor module",
    items: [
    { label: "Doctor referral app", on: false },
    { label: "Doctor referral CRM", on: false },
    { label: "Commission engine", on: false }]

  }
},
{
  id: "growth",
  name: "Growth",
  tag: "For labs building doctor networks",
  popular: true,
  price: "₹2,999",
  priceUnit: "/ month",
  priceNote: "Billed monthly · UPI, NEFT, IMPS",
  description: "Everything in Professional, plus the full doctor referral infrastructure.",
  cta: { label: "Get Growth", primary: true, href: "#" },
  accent: "accent",
  features: [
  "Everything in Professional",
  "Up to 600 bookings/mo",
  "White-labeled doctor app (iOS & Android)*",
  "Doctor referral CRM & commission engine",
  "Referral tracking & analytics",
  "Commission & payout management",
  "Doctor earnings dashboard",
  "Advanced referral workflows",
  "Priority support"],

  doctorModule: {
    title: "Doctor module",
    items: [
    { label: "Doctor referral app", on: true },
    { label: "Doctor referral CRM", on: true },
    { label: "Commission engine", on: true },
    { label: "Referral analytics", on: true },
    { label: "Doctor notifications", on: true }]

  }
},
{
  id: "enterprise",
  name: "Enterprise",
  tag: "For franchises & multi-lab networks",
  price: "Custom",
  priceUnit: "",
  priceNote: "Annual contract · invoice billing",
  description: "Scalable infrastructure for enterprise diagnostics businesses, franchises, and multi-location networks.",
  cta: { label: "Talk to sales", primary: false, href: "#" },
  accent: "enterprise",
  features: [
  "Custom booking volumes",
  "Multi-lab & franchise support",
  "Unlimited admin & staff accounts",
  "White-labeled patient & doctor apps*",
  "Doctor CRM & commission engine",
  "Advanced operational analytics",
  "Dedicated account manager",
  "Enterprise security & access controls",
  "Custom integrations & APIs",
  "Invoice billing · UPI · bank transfer"],

  doctorModule: null,
  enterpriseExtras: [
  "Custom contract start & end dates",
  "Quarterly or yearly billing",
  "Manual activation & invoice billing",
  "Custom feature configuration"]

}];


const PriceCard = ({ p }) => {
  const isPopular = !!p.popular;
  const isEnterprise = p.accent === "enterprise";
  return (
    <div className={`price-card ${isPopular ? "is-popular" : ""} ${isEnterprise ? "is-enterprise" : ""}`}>
      {isPopular &&
      <div className="price-popular-tag">
          <span className="dot"></span>
          <span>Most popular</span>
        </div>
      }

      <div className="price-card-head">
        <div className="price-card-name">{p.name}</div>
        <div className="price-card-tag">{p.tag}</div>
      </div>

      <div className="price-amount">
        <span className="price-amount-value">{p.price}</span>
        {p.priceUnit && <span className="price-amount-unit">{p.priceUnit}</span>}
      </div>
      <div className="price-amount-note">{p.priceNote}</div>

      <p className="price-card-desc">{p.description}</p>

      <a href={p.cta.href} className={`btn ${p.cta.primary ? "btn-primary" : "btn-secondary"} price-cta`}>
        {p.cta.label} <IconArrow className="arrow" size={14} />
      </a>

      <div className="price-divider"></div>

      <ul className="price-feature-list">
        {p.features.map((f, i) =>
        <li key={i}>
            <span className="price-tick"><IconCheck size={12} /></span>
            <span>{f}</span>
          </li>
        )}
      </ul>

      {p.doctorModule &&
      <div className="price-submodule">
          <div className="price-submodule-title">{p.doctorModule.title}</div>
          <ul className="price-feature-list">
            {p.doctorModule.items.map((d, i) =>
          <li key={i} className={d.on ? "" : "off"}>
                <span className={`price-tick ${d.on ? "" : "off"}`}>
                  {d.on ?
              <IconCheck size={12} /> :
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
              }
                </span>
                <span>{d.label}</span>
              </li>
          )}
          </ul>
        </div>
      }

      {p.enterpriseExtras &&
      <div className="price-submodule">
          <div className="price-submodule-title">Enterprise flexibility</div>
          <ul className="price-feature-list">
            {p.enterpriseExtras.map((d, i) =>
          <li key={i}>
                <span className="price-tick"><IconCheck size={12} /></span>
                <span>{d}</span>
              </li>
          )}
          </ul>
        </div>
      }

      <div className="price-footnote">* Requires customer-owned Google Play Console &amp; Apple Developer accounts for production deployment.</div>
    </div>);

};

const PricingSection = () =>
<section className="pricing" id="pricing" data-screen-label="11.5 Pricing">
    <div className="container">
      <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 32px" }}>
        <span className="section-eyebrow"><span className="dot"></span> Pricing &amp; subscriptions</span>
        <h2 className="section-title" style={{ margin: "16px auto 12px", maxWidth: "22ch" }}>
          One platform. <span className="serif">Four ways</span> to scale.
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          From a single lab to a national diagnostics network —
          start free, upgrade when your operations are ready, and turn on the doctor growth engine when it matters most.
        </p>
      </div>

      <div className="price-grid reveal-stagger">
        {PLANS.map((p) => <PriceCard key={p.id} p={p} />)}
      </div>

      <div className="reveal price-meta">
        <div className="price-meta-row">
          <span className="price-meta-label">Payments</span>
          <span>UPI · Bank transfer · NEFT / IMPS · Invoice billing</span>
        </div>
        <div className="price-meta-row">
          <span className="price-meta-label">Coming soon</span>
          <span>Razorpay subscriptions · Stripe · auto-renewals</span>
        </div>
        <div className="price-meta-row">
          <span className="price-meta-label">Contracts</span>
          <span>Monthly &amp; annual on Professional / Growth · custom durations for Enterprise</span>
        </div>
      </div>
    </div>
  </section>;


// ─────────── FAQ ───────────
const FAQS = [
{
  q: "How does onboarding work?",
  a: "Every paid plan ships with white-glove onboarding. We migrate your existing patient, doctor, and test masters in under 14 days — typically faster. You get a dedicated implementation lead, branch-by-branch training, and a launch readiness review before go-live."
},
{
  q: "Are the mobile apps really white-labeled?",
  a: "Yes — the patient and doctor apps ship in your brand, with your logo, splash, color palette, and listing copy. We publish through your Google Play Console and Apple Developer account so the apps live under your business identity, not ours."
},
{
  q: "Do I need my own Play Store / App Store accounts?",
  a: "For production deployment, yes. Customer-owned developer accounts are required by Google and Apple for any branded patient-facing app. We help you set them up if you're starting from zero, and our team handles the technical submission end-to-end."
},
{
  q: "What's included in the Doctor Referral module?",
  a: "Doctor onboarding with KYC, attribution by code/QR/WhatsApp link, configurable commission tiers, real-time referral tracking, automated payouts (UPI, NEFT, IMPS, wallets), and a native doctor app with an earnings dashboard. Available on Growth and Enterprise."
},
{
  q: "Can I customize Enterprise plans?",
  a: "Enterprise is fully configurable. Choose your booking volume, lab count, contract length, feature mix, and billing model. Multi-tenant franchise structures, custom integrations, and dedicated infrastructure are all in scope."
},
{
  q: "How does billing work today?",
  a: "We currently support UPI, NEFT/IMPS, bank transfer, and invoice billing. Manual activation per cycle means you stay in control of renewals. Razorpay and Stripe subscriptions with auto-renewals are rolling out this quarter."
},
{
  q: "What if I exceed my booking limit?",
  a: "We never throttle operations. You'll get a heads-up at 80% and 100% of your plan limit and an automatic offer to upgrade. Overage on the existing tier is billed at a transparent per-booking rate; you'll see it on your next invoice."
},
{
  q: "What kind of support do I get?",
  a: "Professional includes business-hours support with a 4-hour first-response SLA. Growth adds priority routing and weekend coverage. Enterprise comes with a dedicated account manager, a private Slack channel, and a 30-minute P1 SLA."
},
{
  q: "Is LabNexusHealth secure and compliant?",
  a: "We operate to a SOC 2-aligned posture with encryption at rest and in transit, role-based access, full audit logs, and ABDM-ready data handling for India. HIPAA-grade controls are available for international deployments."
}];


const FaqItem = ({ q, a, idx, open, onToggle }) =>
<div className={`faq-item ${open ? "open" : ""}`}>
    <button className="faq-q" onClick={() => onToggle(idx)} aria-expanded={open}>
      <span>{q}</span>
      <span className="faq-q-ico" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>
    <div className="faq-a-wrap">
      <div className="faq-a">{a}</div>
    </div>
  </div>;


const FaqSection = () => {
  const [open, setOpen] = React.useState(0);
  const onToggle = (i) => setOpen((o) => o === i ? -1 : i);
  return (
    <section className="faq" id="faq" data-screen-label="11.7 FAQ">
      <div className="container">
        <div className="faq-grid">
          <div className="reveal">
            <span className="section-eyebrow"><span className="dot"></span> Trust &amp; FAQ</span>
            <h2 className="section-title" style={{ marginTop: 20, maxWidth: "16ch" }}>
              Questions <span className="serif">operators</span> ask first.
            </h2>
            <p className="section-sub">
              Onboarding, white-label apps, doctor modules, payments — everything you need to know
              before talking to our team.
            </p>
            <div className="faq-trust">
              <div className="faq-trust-row">
                <span className="faq-trust-ico"><IconShield size={14} /></span>
                <div>
                  <div className="faq-trust-h">SOC 2-aligned · ABDM-ready</div>
                  <div className="faq-trust-s">Built on healthcare-grade infrastructure</div>
                </div>
              </div>
              <div className="faq-trust-row">
                <span className="faq-trust-ico"><IconBolt size={14} /></span>
                <div>
                  <div className="faq-trust-h">99.98% uptime · last 12 months</div>
                  <div className="faq-trust-s">Independently monitored, publicly reported</div>
                </div>
              </div>
              <div className="faq-trust-row">
                <span className="faq-trust-ico"><IconUsers size={14} /></span>
                <div>
                  <div className="faq-trust-h">220+ labs · 12K+ doctors</div>
                  <div className="faq-trust-s">From single-clinic ops to 60-branch networks</div>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-list reveal-stagger">
            {FAQS.map((f, i) =>
            <FaqItem key={i} idx={i} open={open === i} onToggle={onToggle} q={f.q} a={f.a} />
            )}
          </div>
        </div>
      </div>
    </section>);

};

Object.assign(window, { PricingSection, FaqSection });