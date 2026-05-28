import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, HelpCircle, ChevronLeft, Copy, Pencil, Plus, MoreHorizontal, LogOut, Share2, X, Search } from 'lucide-react';
import WhatsAppQRModal from './WhatsAppQRModal';
import WhatsAppOnboardingModal from './WhatsAppOnboardingModal';
import ChatsView from './ChatsView';

function BotmakerLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#2563EB" />
      <path d="M10 22 Q13 12 18 18 Q23 24 26 14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function WhatsAppIconSmall() {
  return <img src="/whatsapp-icon.png" width={40} height={40} alt="WhatsApp" style={{ borderRadius: 10, display: 'block' }} />;
}

function Toggle({ on }) {
  return (
    <div style={{
      width: 36, height: 20, borderRadius: 10,
      background: on ? '#2563eb' : '#d1d5db',
      position: 'relative', cursor: 'pointer', flexShrink: 0,
      transition: 'background .2s',
    }}>
      <div style={{
        position: 'absolute', top: 2,
        left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: '#fff',
        transition: 'left .2s',
        boxShadow: '0 1px 3px rgba(0,0,0,.2)',
      }} />
    </div>
  );
}

function StatusDot({ status }) {
  const colors = { Conectado: '#22c55e', Conectada: '#22c55e', Desconectada: '#ef4444', Pausada: '#f59e0b', 'Invitación enviada': '#2563eb' };
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#374151' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors[status] || '#9ca3af', flexShrink: 0, display: 'inline-block' }} />
      {status}
    </span>
  );
}

function QualityDot({ quality }) {
  const color = quality === 'N/A' ? '#9ca3af' : '#22c55e';
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#374151' }}>
      {quality !== 'N/A' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />}
      {quality}
    </span>
  );
}

function Avatar({ initials, color = '#e5e7eb' }) {
  return (
    <div style={{ position: 'relative', width: 36, height: 36 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: color, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#6b7280',
      }}>
        {initials}
      </div>
      <div style={{
        position: 'absolute', bottom: -2, right: -2,
        width: 16, height: 16, borderRadius: '50%',
        background: '#2563eb', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Pencil size={8} color="#fff" />
      </div>
    </div>
  );
}

function Flag({ country }) {
  const flags = { AR: '🇦🇷', BR: '🇧🇷', CL: '🇨🇱', MX: '🇲🇽', CO: '🇨🇴' };
  return <span style={{ fontSize: 16 }}>{flags[country] || (country === null ? '—' : '🌐')}</span>;
}

function ChatBtn() {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 5,
      border: '1.5px solid #22c55e', borderRadius: 20,
      background: '#fff', color: '#16a34a',
      padding: '4px 12px', fontSize: 12, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    }}>
      <svg width="13" height="13" viewBox="0 0 56 56" fill="none">
        <rect width="56" height="56" rx="12" fill="#25D366" />
        <path d="M28 11C18.61 11 11 18.61 11 28c0 3.02.81 5.85 2.22 8.29L11 45l8.93-2.19A17 17 0 0 0 28 45c9.39 0 17-7.61 17-17S37.39 11 28 11z" fill="white" />
      </svg>
      Chat
    </button>
  );
}

function CallbotSelect({ value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      border: '1px solid #d1d5db', borderRadius: 6,
      padding: '5px 10px', minWidth: 160, background: '#fff',
      fontSize: 12, color: value ? '#374151' : '#9ca3af', cursor: 'pointer',
    }}>
      <span>{value || 'Select a Callbot'}</span>
      <ChevronDown size={12} color="#9ca3af" />
    </div>
  );
}

const COLUMNS = ['Perfil', 'País', 'Teléfono', 'Alias', 'Estado', 'Ultima Actividad', 'Chats', 'Acciones'];

