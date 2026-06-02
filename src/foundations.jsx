// CareDiagnostics — Foundation artboards (color, type, components catalogue)

// Resolve a CSS variable to its computed hex/rgb. Reactive to theme via tweakchange.
function useTokenColor(token) {
  const [v, setV] = React.useState('');
  React.useEffect(() => {
    const read = () => {
      try {
        const c = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
        setV(c);
      } catch {}
    };
    read();
    const onTweak = () => requestAnimationFrame(read);
    window.addEventListener('tweakchange', onTweak);
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { window.removeEventListener('tweakchange', onTweak); obs.disconnect(); };
  }, [token]);
  return v;
}

// Convert any CSS color to detailed { hex, rgb, alpha } parts.
function toColorParts(input) {
  if (!input) return { hex: '', rgb: '', alpha: 1 };
  const s = input.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(s)) {
    const hex = s.toUpperCase();
    // expand short hex
    const long = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex.length === 9
        ? hex.slice(0, 7)
        : hex;
    const r = parseInt(long.slice(1, 3), 16);
    const g = parseInt(long.slice(3, 5), 16);
    const b = parseInt(long.slice(5, 7), 16);
    return { hex: long, rgb: `${r} ${g} ${b}`, alpha: 1 };
  }
  const m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const parts = m[1].split(',').map((p) => p.trim());
    const r = parseInt(parts[0], 10), g = parseInt(parts[1], 10), b = parseInt(parts[2], 10);
    const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
    return { hex: `#${pad(r)}${pad(g)}${pad(b)}`.toUpperCase(), rgb: `${r} ${g} ${b}`, alpha: a };
  }
  return { hex: s.toUpperCase(), rgb: '', alpha: 1 };
}

// Convert any CSS color (hex, rgb, rgba, oklch) to a clean HEX or rgba label.
function toHexLabel(input) {
  const p = toColorParts(input);
  if (!p.hex) return '';
  if (p.alpha < 1) return `${p.hex} · ${Math.round(p.alpha * 100)}%`;
  return p.hex;
}
function pad(n) { return n.toString(16).padStart(2, '0'); }

// ─── Color palette ─────────────────────────────────────────
function ArtColors() {
  const surfaces = [
    { name: 'Background',  token: '--bg',         sub: 'Canvas behind everything' },
    { name: 'Surface 1',   token: '--surface-1',  sub: 'Cards, sheets, nav' },
    { name: 'Surface 2',   token: '--surface-2',  sub: 'Raised cards, fields' },
    { name: 'Surface 3',   token: '--surface-3',  sub: 'Pressed states' },
  ];
  const brand = [
    { name: 'Primary',         token: '--primary',         sub: 'Clay — CTAs, focus' },
    { name: 'Primary high',    token: '--primary-hi',      sub: 'Hover, gradient' },
    { name: 'Primary soft',    token: '--primary-soft',    sub: 'Tinted backgrounds' },
    { name: 'Primary strong',  token: '--primary-strong',  sub: 'Borders, ring' },
  ];
  const accent = [
    { name: 'Sage',  token: '--sage',  sub: 'Normal, in-range, trust' },
    { name: 'Blue',  token: '--blue',  sub: 'Info, addresses' },
  ];
  const status = [
    { name: 'Success', token: '--success', sub: 'Confirmation, paid' },
    { name: 'Warning', token: '--warning', sub: 'Borderline, watch' },
    { name: 'Danger',  token: '--danger',  sub: 'Out of range, errors' },
  ];
  const text = [
    { name: 'Text 1',  token: '--text-1',  sub: 'Primary copy' },
    { name: 'Text 2',  token: '--text-2',  sub: 'Secondary copy' },
    { name: 'Text 3',  token: '--text-3',  sub: 'Meta, captions' },
  ];

  return (
    <div className="cd-screen" style={{ width: '100%', minHeight: '100%', background: 'var(--bg)', padding: 32, color: 'var(--text-1)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.035em' }}>Color</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em' }}>Theme-reactive</div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.5, maxWidth: 520 }}>
        Warm clay anchors action. Espresso surfaces let signal breathe. Sage signals normal, amber flags watch, coral warns. All tokens auto-swap with theme.
      </div>

      <ColorGroup label="Surfaces" tokens={surfaces} cols={4}/>
      <ColorGroup label="Brand · Primary (Clay)" tokens={brand} cols={4}/>
      <ColorGroup label="Accents" tokens={accent} cols={3}/>
      <ColorGroup label="Status" tokens={status} cols={3}/>
      <ColorGroup label="Text" tokens={text} cols={3}/>
    </div>
  );
}

function ColorGroup({ label, tokens, cols = 3 }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
        {tokens.map((t) => <Swatch key={t.token} {...t}/>)}
      </div>
    </div>
  );
}

