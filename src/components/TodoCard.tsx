
import { useState } from 'react';
import { Check, Edit, Trash2, Share, Clock, AlertCircle } from 'lucide-react';

const TodoCard = ({ task, onToggleComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#e53e3e';
      case 'medium': return '#dd6b20';
      case 'low': return '#38a169';
      default: return '#4a5568';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: task.completed ? '#f7fafc' : 'white',
      border: `2px solid ${task.completed ? '#e2e8f0' : '#edf2f7'}`,
      borderRadius: '12px',
      padding: '20px',
      transition: 'all 0.2s',
      opacity: task.completed ? 0.7 : 1,
      position: 'relative'
    }}>
      
      {/* Priority Indicator */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '4px',
        height: '100%',
        background: getPriorityColor(task.priority),
        borderRadius: '12px 0 0 12px'
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: `2px solid ${task.completed ? '#48bb78' : '#e2e8f0'}`,
            background: task.completed ? '#48bb78' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          {task.completed && <Check size={14} color="white" />}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #667eea',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  outline: 'none'
                }}
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description..."
                rows={2}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '6px 12px',
                    background: '#48bb78',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '6px 12px',
                    background: '#e2e8f0',
                    color: '#4a5568',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: task.completed ? '#a0aec0' : '#2d3748',
                textDecoration: task.completed ? 'line-through' : 'none',
                margin: '0 0 8px 0',
                wordBreak: 'break-word'
              }}>
                {task.title}
              </h4>
              
              {task.description && (
                <p style={{
                  fontSize: '14px',
                  color: task.completed ? '#a0aec0' : '#4a5568',
                  margin: '0 0 12px 0',
                  lineHeight: '1.4',
                  wordBreak: 'break-word'
                }}>
                  {task.description}
                </p>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px'
              }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#a0aec0'
                  }}>
                    <Clock size={12} />
                    {formatDate(task.createdAt)}
                  </span>
                  
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: getPriorityColor(task.priority),
                    color: 'white'
                  }}>
                    {task.priority}
                  </span>
                  
                  {task.shared && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#667eea'
                    }}>
                      <Share size={12} />
                      Shared
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: '6px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#4a5568',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#edf2f7'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                  >
                    <Edit size={14} />
                  </button>
                  
                  <button
                    onClick={() => onDelete(task.id)}
                    style={{
                      padding: '6px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#e53e3e',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#fed7d7'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
