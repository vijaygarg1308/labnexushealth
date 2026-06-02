// CareDiagnostics — Reusable component primitives
// All consume tokens from tokens.css. Each takes minimal props; styles use vars.

// ─── Screen container ───────────────────────────────────────
// Flex column that fills the phone. Screens manage their own scroll regions
// internally so sticky elements (top nav, bottom nav, CTAs) stay pinned.
function CDScreen({ children, style = {} }) {
  return (
    <div className="cd-screen" style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--bg)', color: 'var(--text-1)', overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Status bar (iOS-style, themed) ─────────────────────────
function CDStatus({ tone = 'auto' }) {
  // tone: 'auto' uses --text-1; 'light' forces white; 'dark' forces dark.
  const color = tone === 'light' ? '#fff' : tone === 'dark' ? '#000' : 'var(--text-1)';
  return (
    <div style={{
      height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 28px 0', flexShrink: 0,
    }}>
      <span style={{ fontWeight: 600, fontSize: 16, color, fontFeatureSettings: '"tnum" 1' }}>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.95 }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.6" fill={color}/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill={color}/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" fill={color}/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill={color}/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 3a8 8 0 0 1 6 2.5l1-1A9.5 9.5 0 0 0 7.5 1.5 9.5 9.5 0 0 0 .5 4.5l1 1A8 8 0 0 1 7.5 3z" fill={color}/>
          <circle cx="7.5" cy="9.5" r="1.2" fill={color}/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={color} strokeOpacity="0.4"/>
          <rect x="2" y="2" width="18" height="8" rx="1.8" fill={color}/>
          <rect x="23" y="4" width="1.5" height="4" rx="0.7" fill={color} fillOpacity="0.5"/>
        </svg>
      </span>
    </div>
  );
}

// ─── Top nav bar (back, title, action) ──────────────────────
function CDTopNav({ title, back, onBack, right, large = false, sub }) {
  return (
    <div style={{
      padding: '8px var(--pad-screen) 4px',
      display: 'flex', flexDirection: 'column', gap: 4,
      flexShrink: 0, background: 'var(--bg)',
    }}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
          {back && (
            <button onClick={onBack} style={{
              width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border)',
              background: 'var(--surface-1)', color: 'var(--text-1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0,
            }}>
              <Icon.chevronL size={20}/>
            </button>
          )}
        </div>
        {!large && (
          <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>{title}</div>
        )}
        <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{right}</div>
      </div>
      {large && (
        <div style={{ padding: '8px 0 4px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600,
                        fontSize: 28, letterSpacing: '-0.025em', lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 4 }}>{sub}</div>}
        </div>
      )}
    </div>
  );
}

// ─── Button ─────────────────────────────────────────────────
function CDButton({ children, variant = 'primary', size = 'md', full, icon, iconRight, onClick, disabled, style = {} }) {
  const sizes = {
    sm: { h: 36, px: 14, fs: 13 },
    md: { h: 48, px: 18, fs: 15 },
    lg: { h: 56, px: 22, fs: 16 },
  };
  const s = sizes[size];
  const variants = {
    primary: { bg: 'var(--primary)', color: 'var(--on-primary)', border: 'none', shadow: 'var(--shadow-sm)' },
    secondary: { bg: 'var(--surface-2)', color: 'var(--text-1)', border: '1px solid var(--border)', shadow: 'none' },
    ghost: { bg: 'transparent', color: 'var(--text-1)', border: 'none', shadow: 'none' },
    soft: { bg: 'var(--primary-soft)', color: 'var(--primary)', border: 'none', shadow: 'none' },
    danger: { bg: 'var(--danger)', color: '#fff', border: 'none', shadow: 'var(--shadow-sm)' },
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: s.h, padding: `0 ${s.px}px`, borderRadius: 999,
      background: v.bg, color: v.color, border: v.border, boxShadow: v.shadow,
      fontWeight: 600, fontSize: s.fs, letterSpacing: '-0.005em',
      width: full ? '100%' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, display: 'inline-flex', alignItems: 'center',
      justifyContent: 'center', gap: 8, transition: 'transform .15s, background .15s',
      ...style,
    }}
    onMouseDown={(e)=>{ if(!disabled) e.currentTarget.style.transform='scale(0.97)';}}
    onMouseUp={(e)=>{ e.currentTarget.style.transform='scale(1)';}}
    onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)';}}>
      {icon}
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      {iconRight}
    </button>
  );
}

