// CareDiagnostics — Home, Test Listing, Package Details

// ─── Home Dashboard ─────────────────────────────────────────
function ScreenHome({ onNav, onSearch, onPackage, onCart, onFamily, onLabProfile, layoutVariant = 'default' }) {
  return (
    <CDScreen pad={false}>
      <CDStatus />

      {/* Greeting header */}
      <div style={{ padding: '8px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999, background: 'var(--primary-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--primary-strong)',
            color: 'var(--primary)', fontWeight: 600, fontSize: 14
          }}>PS</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Good morning</div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>Priya</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={iconBtn} onClick={onLabProfile} title="Lab profile"><Icon.qr size={18} /></button>
          <button style={iconBtn} onClick={() => onNav?.('notifications')}>
            <Icon.bell size={18} />
            <span style={{
              position: 'absolute', top: 8, right: 8, width: 7, height: 7,
              borderRadius: 999, background: 'var(--primary)', border: '2px solid var(--bg)'
            }} />
          </button>
        </div>
      </div>

      <div style={{ overflow: 'auto', padding: '14px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Search */}
        <div onClick={() => onSearch?.()} style={{ cursor: 'pointer' }}>
          <CDSearch placeholder="Search tests, packages, conditions…" />
        </div>

        {/* Quick actions — 4 column */}
        <div style={{
          marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8
        }}>
          {[
          { label: 'Book\nTest', icon: <Icon.beaker size={20} />, tone: 'primary', action: () => onSearch?.() },
          { label: 'My\nCart', icon: <Icon.cart size={20} />, tone: 'sage', action: () => onCart?.() },
          { label: 'Family', icon: <Icon.family size={20} />, tone: 'blue', action: () => onFamily?.() },
          { label: 'Track', icon: <Icon.truck size={20} />, tone: 'neutral', action: () => onNav?.('bookings') }].
          map((a, i) => {
            const tones = {
              primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--primary-strong)' },
              sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'rgba(159,200,183,0.2)' },
              blue: { bg: 'var(--blue-soft)', fg: 'var(--blue)', bd: 'rgba(143,180,209,0.2)' },
              neutral: { bg: 'var(--surface-2)', fg: 'var(--text-1)', bd: 'var(--border)' }
            };
            const t = tones[a.tone];
            return (
              <button key={i} onClick={a.action} style={{
                background: 'var(--surface-1)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '14px 8px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                cursor: 'pointer', color: 'var(--text-1)'
              }}>
                <span style={{
                  width: 38, height: 38, borderRadius: 11, background: t.bg, color: t.fg,
                  border: `1px solid ${t.bd}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{a.icon}</span>
                <span style={{ fontSize: 11.5, fontWeight: 500, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.2 }}>{a.label}</span>
              </button>);

          })}
        </div>

        {/* Upcoming booking — placed prominently above the fold */}
        <CDCard onClick={() => onNav?.('bookings')} hover style={{ marginTop: 16, padding: 0, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CDDot color="var(--sage)" pulse />
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--sage)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Upcoming · Today</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>CD-2A8F-31K</span>
          </div>
          {/* Body */}
          <div style={{ padding: '0 16px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{
              width: 44, height: 44, borderRadius: 12, background: 'var(--sage-soft)',
              color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(159,200,183,0.2)', flexShrink: 0
            }}><Icon.truck size={20} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>Lipid Panel + Vitamin D</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>7:00 AM</span>
                <span style={{ color: 'var(--text-3)' }}> · </span>
                13 tests
                <span style={{ color: 'var(--text-3)' }}> · </span>
                For Priya
              </div>
            </div>
            <CDChip tone="sage" size="sm">8 min</CDChip>
          </div>
          {/* Tracking strip */}
          <div style={{ padding: '12px 16px', background: 'var(--surface-2)', borderTop: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 999, background: 'var(--surface-3)',
                  color: 'var(--text-1)', fontSize: 9, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>SK</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Suresh K. is on the way</span>
                <Icon.shield size={11} color="var(--sage)" />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>2.1 km</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1, 1, 0, 0].map((on, i) =>
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
                background: on ? 'var(--sage)' : 'var(--surface-3)' }} />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              {['Booked', 'En route', 'Sample', 'Report'].map((s, i) =>
              <span key={s} style={{
                fontSize: 10, color: i === 1 ? 'var(--sage)' : i < 1 ? 'var(--text-2)' : 'var(--text-3)',
                fontWeight: i === 1 ? 600 : 400
              }}>{s}</span>
              )}
            </div>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', borderTop: '1px solid var(--hairline)' }}>
            <button onClick={(e) => {e.stopPropagation();}} style={{
              flex: 1, padding: 12, border: 'none', background: 'transparent',
              color: 'var(--text-1)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              borderRight: '1px solid var(--hairline)'
            }}>
              <Icon.phone size={13} /> Call
            </button>
            <button onClick={(e) => {e.stopPropagation();}} style={{
              flex: 1, padding: 12, border: 'none', background: 'transparent',
              color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              Track live <Icon.arrowR size={12} />
            </button>
          </div>
        </CDCard>

        {/* AI insight — premium hero card */}
        <CDCard tone="primary" style={{ marginTop: 16, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              width: 26, height: 26, borderRadius: 8,
              background: 'var(--primary)', color: 'var(--on-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}><Icon.sparkle size={14} /></span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Insight for you</span>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--text-1)', marginBottom: 12 }}>
            Your last Vitamin D was <span style={{ fontWeight: 600 }}>borderline low</span> 4 months ago.<br />
            A quick recheck is recommended.
          </div>
          <CDButton variant="primary" size="sm" iconRight={<Icon.arrowR size={14} />} onClick={onPackage}>
            Recheck — ₹699
          </CDButton>
        </CDCard>

        {/* Categories */}
        <CDSection title="Browse by category" action="View all" onAction={onSearch}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px',
            padding: '2px 20px 4px' }} className="cd-scroll">
            {[
            { l: 'Popular', i: <Icon.star size={14} /> },
            { l: 'Full body', i: <Icon.shield size={14} /> },
            { l: 'Diabetes', i: <Icon.drop size={14} /> },
            { l: 'Heart', i: <Icon.heart size={14} /> },
            { l: 'Thyroid', i: <Icon.pulse size={14} /> },
            { l: 'Liver', i: <Icon.flask size={14} /> },
            { l: 'Vitamins', i: <Icon.beaker size={14} /> }].
            map((c, i) =>
            <CDChip key={c.l} tone={i === 0 ? 'primary' : 'neutral'} size="lg" icon={c.i} onClick={onSearch}>{c.l}</CDChip>
            )}
          </div>
        </CDSection>

        {/* Popular packages */}
        <CDSection title="Popular packages" action="See all" onAction={onSearch}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PackageCard
              name="Full Body Premium"
              tests="78 tests · Free home collection"
              price="2,499" original="4,999" save="50% off"
              tone="sage" icon={<Icon.shield size={20} />}
              tags={['Most booked', 'Fasting required']}
              onClick={onPackage} />
            
            <PackageCard
              name="Diabetes Care"
              tests="12 tests · HbA1c included"
              price="649" original="1,200"
              tone="primary" icon={<Icon.drop size={20} />}
              tags={['90 min report']}
              onClick={onPackage} />
            
            <PackageCard
              name="Thyroid Profile (T3/T4/TSH)"
              tests="3 tests"
              price="499" original="900"
              tone="blue" icon={<Icon.pulse size={20} />}
              tags={['Same-day report']}
              onClick={onPackage} />
            
          </div>
        </CDSection>

        {/* Recommendations */}
        <CDSection title="Recommended for you">
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', padding: '2px 20px' }} className="cd-scroll">
            {[
            { n: 'Vitamin B12', p: '599', sub: 'Energy & focus' },
            { n: 'CBC', p: '299', sub: 'Complete blood count' },
            { n: 'HbA1c', p: '449', sub: '3-mo sugar avg' }].
            map((t) =>
            <div key={t.n} onClick={onPackage} style={{
              minWidth: 170, padding: 14, borderRadius: 16, cursor: 'pointer',
              background: 'var(--surface-1)', border: '1px solid var(--border)'
            }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{t.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}>{t.sub}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}>₹{t.p}</span>
                  <button onClick={(e) => {e.stopPropagation();onCart?.();}} style={{
                  width: 28, height: 28, borderRadius: 999, border: '1px solid var(--primary-strong)',
                  background: 'var(--primary-soft)', color: 'var(--primary)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}><Icon.plus size={14} /></button>
                </div>
              </div>
            )}
          </div>
        </CDSection>

        {/* Trust band */}
        <div style={{
          marginTop: 24, padding: 14, borderRadius: 16,
          background: 'var(--surface-1)', border: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12
        }}>
          {[
          { v: '4.9★', l: '1.2L+ reviews' },
          { v: 'NABL', l: 'accredited labs' },
          { v: '6 hrs', l: 'avg report time' }].
          map((t) =>
          <div key={t.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 14, color: 'var(--text-1)' }}>{t.v}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{t.l}</div>
            </div>
          )}
        </div>
      </div>

      <CDBottomNav active="home" onNav={onNav} />
    </CDScreen>);

}

const iconBtn = {
  width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border)',
  background: 'var(--surface-1)', color: 'var(--text-1)', position: 'relative',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
};

// ─── Package Card (used in home + listing) ─────────────────
function PackageCard({ name, tests, price, original, save, tone = 'primary', icon, tags = [], onClick }) {
  const tones = {
    primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--primary-strong)' },
    sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'rgba(159,200,183,0.2)' },
    blue: { bg: 'var(--blue-soft)', fg: 'var(--blue)', bd: 'rgba(143,180,209,0.2)' }
  };
  const t = tones[tone];
  return (
    <CDCard onClick={onClick} hover style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: t.bg, color: t.fg,
        border: `1px solid ${t.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{tests}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {tags.map((tg) => <CDChip key={tg} tone="neutral" size="sm">{tg}</CDChip>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>₹{price}</span>
          {original && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', textDecoration: 'line-through' }}>₹{original}</span>}
          {save && <CDChip size="sm" tone="success">{save}</CDChip>}
        </div>
      </div>
      <button style={{
        width: 36, height: 36, borderRadius: 999, border: '1px solid var(--primary-strong)',
        background: 'var(--primary)', color: 'var(--on-primary)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}><Icon.plus size={18} /></button>
    </CDCard>);

}

// ─── Test Listing / Search ─────────────────────────────────
function ScreenListing({ onBack, onPackage }) {
  const [tab, setTab] = React.useState('Packages');
  return (
    <CDScreen pad={false}>
      <CDStatus />
      <CDTopNav back onBack={onBack} title="Diabetes"
      right={<button style={iconBtn}><Icon.filter size={18} /></button>} />
      <div style={{ padding: '4px 20px 0' }}>
        <CDSearch placeholder="Search within Diabetes…" />
      </div>

      {/* Tabs */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 6, borderBottom: '1px solid var(--hairline)' }}>
        {['Packages', 'Individual tests'].map((t) => {
          const on = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              border: 'none', background: 'transparent', padding: '10px 4px',
              color: on ? 'var(--text-1)' : 'var(--text-3)', fontSize: 14, fontWeight: 600,
              borderBottom: on ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer'
            }}>{t}</button>);

        })}
        <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: 12, color: 'var(--text-3)' }}>24 results</span>
      </div>

      <div style={{ overflow: 'auto', padding: '16px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }} className="cd-scroll">
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 4, overflowX: 'auto' }} className="cd-scroll">
          <CDChip tone="primary" size="md" icon={<Icon.check size={12} />}>Free collection</CDChip>
          <CDChip tone="neutral" size="md">Under ₹999</CDChip>
          <CDChip tone="neutral" size="md">Same-day report</CDChip>
          <CDChip tone="neutral" size="md">Fasting</CDChip>
        </div>

        <PackageCard name="Diabetes Care" tests="12 tests · HbA1c included" price="649" original="1,200"
        tone="primary" icon={<Icon.drop size={20} />} tags={['90 min report', 'Most booked']} onClick={onPackage} />
        <PackageCard name="Diabetes + Kidney" tests="22 tests · KFT + HbA1c" price="999" original="1,800"
        tone="sage" icon={<Icon.shield size={20} />} tags={['Fasting required']} onClick={onPackage} />
        <PackageCard name="Pre-diabetes Screen" tests="6 tests" price="399" original="700"
        tone="blue" icon={<Icon.pulse size={20} />} tags={['No fasting']} onClick={onPackage} />
        <PackageCard name="Diabetic Foot Risk" tests="8 tests + ABI" price="1,199" original="2,200"
        tone="primary" icon={<Icon.heart size={20} />} tags={['Same-day report']} onClick={onPackage} />
      </div>
    </CDScreen>);

}

// ─── Package Details ───────────────────────────────────────
function ScreenPackageDetail({ onBack, onAddCart, onTest }) {
  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack}
      right={<>
          <button style={iconBtn}><Icon.share size={18} /></button>
          <button style={iconBtn}><Icon.heart size={18} /></button>
        </>} />

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Hero */}
        <div style={{
          padding: 20, borderRadius: 20, background: 'linear-gradient(140deg, var(--primary-soft), var(--surface-1))',
          border: '1px solid var(--primary-strong)', marginBottom: 18
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <CDChip tone="primary" size="sm" icon={<Icon.star size={11} />}>Most booked</CDChip>
            <CDChip tone="success" size="sm">50% off</CDChip>
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 24, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            Diabetes Care
          </h1>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>12 parameters · 1 sample · HbA1c included</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>₹649</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-3)', textDecoration: 'line-through' }}>₹1,200</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
            letterSpacing: '0.04em', textTransform: 'uppercase' }}>About this package</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-1)' }}>
            A focused 12-marker check to catch diabetes early or track it on treatment. Covers
            <strong style={{ fontWeight: 600 }}> blood sugar </strong>
            (fasting + 3-month HbA1c),
            <strong style={{ fontWeight: 600 }}> pancreas function </strong>
            via insulin,
            <strong style={{ fontWeight: 600 }}> early kidney damage </strong>
            with microalbumin, and the lipid profile that often shifts with diabetes.
          </p>
          <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 10,
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.info size={14} color="var(--blue)" />
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
              Recommended <strong style={{ color: 'var(--text-1)' }}>annually</strong> for adults 30+ or 6-monthly if diabetic.
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18 }}>
          {[
          { i: <Icon.clock size={16} color="var(--sage)" />, t: '90 min', l: 'report' },
          { i: <Icon.truck size={16} color="var(--blue)" />, t: 'Free', l: 'home collection' },
          { i: <Icon.beaker size={16} color="var(--primary)" />, t: '1 sample', l: 'no repeat' }].
          map((h) =>
          <div key={h.l} style={{
            background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 12, padding: 12, textAlign: 'center'
          }}>
              <span style={{ display: 'inline-flex', marginBottom: 6 }}>{h.i}</span>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{h.t}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{h.l}</div>
            </div>
          )}
        </div>

        {/* What's included */}
        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>What's included (12)</h3>
        <CDCard padded={false}>
          {[
          { n: 'Glucose Fasting (FBS)', sub: 'Blood sugar baseline', count: 1 },
          { n: 'HbA1c', sub: '3-month average sugar', count: 1 },
          { n: 'Insulin Fasting', sub: 'Pancreas function', count: 1 },
          { n: 'Microalbumin', sub: 'Early kidney damage', count: 1 },
          { n: 'Lipid Profile', sub: '5 sub-parameters', count: 5, hasChildren: true }].
          map((t, i) =>
          <button key={t.n} onClick={t.hasChildren ? onTest : undefined} style={{
            width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
            cursor: t.hasChildren ? 'pointer' : 'default', color: 'inherit',
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderBottom: i < 4 ? '1px solid var(--hairline)' : 'none'
          }}>
              <span style={{
              width: 28, height: 28, borderRadius: 8, background: 'var(--sage-soft)',
              color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}><Icon.check size={14} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t.n}
                  {t.hasChildren && <CDChip size="sm" tone="neutral">+5</CDChip>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{t.sub}</div>
              </div>
              {t.hasChildren && <Icon.chevron size={14} color="var(--text-3)" />}
            </button>
          )}
          <button style={{
            width: '100%', padding: 14, border: 'none', background: 'transparent',
            color: 'var(--primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            borderTop: '1px solid var(--hairline)'
          }}>+ View all 12 tests</button>
        </CDCard>

        {/* Prep instructions */}
        <CDCard tone="raised" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon.info size={16} color="var(--warning)" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Before your test</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7 }}>
            <li>Fast for 10–12 hours (water is fine)</li>
            <li>Avoid alcohol 24 hours prior</li>
            <li>Take your usual medications unless advised</li>
          </ul>
        </CDCard>
      </div>

      {/* Sticky CTA */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10, alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Total · 1 patient</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}>₹649</div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onAddCart} iconRight={<Icon.arrowR size={16} />}>
          Add to cart
        </CDButton>
      </div>
    </CDScreen>);

}

