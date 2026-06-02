// CareDiagnostics — Family members & Address management

// ─── Family Members ─────────────────────────────────────────
function ScreenFamily({ onBack, onAdd, onEdit }) {
  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title="Family members"
      right={<button onClick={onAdd} style={{
        height: 36, padding: '0 14px', borderRadius: 999, border: '1px solid var(--primary-strong)',
        background: 'var(--primary-soft)', color: 'var(--primary)', cursor: 'pointer',
        fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4
      }}><Icon.plus size={14} /> Add</button>} />

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        {/* Info banner */}
        <CDCard tone="sage" style={{ marginBottom: 16, display: 'flex', gap: 10, padding: 14 }}>
          <Icon.info size={16} color="var(--sage)" />
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            Tests for family members appear under their name in reports — never mixed with yours.
          </div>
        </CDCard>

        {/* Self */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '4px 0 10px' }}>You</div>
        <FamilyRow name="Priya Sharma" rel="Self" age="34" sex="Female" tone="primary" isSelf onEdit={() => onEdit?.('self')} />

        {/* Members */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 10px' }}>Members · 3</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FamilyRow name="Rohan Sharma" rel="Father" age="62" sex="Male" tone="blue"
          note="Diabetic · last test Jan 30" onEdit={() => onEdit?.('rohan')} />
          <FamilyRow name="Anya Sharma" rel="Daughter" age="8" sex="Female" tone="sage" onEdit={() => onEdit?.('anya')} />
          <FamilyRow name="Meera Sharma" rel="Mother" age="58" sex="Female" tone="primary" onEdit={() => onEdit?.('meera')} />
        </div>

        {/* Add member ghost card */}
        <button onClick={onAdd} style={{
          marginTop: 14, padding: '20px 16px', borderRadius: 16, cursor: 'pointer',
          background: 'transparent', border: '1.5px dashed var(--border-strong)',
          color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 13, fontWeight: 500, fontFamily: 'inherit'
        }}>
          <Icon.plus size={16} color="var(--primary)" />
          Add another family member
        </button>

        <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <Icon.shield size={12} color="var(--sage)" />
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Each member's records stay private to you</span>
        </div>
      </div>
    </CDScreen>);

}

