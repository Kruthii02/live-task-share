
import { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), description: description.trim(), priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <div>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'var(--text-color)',
        marginBottom: '16px'
      }}>
        Add New Task
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          style={{
            padding: '12px',
            border: `2px solid var(--border-color)`,
            borderRadius: '8px',
            fontSize: '14px',
            background: 'var(--bg-color)',
            color: 'var(--text-color)',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => (e.target as HTMLElement).style.borderColor = 'var(--border-color)'}
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)..."
          rows={3}
          style={{
            padding: '12px',
            border: `2px solid var(--border-color)`,
            borderRadius: '8px',
            fontSize: '14px',
            background: 'var(--bg-color)',
            color: 'var(--text-color)',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => (e.target as HTMLElement).style.borderColor = 'var(--border-color)'}
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: '12px',
            border: `2px solid var(--border-color)`,
            borderRadius: '8px',
            fontSize: '14px',
            background: 'var(--bg-color)',
            color: 'var(--text-color)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <button
          type="submit"
          style={{
            padding: '12px 16px',
            background: `linear-gradient(45deg, var(--primary-color), var(--accent-color))`,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLElement).style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => (e.target as HTMLElement).style.transform = 'translateY(0)'}
        >
          <Plus size={16} />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
