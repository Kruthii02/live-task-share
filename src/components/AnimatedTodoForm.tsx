
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Sparkles, Users } from 'lucide-react';

interface AnimatedTodoFormProps {
  onSubmit: any;
  taskType: 'personal' | 'shared';
}

const AnimatedTodoForm = ({ onSubmit, taskType }: AnimatedTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [sharedWith, setSharedWith] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Brief animation delay
      
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: dueDate || undefined,
        shared_with: taskType === 'shared' && sharedWith ? sharedWith.split(',').map(email => email.trim()) : []
      };
      
      onSubmit(taskData);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setSharedWith('');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 flex items-center gap-2"
      >
        {taskType === 'personal' ? (
          <Sparkles size={18} className="sm:w-5 sm:h-5 text-yellow-300" />
        ) : (
          <Users size={18} className="sm:w-5 sm:h-5 text-blue-300" />
        )}
        <span className="text-sm sm:text-base">
          Add New {taskType === 'personal' ? 'Personal' : 'Shared'} Task
        </span>
      </motion.h3>
      
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="w-full py-3 px-4 sm:py-4 sm:px-5 border-2 border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base bg-white/80 backdrop-blur-sm text-gray-800 outline-none transition-all duration-300 shadow-md placeholder:text-gray-500"
        />
        
        <motion.textarea
          whileFocus={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)..."
          rows={3}
          className="w-full py-3 px-4 sm:py-4 sm:px-5 border-2 border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base bg-white/80 backdrop-blur-sm text-gray-800 outline-none resize-vertical font-inherit transition-all duration-300 shadow-md placeholder:text-gray-500"
        />
        
        {taskType === 'personal' && (
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due date (optional)..."
            className="w-full py-3 px-4 sm:py-4 sm:px-5 border-2 border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base bg-white/80 backdrop-blur-sm text-gray-800 outline-none transition-all duration-300 shadow-md"
          />
        )}
        
        {taskType === 'shared' && (
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            type="text"
            value={sharedWith}
            onChange={(e) => setSharedWith(e.target.value)}
            placeholder="Share with (comma-separated emails)..."
            className="w-full py-3 px-4 sm:py-4 sm:px-5 border-2 border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base bg-white/80 backdrop-blur-sm text-gray-800 outline-none transition-all duration-300 shadow-md placeholder:text-gray-500"
          />
        )}
        
        <motion.select
          whileFocus={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full py-3 px-4 sm:py-4 sm:px-5 border-2 border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base bg-white/80 backdrop-blur-sm text-gray-800 outline-none cursor-pointer transition-all duration-300 shadow-md"
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
          className={`w-full py-3 px-4 sm:py-4 sm:px-5 bg-gradient-to-r from-blue-500 to-green-500 text-white border-none rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            isSubmitting ? 'cursor-not-allowed opacity-80' : 'hover:shadow-xl'
          }`}
        >
          <motion.div
            animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
          >
            <Plus size={16} className="sm:w-4 sm:h-4" />
          </motion.div>
          <span className="text-sm sm:text-base">
            {isSubmitting ? 'Adding Task...' : 'Add Task'}
          </span>
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AnimatedTodoForm;
