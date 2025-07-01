
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import TodoHeader from '../components/TodoHeader';
import AnimatedTodoForm from '../components/AnimatedTodoForm';
import AnimatedTodoList from '../components/AnimatedTodoList';
import AnimatedTodoFilters from '../components/AnimatedTodoFilters';
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user?.id,
      shared: false,
      collaborators: []
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast("✨ Task created successfully!");
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast("📝 Task updated!");
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast("🗑️ Task deleted!");
  };

  const toggleComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    switch(filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'shared':
        return task.shared;
      default:
        return true;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)`,
        padding: '0',
        transition: 'all 0.3s ease'
      }}
    >
      <TodoHeader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px'
        }}
      >
        
        {/* Left Sidebar with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '24px',
            height: 'fit-content',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          <AnimatedTodoForm onSubmit={addTask} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ margin: '32px 0' }}
          >
            <AnimatedTodoFilters 
              currentFilter={filter} 
              onFilterChange={setFilter}
              taskCounts={{
                all: tasks.length,
                completed: tasks.filter(t => t.completed).length,
                pending: tasks.filter(t => !t.completed).length,
                shared: tasks.filter(t => t.shared).length
              }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              borderBottom: '2px solid rgba(255,255,255,0.1)',
              paddingBottom: '16px'
            }}
          >
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Your Tasks ({filteredTasks.length})
            </h2>
          </motion.div>
          
          <AnimatedTodoList 
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
