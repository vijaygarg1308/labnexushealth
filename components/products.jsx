/* eslint-disable */
// Product showcase sections: Lab Admin, Doctor CRM, Patient App, Doctor App

// ─────────── Lab Admin (detailed) ───────────
const LabAdminVisual = () => {
  // build a fake daily volume area chart
  const w = 520,h = 220;
  const series = [];
  for (let i = 0; i <= 40; i++) {
    const v = 60 + Math.sin(i * 0.4) * 25 + Math.cos(i * 0.2) * 15 + i * 1.5;
    series.push([i / 40 * w, h - v]);
  }
  const linePath = "M" + series.map((p) => p.join(",")).join(" L ");
  const areaPath = linePath + ` L ${w},${h} L 0,${h} Z`;

  return (
    <div className="surface" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
      {/* main panel header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,var(--accent),var(--accent-3))", display: "grid", placeItems: "center", color: "white" }}>
            <IconLab size={16} />
          </div>
          <div>
            <div style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>Mehta Diagnostics</div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>HQ · 12 branches · 38 phlebotomists</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-3)" }}>
          <span className="dot-pulse"></span> Live
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
        {[
        { l: "Bookings · today", v: "284", d: "+18.2%", c: "var(--sig-green)" },
        { l: "Pending samples", v: "37", d: "−9 vs avg", c: "var(--sig-cyan)" },
        { l: "Revenue · MTD", v: "₹24.6L", d: "+12%", c: "var(--sig-green)" }].
        map((k, i) =>
        <div key={i} style={{ padding: "12px 14px", background: "var(--bg-1)", border: "1px solid var(--line-1)", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{k.l}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.03em", marginTop: 4, fontWeight: 500 }}>{k.v}</div>
            <div style={{ fontSize: 11, color: k.c, fontFamily: "var(--font-mono)", marginTop: 2 }}>{k.d}</div>
          </div>
        )}
      </div>

      {/* chart */}
      <div style={{ padding: "14px 14px 10px", background: "var(--bg-1)", border: "1px solid var(--line-1)", borderRadius: 10, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "var(--text-2)" }}>Order volume · 30 days</div>
          <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>+18.2% mo/mo</div>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 140, marginTop: 10 }}>
          <defs>
            <linearGradient id="labArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) =>
          <line key={i} x1="0" x2={w} y1={i * 55 + 10} y2={i * 55 + 10} stroke="var(--line-1)" strokeDasharray="2 4" />
          )}
          <path d={areaPath} fill="url(#labArea)" />
          <path d={linePath} fill="none" stroke="var(--accent-2)" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Sample tracker rows */}
      <div style={{ padding: 14, background: "var(--bg-1)", border: "1px solid var(--line-1)", borderRadius: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-3)", marginBottom: 10 }}>
          <span style={{ letterSpacing: "0.04em", textTransform: "uppercase" }}>Active samples</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>LX-2841 → LX-2878</span>
        </div>
        {[
        { id: "LX-2877", n: "Anjali Sharma", tests: "CBC, LFT, TSH", s: "Collected", c: "amber" },
        { id: "LX-2876", n: "Rajesh Pillai", tests: "Lipid Profile", s: "In lab", c: "purple" },
        { id: "LX-2875", n: "Karan Mehta", tests: "Vitamin D", s: "Reported", c: "green" }].
        map((r, i) =>
        <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 90px", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--line-1)" : "none", fontSize: 12.5 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-3)" }}>{r.id}</span>
            <span style={{ color: "var(--text-1)" }}>{r.n}</span>
            <span style={{ color: "var(--text-3)" }}>{r.tests}</span>
            <span className={`ph-pill ${r.c}`}>{r.s}</span>
          </div>
        )}
      </div>

      {/* floating action card */}
      <div style={{ position: "absolute", right: -14, bottom: 60, padding: "12px 14px", background: "linear-gradient(180deg,var(--bg-3),var(--bg-2))", border: "1px solid var(--line-3)", borderRadius: 12, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)", width: 200 }}>
        <div style={{ fontSize: 11, color: "var(--text-3)" }}>Sample TAT alert</div>
        <div style={{ fontSize: 13, marginTop: 4, letterSpacing: "-0.005em" }}>LX-2812 exceeded 6h</div>
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "var(--accent)", color: "white" }}>Escalate</button>
          <button style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "var(--bg-1)", color: "var(--text-2)", border: "1px solid var(--line-2)" }}>Snooze</button>
        </div>
      </div>
    </div>);

};

