
import { useState, useEffect } from 'react';
import TodoHeader from '../components/TodoHeader';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilters from '../components/TodoFilters';
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);

  // Mock user for now - will be replaced with Supabase auth
  useEffect(() => {
    setUser({ id: 1, name: 'Demo User', email: 'demo@example.com' });
  }, []);

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
    toast("Task created successfully!");
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast("Task updated!");
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast("Task deleted!");
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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      <TodoHeader user={user} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px'
      }}>
        
        {/* Left Sidebar */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          height: 'fit-content',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <TodoForm onSubmit={addTask} />
          <div style={{ margin: '24px 0' }}>
            <TodoFilters 
              currentFilter={filter} 
              onFilterChange={setFilter}
              taskCounts={{
                all: tasks.length,
                completed: tasks.filter(t => t.completed).length,
                pending: tasks.filter(t => !t.completed).length,
                shared: tasks.filter(t => t.shared).length
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '16px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              margin: '0'
            }}>
              Your Tasks ({filteredTasks.length})
            </h2>
          </div>
          
          <TodoList 
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
