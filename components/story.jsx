/* eslint-disable */
// Sticky scroll-jacked referral flow story — signature cinematic section

const CHAPTERS = [
{
  num: "Chapter 01",
  title: "A doctor creates a referral",
  body: "Dr. Iyer taps once in the LabNexusHealth doctor app. The patient's number, the test bundle, the discount — all attached, all auditable."
},
{
  num: "Chapter 02",
  title: "The patient gets a WhatsApp link",
  body: "Branded, personalised, deep-linked. The patient opens it in seconds — no app install, no friction, no SMS limbo."
},
{
  num: "Chapter 03",
  title: "The patient books a slot",
  body: "Home collection or walk-in. UPI, card, or pay-on-collection. Family member already linked. Done in under 90 seconds."
},
{
  num: "Chapter 04",
  title: "The lab processes the order",
  body: "Phlebotomist auto-assigned. Sample lifecycle tracked. Report goes through QC, then back to the patient via WhatsApp and the app."
},
{
  num: "Chapter 05",
  title: "The doctor gets paid",
  body: "Commission calculated, queued, and settled — to UPI, bank, or wallet. Transparent statements, no monthly chasing."
}];


// scenes for the sticky stage — one per chapter
const Scene0 = () =>
<div style={{ width: "86%", maxWidth: 560 }}>
    {/* doctor app — referral creation */}
    <div style={{
    borderRadius: 24, padding: 8, background: "linear-gradient(160deg,#1e2030,#0f1018)",
    border: "1px solid var(--line-3)", boxShadow: "var(--shadow-lift)"
  }}>
      <div style={{ borderRadius: 18, background: "#0a0b14", padding: "16px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>RI</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Dr. R. Iyer</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>New referral</div>
            </div>
          </div>
          <div style={{ padding: "4px 10px", borderRadius: 6, background: "var(--accent-soft)", color: "var(--accent-2)", fontSize: 11.5, fontFamily: "var(--font-mono)" }}>Draft</div>
        </div>

        <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Patient</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Suman Bhat</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>+91 98XX XX1284</div>
          </div>
        </div>

        <div style={{ marginTop: 10, padding: 14, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
          <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Tests</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {["CBC", "TSH", "HbA1c", "Vitamin D"].map((t) =>
          <span key={t} style={{ padding: "4px 10px", borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-2)", fontSize: 11.5, fontWeight: 500 }}>{t}</span>
          )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div style={{ padding: 14, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Total</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: 4 }}>₹1,840</div>
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: "linear-gradient(135deg,rgba(167,139,250,0.2),var(--bg-2))", border: "1px solid var(--accent-soft)" }}>
            <div style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Your earnings</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: 4, color: "var(--sig-green)" }}>₹368</div>
          </div>
        </div>

        <button style={{
        width: "100%", marginTop: 14, padding: "12px", borderRadius: 10,
        background: "white", color: "#0c0f1a", fontWeight: 500, fontSize: 13.5,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8
      }}>
          <IconWA size={14} /> Send via WhatsApp
        </button>
      </div>
    </div>
  </div>;


const Scene1 = () =>
<div style={{ width: "82%", maxWidth: 380 }}>
    {/* WhatsApp chat mock */}
    <div style={{ borderRadius: 20, padding: 8, background: "linear-gradient(160deg,#1e2030,#0f1018)", border: "1px solid var(--line-3)", boxShadow: "var(--shadow-lift)" }}>
      <div style={{ borderRadius: 14, background: "#0a0b14", padding: "14px 14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: "1px solid var(--line-1)" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "grid", placeItems: "center" }}><IconWA size={16} /></div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>Mehta Diagnostics</div>
            <div style={{ fontSize: 11, color: "var(--sig-green)", display: "flex", alignItems: "center", gap: 5 }}><span className="dot-pulse" style={{ width: 5, height: 5 }}></span> verified business</div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "10px 12px", borderRadius: "12px 12px 12px 4px", background: "#1a1f25", fontSize: 12.5, lineHeight: 1.5, color: "var(--text-1)" }}>
            Hi Suman, Dr. Iyer has prescribed lab tests for you.
            <div style={{ marginTop: 8, padding: 10, borderRadius: 8, background: "rgba(167,139,250,0.1)", border: "1px solid var(--accent-soft)" }}>
              <div style={{ fontSize: 11, color: "var(--accent-2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>4 tests · ₹1,840</div>
              <div style={{ fontSize: 12, marginTop: 4, color: "var(--text-2)" }}>CBC · TSH · HbA1c · Vit D</div>
            </div>
            <a style={{ display: "inline-block", marginTop: 8, fontSize: 12.5, color: "var(--sig-cyan)" }}>mehta.lab/r/Su2841</a>
            <div style={{ fontSize: 10, color: "var(--text-4)", marginTop: 6, textAlign: "right" }}>9:41 AM ✓✓</div>
          </div>

          <div style={{ alignSelf: "flex-end", maxWidth: "70%", padding: "8px 12px", borderRadius: "12px 12px 4px 12px", background: "linear-gradient(135deg,#055e3a,#0b8855)", fontSize: 12.5, color: "white" }}>
            Booking now 👍
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: "right" }}>9:42 AM</div>
          </div>

          <div style={{ alignSelf: "flex-start", maxWidth: "82%", padding: "10px 12px", borderRadius: "12px 12px 12px 4px", background: "#1a1f25", fontSize: 12.5, color: "var(--text-2)" }}>
            <span className="dot-pulse" style={{ display: "inline-block", marginRight: 6, width: 6, height: 6, verticalAlign: "middle" }}></span>
            Mehta is typing…
          </div>
        </div>
      </div>
    </div>
  </div>;


const Scene2 = () =>
<div style={{ width: "86%", maxWidth: 560 }}>
    {/* booking flow */}
    <div style={{ borderRadius: 20, padding: 14, background: "linear-gradient(180deg,var(--bg-3),var(--bg-2))", border: "1px solid var(--line-3)", boxShadow: "var(--shadow-lift)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,var(--accent),var(--accent-3))", display: "grid", placeItems: "center" }}><IconSlot size={14} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Pick a slot</div>
          <div style={{ fontSize: 11, color: "var(--text-3)" }}>Mehta Diagnostics · Bandra W</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--sig-green)" }}><span className="dot-pulse" style={{ width: 6, height: 6 }}></span> 7 slots open</div>
      </div>

      {/* day strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginTop: 14 }}>
        {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) =>
      <div key={d} style={{
        padding: "10px 0", textAlign: "center", borderRadius: 8, fontSize: 11,
        background: i === 1 ? "linear-gradient(135deg,var(--accent),var(--accent-3))" : "var(--bg-1)",
        border: i === 1 ? "1px solid var(--accent)" : "1px solid var(--line-2)",
        color: i === 1 ? "white" : "var(--text-2)",
        boxShadow: i === 1 ? "0 6px 14px -4px var(--accent-glow)" : "none"
      }}>
            <div style={{ opacity: 0.7, fontSize: 10 }}>{d}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, marginTop: 2, fontWeight: 500 }}>{29 + i}</div>
          </div>
      )}
      </div>

      {/* slot grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginTop: 10 }}>
        {["6:30 AM", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00"].map((t, i) =>
      <div key={t} style={{
        padding: "8px 0", textAlign: "center", borderRadius: 7, fontSize: 11.5,
        background: i === 2 ? "var(--accent-soft)" : "var(--bg-1)",
        border: i === 2 ? "1px solid var(--accent)" : "1px solid var(--line-1)",
        color: i === 2 ? "var(--accent-2)" : "var(--text-2)",
        opacity: i === 5 ? 0.4 : 1,
        fontFamily: "var(--font-mono)"
      }}>{t}</div>
      )}
      </div>

      {/* address card */}
      <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: "var(--bg-1)", border: "1px solid var(--line-2)", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-soft)", display: "grid", placeItems: "center", color: "var(--accent-2)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>16, Pali Hill · Bandra (W)</div>
          <div style={{ fontSize: 11, color: "var(--text-3)" }}>Apartment 4B · home collection</div>
        </div>
      </div>

      {/* pay */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginTop: 10 }}>
        <div style={{ padding: 12, borderRadius: 10, background: "var(--bg-1)", border: "1px solid var(--line-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Pay via UPI</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 2 }}>₹1,840</div>
          </div>
          <span className="ph-pill green">Verified</span>
        </div>
        <button style={{ padding: 12, borderRadius: 10, background: "white", color: "#0c0f1a", fontWeight: 500, fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Confirm <IconArrow size={13} /></button>
      </div>
    </div>
  </div>;


const Scene3 = () =>
<div style={{ width: "86%", maxWidth: 560 }}>
    {/* lab pipeline */}
    <div style={{ borderRadius: 20, padding: 20, background: "linear-gradient(180deg,var(--bg-3),var(--bg-2))", border: "1px solid var(--line-3)", boxShadow: "var(--shadow-lift)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Sample · LX-2877</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 2, letterSpacing: "-0.01em" }}>Suman Bhat · 4 tests</div>
        </div>
        <div style={{ padding: "5px 12px", borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-2)", fontSize: 11.5, fontFamily: "var(--font-mono)" }}>In progress · 02:14</div>
      </div>

      {/* pipeline steps */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
      { l: "Collected", t: "07:32 AM", d: "by Rohan K. · ₹0 paid", done: true, active: false, icon: <IconCheck size={12} /> },
      { l: "In transit", t: "07:51 AM", d: "to Mehta Lab · Andheri", done: true, active: false, icon: <IconCheck size={12} /> },
      { l: "Lab QC", t: "08:12 AM", d: "running on analyser", done: false, active: true, icon: <IconBolt size={12} /> },
      { l: "Report ready", t: "~10:00 AM ETA", d: "pending validation", done: false, active: false, icon: <IconReport size={12} /> },
      { l: "Delivered", t: "~10:05 AM ETA", d: "WhatsApp + app", done: false, active: false, icon: <IconWA size={12} /> }].
      map((s, i, arr) =>
      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, position: "relative" }}>
            <div style={{
          width: 24, height: 24, borderRadius: "50%",
          background: s.done ? "var(--sig-green)" : s.active ? "var(--accent)" : "var(--bg-1)",
          border: s.done ? "1px solid var(--sig-green)" : s.active ? "1px solid var(--accent)" : "1px solid var(--line-2)",
          color: s.done || s.active ? "white" : "var(--text-3)",
          display: "grid", placeItems: "center", flexShrink: 0,
          boxShadow: s.active ? "0 0 14px var(--accent-glow)" : "none",
          zIndex: 1
        }}>{s.icon}</div>
            {i < arr.length - 1 &&
        <div style={{ position: "absolute", left: 11, top: 24, width: 2, height: 30, background: s.done ? "var(--sig-green)" : "var(--line-2)" }}></div>
        }
            <div style={{ flex: 1, padding: "3px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 500 }}>
                <span>{s.l}</span>
                <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 400 }}>{s.t}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 2 }}>{s.d}</div>
            </div>
          </div>
      )}
      </div>
    </div>
  </div>;


const Scene4 = () =>
<div style={{ width: "86%", maxWidth: 480 }}>
    <div style={{ borderRadius: 20, padding: 8, background: "linear-gradient(160deg,#1e2030,#0f1018)", border: "1px solid var(--line-3)", boxShadow: "var(--shadow-lift)" }}>
      <div style={{ borderRadius: 14, background: "#0a0b14", padding: "18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>RI</div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>Dr. R. Iyer</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>Payout — instant</div>
            </div>
          </div>
          <div style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(110,231,183,0.15)", color: "var(--sig-green)", fontSize: 11.5, fontFamily: "var(--font-mono)" }}>Settled</div>
        </div>

        <div style={{
        marginTop: 16, padding: 20, borderRadius: 14,
        background: "linear-gradient(135deg,rgba(167,139,250,0.28),rgba(110,231,183,0.06))",
        border: "1px solid var(--line-3)", position: "relative", overflow: "hidden"
      }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 0%,var(--accent-glow),transparent 70%)" }}></div>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Commission credited</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 42, marginTop: 6, letterSpacing: "-0.04em", fontWeight: 500 }}>+ ₹368</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>For Suman Bhat · 4 tests · LX-2877</div>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line-2)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#5b8def,#2563eb)", display: "grid", placeItems: "center", color: "white" }}><IconCash size={14} /></div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>UPI · iyer@axisbank</div>
            <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>UTR · 4842910284 · 2.4s</div>
          </div>
          <span style={{ marginLeft: "auto", color: "var(--sig-green)" }}><IconCheck size={16} /></span>
        </div>

        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ padding: 12, borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>This month</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 4 }}>₹48,200</div>
          </div>
          <div style={{ padding: 12, borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line-2)" }}>
            <div style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Referrals</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 4 }}>84</div>
          </div>
        </div>
      </div>
    </div>
  </div>;


