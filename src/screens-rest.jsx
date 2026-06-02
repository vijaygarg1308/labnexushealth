// CareDiagnostics — Bookings tracking, Reports list, Report detail (premium), Profile, Notifications

// ─── My Bookings (with active tracking) ─────────────────────
function ScreenBookings({ onNav, onDetail, initialTab = 'Upcoming' }) {
  const [tab, setTab] = React.useState(initialTab);
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav title="Bookings" large/>

      {/* Tabs */}
      <div style={{ padding: '8px 20px 0', display: 'flex', gap: 4, borderBottom: '1px solid var(--hairline)' }}>
        {['Upcoming','Past'].map((t) => {
          const on = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              border: 'none', background: 'transparent', padding: '10px 16px 12px',
              color: on ? 'var(--text-1)' : 'var(--text-3)', fontSize: 14, fontWeight: 600,
              borderBottom: on ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer',
            }}>{t}</button>
          );
        })}
      </div>

      {tab === 'Upcoming' ? (
        <div style={{ overflow: 'auto', padding: '16px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }} className="cd-scroll">
          {/* Upcoming */}
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Upcoming · 1</div>
          <CDCard onClick={onDetail} hover style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 38, height: 38, borderRadius: 12, background: 'var(--sage-soft)',
              color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(159,200,183,0.18)',
            }}><Icon.truck size={18}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Lipid Panel + Vitamin D</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>Today, 7:00 AM</span> · For Priya
              </div>
            </div>
            <CDChip tone="sage" size="sm" icon={<CDDot color="var(--sage)" pulse/>}>8 min</CDChip>
            <Icon.chevron size={16} color="var(--text-3)"/>
          </CDCard>

          {/* Past preview */}
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 4 }}>Recent</div>
          {[
            { n: 'CBC + ESR', date: 'Mar 02', status: 'Report ready', tone: 'sage' },
            { n: 'Thyroid Profile', date: 'Feb 14', status: 'Report ready', tone: 'sage' },
            { n: 'Full Body Premium', date: 'Dec 22', status: 'Report ready', tone: 'sage' },
          ].map((b) => (
            <CDCard key={b.n} hover style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 38, height: 38, borderRadius: 12, background: 'var(--surface-2)',
                color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.beaker size={18}/></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{b.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{b.date} · For Priya</div>
              </div>
              <CDChip tone={b.tone} size="sm">{b.status}</CDChip>
              <Icon.chevron size={16} color="var(--text-3)"/>
            </CDCard>
          ))}
        </div>
      ) : (
        <PastBookings/>
      )}

      <CDBottomNav active="bookings" onNav={onNav}/>
    </CDScreen>
  );
}

