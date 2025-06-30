
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, Edit, Trash2, Share, Clock } from 'lucide-react';

const AnimatedTodoCard = ({ task, onToggleComplete, onUpdate, onDelete }) => {
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        layout: { duration: 0.3 }
      }}
      style={{
        background: task.completed 
          ? 'linear-gradient(135deg, rgba(247,250,252,0.8) 0%, rgba(226,232,240,0.8) 100%)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${task.completed ? 'rgba(226,232,240,0.5)' : 'rgba(237,242,247,0.5)'}`,
        borderRadius: '16px',
        padding: '24px',
        opacity: task.completed ? 0.7 : 1,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Priority Indicator */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '4px',
          height: '100%',
          background: `linear-gradient(180deg, ${getPriorityColor(task.priority)}, ${getPriorityColor(task.priority)}88)`,
          borderRadius: '16px 0 0 16px'
        }} 
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Animated Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleComplete(task.id)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: `3px solid ${task.completed ? '#48bb78' : 'rgba(226,232,240,0.8)'}`,
            background: task.completed 
              ? 'linear-gradient(135deg, #48bb78, #38a169)' 
              : 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            marginTop: '2px',
            backdropFilter: 'blur(10px)',
            boxShadow: task.completed 
              ? '0 4px 12px rgba(72,187,120,0.3)' 
              : '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check size={16} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid rgba(102,126,234,0.3)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    outline: 'none',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description..."
                  rows={2}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid rgba(226,232,240,0.5)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #48bb78, #38a169)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(72,187,120,0.3)'
                    }}
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(226,232,240,0.8)',
                      color: '#4a5568',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.h4
                  layout
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: task.completed ? 'var(--text-secondary-color)' : 'var(--text-color)',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    margin: '0 0 8px 0',
                    wordBreak: 'break-word'
                  }}
                >
                  {task.title}
                </motion.h4>
                
                {task.description && (
                  <motion.p
                    layout
                    style={{
                      fontSize: '14px',
                      color: task.completed ? 'var(--text-secondary-color)' : 'rgba(74,85,104,0.8)',
                      margin: '0 0 16px 0',
                      lineHeight: '1.5',
                      wordBreak: 'break-word'
                    }}
                  >
                    {task.description}
                  </motion.p>
                )}
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--text-secondary-color)'
                    }}>
                      <Clock size={12} />
                      {formatDate(task.createdAt)}
                    </span>
                    
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        background: `linear-gradient(135deg, ${getPriorityColor(task.priority)}, ${getPriorityColor(task.priority)}CC)`,
                        color: 'white',
                        boxShadow: `0 2px 8px ${getPriorityColor(task.priority)}40`
                      }}
                    >
                      {task.priority}
                    </motion.span>
                    
                    {task.shared && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: 'var(--primary-color)'
                        }}
                      >
                        <Share size={12} />
                        Shared
                      </motion.span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(237,242,247,0.8)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(true)}
                      style={{
                        padding: '8px',
                        background: 'none',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'var(--text-secondary-color)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Edit size={16} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(254,215,215,0.8)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(task.id)}
                      style={{
                        padding: '8px',
                        background: 'none',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'var(--error-color)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedTodoCard;