const SCENES = [Scene0, Scene1, Scene2, Scene3, Scene4];

const StoryFlow = () => {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);

  React.useEffect(() => {
    if (isMobile) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.45) {
          const idx = parseInt(e.target.dataset.idx, 10);
          setActive(idx);
        }
      });
    }, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.5, 1]
    });
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="story story-mobile" id="referral-story" data-screen-label="07 Referral Flow Story">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="section-eyebrow"><span className="dot"></span> The signature flow</span>
            <h2 className="section-title" style={{ margin: "22px auto 16px", maxWidth: "22ch" }}>
              From a doctor's tap to <span className="serif">a patient's report</span>.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Follow a real referral through LabNexusHealth.
            </p>
          </div>

          <div className="story-mobile-flow">
            {CHAPTERS.map((c, i) => {
              const Scene = SCENES[i];
              return (
                <div className="story-mobile-step reveal" key={i}>
                  <div className="story-mobile-text">
                    <div className="story-chapter-num">{c.num}</div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                  <div className="story-mobile-scene">
                    <div className="story-stage" style={{ height: "auto", minHeight: 380, padding: "24px 12px" }}>
                      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
                        <Scene />
                      </div>
                    </div>
                  </div>
                  {i < CHAPTERS.length - 1 &&
                  <div className="story-mobile-connector">
                      <span></span>
                      <IconDown size={14} />
                    </div>
                  }
                </div>);

            })}
          </div>
        </div>
      </section>);

  }

  return (
    <section className="story" id="referral-story" data-screen-label="07 Referral Flow Story">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 40, maxWidth: 780, margin: "0 auto 40px" }}>
        <span className="section-eyebrow"><span className="dot"></span> The signature flow</span>
        <h2 className="section-title" style={{ margin: "16px auto 12px", maxWidth: "22ch" }}>
          From a doctor's tap to <span className="serif">a patient's report</span> — in one connected motion.
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Scroll to follow a real referral through LabNexusHealth.
        </p>
      </div>

        <div className="story-wrap">
          <div className="story-left">
            {CHAPTERS.map((c, i) =>
            <div
              key={i}
              ref={(el) => refs.current[i] = el}
              data-idx={i}
              className="story-chapter">
              
                <div className="story-chapter-num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            )}
          </div>

          <div className="story-right">
            <div className="story-stage">
              <div className="story-progress">
                {CHAPTERS.map((_, i) =>
                <span key={i} className={i === active ? "active" : ""}></span>
                )}
              </div>
              {SCENES.map((S, i) =>
              <div key={i} className={`story-scene ${i === active ? "active" : ""}`}>
                  <S />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

Object.assign(window, { StoryFlow });