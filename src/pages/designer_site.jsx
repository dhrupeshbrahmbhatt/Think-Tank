import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaArrowLeft, FaGithub, FaLinkedin, FaDribbble, FaBehance, FaInstagram, 
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaPalette, FaArrowUp, FaTimes
} from 'react-icons/fa';

export default function DesignerSite() {
  // Color theme state - default to a clean, minimal palette inspired by Jobs
  const [colorTheme, setColorTheme] = useState({
    primary: '#000000',
    secondary: '#f5f5f7',
    accent: '#0066cc',
    text: '#1d1d1f',
    background: '#ffffff'
  });
  
  // Theme customizer visibility state
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);
  
  // Predefined color themes
  const colorThemes = [
    { name: "Classic", primary: '#000000', secondary: '#f5f5f7', accent: '#0066cc', text: '#1d1d1f', background: '#ffffff' },
    { name: "Midnight", primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', text: '#e7e7e7', background: '#0f0f0f' },
    { name: "Pastel", primary: '#2b2d42', secondary: '#f8edeb', accent: '#d5bdaf', text: '#2b2d42', background: '#ffffff' },
    { name: "Vibrant", primary: '#2d3047', secondary: '#f7f8fa', accent: '#ff6b6b', text: '#2d3047', background: '#ffffff' },
    { name: "Earthy", primary: '#3a3335', secondary: '#f3f0eb', accent: '#837a77', text: '#3a3335', background: '#fafafa' },
  ];
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your backend
    // For this demo, we'll just simulate a successful submission
    setTimeout(() => {
      setFormSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      // Reset form after 3 seconds
      setTimeout(() => setFormSubmitted(false), 3000);
    }, 800);
  };
  
  // Handle contact form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  // For scroll-driven animations
  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);
  
  // Refs for scroll to top functionality
  const topRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Check scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Demo data inspired by Steve Jobs but for a designer
  const userData = {
    name: "Steve Peterson",
    title: "Visual Designer & Creative Director",
    bio: "I believe that design is not just about how it looks, but how it works. My passion is creating experiences that are both beautiful and functional, with a focus on typography, space, and simplicity.",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    featured: [
      {
        id: 1,
        title: "Brand Identity: Lumina",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        description: "Complete rebrand for an innovative tech startup focusing on sustainable lighting solutions."
      },
      {
        id: 2,
        title: "UX/UI Design: Harmony App",
        category: "Interface Design",
        image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        description: "A minimal, intuitive music app interface focused on the listening experience."
      },
      {
        id: 3,
        title: "Typography Study: Clarity",
        category: "Typography",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        description: "Exploring legibility and emotion through custom typeface development."
      }
    ],
    skills: [
      { name: "Visual Design", level: 95 },
      { name: "Typography", level: 90 },
      { name: "Brand Identity", level: 95 },
      { name: "UI/UX Design", level: 85 },
      { name: "Motion Graphics", level: 80 },
      { name: "Design Systems", level: 85 }
    ],
    testimonials: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "CMO at TechVision",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "Steve transformed our brand identity with a design that perfectly captures our vision. His attention to detail and strategic approach to design made all the difference."
      },
      {
        id: 2,
        name: "David Chen",
        role: "Founder, Harmony App",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        text: "Working with Steve was a revelation. He didn't just create beautiful interfaces; he crafted experiences that our users love. The results speak for themselves - our engagement is up 150%."
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        role: "Creative Director, DesignHub",
        image: "https://randomuser.me/api/portraits/women/29.jpg",
        text: "Steve's typographic work for our publication redefined how we communicate with our audience. His understanding of both aesthetics and functionality is unmatched."
      }
    ],
    contact: {
      email: "steve@designportfolio.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA"
    }
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Add new animation variants for micro-animations
  const hoverScale = {
    whileHover: { 
      scale: 1.03, 
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    },
    whileTap: { 
      scale: 0.98 
    }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.6 }
    }
  };
  
  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  // For skill bars animation
  const [skillsInView, setSkillsInView] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorTheme.background, color: colorTheme.text }}>
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full z-10 py-6 px-8 flex justify-between items-center backdrop-blur-sm" 
        style={{ 
          backgroundColor: `${colorTheme.background}cc`,
          borderBottom: `1px solid ${colorTheme.secondary}`
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/dashboard/portfolio" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2"
            style={{ backgroundColor: colorTheme.accent, color: colorTheme.secondary }}
          >
            <FaArrowLeft size={18} />
          </motion.div>
          <span className="ml-4 font-medium tracking-tight">Back to Dashboard</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-sm tracking-wide">
          <a href="#work" className="font-medium hover:opacity-70 transition-opacity">WORK</a>
          <a href="#about" className="font-medium hover:opacity-70 transition-opacity">ABOUT</a>
          <a href="#skills" className="font-medium hover:opacity-70 transition-opacity">SKILLS</a>
          <a href="#testimonials" className="font-medium hover:opacity-70 transition-opacity">TESTIMONIALS</a>
          <a href="#contact" className="font-medium hover:opacity-70 transition-opacity">CONTACT</a>
        </div>
      </motion.nav>
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-48 px-8 md:px-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          style={{ opacity: scrollOpacity, scale: scrollScale }}
        >
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {userData.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-light mb-8" style={{ color: colorTheme.accent }}>
              {userData.title}
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-lg">
              {userData.bio}
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-md font-medium"
                style={{ backgroundColor: colorTheme.accent, color: colorTheme.secondary }}
              >
                Get in touch
              </motion.a>
              <motion.a 
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-md font-medium border"
                style={{ borderColor: colorTheme.text, color: colorTheme.text }}
              >
                View work
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="order-first md:order-last">
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto"
              style={{ border: `4px solid ${colorTheme.accent}` }}
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Featured Quote */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-24 py-16 text-center"
        style={{ backgroundColor: colorTheme.secondary }}
      >
        <blockquote className="max-w-4xl mx-auto px-8">
          <p className="text-2xl md:text-3xl italic font-light leading-relaxed">
            "{userData.quote}"
          </p>
        </blockquote>
      </motion.div>
      
      {/* Featured Work Section */}
      <section id="work" className="py-24 px-8 md:px-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 
            variants={slideFromLeft}
            className="text-3xl font-bold tracking-tight mb-2"
          >
            Selected Work
          </motion.h2>
          <motion.div 
            variants={slideFromLeft}
            className="h-1 w-24 mb-8" 
            style={{ backgroundColor: colorTheme.accent }}
          ></motion.div>
          <motion.p 
            variants={fadeIn}
            className="text-lg max-w-2xl"
          >
            A curated selection of projects that showcase my approach to design challenges and creative problem-solving.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  } 
                }
              }}
              className="rounded-lg overflow-hidden group"
              style={{ backgroundColor: colorTheme.secondary }}
            >
              <motion.div 
                {...hoverScale}
                className="overflow-hidden"
              >
                <motion.img
                  whileHover={{ scale: 1.1, transition: { duration: 0.6 } }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-all duration-700 ease-in-out"
                />
              </motion.div>
              
              <div className="p-6">
                <span className="text-sm tracking-wider uppercase" style={{ color: colorTheme.accent }}>
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                <p className="text-base opacity-80 mb-4">{project.description}</p>
                <motion.button
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex items-center text-sm font-medium"
                  style={{ color: colorTheme.accent }}
                >
                  View Project Details
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.button
            {...hoverScale}
            className="px-8 py-3 rounded-md font-medium border"
            style={{ borderColor: colorTheme.text, color: colorTheme.text }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 px-8 md:px-24" style={{ backgroundColor: colorTheme.secondary }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="order-last md:order-first">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute -left-4 -top-4 h-full w-full border-2 rounded-lg"
                  style={{ borderColor: colorTheme.accent }}
                ></motion.div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Designer at work" 
                  className="rounded-lg w-full h-auto relative z-10"
                />
              </div>
            </motion.div>
            
            <motion.div variants={stagger}>
              <motion.h2 
                variants={slideFromLeft}
                className="text-3xl font-bold tracking-tight mb-2"
              >
                About Me
              </motion.h2>
              <motion.div 
                variants={slideFromLeft}
                className="h-1 w-24 mb-8" 
                style={{ backgroundColor: colorTheme.accent }}
              ></motion.div>
              
              <motion.div variants={slideUp} className="space-y-6 text-lg">
                <p>
                  With over 10 years of experience in design, I've developed a philosophy centered on simplicity, functionality, and user-focused thinking. I believe that truly great design disappears, allowing users to intuitively connect with products and experiences.
                </p>
                <p>
                  My background spans branding, digital product design, and creative direction. I've worked with clients ranging from startups to established brands, helping them communicate more effectively through thoughtful design.
                </p>
                <p>
                  Every project begins with deep research and understanding of the problem space, followed by exploration, iteration, and refinement. My process is collaborative and transparent, ensuring that design solutions are not just beautiful, but strategically sound.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="mt-8 flex space-x-4"
              >
                <motion.a 
                  href="https://dribbble.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: colorTheme.background, color: colorTheme.accent }}
                >
                  <FaDribbble size={20} />
                </motion.a>
                <motion.a 
                  href="https://behance.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: colorTheme.background, color: colorTheme.accent }}
                >
                  <FaBehance size={20} />
                </motion.a>
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: colorTheme.background, color: colorTheme.accent }}
                >
                  <FaInstagram size={20} />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-24 px-8 md:px-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView={() => {
            setSkillsInView(true);
            return "visible";
          }}
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 
            variants={slideFromLeft}
            className="text-3xl font-bold tracking-tight mb-2"
          >
            Design Expertise
          </motion.h2>
          <motion.div 
            variants={slideFromLeft}
            className="h-1 w-24 mb-8" 
            style={{ backgroundColor: colorTheme.accent }}
          ></motion.div>
          <motion.p 
            variants={fadeIn}
            className="text-lg max-w-2xl mb-12"
          >
            My range of skills has been developed through dedicated practice and real-world application across a variety of design disciplines.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {userData.skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial="hidden"
                animate={skillsInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { delay: index * 0.1 }
                  }
                }}
                className="mb-6"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm opacity-80">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "easeOut",
                      delay: 0.2 + (index * 0.1)
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colorTheme.accent }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Design Process Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-20"
        >
          <motion.h3 
            variants={slideFromLeft}
            className="text-2xl font-bold mb-10 text-center"
          >
            My Design Process
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Discovery", icon: "🔍", description: "Research and understanding the problem space" },
              { title: "Ideation", icon: "💡", description: "Creative exploration and concept development" },
              { title: "Iteration", icon: "🔄", description: "Refinement through feedback and testing" },
              { title: "Delivery", icon: "🚀", description: "Finalizing and implementing the solution" }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { delay: index * 0.2, duration: 0.5 } 
                  }
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center p-6 rounded-lg"
                style={{ backgroundColor: colorTheme.secondary }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="opacity-80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Footer CTA Section - New Addition */}
      <section className="py-16 px-8 md:px-24" style={{ backgroundColor: colorTheme.accent }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-6" 
            style={{ color: colorTheme.secondary }}
          >
            Ready to create something exceptional?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto" 
            style={{ color: `${colorTheme.secondary}CC` }}
          >
            Let's collaborate on your next project and bring your vision to life with thoughtful, purposeful design.
          </motion.p>
          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-md font-medium text-lg"
              style={{ backgroundColor: colorTheme.secondary, color: colorTheme.accent }}
            >
              Start a Project
            </motion.a>
            <motion.a 
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-md font-medium text-lg border-2"
              style={{ borderColor: colorTheme.secondary, color: colorTheme.secondary }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Enhanced Footer */}
      <footer className="py-12 px-8 md:px-24" style={{ backgroundColor: colorTheme.primary }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4" style={{ color: colorTheme.secondary }}>
                {userData.name}
              </h3>
              <p className="mb-4 opacity-80 max-w-md" style={{ color: colorTheme.secondary }}>
                {userData.title}
              </p>
              <p className="mb-6 opacity-70 max-w-md" style={{ color: colorTheme.secondary }}>
                Creating purposeful design solutions that balance form and function to deliver exceptional user experiences.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://dribbble.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${colorTheme.secondary}30`, color: colorTheme.secondary }}
                >
                  <FaDribbble size={20} />
                </motion.a>
                <motion.a 
                  href="https://behance.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${colorTheme.secondary}30`, color: colorTheme.secondary }}
                >
                  <FaBehance size={20} />
                </motion.a>
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${colorTheme.secondary}30`, color: colorTheme.secondary }}
                >
                  <FaInstagram size={20} />
                </motion.a>
                <motion.a 
                  href="mailto:email@example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${colorTheme.secondary}30`, color: colorTheme.secondary }}
                >
                  <FaEnvelope size={20} />
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4" style={{ color: colorTheme.secondary }}>Navigation</h4>
              <ul className="space-y-2 opacity-80" style={{ color: colorTheme.secondary }}>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Home</a></li>
                <li><a href="#work" className="hover:opacity-100 transition-opacity">Portfolio</a></li>
                <li><a href="#about" className="hover:opacity-100 transition-opacity">About</a></li>
                <li><a href="#skills" className="hover:opacity-100 transition-opacity">Skills</a></li>
                <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4" style={{ color: colorTheme.secondary }}>Contact</h4>
              <ul className="space-y-2 opacity-80" style={{ color: colorTheme.secondary }}>
                <li className="flex items-center">
                  <FaEnvelope size={16} className="mr-2" />
                  {userData.contact.email}
                </li>
                <li className="flex items-center">
                  <FaPhone size={16} className="mr-2" />
                  {userData.contact.phone}
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt size={16} className="mr-2" />
                  {userData.contact.location}
                </li>
              </ul>
              
              <div className="mt-6">
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm rounded inline-block"
                  style={{ backgroundColor: colorTheme.accent, color: colorTheme.secondary }}
                >
                  Schedule a Call
                </motion.a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: `${colorTheme.secondary}30` }}>
            <p className="text-sm opacity-60 mb-4 md:mb-0" style={{ color: colorTheme.secondary }}>
              © {new Date().getFullYear()} {userData.name}. All rights reserved.
            </p>
            <div className="text-sm opacity-60" style={{ color: colorTheme.secondary }}>
              <span>Designed with purpose. Built with passion.</span>
              <span className="mx-2">•</span>
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
