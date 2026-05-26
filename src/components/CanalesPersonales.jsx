import { useState } from 'react';
import { ChevronDown, Mail, HelpCircle, Search } from 'lucide-react';
import WhatsAppConfig from './WhatsAppConfig';
import WhatsAppQRModal from './WhatsAppQRModal';

function BotmakerLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#2563EB" />
      <path d="M10 22 Q13 12 18 18 Q23 24 26 14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="12" fill="#25D366" />
      <path
        d="M28 11C18.61 11 11 18.61 11 28c0 3.02.81 5.85 2.22 8.29L11 45l8.93-2.19A17 17 0 0 0 28 45c9.39 0 17-7.61 17-17S37.39 11 28 11z"
        fill="white"
      />
      <path
        d="M37.13 32.73c-.43-.22-2.54-1.25-2.93-1.39-.4-.14-.68-.22-.97.22-.29.43-1.11 1.39-1.36 1.68-.25.29-.5.32-.93.11-.43-.22-1.82-.67-3.46-2.14-1.28-1.14-2.14-2.55-2.39-2.98-.25-.43-.03-.66.19-.88.2-.2.43-.5.64-.76.22-.25.29-.43.43-.72.14-.28.07-.54-.04-.76-.11-.22-.97-2.34-1.33-3.2-.35-.84-.71-.72-.97-.73h-.83c-.29 0-.75.11-1.14.54-.39.43-1.5 1.46-1.5 3.56s1.54 4.13 1.75 4.42c.22.28 3.02 4.61 7.32 6.47 1.02.44 1.82.7 2.44.9.73.23 1.4.19 1.92.12.59-.09 1.8-.74 2.06-1.45.25-.71.25-1.32.18-1.45-.07-.14-.29-.22-.72-.43z"
        fill="#25D366"
      />
    </svg>
  );
}

const CHANNELS = [
  {
    id: 1,
    icon: <WhatsAppIcon />,
    name: 'WhatsApp',
    description: 'Envía mensajes, realizar llamadas y comparte archivos mediante WhatsApp.',
    connected: true,
    type: 'texto',
  },
  {
    id: 2,
    icon: <WhatsAppIcon />,
    name: 'Llamadas por WhatsApp',
    description: 'Realiza llamadas mediante WhatsApp.',
    connected: true,
    type: 'voz',
  },
];

const s = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#f2f3f5',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },

  // Top bar
  topbar: {
    height: 52,
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    gap: 8,
    flexShrink: 0,
  },
  botName: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 6,
    marginLeft: 8,
  },
  botNameText: {
    fontWeight: 600,
    fontSize: 14,
    color: '#111827',
  },
  topSpacer: { flex: 1 },
  topActions: { display: 'flex', alignItems: 'center', gap: 8 },
  topIconBtn: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    color: '#6b7280',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    transition: 'background .15s',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    padding: '4px 6px',
    borderRadius: 6,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    overflow: 'hidden',
  },
  avatarName: {
    fontSize: 13,
    color: '#374151',
    fontWeight: 500,
  },

  // Main content
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 28,
  },
  card: {
    background: '#ffffff',
    borderRadius: 10,
    padding: '24px 28px',
    marginBottom: 24,
    border: '1px solid #e5e7eb',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 20,
  },

  // Search + filters
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  searchInput: {
    width: 220,
    height: 34,
    paddingLeft: 32,
    paddingRight: 12,
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 13,
    color: '#374151',
    background: '#ffffff',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  },
  filterPill: {
    height: 34,
    padding: '0 16px',
    border: '1px solid #d1d5db',
    borderRadius: 20,
    fontSize: 13,
    color: '#374151',
    background: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'background .15s, border-color .15s',
  },
  filterPillActive: {
    height: 34,
    padding: '0 16px',
    border: '1px solid #2563eb',
    borderRadius: 20,
    fontSize: 13,
    color: '#2563eb',
    background: '#eff6ff',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
  },

  // Channels grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 240px))',
    gap: 16,
    marginTop: 24,
  },
  channelCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  channelName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#111827',
    marginTop: 4,
  },
  channelDesc: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 1.5,
    flex: 1,
  },
  channelFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  connected: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 12,
    color: '#374151',
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#22c55e',
    flexShrink: 0,
  },
  configBtn: {
    padding: '6px 16px',
    borderRadius: 20,
    background: '#2563eb',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'background .15s',
  },
};

