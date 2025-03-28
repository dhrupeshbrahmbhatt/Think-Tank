const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dhrupesh:DK_dk@lab.pk1pccj.mongodb.net/labData")
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.post('/signup', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Signup route finished with validation errors');
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, githubProfile, linkedinProfile } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Signup route finished: User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        githubProfile,
        linkedinProfile
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        "TOPSECRATE",
        { expiresIn: '1D' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
      console.log('Signup route finished: User created successfully');
    } catch (error) {
      console.log('Signup route finished with error:', error.message);
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// Existing signin route
app.post('/signin', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Signin route finished with validation errors');
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      console.log('Signin attempt for email:', email);

      const user = await User.findOne({ email });
      if (!user) {
        console.log('Signin route finished: User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Signin route finished: Password mismatch');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id },
        "TOPSECRATE",
        { expiresIn: '1D' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
      console.log('Signin route finished: User signed in successfully');
    } catch (error) {
      console.log('Signin route finished with error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, "TOPSECRATE");
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Enhanced profile route using Gemini API
app.get('/profile', auth, async (req, res) => {
  try {
    // Initialize the Google Generative AI with your API key
    // You should store this in environment variables for security
    const genAI = new GoogleGenerativeAI('AIzaSyACkDx2jWRQb2XAftVPXeyG4uVz16eBG9U');

    const user = req.user;
    let profileData = {
      email: user.email,
      github: null,
      linkedin: null
    };

    console.log("fetching github profile");
    // Process GitHub profile if available
    if (user.githubProfile) {
      console.log(`Fetching GitHub data for profile: ${user.githubProfile}`);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const githubPrompt = `
        Extract professional information from this GitHub profile: ${user.githubProfile}
        Return the data in JSON format with these fields:
        - username
        - fullName (if available)
        - bio (if available)
        - location (if available)
        - company (if available)
        - repositories (number of public repositories)
        - followers (count)
        - joinDate (when they joined GitHub)
        - topLanguages (most used programming languages, if visible)
        - avatarUrl (profile image URL)
      `;
      
      const githubResult = await model.generateContent(githubPrompt);
      const githubResponse = await githubResult.response;
      const githubText = githubResponse.text();
      
      // Extract JSON from the response text
      try {
        // Find JSON in the response - it might be wrapped in a code block
        const jsonMatch = githubText.match(/```json\n([\s\S]*?)\n```/) || 
                          githubText.match(/```\n([\s\S]*?)\n```/) || 
                          githubText.match(/{[\s\S]*?}/);
                          
        const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : githubText;
        profileData.github = JSON.parse(jsonString.replace(/```/g, '').trim());
      } catch (jsonError) {
        console.error('Error parsing GitHub profile JSON:', jsonError);
        profileData.github = { rawResponse: githubText };
      }
    }

    console.log("fetching linkedin profile");
    // Process LinkedIn profile if available
    if (user.linkedinProfile) {
      console.log(`Fetching LinkedIn data for profile: ${user.linkedinProfile}`);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const linkedinPrompt = `
        Extract professional information from this LinkedIn profile: ${user.linkedinProfile}
        Return the data in JSON format with these fields:
        - username
        - fullName
        - headline (professional title/headline)
        - currentPosition (current job title and company)
        - location
        - industry
        - education (list of schools and degrees)
        - experience (list of past positions, companies, and durations)
        - skills (list of highlighted skills)
        - certifications (if available)
        - languages (spoken languages if available)
        - contactInfo (any public contact information)
        - profileImageUrl (if available)
      `;
      
      const linkedinResult = await model.generateContent(linkedinPrompt);
      const linkedinResponse = await linkedinResult.response;
      const linkedinText = linkedinResponse.text();
      
      // Extract JSON from the response text
      try {
        // Find JSON in the response - it might be wrapped in a code block
        const jsonMatch = linkedinText.match(/```json\n([\s\S]*?)\n```/) || 
                          linkedinText.match(/```\n([\s\S]*?)\n```/) || 
                          linkedinText.match(/{[\s\S]*?}/);
                          
        const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : linkedinText;
        profileData.linkedin = JSON.parse(jsonString.replace(/```/g, '').trim());
      } catch (jsonError) {
        console.error('Error parsing LinkedIn profile JSON:', jsonError);
        profileData.linkedin = { rawResponse: linkedinText };
      }
    }

    console.log("profile data", profileData);
    res.json({
      success: true,
      user: profileData
    });
    
  } catch (error) {
    console.error('Error fetching profile data:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile data', 
      error: error.message 
    });
  }
});

const PORT = 3000; // Hardcoded port to avoid conflicts
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));