// ─── Past Bookings list ────────────────────────────────────
function PastBookings() {
  const groups = [
    { period: 'March 2026', items: [
      { n: 'CBC + ESR', date: 'Mar 02', for: 'Priya', amount: '₹399', status: 'Report ready', tone: 'sage' },
    ]},
    { period: 'February 2026', items: [
      { n: 'Thyroid Profile', date: 'Feb 14', for: 'Priya', amount: '₹499', status: 'Report ready', tone: 'sage' },
      { n: 'Vitamin D', date: 'Feb 02', for: 'Anya', amount: '₹699', status: 'Report ready', tone: 'sage' },
    ]},
    { period: 'January 2026', items: [
      { n: 'Diabetes Panel', date: 'Jan 30', for: 'Rohan', amount: '₹649', status: 'Report ready', tone: 'sage', flag: 'Watch' },
      { n: 'Full Body Premium', date: 'Jan 14', for: 'Priya', amount: '₹2,499', status: 'Report ready', tone: 'sage' },
    ]},
    { period: 'December 2025', items: [
      { n: 'Lipid Panel', date: 'Dec 22', for: 'Priya', amount: '₹399', status: 'Report ready', tone: 'sage' },
      { n: 'CBC', date: 'Dec 04', for: 'Meera', amount: '₹299', status: 'Cancelled', tone: 'danger', cancelled: true },
    ]},
  ];
  return (
    <div style={{ overflow: 'auto', padding: '16px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
      {/* Summary strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18,
      }}>
        {[
          { v: '14', l: 'Total bookings' },
          { v: '₹19.8K', l: 'Total spent' },
          { v: '₹2,099', l: 'Care+ saved', c: 'var(--sage)' },
        ].map((s) => (
          <div key={s.l} style={{
            padding: 12, borderRadius: 12, background: 'var(--surface-1)',
            border: '1px solid var(--border)', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em',
                          color: s.c || 'var(--text-1)' }}>{s.v}</div>
            <div style={{ fontSize: 9.5, color: 'var(--text-3)', marginTop: 2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', margin: '0 -20px 14px', padding: '2px 20px' }} className="cd-scroll">
        <CDChip tone="primary" size="md" icon={<Icon.check size={12}/>}>All</CDChip>
        <CDChip tone="neutral" size="md">Priya</CDChip>
        <CDChip tone="neutral" size="md">Family</CDChip>
        <CDChip tone="neutral" size="md">Last 6 mo</CDChip>
      </div>

      {/* Grouped history */}
      {groups.map((g, gi) => (
        <div key={g.period} style={{ marginBottom: gi < groups.length - 1 ? 18 : 0 }}>
          <div style={{
            fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase',
            marginBottom: 8, fontWeight: 600,
          }}>{g.period} · {g.items.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.items.map((b, i) => (
              <CDCard key={i} hover style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: b.cancelled ? 0.65 : 1 }}>
                <span style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: b.cancelled ? 'rgba(224,122,110,0.08)' : 'var(--surface-2)',
                  color: b.cancelled ? 'var(--danger)' : 'var(--text-2)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {b.cancelled ? <Icon.close size={16}/> : <Icon.pdf size={16}/>}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600,
                                    textDecoration: b.cancelled ? 'line-through' : 'none' }}>{b.n}</span>
                    {b.flag && <CDChip size="sm" tone="warning">{b.flag}</CDChip>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    {b.date} · For {b.for} · <span style={{ fontFamily: 'var(--font-mono)' }}>{b.amount}</span>
                  </div>
                </div>
                <CDChip tone={b.tone} size="sm">{b.status}</CDChip>
                <Icon.chevron size={16} color="var(--text-3)"/>
              </CDCard>
            ))}
          </div>
        </div>
      ))}

      {/* End */}
      <div style={{
        marginTop: 24, padding: 14, textAlign: 'center',
        fontSize: 11, color: 'var(--text-3)',
        borderTop: '1px solid var(--hairline)',
      }}>
        That's all your bookings since you joined · Sep 2024
      </div>
    </div>
  );
}

// ─── Booking Details ───────────────────────────────────────
function ScreenBookingDetail({ onBack, onReschedule, onCancel }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Booking details"
        right={<button style={iconBtn}><Icon.help size={18}/></button>}/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }} className="cd-scroll">
        {/* Phlebotomist */}
        <CDCard style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 999, background: 'var(--surface-3)',
            color: 'var(--text-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600,
          }}>SK</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Suresh Kumar</span>
              <Icon.shield size={14} color="var(--sage)"/>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>4.9 ★ · 1,242 visits · Phleb ID #PB-381</div>
          </div>
          <button style={{
            width: 38, height: 38, borderRadius: 999, background: 'var(--primary)',
            color: 'var(--on-primary)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.phone size={16}/></button>
        </CDCard>

        {/* Timeline */}
        <CDCard>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 14 }}>Timeline</div>
          {[
            { t: 'Booked', s: 'Yesterday, 8:42 PM', done: true },
            { t: 'Phlebotomist assigned', s: 'Today, 6:12 AM', done: true, name: 'Suresh K.' },
            { t: 'En route to your address', s: 'Today, 6:48 AM', done: true, active: true },
            { t: 'Sample collection', s: '~7:00 AM', done: false },
            { t: 'Lab analysis', s: '~10:30 AM', done: false },
            { t: 'Report ready', s: '~6:00 PM', done: false },
          ].map((step, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
              {/* line */}
              {i < arr.length - 1 && (
                <span style={{
                  position: 'absolute', left: 9, top: 22, bottom: -10, width: 1.5,
                  background: step.done && arr[i+1].done ? 'var(--sage)' : 'var(--surface-3)',
                }}/>
              )}
              <span style={{
                width: 20, height: 20, borderRadius: 999, marginTop: 2,
                background: step.active ? 'var(--sage)' : step.done ? 'var(--sage-soft)' : 'var(--surface-3)',
                border: step.active ? '4px solid var(--sage-soft)' : '1.5px solid ' + (step.done ? 'var(--sage)' : 'var(--text-3)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
              }}>
                {step.done && !step.active && <Icon.check size={10} color="var(--sage)" stroke={3}/>}
              </span>
              <div style={{ flex: 1, paddingBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: step.active ? 600 : 500,
                              color: step.done ? 'var(--text-1)' : 'var(--text-3)' }}>{step.t}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                  {step.s}{step.name && <> · <span style={{ color: 'var(--text-2)' }}>{step.name}</span></>}
                </div>
              </div>
            </div>
          ))}
        </CDCard>

        {/* Order */}
        <CDCard padded={false}>
          <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Order · CD-2A8F-31K</div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>2 items</span>
          </div>
          {[
            ['Diabetes Care', '12 tests'],
            ['Vitamin D Test', '1 test'],
          ].map(([n, t], i) => (
            <div key={n} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderTop: '1px solid var(--hairline)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t}</div>
              </div>
              <Icon.chevron size={14} color="var(--text-3)"/>
            </div>
          ))}
        </CDCard>

        {/* Manage booking */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 18, marginBottom: 10 }}>Manage booking</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onReschedule} style={{
            flex: 1, height: 56, padding: '0 12px', borderRadius: 14, cursor: 'pointer',
            background: 'var(--primary-soft)', color: 'var(--primary)',
            border: '1px solid var(--primary-strong)', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 13, fontWeight: 600,
          }}>
            <Icon.calendar size={16}/> Reschedule
          </button>
          <button onClick={onCancel} style={{
            flex: 1, height: 56, padding: '0 12px', borderRadius: 14, cursor: 'pointer',
            background: 'transparent', color: 'var(--danger)',
            border: '1px solid rgba(224,122,110,0.28)', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 13, fontWeight: 600,
          }}>
            <Icon.close size={16}/> Cancel booking
          </button>
        </div>

        <div style={{
          marginTop: 10, padding: '10px 12px', borderRadius: 10,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon.info size={13} color="var(--text-3)"/>
          <span style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>
            Free reschedule up to 1 hour before · Cancellations refund within 3–5 business days
          </span>
        </div>
      </div>
    </CDScreen>
  );
}

