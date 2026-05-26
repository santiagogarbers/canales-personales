import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

function QRCode({ size = 220 }) {
  const N = 21;
  const cs = size / N;
  const grid = Array(N).fill(null).map(() => Array(N).fill(0));

  function addFinder(sr, sc) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const border = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[sr + r][sc + c] = (border || inner) ? 1 : 0;
      }
    }
  }

  addFinder(0, 0);
  addFinder(0, N - 7);
  addFinder(N - 7, 0);

  for (let i = 8; i < N - 8; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if ((r < 9 && c < 9) || (r < 9 && c >= N - 8) || (r >= N - 8 && c < 9)) continue;
      if (r === 6 || c === 6) continue;
      if (grid[r][c] !== 0) continue;
      grid[r][c] = ((r * 13 + c * 7 + r * c) % 5 < 2) ? 1 : 0;
    }
  }

  const cx = Math.round(N / 2);
  for (let r = cx - 2; r <= cx + 2; r++)
    for (let c = cx - 2; c <= cx + 2; c++)
      if (r >= 0 && r < N && c >= 0 && c < N) grid[r][c] = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: 4 }}>
      <rect width={size} height={size} fill="white" />
      {grid.flatMap((row, r) =>
        row.map((val, c) =>
          val === 1 ? <rect key={`${r}-${c}`} x={c * cs} y={r * cs} width={cs} height={cs} fill="#111" /> : null
        )
      )}
      <circle cx={size / 2} cy={size / 2} r={cs * 2.6} fill="white" />
      <circle cx={size / 2} cy={size / 2} r={cs * 2.1} fill="#25D366" />
      <path
        transform={`translate(${size / 2 - cs * 1.3}, ${size / 2 - cs * 1.4}) scale(${(cs * 2.6) / 28})`}
        d="M14 2.5C7.6 2.5 2.5 7.6 2.5 14c0 2.1.56 4.07 1.54 5.76L2.5 25.5l5.9-1.52A11.45 11.45 0 0 0 14 25.5c6.4 0 11.5-5.1 11.5-11.5S20.4 2.5 14 2.5z"
        fill="white"
      />
    </svg>
  );
}

function WALogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="#25D366" />
      <path d="M28 8C17 8 8 17 8 28c0 3.5.94 6.8 2.6 9.64L8 48l10.6-2.56A19.94 19.94 0 0 0 28 48c11 0 20-9 20-20S39 8 28 8z" fill="white" />
      <path d="M38.6 33.9c-.5-.25-2.96-1.46-3.42-1.63-.46-.17-.8-.25-1.13.25-.34.5-1.3 1.63-1.6 1.96-.3.34-.59.38-1.1.13-.5-.25-2.13-.79-4.06-2.52-1.5-1.34-2.51-3-2.8-3.5-.3-.5-.03-.77.22-1.02.23-.23.5-.6.75-.9.25-.3.34-.5.5-.84.17-.33.08-.63-.04-.88-.12-.25-1.13-2.72-1.55-3.72-.41-.98-.83-.84-.96-.84H23c-.33 0-.88.13-1.34.63s-1.75 1.71-1.75 4.17c0 2.46 1.8 4.83 2.04 5.17.25.33 3.54 5.4 8.59 7.58.96.41 1.7.66 2.29 1.04 1.2.38 2.29.33 3.16.2.96-.14 2.96-.96 3.38-1.9.42-.96.42-1.78.3-1.96-.12-.17-.46-.25-.96-.5z" fill="#25D366" />
    </svg>
  );
}

const STEPS_LABELS = [
  'Escaneando código QR...',
  'Verificando dispositivo...',
  'Estableciendo conexión...',
];

