// CareDiagnostics — Interactive Prototype Flow
// Connects screens into a real working flow with state.

function InteractiveFlow() {
  const [route, setRoute] = React.useState('login');
  const [history, setHistory] = React.useState([]);
  const [editMemberId, setEditMemberId] = React.useState(null);
  const [editAddrId, setEditAddrId] = React.useState(null);
  const [addrPickerId, setAddrPickerId] = React.useState('home');

  const go = React.useCallback((to) => {
    setHistory((h) => [...h, route]);
    setRoute(to);
  }, [route]);
  const back = React.useCallback(() => {
    setHistory((h) => {
      const next = h.slice(0, -1);
      const last = h[h.length - 1] ?? 'home';
      setRoute(last);
      return next;
    });
  }, []);
  const reset = React.useCallback(() => { setHistory([]); setRoute('login'); }, []);
  const tabNav = React.useCallback((tab) => {
    // Tab destinations reset their own history slot; other routes get pushed
    const tabs = ['home', 'bookings', 'reports', 'profile'];
    if (tabs.includes(tab)) {
      setRoute(tab);
    } else {
      // Treat as a navigation push (notifications, etc)
      setHistory((h) => [...h, route]);
      setRoute(tab);
    }
  }, [route]);

  let screen = null;
  switch (route) {
    case 'login':
      screen = <ScreenLogin onContinue={() => go('otp')}
        onTerms={() => go('webTerms')} onPrivacy={() => go('webPrivacy')}/>;
      break;
    case 'otp':
      screen = <ScreenOTP onVerify={() => { setHistory([]); setRoute('home'); }} onBack={back}/>;
      break;
    case 'home':
      screen = <ScreenHome onNav={tabNav}
        onSearch={() => go('listing')}
        onPackage={() => go('package')}
        onCart={() => go('cart')}
        onFamily={() => go('family')}
        onLabProfile={() => go('labProfile')}/>;
      break;
    case 'listing':
      screen = <ScreenListing onBack={back} onPackage={() => go('package')}/>;
      break;
    case 'package':
      screen = <ScreenPackageDetail onBack={back} onAddCart={() => go('cart')} onTest={() => go('test')}/>;
      break;
    case 'test':
      screen = <ScreenTestDetail onBack={back} onAddCart={() => go('cart')}/>;
      break;
    case 'cart':
      screen = <ScreenCart onBack={back} onContinue={() => go('slot')}/>;
      break;
    case 'slot':
      screen = <ScreenSlot onBack={back} onContinue={() => go('summary')} onChangeAddress={() => go('addressPicker')}/>;
      break;
    case 'summary':
      screen = <ScreenSummary onBack={back} onConfirm={() => go('success')}/>;
      break;
    case 'success':
      screen = <ScreenSuccess onTrack={() => { setHistory([]); setRoute('bookingDetail'); }} onHome={() => { setHistory([]); setRoute('home'); }}/>;
      break;
    case 'bookings':
      screen = <ScreenBookings onNav={tabNav} onDetail={() => go('bookingDetail')}/>;
      break;
    case 'bookingDetail':
      screen = <ScreenBookingDetail onBack={back}
        onReschedule={() => go('reschedule')}
        onCancel={() => go('cancelSheet')}/>;
      break;
    case 'reschedule':
      screen = <window.ScreenReschedule onBack={back} onConfirm={back}/>;
      break;
    case 'cancelSheet':
      // Render booking detail behind, with cancel sheet overlaid
      screen = (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <ScreenBookingDetail onBack={back} onReschedule={() => go('reschedule')} onCancel={() => {}}/>
          <window.CancelBookingSheet onClose={back} onConfirm={() => { setHistory([]); setRoute('bookings'); }}/>
        </div>
      );
      break;
    case 'reports':
      screen = <ScreenReports onNav={tabNav} onReport={() => go('reportDetail')}/>;
      break;
    case 'reportDetail':
      screen = <ScreenReportDetail onBack={back}/>;
      break;
    case 'profile':
      screen = <ScreenProfile2 onNav={tabNav}
        onFamily={() => go('family')}
        onAddresses={() => go('addresses')}
        onAppearance={() => go('appearance')}
        onLanguage={() => go('language')}
        onNotifSettings={() => go('notifSettings')}
        onSignOut={() => { setHistory([]); setRoute('login'); }}/>;
      break;
    case 'family':
      screen = <window.ScreenFamily onBack={back}
        onAdd={() => { setEditMemberId(null); go('familyForm'); }}
        onEdit={(id) => { setEditMemberId(id); go('familyForm'); }}/>;
      break;
    case 'familyForm':
      screen = <window.ScreenFamilyForm onBack={back} onSave={back} member={editMemberId}/>;
      break;
    case 'addresses':
      screen = <window.ScreenAddresses onBack={back}
        onAdd={() => { setEditAddrId(null); go('addressForm'); }}
        onEdit={(id) => { setEditAddrId(id); go('addressForm'); }}/>;
      break;
    case 'addressPicker':
      screen = <window.ScreenAddresses onBack={back} picker selectedId={addrPickerId}
        onAdd={() => { setEditAddrId(null); go('addressForm'); }}
        onEdit={(id) => { setEditAddrId(id); go('addressForm'); }}
        onPick={(id) => setAddrPickerId(id)}/>;
      break;
    case 'addressForm':
      screen = <window.ScreenAddressForm onBack={back} onSave={back} addrId={editAddrId}/>;
      break;
    case 'appearance':
      screen = <window.ScreenAppearance onBack={back}/>;
      break;
    case 'language':
      screen = <window.ScreenLanguage onBack={back}/>;
      break;
    case 'notifSettings':
      screen = <window.ScreenNotificationSettings onBack={back}/>;
      break;
    case 'labProfile':
      screen = <window.ScreenLabProfile onBack={back}/>;
      break;
    case 'webTerms':
      screen = <window.ScreenWebView onBack={back} doc="terms"/>;
      break;
    case 'webPrivacy':
      screen = <window.ScreenWebView onBack={back} doc="privacy"/>;
      break;
    case 'notifications':
      screen = <ScreenNotifications onBack={back}/>;
      break;
    default:
      screen = <ScreenHome onNav={tabNav}/>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div key={route} style={{ width: '100%', height: '100%', animation: 'cdFadeIn 0.25s ease-out' }}>
        {screen}
      </div>
      {/* Reset button (subtle) */}
      <button onClick={reset} title="Restart flow" style={{
        position: 'absolute', top: 14, right: 14, zIndex: 100,
        width: 28, height: 28, borderRadius: 999, background: 'rgba(232,151,102,0.85)',
        border: 'none', color: '#1A1108', cursor: 'pointer', fontSize: 10, fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>↺</button>
    </div>
  );
}

window.InteractiveFlow = InteractiveFlow;