// ─── Reports List ──────────────────────────────────────────
function ScreenReports({ onNav, onReport }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav title="Reports" large
        right={<button style={iconBtn}><Icon.filter size={18}/></button>}/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        <CDSearch placeholder="Search reports…"/>

        {/* Patient filter */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', margin: '16px -20px 0', padding: '2px 20px' }} className="cd-scroll">
          <CDChip tone="primary" size="md" icon={<Icon.check size={12}/>}>All patients</CDChip>
          <CDChip tone="neutral" size="md">Priya (Self)</CDChip>
          <CDChip tone="neutral" size="md">Rohan</CDChip>
          <CDChip tone="neutral" size="md">Anya</CDChip>
        </div>

        {/* Health summary */}
        <CDCard tone="primary" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              width: 26, height: 26, borderRadius: 8,
              background: 'var(--primary)', color: 'var(--on-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.sparkle size={13}/></span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Your health · last 6 months</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { v: 14, l: 'Normal', c: 'var(--sage)' },
              { v: 3, l: 'Watch', c: 'var(--warning)' },
              { v: 1, l: 'High', c: 'var(--danger)' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: s.c, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </CDCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          {[
            { n: 'Lipid Panel Complete', d: 'Mar 14, 2026', pts: 'Priya · Self', status: 'New', tone: 'primary', flags: '3 flags' },
            { n: 'CBC + ESR', d: 'Mar 02, 2026', pts: 'Priya · Self', status: 'Normal', tone: 'sage' },
            { n: 'Thyroid Profile', d: 'Feb 14, 2026', pts: 'Priya · Self', status: 'Normal', tone: 'sage' },
            { n: 'Diabetes Panel', d: 'Jan 30, 2026', pts: 'Rohan · Father', status: 'Watch', tone: 'warning' },
            { n: 'Full Body Premium', d: 'Dec 22, 2025', pts: 'Priya · Self', status: 'Normal', tone: 'sage', flags: '78 markers' },
          ].map((r, i) => (
            <CDCard key={i} hover onClick={i === 0 ? onReport : undefined}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  width: 42, height: 42, borderRadius: 12, background: 'var(--surface-2)',
                  color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)',
                }}><Icon.pdf size={20}/></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{r.n}</span>
                    <CDChip tone={r.tone} size="sm">{r.status}</CDChip>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{r.d} · {r.pts}{r.flags ? ` · ${r.flags}` : ''}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button style={inlineBtn}><Icon.download size={12}/> Download</button>
                    <button style={inlineBtn}><Icon.share size={12}/> Share</button>
                  </div>
                </div>
              </div>
            </CDCard>
          ))}
        </div>
      </div>

      <CDBottomNav active="reports" onNav={onNav}/>
    </CDScreen>
  );
}