// ─── Test Detail (individual test within a package) ────────
function ScreenTestDetail({ onBack, onAddCart }) {
  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack}
      right={<>
          <button style={iconBtn}><Icon.share size={18} /></button>
          <button style={iconBtn}><Icon.help size={18} /></button>
        </>} />

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Hero */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              width: 36, height: 36, borderRadius: 10, background: 'var(--sage-soft)',
              color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(159,200,183,0.2)'
            }}><Icon.heart size={18} /></span>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Cholesterol panel</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>Part of Diabetes Care · also standalone</div>
            </div>
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Lipid Profile
          </h1>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <CDChip tone="neutral" size="sm">5 sub-parameters</CDChip>
            <CDChip tone="warning" size="sm">Fasting required</CDChip>
            <CDChip tone="success" size="sm">Same-day</CDChip>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
            letterSpacing: '0.04em', textTransform: 'uppercase' }}>What it measures</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-1)' }}>
            Measures the fats in your blood to assess
            <strong style={{ fontWeight: 600 }}> heart-disease risk</strong>. Healthy lipids reduce the chance of stroke, heart attack, and arterial disease — especially important alongside diabetes screening.
          </p>
        </div>

        {/* Spec block */}
        <CDCard tone="raised" style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)',
            letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>Specimen & method</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
            ['Sample', '2 ml serum'],
            ['Method', 'Enzymatic photometric'],
            ['Turnaround', '4 hours'],
            ['Lab', 'Apollo · NABL']].
            map(([k, v]) =>
            <div key={k}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{v}</div>
              </div>
            )}
          </div>
        </CDCard>

        {/* Sub-parameters */}
        <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600 }}>Parameters measured</h3>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--text-3)' }}>Each result lands in your report with a healthy range.</p>
        <CDCard padded={false}>
          {[
          { n: 'Total Cholesterol', sub: 'Overall fat in blood', range: '< 200 mg/dL', tone: 'sage' },
          { n: 'HDL Cholesterol', sub: '"Good" — protects arteries', range: '> 40 mg/dL', tone: 'sage' },
          { n: 'LDL Cholesterol', sub: '"Bad" — builds plaque', range: '< 100 mg/dL', tone: 'warning' },
          { n: 'Triglycerides', sub: 'Energy-storage fats', range: '< 150 mg/dL', tone: 'sage' },
          { n: 'VLDL Cholesterol', sub: 'Triglyceride carrier', range: '< 30 mg/dL', tone: 'sage' },
          { n: 'LDL / HDL Ratio', sub: 'Cardiac risk index', range: '< 3.5', tone: 'sage' }].
          map((p, i, arr) => {
            const c = p.tone === 'sage' ? 'var(--sage)' : p.tone === 'warning' ? 'var(--warning)' : 'var(--danger)';
            const bg = p.tone === 'sage' ? 'var(--sage-soft)' : p.tone === 'warning' ? 'rgba(232,197,106,0.12)' : 'rgba(224,122,110,0.12)';
            return (
              <div key={p.n} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
                borderTop: i ? '1px solid var(--hairline)' : 'none'
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 8, background: bg, color: c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600
                }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{p.sub}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Range</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: c, marginTop: 2 }}>{p.range}</div>
                </div>
              </div>);

          })}
        </CDCard>

        {/* Prep */}
        <CDCard style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 10, background: 'rgba(232,197,106,0.12)',
            color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}><Icon.warn size={16} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Fast 10–12 hours before sample</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Water is fine. Avoid alcohol 24 hours prior — it skews triglycerides.</div>
          </div>
        </CDCard>

        {/* Why this matters */}
        <CDCard tone="primary" style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon.sparkle size={14} color="var(--primary)" />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Why doctors ask for this</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5 }}>
            Diabetes accelerates plaque build-up. The Lipid Profile pairs with HbA1c to track <strong>heart risk</strong> alongside sugar control — usually rechecked every 6 months.
          </div>
        </CDCard>
      </div>

      {/* Sticky CTA — standalone purchase option */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10, alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Standalone · 1 patient</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}>₹399</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textDecoration: 'line-through' }}>₹700</span>
          </div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onAddCart} iconRight={<Icon.plus size={16} />}>
          Add test
        </CDButton>
      </div>
    </CDScreen>);

}

Object.assign(window, { ScreenHome, ScreenListing, ScreenPackageDetail, PackageCard });