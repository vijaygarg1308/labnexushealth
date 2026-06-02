// CareDiagnostics — Auth screens: Splash, Login, OTP, Profile Completion

// ─── Splash ─────────────────────────────────────────────────
function ScreenSplash() {
  return (
    <div className="cd-screen" style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* ambient gradient */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--primary-soft) 0%, transparent 70%)',
        filter: 'blur(20px)', opacity: 0.7, pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="4" y="4" width="72" height="72" rx="22" fill="var(--primary)"/>
          <path d="M26 40h28M40 26v28" stroke="var(--on-primary)" strokeWidth="6" strokeLinecap="round"/>
          <path d="M26 54c5-2.5 9-4.5 14-4.5s9 2 14 4.5" stroke="var(--on-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        </svg>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30,
            letterSpacing: '-0.035em', color: 'var(--text-1)',
          }}>CareDiagnostics</div>
          <div style={{ color: 'var(--text-3)', fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Healthcare, simplified
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 80, color: 'var(--text-3)', fontSize: 11, letterSpacing: '0.05em' }}>
        ISO 15189 · NABL Accredited
      </div>
    </div>
  );
}

// ─── Login (phone + onboarding visual) ──────────────────────
function ScreenLogin({ onContinue, onTerms, onPrivacy }) {
  const [mode, setMode] = React.useState('mobile'); // 'mobile' | 'email'
  const [phone, setPhone] = React.useState('98765 43210');
  const [email, setEmail] = React.useState('priya.sharma@gmail.com');
  const isMobile = mode === 'mobile';

  // simple validity check for the active field
  const phoneValid = phone.replace(/\D/g, '').length === 10;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canContinue = isMobile ? phoneValid : emailValid;

  return (
    <CDScreen>
      <CDStatus/>
      <div style={{ padding: '24px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }} className="cd-scroll">
        {/* Visual area */}
        <div style={{
          position: 'relative', borderRadius: 28, height: 280, flexShrink: 0,
          background: 'linear-gradient(160deg, var(--surface-2) 0%, var(--surface-1) 100%)',
          border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 22,
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -40, width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary-soft) 0%, transparent 70%)',
          }}/>
          <div style={{
            position: 'absolute', bottom: -40, left: -30, width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, var(--sage-soft) 0%, transparent 70%)',
          }}/>
          <div style={{
            position: 'absolute', top: 24, left: 24, width: 160, padding: 14, borderRadius: 16,
            background: 'var(--surface-1)', border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)', transform: 'rotate(-4deg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--sage-soft)',
                color: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.heart size={14}/>
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Heart Health</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>72 <span style={{fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-sans)'}}>bpm</span></div>
            <CDSparkline values={[68,70,72,71,73,72,72]} width={130} height={20} color="var(--sage)"/>
          </div>
          <div style={{
            position: 'absolute', top: 100, right: 20, width: 150, padding: 14, borderRadius: 16,
            background: 'var(--surface-1)', border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)', transform: 'rotate(5deg)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Lipid Panel</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Report ready</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              <CDChip size="sm" tone="success">Normal</CDChip>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: 20, left: 40, padding: '10px 14px',
            borderRadius: 999, background: 'var(--surface-1)', border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon.truck size={12} color="var(--on-primary)"/>
            </span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>Phlebotomist arriving · 8 min</span>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 18, flexShrink: 0 }}>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 28, letterSpacing: '-0.035em', lineHeight: 1.05,
          }}>
            Care that comes<br/>to your door.
          </h1>
          <p style={{ margin: '10px 0 0', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
            Book diagnostic tests, track samples, and read reports — all in one trusted place.
          </p>
        </div>

        {/* Mode toggle — segmented */}
        <div style={{
          display: 'flex', padding: 4, borderRadius: 12,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          marginBottom: 10, flexShrink: 0,
        }}>
          {[
            { v: 'mobile', l: 'Mobile', i: <Icon.phone size={14}/> },
            { v: 'email',  l: 'Email',  i: <Icon.info size={14}/> },
          ].map((t) => {
            const on = mode === t.v;
            return (
              <button key={t.v} onClick={() => setMode(t.v)} style={{
                flex: 1, height: 36, borderRadius: 9, border: 'none', cursor: 'pointer',
                background: on ? 'var(--surface-1)' : 'transparent',
                color: on ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: on ? 'var(--shadow-sm)' : 'none',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'background .15s, color .15s',
              }}>
                {t.v === 'mobile' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="2" width="12" height="20" rx="2.5"/>
                    <path d="M11 18h2"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2.5"/>
                    <path d="M3 7l9 6 9-6"/>
                  </svg>
                )}
                {t.l}
              </button>
            );
          })}
        </div>

        {/* Field */}
        {isMobile ? (
          <div style={{
            display: 'flex', height: 56, borderRadius: 14, background: 'var(--surface-1)',
            border: phoneValid ? '1px solid var(--border)' : '1px solid var(--border)',
            overflow: 'hidden', marginBottom: 14, flexShrink: 0,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px',
              borderRight: '1px solid var(--border)', background: 'var(--surface-2)',
            }}>
              <span style={{ fontSize: 16 }}>🇮🇳</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500 }}>+91</span>
              <Icon.chevronD size={14} color="var(--text-3)"/>
            </div>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)}
              inputMode="numeric" maxLength={11}
              placeholder="98765 43210" style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
              padding: '0 16px', color: 'var(--text-1)', fontSize: 16, fontWeight: 500,
              fontFamily: 'var(--font-mono)', letterSpacing: '0.03em',
            }}/>
            {phoneValid && (
              <span style={{
                alignSelf: 'center', marginRight: 14,
                width: 20, height: 20, borderRadius: 999, background: 'var(--sage)',
                color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.check size={11} stroke={3}/></span>
            )}
          </div>
        ) : (
          <div style={{
            display: 'flex', height: 56, borderRadius: 14, background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            overflow: 'hidden', marginBottom: 14, flexShrink: 0, alignItems: 'center',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', padding: '0 0 0 16px',
              color: 'var(--text-3)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2.5"/>
                <path d="M3 7l9 6 9-6"/>
              </svg>
            </div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
              type="email" autoComplete="email" placeholder="you@email.com"
              style={{
                flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                padding: '0 14px', color: 'var(--text-1)', fontSize: 15, fontWeight: 500,
                fontFamily: 'inherit', letterSpacing: '-0.005em',
              }}/>
            {emailValid && (
              <span style={{
                marginRight: 14,
                width: 20, height: 20, borderRadius: 999, background: 'var(--sage)',
                color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.check size={11} stroke={3}/></span>
            )}
          </div>
        )}

        {/* Helper line */}
        <div style={{
          fontSize: 11, color: 'var(--text-3)', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
        }}>
          <Icon.info size={11} color="var(--text-3)"/>
          We'll send a one-time code to verify your {isMobile ? 'number' : 'email'}.
        </div>

        <CDButton variant="primary" size="lg" full onClick={onContinue} disabled={!canContinue}
          iconRight={<Icon.arrowR size={18}/>}>
          Continue
        </CDButton>

        {/* Other-method shortcut */}
        <button onClick={() => setMode(isMobile ? 'email' : 'mobile')} style={{
          marginTop: 12, border: 'none', background: 'transparent', cursor: 'pointer',
          color: 'var(--primary)', fontSize: 13, fontWeight: 500, padding: '8px 0',
          fontFamily: 'inherit', flexShrink: 0,
        }}>
          Continue with {isMobile ? 'email' : 'mobile number'} instead
        </button>

        <div style={{ marginTop: 14, textAlign: 'center', color: 'var(--text-3)', fontSize: 11, lineHeight: 1.5, paddingBottom: 14 }}>
          By continuing, you accept our{' '}
          <button onClick={onTerms} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            color: 'var(--text-2)', textDecoration: 'underline', fontSize: 11, fontFamily: 'inherit',
          }}>Terms</button>{' '}&{' '}
          <button onClick={onPrivacy} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            color: 'var(--text-2)', textDecoration: 'underline', fontSize: 11, fontFamily: 'inherit',
          }}>Privacy Policy</button>.<br/>
          Your data stays encrypted, end-to-end.
        </div>
      </div>
    </CDScreen>
  );
}