const FILTERS = ['Todos', 'Voz', 'Texto'];

export default function CanalesPersonales({ onBack }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [configChannel, setConfigChannel] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNewLine, setShowNewLine] = useState(false);

  if (configChannel === 'whatsapp') {
    return <WhatsAppConfig onBack={() => { setConfigChannel(null); setShowNewLine(false); }} newLine={showNewLine} />;
  }

  const filtered = CHANNELS.filter(ch => {
    const matchSearch = ch.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'Todos' ||
      (activeFilter === 'Voz' && ch.type === 'voz') ||
      (activeFilter === 'Texto' && ch.type === 'texto');
    return matchSearch && matchFilter;
  });

  return (
    <div style={s.page}>
      {showQRModal && (
        <WhatsAppQRModal
          onClose={() => setShowQRModal(false)}
          onSuccess={() => {
            setShowQRModal(false);
            setShowNewLine(true);
            setConfigChannel('whatsapp');
          }}
        />
      )}
      {/* Top bar */}
      <div style={s.topbar}>
        <BotmakerLogo />
        <div
          style={s.botName}
          onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={s.botNameText}>Nombre Bot</span>
          <ChevronDown size={14} color="#6b7280" />
        </div>

        <div style={s.topSpacer} />

        <div style={s.topActions}>
          <button
            style={s.topIconBtn}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            title="Notificaciones"
          >
            <Mail size={17} />
          </button>
          <button
            style={s.topIconBtn}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            title="Ayuda"
          >
            <HelpCircle size={17} />
          </button>
          <div
            style={s.avatar}
            onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={s.avatarCircle}>
              <img
                src="https://i.pravatar.cc/28?u=andrea"
                alt="Andrea"
                width={28}
                height={28}
                style={{ borderRadius: '50%' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <span style={s.avatarName}>Andrea</span>
            <ChevronDown size={13} color="#9ca3af" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={s.content}>
      <div style={{ maxWidth: 1324, margin: '0 auto' }}>
        <div style={s.card}>
          <h1 style={s.title}>Canales Personales</h1>
          <p style={s.subtitle}>
            Aquí puedes integrar tu bot con diferentes plataformas, como páginas web, Facebook o Twitter y más.
          </p>

          {/* Search + filter toolbar */}
          <div style={s.toolbar}>
            <div style={s.searchWrapper}>
              <Search size={14} style={s.searchIcon} />
              <input
                style={s.searchInput}
                placeholder="WhatsApp"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {FILTERS.slice(1).map(f => (
              <button
                key={f}
                style={activeFilter === f ? s.filterPillActive : s.filterPill}
                onClick={() => setActiveFilter(activeFilter === f ? 'Todos' : f)}
                onMouseEnter={e => {
                  if (activeFilter !== f) e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={e => {
                  if (activeFilter !== f) e.currentTarget.style.background = '#ffffff';
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Channels grid */}
        <div style={s.grid}>
          {filtered.map(ch => (
            <div key={ch.id} style={s.channelCard}>
              {ch.icon}
              <div style={s.channelName}>{ch.name}</div>
              <div style={s.channelDesc}>{ch.description}</div>
              <div style={s.channelFooter}>
                <div style={s.connected}>
                  <div style={s.connectedDot} />
                  Conectado
                </div>
                <button
                  style={s.configBtn}
                  onClick={() => setShowQRModal(true)}
                  onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                >
                  Configurar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
