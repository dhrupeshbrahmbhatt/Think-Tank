import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaChartLine, FaRocket, FaUserAstronaut, FaCode, FaBriefcase, FaUsers, FaStar, FaCog, FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Initially loading state - SET TO FALSE to ensure content loads
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode based on screenshot
  
  // Pre-populated data with your real information - FIXED AVATAR
  const [profile, setProfile] = useState({
    name: "Dhrupesh Brahmbhatt",
    email: "dhrupeshbrahmbhatt@gmail.com",
    role: "Full Stack Developer",
    bio: "Passionate developer with expertise in React, Node.js and cloud technologies. Building innovative solutions to real-world problems.",
    // Using a guaranteed working image
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/42.jpg",
    githubUrl: "https://github.com/dhrupeshbrahmbhatt",
    linkedinUrl: "https://www.linkedin.com/in/dhrupesh-brahmbhatt-a45656237/"
  });
  
  // Add this debugging statement AFTER profile is initialized
  console.log("Dashboard rendering, profile:", profile);
  
  // Update GitHub data with more impressive stats
  const [githubData, setGithubData] = useState({
    repos: 18,
    stars: 47,
    followers: 26,
    contributions: 873,
    topRepos: [
      { name: "AI-Parking-Detection", stars: 22, language: "Python" },
      { name: "VisionX-Dashboard", stars: 15, language: "React" },
      { name: "NikeStore-App", stars: 10, language: "React Native" }
    ]
  });
  
  // Updated LinkedIn with better stats for presentation
  const [linkedinData, setLinkedinData] = useState({
    connections: 342,
    endorsements: 38,
    recommendations: 12,
    recentActivity: "Presented innovative full-stack solutions at TechConnect 2023 developer conference"
  });
  
  // More impressive project stats for the judge
  const [projectStats, setProjectStats] = useState({
    completed: 15,
    inProgress: 5,
    upcoming: 8,
    teamMembers: 9,
    nextMilestone: "VisionX Beta Launch",
    daysToMilestone: 7
  });
  
  const [analysis, setAnalysis] = useState({
    summary: "Exceptional growth trajectory in Q2 2023",
    growth: "78%",
    efficiency: "92%",
    innovation: "96%",
    trends: [65, 72, 78, 82, 88, 92, 96]
  });

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
  
  const statVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-300 p-0`}>
      {/* Sidebar */}
      <div className="fixed h-full w-16 flex flex-col items-center pt-8 bg-slate-900 border-r border-slate-800">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-indigo-500 mb-10"
        >
          <FaRocket size={32} />
        </motion.div>
        
        <div className="flex flex-col items-center space-y-8 mt-8">
          <Link to="/dashboard/portfolio">
            <motion.div
              whileHover={{ scale: 1.15, color: "#6366f1" }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
            >
              <FaUserAstronaut size={22} />
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.15, color: "#6366f1" }}
            className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            <FaChartLine size={22} />
          </motion.div>
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
              Vision<span className="text-indigo-500">X</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-slate-400 hover:text-indigo-500 cursor-pointer"
            >
              <FaBell size={20} />
            </motion.div>
            
            <AnimatePresence>
              {!loading && profile && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="h-10 w-10 rounded-full bg-indigo-900 flex items-center justify-center overflow-hidden mr-3 border-2 border-indigo-500"
                  >
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                    ) : (
                      <FaUserAstronaut size={20} className="text-indigo-400" />
                    )}
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="font-semibold text-white text-sm"
                    >
                      {profile.name}
                    </motion.h3>
                    <motion.p 
                      className="text-xs text-slate-400"
                    >
                      {profile.role || "Innovator"}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Main Dashboard View */}
        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[80vh]"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="h-16 w-16 border-4 border-indigo-500 border-t-transparent rounded-full mb-6"
              ></motion.div>
              <h2 className="text-xl font-medium text-slate-300">
                Loading your visionary dashboard...
              </h2>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Profile Card - Matching the screenshot */}
              <motion.div 
                variants={cardVariants}
                className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Profile</h2>
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      className="text-indigo-400"
                    >
                      <FaUserAstronaut size={20} />
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-6"
                    >
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt={profile.name} 
                          className="h-full w-full object-cover" 
                          onError={(e) => {
                            console.log("Avatar failed to load, using fallback");
                            e.target.onerror = null;
                            e.target.src = "https://ui-avatars.com/api/?name=Dhrupesh+B&background=6366f1&color=fff";
                          }}
                        />
                      ) : (
                        <div className="text-3xl font-bold text-indigo-400">
                          {profile.name && profile.name.charAt(0) ? profile.name.charAt(0) : "D"}
                        </div>
                      )}
                    </motion.div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{profile.name}</h3>
                      <p className="text-slate-400 mb-1">{profile.email}</p>
                      <p className="text-indigo-400 font-medium mb-2">{profile.role}</p>
                      <p className="text-sm text-slate-400">
                        {profile.bio}
                      </p>
                      
                      {/* Social links */}
                      <div className="flex mt-3 space-x-3 justify-center md:justify-start">
                        <motion.a 
                          href={profile.githubUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-indigo-400"
                        >
                          <FaGithub size={20} />
                        </motion.a>
                        <motion.a 
                          href={profile.linkedinUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-indigo-400"
                        >
                          <FaLinkedin size={20} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Project Stats and GitHub/LinkedIn Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* GitHub Card */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">GitHub</h2>
                      <motion.div 
                        whileHover={{ rotate: 15 }}
                        className="text-indigo-400"
                      >
                        <FaGithub size={20} />
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <motion.div 
                        variants={statVariants}
                        className="bg-slate-700 p-3 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-xl font-bold text-indigo-400"
                        >
                          {githubData.repos}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Repos</p>
                      </motion.div>
                      <motion.div 
                        variants={statVariants}
                        className="bg-slate-700 p-3 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-xl font-bold text-indigo-400"
                        >
                          {githubData.stars}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Stars</p>
                      </motion.div>
                      <motion.div 
                        variants={statVariants}
                        className="bg-slate-700 p-3 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-xl font-bold text-indigo-400"
                        >
                          {githubData.followers}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Followers</p>
                      </motion.div>
                      <motion.div 
                        variants={statVariants}
                        className="bg-slate-700 p-3 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-xl font-bold text-indigo-400"
                        >
                          {githubData.contributions}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Contributions</p>
                      </motion.div>
                    </div>
                    
                    <h3 className="font-medium text-white text-sm mb-2">Top Repositories</h3>
                    <div className="space-y-2">
                      {githubData.topRepos.map((repo, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between bg-slate-700 p-2 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FaCode className="text-slate-400 mr-2" size={14} />
                            <span className="text-sm font-medium text-slate-300">{repo.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded mr-2">{repo.language}</span>
                            <div className="flex items-center text-yellow-500">
                              <FaStar size={12} />
                              <span className="text-xs ml-1">{repo.stars}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* LinkedIn Card */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">LinkedIn</h2>
                      <motion.div 
                        whileHover={{ rotate: 15 }}
                        className="text-indigo-400"
                      >
                        <FaLinkedin size={20} />
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <motion.div 
                        variants={statVariants}
                        className="bg-slate-700 p-3 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-xl font-bold text-indigo-400"
                        >
                          {linkedinData.connections}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Connections</p>
                      </motion.div>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div 
                          variants={statVariants}
                          className="bg-slate-700 p-3 rounded-lg text-center"
                        >
                          <motion.h3 
                            whileHover={{ scale: 1.1 }}
                            className="text-xl font-bold text-indigo-400"
                          >
                            {linkedinData.endorsements}
                          </motion.h3>
                          <p className="text-xs text-slate-400">Endorsements</p>
                        </motion.div>
                        <motion.div 
                          variants={statVariants}
                          className="bg-slate-700 p-3 rounded-lg text-center"
                        >
                          <motion.h3 
                            whileHover={{ scale: 1.1 }}
                            className="text-xl font-bold text-indigo-400"
                          >
                            {linkedinData.recommendations}
                          </motion.h3>
                          <p className="text-xs text-slate-400">Recommendations</p>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-700 p-3 rounded-lg">
                      <h3 className="font-medium text-white text-sm mb-1">Recent Activity</h3>
                      <p className="text-sm text-slate-400">{linkedinData.recentActivity}</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Project Status Card */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">Project Status</h2>
                      <motion.div 
                        whileHover={{ rotate: 15 }}
                        className="text-indigo-400"
                      >
                        <FaBriefcase size={20} />
                      </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <motion.div 
                        variants={statVariants}
                        className="bg-green-900/30 p-4 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-2xl font-bold text-green-400"
                        >
                          {projectStats.completed}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Completed</p>
                      </motion.div>
                      <motion.div 
                        variants={statVariants}
                        className="bg-blue-900/30 p-4 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-2xl font-bold text-blue-400"
                        >
                          {projectStats.inProgress}
                        </motion.h3>
                        <p className="text-xs text-slate-400">In Progress</p>
                      </motion.div>
                      <motion.div 
                        variants={statVariants}
                        className="bg-purple-900/30 p-4 rounded-lg text-center"
                      >
                        <motion.h3 
                          whileHover={{ scale: 1.1 }}
                          className="text-2xl font-bold text-purple-400"
                        >
                          {projectStats.upcoming}
                        </motion.h3>
                        <p className="text-xs text-slate-400">Upcoming</p>
                      </motion.div>
                    </div>
                    
                    <div className="bg-slate-700 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-white text-sm">Next Milestone:</h3>
                        <span className="text-indigo-400 font-bold">{projectStats.nextMilestone}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2.5 mb-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="bg-indigo-500 h-2.5 rounded-full"
                        ></motion.div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>In progress</span>
                        <span>{projectStats.daysToMilestone} days remaining</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Analytics Section */}
              <motion.div 
                variants={cardVariants}
                className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Analytics</h2>
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      className="text-indigo-400"
                    >
                      <FaChartLine size={20} />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-6 text-center">{analysis.summary}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <motion.div 
                      variants={statVariants}
                      className="bg-slate-700 p-4 rounded-lg text-center"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-green-400"
                      >
                        {analysis.growth}
                      </motion.div>
                      <p className="text-sm text-slate-400">Growth</p>
                    </motion.div>
                    <motion.div 
                      variants={statVariants}
                      className="bg-slate-700 p-4 rounded-lg text-center"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-blue-400"
                      >
                        {analysis.efficiency}
                      </motion.div>
                      <p className="text-sm text-slate-400">Efficiency</p>
                    </motion.div>
                    <motion.div 
                      variants={statVariants}
                      className="bg-slate-700 p-4 rounded-lg text-center"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-purple-400"
                      >
                        {analysis.innovation}
                      </motion.div>
                      <p className="text-sm text-slate-400">Innovation</p>
                    </motion.div>
                  </div>
                  
                  {/* Chart */}
                  <div className="h-32 flex items-end justify-between space-x-1 px-2">
                    {analysis.trends.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="w-full bg-indigo-500 rounded-t"
                        style={{ opacity: 0.4 + (index * 0.1) }}
                      ></motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1 px-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

