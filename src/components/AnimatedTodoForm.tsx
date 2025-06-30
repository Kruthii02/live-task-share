
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

const AnimatedTodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Brief animation delay
      onSubmit({ title: title.trim(), description: description.trim(), priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'var(--text-color)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Sparkles size={20} style={{ color: 'var(--accent-color)' }} />
        Add New Task
      </motion.h3>
      
      <motion.form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          style={{
            padding: '16px 20px',
            border: '2px solid transparent',
            borderRadius: '12px',
            fontSize: '14px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-color)',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        />
        
        <motion.textarea
          whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)..."
          rows={3}
          style={{
            padding: '16px 20px',
            border: '2px solid transparent',
            borderRadius: '12px',
            fontSize: '14px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-color)',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        />
        
        <motion.select
          whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: '16px 20px',
            border: '2px solid transparent',
            borderRadius: '12px',
            fontSize: '14px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-color)',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </motion.select>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.2 }}
          style={{
            padding: '16px 20px',
            background: isSubmitting 
              ? 'linear-gradient(135deg, var(--accent-color), var(--primary-color))'
              : 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(47,128,237,0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          <motion.div
            animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
          >
            <Plus size={16} />
          </motion.div>
          {isSubmitting ? 'Adding Task...' : 'Add Task'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AnimatedTodoForm;