// ─── OTP Verification ───────────────────────────────────────
function ScreenOTP({ onVerify, onBack }) {
  const [otp, setOtp] = React.useState('');
  const filled = otp.length;
  const slots = [0,1,2,3,4,5];
  const [counter, setCounter] = React.useState(28);
  const [verifying, setVerifying] = React.useState(false);

  React.useEffect(() => {
    if (counter > 0) {
      const t = setTimeout(() => setCounter(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [counter]);

  const scheduledRef = React.useRef(false);
  // Auto-advance when complete
  React.useEffect(() => {
    if (otp.length === 6 && !scheduledRef.current) {
      scheduledRef.current = true;
      setVerifying(true);
      const t = setTimeout(() => { onVerify?.(); }, 600);
      return () => clearTimeout(t);
    }
    if (otp.length < 6 && scheduledRef.current) {
      scheduledRef.current = false;
      setVerifying(false);
    }
  }, [otp, onVerify]);

  const press = (k) => {
    if (verifying) return;
    if (k === '⌫') { setOtp((s) => s.slice(0, -1)); return; }
    if (typeof k === 'number' && otp.length < 6) setOtp((s) => s + String(k));
  };

  return (
    <CDScreen>
      <CDStatus/>
      <CDTopNav back onBack={onBack}/>
      <div style={{ padding: '12px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 28, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>Enter verification code</h1>
          <p style={{ margin: '10px 0 0', color: 'var(--text-2)', fontSize: 14 }}>
            We sent a 6-digit code to <span style={{color:'var(--text-1)', fontWeight:500, fontFamily:'var(--font-mono)'}}>+91 98765 43210</span>{' '}
            <button onClick={onBack} style={{
              border:'none', background:'transparent', color:'var(--primary)',
              fontSize:13, fontWeight:500, cursor:'pointer', padding:0,
            }}>Change</button>
          </p>
        </div>

        {/* OTP boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 24 }}>
          {slots.map((i) => {
            const d = otp[i];
            const isFilled = d !== undefined;
            const isActive = i === filled && !verifying;
            const isDone = verifying;
            return (
              <div key={i} style={{
                aspectRatio: '1 / 1.15', borderRadius: 14,
                background: isFilled ? 'var(--surface-2)' : 'var(--surface-1)',
                border: isDone ? '1.5px solid var(--sage)'
                              : isActive ? '1.5px solid var(--primary)'
                              : isFilled ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                boxShadow: isDone ? '0 0 0 4px var(--sage-soft)'
                                  : isActive ? '0 0 0 4px var(--primary-soft)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)',
                color: isDone ? 'var(--sage)' : isFilled ? 'var(--text-1)' : 'var(--text-3)',
                transition: 'all .18s',
              }}>
                {isFilled ? d : isActive ? <span style={{ width: 2, height: 22, background: 'var(--primary)', borderRadius: 1, animation: 'cdPulse 1.2s ease-in-out infinite' }}/> : ''}
              </div>
            );
          })}
        </div>

        {/* Resend */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, background: 'var(--surface-1)',
          border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon.clock size={16} color="var(--text-3)"/>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Resend code</span>
          </div>
          <button onClick={() => counter === 0 && setCounter(28)} style={{
            border: 'none', background: 'transparent', cursor: counter === 0 ? 'pointer' : 'default',
            padding: 0,
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
            color: counter > 0 ? 'var(--text-3)' : 'var(--primary)',
          }}>
            {counter > 0 ? `in 0:${String(counter).padStart(2,'0')}` : 'Tap to resend'}
          </button>
        </div>

        <CDButton variant="primary" size="lg" full disabled={filled < 6 || verifying}
          onClick={onVerify}
          iconRight={verifying ? null : <Icon.arrowR size={18}/>}>
          {verifying ? 'Verifying…' : 'Verify & continue'}
        </CDButton>

        <div style={{ marginTop: 12, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <Icon.shield size={13} color="var(--sage)"/>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Encrypted with bank-grade security</span>
        </div>
      </div>

      {/* simulated keypad */}
      <div style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--hairline)',
        padding: '12px 8px 20px', display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
        flexShrink: 0,
      }}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
          <button key={i} onClick={() => press(k)} disabled={k === '' || verifying} style={{
            height: 54, borderRadius: 12, border: 'none',
            background: k === '' ? 'transparent' : 'var(--surface-2)',
            color: 'var(--text-1)', fontSize: 22, fontWeight: 500, fontFamily: 'var(--font-mono)',
            cursor: k === '' || verifying ? 'default' : 'pointer',
            opacity: verifying ? 0.5 : 1,
            transition: 'background .12s, transform .1s',
          }}
          onMouseDown={(e)=>{ if (k !== '' && !verifying) e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e)=>{ e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.transform = 'scale(1)'; }}
          >{k}</button>
        ))}
      </div>
    </CDScreen>
  );
}

// ─── Profile Completion ────────────────────────────────────
function ScreenProfile({ onSubmit, onBack, phoneVerified = true, sheetOpen: sheetOpenProp = false }) {
  const [sheetOpen, setSheetOpen] = React.useState(sheetOpenProp);
  const verified = phoneVerified;
  return (
    <CDScreen>
      <CDStatus/>
      <CDTopNav back onBack={onBack} right={<span style={{ fontSize:12, color:'var(--text-3)' }}>Step 2 of 2</span>}/>
      <div style={{ padding: '12px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }} className="cd-scroll">
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--primary)' }}/>
          <span style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--primary)' }}/>
        </div>

        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
                     fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Tell us about you
        </h1>
        <p style={{ margin: '8px 0 24px', color: 'var(--text-2)', fontSize: 14 }}>
          We'll use this to label your reports correctly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PhoneField verified={verified} onChange={() => setSheetOpen(true)}/>
          <Field label="Full name" value="Priya Sharma" />
          <Field label="Date of birth" value="14 Mar 1991" icon={<Icon.calendar size={16} color="var(--text-3)"/>}/>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8, fontWeight: 500, letterSpacing: '0.02em' }}>SEX</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Female','Male','Other'].map((g, i) => (
                <button key={g} style={{
                  flex: 1, height: 46, borderRadius: 12,
                  background: i === 0 ? 'var(--primary-soft)' : 'var(--surface-1)',
                  border: i === 0 ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  color: i === 0 ? 'var(--primary)' : 'var(--text-2)',
                  fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
                }}>{g}</button>
              ))}
            </div>
          </div>
          <Field label="Email (optional)" value="priya.sharma@gmail.com"/>
        </div>

        <div style={{ marginTop: 24, padding: 14, background: 'var(--sage-soft)',
                      border: '1px solid rgba(159,200,183,0.18)', borderRadius: 12,
                      display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon.shield size={16} color="var(--sage)"/>
          <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            Your personal data is never sold or shared. Reports stay private to you and patients you add.
          </span>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <CDButton variant="primary" size="lg" full onClick={onSubmit}
            iconRight={<Icon.arrowR size={18}/>}>Continue to home</CDButton>
        </div>
      </div>

      {sheetOpen && <VerifyPhoneSheet onClose={() => setSheetOpen(false)}/>}
    </CDScreen>
  );
}

