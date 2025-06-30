
import TodoCard from './TodoCard';

const TodoList = ({ tasks, onToggleComplete, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: 'var(--text-secondary-color)'
      }}>
        <p style={{ fontSize: '16px', margin: '0' }}>No tasks found</p>
        <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