const inlineBtn = {
  height: 28, padding: '0 10px', borderRadius: 8, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 11, fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
};

// ─── Report Detail (PREMIUM — the differentiator) ─────────
function ScreenReportDetail({ onBack }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack}
        right={<>
          <button style={iconBtn}><Icon.share size={18}/></button>
          <button style={iconBtn}><Icon.download size={18}/></button>
        </>}/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Hero */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Lipid Panel · Mar 14, 2026</div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
                       fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Your cholesterol<br/>looks mostly good
          </h1>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <CDChip tone="success" size="sm">4 Normal</CDChip>
            <CDChip tone="warning" size="sm">2 Watch</CDChip>
            <CDChip tone="neutral" size="sm" icon={<Icon.shield size={11}/>}>NABL · Apollo Lab</CDChip>
          </div>
        </div>

        {/* AI summary */}
        <CDCard tone="primary" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{
              width: 24, height: 24, borderRadius: 7, background: 'var(--primary)',
              color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.sparkle size={13}/></span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>AI summary</span>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-1)' }}>
            Most markers are in healthy range. Your <strong>LDL is slightly elevated</strong> compared to 6 months ago — consider reducing saturated fats and rechecking in 3 months.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={smallPrim}>Discuss with doctor</button>
            <button style={smallSec}>Why this matters</button>
          </div>
        </CDCard>

        {/* Headline biomarker */}
        <CDCard style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>LDL Cholesterol</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>"Bad" cholesterol</div>
            </div>
            <CDChip tone="warning" size="sm" icon={<Icon.arrowUp size={11}/>}>Borderline</CDChip>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8, marginBottom: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em' }}>132</span>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>mg/dL</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon.arrowUp size={11}/> +8 vs Sep
            </span>
          </div>
          {/* Range bar */}
          <RangeBar value={132} segments={[
            { from: 0, to: 100, color: 'var(--sage)', label: 'Optimal' },
            { from: 100, to: 130, color: 'var(--sage)' },
            { from: 130, to: 160, color: 'var(--warning)', label: 'Borderline' },
            { from: 160, to: 190, color: 'var(--danger)' },
            { from: 190, to: 240, color: 'var(--danger)', label: 'High' },
          ]} min={0} max={240}/>
          {/* Trend */}
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>4-visit trend</div>
              <CDSparkline values={[112, 118, 124, 132]} width={140} height={32} color="var(--warning)"/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>
              {['112','118','124','132'].map((v, i) => (
                <span key={i} style={{ textAlign: 'center', color: i === 3 ? 'var(--warning)' : 'var(--text-3)' }}>{v}</span>
              ))}
            </div>
          </div>
        </CDCard>

        {/* Other markers */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '14px 0 10px' }}>All parameters</div>
        <CDCard padded={false}>
          {[
            { n: 'HDL Cholesterol', sub: '"Good" cholesterol', v: '52', u: 'mg/dL', tone: 'sage', status: 'Normal', trend: [48,50,51,52] },
            { n: 'Total Cholesterol', sub: '', v: '204', u: 'mg/dL', tone: 'warning', status: 'Watch', trend: [180,188,196,204] },
            { n: 'Triglycerides', sub: '', v: '118', u: 'mg/dL', tone: 'sage', status: 'Normal', trend: [105,112,116,118] },
            { n: 'VLDL Cholesterol', sub: '', v: '24', u: 'mg/dL', tone: 'sage', status: 'Normal', trend: [21,22,23,24] },
            { n: 'LDL/HDL Ratio', sub: '', v: '2.5', u: '', tone: 'sage', status: 'Normal', trend: [2.3,2.4,2.5,2.5] },
          ].map((m, i, arr) => {
            const c = m.tone === 'sage' ? 'var(--sage)' : m.tone === 'warning' ? 'var(--warning)' : 'var(--danger)';
            return (
              <div key={m.n} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderTop: i ? '1px solid var(--hairline)' : 'none',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{m.n}</div>
                  {m.sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{m.sub}</div>}
                </div>
                <CDSparkline values={m.trend} width={56} height={22} color={c}/>
                <div style={{ textAlign: 'right', minWidth: 60 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: c }}>{m.v}<span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 400, marginLeft: 2 }}>{m.u}</span></div>
                  <div style={{ fontSize: 10, color: c, marginTop: 1 }}>{m.status}</div>
                </div>
              </div>
            );
          })}
        </CDCard>

        {/* PDF preview teaser */}
        <CDCard style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 64, borderRadius: 6, background: 'var(--surface-2)',
            border: '1px solid var(--border-strong)', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
          }}>
            <Icon.pdf size={22} color="var(--danger)"/>
            <span style={{
              position: 'absolute', bottom: -6, right: -6, fontSize: 8,
              padding: '2px 4px', background: 'var(--danger)', color: '#fff',
              borderRadius: 3, fontWeight: 600,
            }}>PDF</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Original lab report</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Apollo Diagnostics · Signed · 4 pages</div>
          </div>
          <button style={{
            padding: '0 14px', height: 36, borderRadius: 999, border: 'none',
            background: 'var(--surface-2)', color: 'var(--text-1)', cursor: 'pointer',
            border: '1px solid var(--border)', fontSize: 12, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 4,
          }}><Icon.pdf size={14}/> View</button>
        </CDCard>
      </div>

      {/* Bottom CTA */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        display: 'flex', gap: 10,
      }}>
        <CDButton variant="secondary" size="md" style={{ flex: 1 }} icon={<Icon.share size={16}/>}>Share with doctor</CDButton>
        <CDButton variant="primary" size="md" style={{ flex: 1 }} icon={<Icon.download size={16}/>}>Download</CDButton>
      </div>
    </CDScreen>
  );
}