const LabAdminSection = () =>
<section id="labs" data-screen-label="03 Lab Admin">
    <div className="container">
      <div className="showcase reverse">
        <div className="showcase-text reveal">
          <span className="section-eyebrow"><span className="dot"></span> Lab Admin Platform</span>
          <h2 className="section-title" style={{ marginTop: 20 }}>Built for <span className="serif">operational scale</span>.</h2>
          <p className="section-sub">
            Run every booking, sample, branch, and rupee from one cockpit.
            Multi-tenant by design — clone an SOP across 12 branches in a click.
          </p>
          <ul className="showcase-bullets">
            <li><IconCheck size={18} /> Booking, slot, and home-collection orchestration</li>
            <li><IconCheck size={18} /> Sample lifecycle tracking with TAT alerts</li>
            <li><IconCheck size={18} /> Patient master with linked family records</li>
            <li><IconCheck size={18} /> Branch / franchise / lab-network management</li>
            <li><IconCheck size={18} /> Finance, GST &amp; daily reconciliation</li>
          </ul>
          <a className="showcase-link" href="#">Tour the Admin Platform <IconArrow size={14} className="arrow" /></a>
        </div>
        <div className="showcase-visual reveal">
          <LabAdminVisual />
        </div>
      </div>
    </div>
  </section>;