const PERSONAL_LINES = [
  { initials: '', avatarColor: '#e5e7eb', country: 'AR', phone: '+573232298065', alias: 'Support-BA', status: 'Conectado', quality: 'Alta', activity: 'Hace 5 minutos', callbot: null, callbotOn: false },
  { initials: 'S', avatarColor: '#fde68a', country: 'CL', phone: '+573232298065', alias: 'Clients-CH', status: 'Conectada', quality: 'Alta', activity: 'Hace 2 horas', callbot: null, callbotOn: false },
  { initials: 'S', avatarColor: '#fde68a', country: 'AR', phone: '+573232298065', alias: 'Support-BA2', status: 'Conectada', quality: 'Alta', activity: 'Hace 2 horas', callbot: null, callbotOn: false },
];

const NEW_LINE = { initials: 'A', avatarColor: '#d1fae5', country: 'AR', phone: '+54 9 11 5555 1234', alias: 'Mi WhatsApp', status: 'Conectado', quality: 'Alta', activity: 'Ahora mismo', callbot: null, callbotOn: false };

const ACCESS_LINES = [
  { phone: '+54 11 4523 9871', user: 'Carlos Mendez', status: 'Conectada', conversations: 142 },
  { phone: '+55 21 9987 6543', user: 'Ana Souza', status: 'Desconectada', conversations: 38 },
  { phone: '+56 9 8765 4321', user: 'Pedro Rojas', status: 'Pausada', conversations: 97 },
  { phone: '+57 312 456 7890', user: 'Laura Gómez', status: 'Conectada', conversations: 215 },
];

function ActionsMenu({ rowIndex, openIndex, setOpenIndex, onRemove }) {
  const isOpen = openIndex === rowIndex;
  const btnRef = useRef(null);
  const dropRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!isOpen) return;
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    }
    function handleClick(e) {
      if (
        dropRef.current && !dropRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) setOpenIndex(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div>
      <button
        ref={btnRef}
        onClick={() => setOpenIndex(isOpen ? null : rowIndex)}
        style={{
          width: 30, height: 30, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? '#f3f4f6' : 'none', border: 'none',
          cursor: 'pointer', color: '#6b7280', transition: 'background .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
        onMouseLeave={e => e.currentTarget.style.background = isOpen ? '#f3f4f6' : 'none'}
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <div ref={dropRef} style={{
          position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999,
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          minWidth: 148, overflow: 'hidden',
        }}>
          <button
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', background: 'none', border: 'none',
              fontSize: 13, color: '#ef4444', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', textAlign: 'left',
              transition: 'background .12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            onClick={() => { setOpenIndex(null); onRemove(rowIndex); }}
          >
            <LogOut size={14} />
            Desvincular
          </button>
        </div>
      )}
    </div>
  );
}

