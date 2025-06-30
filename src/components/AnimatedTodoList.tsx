
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTodoCard from './AnimatedTodoCard';

const AnimatedTodoList = ({ tasks, onToggleComplete, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,250,252,0.1) 100%)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: 'white'
          }}
        >
          ✨
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ 
            fontSize: '18px', 
            margin: '0 0 8px 0',
            color: 'var(--text-color)',
            fontWeight: '600'
          }}
        >
          No tasks found
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ 
            fontSize: '14px', 
            margin: '0',
            color: 'var(--text-secondary-color)'
          }}
        >
          Create your first task to get started!
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <AnimatedTodoCard
              task={task}
              onToggleComplete={onToggleComplete}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedTodoList;
