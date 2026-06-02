// CareDiagnostics — Booking flow: Cart, Slot, Address, Summary, Success

// ─── Cart ──────────────────────────────────────────────────
function ScreenCart({ onBack, onContinue }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Cart" right={<span style={{fontSize:12, color:'var(--text-3)'}}>2 items</span>}/>

      <div style={{ overflow: 'auto', padding: '8px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }} className="cd-scroll">
        {/* Items */}
        {[
          { n: 'Diabetes Care', tests: '12 tests · HbA1c', price: 649, original: 1200, icon: <Icon.drop size={18}/>, tone: 'primary' },
          { n: 'Vitamin D Test', tests: '1 test · 25-OH-D', price: 699, original: 999, icon: <Icon.beaker size={18}/>, tone: 'sage' },
        ].map((it) => {
          const tones = {
            primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)' },
            sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)' },
          };
          const t = tones[it.tone];
          return (
            <CDCard key={it.n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: t.bg, color: t.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{it.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{it.tests}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}>₹{it.price}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textDecoration: 'line-through' }}>₹{it.original}</span>
                </div>
              </div>
              <button style={{
                width: 32, height: 32, borderRadius: 10, background: 'var(--surface-2)',
                border: '1px solid var(--border)', color: 'var(--text-3)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.close size={14}/></button>
            </CDCard>
          );
        })}

        {/* Patient selector */}
        <CDCard style={{ marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>For whom?</div>
            <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>+ Add member</button>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -2px', padding: '2px' }} className="cd-scroll">
            {[
              { n: 'Priya', sub: 'Self · 34', sel: true },
              { n: 'Rohan', sub: 'Father · 62' },
              { n: 'Anya', sub: 'Daughter · 8' },
            ].map((p, i) => (
              <button key={p.n} style={{
                minWidth: 96, padding: 12, borderRadius: 14, cursor: 'pointer',
                background: p.sel ? 'var(--primary-soft)' : 'var(--surface-2)',
                border: p.sel ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                color: 'var(--text-1)',
              }}>
                <span style={{
                  width: 34, height: 34, borderRadius: 999,
                  background: p.sel ? 'var(--primary)' : 'var(--surface-3)',
                  color: p.sel ? 'var(--on-primary)' : 'var(--text-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600,
                }}>{p.n[0]}</span>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{p.n}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{p.sub}</div>
              </button>
            ))}
          </div>
        </CDCard>

        {/* Coupon */}
        <CDCard style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon.tag size={18} color="var(--sage)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>HEALTH50 applied</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>You saved ₹400 with this coupon</div>
          </div>
          <button style={{ border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 12, cursor: 'pointer' }}>Change</button>
        </CDCard>

        {/* Bill */}
        <CDCard tone="raised" style={{ marginTop: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Bill details</div>
          {[
            ['Items total', '₹2,199', false],
            ['Item discount', '− ₹851', false, 'var(--sage)'],
            ['Coupon (HEALTH50)', '− ₹400', false, 'var(--sage)'],
            ['Home collection', 'Free', false, 'var(--sage)'],
          ].map(([k, v, b, c], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--text-2)' }}>{k}</span>
              <span style={{ color: c || 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--hairline)', margin: '10px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>To pay</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>₹1,348</span>
          </div>
        </CDCard>
      </div>

      {/* Sticky CTA */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>To pay</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}>₹1,348</span>
            <span style={{ fontSize: 11, color: 'var(--sage)' }}>You save ₹1,251</span>
          </div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onContinue} iconRight={<Icon.arrowR size={16}/>}>
          Continue
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Slot Selection ────────────────────────────────────────
function ScreenSlot({ onBack, onContinue, onChangeAddress }) {
  const [mode, setMode] = React.useState('home'); // 'home' | 'walkin'
  const [dayIdx, setDayIdx] = React.useState(1);
  const [slotIdx, setSlotIdx] = React.useState(2);
  const [labIdx, setLabIdx] = React.useState(0);
  const days = [
    { d: 'Sat', n: 'Today', date: 14 },
    { d: 'Sun', n: 'Tomorrow', date: 15 },
    { d: 'Mon', n: 'Mon', date: 16 },
    { d: 'Tue', n: 'Tue', date: 17 },
    { d: 'Wed', n: 'Wed', date: 18 },
  ];
  const slotsByDay = {
    0: [{t:'6:00 AM',avail:false},{t:'6:30 AM',avail:false},{t:'7:00 AM',avail:true},{t:'7:30 AM',avail:true},{t:'8:00 AM',avail:false}],
    1: [{t:'6:00 AM',avail:true},{t:'6:30 AM',avail:true},{t:'7:00 AM',avail:true},{t:'7:30 AM',avail:true},{t:'8:00 AM',avail:true},{t:'8:30 AM',avail:true},{t:'9:00 AM',avail:false},{t:'9:30 AM',avail:true}],
    2: [{t:'6:00 AM',avail:true},{t:'6:30 AM',avail:true},{t:'7:00 AM',avail:true},{t:'7:30 AM',avail:false},{t:'8:00 AM',avail:true}],
    3: [{t:'6:00 AM',avail:true},{t:'6:30 AM',avail:true},{t:'7:00 AM',avail:true},{t:'7:30 AM',avail:true},{t:'8:00 AM',avail:true}],
    4: [{t:'6:00 AM',avail:true},{t:'6:30 AM',avail:true},{t:'7:00 AM',avail:true},{t:'7:30 AM',avail:true},{t:'8:00 AM',avail:true}],
  };
  const slots = slotsByDay[dayIdx];

  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Schedule visit"/>

      <div style={{ overflow: 'auto', padding: '4px 20px 24px', flex: 1 }} className="cd-scroll">
        {/* Mode toggle — Home collection vs Walk-in */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16,
        }}>
          {[
            { v: 'home', l: 'Home collection', i: <Icon.truck size={18}/>, badge: 'Recommended' },
            { v: 'walkin', l: 'Walk-in to lab', i: <Icon.beaker size={18}/>, badge: null },
          ].map((m) => {
            const on = mode === m.v;
            return (
              <button key={m.v} onClick={() => setMode(m.v)} style={{
                position: 'relative', padding: '14px 12px', borderRadius: 16, cursor: 'pointer',
                background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                boxShadow: on ? '0 0 0 4px var(--primary-soft)' : 'none',
                color: 'inherit', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: on ? 'var(--primary)' : 'var(--surface-2)',
                    color: on ? 'var(--on-primary)' : 'var(--text-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: on ? 'none' : '1px solid var(--border)', flexShrink: 0,
                  }}>{m.i}</span>
                  {m.badge && <CDChip size="sm" tone="sage">{m.badge}</CDChip>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.l}</div>
              </button>
            );
          })}
        </div>

        {/* Address OR lab picker */}
        {mode === 'home' ? (
          <CDCard tone="raised" style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, background: 'var(--blue-soft)',
                color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(143,180,209,0.2)', flexShrink: 0,
              }}><Icon.pin size={18}/></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Home</span>
                  <CDChip size="sm" tone="neutral">Default</CDChip>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>302, Sunrise Apartments, Indiranagar</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Bengaluru 560038</div>
              </div>
              <button onClick={onChangeAddress} style={{
                border: 'none', background: 'transparent', color: 'var(--primary)',
                fontSize: 12, fontWeight: 500, cursor: 'pointer', flexShrink: 0,
              }}>Change</button>
            </div>
          </CDCard>
        ) : (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Nearby labs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'CareDiagnostics Indiranagar', addr: '100ft Road · 0.8 km', open: '6:00 AM – 9:00 PM' },
                { name: 'CareDiagnostics HSR Layout', addr: '27th Main · 4.2 km', open: '6:30 AM – 8:00 PM' },
                { name: 'CareDiagnostics Koramangala', addr: '5th Block · 5.8 km', open: '7:00 AM – 8:00 PM' },
              ].map((lab, i) => {
                const on = labIdx === i;
                return (
                  <button key={i} onClick={() => setLabIdx(i)} style={{
                    padding: 14, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                    background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                    border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    boxShadow: on ? '0 0 0 3px var(--primary-soft)' : 'none',
                    color: 'inherit', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <span style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: on ? 'var(--primary)' : 'var(--surface-2)',
                      color: on ? 'var(--on-primary)' : 'var(--text-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: on ? 'none' : '1px solid var(--border)', flexShrink: 0,
                    }}><Icon.flask size={16}/></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{lab.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                        {lab.addr} · <span style={{ color: 'var(--sage)' }}>{lab.open}</span>
                      </div>
                    </div>
                    <span style={{
                      width: 20, height: 20, borderRadius: 999, flexShrink: 0,
                      border: on ? '5px solid var(--primary)' : '1.5px solid var(--text-3)',
                      background: on ? 'var(--bg)' : 'transparent',
                    }}/>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Day picker */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Select date</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px', padding: '2px 20px' }} className="cd-scroll">
            {days.map((d, i) => {
              const on = i === dayIdx;
              return (
                <button key={d.date} onClick={()=>setDayIdx(i)} style={{
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
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Available slots</div>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Morning · fasting</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {slots.map((s, i) => {
              const on = i === slotIdx && s.avail;
              return (
                <button key={s.t} disabled={!s.avail} onClick={()=>s.avail && setSlotIdx(i)} style={{
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

        {/* Mode-specific reassurance */}
        {mode === 'home' ? (
          <CDCard tone="raised" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 40, height: 40, borderRadius: 999, background: 'var(--sage-soft)',
              color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.shield size={20}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Verified phlebotomist</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Trained, background-checked, ID at door</div>
            </div>
          </CDCard>
        ) : (
          <CDCard tone="raised" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 40, height: 40, borderRadius: 999, background: 'var(--primary-soft)',
              color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.flask size={20}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Walk in any time within slot</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Show booking ID at reception · usually under 5 min wait</div>
            </div>
          </CDCard>
        )}
      </div>

      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Selected · Sun 15 Mar</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}>7:00 AM</div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onContinue} iconRight={<Icon.arrowR size={16}/>}>
          Review order
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Order Summary ─────────────────────────────────────────
function ScreenSummary({ onBack, onConfirm }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Review & pay"/>

      <div style={{ overflow: 'auto', padding: '4px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }} className="cd-scroll">
        {/* Slot recap */}
        <CDCard style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 44, height: 44, borderRadius: 12, background: 'var(--primary-soft)',
            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.calendar size={20}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Sun, 15 Mar · 7:00 AM</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Home · 302, Sunrise Apartments</div>
          </div>
          <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>Edit</button>
        </CDCard>

        {/* Items */}
        <CDCard padded={false}>
          <div style={{ padding: '14px 16px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>For Priya · Self</div>
          </div>
          {[
            { n: 'Diabetes Care', tests: '12 tests', p: 649 },
            { n: 'Vitamin D Test', tests: '1 test', p: 699 },
          ].map((it, i) => (
            <div key={it.n} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderTop: '1px solid var(--hairline)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{it.tests}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>₹{it.p}</span>
            </div>
          ))}
        </CDCard>

        {/* Pay method */}
        <CDCard>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Payment</div>
          {[
            { l: 'Pay now · UPI / Card', sub: 'Save 5% extra · ₹67', sel: true, icon: <Icon.card size={18}/> },
            { l: 'Pay after sample', sub: 'Cash / UPI to phlebotomist', sel: false, icon: <Icon.clock size={18}/> },
          ].map((m, i) => (
            <button key={i} style={{
              width: '100%', padding: 14, borderRadius: 12, marginTop: i ? 8 : 0,
              background: m.sel ? 'var(--primary-soft)' : 'var(--surface-2)',
              border: m.sel ? '1.5px solid var(--primary)' : '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              color: 'var(--text-1)', textAlign: 'left',
            }}>
              <span style={{ color: m.sel ? 'var(--primary)' : 'var(--text-3)' }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.l}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{m.sub}</div>
              </div>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                border: m.sel ? '5px solid var(--primary)' : '1.5px solid var(--text-3)',
                background: m.sel ? 'var(--bg)' : 'transparent',
              }}/>
            </button>
          ))}
        </CDCard>

        {/* Bill */}
        <CDCard tone="raised">
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Bill</div>
          {[
            ['Subtotal', '₹2,199'],
            ['Discount', '− ₹851', 'var(--sage)'],
            ['Coupon HEALTH50', '− ₹400', 'var(--sage)'],
            ['Online payment offer', '− ₹67', 'var(--sage)'],
          ].map(([k, v, c]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13 }}>
              <span style={{ color: 'var(--text-2)' }}>{k}</span>
              <span style={{ color: c || 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--hairline)', margin: '10px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>To pay</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>₹1,281</span>
          </div>
        </CDCard>
      </div>

      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--sage)' }}>You save ₹1,318</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}>₹1,281</div>
        </div>
        <CDButton variant="primary" size="lg" onClick={onConfirm} iconRight={<Icon.shield size={16}/>}>
          Pay securely
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Booking Success ───────────────────────────────────────
function ScreenSuccess({ onTrack, onHome }) {
  return (
    <CDScreen pad={false}>
      <CDStatus/>
      <div style={{ flex: 1, padding: '12px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Confetti-esque glow */}
        <div style={{
          position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)',
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--sage-soft) 0%, transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }}/>

        <div style={{ marginTop: 40, position: 'relative', animation: 'cdScaleIn 0.5s ease-out' }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999, background: 'var(--sage)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 8px var(--sage-soft), 0 0 0 18px rgba(159,200,183,0.06)',
          }}>
            <Icon.check size={42} color="var(--bg)" stroke={2.5}/>
          </div>
        </div>

        <h1 style={{
          margin: '32px 0 8px', fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>Booking confirmed</h1>
        <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 14, maxWidth: 280 }}>
          Your phlebotomist will arrive on <strong style={{color:'var(--text-1)'}}>Sun, 15 Mar at 7:00 AM</strong>
        </p>

        <CDCard style={{ marginTop: 28, width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Booking ID</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>CD-2A8F-31K</span>
              <Icon.copy size={13} color="var(--text-3)"/>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--hairline)' }}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <Stat label="Tests" value="13"/>
            <Stat label="For" value="Priya · Self"/>
            <Stat label="Paid" value="₹1,281"/>
            <Stat label="Report by" value="Sun 6 PM"/>
          </div>
        </CDCard>

        <CDCard tone="primary" style={{ marginTop: 14, width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Icon.info size={16} color="var(--primary)"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>Fasting reminder</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.5 }}>
                Start fasting by <strong style={{color:'var(--text-1)'}}>7 PM tonight</strong>. Water is allowed.
              </div>
            </div>
          </div>
        </CDCard>
      </div>

      <div style={{
        flexShrink: 0, padding: '20px 24px 24px',
        display: 'flex', gap: 10,
      }}>
        <CDButton variant="secondary" size="lg" onClick={onHome} style={{ flex: 1 }}>Home</CDButton>
        <CDButton variant="primary" size="lg" onClick={onTrack} style={{ flex: 1.4 }} iconRight={<Icon.arrowR size={16}/>}>Track booking</CDButton>
      </div>
    </CDScreen>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ScreenCart, ScreenSlot, ScreenSummary, ScreenSuccess });