// ─────────── Doctor CRM ───────────
const DoctorCRMVisual = () => {
  const funnel = [
  { l: "Onboarded", v: 2840, w: 100 },
  { l: "Active", v: 1920, w: 78 },
  { l: "Referring", v: 1480, w: 60 },
  { l: "Top tier", v: 420, w: 22 }];

  return (
    <div className="surface" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Doctor network</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em", marginTop: 2 }}>2,840 doctors</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 6, background: "var(--accent-soft)", color: "var(--accent-2)", fontSize: 11.5, fontFamily: "var(--font-mono)" }}>+184 this month</div>
      </div>

      {/* funnel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {funnel.map((f, i) =>
        <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
              <span style={{ color: "var(--text-2)" }}>{f.l}</span>
              <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{f.v.toLocaleString()}</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: "var(--bg-1)", border: "1px solid var(--line-1)", overflow: "hidden" }}>
              <div style={{
              width: `${f.w}%`,
              height: "100%",
              background: `linear-gradient(90deg, var(--accent-3), var(--accent), var(--accent-2))`,
              boxShadow: "0 0 12px var(--accent-glow)"
            }}></div>
            </div>
          </div>
        )}
      </div>

      {/* top doctors */}
      <div style={{ padding: 14, background: "var(--bg-1)", border: "1px solid var(--line-1)", borderRadius: 10 }}>
        <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10 }}>Top referrers · April</div>
        {[
        { n: "Dr. R. Iyer", s: "Cardiology", r: 84, e: "₹48,200" },
        { n: "Dr. P. Nair", s: "Pediatrics", r: 62, e: "₹35,400" },
        { n: "Dr. A. Sharma", s: "GP", r: 51, e: "₹28,900" }].
        map((d, i) =>
        <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 80px", gap: 10, padding: "10px 0", borderTop: i ? "1px solid var(--line-1)" : "none", alignItems: "center" }}>
            <div className="avatar" style={{ width: 30, height: 30, fontSize: 11, background: "linear-gradient(135deg,var(--accent),var(--accent-3))" }}>{d.n.split(" ").pop()[0]}</div>
            <div>
              <div style={{ fontSize: 13 }}>{d.n}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{d.s}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--font-mono)", textAlign: "right" }}>{d.r} refs</div>
            <div style={{ fontSize: 12, color: "var(--sig-green)", fontFamily: "var(--font-mono)", textAlign: "right" }}>{d.e}</div>
          </div>
        )}
      </div>

      {/* payout summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
        <div style={{ padding: 14, background: "var(--bg-1)", border: "1px solid var(--line-1)", borderRadius: 10 }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Commissions · MTD</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.03em", marginTop: 4 }}>₹6.8L</div>
        </div>
        <div style={{ padding: 14, background: "linear-gradient(135deg, rgba(167,139,250,0.18), var(--bg-1))", border: "1px solid var(--accent-soft)", borderRadius: 10 }}>
          <div style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Auto-payout queue</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.03em", marginTop: 4 }}>342 doctors</div>
        </div>
      </div>
    </div>);

};

const DoctorCRMSection = () =>
<section id="doctors" data-screen-label="04 Doctor CRM">
    <div className="container">
      <div className="showcase">
        <div className="showcase-text reveal">
          <span className="section-eyebrow"><span className="dot"></span> Doctor Referral CRM</span>
          <h2 className="section-title" style={{ marginTop: 20 }}>A built-in <span className="serif">doctor growth</span> engine.</h2>
          <p className="section-sub">
            Onboard doctors, track referrals, automate commissions, settle payouts.
            Built-in growth tooling that scales from one neighbourhood clinic to a 5,000-doctor network.
          </p>
          <ul className="showcase-bullets">
            <li><IconCheck size={18} /> Self-serve doctor onboarding with KYC</li>
            <li><IconCheck size={18} /> Referral attribution by code, QR, or WhatsApp link</li>
            <li><IconCheck size={18} /> Configurable commission tiers &amp; tests</li>
            <li><IconCheck size={18} /> Auto payouts to bank, UPI, or wallet</li>
            <li><IconCheck size={18} /> Cohort &amp; performance analytics</li>
          </ul>
          <a className="showcase-link" href="#">See the CRM in action <IconArrow size={14} className="arrow" /></a>
        </div>
        <div className="showcase-visual reveal">
          <DoctorCRMVisual />
        </div>
      </div>
    </div>
  </section>;


// ─────────── Patient App (detailed phone mockup) ───────────
const PatientAppVisual = () =>
<div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "20px 0" }}>
    {/* phone */}
    <div style={{
    width: 300, height: 600, borderRadius: 44,
    background: "linear-gradient(160deg, #1e2030, #0f1018)",
    border: "1px solid var(--line-3)",
    boxShadow: "var(--shadow-lift), 0 60px 100px -30px rgba(124,58,237,0.35)",
    padding: 8, position: "relative", zIndex: 2
  }}>
      <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 80, height: 18, background: "#000", borderRadius: 10, zIndex: 3 }}></div>
      <div style={{ position: "absolute", inset: 8, borderRadius: 36, background: "#0a0b14", overflow: "hidden" }}>
        {/* status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 22px 8px", fontSize: 11, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
          <span>9:41</span><span>●●● 5G</span>
        </div>

        <div style={{ padding: "4px 18px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>Welcome back</div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>Anjali Sharma</div>
            </div>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: 13 }}>AS</div>
          </div>

          {/* live booking */}
          <div style={{
          marginTop: 16, padding: 14, borderRadius: 14,
          background: "linear-gradient(135deg, rgba(167,139,250,0.22), rgba(91,141,239,0.08))",
          border: "1px solid var(--line-3)"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Collection on way</span>
              <span className="dot-pulse"></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 12, background: "linear-gradient(135deg,var(--sig-blue),#2563eb)" }}>RK</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Rohan Kulkarni</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Phlebotomist · 4.9★</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>ETA</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.02em" }}>12<span style={{ fontSize: 11, color: "var(--text-3)" }}> min</span></div>
              </div>
            </div>
            <div style={{ marginTop: 12, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ width: "68%", height: "100%", background: "linear-gradient(90deg,var(--accent-2),var(--accent))", boxShadow: "0 0 10px var(--accent-glow)" }}></div>
            </div>
          </div>

          {/* quick actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 16 }}>
            {[
          { i: <IconPlus size={16} />, l: "Book" },
          { i: <IconReport size={16} />, l: "Reports" },
          { i: <IconUsers size={16} />, l: "Family" },
          { i: <IconCash size={16} />, l: "Pay" }].
          map((q, i) =>
          <div key={i} style={{ padding: "10px 0", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--accent-2)" }}>{q.i}</span>
                <span style={{ fontSize: 10.5, color: "var(--text-2)" }}>{q.l}</span>
              </div>
          )}
          </div>

          {/* reports */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12.5, letterSpacing: "-0.005em", fontWeight: 500 }}>Reports</div>
              <div style={{ fontSize: 11, color: "var(--accent-2)" }}>View all</div>
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
            { t: "Vitamin D · Total", d: "28 Apr", s: "new", v: "32 ng/mL" },
            { t: "CBC · Full panel", d: "24 Apr", s: "viewed", v: "normal" },
            { t: "Thyroid · TSH, T3, T4", d: "18 Apr", s: "viewed", v: "borderline" }].
            map((r, i) =>
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent-soft)", display: "grid", placeItems: "center", color: "var(--accent-2)" }}>
                    <IconReport size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.t}</div>
                    <div style={{ fontSize: 10.5, color: "var(--text-3)" }}>{r.d} · {r.v}</div>
                  </div>
                  {r.s === "new" ? <span className="ph-pill green">New</span> : null}
                </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* floating mini card */}
    <div className="patient-app-chip" style={{
    position: "absolute", left: "calc(50% + 90px)", top: 90,
    padding: "12px 14px", background: "rgba(20,22,32,0.92)", backdropFilter: "blur(14px)",
    border: "1px solid var(--line-3)", borderRadius: 12,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)", width: 210, zIndex: 3
  }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text-3)" }}>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: "linear-gradient(135deg,#25D366,#128C7E)", display: "grid", placeItems: "center" }}><IconWA size={11} /></span>
        WhatsApp · Mehta Labs
      </div>
      <div style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.4 }}>Your <strong>Vitamin D</strong> report is ready. Tap to download.</div>
    </div>

    <div className="patient-app-chip" style={{
    position: "absolute", right: "calc(50% + 100px)", bottom: 60,
    padding: "12px 14px", background: "rgba(20,22,32,0.92)",
    border: "1px solid var(--line-3)", borderRadius: 12,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)", width: 200, zIndex: 3
  }}>
      <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>UPI Pay · Razorpay</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>₹1,240 paid</div>
      <div style={{ fontSize: 11, color: "var(--sig-green)", fontFamily: "var(--font-mono)", marginTop: 2 }}>✓ Settled to lab</div>
    </div>
  </div>;


