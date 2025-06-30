
import TodoCard from './TodoCard';

const TodoList = ({ tasks, onToggleComplete, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#a0aec0'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          📝
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '8px'
        }}>
          No tasks found
        </h3>
        <p style={{ fontSize: '14px' }}>
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxHeight: '600px',
      overflowY: 'auto',
      paddingRight: '8px'
    }}>
      {tasks.map(task => (
        <TodoCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
