/* eslint-disable */
// Ecosystem constellation — animated connected product graph

// Adaptive node sets: full constellation on desktop/tablet, focused on mobile.
const NODES_FULL = [
{ id: "labs", label: "Lab Admin", Icon: IconLab, x: 18, y: 22 },
{ id: "crm", label: "Doctor CRM", Icon: IconCRM, x: 82, y: 22 },
{ id: "patient", label: "Patient App", Icon: IconPatient, x: 8, y: 56 },
{ id: "doctor", label: "Doctor App", Icon: IconDoctor, x: 92, y: 56 },
{ id: "reports", label: "Reports", Icon: IconReport, x: 18, y: 86 },
{ id: "wa", label: "WhatsApp Engine", Icon: IconWA, x: 82, y: 86 },
{ id: "slot", label: "Slot Engine", Icon: IconSlot, x: 30, y: 8 },
{ id: "payout", label: "Commission", Icon: IconCash, x: 70, y: 8 },
{ id: "analytics", label: "Analytics", Icon: IconChart, x: 50, y: 94 }];


// Mobile: 6 nodes around the core in a clean hex pattern — readable, light.
const NODES_MOBILE = [
{ id: "labs", label: "Lab Admin", Icon: IconLab, x: 22, y: 22 },
{ id: "crm", label: "Doctor CRM", Icon: IconCRM, x: 78, y: 22 },
{ id: "patient", label: "Patient App", Icon: IconPatient, x: 12, y: 60 },
{ id: "doctor", label: "Doctor App", Icon: IconDoctor, x: 88, y: 60 },
{ id: "wa", label: "WhatsApp", Icon: IconWA, x: 28, y: 88 },
{ id: "payout", label: "Payouts", Icon: IconCash, x: 72, y: 88 }];


const CORE = { x: 50, y: 50 };

const Constellation = () => {
  const ref = React.useRef(null);
  const [dims, setDims] = React.useState({ w: 1000, h: 600 });
  const v = useViewport();
  const NODES = v.mobile ? NODES_MOBILE : NODES_FULL;
  const showSecondary = !v.mobile;
  const showAnimation = v.desktop; // animate dashFlow only on desktop

  React.useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const px = (xp, yp) => [xp / 100 * dims.w, yp / 100 * dims.h];
  const [cx, cy] = px(CORE.x, CORE.y);

  return (
    <div className="ecosystem-stage" ref={ref} aria-hidden="true">
      <svg className="ecosystem-svg" viewBox={`0 0 ${dims.w} ${dims.h}`} preserveAspectRatio="none">
        <defs>
          <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.0" />
            <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* core glow */}
        <circle cx={cx} cy={cy} r={Math.min(dims.w, dims.h) * 0.45} fill="url(#coreGlow)" />

        {/* orbit rings — fewer on mobile */}
        {(v.mobile ? [0.22, 0.32] : [0.18, 0.28, 0.38]).map((r, i) =>
        <ellipse key={i} cx={cx} cy={cy}
        rx={dims.w * r} ry={dims.h * (r * 0.95)}
        fill="none" stroke="var(--line-2)" strokeDasharray="2 6" opacity={0.7 - i * 0.2} />
        )}

        {/* connection lines */}
        {NODES.map((n, i) => {
          const [x, y] = px(n.x, n.y);
          return (
            <g key={n.id}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line-2)" strokeWidth="1" />
              {showAnimation &&
              <line x1={cx} y1={cy} x2={x} y2={y}
              stroke="var(--accent-2)" strokeOpacity="0.9" strokeWidth="1.2"
              strokeDasharray="4 22"
              style={{ animation: `dashFlow ${1.8 + i * 0.18}s linear infinite`, animationDelay: `${i * 0.15}s` }} />

              }
            </g>);

        })}

        {/* secondary lateral connections (desktop/tablet only) */}
        {showSecondary && [
        ["slot", "labs"], ["payout", "crm"],
        ["wa", "patient"], ["crm", "doctor"],
        ["reports", "analytics"], ["analytics", "wa"],
        ["labs", "patient"], ["crm", "payout"]].
        map((pair, i) => {
          const a = NODES.find((n) => n.id === pair[0]);
          const b = NODES.find((n) => n.id === pair[1]);
          if (!a || !b) return null;
          const [ax, ay] = px(a.x, a.y);
          const [bx, by] = px(b.x, b.y);
          return (
            <line key={`l-${i}`} x1={ax} y1={ay} x2={bx} y2={by}
            stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.8" strokeDasharray="2 6" />);

        })}

        {/* core ring */}
        <circle cx={cx} cy={cy} r="42" fill="none" stroke="var(--accent)" strokeOpacity="0.6" />
        <circle cx={cx} cy={cy} r="60" fill="none" stroke="var(--accent)" strokeOpacity="0.2" strokeDasharray="2 4" />
      </svg>

      {/* Core node */}
      <div className="eco-node core" style={{ left: "50%", top: "50%" }}>
        <span className="eco-node-ico"><IconLayers size={18} /></span>
        <span>LabNexusHealth</span>
      </div>

      {/* nodes */}
      {NODES.map((n) =>
      <div key={n.id} className="eco-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <span className="eco-node-ico"><n.Icon size={14} /></span>
          <span>{n.label}</span>
        </div>
      )}
    </div>);

};

const Ecosystem = () =>
<section id="platform" data-screen-label="02 Ecosystem">
    <div className="container">
      <div className="reveal">
        <span className="section-eyebrow"><span className="dot"></span> One platform</span>
      </div>
      <h2 className="section-title reveal">
        Every product your diagnostics business needs, <span className="serif">connected</span>.
      </h2>
      <p className="section-sub reveal">
        LabNexusHealth is a single operating system for labs, doctors, and patients —
        nine deeply integrated products that share one source of truth.
        No bolt-on integrations, no spreadsheets in the middle.
      </p>

      <Constellation />

      <div className="reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 32 }}>
        {[
      { l: "Single tenant ID", v: "from clinic to franchise — one truth" },
      { l: "Real-time sync", v: "report, slot, payment events in milliseconds" },
      { l: "Open APIs", v: "extend with HRMS, LIS, accounting, ERPs" }].
      map((x, i) =>
      <div key={i} style={{ padding: "18px 20px", border: "1px solid var(--line-2)", borderRadius: 14, background: "linear-gradient(180deg,var(--bg-2),var(--bg-1))" }}>
            <div style={{ fontSize: 13, color: "var(--accent-2)", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>{x.l}</div>
            <div style={{ fontSize: 14.5, color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>{x.v}</div>
          </div>
      )}
      </div>
    </div>
  </section>;


Object.assign(window, { Ecosystem, Constellation });