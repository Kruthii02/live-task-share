
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--surface-color)',
        border: '2px solid var(--border-color)',
        borderRadius: '8px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        color: 'var(--text-color)'
      }}
      onMouseOver={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--accent-color)';
        (e.target as HTMLElement).style.color = 'white';
      }}
      onMouseOut={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--surface-color)';
        (e.target as HTMLElement).style.color = 'var(--text-color)';
      }}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