function FamilyRow({ name, rel, age, sex, note, tone = 'primary', isSelf, onEdit }) {
  const tones = {
    primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--primary-strong)' },
    sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'rgba(159,200,183,0.22)' },
    blue: { bg: 'var(--blue-soft)', fg: 'var(--blue)', bd: 'rgba(143,180,209,0.22)' }
  };
  const t = tones[tone];
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <CDCard style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14 }}>
      <span style={{
        width: 44, height: 44, borderRadius: 999, background: t.bg, color: t.fg,
        border: `1.5px solid ${t.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 600, flexShrink: 0
      }}>{initials}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{name}</span>
          {isSelf && <CDChip size="sm" tone="primary">You</CDChip>}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
          <span style={{ fontWeight: 500, color: 'var(--text-2)' }}>{rel}</span> · {age} yrs · {sex}
        </div>
        {note &&
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
          fontSize: 10, padding: '2px 6px', borderRadius: 4,
          background: 'var(--surface-2)', color: 'var(--text-2)' }}>
            <Icon.info size={10} /> {note}
          </div>
        }
      </div>
      {!isSelf ?
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button onClick={onEdit} style={miniBtn} title="Edit"><Icon.edit size={14} /></button>
          <button style={miniBtnDanger} title="Remove"><Icon.close size={14} /></button>
        </div> :

      <button onClick={onEdit} style={miniBtn} title="Edit"><Icon.edit size={14} /></button>
      }
    </CDCard>);

}

// ─── Add / Edit Family Member ──────────────────────────────
function ScreenFamilyForm({ onBack, onSave, member }) {
  // member: undefined = Add, object = Edit
  const presets = {
    rohan:  { name: 'Rohan Sharma',  rel: 'Father',   dob: '08 May 1963', sex: 'Male',   tone: 'blue',
              phone: '98231 88210', note: 'Diabetic · last test Jan 30', allergies: 'Penicillin' },
    anya:   { name: 'Anya Sharma',   rel: 'Daughter', dob: '02 Sep 2017', sex: 'Female', tone: 'sage',
              phone: '',            note: '',                              allergies: '' },
    meera:  { name: 'Meera Sharma',  rel: 'Mother',   dob: '11 Jun 1967', sex: 'Female', tone: 'primary',
              phone: '98765 99011', note: '',                              allergies: 'None known' },
    self:   { name: 'Priya Sharma',  rel: 'Self',     dob: '14 Mar 1991', sex: 'Female', tone: 'primary',
              phone: '98765 43210', note: '',                              allergies: '' },
  };
  const initial = (member && presets[member]) || { name: '', rel: '', dob: '', sex: 'Female', phone: '', note: '', allergies: '' };
  const isEdit = !!member;
  const [form, setForm] = React.useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const relationships = ['Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Sibling', 'Other'];
  const initials = (form.name || 'New').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const isSelf = member === 'self';

  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title={isEdit ? (isSelf ? 'Edit profile' : 'Edit member') : 'Add family member'} />

      <div style={{ overflow: 'auto', padding: '4px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        {/* Basic */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Basic info</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormField label="Full name" value={form.name} placeholder="e.g. Rohan Sharma" onChange={(v) => set('name', v)}/>

          {/* Relationship — segmented */}
          <FormBlock label="Relationship">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {relationships.map((r) => {
                const on = form.rel === r;
                return (
                  <button key={r} onClick={() => set('rel', r)} style={{
                    height: 34, padding: '0 12px', borderRadius: 999, cursor: 'pointer',
                    background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                    border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    color: on ? 'var(--primary)' : 'var(--text-2)',
                    fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
                  }}>{r}</button>
                );
              })}
            </div>
          </FormBlock>

          <FormField label="Date of birth" value={form.dob} placeholder="DD MMM YYYY"
            onChange={(v) => set('dob', v)} icon={<Icon.calendar size={16} color="var(--text-3)"/>}/>

          <FormBlock label="Sex">
            <div style={{ display: 'flex', gap: 8 }}>
              {['Female', 'Male', 'Other'].map((g) => {
                const on = form.sex === g;
                return (
                  <button key={g} onClick={() => set('sex', g)} style={{
                    flex: 1, height: 46, borderRadius: 12, cursor: 'pointer',
                    background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                    border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    color: on ? 'var(--primary)' : 'var(--text-2)',
                    fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                  }}>{g}</button>
                );
              })}
            </div>
          </FormBlock>

          <FormBlock label="Phone (optional)" hint="Used for sample-collection updates">
            <div style={{
              display: 'flex', height: 52, borderRadius: 12, background: 'var(--surface-1)',
              border: '1px solid var(--border)', overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px',
                borderRight: '1px solid var(--border)', background: 'var(--surface-2)',
              }}>
                <span style={{ fontSize: 14 }}>🇮🇳</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>+91</span>
              </div>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                placeholder="98765 43210" style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                padding: '0 14px', color: 'var(--text-1)', fontSize: 15, fontWeight: 500,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
              }}/>
            </div>
          </FormBlock>
        </div>

        {/* Health */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '24px 0 10px' }}>Health context</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormField label="Known conditions" value={form.note} placeholder="e.g. Diabetic, hypertension"
            onChange={(v) => set('note', v)}/>
          <FormField label="Allergies" value={form.allergies} placeholder="e.g. Penicillin, peanuts"
            onChange={(v) => set('allergies', v)}/>
        </div>

        {/* Permissions */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '24px 0 10px' }}>Permissions</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.shield size={16}/>} label="Share reports with this member" sub="Send via SMS / email" onClick={()=>{}} right={<Switch on={false}/>}/>
          <CDRow icon={<Icon.bell size={16}/>} label="Allow booking notifications" sub="On this account" onClick={()=>{}} right={<Switch on={true}/>}/>
        </CDCard>

        {/* Trust */}
        <div style={{
          marginTop: 18, padding: 12, background: 'var(--sage-soft)',
          border: '1px solid rgba(159,200,183,0.18)', borderRadius: 12,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <Icon.shield size={14} color="var(--sage)"/>
          <span style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.5 }}>
            Records stay private to your account. Test results land under this person's name only.
          </span>
        </div>

        {isEdit && !isSelf && (
          <button style={{
            marginTop: 18, marginBottom: 12, padding: 14, borderRadius: 12, cursor: 'pointer',
            background: 'transparent', border: '1px solid rgba(224,122,110,0.22)',
            color: 'var(--danger)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon.close size={14}/> Remove from family
          </button>
        )}
        <div style={{ height: 14 }}/>
      </div>

      {/* Sticky CTA */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10,
      }}>
        <CDButton variant="secondary" size="lg" onClick={onBack} style={{ flex: 1 }}>Cancel</CDButton>
        <CDButton variant="primary" size="lg" onClick={onSave} style={{ flex: 1.4 }}
          iconRight={<Icon.check size={16}/>}
          disabled={!form.name || !form.rel}>
          {isEdit ? 'Save changes' : 'Add member'}
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Address Management ────────────────────────────────────
function ScreenAddresses({ onBack, onAdd, onEdit, picker, onPick, selectedId = 'home' }) {
  // picker mode: show as a chooser (no map, large rows, radio)
  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title={picker ? 'Change address' : 'Saved addresses'}
      right={!picker ? <button onClick={onAdd} style={{
        height: 36, padding: '0 14px', borderRadius: 999, border: '1px solid var(--primary-strong)',
        background: 'var(--primary-soft)', color: 'var(--primary)', cursor: 'pointer',
        fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4
      }}><Icon.plus size={14} /> Add</button> : null} />

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        {!picker && (
          <>
            {/* Map preview banner */}
            <div style={{
              position: 'relative', height: 140, borderRadius: 16, marginBottom: 16,
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              overflow: 'hidden'
            }}>
              {/* faux map grid */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="var(--border)" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="mapDiag" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M -20 100 L 100 -20" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" />
                    <path d="M -20 60 L 60 -20" stroke="var(--border)" strokeWidth="1" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                <rect width="100%" height="100%" fill="url(#mapDiag)" opacity="0.7" />
                <path d="M0 80 Q150 60 320 100" stroke="var(--text-3)" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M120 0 L 140 140" stroke="var(--text-3)" strokeWidth="1.5" fill="none" opacity="0.3" />
              </svg>
              {[
              { x: '34%', y: '46%', primary: true, label: 'Home' },
              { x: '62%', y: '68%', label: 'Office' },
              { x: '20%', y: '76%', label: "Mom's" }].
              map((p) =>
              <span key={p.label} style={{
                position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
              }}>
                  <span style={{
                  padding: '3px 8px', borderRadius: 999,
                  background: p.primary ? 'var(--primary)' : 'var(--surface-1)',
                  color: p.primary ? 'var(--on-primary)' : 'var(--text-1)',
                  fontSize: 10, fontWeight: 600,
                  border: '1px solid ' + (p.primary ? 'var(--primary)' : 'var(--border-strong)'),
                  whiteSpace: 'nowrap'
                }}>{p.label}</span>
                  <Icon.pin size={20} color={p.primary ? 'var(--primary)' : 'var(--text-2)'} />
                </span>
              )}
            </div>
          </>
        )}

        {picker && (
          <CDCard tone="sage" style={{ marginBottom: 14, display: 'flex', gap: 10, padding: 12 }}>
            <Icon.info size={14} color="var(--sage)" />
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
              Pick where the phlebotomist should arrive on <strong style={{color:'var(--text-1)'}}>Sun, 15 Mar</strong>.
            </div>
          </CDCard>
        )}

        {/* Addresses */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
          {picker ? `Choose · ${3} saved` : 'Saved · 3'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AddressRow id="home" type="home" label="Home" isDefault address="302, Sunrise Apartments, 1st Cross"
            line2="Indiranagar, Bengaluru 560038" phone="+91 98765 43210"
            picker={picker} selected={picker && selectedId === 'home'} onPick={onPick} onEdit={() => onEdit?.('home')} />
          <AddressRow id="office" type="office" label="Office" address="WeWork Galaxy, 43 Residency Road"
            line2="Bengaluru 560025" phone="+91 98765 43210"
            picker={picker} selected={picker && selectedId === 'office'} onPick={onPick} onEdit={() => onEdit?.('office')} />
          <AddressRow id="mom" type="other" label="Mom's place" address="14, Lake View, HSR Layout"
            line2="Bengaluru 560102" phone="+91 98231 11122"
            picker={picker} selected={picker && selectedId === 'mom'} onPick={onPick} onEdit={() => onEdit?.('mom')} />
        </div>

        {/* Add address ghost card */}
        <button onClick={onAdd} style={{
          marginTop: 14, padding: '20px 16px', borderRadius: 16, cursor: 'pointer',
          background: 'transparent', border: '1.5px dashed var(--border-strong)',
          color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 13, fontWeight: 500, fontFamily: 'inherit'
        }}>
          <Icon.plus size={16} color="var(--primary)" />
          Add a new address
        </button>
      </div>

      {picker && (
        <div style={{
          flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
          background: 'var(--bg)', display: 'flex', gap: 10,
        }}>
          <CDButton variant="primary" size="lg" full onClick={onBack} iconRight={<Icon.check size={16}/>}>
            Confirm address
          </CDButton>
        </div>
      )}
    </CDScreen>);

}

function AddressRow({ id, type, label, isDefault, address, line2, phone, picker, selected, onPick, onEdit }) {
  const types = {
    home: { icon: <Icon.home size={18} />, tone: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--primary-strong)' } },
    office: { icon: <Icon.beaker size={18} />, tone: { bg: 'var(--blue-soft)', fg: 'var(--blue)', bd: 'rgba(143,180,209,0.22)' } },
    other: { icon: <Icon.pin size={18} />, tone: { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'rgba(159,200,183,0.22)' } }
  };
  const t = types[type];
  const officeIcon = type === 'office' ? <Icon.shield size={18} /> : t.icon;

  if (picker) {
    return (
      <button onClick={() => onPick?.(id)} style={{
        textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        padding: 14, borderRadius: 16,
        background: selected ? 'var(--primary-soft)' : 'var(--surface-1)',
        border: selected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
        boxShadow: selected ? '0 0 0 4px var(--primary-soft)' : 'none',
        display: 'flex', gap: 12, color: 'inherit',
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10, background: t.tone.bg, color: t.tone.fg,
          border: `1px solid ${t.tone.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>{type === 'office' ? officeIcon : t.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
            {isDefault && <CDChip size="sm" tone="primary">Default</CDChip>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>{address}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{line2}</div>
        </div>
        <span style={{
          width: 22, height: 22, borderRadius: 999, flexShrink: 0,
          border: selected ? '6px solid var(--primary)' : '1.5px solid var(--text-3)',
          background: selected ? 'var(--bg)' : 'transparent',
          alignSelf: 'center',
        }}/>
      </button>
    );
  }

  return (
    <CDCard style={{ padding: 14 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10, background: t.tone.bg, color: t.tone.fg,
          border: `1px solid ${t.tone.bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>{type === 'office' ? officeIcon : t.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
            {isDefault && <CDChip size="sm" tone="primary">Default</CDChip>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>{address}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{line2}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8,
            fontSize: 11, color: 'var(--text-3)',
            fontFamily: 'var(--font-mono)' }}>
            <Icon.phone size={11} /> {phone}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
          <button onClick={onEdit} style={miniBtn} title="Edit"><Icon.edit size={14} /></button>
          <button style={miniBtnDanger} title="Remove"><Icon.close size={14} /></button>
        </div>
      </div>
      {!isDefault &&
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
          <button style={{
          border: 'none', background: 'transparent', color: 'var(--primary)',
          fontSize: 12, fontWeight: 500, cursor: 'pointer', padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: 4
        }}><Icon.check size={12} /> Set as default</button>
        </div>
      }
    </CDCard>);

}

// ─── Add / Edit Address ────────────────────────────────────
function ScreenAddressForm({ onBack, onSave, addrId }) {
  const presets = {
    home: { label: 'Home', type: 'home', line1: '302, Sunrise Apartments', line2: '1st Cross, Indiranagar',
            city: 'Bengaluru', state: 'Karnataka', pincode: '560038', landmark: 'Near Cubbon Park',
            phone: '98765 43210', name: 'Priya Sharma', isDefault: true },
    office: { label: 'Office', type: 'office', line1: 'WeWork Galaxy', line2: '43 Residency Road',
              city: 'Bengaluru', state: 'Karnataka', pincode: '560025', landmark: '',
              phone: '98765 43210', name: 'Priya Sharma', isDefault: false },
    mom: { label: "Mom's place", type: 'other', line1: '14, Lake View', line2: 'HSR Layout',
           city: 'Bengaluru', state: 'Karnataka', pincode: '560102', landmark: 'Sector 2',
           phone: '98231 11122', name: 'Meera Sharma', isDefault: false },
  };
  const initial = (addrId && presets[addrId]) || {
    label: '', type: 'home', line1: '', line2: '', city: '', state: 'Karnataka',
    pincode: '', landmark: '', phone: '98765 43210', name: 'Priya Sharma', isDefault: false,
  };
  const isEdit = !!addrId;
  const [form, setForm] = React.useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title={isEdit ? 'Edit address' : 'Add address'} />

      <div style={{ overflow: 'auto', padding: '4px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        {/* Map */}
        <div style={{
          position: 'relative', height: 160, borderRadius: 16, marginBottom: 16,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="mapGridF" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="var(--border)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGridF)" />
            <path d="M0 80 Q150 60 320 100" stroke="var(--text-3)" strokeWidth="2" fill="none" opacity="0.35" />
            <path d="M120 0 L 140 160" stroke="var(--text-3)" strokeWidth="1.5" fill="none" opacity="0.25" />
            <path d="M20 130 L 320 130" stroke="var(--text-3)" strokeWidth="1.5" fill="none" opacity="0.25" />
          </svg>
          {/* Pin centered */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <span style={{
              padding: '4px 10px', borderRadius: 999, background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)', fontSize: 10, fontWeight: 600,
              boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap',
            }}>Drag to adjust</span>
            <Icon.pin size={32} color="var(--primary)"/>
          </div>
          {/* Use current location */}
          <button style={{
            position: 'absolute', right: 12, bottom: 12,
            height: 32, padding: '0 12px', borderRadius: 999,
            background: 'var(--surface-1)', border: '1px solid var(--border-strong)',
            color: 'var(--text-1)', fontSize: 11, fontWeight: 500, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Icon.pin size={12} color="var(--primary)"/> Use current location
          </button>
        </div>

        {/* Tag selector */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Save as</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[
            { v: 'home', l: 'Home', i: <Icon.home size={16}/> },
            { v: 'office', l: 'Office', i: <Icon.shield size={16}/> },
            { v: 'other', l: 'Other', i: <Icon.pin size={16}/> },
          ].map((t) => {
            const on = form.type === t.v;
            return (
              <button key={t.v} onClick={() => set('type', t.v)} style={{
                flex: 1, padding: '12px 8px', borderRadius: 12, cursor: 'pointer',
                background: on ? 'var(--primary-soft)' : 'var(--surface-1)',
                border: on ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                color: on ? 'var(--primary)' : 'var(--text-2)',
                fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>{t.i}{t.l}</button>
            );
          })}
        </div>

        {/* Label (only when type=other) */}
        {form.type === 'other' && (
          <div style={{ marginBottom: 18 }}>
            <FormField label="Label" value={form.label} placeholder="e.g. Mom's place, Sister's"
              onChange={(v) => set('label', v)}/>
          </div>
        )}

        {/* Address fields */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Address</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormField label="Flat / building / society" value={form.line1}
            placeholder="e.g. 302, Sunrise Apartments" onChange={(v) => set('line1', v)}/>
          <FormField label="Area / street" value={form.line2}
            placeholder="e.g. 1st Cross, Indiranagar" onChange={(v) => set('line2', v)}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
            <FormField label="City" value={form.city} placeholder="Bengaluru" onChange={(v) => set('city', v)}/>
            <FormBlock label="Pincode">
              <div style={{
                height: 52, borderRadius: 12, background: 'var(--surface-1)',
                border: '1px solid var(--border)', padding: '0 12px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <input value={form.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="560038" inputMode="numeric" maxLength={6}
                  style={{
                    flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                    color: 'var(--text-1)', fontSize: 16, fontWeight: 500,
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textAlign: 'left',
                  }}/>
                {form.pincode && form.pincode.length === 6 ? (
                  <span style={{
                    width: 20, height: 20, borderRadius: 999, background: 'var(--sage)',
                    color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}><Icon.check size={11} stroke={3}/></span>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
                    letterSpacing: '0.04em', flexShrink: 0,
                  }}>{(form.pincode || '').length}/6</span>
                )}
              </div>
            </FormBlock>
          </div>
          <FormField label="State" value={form.state} placeholder="Karnataka"
            onChange={(v) => set('state', v)} icon={<Icon.chevronD size={14} color="var(--text-3)"/>}/>
          <FormField label="Landmark (optional)" value={form.landmark}
            placeholder="e.g. Near Cubbon Park" onChange={(v) => set('landmark', v)}/>
        </div>

        {/* Contact */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '22px 0 10px' }}>Contact at this address</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormField label="Receiver's name" value={form.name}
            placeholder="e.g. Priya Sharma" onChange={(v) => set('name', v)}/>
          <FormBlock label="Phone">
            <div style={{
              display: 'flex', height: 52, borderRadius: 12, background: 'var(--surface-1)',
              border: '1px solid var(--border)', overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px',
                borderRight: '1px solid var(--border)', background: 'var(--surface-2)',
              }}>
                <span style={{ fontSize: 14 }}>🇮🇳</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>+91</span>
              </div>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                placeholder="98765 43210" style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                padding: '0 14px', color: 'var(--text-1)', fontSize: 15, fontWeight: 500,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
              }}/>
            </div>
          </FormBlock>
        </div>

        {/* Default toggle */}
        <CDCard style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--primary-soft)',
            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--primary-strong)',
          }}><Icon.star size={16}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Set as default address</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Pre-selected during booking</div>
          </div>
          <span onClick={() => set('isDefault', !form.isDefault)} style={{ cursor: 'pointer' }}>
            <Switch on={form.isDefault}/>
          </span>
        </CDCard>

        {isEdit && (
          <button style={{
            marginTop: 18, marginBottom: 12, padding: 14, borderRadius: 12, cursor: 'pointer',
            background: 'transparent', border: '1px solid rgba(224,122,110,0.22)',
            color: 'var(--danger)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon.close size={14}/> Delete this address
          </button>
        )}
        <div style={{ height: 14 }}/>
      </div>

      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10,
      }}>
        <CDButton variant="secondary" size="lg" onClick={onBack} style={{ flex: 1 }}>Cancel</CDButton>
        <CDButton variant="primary" size="lg" onClick={onSave} style={{ flex: 1.4 }}
          iconRight={<Icon.check size={16}/>}
          disabled={!form.line1 || !form.pincode}>
          {isEdit ? 'Save changes' : 'Save address'}
        </CDButton>
      </div>
    </CDScreen>
  );
}

// ─── Form primitives ───────────────────────────────────────
function FormField({ label, value, placeholder, onChange, icon, mono, hint }) {
  return (
    <FormBlock label={label} hint={hint}>
      <div style={{
        height: 52, borderRadius: 12, background: 'var(--surface-1)',
        border: '1px solid var(--border)', padding: '0 14px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            color: 'var(--text-1)', fontSize: 15, fontFamily: mono ? 'var(--font-mono)' : 'inherit',
          }}/>
        {icon}
      </div>
    </FormBlock>
  );
}

function FormBlock({ label, hint, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.02em' }}>{label.toUpperCase()}</span>
        {hint && <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const miniBtn = {
  width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0
};
const miniBtnDanger = {
  ...miniBtn, color: 'var(--danger)',
  borderColor: 'rgba(224,122,110,0.22)',
  background: 'rgba(224,122,110,0.08)'
};

Object.assign(window, { ScreenFamily, ScreenFamilyForm, ScreenAddresses, ScreenAddressForm });

// ─── Appearance ────────────────────────────────────────────
function ScreenAppearance({ onBack }) {
  const current = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') || 'dark';
  const [picked, setPicked] = React.useState(current);

  const pick = (v) => {
    setPicked(v);
    // Drive the global theme tweak (also persists via host)
    if (window.__cdSetTweak) window.__cdSetTweak('theme', v);
    document.documentElement.setAttribute('data-theme', v);
  };

  const options = [
  { v: 'light', label: 'Light', sub: 'Bright, ideal for outdoors' },
  { v: 'dark', label: 'Dark', sub: 'Easier on the eyes at night' }];


  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title="Appearance" />

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        <p style={{ margin: '4px 0 18px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
          Choose how CareDiagnostics looks on this device.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {options.map((o) =>
          <ThemePreview key={o.v} variant={o.v} label={o.label} sub={o.sub}
          selected={picked === o.v} onClick={() => pick(o.v)} />
          )}
        </div>

        {/* System toggle */}
        <CDCard style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)',
            color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)'
          }}><Icon.settings size={16} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Follow system</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Switch automatically with iOS / Android theme</div>
          </div>
          <Switch on={false} />
        </CDCard>

        {/* Reading comfort */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '20px 0 10px' }}>Reading comfort</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.sparkle size={16} />} label="Larger text" sub="Default" onClick={() => {}} right={<span style={{ fontSize: 12, color: 'var(--text-3)' }}>100%</span>} />
          <CDRow icon={<Icon.shield size={16} />} label="High contrast" sub="Better readability" onClick={() => {}} right={<Switch on={false} />} />
          <CDRow icon={<Icon.heart size={16} />} label="Reduce motion" sub="Minimize animations" onClick={() => {}} right={<Switch on={false} />} />
        </CDCard>
      </div>
    </CDScreen>);

}

function ThemePreview({ variant, label, sub, selected, onClick }) {
  const isDark = variant === 'dark';
  const bg = isDark ? '#0E0C0A' : '#FAF6EF';
  const surface = isDark ? '#1F1A15' : '#FFFFFF';
  const text = isDark ? '#F4ECDF' : '#1A1108';
  const muted = isDark ? '#6F6759' : '#8C8073';
  const accent = isDark ? '#E89766' : '#B85A2E';
  const sage = isDark ? '#9FC8B7' : '#4E8C79';

  return (
    <button onClick={onClick} style={{
      padding: 10, borderRadius: 18, cursor: 'pointer',
      background: selected ? 'var(--primary-soft)' : 'var(--surface-1)',
      border: selected ? '1.5px solid var(--primary)' : '1px solid var(--border)',
      boxShadow: selected ? '0 0 0 4px var(--primary-soft)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 8, color: 'inherit',
      fontFamily: 'inherit', textAlign: 'left'
    }}>
      {/* Mini phone preview */}
      <div style={{
        width: '100%', aspectRatio: '0.55',
        borderRadius: 14, background: bg, padding: 8,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        display: 'flex', flexDirection: 'column', gap: 6,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
      }}>
        {/* status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 7, color: text, padding: '2px 4px 0' }}>
          <span style={{ fontWeight: 600 }}>9:41</span>
          <span style={{ display: 'flex', gap: 2 }}>
            <span style={{ width: 6, height: 4, background: text, borderRadius: 0.5 }} />
            <span style={{ width: 9, height: 4, background: text, borderRadius: 0.5 }} />
          </span>
        </div>
        {/* greeting */}
        <div style={{ padding: '0 4px' }}>
          <div style={{ fontSize: 6, color: muted, letterSpacing: '0.05em' }}>GOOD MORNING</div>
          <div style={{ fontSize: 9, color: text, fontWeight: 600 }}>Priya</div>
        </div>
        {/* search */}
        <div style={{
          height: 14, borderRadius: 4, background: surface,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`
        }} />
        {/* card */}
        <div style={{
          padding: 6, borderRadius: 6, background: isDark ? 'rgba(232,151,102,0.12)' : 'rgba(184,90,46,0.10)',
          border: `1px solid ${isDark ? 'rgba(232,151,102,0.22)' : 'rgba(184,90,46,0.18)'}`,
          flex: 1
        }}>
          <div style={{ fontSize: 5, color: accent, fontWeight: 600, letterSpacing: '0.05em' }}>INSIGHT</div>
          <div style={{ fontSize: 6, color: text, marginTop: 2 }}>Recheck Vitamin D</div>
          <div style={{
            marginTop: 4, height: 10, borderRadius: 999, background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isDark ? '#1A1108' : '#FFFFFF', fontSize: 5, fontWeight: 600
          }}>Recheck</div>
        </div>
        {/* bottom nav pill */}
        <div style={{
          height: 14, borderRadius: 999, background: surface,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 4px'
        }}>
          <span style={{ width: 16, height: 8, background: accent, borderRadius: 999 }} />
          {[muted, muted, muted].map((c, i) => <span key={i} style={{ width: 3, height: 3, background: c, borderRadius: 999 }} />)}
        </div>
      </div>
      {/* label */}
      <div style={{ padding: '2px 4px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{label}</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>
        </div>
        {selected &&
        <span style={{
          width: 22, height: 22, borderRadius: 999, background: 'var(--primary)',
          color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><Icon.check size={12} stroke={3} /></span>
        }
      </div>
    </button>);

}

function Switch({ on }) {
  return (
    <span style={{
      width: 36, height: 22, borderRadius: 999, padding: 2,
      background: on ? 'var(--primary)' : 'var(--surface-3)',
      display: 'inline-flex', alignItems: 'center',
      transition: 'background .15s'
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 999, background: '#fff',
        transform: on ? 'translateX(14px)' : 'translateX(0)',
        transition: 'transform .15s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </span>);

}

// ─── Language ──────────────────────────────────────────────
function ScreenLanguage({ onBack }) {
  const langs = [
  { code: 'en', native: 'English', name: 'English' },
  { code: 'hi', native: 'हिन्दी', name: 'Hindi' },
  { code: 'bn', native: 'বাংলা', name: 'Bengali' },
  { code: 'te', native: 'తెలుగు', name: 'Telugu' },
  { code: 'mr', native: 'मराठी', name: 'Marathi' },
  { code: 'ta', native: 'தமிழ்', name: 'Tamil' },
  { code: 'gu', native: 'ગુજરાતી', name: 'Gujarati' },
  { code: 'kn', native: 'ಕನ್ನಡ', name: 'Kannada' },
  { code: 'ml', native: 'മലയാളം', name: 'Malayalam' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', name: 'Punjabi' },
  { code: 'or', native: 'ଓଡ଼ିଆ', name: 'Odia' },
  { code: 'as', native: 'অসমীয়া', name: 'Assamese' }];

  const [picked, setPicked] = React.useState('en');

  return (
    <CDScreen>
      <CDStatus />
      <CDTopNav back onBack={onBack} title="Language"
      right={<button style={{
        height: 36, padding: '0 14px', borderRadius: 999, border: 'none',
        background: 'var(--primary)', color: 'var(--on-primary)', cursor: 'pointer',
        fontSize: 12, fontWeight: 600
      }}>Save</button>} />

      <div style={{ padding: '4px 20px 0', flexShrink: 0 }}>
        <CDSearch placeholder="Search language…" />
      </div>

      <div style={{ overflow: 'auto', padding: '14px 20px 28px', flex: 1 }} className="cd-scroll">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>App language · {langs.length} available</div>

        <CDCard padded={false}>
          {langs.map((l, i) => {
            const on = l.code === picked;
            return (
              <button key={l.code} onClick={() => setPicked(l.code)} style={{
                width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                background: on ? 'var(--primary-soft)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                borderBottom: i < langs.length - 1 ? '1px solid var(--hairline)' : 'none',
                color: 'inherit'
              }}>
                <span style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: on ? 'var(--primary)' : 'var(--surface-2)',
                  color: on ? 'var(--on-primary)' : 'var(--text-2)',
                  border: on ? 'none' : '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0
                }}>{l.code}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-1)' }}>{l.native}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{l.name}</div>
                </div>
                {on &&
                <span style={{
                  width: 22, height: 22, borderRadius: 999, background: 'var(--primary)',
                  color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}><Icon.check size={12} stroke={3} /></span>
                }
              </button>);

          })}
        </CDCard>

        <CDCard tone="raised" style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon.info size={16} color="var(--blue)" />
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-1)' }}>Heads-up:</strong> reports and lab values stay in English (medical terms remain standardized) — only the app interface translates.
          </div>
        </CDCard>
      </div>
    </CDScreen>);

}

Object.assign(window, { ScreenAppearance, ScreenLanguage, ScreenNotificationSettings, ScreenLabProfile, Switch });

// ─── Lab Profile (branch info — name, address, phone, hours) ──────
function ScreenLabProfile({ onBack }) {
  // mock today's open status
  const isOpen = true;
  const closesAt = '9:00 PM';

  return (
    <CDScreen>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Lab"
        right={<>
          <button style={iconBtn}><Icon.share size={18}/></button>
          <button style={iconBtn}><Icon.heart size={18}/></button>
        </>}/>

      <div style={{ overflow: 'auto', padding: '0 0 28px', flex: 1 }} className="cd-scroll">
        {/* Hero map */}
        <div style={{
          position: 'relative', height: 200, marginBottom: 16,
          background: 'var(--surface-2)', borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="labMap" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#labMap)"/>
            {/* roads */}
            <path d="M0 100 Q200 70 400 110" stroke="var(--text-3)" strokeWidth="2.5" fill="none" opacity="0.35"/>
            <path d="M120 0 L 150 200" stroke="var(--text-3)" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M30 170 L 380 150" stroke="var(--text-3)" strokeWidth="1.5" fill="none" opacity="0.25"/>
            {/* park */}
            <circle cx="280" cy="60" r="34" fill="var(--sage-soft)" opacity="0.5"/>
          </svg>
          {/* center pin */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <span style={{
              padding: '4px 10px', borderRadius: 999, background: 'var(--surface-1)',
              border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-md)',
              fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap',
            }}>CareDiagnostics</span>
            <Icon.pin size={36} color="var(--primary)"/>
          </div>
          {/* Distance chip */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            padding: '6px 10px', borderRadius: 999,
            background: 'var(--surface-1)', border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 500,
          }}>
            <Icon.truck size={12} color="var(--blue)"/> 0.8 km · 4 min drive
          </div>
          {/* Directions FAB */}
          <button style={{
            position: 'absolute', right: 12, bottom: 12,
            height: 38, padding: '0 14px', borderRadius: 999,
            background: 'var(--primary)', color: 'var(--on-primary)', border: 'none',
            boxShadow: 'var(--shadow-md)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          }}>
            <Icon.arrowR size={14}/> Directions
          </button>
        </div>

        <div style={{ padding: '0 20px' }}>
          {/* Title block */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
              <CDChip size="sm" tone="primary" icon={<Icon.star size={11}/>}>4.9 ★ · 1.2k</CDChip>
              <CDChip size="sm" tone="sage" icon={<Icon.shield size={11}/>}>NABL accredited</CDChip>
              <CDChip size="sm" tone="neutral">ISO 15189</CDChip>
            </div>
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 24, letterSpacing: '-0.03em', lineHeight: 1.15,
            }}>CareDiagnostics — Indiranagar</h1>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>
              Full-service diagnostic centre · Walk-in & home collection
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <CDDot color="var(--sage)" pulse/>
              <span style={{ fontSize: 13, fontWeight: 600, color: isOpen ? 'var(--sage)' : 'var(--danger)' }}>
                {isOpen ? 'Open now' : 'Closed'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>· closes {closesAt}</span>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
            {[
              { l: 'Call', i: <Icon.phone size={18}/>, tone: 'primary' },
              { l: 'Route', i: <Icon.pin size={18}/>, tone: 'blue' },
              { l: 'Book', i: <Icon.calendar size={18}/>, tone: 'sage' },
              { l: 'Share', i: <Icon.share size={18}/>, tone: 'neutral' },
            ].map((a) => {
              const tones = {
                primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--primary-strong)' },
                sage:    { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'rgba(159,200,183,0.22)' },
                blue:    { bg: 'var(--blue-soft)', fg: 'var(--blue)', bd: 'rgba(143,180,209,0.22)' },
                neutral: { bg: 'var(--surface-2)', fg: 'var(--text-2)', bd: 'var(--border)' },
              };
              const t = tones[a.tone];
              return (
                <button key={a.l} style={{
                  background: 'var(--surface-1)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '12px 8px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  color: 'var(--text-1)', fontFamily: 'inherit',
                }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10, background: t.bg, color: t.fg,
                    border: `1px solid ${t.bd}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{a.i}</span>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>{a.l}</span>
                </button>
              );
            })}
          </div>

          {/* Contact */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Contact</div>
          <CDCard padded={false} style={{ padding: '0 16px', marginBottom: 14 }}>
            <CDRow icon={<Icon.pin size={16}/>}
              label="Address" sub="#42, 100ft Road · Indiranagar 1st Stage · Bengaluru 560038"
              onClick={()=>{}}/>
            <CDRow icon={<Icon.phone size={16}/>}
              label={<span style={{ fontFamily: 'var(--font-mono)' }}>+91 80 4567 1234</span>}
              sub="Reception · 6 AM – 9 PM"
              onClick={()=>{}}/>
            <CDRow icon={<Icon.info size={16}/>}
              label={<span style={{ fontFamily: 'var(--font-mono)' }}>indiranagar@carediagnostics.com</span>}
              sub="Email enquiries"
              onClick={()=>{}}/>
          </CDCard>

          {/* Hours */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Hours</div>
          <CDCard padded={false} style={{ padding: '4px 16px 12px', marginBottom: 14 }}>
            {[
              { d: 'Monday',    h: '6:00 AM – 9:00 PM' },
              { d: 'Tuesday',   h: '6:00 AM – 9:00 PM' },
              { d: 'Wednesday', h: '6:00 AM – 9:00 PM', today: true },
              { d: 'Thursday',  h: '6:00 AM – 9:00 PM' },
              { d: 'Friday',    h: '6:00 AM – 9:00 PM' },
              { d: 'Saturday',  h: '6:30 AM – 8:00 PM' },
              { d: 'Sunday',    h: '7:00 AM – 2:00 PM' },
            ].map((row, i, arr) => (
              <div key={row.d} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: row.today ? 600 : 400,
                    color: row.today ? 'var(--text-1)' : 'var(--text-2)',
                  }}>{row.d}</span>
                  {row.today && <CDChip size="sm" tone="sage">Today</CDChip>}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: row.today ? 'var(--text-1)' : 'var(--text-3)',
                  fontWeight: row.today ? 500 : 400,
                }}>{row.h}</span>
              </div>
            ))}
          </CDCard>

          {/* Facilities */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Facilities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {[
              { l: 'Parking', i: <Icon.truck size={11}/> },
              { l: 'Wheelchair access', i: <Icon.shield size={11}/> },
              { l: 'AC waiting area', i: <Icon.heart size={11}/> },
              { l: 'Cash & UPI', i: <Icon.card size={11}/> },
              { l: 'Restroom', i: <Icon.check size={11}/> },
              { l: 'Pediatric room', i: <Icon.family size={11}/> },
            ].map((f) => (
              <CDChip key={f.l} tone="neutral" size="md" icon={f.i}>{f.l}</CDChip>
            ))}
          </div>

          {/* Services */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Services available</div>
          <CDCard padded={false} style={{ padding: '0 16px', marginBottom: 14 }}>
            {[
              { n: 'Blood collection', c: '450+ tests', i: <Icon.drop size={14}/>, tone: 'primary' },
              { n: 'Imaging · X-Ray', c: 'Digital · 15 min', i: <Icon.flask size={14}/>, tone: 'blue' },
              { n: 'ECG', c: '12-lead · same-day', i: <Icon.pulse size={14}/>, tone: 'sage' },
              { n: 'Ultrasound', c: 'On-site radiologist', i: <Icon.beaker size={14}/>, tone: 'primary' },
            ].map((s, i, arr) => {
              const tones = {
                primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)' },
                sage:    { bg: 'var(--sage-soft)', fg: 'var(--sage)' },
                blue:    { bg: 'var(--blue-soft)', fg: 'var(--blue)' },
              };
              const t = tones[s.tone];
              return (
                <div key={s.n} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
                }}>
                  <span style={{
                    width: 30, height: 30, borderRadius: 8, background: t.bg, color: t.fg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{s.i}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.c}</div>
                  </div>
                  <CDChip size="sm" tone="success">Available</CDChip>
                </div>
              );
            })}
          </CDCard>

          {/* Team */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>On-site team</div>
          <CDCard style={{ marginBottom: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { v: '8', l: 'Phlebotomists' },
                { v: '2', l: 'Radiologists' },
                { v: '4', l: 'Lab techs' },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </CDCard>

          {/* Reviews preview */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span>Recent reviews</span>
            <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: 11, fontWeight: 500, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
              See all 1,242
            </button>
          </div>
          {[
            { n: 'Anand R.', r: 5, t: 'Quick, painless. Report in 90 min as promised.' },
            { n: 'Kavya M.', r: 5, t: 'Phlebotomist Suresh was gentle and professional.' },
          ].map((rev, i) => (
            <CDCard key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{rev.n}</span>
                <span style={{ fontSize: 11, color: 'var(--warning)' }}>{'★'.repeat(rev.r)}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)' }}>2 weeks ago</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{rev.t}</div>
            </CDCard>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        flexShrink: 0, padding: '12px 20px 24px', borderTop: '1px solid var(--hairline)',
        background: 'var(--bg)', display: 'flex', gap: 10,
      }}>
        <CDButton variant="secondary" size="lg" style={{ flex: 1 }} icon={<Icon.phone size={16}/>}>Call lab</CDButton>
        <CDButton variant="primary" size="lg" style={{ flex: 1.4 }} iconRight={<Icon.arrowR size={16}/>}>
          Book here
        </CDButton>
      </div>
    </CDScreen>
  );
}

// Borrowed style — used by the lab profile screen for top-right icon buttons
const iconBtn = {
  width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border)',
  background: 'var(--surface-1)', color: 'var(--text-1)', position: 'relative',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};

// ─── Notification Settings ─────────────────────────────────
function ScreenNotificationSettings({ onBack }) {
  const [push, setPush]   = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [sms, setSms]     = React.useState(false);
  const [whatsapp, setWa] = React.useState(true);

  const [prefs, setPrefs] = React.useState({
    booking: true, sample: true, report: true,
    reminders: true, prep: true,
    offers: false, wellness: true, careplus: true,
  });
  const setPref = (k, v) => setPrefs((p) => ({ ...p, [k]: v }));

  const [quiet, setQuiet] = React.useState(true);

  return (
    <CDScreen>
      <CDStatus/>
      <CDTopNav back onBack={onBack} title="Notifications"/>

      <div style={{ overflow: 'auto', padding: '4px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }} className="cd-scroll">
        <p style={{ margin: '4px 0 18px', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
          Choose what to hear from CareDiagnostics — and how.
        </p>

        {/* Channels */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>Channels</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.bell size={16}/>} label="Push notifications" sub="On this device"
            onClick={() => setPush(!push)} right={<Switch on={push}/>}/>
          <CDRow icon={<Icon.info size={16}/>} label="Email" sub="priya.sharma@gmail.com"
            onClick={() => setEmail(!email)} right={<Switch on={email}/>}/>
          <CDRow icon={<Icon.phone size={16}/>} label="SMS" sub="+91 98765 43210"
            onClick={() => setSms(!sms)} right={<Switch on={sms}/>}/>
          <CDRow icon={<Icon.share size={16}/>} label="WhatsApp" sub="Order updates & reports"
            onClick={() => setWa(!whatsapp)} right={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CDChip size="sm" tone="sage">Free</CDChip>
                <Switch on={whatsapp}/>
              </span>
            }/>
        </CDCard>

        {/* Activity */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '22px 0 10px' }}>Booking & reports</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.calendar size={16}/>} label="Booking confirmation" sub="When orders are placed or changed"
            onClick={() => setPref('booking', !prefs.booking)} right={<Switch on={prefs.booking}/>}/>
          <CDRow icon={<Icon.truck size={16}/>} label="Sample collection" sub="Phlebotomist ETA & arrival"
            onClick={() => setPref('sample', !prefs.sample)} right={<Switch on={prefs.sample}/>}/>
          <CDRow icon={<Icon.pdf size={16}/>} label="Report ready" sub="Highest priority — bypasses Do Not Disturb"
            onClick={() => setPref('report', !prefs.report)} right={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CDChip size="sm" tone="primary">Critical</CDChip>
                <Switch on={prefs.report}/>
              </span>
            }/>
          <CDRow icon={<Icon.clock size={16}/>} label="Appointment reminders" sub="24h & 1h before"
            onClick={() => setPref('reminders', !prefs.reminders)} right={<Switch on={prefs.reminders}/>}/>
          <CDRow icon={<Icon.info size={16}/>} label="Pre-test prep" sub="Fasting & medication tips"
            onClick={() => setPref('prep', !prefs.prep)} right={<Switch on={prefs.prep}/>}/>
        </CDCard>

        {/* Marketing */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '22px 0 10px' }}>Tips & offers</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.tag size={16}/>} label="Promotions & coupons" sub="Discounts, package deals"
            onClick={() => setPref('offers', !prefs.offers)} right={<Switch on={prefs.offers}/>}/>
          <CDRow icon={<Icon.heart size={16}/>} label="Wellness tips" sub="Weekly health insights"
            onClick={() => setPref('wellness', !prefs.wellness)} right={<Switch on={prefs.wellness}/>}/>
          <CDRow icon={<Icon.sparkle size={16}/>} label="Care+ updates" sub="Renewal & benefits"
            onClick={() => setPref('careplus', !prefs.careplus)} right={<Switch on={prefs.careplus}/>}/>
        </CDCard>

        {/* Quiet hours */}
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '22px 0 10px' }}>Quiet hours</div>
        <CDCard padded={false} style={{ padding: '0 16px' }}>
          <CDRow icon={<Icon.shield size={16}/>} label="Do Not Disturb" sub="Mute non-critical notifications"
            onClick={() => setQuiet(!quiet)} right={<Switch on={quiet}/>}/>
          {quiet && (
            <>
              <CDRow icon={<Icon.clock size={16}/>} label="From" sub="Start of quiet window"
                onClick={()=>{}} right={
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>10:00 PM</span>
                }/>
              <CDRow icon={<Icon.clock size={16}/>} label="To" sub="End of quiet window"
                onClick={()=>{}} right={
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>7:00 AM</span>
                }/>
            </>
          )}
        </CDCard>

        {/* Tip */}
        <CDCard tone="raised" style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon.info size={16} color="var(--blue)"/>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-1)' }}>Critical alerts</strong> (report ready, sample missed) always reach you — even in Do Not Disturb — so you never miss something urgent.
          </div>
        </CDCard>

        {/* Test notification */}
        <button style={{
          marginTop: 14, padding: 14, borderRadius: 12, cursor: 'pointer',
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--text-1)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon.bell size={14}/> Send a test notification
        </button>
      </div>
    </CDScreen>
  );
}