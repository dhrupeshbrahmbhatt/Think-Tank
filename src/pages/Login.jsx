import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import "../App.css";
import axios from 'axios';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  // Preload animation state
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Start with a slight delay to ensure everything is rendered
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const response = await axios.post('http://localhost:3000/signin', {
        email: formData.get('email'),
        password: formData.get('password')
      });

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Success animation
      toast.success('Login successful!');
      
      // Animation before redirect
      document.querySelector('.login-container').classList.add('fade-out');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden login-container">
      <Toaster />
      
      {/* Background animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
              opacity: 0.1,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Left side - Login Form */}
      <motion.div 
        className="w-1/2 flex items-center justify-center p-8 bg-black relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div className="mb-8">
            <motion.h2 
              className="text-4xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                Welcome Back
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Sign in to continue to your account
            </motion.p>
          </motion.div>
          
          <motion.form 
            className="space-y-5"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1.5 transition-colors duration-300 ${currentField === 'email' ? 'text-blue-400' : 'text-gray-300'}`}
              >
                Email
              </label>
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)" }}
                className="relative rounded-lg overflow-hidden"
              >
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: currentField === 'email' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full px-4 py-3 bg-gray-900 border ${currentField === 'email' ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
                  placeholder="Enter your email"
                  onFocus={() => setCurrentField('email')}
                  onBlur={() => setCurrentField(null)}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-1.5 transition-colors duration-300 ${currentField === 'password' ? 'text-blue-400' : 'text-gray-300'}`}
              >
                Password
              </label>
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)" }}
                className="relative rounded-lg overflow-hidden"
              >
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: currentField === 'password' ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`w-full px-4 py-3 bg-gray-900 border ${currentField === 'password' ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300`}
                  placeholder="Enter your password"
                  onFocus={() => setCurrentField('password')}
                  onBlur={() => setCurrentField(null)}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.a 
                href="/forgot-password" 
                className="text-sm text-blue-400 hover:text-blue-300"
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot password?
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg focus:outline-none transition duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600"
                  style={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                  style={{ 
                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "0% 0%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 200%"]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <motion.span 
                        className="inline-block h-4 w-4 rounded-full bg-white opacity-75 mr-3"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
                      />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <motion.a 
                  href="/signup" 
                  className="text-blue-400 hover:text-blue-300 font-medium relative inline-block"
                  whileHover={{ color: "#93C5FD" }}
                >
                  <span>Sign up</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                    initial={{ width: 0, left: "50%" }}
                    whileHover={{ width: "100%", left: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Right side - Content */}
      <motion.div 
        className="w-1/2 flex items-center justify-center p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Gradient background with animation */}
        <motion.div 
          className="absolute inset-0 bg-blue-900 z-0"
          animate={{ 
            background: [
              "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
              "linear-gradient(225deg, #1E3A8A 0%, #312E81 100%)",
              "linear-gradient(315deg, #312E81 0%, #1E3A8A 100%)",
              "linear-gradient(45deg, #1E40AF 0%, #1E3A8A 100%)",
            ]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [0, Math.random() > 0.5 ? '100vh' : '-100vh'],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl font-bold text-white mb-6"
              initial={{ letterSpacing: "0.2em", opacity: 0.6 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 2, delay: 1.0, ease: "easeOut" }}
            >
              <motion.span 
                className="inline-block"
                whileHover={{ 
                  scale: 1.1, 
                  color: "#60A5FA",
                  textShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Think
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                whileHover={{ 
                  scale: 1.1, 
                  color: "#A78BFA",
                  textShadow: "0 0 15px rgba(139, 92, 246, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Tank
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-200 mb-10 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Empowering minds to shape the future through innovative thinking and collaborative problem-solving.
          </motion.p>
          
          <div className="space-y-6">
            {[
              { text: "Real-time collaboration", delay: 1.4 },
              { text: "Advanced analytics", delay: 1.6 },
              { text: "Secure platform", delay: 1.8 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center space-x-3 text-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: 'rgba(59, 130, 246, 0.4)',
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.svg 
                    className="w-6 h-6 text-blue-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: item.delay + 0.3 }}
                  >
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
                <span className="text-lg">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;