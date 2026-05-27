import { useState } from 'react';
import { ChevronDown, Mail, HelpCircle, Search } from 'lucide-react';
import WhatsAppConfig from './WhatsAppConfig';

function BotmakerLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#2563EB" />
      <path d="M10 22 Q13 12 18 18 Q23 24 26 14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 56 }) {
  return <img src="/whatsapp-icon.png" width={size} height={size} alt="WhatsApp" style={{ borderRadius: 12, display: 'block' }} />;
}

const CHANNELS = [
  {
    id: 1,
    icon: <WhatsAppIcon />,
    name: 'WhatsApp Personal',
    description: 'Envía mensajes, realizar llamadas y comparte archivos mediante WhatsApp.',
    connected: true,
    type: 'texto',
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

  if (configChannel === 'whatsapp') {
    return <WhatsAppConfig onBack={() => setConfigChannel(null)} />;
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
                <div />
                <button
                  style={s.configBtn}
                  onClick={() => setConfigChannel('whatsapp')}
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