// ─── Card ───────────────────────────────────────────────────
function CDCard({ children, padded = true, hover, onClick, style = {}, tone = 'surface' }) {
  const tones = {
    surface: { bg: 'var(--surface-1)', border: '1px solid var(--border)' },
    raised:  { bg: 'var(--surface-2)', border: '1px solid var(--border)' },
    primary: { bg: 'var(--primary-soft)', border: '1px solid var(--primary-strong)' },
    sage:    { bg: 'var(--sage-soft)', border: '1px solid rgba(159, 200, 183, 0.18)' },
  };
  const t = tones[tone];
  return (
    <div onClick={onClick} style={{
      background: t.bg, border: t.border, borderRadius: 'var(--r-lg)',
      padding: padded ? 'var(--pad-card)' : 0, boxShadow: 'var(--shadow-sm)',
      cursor: onClick ? 'pointer' : 'default', transition: 'transform .15s, border-color .15s',
      ...style,
    }}
    onMouseEnter={(e)=>{ if(hover) e.currentTarget.style.transform='translateY(-1px)';}}
    onMouseLeave={(e)=>{ if(hover) e.currentTarget.style.transform='translateY(0)';}}>
      {children}
    </div>
  );
}

// ─── Chip ───────────────────────────────────────────────────
function CDChip({ children, tone = 'neutral', icon, size = 'md', selected, onClick }) {
  const tones = {
    neutral: { bg: 'var(--surface-2)', color: 'var(--text-2)', border: 'var(--border)' },
    primary: { bg: 'var(--primary-soft)', color: 'var(--primary)', border: 'var(--primary-strong)' },
    sage:    { bg: 'var(--sage-soft)', color: 'var(--sage)', border: 'rgba(159,200,183,0.2)' },
    blue:    { bg: 'var(--blue-soft)', color: 'var(--blue)', border: 'rgba(143,180,209,0.2)' },
    success: { bg: 'rgba(126,190,157,0.12)', color: 'var(--success)', border: 'rgba(126,190,157,0.22)' },
    warning: { bg: 'rgba(232,197,106,0.12)', color: 'var(--warning)', border: 'rgba(232,197,106,0.22)' },
    danger:  { bg: 'rgba(224,122,110,0.12)', color: 'var(--danger)', border: 'rgba(224,122,110,0.22)' },
    solid:   { bg: 'var(--surface-3)', color: 'var(--text-1)', border: 'var(--border-strong)' },
  };
  const t = selected ? tones.primary : tones[tone];
  const h = size === 'sm' ? 26 : size === 'lg' ? 38 : 32;
  const fs = size === 'sm' ? 11 : size === 'lg' ? 14 : 13;
  return (
    <span onClick={onClick} style={{
      height: h, padding: `0 ${size==='sm'?8:12}px`, borderRadius: 999,
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
      fontSize: fs, fontWeight: 500, letterSpacing: '-0.005em',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      cursor: onClick ? 'pointer' : 'default', whiteSpace: 'nowrap',
    }}>
      {icon}{children}
    </span>
  );
}

// ─── Status dot ────────────────────────────────────────────
function CDDot({ color = 'var(--success)', size = 8, pulse = false }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size }}>
      <span style={{ width: size, height: size, borderRadius: 999, background: color, display: 'block' }}/>
      {pulse && <span style={{
        position: 'absolute', inset: 0, borderRadius: 999, background: color, opacity: 0.4,
        animation: 'cdPulse 1.6s ease-out infinite',
      }}/>}
    </span>
  );
}