function LinesTable({ rows, onRemove, onUpdateAlias, onVerChats }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  function startEdit(i, currentAlias) {
    setEditingIndex(i);
    setEditValue(currentAlias);
  }

  function commitEdit(i) {
    if (editValue.trim()) onUpdateAlias(i, editValue.trim());
    setEditingIndex(null);
  }

  if (rows.length === 0) {
    return (
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 10,
        padding: '48px 24px', textAlign: 'center', background: '#fff',
      }}>
        <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
          No tienes líneas personales vinculadas aún.
        </p>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '56px 60px 160px 1fr 130px 150px 110px 80px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        padding: '10px 16px',
        gap: 8,
      }}>
        {COLUMNS.map(col => (
          <div key={col} style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{col}</div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '56px 60px 160px 1fr 130px 150px 110px 80px',
            padding: '14px 16px',
            gap: 8,
            alignItems: 'center',
            borderTop: i === 0 ? 'none' : '1px solid #f3f4f6',
            background: '#fff',
          }}
        >
          {/* Perfil */}
          <div><Avatar initials={row.initials} color={row.avatarColor} /></div>
          {/* País */}
          <div><Flag country={row.country} /></div>
          {/* Teléfono */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#374151' }}>{row.phone}</span>
            <Copy size={12} color="#9ca3af" style={{ cursor: 'pointer', flexShrink: 0 }} />
          </div>
          {/* Alias */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {editingIndex === i ? (
              <input
                autoFocus
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={() => commitEdit(i)}
                onKeyDown={e => { if (e.key === 'Enter') commitEdit(i); if (e.key === 'Escape') setEditingIndex(null); }}
                style={{
                  fontSize: 13, color: '#374151', border: '1px solid #2563eb',
                  borderRadius: 4, padding: '2px 6px', outline: 'none',
                  fontFamily: 'Inter, sans-serif', width: 120,
                }}
              />
            ) : (
              <>
                <span style={{ fontSize: 13, color: '#374151' }}>{row.alias}</span>
                <Pencil
                  size={11} color="#2563eb"
                  style={{ cursor: 'pointer', flexShrink: 0 }}
                  onClick={() => startEdit(i, row.alias)}
                />
              </>
            )}
          </div>
          {/* Estado */}
          <StatusDot status={row.status} />
          {/* Actividad */}
          <span style={{ fontSize: 12, color: '#6b7280' }}>{row.activity}</span>
          {/* Chats */}
          <button
            onClick={() => onVerChats?.()}
            style={{
              padding: '5px 12px', borderRadius: 20,
              border: '1.5px solid #2563eb', background: '#fff',
              color: '#2563eb', fontSize: 12, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap', transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            Ver chats
          </button>
          {/* Acciones */}
          <ActionsMenu rowIndex={i} openIndex={openIndex} setOpenIndex={setOpenIndex} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}

const ACCESS_COLUMNS = ['Número', 'Usuario', 'Estado de la línea', 'Conversaciones', ''];

function AccessTable({ rows }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 160px 140px 120px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        padding: '10px 16px',
        gap: 8,
      }}>
        {ACCESS_COLUMNS.map((col, i) => (
          <div key={i} style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{col}</div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 160px 140px 120px',
            padding: '14px 16px',
            gap: 8,
            alignItems: 'center',
            borderTop: i === 0 ? 'none' : '1px solid #f3f4f6',
            background: '#fff',
          }}
        >
          <span style={{ fontSize: 13, color: '#374151' }}>{row.phone}</span>
          <span style={{ fontSize: 13, color: '#374151' }}>{row.user}</span>
          <StatusDot status={row.status} />
          <span style={{ fontSize: 13, color: '#374151' }}>{row.conversations.toLocaleString()}</span>
          <button style={{
            padding: '6px 14px', borderRadius: 20,
            border: '1.5px solid #2563eb', background: '#fff',
            color: '#2563eb', fontSize: 12, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            Ver chats
          </button>
        </div>
      ))}
    </div>
  );
}

const SHARED_LINES = [
  { initials: 'GT', avatarColor: '#dbeafe', country: 'AR', phone: '+54 11 4523 9871', user: 'Gonzalo Tarnofsky',    status: 'Conectada',    activity: 'Hace 20 min' },
  { initials: 'FC', avatarColor: '#fce7f3', country: 'BR', phone: '+55 21 9987 6543', user: 'Fernando Costantini',  status: 'Conectada',    activity: 'Hace 1 hora' },
  { initials: 'FM', avatarColor: '#fef3c7', country: 'CL', phone: '+56 9 8765 4321',  user: 'Florencia Mirabella',  status: 'Pausada',      activity: 'Hace 2 horas' },
  { initials: 'GC', avatarColor: '#d1fae5', country: 'MX', phone: '+52 55 1234 5678', user: 'Guillermo Caratti',    status: 'Conectada',    activity: 'Hace 35 min' },
  { initials: 'LR', avatarColor: '#ede9fe', country: 'CO', phone: '+57 310 456 7890',  user: 'Lucía Rodríguez',     status: 'Conectada',    activity: 'Ahora mismo' },
  { initials: 'MP', avatarColor: '#fef3c7', country: 'AR', phone: '+54 9 11 6677 8899',user: 'Martín Pereyra',      status: 'Desconectada', activity: 'Hace 5 horas' },
  { initials: 'VG', avatarColor: '#fce7f3', country: 'UY', phone: '+598 99 234 567',   user: 'Valentina García',    status: 'Conectada',    activity: 'Hace 10 min' },
  { initials: 'JB', avatarColor: '#dbeafe', country: 'PE', phone: '+51 991 234 567',   user: 'Javier Bustamante',   status: 'Pausada',      activity: 'Ayer' },
  { initials: 'CS', avatarColor: '#d1fae5', country: 'MX', phone: '+52 33 9876 5432',  user: 'Camila Sotomayor',    status: 'Conectada',    activity: 'Hace 45 min' },
  { initials: 'RM', avatarColor: '#fef9c3', country: 'BR', phone: '+55 11 9876 0001',  user: 'Ricardo Mendonça',    status: 'Desconectada', activity: 'Hace 1 día' },
  { initials: 'AV', avatarColor: '#fce7f3', country: 'AR', phone: '+54 351 555 0102',  user: 'Agustina Villalba',   status: 'Conectada',    activity: 'Hace 3 min' },
  { initials: 'DL', avatarColor: '#ede9fe', country: 'CL', phone: '+56 2 2345 6789',   user: 'Diego Larrañaga',     status: 'Pausada',      activity: 'Hace 6 horas' },
  { initials: 'NF', avatarColor: '#dbeafe', country: 'CO', phone: '+57 320 987 6543',  user: 'Natalia Fuentes',     status: 'Conectada',    activity: 'Hace 15 min' },
  { initials: 'EO', avatarColor: '#d1fae5', country: 'UY', phone: '+598 94 567 890',   user: 'Emilio Oviedo',       status: 'Desconectada', activity: 'Hace 2 días' },
  { initials: 'SC', avatarColor: '#fef3c7', country: 'AR', phone: '+54 261 444 3322',  user: 'Sofía Carranza',      status: 'Conectada',    activity: 'Hace 52 min' },
  { initials: 'PH', avatarColor: '#fce7f3', country: 'MX', phone: '+52 81 8765 4321',  user: 'Pablo Herrera',       status: 'Conectada',    activity: 'Hace 1 hora' },
  { initials: 'IR', avatarColor: '#ede9fe', country: 'PE', phone: '+51 987 654 321',   user: 'Ignacio Riquelme',    status: 'Pausada',      activity: 'Ayer' },
];

const SHARED_COLUMNS = ['Perfil', 'País', 'Teléfono', 'Usuario', 'Estado', 'Ultima Actividad', 'Chats'];

function SharedTable({ rows, onVerChats }) {
  const [loadingKeys, setLoadingKeys] = useState(new Set());
  const [resentKeys, setResentKeys] = useState(new Set());

  function handleResend(key) {
    setLoadingKeys(prev => new Set(prev).add(key));
    setTimeout(() => {
      setLoadingKeys(prev => { const s = new Set(prev); s.delete(key); return s; });
      setResentKeys(prev => new Set(prev).add(key));
    }, 1000);
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '56px 60px 160px 1fr 156px 150px 110px',
        background: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '10px 16px', gap: 8,
      }}>
        {SHARED_COLUMNS.map(col => (
          <div key={col} style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{col}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '56px 60px 160px 1fr 156px 150px 110px',
          padding: '14px 16px', gap: 8, alignItems: 'center',
          borderTop: i === 0 ? 'none' : '1px solid #f3f4f6', background: '#fff',
        }}>
          <div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: row.avatarColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: '#6b7280',
            }}>
              {row.initials}
            </div>
          </div>
          <div><Flag country={row.country} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#374151' }}>{row.phone}</span>
            <Copy size={12} color="#9ca3af" style={{ cursor: 'pointer' }} />
          </div>
          <span style={{ fontSize: 13, color: '#374151' }}>{row.user}</span>
          <StatusDot status={row.status} />
          <span style={{ fontSize: 12, color: '#6b7280' }}>{row.activity}</span>
          {(() => {
            const key = row.user;
            const isInvited = row.status === 'Invitación enviada';
            const isLoading = loadingKeys.has(key);
            const isResent = resentKeys.has(key);
            if (isInvited) {
              return (
                <button
                  onClick={() => !isLoading && !isResent && handleResend(key)}
                  style={{
                    padding: '5px 12px', borderRadius: 20,
                    border: 'none',
                    background: isResent ? '#dcfce7' : isLoading ? '#3b82f6' : '#2563eb',
                    color: isResent ? '#16a34a' : '#fff',
                    fontSize: 12, fontWeight: 500,
                    cursor: isLoading || isResent ? 'default' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap', transition: 'all .2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                        </path>
                      </svg>
                      Enviando...
                    </>
                  ) : isResent ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Enviado
                    </>
                  ) : 'Reenviar link'}
                </button>
              );
            }
            return (
              <button
                onClick={() => onVerChats?.()}
                style={{
                  padding: '5px 12px', borderRadius: 20,
                  border: '1.5px solid #2563eb', background: '#fff',
                  color: '#2563eb', fontSize: 12, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap', transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                Ver chats
              </button>
            );
          })()}
        </div>
      ))}
    </div>
  );
}