const PatientAppSection = () =>
<section id="patients" data-screen-label="05 Patient App">
    <div className="container">
      <div className="showcase">
        <div className="showcase-text reveal">
          <span className="section-eyebrow"><span className="dot"></span> Patient App</span>
          <h2 className="section-title" style={{ marginTop: 20 }}>A patient experience that feels <span className="serif">modern</span>.</h2>
          <p className="section-sub">
            Bookings, home collections, payments, and reports — in a beautifully simple app
            patients actually want to use. Family records, notifications, and downloadable reports built in.
          </p>
          <ul className="showcase-bullets">
            <li><IconCheck size={18} /> Home collection booking with live tracking</li>
            <li><IconCheck size={18} /> Family member records under one account</li>
            <li><IconCheck size={18} /> One-tap report downloads &amp; WhatsApp delivery</li>
            <li><IconCheck size={18} /> UPI, cards, wallets, and post-paid invoices</li>
            <li><IconCheck size={18} /> Real-time order status with phlebotomist ETA</li>
          </ul>
          <a className="showcase-link" href="#">See the app <IconArrow size={14} className="arrow" /></a>
        </div>
        <div className="showcase-visual reveal">
          <PatientAppVisual />
        </div>
      </div>
    </div>
  </section>;


// ─────────── Doctor App ───────────
const DoctorAppVisual = () =>
<div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "20px 0" }}>
    <div style={{
    width: 280, height: 580, borderRadius: 40,
    background: "linear-gradient(160deg, #1e2030, #0f1018)",
    border: "1px solid var(--line-3)",
    boxShadow: "var(--shadow-lift), 0 60px 100px -30px rgba(124,58,237,0.35)",
    padding: 8, position: "relative", zIndex: 2
  }}>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 70, height: 16, background: "#000", borderRadius: 10, zIndex: 3 }}></div>
      <div style={{ position: "absolute", inset: 8, borderRadius: 32, background: "#0a0b14", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px 8px", fontSize: 11, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
          <span>9:41</span><span>●●● 5G</span>
        </div>
        <div style={{ padding: "4px 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>Good morning</div>
              <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>Dr. R. Iyer</div>
            </div>
            <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>RI</div>
          </div>

          {/* earnings hero card */}
          <div style={{
          marginTop: 16, padding: 18, borderRadius: 14,
          background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(124,58,237,0.05))",
          border: "1px solid var(--line-3)", position: "relative", overflow: "hidden"
        }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, var(--accent-glow), transparent 60%)", pointerEvents: "none" }}></div>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>April earnings</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, letterSpacing: "-0.03em", marginTop: 4, fontWeight: 500 }}>₹48,200</div>
              <div style={{ fontSize: 11.5, color: "var(--sig-green)", marginTop: 2, fontFamily: "var(--font-mono)" }}>▲ ₹12,400 vs March</div>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <button style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11.5, background: "white", color: "#0c0f1a", fontWeight: 500 }}>Withdraw</button>
                <button style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11.5, background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>View statement</button>
              </div>
            </div>
          </div>

          {/* quick refer */}
          <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-soft)", display: "grid", placeItems: "center", color: "var(--accent-2)" }}><IconPlus size={16} /></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>New referral</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Share via WhatsApp · 1 tap</div>
              </div>
              <IconArrow size={14} style={{ marginLeft: "auto", color: "var(--text-3)" }} />
            </div>
          </div>

          {/* referrals list */}
          <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Recent</div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
          { n: "Suman Bhat", t: "CBC, TSH", a: "₹680", s: "green" },
          { n: "Mohit Khan", t: "Lipid Profile", a: "₹520", s: "green" },
          { n: "Karthik Pillai", t: "Full body", a: "₹2,140", s: "amber" }].
          map((r, i) =>
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
                <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{r.n.split(" ").map((x) => x[0]).join("")}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{r.n}</div>
                  <div style={{ fontSize: 10.5, color: "var(--text-3)" }}>{r.t}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "var(--sig-green)", fontFamily: "var(--font-mono)" }}>{r.a}</div>
                  <div style={{ fontSize: 9.5, color: "var(--text-4)", textTransform: "uppercase" }}>{r.s === "green" ? "paid" : "pending"}</div>
                </div>
              </div>
          )}
          </div>
        </div>
      </div>
    </div>
  </div>;


