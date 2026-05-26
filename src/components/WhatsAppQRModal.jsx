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
  return <img src="/whatsapp-icon.png" width={size} height={size} alt="WhatsApp" style={{ borderRadius: size * 0.2, display: 'block' }} />;
}

const STEPS_LABELS = [
  'Escaneando código QR...',
  'Verificando dispositivo...',
  'Estableciendo conexión...',
];

export default function WhatsAppQRModal({ onClose, onSuccess }) {
  const [scanState, setScanState] = useState('idle'); // idle | loading | success
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (scanState !== 'success') return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
    const t = setTimeout(() => onSuccess?.(), 3000);
    return () => { clearInterval(interval); clearTimeout(t); };
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
        {/* Close button — hidden on success */}
        {scanState !== 'success' && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14, zIndex: 10,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(0,0,0,0.08)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#374151', transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
          >
            <X size={16} />
          </button>
        )}

        {/* White header */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '24px 32px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <img src="/whatsapp-icon.png" width={44} height={44} alt="WhatsApp" style={{ borderRadius: 12, display: 'block', flexShrink: 0 }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
            Utiliza WhatsApp Personal en Botmaker
          </span>
        </div>

        {/* ── IDLE: QR view ── */}
        {scanState === 'idle' && (
          <div style={{ padding: '24px 32px 28px' }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, color: '#525252', marginBottom: 24, lineHeight: 1.3 }}>
                  Escaneá el código QR desde tu celular
                </h2>
                <ol style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    <>Abrí WhatsApp en tu teléfono</>,
                    <>Tocá <strong>Menú</strong> <span style={{ color: '#6b7280' }}>⋮</span> en Android, o <strong>Configuración</strong> <span style={{ fontSize: 13, color: '#6b7280' }}>⚙</span> en iPhone</>,
                    <>Tocá <strong>Dispositivos vinculados</strong> y luego <strong>Vincular dispositivo</strong></>,
                    <>Apuntá tu teléfono hacia esta pantalla para escanear el código QR</>,
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
                Vincular con número de teléfono
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
                <img src="/whatsapp-icon.png" width={16} height={16} alt="" style={{ borderRadius: 4, display: 'block' }} />
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
              <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>
                Redirigiendo en {countdown} {countdown === 1 ? 'segundo' : 'segundos'}...
              </p>
            </div>
            {/* Full green bar at bottom */}
            <div style={{ height: 6, background: 'linear-gradient(90deg, #25D366, #128C7E)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
