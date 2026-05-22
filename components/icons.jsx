/* eslint-disable */
// Small icon set used throughout LabNexus.
// All icons inherit currentColor.

const Icon = ({ d, size = 16, stroke = 1.6, fill = "none", children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
);

const IconArrow = (p) => <Icon {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>;
const IconSpark = (p) => <Icon {...p}><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M5.6 5.6l2.8 2.8"/><path d="M15.6 15.6l2.8 2.8"/><path d="M18.4 5.6l-2.8 2.8"/><path d="M8.4 15.6l-2.8 2.8"/></Icon>;
const IconLab = (p) => <Icon {...p}><path d="M9 3h6"/><path d="M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/><path d="M7.5 14h9"/></Icon>;
const IconDoctor = (p) => <Icon {...p}><circle cx="12" cy="8" r="3"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M9 12.5v3.5"/><path d="M9 16a2 2 0 0 0 4 0"/></Icon>;
const IconPatient = (p) => <Icon {...p}><rect x="6" y="2" width="12" height="20" rx="2.4"/><path d="M10 18h4"/></Icon>;
const IconReport = (p) => <Icon {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8 13h8"/><path d="M8 17h6"/></Icon>;
const IconWA = (p) => <Icon {...p}><path d="M21 12a9 9 0 0 1-13.5 7.7L3 21l1.3-4.5A9 9 0 1 1 21 12z"/><path d="M8.5 9.5c0 4 3 7 7 7l1.5-1.5a1 1 0 0 0-.3-1.6l-1.7-.8a1 1 0 0 0-1.2.3l-.6.8a6 6 0 0 1-2.7-2.7l.8-.6a1 1 0 0 0 .3-1.2l-.8-1.7a1 1 0 0 0-1.6-.3z"/></Icon>;
const IconCash = (p) => <Icon {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9h.01"/><path d="M18 15h.01"/></Icon>;
const IconChart = (p) => <Icon {...p}><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16V12"/><path d="M12 16V8"/><path d="M16 16v-6"/></Icon>;
const IconCRM = (p) => <Icon {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M14 20a5 5 0 0 1 7 0"/></Icon>;
const IconSlot = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></Icon>;
const IconShield = (p) => <Icon {...p}><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></Icon>;
const IconBolt = (p) => <Icon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></Icon>;
const IconLink = (p) => <Icon {...p}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></Icon>;
const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M14 19a5 5 0 0 1 7 0"/></Icon>;
const IconBell = (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>;
const IconLayers = (p) => <Icon {...p}><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></Icon>;
const IconKey = (p) => <Icon {...p}><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M14 9l3 3"/></Icon>;
const IconWorkflow = (p) => <Icon {...p}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3h12V9"/><path d="M12 12v3"/></Icon>;
const IconPlus = (p) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>;
const IconDown = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;

Object.assign(window, {
  Icon,
  IconArrow, IconCheck, IconSpark, IconLab, IconDoctor, IconPatient, IconReport,
  IconWA, IconCash, IconChart, IconCRM, IconSlot, IconShield, IconBolt, IconLink,
  IconUsers, IconBell, IconLayers, IconKey, IconWorkflow, IconPlus, IconDown
});

// ─── Viewport hook for adaptive rendering ────────────────────────────────────
// Returns coarse breakpoint flags so heavy components can choose to render
// lighter versions on mobile/tablet rather than relying solely on CSS.
const useViewport = () => {
  const get = () => {
    if (typeof window === "undefined") return { mobile: false, tablet: false, desktop: true };
    const w = window.innerWidth;
    return { mobile: w <= 640, tablet: w > 640 && w <= 1024, desktop: w > 1024 };
  };
  const [v, setV] = React.useState(get);
  React.useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setV(get()));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return v;
};
window.useViewport = useViewport;
