
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Github, Chrome, Facebook, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created! Please check your email to verify your account.');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md shadow-xl border border-white/20"
      >
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="bg-white/10 border border-white/20 text-white mr-3 sm:mr-4 hover:bg-white/20 p-2"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {!isLogin && (
            <div className="relative">
              <User size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="pl-10 sm:pl-12 bg-white/10 border border-white/20 text-white h-12 sm:h-14 text-sm sm:text-base placeholder:text-white/60 focus:border-white/40"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 sm:w-5 sm:h-5" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 sm:pl-12 bg-white/10 border border-white/20 text-white h-12 sm:h-14 text-sm sm:text-base placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 sm:w-5 sm:h-5" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 sm:pl-12 bg-white/10 border border-white/20 text-white h-12 sm:h-14 text-sm sm:text-base placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20 text-white h-12 sm:h-14 font-semibold text-sm sm:text-base hover:from-white/30 hover:to-white/20 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>

        <div className="flex items-center gap-4 my-6 text-white/60 text-sm sm:text-base">
          <div className="flex-1 h-px bg-white/20" />
          <span>or</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="bg-white/10 border border-white/20 text-white h-12 sm:h-14 flex items-center justify-center gap-3 hover:bg-white/20 text-sm sm:text-base"
          >
            <Chrome size={18} className="sm:w-5 sm:h-5" />
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="bg-white/10 border border-white/20 text-white h-12 sm:h-14 flex items-center justify-center gap-3 hover:bg-white/20 text-sm sm:text-base"
          >
            <Github size={18} className="sm:w-5 sm:h-5" />
            Continue with GitHub
          </Button>

          <Button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="bg-white/10 border border-white/20 text-white h-12 sm:h-14 flex items-center justify-center gap-3 hover:bg-white/20 text-sm sm:text-base"
          >
            <Facebook size={18} className="sm:w-5 sm:h-5" />
            Continue with Facebook
          </Button>
        </div>

        <p className="text-center mt-6 text-white/80 text-sm sm:text-base">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="bg-none border-none text-white font-bold ml-2 cursor-pointer underline hover:text-white/90"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
