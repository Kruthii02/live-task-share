
import { User, Settings, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const TodoHeader = ({ user }) => {
  return (
    <header style={{
      background: 'var(--surface-color)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid var(--border-color)`,
      padding: '16px 0',
      position: 'sticky',
      top: '0',
      zIndex: 100,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, var(--primary-color), var(--accent-color))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            T
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--text-color)',
            margin: '0'
          }}>
            CollabTodo
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '8px 16px',
              background: 'var(--bg-color)',
              borderRadius: '25px',
              border: `1px solid var(--border-color)`
            }}>
              <User size={20} color="var(--text-secondary-color)" />
              <span style={{ 
                color: 'var(--text-color)', 
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {user.name || 'User'}
              </span>
            </div>
          )}
          
          <ThemeToggle />
          
          <button style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            color: 'var(--text-secondary-color)'
          }}
          onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-color)'}
          onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
          >
            <Settings size={20} />
          </button>
          
          <button style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            color: 'var(--error-color)'
          }}
          onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = 'var(--bg-color)'}
          onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TodoHeader;