function MailboxIllustration() {
  return (
    <svg width="90" height="80" viewBox="0 0 90 80" fill="none">
      <rect x="18" y="28" width="54" height="38" rx="6" fill="#2563eb" />
      <rect x="18" y="28" width="54" height="14" rx="6" fill="#1d4ed8" />
      <rect x="38" y="42" width="14" height="24" rx="3" fill="#1e40af" />
      <rect x="10" y="42" width="8" height="24" rx="2" fill="#60a5fa" />
      <rect x="62" y="42" width="8" height="24" rx="2" fill="#60a5fa" />
      <rect x="30" y="20" width="30" height="18" rx="4" fill="#3b82f6" />
      <rect x="30" y="20" width="30" height="8" rx="4" fill="#2563eb" />
      <rect x="38" y="28" width="14" height="10" rx="2" fill="#1d4ed8" />
      <path d="M 45 16 C 42 8 36 6 33 10 C 30 14 34 20 38 20" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 45 16 C 48 8 54 6 57 10 C 60 14 56 20 52 20" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="45" cy="15" r="2.5" fill="#bfdbfe" />
      <rect x="40" y="34" width="10" height="6" rx="1" fill="#60a5fa" />
      <path d="M40 34 L45 38 L50 34" stroke="#1d4ed8" strokeWidth="1" fill="none" />
    </svg>
  );
}

