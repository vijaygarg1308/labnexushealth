/* eslint-disable */
// Closing sections: Automation, Feature grid, Enterprise, Testimonials, Final CTA, Footer

// ─────────── Automation ───────────
const AutomationVisual = () => {
  // 5 cards arranged in a flow with connecting lines
  return (
    <div className="auto-flow reveal">
      <div className="auto-flow-inner">
        {/* SVG connectors (desktop) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="autoLine" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* simple connectors approximated by curves */}
          <path d="M 240 80 C 320 80, 320 200, 400 200" stroke="var(--line-3)" fill="none" strokeDasharray="4 4" />
          <path d="M 240 80 C 320 80, 320 200, 400 200" stroke="url(#autoLine)" fill="none" strokeWidth="2" strokeDasharray="4 30" style={{ animation: "dashFlow 2.4s linear infinite" }} />

          <path d="M 620 200 C 700 200, 700 80, 780 80" stroke="var(--line-3)" fill="none" strokeDasharray="4 4" />
          <path d="M 620 200 C 700 200, 700 80, 780 80" stroke="url(#autoLine)" fill="none" strokeWidth="2" strokeDasharray="4 30" style={{ animation: "dashFlow 2.4s linear infinite", animationDelay: "0.7s" }} />

          <path d="M 240 320 C 320 320, 320 200, 400 200" stroke="var(--line-3)" fill="none" strokeDasharray="4 4" />
          <path d="M 240 320 C 320 320, 320 200, 400 200" stroke="url(#autoLine)" fill="none" strokeWidth="2" strokeDasharray="4 30" style={{ animation: "dashFlow 2.4s linear infinite", animationDelay: "1.1s" }} />

          <path d="M 620 200 C 700 200, 700 320, 780 320" stroke="var(--line-3)" fill="none" strokeDasharray="4 4" />
          <path d="M 620 200 C 700 200, 700 320, 780 320" stroke="url(#autoLine)" fill="none" strokeWidth="2" strokeDasharray="4 30" style={{ animation: "dashFlow 2.4s linear infinite", animationDelay: "1.4s" }} />
        </svg>

        <div className="auto-card" style={{ left: 20, top: 30 }}>
          <div className="auto-card-head"><span className="lab">trigger.01</span> <span className="pill" style={{ background: "var(--accent-soft)", color: "var(--accent-2)" }}>Booking</span></div>
          <div className="auto-card-title">Patient confirms slot</div>
          <div className="auto-card-meta">Triggers 4 downstream events</div>
        </div>

        <div className="auto-card" style={{ left: 20, top: 280 }}>
          <div className="auto-card-head"><span className="lab">trigger.02</span> <span className="pill" style={{ background: "rgba(91,141,239,0.15)", color: "var(--sig-blue)" }}>Sample</span></div>
          <div className="auto-card-title">Sample collected</div>
          <div className="auto-card-meta">Pheblo updates LIS</div>
        </div>

        {/* center engine card */}
        <div className="auto-card" style={{
          left: "50%", top: 160, transform: "translateX(-50%)", width: 240,
          background: "linear-gradient(160deg,rgba(167,139,250,0.18),var(--bg-3))",
          borderColor: "var(--accent)",
          boxShadow: "0 0 30px rgba(167,139,250,0.25), 0 30px 60px -20px rgba(0,0,0,0.6)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,var(--accent),var(--accent-3))", display: "grid", placeItems: "center", color: "white" }}><IconBolt size={14} /></div>
            <div>
              <div className="auto-card-title">Automation Engine</div>
              <div style={{ fontSize: 10.5, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>v3.0 · 2.1M events / day</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {["WA", "SMS", "Email", "Webhook", "Slack"].map((t) =>
            <span key={t} style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,0.06)", fontSize: 10.5, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>{t}</span>
            )}
          </div>
        </div>

        <div className="auto-card" style={{ right: 20, top: 30 }}>
          <div className="auto-card-head"><span className="lab">action.01</span> <span className="pill" style={{ background: "rgba(110,231,183,0.15)", color: "var(--sig-green)" }}>WhatsApp</span></div>
          <div className="auto-card-title">Send branded confirmation</div>
          <div className="auto-card-meta">+ payment link + slot ICS</div>
        </div>

        <div className="auto-card" style={{ right: 20, top: 280 }}>
          <div className="auto-card-head"><span className="lab">action.02</span> <span className="pill" style={{ background: "rgba(251,191,36,0.15)", color: "var(--sig-amber)" }}>Notify</span></div>
          <div className="auto-card-title">Report delivered</div>
          <div className="auto-card-meta">WhatsApp · email · app push</div>
        </div>
      </div>
    </div>);

};

const AutomationSection = () =>
<section id="automation" data-screen-label="08 Automation">
    <div className="container">
      <div className="reveal" style={{ maxWidth: 780 }}>
        <span className="section-eyebrow"><span className="dot"></span> Automation Engine</span>
        <h2 className="section-title" style={{ marginTop: 20 }}>Operations on <span className="serif">autopilot</span>.</h2>
        <p className="section-sub">
          Every event in the lab — a booking, a sample, a report — is a trigger.
          Compose WhatsApp messages, payouts, escalations, follow-ups, and integrations without touching code.
        </p>
      </div>
      <AutomationVisual />
    </div>
  </section>;


// ─────────── Feature grid ───────────
const FEATURES = [
{ Icon: IconLayers, t: "Multi-Tenant SaaS", d: "Run unlimited brands, branches, and franchisees on one secure tenant model." },
{ Icon: IconKey, t: "Role-Based Access", d: "Granular roles for owners, ops, phlebos, doctors, and partners. Audit-logged." },
{ Icon: IconCRM, t: "Doctor CRM", d: "Onboarding, attribution, commissions, payouts — all in one place." },
{ Icon: IconSlot, t: "Booking & Slot Engine", d: "Walk-in, home collection, and inventory-aware scheduling at scale." },
{ Icon: IconWA, t: "WhatsApp Automation", d: "Verified business templates for every operational event, in 11 languages." },
{ Icon: IconPatient, t: "Mobile Apps", d: "Native iOS &amp; Android apps for both patients and doctors. Brandable." },
{ Icon: IconReport, t: "Reports Module", d: "PDF, structured data, version history, and consent-gated sharing." },
{ Icon: IconChart, t: "Operational Analytics", d: "Daily, branch, doctor, and test-level analytics out of the box." },
{ Icon: IconCash, t: "Payouts Engine", d: "UPI, NEFT, IMPS, wallet — schedule, throttle, and reconcile payouts." },
{ Icon: IconWorkflow, t: "No-code Workflows", d: "Compose triggers and actions across the entire ecosystem." },
{ Icon: IconShield, t: "HIPAA-grade Security", d: "Encryption at rest &amp; in transit, SOC2-ready posture, ABDM-ready." },
{ Icon: IconBolt, t: "Open API Platform", d: "REST, webhooks, and event streams. Extend with your stack." }];


const FeatureGridSection = () =>
<section id="features" data-screen-label="09 Feature Grid">
    <div className="container">
      <div className="reveal" style={{ maxWidth: 780 }}>
        <span className="section-eyebrow"><span className="dot"></span> The full surface area</span>
        <h2 className="section-title" style={{ marginTop: 20 }}>Every capability a modern diagnostics business needs.</h2>
        <p className="section-sub">
          Twelve modules. One product. Replace seven vendors with one operating system.
        </p>
      </div>
      <div className="feature-grid reveal-stagger">
        {FEATURES.map((f, i) =>
      <div className="feature-card" key={i}>
            <div className="feature-card-ico"><f.Icon size={18} /></div>
            <h3>{f.t}</h3>
            <p dangerouslySetInnerHTML={{ __html: f.d }}></p>
          </div>
      )}
      </div>
    </div>
  </section>;


// ─────────── Enterprise positioning ───────────
const EnterpriseSection = () =>
<section className="enterprise" id="enterprise" data-screen-label="10 Enterprise">
    <div className="container">
      <div className="reveal" style={{ margin: "0 auto", textAlign: "center", maxWidth: 760 }}>
        <span className="section-eyebrow"><span className="dot"></span> Built for enterprise scale</span>
        <h2 className="section-title" style={{ margin: "22px auto 16px", maxWidth: "22ch" }}>
          Modular infrastructure. <span className="serif">National scale.</span>
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          From a single neighbourhood lab to a 1,000-collection-center network — LabNexusHealth scales horizontally with your business.
        </p>
      </div>

      <div className="enterprise-grid reveal-stagger">
        {[
      { v: "220+", l: "Pathology brands across India" },
      { v: "8.4M", l: "Patients served via LabNexusHealth" },
      { v: "12K+", l: "Doctors actively referring" },
      { v: "99.98%", l: "Platform uptime SLA, last 12 months" },
      { v: "47", l: "Cities live across India" },
      { v: "₹680Cr", l: "Annualised volume processed" },
      { v: "11", l: "Languages in WhatsApp engine" },
      { v: "<200ms", l: "Median event-to-action latency" }].
      map((s, i) =>
      <div className="enterprise-stat" key={i}>
            <div className="enterprise-stat-value">{s.v}</div>
            <div className="enterprise-stat-label">{s.l}</div>
          </div>
      )}
      </div>
    </div>
  </section>;


// ─────────── Testimonials ───────────
const TESTIMONIALS = [
{
  q: "We replaced seven internal tools with LabNexusHealth. Our ops team runs 4× the volume with the same headcount, and our doctor network finally has a home.",
  n: "Karthik Mehta",
  r: "Founder, Mehta Diagnostics · 12 branches"
},
{
  q: "The WhatsApp engine alone saved us a CRM hire. Our doctors now get their commissions on the same day — we've never had a payout dispute since.",
  n: "Dr. Anjali Pradhan",
  r: "Co-founder, Nucleus Path · Pune"
},
{
  q: "It feels like infrastructure, not software. We launched a new franchise in 9 days, and it ran like our flagship from day one.",
  n: "Pranav Iyer",
  r: "COO, Aarogya Path · Kerala"
}];


const TestimonialsSection = () =>
<section id="customers" data-screen-label="11 Testimonials">
    <div className="container">
      <div className="reveal" style={{ maxWidth: 680 }}>
        <span className="section-eyebrow"><span className="dot"></span> What operators say</span>
        <h2 className="section-title" style={{ marginTop: 20 }}>Run by founders. <span className="serif">Loved by operators.</span></h2>
      </div>
      <div className="testimonials-grid reveal-stagger">
        {TESTIMONIALS.map((t, i) =>
      <figure className="testimonial" key={i}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--accent-2)" style={{ opacity: 0.5 }}><path d="M6 10c0-3 2-5 5-5v3c-1.5 0-2 1-2 2h2v6H6V10zm9 0c0-3 2-5 5-5v3c-1.5 0-2 1-2 2h2v6h-5V10z" /></svg>
            <p>{t.q}</p>
            <figcaption className="testimonial-author">
              <div className="avatar">{t.n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
              <div>
                <div className="name">{t.n}</div>
                <div className="role">{t.r}</div>
              </div>
            </figcaption>
          </figure>
      )}
      </div>
    </div>
  </section>;


// ─────────── Final CTA ───────────
const FinalCTA = () =>
<section className="final-cta" id="demo" data-screen-label="12 Final CTA">
    <div className="container">
      <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <div className="hero-eyebrow" style={{ margin: "0 auto 24px" }}>
          <span className="hero-eyebrow-tag">Launch</span>
          <span>Onboard in &lt; 14 days · white-glove migration</span>
        </div>
        <h2 className="section-title lg" style={{ margin: "0 auto 24px", maxWidth: "22ch" }}>
          Launch your modern <span className="serif">diagnostics platform</span>.
        </h2>
        <p className="section-sub" style={{ margin: "0 auto 36px" }}>
          See LabNexusHealth running on your operations. Our team will walk you through a
          live tour with your real data, anonymised, in under 30 minutes.
        </p>
        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a className="btn btn-primary" href="#">Book a demo <IconArrow size={14} className="arrow" /></a>
          <a className="btn btn-secondary" href="#">Talk to sales</a>
        </div>

        <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", color: "var(--text-3)", fontSize: 12.5 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconShield size={14} /> SOC 2 · HIPAA-grade</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconBolt size={14} /> 99.98% uptime SLA</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconUsers size={14} /> 220+ labs</span>
        </div>
      </div>
    </div>
  </section>;


// ─────────── Footer ───────────
const Footer = () =>
<footer className="footer" data-screen-label="13 Footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="nav-brand" href="https://labnexushealth.in/" style={{ fontSize: 18 }}>
            <span className="nav-brand-mark"></span>
            <span>LabNexusHealth</span>
          </a>
          <p>The diagnostics operating system. One platform for labs, doctors, and patients — built for modern healthcare businesses.</p>
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            {["x", "li", "yt", "ig"].map((s) =>
          <a key={s} href="#" style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: "var(--text-3)", fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>{s}</a>
          )}
          </div>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#labs">Lab Admin</a>
          <a href="#doctors">Doctor CRM</a>
          <a href="#patients">Patient App</a>
          <a href="#automation">Automation</a>
          <a href="#features">All features</a>
          <a href="#pricing">Pricing</a>
          <a href="#">Changelog</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Customers</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Newsroom</a>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Docs</a>
          <a href="#">API reference</a>
          <a href="#">Security</a>
          <a href="#">Pricing</a>
          <a href="#">Status</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="#">Book demo</a>
          <a href="mailto:hello@labnexushealth.in">hello@labnexushealth.in</a>
          <a href="tel:+917009005308">+91 70090 05308</a>
          <a href="#">Bangalore, India</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LabNexusHealth Systems Pvt. Ltd. · <a href="https://labnexushealth.in/" style={{ color: "inherit" }}>labnexushealth.in</a></span>
        <span style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ color: "inherit" }}>Privacy</a>
          <a href="#" style={{ color: "inherit" }}>Terms</a>
          <a href="#" style={{ color: "inherit" }}>Cookies</a>
          <a href="#" style={{ color: "inherit" }}>ABDM</a>
        </span>
      </div>
    </div>
  </footer>;


Object.assign(window, {
  AutomationSection, FeatureGridSection, EnterpriseSection,
  TestimonialsSection, FinalCTA, Footer
});