// ─── Bottom navigation ─────────────────────────────────────
function CDBottomNav({ active = 'home', onNav }) {
  const items = [
    { id: 'home', label: 'Home', icon: Icon.home },
    { id: 'bookings', label: 'Bookings', icon: Icon.calendar },
    { id: 'reports', label: 'Reports', icon: Icon.reports },
    { id: 'profile', label: 'Profile', icon: Icon.user },
  ];
  return (
    <div style={{
      flexShrink: 0, padding: '8px 16px 24px', background: 'var(--bg)',
      borderTop: '1px solid var(--hairline)',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4,
        background: 'var(--surface-1)', border: '1px solid var(--border)',
        borderRadius: 999, padding: 6, boxShadow: 'var(--shadow-sm)',
      }}>
        {items.map((it) => {
          const on = active === it.id;
          return (
            <button key={it.id} onClick={() => onNav?.(it.id)} style={{
              height: 44, borderRadius: 999, border: 'none',
              background: on ? 'var(--primary)' : 'transparent',
              color: on ? 'var(--on-primary)' : 'var(--text-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: '0 10px',
              transition: 'background .2s, color .2s',
            }}>
              <it.icon size={18}/>
              {on && <span>{it.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Search bar ────────────────────────────────────────────
function CDSearch({ placeholder = 'Search tests, packages…', value, onChange, onFocus, style = {} }) {
  return (
    <div style={{
      height: 50, borderRadius: 16, background: 'var(--surface-1)',
      border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 12, ...style,
    }}>
      <Icon.search size={18} color="var(--text-3)"/>
      <input value={value || ''} onChange={(e)=>onChange?.(e.target.value)} onFocus={onFocus}
        placeholder={placeholder} style={{
          border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0, width: '100%',
          color: 'var(--text-1)', fontSize: 14, fontFamily: 'inherit',
        }}/>
      <span style={{
        padding: '2px 8px', borderRadius: 6, fontSize: 10, color: 'var(--text-3)',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
      }}>⌘ K</span>
    </div>
  );
}

// ─── Row item ──────────────────────────────────────────────
function CDRow({ icon, label, sub, right, onClick, danger }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 'auto', minHeight: 'var(--row-h)',
      padding: '14px 0', border: 'none', background: 'transparent',
      display: 'flex', alignItems: 'center', gap: 14, cursor: onClick ? 'pointer' : 'default',
      borderBottom: '1px solid var(--hairline)', color: 'inherit', textAlign: 'left',
    }}>
      {icon && (
        <span style={{
          width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)',
          border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: danger ? 'var(--danger)' : 'var(--text-2)', flexShrink: 0,
        }}>{icon}</span>
      )}
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: danger ? 'var(--danger)' : 'var(--text-1)' }}>{label}</span>
        {sub && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{sub}</span>}
      </span>
      <span style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        {right} {onClick && <Icon.chevron size={16} color="var(--text-3)"/>}
      </span>
    </button>
  );
}

// ─── Sparkline (mini chart) ────────────────────────────────
function CDSparkline({ values = [], width = 80, height = 28, color = 'var(--sage)', range }) {
  const min = range?.[0] ?? Math.min(...values);
  const max = range?.[1] ?? Math.max(...values);
  const span = max - min || 1;
  const w = width, h = height;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (w - 4) + 2;
    const y = h - 2 - ((v - min) / span) * (h - 4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const lastX = (w - 4) + 2;
  const lastY = h - 2 - ((values[values.length-1] - min) / span) * (h - 4);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block'}}>
      <polyline fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" points={pts}/>
      <circle cx={lastX} cy={lastY} r="2.4" fill={color}/>
    </svg>
  );
}

// ─── Section header ────────────────────────────────────────
function CDSection({ title, action, onAction, children, style = {} }) {
  return (
    <section style={{ marginTop: 24, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{
          margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-1)',
        }}>{title}</h3>
        {action && (
          <button onClick={onAction} style={{
            border: 'none', background: 'transparent', color: 'var(--primary)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: 2,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{action} <Icon.chevron size={14}/></button>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Logo mark ─────────────────────────────────────────────
function CDLogo({ size = 28, color = 'var(--primary)' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="8" fill={color}/>
        <path d="M9 14h10M14 9v10" stroke="var(--on-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 19c2-1 3.5-2 5-2s3 1 5 2" stroke="var(--on-primary)" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17,
        letterSpacing: '-0.025em', color: 'var(--text-1)',
      }}>CareDiagnostics</span>
    </span>
  );
}

// Pulse animation
const cdAnimStyle = document.createElement('style');
cdAnimStyle.textContent = `
  @keyframes cdPulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.4); opacity: 0; } }
  @keyframes cdShimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
  @keyframes cdFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes cdSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes cdScaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  .cd-skeleton {
    background: linear-gradient(90deg, var(--surface-1) 0%, var(--surface-2) 50%, var(--surface-1) 100%);
    background-size: 400px 100%;
    animation: cdShimmer 1.4s linear infinite;
    border-radius: 8px;
  }
`;
document.head.appendChild(cdAnimStyle);

Object.assign(window, {
  CDScreen, CDStatus, CDTopNav, CDButton, CDCard, CDChip, CDDot,
  CDBottomNav, CDSearch, CDRow, CDSparkline, CDSection, CDLogo,
});
