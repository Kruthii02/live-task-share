
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
      className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 transition-all duration-300"
    >
      <TodoHeader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
      >
        
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Left Sidebar - Full width on mobile, 1/3 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            {/* Task Type Toggle */}
            <div className="mb-6">
              <div className="flex bg-white/10 p-1 rounded-lg border border-white/20">
                <button
                  onClick={() => setTaskType('personal')}
                  className={`flex-1 py-2 px-3 sm:py-3 sm:px-4 rounded-md border-none text-sm sm:text-base font-medium transition-all duration-300 ${
                    taskType === 'personal' 
                      ? 'bg-white/20 text-white font-bold' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setTaskType('shared')}
                  className={`flex-1 py-2 px-3 sm:py-3 sm:px-4 rounded-md border-none text-sm sm:text-base font-medium transition-all duration-300 ${
                    taskType === 'shared' 
                      ? 'bg-white/20 text-white font-bold' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
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
              className="mt-6 sm:mt-8"
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

          {/* Main Content - Full width on mobile, 2/3 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-white/10"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-0 bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
