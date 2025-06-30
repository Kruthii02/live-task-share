
const TodoFilters = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
    { key: 'shared', label: 'Shared', count: taskCounts.shared }
  ];

  return (
    <div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: '12px'
      }}>
        Filter Tasks
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '8px',
              background: currentFilter === filter.key 
                ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                : '#f7fafc',
              color: currentFilter === filter.key ? 'white' : '#4a5568',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              if (currentFilter !== filter.key) {
                (e.target as HTMLElement).style.backgroundColor = '#edf2f7';
              }
            }}
            onMouseOut={(e) => {
              if (currentFilter !== filter.key) {
                (e.target as HTMLElement).style.backgroundColor = '#f7fafc';
              }
            }}
          >
            <span>{filter.label}</span>
            <span style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold',
              background: currentFilter === filter.key 
                ? 'rgba(255,255,255,0.2)' 
                : '#e2e8f0',
              color: currentFilter === filter.key ? 'white' : '#4a5568'
            }}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;
