/* eslint-disable */
// Main app + reveal observer + Tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "violet",
  "motion": "on",
  "headlineBefore": "The operating system for",
  "headlineItalic": "modern",
  "headlineAfter": " diagnostics."
}/*EDITMODE-END*/;

const ACCENTS = {
  violet: { c: "#a78bfa", c2: "#c4b5fd", c3: "#7c3aed", glow: "rgba(167,139,250,0.35)", soft: "rgba(167,139,250,0.12)" },
  blue:   { c: "#5b8def", c2: "#93b4f8", c3: "#1e40af", glow: "rgba(91,141,239,0.4)",   soft: "rgba(91,141,239,0.14)" },
  green:  { c: "#34d399", c2: "#6ee7b7", c3: "#047857", glow: "rgba(52,211,153,0.4)",   soft: "rgba(52,211,153,0.14)" },
  amber:  { c: "#f59e0b", c2: "#fbbf24", c3: "#b45309", glow: "rgba(245,158,11,0.4)",   soft: "rgba(245,158,11,0.14)" }
};

const applyTweaks = (t) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", t.theme);
  root.setAttribute("data-motion", t.motion);
  const a = ACCENTS[t.accent] || ACCENTS.violet;
  root.style.setProperty("--accent", a.c);
  root.style.setProperty("--accent-2", a.c2);
  root.style.setProperty("--accent-3", a.c3);
  root.style.setProperty("--accent-glow", a.glow);
  root.style.setProperty("--accent-soft", a.soft);
};

// Map accent key → swatch hex for the color picker
const ACCENT_SWATCHES = [
  { key: "violet", hex: "#a78bfa" },
  { key: "blue",   hex: "#5b8def" },
  { key: "green",  hex: "#34d399" },
  { key: "amber",  hex: "#f59e0b" }
];

// ─────────── Tweaks panel ───────────
const LabNexusTweaks = ({ value, onChange }) => {
  // accent is stored as a key (e.g. "violet"); TweakColor needs a hex value
  const accentHex = (ACCENT_SWATCHES.find(s => s.key === value.accent) || ACCENT_SWATCHES[0]).hex;

  return (
    <TweaksPanel title="LabNexusHealth · Tweaks">
      <TweakSection label="Theme">
        <TweakRadio label="Mode" value={value.theme}
                    options={[{value:"dark",label:"Dark"},{value:"light",label:"Light"}]}
                    onChange={v => onChange({ theme: v })} />
        <TweakColor label="Accent" value={accentHex}
                    options={ACCENT_SWATCHES.map(s => s.hex)}
                    onChange={hex => {
                      const m = ACCENT_SWATCHES.find(s => s.hex.toLowerCase() === String(hex).toLowerCase());
                      if (m) onChange({ accent: m.key });
                    }} />
        <TweakRadio label="Motion" value={value.motion}
                    options={[{value:"on",label:"On"},{value:"off",label:"Off"}]}
                    onChange={v => onChange({ motion: v })} />
      </TweakSection>
      <TweakSection label="Headline">
        <TweakText label="Before" value={value.headlineBefore} onChange={v => onChange({ headlineBefore: v })} />
        <TweakText label="Italic" value={value.headlineItalic} onChange={v => onChange({ headlineItalic: v })} />
        <TweakText label="After"  value={value.headlineAfter}  onChange={v => onChange({ headlineAfter: v })} />
      </TweakSection>
    </TweaksPanel>
  );
};

// ─────────── Reveal-on-scroll observer ───────────
const useRevealObserver = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

// ─────────── App ───────────
const App = () => {
  // single source of truth for tweaks at app level — mirrors useTweaks semantics
  const [t, setT] = React.useState(TWEAK_DEFAULTS);

  const setTweak = React.useCallback((edits) => {
    setT(prev => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
  }, []);

  // apply CSS-level tweaks on any change
  React.useEffect(() => { applyTweaks(t); }, [t.theme, t.accent, t.motion]);

  useRevealObserver();

  return (
    <>
      <Nav />
      <main>
        <Hero
          headline={{ before: t.headlineBefore + " ", italic: t.headlineItalic, after: t.headlineAfter }}
          subhead="All-in-one diagnostics infrastructure for lab operations, doctor referrals, patient bookings, reports, CRM, mobile apps, and growth automation — in one connected operating system."
        />
        <Ecosystem />
        <LabAdminSection />
        <DoctorCRMSection />
        <PatientAppSection />
        <DoctorAppSection />
        <StoryFlow />
        <AutomationSection />
        <FeatureGridSection />
        <EnterpriseSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
      <LabNexusTweaks value={t} onChange={setTweak} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