const DoctorAppSection = () =>
<section data-screen-label="06 Doctor App">
    <div className="container">
      <div className="showcase reverse">
        <div className="showcase-text reveal">
          <span className="section-eyebrow"><span className="dot"></span> Doctor App</span>
          <h2 className="section-title" style={{ marginTop: 20 }}>Designed for <span className="serif">doctor growth</span>.</h2>
          <p className="section-sub">
            One tap to refer, one screen to track earnings.
            A native mobile experience that makes referring tests as easy as sending a WhatsApp message.
          </p>
          <ul className="showcase-bullets">
            <li><IconCheck size={18} /> One-tap referral via WhatsApp share</li>
            <li><IconCheck size={18} /> Live commission &amp; payout tracker</li>
            <li><IconCheck size={18} /> Patient report visibility (with consent)</li>
            <li><IconCheck size={18} /> Referral history &amp; analytics</li>
            <li><IconCheck size={18} /> Withdraw to UPI or bank instantly</li>
          </ul>
          <a className="showcase-link" href="#">Open the doctor experience <IconArrow size={14} className="arrow" /></a>
        </div>
        <div className="showcase-visual reveal">
          <DoctorAppVisual />
        </div>
      </div>
    </div>
  </section>;


Object.assign(window, {
  LabAdminSection, DoctorCRMSection, PatientAppSection, DoctorAppSection
});