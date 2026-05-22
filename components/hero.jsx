/* eslint-disable */
// LabNexus Hero — floating admin dashboard with orbiting patient & doctor phones

const HeroDashboard = () => {
  // sparkline path generator
  const spark = (seed) => {
    const pts = [];
    for (let i = 0; i < 14; i++) {
      const v = 12 + Math.sin(i * 0.7 + seed) * 4 + (Math.sin(i * 1.3 + seed * 2) * 3);
      pts.push(`${i * 4},${22 - v + 10}`);
    }
    return "M" + pts.join(" L ");
  };

  // area chart path
  const chartPath = () => {
    const w = 760, h = 130;
    const points = [];
    for (let i = 0; i <= 30; i++) {
      const x = (i / 30) * w;
      const y = h - (Math.sin(i * 0.35) * 22 + Math.cos(i * 0.18) * 14 + 60 + (i * 1.4));
      points.push([x, y]);
    }
    const linePath = "M" + points.map(p => p.join(",")).join(" L ");
    const areaPath = linePath + ` L ${w},${h} L 0,${h} Z`;
    return { linePath, areaPath };
  };
  const { linePath, areaPath } = chartPath();

  return (
    <div className="hero-dashboard" aria-hidden="true">
      <div className="dash-topbar">
        <div className="dash-dot r"></div>
        <div className="dash-dot y"></div>
        <div className="dash-dot g"></div>
        <div className="dash-search">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          Search patients, orders, doctors…
          <span className="dash-search-kbd">⌘K</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,fontSize:11.5,color:"var(--text-3)"}}>
          <span className="dot-pulse"></span>
          <span>Live ops</span>
        </div>
      </div>

      <div className="dash-body">
        <aside className="dash-sidebar">
          <div className="dash-sidelabel">Operations</div>
          <div className="dash-sideitem active"><span className="dash-sideitem-ico"></span> Dashboard</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Bookings</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Samples</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Reports</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Patients</div>
          <div className="dash-sidelabel" style={{marginTop:14}}>Network</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Doctors</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Referrals</div>
          <div className="dash-sideitem"><span className="dash-sideitem-ico"></span> Payouts</div>
        </aside>

        <div className="dash-main">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,color:"var(--text-3)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Operations overview</div>
              <div style={{fontFamily:"var(--font-display)",fontSize:18,letterSpacing:"-0.02em",marginTop:2}}>Mehta Diagnostics — Mumbai HQ</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <div style={{padding:"4px 10px",borderRadius:6,background:"var(--bg-1)",border:"1px solid var(--line-2)",fontSize:11,color:"var(--text-2)"}}>Today</div>
              <div style={{padding:"4px 10px",borderRadius:6,background:"var(--bg-1)",border:"1px solid var(--line-2)",fontSize:11,color:"var(--text-3)"}}>7d</div>
              <div style={{padding:"4px 10px",borderRadius:6,background:"var(--bg-1)",border:"1px solid var(--line-2)",fontSize:11,color:"var(--text-3)"}}>30d</div>
            </div>
          </div>

          <div className="dash-kpis">
            <div className="dash-kpi">
              <div className="dash-kpi-label">Bookings</div>
              <div className="dash-kpi-value count">1,284</div>
              <div className="dash-kpi-delta">▲ 12.4%</div>
              <svg className="dash-kpi-spark" viewBox="0 0 56 24" fill="none">
                <path d={spark(1)} stroke="var(--accent-2)" strokeWidth="1.4"/>
              </svg>
            </div>
            <div className="dash-kpi">
              <div className="dash-kpi-label">Samples</div>
              <div className="dash-kpi-value count">2,941</div>
              <div className="dash-kpi-delta">▲ 8.1%</div>
              <svg className="dash-kpi-spark" viewBox="0 0 56 24" fill="none">
                <path d={spark(2)} stroke="var(--sig-cyan)" strokeWidth="1.4"/>
              </svg>
            </div>
            <div className="dash-kpi">
              <div className="dash-kpi-label">Revenue</div>
              <div className="dash-kpi-value count">₹24.6L</div>
              <div className="dash-kpi-delta">▲ 18.2%</div>
              <svg className="dash-kpi-spark" viewBox="0 0 56 24" fill="none">
                <path d={spark(3)} stroke="var(--sig-green)" strokeWidth="1.4"/>
              </svg>
            </div>
            <div className="dash-kpi">
              <div className="dash-kpi-label">TAT (avg)</div>
              <div className="dash-kpi-value count">6.4<span style={{fontSize:13,color:"var(--text-3)"}}>h</span></div>
              <div className="dash-kpi-delta dn">▼ 1.2%</div>
              <svg className="dash-kpi-spark" viewBox="0 0 56 24" fill="none">
                <path d={spark(4)} stroke="var(--sig-amber)" strokeWidth="1.4"/>
              </svg>
            </div>
          </div>

          <div className="dash-chart">
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div className="dash-chart-title">Order volume · last 30 days</div>
              <div style={{display:"flex",gap:12,fontSize:11,color:"var(--text-3)"}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:2,background:"var(--accent)"}}></span> Home collection</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:2,background:"var(--sig-cyan)"}}></span> Walk-in</span>
              </div>
            </div>
            <svg className="dash-chart-svg" viewBox="0 0 760 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45"/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* gridlines */}
              {[0,1,2,3].map(i=>(
                <line key={i} x1="0" x2="760" y1={i*32+10} y2={i*32+10} stroke="var(--line-1)" strokeDasharray="2 4"/>
              ))}
              <path d={areaPath} fill="url(#areaG)"/>
              <path d={linePath} fill="none" stroke="var(--accent-2)" strokeWidth="1.8"/>
              {/* second series */}
              <path d={linePath.replace(/L /g, "L ").split(" ").map((t,i)=>{
                if (!t.includes(",")) return t;
                const [x,y] = t.split(",").map(parseFloat);
                return `${x},${y + 22 + Math.sin(i*0.5)*4}`;
              }).join(" ")} fill="none" stroke="var(--sig-cyan)" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="3 3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientPhone = () => (
  <div className="hero-phone left" aria-hidden="true">
    <div className="hero-phone-screen">
      <div className="ph-status">
        <span>9:41</span>
        <span>●●● 5G</span>
      </div>
      <div className="ph-section">
        <div className="ph-title">Hi, Anjali</div>
        <div className="ph-sub">Your home collection is on the way</div>
        <div className="ph-card">
          <div className="ph-card-line"><span className="lbl">Phlebotomist</span><span className="val">Rohan K.</span></div>
          <div className="ph-card-line"><span className="lbl">ETA</span><span className="val">12 min</span></div>
          <div className="ph-card-line"><span className="lbl">Tests</span><span className="val">CBC · LFT</span></div>
          <div style={{marginTop:10,height:5,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
            <div style={{width:"68%",height:"100%",background:"linear-gradient(90deg,var(--accent-2),var(--accent))",boxShadow:"0 0 8px var(--accent-glow)"}}></div>
          </div>
        </div>
        <div style={{marginTop:14,padding:"10px 12px",border:"1px solid var(--line-2)",borderRadius:10,background:"var(--bg-2)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:11.5,color:"var(--text-3)"}}>Report ready</div>
            <span className="ph-pill green">New</span>
          </div>
          <div style={{fontSize:12,marginTop:4}}>Vitamin D · 28 Apr</div>
        </div>
        <div style={{marginTop:10,padding:"10px 12px",border:"1px solid var(--line-2)",borderRadius:10,background:"var(--bg-2)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:11.5,color:"var(--text-3)"}}>Family</div>
            <span style={{fontSize:11,color:"var(--text-2)"}}>+2</span>
          </div>
          <div style={{fontSize:12,marginTop:4}}>Rajesh · 64y</div>
        </div>
      </div>
    </div>
  </div>
);

const DoctorPhone = () => (
  <div className="hero-phone right" aria-hidden="true">
    <div className="hero-phone-screen">
      <div className="ph-status">
        <span>9:41</span>
        <span>●●● 5G</span>
      </div>
      <div className="ph-section">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div className="ph-title">Dr. Iyer</div>
            <div className="ph-sub">April earnings</div>
          </div>
          <span className="ph-pill purple">Pro</span>
        </div>
        <div style={{marginTop:12,padding:14,borderRadius:12,background:"linear-gradient(135deg,rgba(167,139,250,0.25),rgba(91,141,239,0.1))",border:"1px solid var(--line-3)"}}>
          <div style={{fontSize:10.5,color:"var(--text-3)",letterSpacing:"0.05em",textTransform:"uppercase"}}>Commission</div>
          <div style={{fontFamily:"var(--font-display)",fontSize:26,letterSpacing:"-0.03em",marginTop:4}}>₹48,200</div>
          <div style={{fontSize:11,color:"var(--sig-green)",marginTop:2,fontFamily:"var(--font-mono)"}}>▲ ₹12,400 vs Mar</div>
        </div>
        <div style={{marginTop:14,fontSize:11,color:"var(--text-3)",letterSpacing:"0.05em",textTransform:"uppercase"}}>Recent referrals</div>
        <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
          {[
            {n:"S. Bhat",t:"CBC · TSH",a:"₹680"},
            {n:"M. Khan",t:"Lipid Profile",a:"₹520"},
            {n:"K. Pillai",t:"Full body",a:"₹2,140"}
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11.5}}>
              <div>
                <div style={{color:"var(--text-1)"}}>{r.n}</div>
                <div style={{color:"var(--text-3)",fontSize:10.5}}>{r.t}</div>
              </div>
              <div style={{color:"var(--sig-green)",fontFamily:"var(--font-mono)"}}>{r.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HeroStage = () => {
  const v = useViewport();
  // Mobile: drop the heavy dashboard + dual phones + chips for a single
  // dominant phone visual under a compact KPI bar. Same visual identity,
  // a fraction of the DOM and zero floating-chip animations.
  if (v.mobile) return <MobileHeroStage />;
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-grid-bg"></div>
      <div className="hero-stage-glow"></div>
      <HeroDashboard />
      <PatientPhone />
      <DoctorPhone />

      {/* floating chips */}
      <div className="hero-chip" style={{left:"6%", top:"-10px", animationDelay:"0.3s"}}>
        <span className="ico"><IconWA size={14}/></span>
        <span><strong>WhatsApp report</strong> · sent to Anjali</span>
      </div>
      <div className="hero-chip" style={{right:"4%", top:"40px", animationDelay:"0.8s"}}>
        <span className="ico" style={{background:"linear-gradient(135deg,var(--sig-green),#10b981)"}}><IconCheck size={14}/></span>
        <span><strong>₹680</strong> commission · Dr. Iyer</span>
      </div>
      <div className="hero-chip" style={{left:"3%", bottom:"30px", animationDelay:"1.4s"}}>
        <span className="ico" style={{background:"linear-gradient(135deg,var(--sig-blue),#2563eb)"}}><IconSlot size={14}/></span>
        <span><strong>Slot booked</strong> · 7:30 AM, Bandra W</span>
      </div>
    </div>
  );
};

// Lightweight mobile hero — single phone + a minimal stat strip. No SVG charts,
// no sparklines, no orbiting devices. Pure DOM, GPU-friendly.
const MobileHeroStage = () => (
  <div className="hero-stage-mobile" aria-hidden="true">
    <div className="hero-mobile-glow"></div>

    {/* compact KPI ribbon — the "operational" beat without the chart */}
    <div className="hero-mobile-strip">
      <div>
        <div className="hero-mobile-strip-l">Bookings · today</div>
        <div className="hero-mobile-strip-v">1,284</div>
        <div className="hero-mobile-strip-d">▲ 12.4%</div>
      </div>
      <div>
        <div className="hero-mobile-strip-l">Revenue · MTD</div>
        <div className="hero-mobile-strip-v">₹24.6L</div>
        <div className="hero-mobile-strip-d">▲ 18.2%</div>
      </div>
      <div>
        <div className="hero-mobile-strip-l">TAT</div>
        <div className="hero-mobile-strip-v">6.4<span>h</span></div>
        <div className="hero-mobile-strip-d dn">▼ 1.2%</div>
      </div>
    </div>

    {/* single dominant phone — the patient app */}
    <div className="hero-mobile-phone">
      <div className="hero-mobile-phone-screen">
        <div className="ph-status"><span>9:41</span><span>●●● 5G</span></div>
        <div className="ph-section">
          <div className="ph-title">Hi, Anjali</div>
          <div className="ph-sub">Your home collection is on the way</div>
          <div className="ph-card">
            <div className="ph-card-line"><span className="lbl">Phlebotomist</span><span className="val">Rohan K.</span></div>
            <div className="ph-card-line"><span className="lbl">ETA</span><span className="val">12 min</span></div>
            <div className="ph-card-line"><span className="lbl">Tests</span><span className="val">CBC · LFT</span></div>
            <div style={{marginTop:10,height:5,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
              <div style={{width:"68%",height:"100%",background:"linear-gradient(90deg,var(--accent-2),var(--accent))"}}></div>
            </div>
          </div>
          <div style={{marginTop:12,padding:"10px 12px",border:"1px solid var(--line-2)",borderRadius:10,background:"var(--bg-2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:11.5,color:"var(--text-3)"}}>Report ready</div>
              <div style={{fontSize:12.5,marginTop:2}}>Vitamin D · 28 Apr</div>
            </div>
            <span className="ph-pill green">New</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Nav = ({ headline, onToggleTheme, theme }) => (
  <nav className="nav">
    <div className="nav-inner">
      <a className="nav-brand" href="#">
        <span className="nav-brand-mark"></span>
        <span>LabNexusHealth</span>
      </a>
      <div className="nav-links">
        <a className="nav-link" href="#platform">Platform</a>
        <a className="nav-link" href="#labs">Labs</a>
        <a className="nav-link" href="#doctors">Doctors</a>
        <a className="nav-link" href="#patients">Patients</a>
        <a className="nav-link" href="#automation">Automation</a>
        <a className="nav-link" href="#pricing">Pricing</a>
        <a className="nav-link" href="#faq">FAQ</a>
      </div>
      <a className="nav-cta" href="#demo">Book demo <IconArrow size={13}/></a>
    </div>
  </nav>
);

const Hero = ({ headline, subhead }) => (
  <section className="hero" id="hero" data-screen-label="01 Hero">
    <div className="container">
      <div className="hero-inner">
        <div className="hero-eyebrow reveal">
          <span className="hero-eyebrow-tag">New · v3.0</span>
          <span>Connected diagnostics ecosystem · launched in 47 cities</span>
        </div>
        <h1 className="hero-title reveal" data-comment-anchor="hero-title">
          {headline.before}
          <span className="accent"> {headline.italic}</span>
          {headline.after}
        </h1>
        <p className="hero-sub reveal">{subhead}</p>
        <div className="hero-ctas reveal">
          <a href="#demo" className="btn btn-primary">Book a demo <IconArrow className="arrow" size={14}/></a>
          <a href="#platform" className="btn btn-secondary">Explore the platform</a>
        </div>
        <div className="hero-trustline reveal">Trusted by 220+ pathology brands across India</div>
        <div className="hero-logos reveal">
          <span>Mehta Diagnostics</span>
          <span>Nucleus Labs</span>
          <span>Aarogya Path</span>
          <span>Spectra Diagnostics</span>
          <span>Vitalis Labs</span>
        </div>
      </div>

      <HeroStage />
    </div>
  </section>
);

Object.assign(window, { Hero, Nav, HeroStage, HeroDashboard, PatientPhone, DoctorPhone });