const smallPrim = {
  height: 32, padding: '0 12px', borderRadius: 8, border: 'none',
  background: 'var(--primary)', color: 'var(--on-primary)', cursor: 'pointer',
  fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
};
const smallSec = {
  height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border-strong)',
  background: 'transparent', color: 'var(--text-1)', cursor: 'pointer',
  fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
};

function RangeBar({ value, segments, min, max }) {
  const w = max - min;
  const pct = ((value - min) / w) * 100;
  return (
    <div>
      <div style={{
        position: 'relative', height: 8, borderRadius: 4, overflow: 'hidden', display: 'flex', gap: 2,
      }}>
        {segments.map((s, i) => (
          <span key={i} style={{
            flex: (s.to - s.from), background: s.color, opacity: 0.35,
          }}/>
        ))}
        {/* marker */}
        <span style={{
          position: 'absolute', left: `${pct}%`, top: -2, width: 4, height: 12, background: 'var(--text-1)',
          borderRadius: 2, transform: 'translateX(-50%)', boxShadow: '0 0 0 2px var(--bg)',
        }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9.5, color: 'var(--text-3)' }}>
        {segments.filter(s => s.label).map(s => (
          <span key={s.label} style={{ color: s.color }}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications ─────────────────────────────────────────
function ScreenNotifications({ onBack }) {
  const items = [
    { t: 'Your Lipid Panel report is ready', s: '3 markers need attention', time: '10m', tone: 'primary', icon: <Icon.pdf size={16}/>, unread: true },
    { t: 'Phlebotomist Suresh is en route', s: 'Arriving in ~8 minutes', time: '24m', tone: 'sage', icon: <Icon.truck size={16}/>, unread: true },
    { t: 'Booking confirmed · CD-2A8F-31K', s: 'Sun 15 Mar, 7:00 AM', time: '1h', tone: 'blue', icon: <Icon.check size={16}/>, unread: false },
    { t: 'Reminder: Vitamin D recheck', s: 'Borderline last time · recommended', time: '2d', tone: 'primary', icon: <Icon.sparkle size={16}/>, unread: false },
    { t: 'HEALTH50 coupon expiring', s: 'Use today to save ₹400', time: '4d', tone: 'warning', icon: <Icon.tag size={16}/>, unread: false },
  ];
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Notifications"
        right={<button style={{ ...iconBtn, width: 'auto', padding: '0 12px', fontSize: 12 }}>Mark all read</button>}/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Day header */}
        <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>Today</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.slice(0,2).map((n, i) => <NotifRow key={i} {...n}/>)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 8px' }}>Earlier</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.slice(2).map((n, i) => <NotifRow key={i} {...n}/>)}
        </div>
      </div>
    </CDScreen>
  );
}

function NotifRow({ t, s, time, tone, icon, unread }) {
  const tones = {
    primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)' },
    sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)' },
    blue: { bg: 'var(--blue-soft)', fg: 'var(--blue)' },
    warning: { bg: 'rgba(232,197,106,0.12)', fg: 'var(--warning)' },
  };
  const tn = tones[tone];
  return (
    <div style={{
      padding: 14, borderRadius: 14, background: 'var(--surface-1)',
      border: '1px solid var(--border)', display: 'flex', gap: 12, position: 'relative',
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 10, background: tn.bg, color: tn.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{t}</span>
          <span style={{ fontSize: 10, color: 'var(--text-3)', flexShrink: 0 }}>{time}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{s}</div>
      </div>
      {unread && <span style={{
        position: 'absolute', top: 12, left: -3, width: 6, height: 36, borderRadius: 3,
        background: 'var(--primary)',
      }}/>}
    </div>
  );
}

// ─── Profile ───────────────────────────────────────────────
function ScreenProfile2({ onNav, onFamily, onAddresses, onAppearance, onLanguage, onSignOut, onNotifSettings }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav title="Profile" large
        right={<button style={iconBtn}><Icon.settings size={18}/></button>}/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1 }} className="cd-scroll">
        {/* Profile header */}
        <CDCard style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 999, background: 'var(--primary-soft)',
            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 600, border: '1.5px solid var(--primary-strong)',
          }}>PS</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Priya Sharma</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>+91 98765 43210 · 34 yrs</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <CDChip size="sm" tone="primary" icon={<Icon.star size={11}/>}>Care+</CDChip>
              <CDChip size="sm" tone="neutral">Verified</CDChip>
            </div>
          </div>
          <Icon.edit size={16} color="var(--text-3)"/>
        </CDCard>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { v: '14', l: 'Bookings' },
            { v: '8', l: 'Reports' },
            { v: '3', l: 'Family' },
          ].map(s => (
            <div key={s.l} style={{
              padding: 14, borderRadius: 12, background: 'var(--surface-1)',
              border: '1px solid var(--border)', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '8px 0 8px 4px' }}>Account</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.family size={16}/>} label="Family members" sub="3 added" onClick={onFamily} right={<span style={{ fontSize: 12, color: 'var(--text-3)' }}>3</span>}/>
          <CDRow icon={<Icon.pin size={16}/>} label="Saved addresses" sub="Home, Office" onClick={onAddresses}/>
          <CDRow icon={<Icon.card size={16}/>} label="Payments" sub="UPI · 2 cards" onClick={onAddresses}/>
          <CDRow icon={<Icon.shield size={16}/>} label="Insurance" sub="None linked" onClick={onAddresses}/>
        </CDCard>

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 8px 4px' }}>Preferences</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.settings size={16}/>} label="Appearance" sub="Theme & reading comfort" onClick={onAppearance}
            right={<CDChip size="sm" tone="neutral">
              {(typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light') ? 'Light' : 'Dark'}
            </CDChip>}/>
          <CDRow icon={<Icon.info size={16}/>} label="Language" sub="App interface" onClick={onLanguage}
            right={<CDChip size="sm" tone="neutral">English</CDChip>}/>
          <CDRow icon={<Icon.bell size={16}/>} label="Notifications" sub="Booking, reports, offers" onClick={() => onNotifSettings?.()} right={<Icon.chevron size={16} color="var(--text-3)"/>}/>
        </CDCard>

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 8px 4px' }}>Care+</div>
        <CDCard tone="primary" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 40, height: 40, borderRadius: 11, background: 'var(--primary)',
            color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.sparkle size={18}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Care+ active · ₹2,099 saved</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>Renews 14 Sep · 12 free tests left</div>
          </div>
          <Icon.chevron size={16} color="var(--text-3)"/>
        </CDCard>

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 8px 4px' }}>Support</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.help size={16}/>} label="Help & support" sub="FAQs, contact us" onClick={() => onNav?.('notifications')}/>
          <CDRow icon={<Icon.info size={16}/>} label="About CareDiagnostics" sub="v2.4.1 · Privacy" onClick={() => onNav?.('notifications')}/>
          <CDRow icon={<Icon.close size={16}/>} label="Sign out" danger onClick={onSignOut}/>
        </CDCard>
      </div>

      <CDBottomNav active="profile" onNav={onNav}/>
    </CDScreen>
  );
}

Object.assign(window, { ScreenBookings, ScreenBookingDetail, ScreenReports, ScreenReportDetail, ScreenNotifications, ScreenProfile2 });
