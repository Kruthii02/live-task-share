
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnimatedThemeToggle from './AnimatedThemeToggle';

const TodoHeader = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 py-3 sm:py-4 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm sm:text-xl border-2 border-white/20 shadow-lg"
          >
            ✓
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-shadow-sm"
          >
            TickMate
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 sm:gap-4"
        >
          {user && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 sm:gap-3 py-2 px-3 sm:py-3 sm:px-5 bg-white/10 backdrop-blur-sm rounded-full sm:rounded-3xl border border-white/20 shadow-lg"
            >
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-white/20 text-white text-xs sm:text-sm">
                  {user.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : 
                   user.email ? user.email[0].toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium text-sm sm:text-base max-w-32 sm:max-w-none truncate">
                {user.user_metadata?.full_name || user.email}
              </span>
            </motion.div>
          )}
          
          {/* Mobile avatar only */}
          {user && (
            <motion.div className="sm:hidden">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-white/20 text-white text-xs">
                  {user.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : 
                   user.email ? user.email[0].toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
          
          <AnimatedThemeToggle />
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSignOut}
            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer flex items-center text-red-400 shadow-lg hover:bg-white/20 transition-all duration-300"
          >
            <LogOut size={16} className="sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default TodoHeader;