// Phone field — verified (locked) or unverified (CTA)
function PhoneField({ verified, onChange }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.02em' }}>MOBILE NUMBER</span>
        {verified ? (
          <span style={{ fontSize: 11, color: 'var(--sage)', fontWeight: 500, letterSpacing: '0.02em',
                          display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon.check size={11} stroke={2.5}/> VERIFIED
          </span>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 500, letterSpacing: '0.02em',
                          display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon.warn size={11}/> NOT VERIFIED
          </span>
        )}
      </div>
      <div style={{
        height: 52, borderRadius: 12,
        background: verified ? 'var(--surface-2)' : 'var(--surface-1)',
        border: verified ? '1px solid var(--border)' : '1.5px solid var(--warning)',
        boxShadow: verified ? 'none' : '0 0 0 4px rgba(232,197,106,0.10)',
        padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10,
        opacity: verified ? 0.92 : 1,
      }}>
        <span style={{ fontSize: 14 }}>🇮🇳</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500,
          color: 'var(--text-1)', letterSpacing: '0.01em',
        }}>+91 98765 43210</span>
        <span style={{ flex: 1 }}/>
        {verified ? (
          <button onClick={onChange} style={{
            border: 'none', background: 'transparent', color: 'var(--text-3)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer', padding: 0,
          }}>Change</button>
        ) : (
          <button onClick={onChange} style={{
            height: 32, padding: '0 12px', borderRadius: 999, border: 'none',
            background: 'var(--warning)', color: 'var(--bg)', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          }}>Verify now</button>
        )}
      </div>
    </div>
  );
}

