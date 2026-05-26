import { useState } from 'react';
import { Search, ChevronRight, ChevronDown, Phone, Video, Monitor, MoreHorizontal, Smile, Paperclip, Mic, UserPlus, RotateCcw, Power, Info, Bell, HelpCircle, Menu, Plus, Edit3, Grid, Send, X } from 'lucide-react';

const CONVERSATIONS = [
  {
    id: 1, name: 'Webchat -3864033', preview: '[Gabi Botmaker] hola', time: '10:35',
    tag: { label: 'Santiago Garbers', color: '#15803d', bg: '#dcfce7' },
    icon: 'W', iconBg: '#10b981', unread: 0,
  },
  {
    id: 2, name: 'Tester Bm Tester', preview: 'hola', time: '3h',
    tag: { label: 'Bot de Ale', color: '#1d4ed8', bg: '#dbeafe' },
    icon: 'T', iconBg: '#f59e0b', unread: 1, active: true, verified: true,
  },
  {
    id: 3, name: 'Sesión 25/05/2026 18:51', preview: 'Duración: 3:23:38', time: 'Ahora',
    tag: null, icon: 'S', iconBg: '#8b5cf6', unread: 0, isSession: true, online: true,
  },
  {
    id: 4, name: 'Luiz Reis', preview: 'Which shipping option do you prefer?', time: '7h',
    tag: { label: 'Cafetería', color: '#374151', bg: '#f3f4f6' },
    icon: 'LR', iconBg: '#6b7280', unread: 0,
  },
  {
    id: 5, name: '5581998059574', preview: 'Template: hola', time: '7h',
    tag: { label: 'Agus test', color: '#374151', bg: '#f3f4f6' },
    icon: '55', iconBg: '#3b82f6', unread: 0,
  },
  {
    id: 6, name: 'Webchat -5386132', preview: 'Te responderemos a la brevedad', time: '29 Abr',
    tag: { label: 'Flows', color: '#374151', bg: '#f3f4f6' },
    icon: 'W', iconBg: '#10b981', unread: 0,
  },
];

const MESSAGES = [
  { id: 1, type: 'bot-header' },
  { id: 2, type: 'bot', text: '¡Bienvenido al bot de Ale! Welcome!', time: '06:52 PM' },
  { id: 3, type: 'bot', text: 'Soy el asistente de Ale, en qué te puedo ayudar?', time: '06:52 PM' },
  { id: 4, type: 'image', time: '06:52 PM' },
  { id: 5, type: 'bot', text: 'vamos a probar', time: '06:52 PM' },
];

const RIGHT_SECTIONS = ['Ticket asociado', 'Notas', 'Etiquetas', 'Variables', 'Mensajes destacados', 'Multimedia y documentos'];

function Avatar({ icon, bg, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size > 40 ? 20 : 12, fontWeight: 700, color: '#fff',
      flexShrink: 0,
    }}>
      {icon}
    </div>
  );
}

function ColombiaFlag() {
  return (
    <div style={{ width: '100%', height: 120, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 2, background: '#FCD116' }} />
      <div style={{ flex: 1, background: '#003087' }} />
      <div style={{ flex: 1, background: '#CE1126' }} />
    </div>
  );
}

function Tag({ tag }) {
  if (!tag) return null;
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 10,
      background: tag.bg, color: tag.color, whiteSpace: 'nowrap',
    }}>
      {tag.label}
    </span>
  );
}

