// CareDiagnostics — Reschedule, Cancel sheet, In-app webview

// ─── Reschedule Slot ───────────────────────────────────────
function ScreenReschedule({ onBack, onConfirm }) {
  const [dayIdx, setDayIdx] = React.useState(2);
  const [slotIdx, setSlotIdx] = React.useState(1);
  const [reason, setReason] = React.useState('schedule');

  const days = [
    { d: 'Sun', n: 'Today', date: 15 },
    { d: 'Mon', n: 'Tomorrow', date: 16 },
    { d: 'Tue', n: 'Tue', date: 17 },
    { d: 'Wed', n: 'Wed', date: 18 },
    { d: 'Thu', n: 'Thu', date: 19 },
  ];
  const slots = [
    { t: '6:00 AM', avail: true },
    { t: '6:30 AM', avail: true },
    { t: '7:00 AM', avail: true },
    { t: '7:30 AM', avail: true },
    { t: '8:00 AM', avail: false },
    { t: '8:30 AM', avail: true },
  ];

  const reasons = [
    { v: 'schedule', l: 'Schedule conflict' },
    { v: 'travel', l: 'Travelling' },
    { v: 'unwell', l: 'Feeling unwell' },
    { v: 'prep', l: 'Not prepared yet' },
    { v: 'other', l: 'Other reason' },
  ];

  return (
    <CDScreen>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Reschedule visit"/>

      <div style={{ overflow: 'auto', padding: '4px 20px 24px', flex: 1 }} className="cd-scroll">
        {/* Current slot — collapsed reference */}
        <CDCard style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)',
            color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)',
          }}><Icon.calendar size={18}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Current slot</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Sun, 15 Mar · <span style={{ fontFamily: 'var(--font-mono)' }}>7:00 AM</span></div>
          </div>
          <CDChip size="sm" tone="warning">Changing</CDChip>
        </CDCard>

        {/* Reason for reschedule */}
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Why are you rescheduling?</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
          {reasons.map((r) => {
            const on = reason === r.v;
            return (
              <button key={r.v} onClick={() => setReason(r.v)} style={{
                height: 34, padding: '0 12px', borderRadius: 999, cursor: 'pointer',
                background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                color: on ? 'var(--primary)' : 'var(--text-2)',
                fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
              }}>{r.l}</button>
            );
          })}
        </div>

        {/* Day picker */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Pick a new date</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px', padding: '2px 20px' }} className="cd-scroll">
            {days.map((d, i) => {
              const on = i === dayIdx;
              return (
                <button key={d.date} onClick={() => setDayIdx(i)} style={{
                  minWidth: 64, padding: '12px 4px', borderRadius: 14, cursor: 'pointer',
                  background: on ? 'var(--primary)' : 'var(--surface-1)',
                  border: on ? '1px solid var(--primary)' : '1px solid var(--border)',
                  color: on ? 'var(--on-primary)' : 'var(--text-1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}>
                  <span style={{ fontSize: 10, fontWeight: 500, opacity: on ? 0.7 : 1, color: on ? 'var(--on-primary)' : 'var(--text-3)' }}>{d.n}</span>
                  <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{d.date}</span>
                  <span style={{ fontSize: 10, opacity: on ? 0.7 : 1, color: on ? 'var(--on-primary)' : 'var(--text-3)' }}>{d.d}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Available slots</div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Morning · fasting</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {slots.map((s, i) => {
              const on = i === slotIdx && s.avail;
              return (
                <button key={s.t} disabled={!s.avail} onClick={() => s.avail && setSlotIdx(i)} style={{
                  height: 44, borderRadius: 12, cursor: s.avail ? 'pointer' : 'not-allowed',
                  background: on ? 'var(--primary)' : s.avail ? 'var(--surface-1)' : 'var(--surface-2)',
                  border: on ? '1px solid var(--primary)' : '1px solid var(--border)',
                  color: on ? 'var(--on-primary)' : s.avail ? 'var(--text-1)' : 'var(--text-3)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-mono)',
                  opacity: s.avail ? 1 : 0.5, textDecoration: s.avail ? 'none' : 'line-through',
                }}>{s.t}</button>
              );
            })}
          </div>
        </div>

        {/* Policy reminder */}
        <CDCard tone="sage" style={{ display: 'flex', gap: 10 }}>
          <Icon.shield size={16} color="var(--sage)"/>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            Rescheduling is <strong style={{ color: 'var(--text-1)' }}>free</strong> up to 1 hour before your slot. Your booking ID and order stay the same.
          </div>
        </CDCard>
      </div>

      {/* Sticky CTA — shows new selection */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>New slot</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}>
            {days[dayIdx].n.toLowerCase() === 'today' || days[dayIdx].n.toLowerCase() === 'tomorrow'
              ? days[dayIdx].n
              : `${days[dayIdx].d} ${days[dayIdx].date}`} · {slots[slotIdx].t}
          </div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onConfirm} iconRight={<Icon.check size={16}/>}>
          Confirm reschedule
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Cancel Booking Sheet ──────────────────────────────────
function CancelBookingSheet({ onClose, onConfirm }) {
  const [reason, setReason] = React.useState('');
  const reasons = [
    'No longer need the test',
    'Booked by mistake',
    'Found a better price elsewhere',
    'Slot timing doesn\'t work',
    'Health emergency',
    'Other reason',
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        zIndex: 200, animation: 'cdFadeIn 0.2s ease-out',
      }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 201,
        background: 'var(--surface-1)', borderTopLeftRadius: 28, borderTopRightRadius: 28,
        borderTop: '1px solid var(--border)', boxShadow: '0 -20px 60px rgba(0,0,0,0.4)',
        padding: '12px 24px 28px', animation: 'cdSlideUp 0.32s cubic-bezier(0.2, 0.9, 0.3, 1)',
        maxHeight: '85%', overflow: 'auto',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--surface-3)', margin: '0 auto 16px' }}/>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: 'rgba(224,122,110,0.12)',
            color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.warn size={18}/></span>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.02em' }}>
            Cancel booking?
          </h2>
        </div>
        <p style={{ margin: '0 0 18px', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.5 }}>
          Your <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-1)', fontWeight: 500 }}>CD-2A8F-31K</span> booking for <strong style={{ color: 'var(--text-1)' }}>Sun 15 Mar, 7:00 AM</strong> will be cancelled.
        </p>

        {/* Refund summary */}
        <CDCard tone="raised" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Refund</div>
          {[
            ['Paid', '₹1,281'],
            ['Cancellation fee', '− ₹0', 'var(--sage)'],
          ].map(([k, v, c]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--text-2)' }}>{k}</span>
              <span style={{ color: c || 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--hairline)', margin: '10px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>You'll get back</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--sage)' }}>₹1,281</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
            Refunded to your UPI in <strong style={{ color: 'var(--text-2)' }}>3–5 business days</strong>.
          </div>
        </CDCard>

        {/* Reason picker */}
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Why are you cancelling? (optional)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
          {reasons.map((r) => {
            const on = reason === r;
            return (
              <button key={r} onClick={() => setReason(r)} style={{
                padding: 12, borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                background: on ? 'var(--primary-soft)' : 'var(--surface-2)',
                border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                color: 'inherit', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                  border: on ? '5px solid var(--primary)' : '1.5px solid var(--text-3)',
                  background: on ? 'var(--bg)' : 'transparent',
                }}/>
                <span style={{ fontSize: 13, color: on ? 'var(--text-1)' : 'var(--text-2)', fontWeight: on ? 500 : 400 }}>{r}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <CDButton variant="secondary" size="lg" onClick={onClose} style={{ flex: 1 }}>Keep booking</CDButton>
          <CDButton variant="danger" size="lg" onClick={onConfirm} style={{ flex: 1.2 }} iconRight={<Icon.close size={16}/>}>
            Cancel booking
          </CDButton>
        </div>
      </div>
    </>
  );
}

// ─── In-app Webview (T&C, Privacy) ─────────────────────────
function ScreenWebView({ onBack, doc = 'terms' }) {
  const meta = {
    terms: {
      title: 'Terms of Service',
      url: 'carediagnostics.com/legal/terms',
      updated: 'May 12, 2026',
      hero: 'Plain-language terms',
      lead: 'These terms govern your use of CareDiagnostics. We\'ve written them in plain language — but the legal version still applies.',
      sections: [
        { h: '1. Who we are', p: 'CareDiagnostics is operated by Care Health Sciences Pvt. Ltd., an Indian company registered in Bengaluru. Our labs are NABL-accredited under ISO 15189.' },
        { h: '2. The service we provide', p: 'We let you book diagnostic tests, schedule home or walk-in collection, view your reports, and share them with doctors. We do not interpret results clinically — that\'s your doctor\'s job.' },
        { h: '3. Your responsibilities', p: 'Provide accurate personal information, prepare correctly for each test (fasting, medication), and treat our phlebotomists and lab staff respectfully.' },
        { h: '4. Pricing & refunds', p: 'Prices shown at checkout are final. Cancellations made over 1 hour before your slot receive a full refund within 3–5 business days to the original payment method.' },
        { h: '5. Medical advice disclaimer', p: 'Insights, reference ranges, and AI summaries in the app are informational. They do not constitute medical advice or replace consultation with a qualified physician.' },
        { h: '6. Liability', p: 'Our liability for any single booking is capped at the value of that booking. We are not liable for indirect, incidental, or consequential damages arising from delayed or missed reports.' },
        { h: '7. Termination', p: 'You can delete your account from Profile → Privacy at any time. We can suspend accounts that violate these terms, with notice unless safety is at risk.' },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      url: 'carediagnostics.com/legal/privacy',
      updated: 'May 12, 2026',
      hero: 'Your health data, your control',
      lead: 'Healthcare data is among the most sensitive personal data there is. Here\'s exactly what we collect, why, and how to control it.',
      sections: [
        { h: '1. Data we collect', p: 'Account: name, phone, email, DOB, sex. Health: lab results, conditions you add, medications, family-member profiles. Operational: address (for collection), device + app diagnostics.' },
        { h: '2. Why we collect it', p: 'To label your reports correctly, route phlebotomists to your door, alert you to flagged values, and offer relevant tests. We never sell your data to advertisers or pharma.' },
        { h: '3. Encryption & storage', p: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Reports are stored on Indian servers (DPDP-compliant). Backups are encrypted with separate keys.' },
        { h: '4. Who can see your data', p: 'You and your verified family members. Our lab partners only see what\'s needed to run your test. Doctors only see what you share. No-one else, ever.' },
        { h: '5. Your rights', p: 'You can export your full data, correct errors, delete your account, and revoke any sharing. Requests are honoured within 30 days under the DPDP Act, 2023.' },
        { h: '6. Cookies & analytics', p: 'We use first-party analytics only, with no third-party tracking SDKs. You can disable analytics from Settings → Privacy without losing app functionality.' },
        { h: '7. Children', p: 'Family-member profiles for minors are managed by the account holder. We don\'t create separate accounts for users under 18.' },
        { h: '8. Contact', p: 'For privacy concerns, write to privacy@carediagnostics.com. Our Data Protection Officer responds within 7 working days.' },
      ],
    },
  };
  const d = meta[doc];

  return (
    <CDScreen>
      <CDStatus/>

      {/* Browser chrome */}
      <div style={{
        flexShrink: 0, padding: '4px 16px 10px', background: 'var(--surface-1)',
        borderBottom: '1px solid var(--hairline)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: 999, border: 'none',
            background: 'transparent', color: 'var(--text-1)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.close size={18}/></button>
          <div style={{ flex: 1, minWidth: 0 }}/>
          <button style={{
            width: 36, height: 36, borderRadius: 999, border: 'none',
            background: 'transparent', color: 'var(--text-2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.share size={16}/></button>
        </div>
        {/* URL bar */}
        <div style={{
          height: 36, borderRadius: 10, background: 'var(--surface-2)',
          border: '1px solid var(--border)', padding: '0 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon.shield size={13} color="var(--sage)"/>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)',
            letterSpacing: '0.005em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{d.url}</span>
          <Icon.copy size={13} color="var(--text-3)"/>
        </div>
      </div>

      <div style={{ overflow: 'auto', padding: '24px 24px 28px', flex: 1, background: 'var(--bg)' }} className="cd-scroll">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          {d.hero} · Updated {d.updated}
        </div>
        <h1 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 28, letterSpacing: '-0.03em', lineHeight: 1.1,
        }}>{d.title}</h1>
        <p style={{ margin: '12px 0 24px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6 }}>
          {d.lead}
        </p>

        {d.sections.map((s, i) => (
          <div key={i} style={{
            marginBottom: 18,
            paddingBottom: 18,
            borderBottom: i < d.sections.length - 1 ? '1px solid var(--hairline)' : 'none',
          }}>
            <h3 style={{
              margin: '0 0 8px', fontSize: 15, fontWeight: 600,
              letterSpacing: '-0.01em', color: 'var(--text-1)',
            }}>{s.h}</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{s.p}</p>
          </div>
        ))}

        {/* Cross-link */}
        <CDCard tone="raised" style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--primary-soft)',
            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--primary-strong)',
          }}><Icon.info size={16}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              {doc === 'terms' ? 'Read our Privacy Policy' : 'Read our Terms of Service'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
              {doc === 'terms' ? 'How we collect, store, and protect your data' : 'The legal contract you accepted at signup'}
            </div>
          </div>
          <Icon.chevron size={16} color="var(--text-3)"/>
        </CDCard>

        <div style={{
          marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--hairline)',
          textAlign: 'center', fontSize: 10, color: 'var(--text-3)', lineHeight: 1.5,
        }}>
          © Care Health Sciences Pvt. Ltd. · Bengaluru, India<br/>
          For legal questions: <span style={{ color: 'var(--text-2)' }}>legal@carediagnostics.com</span>
        </div>
      </div>
    </CDScreen>
  );
}

Object.assign(window, { ScreenReschedule, CancelBookingSheet, ScreenWebView });
