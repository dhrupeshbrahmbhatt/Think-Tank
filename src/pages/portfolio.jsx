import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaChartLine, FaRocket, FaUserAstronaut, FaCode, FaBriefcase, FaUsers, FaStar, FaCog, FaBell, FaLaptopCode, FaPalette, FaGraduationCap, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        duration: 0.4 
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Portfolio template options
  const portfolioTemplates = [
    {
      id: 'developer',
      title: 'Developer Portfolio',
      icon: <FaCode size={32} />,
      description: 'Showcase your coding projects, skills, and technical experience. Perfect for software engineers and web developers.',
      color: 'bg-indigo-500',
      path: '/portfolio/developer'
    },
    {
      id: 'designer',
      title: 'Designer Portfolio',
      icon: <FaPalette size={32} />,
      description: 'Highlight your design work, creative process, and visual skills. Ideal for UI/UX designers and graphic artists.',
      color: 'bg-pink-500',
      path: '/portfolio/designer'
    },
    {
      id: 'professional',
      title: 'Professional Resume',
      icon: <FaBriefcase size={32} />,
      description: 'Present your work experience, skills, and achievements in a professional format for potential employers.',
      color: 'bg-blue-500',
      path: '/portfolio/professional'
    },
    {
      id: 'academic',
      title: 'Academic Portfolio',
      icon: <FaGraduationCap size={32} />,
      description: 'Showcase your research, publications, and academic achievements. Perfect for researchers and educators.',
      color: 'bg-green-500',
      path: '/portfolio/academic'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Portfolio',
      icon: <FaLaptopCode size={32} />,
      description: 'Display both your frontend and backend skills with a comprehensive portfolio for full stack developers.',
      color: 'bg-purple-500',
      path: '/portfolio/fullstack'
    }
  ];

  // Find the selected template based on URL parameter
  useEffect(() => {
    if (type && type !== 'custom') {
      const template = portfolioTemplates.find(t => t.id === type);
      if (template) {
        setSelectedTemplate(template);
      } else {
        // If invalid template type, redirect to portfolio selection
        navigate('/dashboard/portfolio');
      }
    } else if (type === 'custom') {
      setSelectedTemplate({
        id: 'custom',
        title: 'Custom Portfolio',
        color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
      });
    }
  }, [type, navigate]);

  // Render template configuration page if a template is selected
  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 p-0">
        {/* Sidebar */}
        <div className="fixed h-full w-16 flex flex-col items-center pt-8 bg-slate-900 border-r border-slate-800">
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-indigo-500 mb-10"
            >
              <FaRocket size={32} />
            </motion.div>
          </Link>
          
          <div className="flex flex-col items-center space-y-8 mt-8">
            <Link to="/dashboard/portfolio">
              <motion.div
                whileHover={{ scale: 1.15, color: "#6366f1" }}
                className="text-indigo-500 cursor-pointer transition-colors"
              >
                <FaUserAstronaut size={22} />
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.15, color: "#6366f1" }}
                className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
              >
                <FaChartLine size={22} />
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaBriefcase size={22} />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaGithub size={22} />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaLinkedin size={22} />
            </motion.div>
          </div>
          
          <div className="mt-auto mb-8">
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaCog size={22} />
            </motion.div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="ml-16 p-6">
          {/* Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-10 pb-4 border-b border-slate-800"
          >
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/dashboard/portfolio')}
                className="mr-4 text-slate-400 hover:text-indigo-500"
              >
                <FaArrowLeft size={20} />
              </motion.button>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                <span className={`text-transparent bg-clip-text ${selectedTemplate.id === 'custom' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''}`}>
                  {selectedTemplate.title}
                </span> Setup
              </h1>
            </div>
          </motion.div>
          
          {/* Template Configuration */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={cardVariants} className="bg-slate-800 rounded-xl p-6">
              <div className={`${selectedTemplate.color} w-full h-40 rounded-lg mb-6 flex items-center justify-center`}>
                <h2 className="text-3xl font-bold text-white">
                  {selectedTemplate.title} Preview
                </h2>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">Configure Your Portfolio</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Portfolio Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="My Amazing Portfolio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Professional Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Color Theme</label>
                    <div className="flex space-x-3">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-indigo-500 cursor-pointer ring-2 ring-offset-2 ring-offset-slate-800 ring-indigo-500"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer"
                      ></motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Layout Style</label>
                    <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Modern</option>
                      <option>Classic</option>
                      <option>Minimalist</option>
                      <option>Creative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Include Sections</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-500 rounded border-slate-600 focus:ring-indigo-500" checked />
                        <label className="ml-2 text-sm text-slate-300">About Me</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-500 rounded border-slate-600 focus:ring-indigo-500" checked />
                        <label className="ml-2 text-sm text-slate-300">Projects</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-500 rounded border-slate-600 focus:ring-indigo-500" checked />
                        <label className="ml-2 text-sm text-slate-300">Skills</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-indigo-500 rounded border-slate-600 focus:ring-indigo-500" checked />
                        <label className="ml-2 text-sm text-slate-300">Contact Form</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/${type}_site`)}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 px-6 rounded-lg font-medium"
                >
                  Create Portfolio
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default portfolio selection view
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-0">
      {/* Sidebar */}
      <div className="fixed h-full w-16 flex flex-col items-center pt-8 bg-slate-900 border-r border-slate-800">
        <Link to="/dashboard">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-indigo-500 mb-10"
          >
            <FaRocket size={32} />
          </motion.div>
        </Link>
        
        <div className="flex flex-col items-center space-y-8 mt-8">
          <Link to="/dashboard/portfolio">
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-indigo-500 cursor-pointer transition-colors"
            >
              <FaUserAstronaut size={22} />
            </motion.div>
          </Link>
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaChartLine size={22} />
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.15, color: "#6366f1" }}
            className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            <FaBriefcase size={22} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.15, color: "#6366f1" }}
            className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            <FaGithub size={22} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.15, color: "#6366f1" }}
            className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            <FaLinkedin size={22} />
          </motion.div>
        </div>
        
        <div className="mt-auto mb-8">
          <motion.div
            whileHover={{ scale: 1.15, color: "#6366f1" }}
            className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            <FaCog size={22} />
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-16 p-6">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 pb-4 border-b border-slate-800"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Portfolio <span className="text-indigo-500">Creator</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer"
            >
              <FaBell size={20} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Portfolio Selection Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={cardVariants}>
            <h2 className="text-xl font-bold text-white mb-6">Choose Your Portfolio Template</h2>
            <p className="text-slate-400 mb-8">
              Select a portfolio template that best showcases your skills and experience. 
              Each template is fully customizable to match your personal brand.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-colors duration-300"
                >
                  <div className={`${template.color} p-4 flex justify-center items-center`}>
                    <div className="text-white">
                      {template.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.title}</h3>
                    <p className="text-slate-400 mb-6 h-24">{template.description}</p>
                    <Link 
                      to={template.path}
                      className="block w-full py-2 px-4 bg-slate-700 hover:bg-indigo-600 text-white font-medium rounded-lg text-center transition-colors duration-300"
                    >
                      Select Template
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Custom Portfolio Option */}
          <motion.div
            variants={cardVariants}
            className="bg-slate-800 rounded-xl shadow-lg overflow-hidden mt-8 p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-lg">
                <FaLaptopCode size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Want something custom?</h3>
                <p className="text-slate-400">
                  We can help you build a completely custom portfolio from scratch.
                </p>
              </div>
            </div>
            <Link
              to="/portfolio/custom"
              className="block w-full md:w-auto md:inline-block py-2 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg text-center transition-all duration-300 mt-2"
            >
              Create Custom Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
