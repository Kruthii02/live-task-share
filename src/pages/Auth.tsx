
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
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              marginRight: '16px'
            }}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={20} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.6)'
              }} />
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                style={{
                  paddingLeft: '44px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  height: '48px'
                }}
                className="placeholder:text-white/60"
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.6)'
            }} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                paddingLeft: '44px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                height: '48px'
              }}
              className="placeholder:text-white/60"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.6)'
            }} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                paddingLeft: '44px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                height: '48px'
              }}
              className="placeholder:text-white/60"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              height: '48px',
              fontWeight: '600'
            }}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          margin: '24px 0',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <span>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button
            type="button"
            onClick={() => handleSocialLogin('google')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Chrome size={20} />
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={() => handleSocialLogin('github')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Github size={20} />
            Continue with GitHub
          </Button>

          <Button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Facebook size={20} />
            Continue with Facebook
          </Button>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              marginLeft: '8px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