// Bottom sheet — phone verification
function VerifyPhoneSheet({ onClose }) {
  const [counter, setCounter] = React.useState(28);
  React.useEffect(() => {
    if (counter > 0) {
      const t = setTimeout(() => setCounter(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [counter]);
  const digits = ['4','8','2'];
  const filled = digits.length;

  return (
    <>
      {/* backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        zIndex: 200, animation: 'cdFadeIn 0.2s ease-out',
      }}/>
      {/* sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 201,
        background: 'var(--surface-1)', borderTopLeftRadius: 28, borderTopRightRadius: 28,
        borderTop: '1px solid var(--border)', boxShadow: '0 -20px 60px rgba(0,0,0,0.4)',
        padding: '12px 24px 28px', animation: 'cdSlideUp 0.32s cubic-bezier(0.2, 0.9, 0.3, 1)',
      }}>
        {/* grabber */}
        <div style={{
          width: 40, height: 5, borderRadius: 3, background: 'var(--surface-3)',
          margin: '0 auto 16px',
        }}/>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600,
                         fontSize: 20, letterSpacing: '-0.02em' }}>Verify mobile</h2>
            <p style={{ margin: '6px 0 0', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.45 }}>
              Sent a 6-digit code to <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-1)', fontWeight: 500 }}>+91 98765 43210</span>
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 999, border: '1px solid var(--border)',
            background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon.close size={14}/></button>
        </div>

        {/* OTP slots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginTop: 20, marginBottom: 16 }}>
          {[0,1,2,3,4,5].map((i) => {
            const d = digits[i];
            const isFilled = d !== undefined;
            const isActive = i === filled;
            return (
              <div key={i} style={{
                aspectRatio: '1 / 1.15', borderRadius: 12,
                background: isFilled ? 'var(--surface-2)' : 'var(--surface-1)',
                border: isActive ? '1.5px solid var(--primary)' : isFilled ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                boxShadow: isActive ? '0 0 0 3px var(--primary-soft)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-mono)',
                color: isFilled ? 'var(--text-1)' : 'var(--text-3)',
              }}>
                {isFilled ? d : isActive ? <span style={{ width: 2, height: 18, background: 'var(--primary)', borderRadius: 1, animation: 'cdPulse 1.2s ease-in-out infinite' }}/> : ''}
              </div>
            );
          })}
        </div>

        {/* Resend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.clock size={14} color="var(--text-3)"/>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Resend code</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
            color: counter > 0 ? 'var(--text-3)' : 'var(--primary)',
          }}>
            {counter > 0 ? `in 0:${String(counter).padStart(2,'0')}` : 'Tap to resend'}
          </span>
        </div>

        <CDButton variant="primary" size="lg" full disabled={filled < 6} onClick={onClose}
          iconRight={<Icon.check size={16}/>}>
          Verify mobile
        </CDButton>

        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
          <Icon.shield size={12} color="var(--sage)"/>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>End-to-end encrypted</span>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, icon, mono }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8, fontWeight: 500, letterSpacing: '0.02em' }}>{label.toUpperCase()}</div>
      <div style={{
        height: 52, borderRadius: 12, background: 'var(--surface-1)',
        border: '1px solid var(--border)', padding: '0 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 15, color: 'var(--text-1)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</span>
        {icon}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSplash, ScreenLogin, ScreenOTP, ScreenProfile, VerifyPhoneSheet });
