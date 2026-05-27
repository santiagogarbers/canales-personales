import FloatingButton from './FloatingButton';

export default function FloatingButtonDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <p style={{ color: '#9ca3af', fontSize: 13 }}>
        Botón flotante ↘
      </p>

      <FloatingButton onClick={() => {}} />
    </div>
  );
}
