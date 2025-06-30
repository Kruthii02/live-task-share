
import { User, Settings, LogOut } from 'lucide-react';

const TodoHeader = ({ user }) => {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '16px 0',
      position: 'sticky',
      top: '0',
      zIndex: 100
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
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
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
            color: '#2d3748',
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
              background: '#f7fafc',
              borderRadius: '25px',
              border: '1px solid #e2e8f0'
            }}>
              <User size={20} color="#4a5568" />
              <span style={{ 
                color: '#2d3748', 
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {user.name || 'User'}
              </span>
            </div>
          )}
          
          <button style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f7fafc'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <Settings size={20} color="#4a5568" />
          </button>
          
          <button style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#fed7d7'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <LogOut size={20} color="#e53e3e" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TodoHeader;
