// CareDiagnostics — Icons (24×24 strokes, 1.6 weight)
// Hand-tuned set; matches Geist/Lucide cadence. All take {size, color}.

const Ic = ({ size = 22, color = 'currentColor', stroke = 1.6, children, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0, display: 'block' }}>
    {children}
  </svg>
);

const Icon = {
  home:   (p) => <Ic {...p}><path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1h-4v-6h-7v6h-4a1 1 0 0 1-1-1z"/></Ic>,
  calendar:(p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/></Ic>,
  reports:(p) => <Ic {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></Ic>,
  user:   (p) => <Ic {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></Ic>,
  search: (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Ic>,
  bell:   (p) => <Ic {...p}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/></Ic>,
  chevron:(p) => <Ic {...p}><path d="m9 6 6 6-6 6"/></Ic>,
  chevronL:(p) => <Ic {...p}><path d="m15 6-6 6 6 6"/></Ic>,
  chevronD:(p) => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>,
  close:  (p) => <Ic {...p}><path d="M6 6 18 18M18 6 6 18"/></Ic>,
  plus:   (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  minus:  (p) => <Ic {...p}><path d="M5 12h14"/></Ic>,
  check:  (p) => <Ic {...p}><path d="m5 12 5 5 9-11"/></Ic>,
  cart:   (p) => <Ic {...p}><path d="M3 4h2l2.5 12.5a2 2 0 0 0 2 1.5h8a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="21" r="1.2"/><circle cx="18" cy="21" r="1.2"/></Ic>,
  pin:    (p) => <Ic {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></Ic>,
  clock:  (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>,
  shield: (p) => <Ic {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></Ic>,
  beaker: (p) => <Ic {...p}><path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 19l-5-10V3"/><path d="M7.5 14h9"/></Ic>,
  drop:   (p) => <Ic {...p}><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"/></Ic>,
  heart:  (p) => <Ic {...p}><path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5.5-9 10-9 10z"/></Ic>,
  pulse:  (p) => <Ic {...p}><path d="M3 12h4l2-6 4 12 2-6h6"/></Ic>,
  pdf:    (p) => <Ic {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/></Ic>,
  download:(p)=> <Ic {...p}><path d="M12 4v12M6 12l6 6 6-6M5 20h14"/></Ic>,
  share:  (p) => <Ic {...p}><path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></Ic>,
  help:   (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.2.8-1.5 1.4-1.5 2.5M12 17.5v.01"/></Ic>,
  family: (p) => <Ic {...p}><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 19c.8-3 3-4.5 6-4.5s5.2 1.5 6 4.5"/><path d="M15 19c.6-2.2 2-3.5 4-3.5"/></Ic>,
  settings:(p)=> <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.4.6 1 1 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Ic>,
  arrowR: (p) => <Ic {...p}><path d="M5 12h14m-6-6 6 6-6 6"/></Ic>,
  arrowUp:(p) => <Ic {...p}><path d="m6 10 6-6 6 6M12 4v16"/></Ic>,
  sparkle:(p) => <Ic {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></Ic>,
  ai:     (p) => <Ic {...p}><path d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v3M17.5 18.5h3"/></Ic>,
  edit:   (p) => <Ic {...p}><path d="M4 20h4l10-10-4-4L4 16z"/></Ic>,
  filter: (p) => <Ic {...p}><path d="M3 5h18M6 12h12M10 19h4"/></Ic>,
  qr:     (p) => <Ic {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 21h3M21 17v4"/></Ic>,
  phone:  (p) => <Ic {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></Ic>,
  card:   (p) => <Ic {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></Ic>,
  tag:    (p) => <Ic {...p}><path d="M12 3H4v8l9 9 8-8z"/><circle cx="8" cy="7" r="1.2"/></Ic>,
  star:   (p) => <Ic {...p}><path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.1 6.2-5.5-3-5.5 3 1.1-6.2L3 9.6l6.3-.9z"/></Ic>,
  copy:   (p) => <Ic {...p}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></Ic>,
  truck:  (p) => <Ic {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></Ic>,
  flask:  (p) => <Ic {...p}><path d="M10 3h4M11 3v6l-5 9a2 2 0 0 0 1.8 3h8.4A2 2 0 0 0 18 18l-5-9V3"/></Ic>,
  warn:   (p) => <Ic {...p}><path d="M12 4 2 20h20zM12 10v5M12 18v.01"/></Ic>,
  info:   (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></Ic>,
};

window.Icon = Icon;