const INVITE_USERS = [
  { initials: 'CM', color: '#dbeafe', name: 'Carlos Mendez', email: 'carlos.mendez@botmaker.io' },
  { initials: 'LG', color: '#fce7f3', name: 'Laura Gómez', email: 'laura.gomez@botmaker.io' },
  { initials: 'PS', color: '#fef3c7', name: 'Pedro Sánchez', email: 'pedro.sanchez@botmaker.io' },
  { initials: 'AS', color: '#d1fae5', name: 'Ana Souza', email: 'ana.souza@botmaker.io' },
  { initials: 'PR', color: '#ede9fe', name: 'Pedro Rojas', email: 'pedro.rojas@botmaker.io' },
  { initials: 'MG', color: '#fee2e2', name: 'María García', email: 'maria.garcia@botmaker.io' },
];

function InviteModal({ onClose, invited, onInvite }) {
  const [inviteSearch, setInviteSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const LINK = 'app.botmaker.com/channels/whatsapp-personal';

  const matches = inviteSearch.trim()
    ? INVITE_USERS.filter(u =>
        u.name.toLowerCase().includes(inviteSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(inviteSearch.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSelect(user) {
    setInviteSearch(user.email);
    setDropdownOpen(false);
  }

  function handleSend() {
    const value = inviteSearch.trim();
    if (!value) return;
    const matched = INVITE_USERS.find(u => u.email === value || u.name.toLowerCase() === value.toLowerCase());
    const entry = matched || {
      initials: value[0].toUpperCase(),
      color: '#f3f4f6',
      name: value,
      email: value,
    };
    if (!invited.find(u => u.email === entry.email)) {
      onInvite(entry);
    }
    setInviteSearch('');
    setDropdownOpen(false);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#fff', borderRadius: 14,
        width: 480, maxWidth: '92vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        padding: '28px 28px 24px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0, marginBottom: 6 }}>
              Invitar al canal
            </h2>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.5, maxWidth: 280 }}>
              Invita a tu equipo a colaborar en este canal de WhatsApp Personal.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <MailboxIllustration />
            <button
              onClick={onClose}
              style={{
                width: 28, height: 28, borderRadius: 6, border: 'none',
                background: '#f3f4f6', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#6b7280',
                flexShrink: 0, marginTop: 2,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Invite team members */}
        <div style={{ marginTop: 20, fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Invitar miembro</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 12, color: '#9ca3af', pointerEvents: 'none' }} />
            <input
              ref={inputRef}
              value={inviteSearch}
              onChange={e => { setInviteSearch(e.target.value); setDropdownOpen(true); }}
              onFocus={() => { if (inviteSearch.trim()) setDropdownOpen(true); }}
              placeholder="Buscar por nombre o email"
              style={{
                width: '100%', height: 38, paddingLeft: 32, paddingRight: 12,
                border: '1px solid #d1d5db', borderRadius: 8,
                fontSize: 13, color: '#374151', background: '#fff',
                outline: 'none', fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
            {dropdownOpen && matches.length > 0 && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute', top: 42, left: 0, right: 0,
                  background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  zIndex: 10, overflow: 'hidden',
                }}
              >
                {matches.map((u, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelect(u)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 12px', cursor: 'pointer',
                      borderBottom: i < matches.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: u.color, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 11, fontWeight: 600,
                      color: '#6b7280', flexShrink: 0,
                    }}>
                      {u.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{u.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            style={{
              display: 'flex', alignItems: 'center',
              background: '#2563eb', color: '#fff',
              border: 'none', borderRadius: 8,
              padding: '0 18px', height: 38, fontSize: 13, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
          >
            Enviar invitación
          </button>
        </div>

        {invited.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Invitados</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {invited.map((u, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 10px', borderRadius: 8, background: '#f9fafb',
                  border: '1px solid #f3f4f6',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: u.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 11, fontWeight: 600,
                    color: '#6b7280', flexShrink: 0,
                  }}>
                    {u.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{u.email}</div>
                  </div>
                  <span style={{
                    fontSize: 11, color: '#16a34a', background: '#dcfce7',
                    borderRadius: 20, padding: '2px 10px', fontWeight: 500,
                  }}>
                    Invitado
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Link de acceso */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Link de acceso</div>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid #e5e7eb', borderRadius: 8,
            background: '#f9fafb', overflow: 'hidden',
          }}>
            <span style={{
              flex: 1, padding: '9px 12px', fontSize: 13, color: '#374151',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {LINK}
            </span>
            <div style={{ display: 'flex', borderLeft: '1px solid #e5e7eb', flexShrink: 0 }}>
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '9px 14px', background: 'none', border: 'none',
                  fontSize: 12, color: copied ? '#16a34a' : '#374151',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  transition: 'color .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <Copy size={13} />
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const AVATARS = ['#d1fae5', '#dbeafe', '#fce7f3', '#fef3c7'];
const COUNTRIES = ['AR', 'CL', 'MX', 'CO'];

export default function WhatsAppConfig({ onBack, newLine = false }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [lines, setLines] = useState([]);
  const [invited, setInvited] = useState([]);
  const [sharedSearch, setSharedSearch] = useState('');
  const counterRef = useRef(0);

  const accessLines = newLine ? [] : ACCESS_LINES;

  function handleNewLineSuccess() {
    const n = ++counterRef.current;
    setLines(prev => [...prev, {
      initials: String.fromCharCode(64 + (n % 26) + 1),
      avatarColor: AVATARS[n % AVATARS.length],
      country: COUNTRIES[n % COUNTRIES.length],
      phone: `+54 9 11 ${4000 + n * 137} ${1000 + n * 79}`,
      alias: `Mi WhatsApp ${n + 1}`,
      status: 'Conectado',
      quality: 'Alta',
      activity: 'Ahora mismo',
      callbot: null,
      callbotOn: false,
    }]);
    setShowQRModal(false);
  }

  function handleRemoveLine(index) {
    setLines(prev => prev.filter((_, i) => i !== index));
  }

  function handleUpdateAlias(index, alias) {
    setLines(prev => prev.map((l, i) => i === index ? { ...l, alias } : l));
  }

  if (showChats) return <ChatsView onBack={() => setShowChats(false)} />;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#f2f3f5',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          invited={invited}
          onInvite={entry => setInvited(prev => [...prev, entry])}
        />
      )}
      {showOnboarding && (
        <WhatsAppOnboardingModal
          onClose={() => setShowOnboarding(false)}
          onContinue={() => { setShowOnboarding(false); setShowQRModal(true); }}
        />
      )}
      {showQRModal && (
        <WhatsAppQRModal
          onClose={() => setShowQRModal(false)}
          onSuccess={handleNewLineSuccess}
        />
      )}
      {/* Top bar */}
      <div style={{
        height: 52, background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 8, flexShrink: 0,
      }}>
        <BotmakerLogo />
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
          <span style={{ fontSize: 13, color: '#2563eb', cursor: 'pointer' }}>Canales Personales</span>
          <ChevronDown size={12} color="#9ca3af" style={{ transform: 'rotate(-90deg)' }} />
          <span style={{ fontSize: 13, color: '#2563eb', cursor: 'pointer' }}>WhatsApp Personal</span>
          <ChevronDown size={12} color="#9ca3af" style={{ transform: 'rotate(-90deg)' }} />
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Configurar</span>
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#6b7280', cursor: 'pointer', background: 'none', border: 'none' }}>
          <Mail size={17} />
        </button>
        <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#6b7280', cursor: 'pointer', background: 'none', border: 'none' }}>
          <HelpCircle size={17} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 6px', borderRadius: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#374151' }}>A</div>
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Andrea</span>
          <ChevronDown size={13} color="#9ca3af" />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
      <div style={{ maxWidth: 1324, margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, color: '#2563eb', background: 'none',
            border: 'none', cursor: 'pointer', marginBottom: 20,
            padding: 0, fontFamily: 'Inter, sans-serif',
          }}
        >
          <ChevronLeft size={14} />
          Volver
        </button>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <WhatsAppIconSmall />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 4 }}>WhatsApp Personal</h1>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Envía mensajes, realiza llamadas y comparte archivos mediante WhatsApp.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setShowInvite(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#ffffff', color: '#374151',
                border: '1px solid #d1d5db', borderRadius: 20,
                padding: '10px 20px', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#9ca3af'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#d1d5db'; }}
            >
              <Share2 size={15} />
              Invitar
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#2563eb', color: '#fff',
                border: 'none', borderRadius: 20,
                padding: '10px 20px', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            >
              <Plus size={15} />
              Nueva cuenta de Whatsapp
            </button>
          </div>
        </div>

        {/* Section 1: Líneas Personales conectadas */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 14 }}>
            Líneas Personales conectadas
          </h2>
          <LinesTable rows={lines} onRemove={handleRemoveLine} onUpdateAlias={handleUpdateAlias} onVerChats={() => setShowChats(true)} />
        </div>

        {/* Section 2: Canales Personales que tengo acceso */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 14 }}>
            Canales Personales que tengo acceso
          </h2>
          <div style={{ position: 'relative', marginBottom: 16, maxWidth: 280 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={sharedSearch}
              onChange={e => setSharedSearch(e.target.value)}
              placeholder="Buscar por usuario o teléfono..."
              style={{
                width: '100%', height: 36, paddingLeft: 32, paddingRight: 12,
                border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13,
                color: '#374151', outline: 'none', fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box', background: '#fff',
              }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          <SharedTable
            rows={[
              ...invited.map(u => ({
                initials: u.initials,
                avatarColor: u.color,
                country: null,
                phone: '—',
                user: u.name,
                status: 'Invitación enviada',
                activity: 'Ahora mismo',
              })),
              ...SHARED_LINES,
            ].filter(r =>
              r.user.toLowerCase().includes(sharedSearch.toLowerCase()) ||
              r.phone.includes(sharedSearch)
            )}
            onVerChats={() => setShowChats(true)}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