function Swatch({ name, token, sub }) {
  const computed = useTokenColor(token);
  const { hex, rgb, alpha } = toColorParts(computed);
  return (
    <div style={{
      background: 'var(--surface-1)', border: '1px solid var(--border)',
      borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* color block */}
      <div style={{
        width: '100%', height: 72, position: 'relative',
        background: `var(${token})`,
        borderBottom: '1px solid var(--border)',
      }}>
        {alpha < 1 && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
                              linear-gradient(-45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.04) 75%),
                              linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.04) 75%)`,
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0',
            mixBlendMode: 'overlay', pointerEvents: 'none',
          }}/>
        )}
        <span style={{
          position: 'absolute', top: 8, left: 10,
          padding: '2px 6px', borderRadius: 4,
          fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500,
          background: 'rgba(14,12,10,0.55)', color: '#F4ECDF',
          letterSpacing: '0.04em',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        }}>{token}</span>
        {alpha < 1 && (
          <span style={{
            position: 'absolute', top: 8, right: 10,
            padding: '2px 6px', borderRadius: 4,
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
            background: 'rgba(14,12,10,0.55)', color: '#F4ECDF',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          }}>{Math.round(alpha * 100)}%</span>
        )}
      </div>
      {/* Meta */}
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.2 }}>{name}</div>
        {sub && <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 3, lineHeight: 1.35 }}>{sub}</div>}
        <div style={{
          marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--hairline)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              color: 'var(--text-1)', letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>{hex || '—'}</span>
            {rgb && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)',
                letterSpacing: '0.04em', whiteSpace: 'nowrap',
              }}>{rgb}</span>
            )}
          </div>
          <button
            onClick={() => { try { navigator.clipboard?.writeText(hex); } catch {} }}
            title="Copy hex"
            style={{
              width: 24, height: 24, borderRadius: 6, border: '1px solid var(--border)',
              background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
            <Icon.copy size={11}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Type scale ────────────────────────────────────────────
function ArtType() {
  const specs = [
    { tag: 'Display', detail: '32 / 36 · -0.035em · 600', text: 'Care that comes to your door',
      size: 32, weight: 600, ls: '-0.035em', lh: 1.05, font: 'var(--font-display)' },
    { tag: 'H1', detail: '24 / 28 · -0.03em · 600', text: 'Your cholesterol looks mostly good',
      size: 24, weight: 600, ls: '-0.03em', lh: 1.1, font: 'var(--font-display)' },
    { tag: 'H2', detail: '20 / 24 · -0.02em · 600', text: 'Popular packages',
      size: 20, weight: 600, ls: '-0.02em', lh: 1.2, font: 'var(--font-sans)' },
    { tag: 'H3', detail: '16 / 20 · -0.01em · 600', text: 'Diabetes Care',
      size: 16, weight: 600, ls: '-0.01em', lh: 1.25, font: 'var(--font-sans)' },
    { tag: 'Body', detail: '15 / 22 · 400', text: 'A quick recheck of Vitamin D is recommended.',
      size: 15, weight: 400, lh: 1.45, font: 'var(--font-sans)', color: 'var(--text-2)' },
    { tag: 'Small', detail: '13 / 18 · 400', text: 'Phlebotomist arriving in 8 minutes',
      size: 13, weight: 400, lh: 1.4, font: 'var(--font-sans)', color: 'var(--text-3)' },
    { tag: 'Caption', detail: '11 / 14 · 600 · 0.04em · UPPER', text: 'EN ROUTE · TODAY',
      size: 11, weight: 600, ls: '0.06em', lh: 1.3, font: 'var(--font-sans)', color: 'var(--sage)', upper: true },
    { tag: 'Mono', detail: '14 · 500 · tnum', text: '₹1,281.00 · CD-2A8F-31K · 132 mg/dL',
      size: 14, weight: 500, font: 'var(--font-mono)' },
  ];

  return (
    <div className="cd-screen" style={{ width: '100%', minHeight: '100%', background: 'var(--bg)', padding: 32, color: 'var(--text-1)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.035em' }}>Typography</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em' }}>Geist · Geist Mono</div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.5, maxWidth: 520 }}>
        Tight letterspacing on display sets, generous line-height on body. Mono with tabular figures for IDs, money, and lab values.
      </div>

      {/* Weight ladder */}
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Weights</div>
      <div style={{
        padding: 16, borderRadius: 14, background: 'var(--surface-1)',
        border: '1px solid var(--border)', marginBottom: 24,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {[
          { w: 400, n: 'Regular' },
          { w: 500, n: 'Medium' },
          { w: 600, n: 'Semibold' },
          { w: 700, n: 'Bold' },
        ].map((w) => (
          <div key={w.w} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', width: 70, flexShrink: 0 }}>{w.w} · {w.n}</span>
            <span style={{ fontSize: 22, fontWeight: w.w, letterSpacing: '-0.02em' }}>Diagnostics</span>
          </div>
        ))}
      </div>

      {/* Specimens */}
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Scale</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {specs.map((row, i) => (
          <div key={i} style={{
            padding: '16px 16px 14px', borderRadius: 14,
            background: 'var(--surface-1)', border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{row.tag}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.03em' }}>{row.detail}</span>
            </div>
            <div style={{
              fontFamily: row.font, fontSize: row.size, fontWeight: row.weight,
              letterSpacing: row.ls, lineHeight: row.lh || 1.2,
              color: row.color || 'var(--text-1)',
              textTransform: row.upper ? 'uppercase' : 'none',
            }}>{row.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component catalog ─────────────────────────────────────
function ArtComponents() {
  return (
    <div className="cd-screen" style={{ width: '100%', minHeight: '100%', background: 'var(--bg)', padding: 32, color: 'var(--text-1)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 32, letterSpacing: '-0.035em' }}>Components</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em' }}>15 atoms</div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.5 }}>Atoms that power every screen.</div>

      <Cat label="Buttons · primary / secondary / soft / ghost">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <CDButton variant="primary" size="md">Pay securely</CDButton>
          <CDButton variant="primary" size="md" iconRight={<Icon.arrowR size={14}/>}>Continue</CDButton>
          <CDButton variant="secondary" size="md">Cancel</CDButton>
          <CDButton variant="soft" size="md">Edit</CDButton>
          <CDButton variant="ghost" size="md">Skip</CDButton>
          <CDButton variant="primary" size="sm">Add</CDButton>
          <CDButton variant="primary" size="lg" iconRight={<Icon.shield size={16}/>}>Confirm</CDButton>
        </div>
      </Cat>

      <Cat label="Status & category chips">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <CDChip tone="success">Normal</CDChip>
          <CDChip tone="warning">Borderline</CDChip>
          <CDChip tone="danger">High</CDChip>
          <CDChip tone="sage" icon={<CDDot color="var(--sage)" pulse/>}>En route</CDChip>
          <CDChip tone="primary" icon={<Icon.star size={11}/>}>Most booked</CDChip>
          <CDChip tone="blue" icon={<Icon.check size={11}/>}>Free collection</CDChip>
          <CDChip tone="neutral">Fasting</CDChip>
        </div>
      </Cat>

      <Cat label="Cards · tone variants">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <CDCard><div style={{ fontSize: 12, fontWeight: 600 }}>Surface</div><div style={{ fontSize: 10, color: 'var(--text-3)' }}>Default cards</div></CDCard>
          <CDCard tone="raised"><div style={{ fontSize: 12, fontWeight: 600 }}>Raised</div><div style={{ fontSize: 10, color: 'var(--text-3)' }}>Bill sections</div></CDCard>
          <CDCard tone="primary"><div style={{ fontSize: 12, fontWeight: 600 }}>Primary</div><div style={{ fontSize: 10, color: 'var(--text-2)' }}>AI insights</div></CDCard>
          <CDCard tone="sage"><div style={{ fontSize: 12, fontWeight: 600 }}>Sage</div><div style={{ fontSize: 10, color: 'var(--text-2)' }}>Trust, success</div></CDCard>
        </div>
      </Cat>

      <Cat label="Inputs · search, field, OTP">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CDSearch placeholder="Search tests, packages…"/>
          <div style={{
            display: 'flex', height: 52, borderRadius: 14, background: 'var(--surface-1)',
            border: '1.5px solid var(--primary)', boxShadow: '0 0 0 4px var(--primary-soft)',
            padding: '0 14px', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>FULL NAME</span>
            <span style={{ flex: 1 }}/>
            <span style={{ fontSize: 14 }}>Priya Sharma</span>
          </div>
          {/* OTP */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {[...'482  '].slice(0, 6).map((d, i) => {
              const filled = d !== ' ';
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 10,
                  background: filled ? 'var(--surface-2)' : 'var(--surface-1)',
                  border: i === 3 ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: i === 3 ? '0 0 0 3px var(--primary-soft)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-mono)',
                  color: filled ? 'var(--text-1)' : 'var(--text-3)',
                }}>{filled ? d : ''}</div>
              );
            })}
          </div>
        </div>
      </Cat>

      <Cat label="Bottom navigation">
        <CDBottomNav active="home"/>
      </Cat>

      <Cat label="Data visualization · sparkline + range">
        <CDCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>LDL trend (4 visits)</span>
            <CDSparkline values={[112,118,124,132]} width={100} height={26} color="var(--warning)"/>
          </div>
          <RangeBar value={132} min={0} max={240} segments={[
            { from: 0, to: 130, color: 'var(--sage)', label: 'Optimal' },
            { from: 130, to: 160, color: 'var(--warning)', label: 'Borderline' },
            { from: 160, to: 240, color: 'var(--danger)', label: 'High' },
          ]}/>
        </CDCard>
      </Cat>

      <Cat label="Empty state">
        <CDCard tone="raised" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 24 }}>
          <span style={{
            width: 48, height: 48, borderRadius: 14, background: 'var(--primary-soft)',
            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}><Icon.reports size={22}/></span>
          <div style={{ fontSize: 14, fontWeight: 600 }}>No reports yet</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4, maxWidth: 220 }}>Book your first test and your reports will appear here.</div>
          <CDButton variant="primary" size="sm" style={{ marginTop: 12 }}>Browse tests</CDButton>
        </CDCard>
      </Cat>
    </div>
  );
}

function Cat({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>{label}</div>
      {children}
    </div>
  );
}

Object.assign(window, { ArtColors, ArtType, ArtComponents });