export default function WhatsAppQRModal({ onClose, onSuccess }) {
  const [scanState, setScanState] = useState('idle'); // idle | loading | success
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanState !== 'success') return;
    const t = setTimeout(() => onSuccess?.(), 2000);
    return () => clearTimeout(t);
  }, [scanState]);

  useEffect(() => {
    if (scanState !== 'loading') return;
    setProgress(0);
    const DURATION = 2800;
    const INTERVAL = 30;
    const step = (100 / DURATION) * INTERVAL;
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + step;
        if (next >= 100) { clearInterval(timer); return 100; }
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [scanState]);

  function handleSimulate() {
    setScanState('loading');
    setTimeout(() => setScanState('success'), 2900);
  }

  const loadingLabel =
    progress < 35 ? STEPS_LABELS[0] :
    progress < 75 ? STEPS_LABELS[1] :
    STEPS_LABELS[2];

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget && scanState === 'idle') onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div style={{
        width: 740, borderRadius: 14,
        overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        display: 'flex', flexDirection: 'column',
        background: '#fff', position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', transition: 'background .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          <X size={16} />
        </button>

        {/* Green header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a7a54 0%, #128C7E 60%, #075E54 100%)',
          padding: '28px 32px 32px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="26" height="26" viewBox="0 0 56 56" fill="none">
              <path d="M28 4C14.7 4 4 14.7 4 28c0 4.2 1.13 8.14 3.1 11.55L4 52l12.8-3.05A23.92 23.92 0 0 0 28 52c13.3 0 24-10.7 24-24S41.3 4 28 4z" fill="white" />
              <path d="M37.9 33.6c-.6-.3-3.5-1.74-4.05-1.93-.55-.2-.95-.3-1.35.3-.4.6-1.54 1.93-1.9 2.33-.34.4-.7.45-1.3.15-.6-.3-2.52-.93-4.8-2.97-1.77-1.58-2.97-3.53-3.32-4.13-.34-.6-.04-.92.26-1.22.28-.27.6-.7.9-1.05.3-.35.4-.6.6-1 .2-.4.1-.75-.05-1.05-.15-.3-1.35-3.25-1.85-4.45-.49-1.17-.98-1-.35-1.02l-1.15-.02c-.4 0-1.05.15-1.6.75-.54.6-2.08 2.03-2.08 4.95s2.13 5.74 2.43 6.14c.3.4 4.2 6.4 10.17 8.98 1.42.62 2.53.98 3.4 1.26 1.43.45 2.73.38 3.75.23.82-.13 2.52-1.03 2.87-2.02.36-.98.36-1.83.25-2.01-.1-.2-.4-.3-1-.6z" fill="#25D366" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'white', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            WhatsApp Web
          </span>
        </div>

        {/* ── IDLE: QR view ── */}
        {scanState === 'idle' && (
          <div style={{ padding: '24px 32px 28px' }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, color: '#525252', marginBottom: 24, lineHeight: 1.3 }}>
                  Use WhatsApp on your computer
                </h2>
                <ol style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    <>Open WhatsApp on your phone</>,
                    <>Tap <strong>Menu</strong> <span style={{ color: '#6b7280' }}>⋮</span> on Android, or <strong>Settings</strong> <span style={{ fontSize: 13, color: '#6b7280' }}>⚙</span> on iPhone</>,
                    <>Tap <strong>Linked devices</strong> and then <strong>Link a device</strong></>,
                    <>Point your phone at this screen to capture the QR code</>,
                  ].map((step, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
                      <span style={{ color: '#6b7280', minWidth: 20 }}>{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div style={{ flexShrink: 0 }}>
                <QRCode size={220} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0 20px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button style={{
                background: 'none', border: 'none', padding: 0,
                fontSize: 14, color: '#128C7E', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', textDecoration: 'underline',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#075E54'}
                onMouseLeave={e => e.currentTarget.style.color = '#128C7E'}
              >
                Link with phone number
              </button>
              <button
                onClick={handleSimulate}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px', borderRadius: 20,
                  background: '#25D366', color: 'white',
                  border: 'none', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1ebe5a'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                <svg width="14" height="14" viewBox="0 0 56 56" fill="none">
                  <path d="M28 4C14.7 4 4 14.7 4 28c0 4.2 1.13 8.14 3.1 11.55L4 52l12.8-3.05A23.92 23.92 0 0 0 28 52c13.3 0 24-10.7 24-24S41.3 4 28 4z" fill="white" />
                </svg>
                Simular escaneo
              </button>
            </div>
          </div>
        )}

        {/* ── LOADING: full body ── */}
        {scanState === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <style>{`
              @keyframes spin-ring { to { transform: rotate(360deg); } }
              @keyframes pulse-logo { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
            `}</style>

            <div style={{
              padding: '56px 32px 48px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
            }}>
              {/* Spinning ring + logo */}
              <div style={{ position: 'relative', width: 100, height: 100 }}>
                <svg
                  width="100" height="100" viewBox="0 0 100 100"
                  style={{ position: 'absolute', inset: 0, animation: 'spin-ring 1.1s linear infinite' }}
                >
                  <circle cx="50" cy="50" r="44" stroke="#e5e7eb" strokeWidth="5" fill="none" />
                  <path
                    d="M50 6 a44 44 0 0 1 38.1 22"
                    stroke="#25D366" strokeWidth="5" strokeLinecap="round" fill="none"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 12,
                  animation: 'pulse-logo 1.6s ease-in-out infinite',
                }}>
                  <WALogo size={76} />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>
                  Conectando con WhatsApp
                </p>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0, minHeight: 20, transition: 'opacity .3s' }}>
                  {loadingLabel}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 6, background: '#e5e7eb' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #25D366, #128C7E)',
                transition: 'width 30ms linear',
                borderRadius: '0 4px 4px 0',
              }} />
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {scanState === 'success' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              padding: '56px 32px 52px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: '#dcfce7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={36} color="#16a34a" strokeWidth={2.5} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>
                  ¡Conectado exitosamente!
                </p>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
                  Tu línea de WhatsApp ya está vinculada.
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  marginTop: 8, padding: '10px 28px', borderRadius: 20,
                  background: '#25D366', color: 'white',
                  border: 'none', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1ebe5a'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                Cerrar
              </button>
            </div>
            {/* Full green bar at bottom */}
            <div style={{ height: 6, background: 'linear-gradient(90deg, #25D366, #128C7E)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