export default function ChatsView({ onBack }) {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeConv, setActiveConv] = useState(2);
  const [expandedSections, setExpandedSections] = useState({ 'Datos del contacto': true });
  const [inputText, setInputText] = useState('');

  function toggleSection(s) {
    setExpandedSections(p => ({ ...p, [s]: !p[s] }));
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: '#fff',
    }}>

      {/* ── Top bar ── */}
      <div style={{
        height: 48, background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}>
          <Menu size={18} />
        </button>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6b7280' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>T</div>
          <ChevronRight size={12} />
          <span style={{ cursor: 'pointer' }}>Conversaciones</span>
          <ChevronRight size={12} />
          <span style={{ cursor: 'pointer' }}>Chats</span>
          <ChevronRight size={12} />
          <span style={{ color: '#111827', fontWeight: 500 }}>Tester Bm Tester</span>
          <Info size={13} color="#9ca3af" style={{ cursor: 'pointer' }} />
        </div>

        <div style={{ flex: 1 }} />

        {/* Right side */}
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>16:52</span>
        <div style={{ background: '#eff6ff', color: '#2563eb', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10 }}>11 Labs</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid #e5e7eb', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 12, color: '#374151' }}>
          Demo1 <ChevronDown size={11} />
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><Bell size={16} /></button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><HelpCircle size={16} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>D</div>
          <span style={{ fontSize: 12, color: '#374151' }}>Demo1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#374151' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          Estado: Ocupado
        </div>
      </div>

      {/* ── Three panels ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left sidebar ── */}
        <div style={{ width: 240, borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff', flexShrink: 0 }}>
          {/* Search row */}
          <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                placeholder="Busca aquí para filtrar los chats"
                style={{
                  width: '100%', height: 32, paddingLeft: 28, paddingRight: 8,
                  border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 12,
                  color: '#374151', outline: 'none', fontFamily: 'Inter, sans-serif',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit3 size={15} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><Grid size={15} /></button>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONVERSATIONS.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                style={{
                  padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6',
                  background: activeConv === conv.id ? '#eff6ff' : '#fff',
                  transition: 'background .12s',
                }}
                onMouseEnter={e => { if (activeConv !== conv.id) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (activeConv !== conv.id) e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar icon={conv.icon} bg={conv.iconBg} size={34} />
                    {conv.online && (
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', background: '#22c55e', border: '1.5px solid #fff' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 110 }}>{conv.name}</span>
                        {conv.verified && <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 7, color: '#fff', fontWeight: 700 }}>✓</span></div>}
                      </div>
                      <span style={{ fontSize: 10, color: '#9ca3af', flexShrink: 0 }}>{conv.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 130 }}>{conv.preview}</span>
                      {conv.unread > 0 && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{conv.unread}</div>
                      )}
                    </div>
                    {conv.tag && (
                      <div style={{ marginTop: 4 }}>
                        <Tag tag={conv.tag} />
                      </div>
                    )}
                    {conv.isSession && (
                      <div style={{ marginTop: 6 }}>
                        <button style={{
                          fontSize: 10, padding: '3px 8px', borderRadius: 4,
                          border: '1px solid #d1d5db', background: '#fff',
                          cursor: 'pointer', color: '#374151', fontFamily: 'Inter, sans-serif',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}>
                          Ver sesiones anteriores (91) <ChevronDown size={9} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Center: Chat ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f9fafb', minWidth: 0 }}>
          {/* Tabs + actions */}
          <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, flexShrink: 0 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, height: '100%' }}>
              {['chat', 'rapidas', 'ia'].map(tab => {
                const labels = { chat: 'Chat', rapidas: 'Respuestas rápidas', ia: 'IA' };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      height: '100%', padding: '0 16px', border: 'none', background: 'none',
                      fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                      color: activeTab === tab ? '#2563eb' : '#6b7280',
                      borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'color .15s',
                    }}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
            <div style={{ flex: 1 }} />
            {/* Action icons */}
            {[Monitor, Phone, Video, Power, MoreHorizontal].map((Icon, i) => (
              <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0 6px', display: 'flex' }}>
                <Icon size={16} />
              </button>
            ))}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0 6px', display: 'flex' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Bot header */}
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#9ca3af', background: '#f3f4f6', padding: '3px 10px', borderRadius: 10 }}>
                Enviado por Bot de Ale
              </span>
            </div>

            {/* Bot messages */}
            {[
              '¡Bienvenido al bot de Ale! Welcome!',
              'Soy el asistente de Ale, en qué te puedo ayudar?',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
                <div>
                  <div style={{
                    background: '#fff', border: '1px solid #e5e7eb',
                    borderRadius: '4px 12px 12px 12px',
                    padding: '8px 12px', fontSize: 13, color: '#111827',
                    maxWidth: 380, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}>
                    {text}
                  </div>
                  <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>06:52 PM</span>
                </div>
              </div>
            ))}

            {/* Image message */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
              <div>
                <div style={{
                  background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: '4px 12px 12px 12px', overflow: 'hidden',
                  width: 220, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                  <ColombiaFlag />
                  <div style={{ padding: '6px 10px 8px' }}>
                    <div style={{ fontSize: 10, color: '#2563eb', wordBreak: 'break-all', marginBottom: 4 }}>
                      20260311-sR5wxckhHlSdCN29EuuWvG6j5...
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#16a34a' }}>
                      <span>✅</span> Imagen libre de amenazas
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>06:52 PM</span>
              </div>
            </div>

            {/* Last bot message */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
              <div>
                <div style={{
                  background: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: '4px 12px 12px 12px',
                  padding: '8px 12px', fontSize: 13, color: '#111827',
                  maxWidth: 380, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                  vamos a probar
                </div>
                <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>06:52 PM</span>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '10px 16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              {[Paperclip, Smile, Mic, UserPlus, RotateCcw].map((Icon, i) => (
                <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 4 }}>
                  <Icon size={17} />
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Escribe un mensaje o '/' para acciones rápidas o respuestas predeterminadas"
                style={{
                  flex: 1, border: 'none', outline: 'none', fontSize: 13,
                  color: '#374151', fontFamily: 'Inter, sans-serif', background: 'transparent',
                }}
              />
              <button style={{
                width: 32, height: 32, borderRadius: '50%', background: inputText ? '#2563eb' : '#e5e7eb',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: inputText ? 'pointer' : 'default', transition: 'background .15s', flexShrink: 0,
              }}>
                <Send size={14} color={inputText ? '#fff' : '#9ca3af'} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ width: 224, borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff', flexShrink: 0, overflowY: 'auto' }}>
          {/* Contact header */}
          <div style={{ padding: '20px 16px 12px', textAlign: 'center', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 auto 10px' }}>T</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Tester Bm Tester</span>
              <Edit3 size={11} color="#9ca3af" style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Última sesión: May. 25, 18:51hs</div>
          </div>

          {/* Datos del contacto */}
          <div style={{ borderBottom: '1px solid #f3f4f6' }}>
            <button
              onClick={() => toggleSection('Datos del contacto')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px', background: 'none', border: 'none',
                fontSize: 12, fontWeight: 600, color: '#374151',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              }}
            >
              Datos del contacto
              <ChevronDown size={13} style={{ transform: expandedSections['Datos del contacto'] ? 'none' : 'rotate(-90deg)', transition: 'transform .2s' }} />
            </button>
            {expandedSections['Datos del contacto'] && (
              <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10 }}>👤</span>
                </div>
                <span style={{ fontSize: 12, color: '#374151' }}>Tester Bm Tester</span>
              </div>
            )}
          </div>

          {/* Other sections */}
          {RIGHT_SECTIONS.map(section => (
            <div key={section} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <button
                onClick={() => toggleSection(section)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px', background: 'none', border: 'none',
                  fontSize: 12, fontWeight: 600, color: '#374151',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}
              >
                {section}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {['Notas', 'Etiquetas', 'Variables'].includes(section) && (
                    <Plus size={13} color="#9ca3af" />
                  )}
                  <ChevronDown size={13} style={{ transform: expandedSections[section] ? 'none' : 'rotate(-90deg)', transition: 'transform .2s' }} />
                </div>
              </button>
              {expandedSections[section] && (
                <div style={{ padding: '4px 16px 12px', fontSize: 12, color: '#9ca3af' }}>Sin datos</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
