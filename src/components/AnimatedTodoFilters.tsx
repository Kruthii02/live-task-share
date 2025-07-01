
import { motion } from 'framer-motion';

const AnimatedTodoFilters = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, icon: '📋' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, icon: '⏳' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, icon: '✅' },
    { key: 'shared', label: 'Shared', count: taskCounts.shared, icon: '👥' }
  ];

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
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'var(--text-color)',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Filter Tasks
      </motion.h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filters.map((filter, index) => (
          <motion.button
            key={filter.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ 
              scale: 1.02,
              x: 4,
              boxShadow: currentFilter === filter.key 
                ? '0 8px 25px rgba(102,126,234,0.4)' 
                : '0 4px 15px rgba(0,0,0,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange(filter.key)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: '12px',
              background: currentFilter === filter.key 
                ? 'linear-gradient(135deg, var(--primary-color), var(--accent-color))' 
                : 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              color: currentFilter === filter.key ? 'white' : 'var(--text-color)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              border: currentFilter === filter.key 
                ? 'none' 
                : '1px solid rgba(255,255,255,0.2)',
              boxShadow: currentFilter === filter.key 
                ? '0 4px 20px rgba(102,126,234,0.3)' 
                : '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>{filter.icon}</span>
              <span>{filter.label}</span>
            </span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                background: currentFilter === filter.key 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'linear-gradient(135deg, var(--primary-color)20, var(--accent-color)20)',
                color: currentFilter === filter.key ? 'white' : 'var(--primary-color)',
                minWidth: '24px',
                textAlign: 'center'
              }}
            >
              {filter.count}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedTodoFilters;
