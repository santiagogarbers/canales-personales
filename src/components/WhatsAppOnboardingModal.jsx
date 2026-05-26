import { X, Search, MoreVertical } from 'lucide-react';

const PROS = [
  'Tener tu línea personal directamente en la plataforma',
  'Usar atajos y respuestas rápidas para responder más rápido',
  'Aprovechar la IA para redactar y sugerir respuestas',
  'Ver el historial de conversaciones centralizado',
  'Recibir notificaciones en tiempo real desde Botmaker',
  'Colaborar con tu equipo desde un mismo lugar',
];

const CONS = [
  'No podés enviar WhatsApp Templates',
  'No podés automatizar flujos con bots',
  'No soporta envíos masivos de mensajes',
  'Funciona como línea personal, no cuenta de negocio',
];

const MOCK_CHATS = [
  { name: 'María García',    preview: 'Hola! Necesito ayuda con...',   time: '10:35', unread: 2, active: true  },
  { name: 'Carlos López',    preview: 'Perfecto, lo reviso ahora',     time: '09:12', unread: 0, active: false },
  { name: 'Equipo Ventas',   preview: 'Reunión mañana a las 10hs',     time: 'Ayer',  unread: 0, active: false },
  { name: 'Laura Fernández', preview: '✓✓ Muchas gracias!',            time: 'Ayer',  unread: 0, active: false },
];

const MOCK_MESSAGES = [
  { out: false, text: 'Hola! Necesito ayuda con mi pedido 🙏',             time: '10:32' },
  { out: true,  text: 'Claro, con gusto te ayudo. ¿Cuál es tu número?',   time: '10:33' },
  { out: false, text: '#A-48291',                                           time: '10:33' },
  { out: true,  text: 'Ya lo estoy revisando, un momento... ✅',           time: '10:34' },
  { out: false, text: 'Gracias, quedé esperando!',                         time: '10:35' },
];

function WAMockup() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#f0f2f5', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
    }}>
      {/* WA top bar */}
      <div style={{
        background: '#ffffff', padding: '10px 14px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
      }}>
        <img src="/whatsapp-icon.png" width={32} height={32} alt="WhatsApp" style={{ borderRadius: 8, display: 'block', flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', flex: 1 }}>WhatsApp</span>
        <Search size={14} color="#9ca3af" />
        <MoreVertical size={14} color="#9ca3af" />
      </div>

      {/* Body: sidebar + chat */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Mini sidebar */}
        <div style={{ width: 140, background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Search */}
          <div style={{ padding: '6px 8px', borderBottom: '1px solid #f0f2f5' }}>
            <div style={{ background: '#f0f2f5', borderRadius: 16, padding: '4px 10px', fontSize: 10, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Search size={9} /> Buscar
            </div>
          </div>
          {MOCK_CHATS.map((c, i) => (
            <div key={i} style={{
              padding: '7px 8px', borderBottom: '1px solid #f9fafb',
              background: c.active ? '#fffde7' : '#fff',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: ['#25D366','#3b82f6','#f97316','#a855f7'][i], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                <div style={{ fontSize: 8, color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.preview}</div>
              </div>
              {c.unread > 0 && (
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.unread}</div>
              )}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{ background: '#f0f2f5', borderBottom: '1px solid #e5e7eb', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>M</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>María García</div>
              <div style={{ fontSize: 9, color: '#25D366' }}>en línea</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '10px 10px 6px',
            display: 'flex', flexDirection: 'column', gap: 4,
            background: `#ECE5DD url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E")`,
          }}>
            {MOCK_MESSAGES.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.out ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: m.out ? '#DCF8C6' : '#fff',
                  borderRadius: m.out ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                  padding: '5px 8px', maxWidth: '75%',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ fontSize: 9, color: '#111827', lineHeight: 1.4 }}>{m.text}</div>
                  <div style={{ fontSize: 8, color: '#9ca3af', textAlign: 'right', marginTop: 2 }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ background: '#f0f2f5', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '5px 10px', fontSize: 9, color: '#9ca3af' }}>
              Escribe un mensaje
            </div>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppOnboardingModal({ onClose, onContinue }) {
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div style={{
        width: 860, maxHeight: '92vh', borderRadius: 14,
        overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        background: '#fff', position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#374151', transition: 'background .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
        >
          <X size={16} />
        </button>

        {/* Header full width */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        }}>
          <img src="/whatsapp-icon.png" width={40} height={40} alt="WhatsApp" style={{ borderRadius: 10, flexShrink: 0, display: 'block' }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>
              Conectar línea personal
            </p>
            <p style={{ fontSize: 11, color: '#6b7280', margin: '3px 0 0' }}>
              Conocé cómo funciona esta integración
            </p>
          </div>
        </div>

        {/* Two sibling columns */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* Left: pros & cons */}
          <div style={{ width: 380, display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb', flexShrink: 0, overflowY: 'auto' }}>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Ventajas */}
              <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>Lo que podés hacer</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PROS.map((pro, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#166534', lineHeight: 1.45 }}>
                      <span style={{ color: '#22c55e', marginTop: 1, flexShrink: 0 }}>✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitaciones */}
              <div style={{ background: '#fff7ed', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: 'white', fontWeight: 700, lineHeight: 1 }}>!</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#c2410c' }}>Limitaciones</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {CONS.map((con, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#7c2d12', lineHeight: 1.45 }}>
                      <span style={{ color: '#f97316', marginTop: 1, flexShrink: 0 }}>✕</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: WA mockup */}
          <div style={{ flex: 1, overflow: 'hidden', padding: 32 }}>
            <WAMockup />
          </div>
        </div>

        {/* Footer full width */}
        <div style={{ borderTop: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1.5px solid #d1d5db', borderRadius: 20,
              padding: '8px 18px', fontSize: 13, fontWeight: 500,
              color: '#6b7280', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              transition: 'border-color .15s, color .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#9ca3af'; e.currentTarget.style.color = '#374151'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#6b7280'; }}
          >
            Cancelar
          </button>
          <button
            onClick={onContinue}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#25D366', color: 'white',
              border: 'none', borderRadius: 20,
              padding: '9px 22px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1ebe5a'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <img src="/whatsapp-icon.png" width={16} height={16} alt="" style={{ borderRadius: 4, display: 'block' }} />
            Conectar mi línea
          </button>
        </div>
      </div>
    </div>
  );
}
