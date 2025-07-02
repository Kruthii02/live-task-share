
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import { useSharedTasks } from '@/hooks/useSharedTasks';
import TodoHeader from '../components/TodoHeader';
import AnimatedTodoForm from '../components/AnimatedTodoForm';
import AnimatedTodoList from '../components/AnimatedTodoList';
import AnimatedTodoFilters from '../components/AnimatedTodoFilters';

const Index = () => {
  const [filter, setFilter] = useState('all');
  const [taskType, setTaskType] = useState<'personal' | 'shared'>('personal');
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();
  const { sharedTasks, addSharedTask, updateSharedTask, deleteSharedTask } = useSharedTasks();

  const handleAddTask = async (taskData: any) => {
    if (taskType === 'personal') {
      await addTask({
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date
      });
    } else {
      await addSharedTask({
        task_title: taskData.title,
        task_description: taskData.description,
        shared_with: taskData.shared_with || []
      });
    }
  };

  const handleUpdateTask = async (taskId: string, updates: any) => {
    if (taskType === 'personal') {
      await updateTask(taskId, updates);
    } else {
      await updateSharedTask(taskId, updates);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (taskType === 'personal') {
      await deleteTask(taskId);
    } else {
      await deleteSharedTask(taskId);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    if (taskType === 'personal') {
      await toggleTaskStatus(taskId);
    } else {
      const task = sharedTasks.find(t => t.id === taskId);
      if (task) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        await updateSharedTask(taskId, { status: newStatus });
      }
    }
  };

  // Convert database tasks to component format
  const currentTasks = taskType === 'personal' 
    ? tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        priority: 'medium',
        completed: task.status === 'completed',
        createdAt: task.created_at,
        userId: task.user_id,
        shared: false,
        collaborators: [],
        status: task.status,
        due_date: task.due_date
      }))
    : sharedTasks.map(task => ({
        id: task.id,
        title: task.task_title,
        description: task.task_description || '',
        priority: 'medium',
        completed: task.status === 'completed',
        createdAt: task.created_at,
        userId: task.created_by,
        shared: true,
        collaborators: task.shared_with || [],
        status: task.status
      }));

  const filteredTasks = currentTasks.filter(task => {
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
          {/* Task Type Toggle */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                onClick={() => setTaskType('personal')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: taskType === 'personal' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: 'white',
                  fontWeight: taskType === 'personal' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Personal
              </button>
              <button
                onClick={() => setTaskType('shared')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: taskType === 'shared' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: 'white',
                  fontWeight: taskType === 'shared' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Shared
              </button>
            </div>
          </div>

          <AnimatedTodoForm onSubmit={handleAddTask} taskType={taskType} />
          
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
                all: currentTasks.length,
                completed: currentTasks.filter(t => t.completed).length,
                pending: currentTasks.filter(t => !t.completed).length,
                shared: currentTasks.filter(t => t.shared).length
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
              {taskType === 'personal' ? 'Your Tasks' : 'Shared Tasks'} ({filteredTasks.length})
            </h2>
          </motion.div>
          
          <AnimatedTodoList 
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
