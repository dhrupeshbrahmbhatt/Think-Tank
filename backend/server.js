const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetch = require('node-fetch');
const OpenAI = require('openai');
const axios = require('axios');

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

// Updated profile route to use OpenAI API
app.get('/profile', auth, async (req, res) => {
  try {
    const user = req.user;
    let profileData = {
      email: user.email,
      github: null,
      linkedin: null
    };

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: "sk-e08ba6183f3545d1b30e85d27705d8c9sk-or-v1-83e9bad2531a64ae5fbacc36b335ea228f2fa165c9ca93b0d23eebc24dba9132",
    });

    console.log("fetching linkedin profile");
    // Process LinkedIn profile if available
    if (user.linkedinProfile) {
      console.log(`Fetching LinkedIn data for profile: ${user.linkedinProfile}`);
      
      try {
        // Create prompt for AI to extract and format LinkedIn profile data
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
        
        // Call OpenRouter API to access DeepSeek
        const linkedinResponse = await openai.chat.completions.create({
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: "You are a helpful assistant that extracts structured information from LinkedIn profiles and returns valid JSON." },
            { role: "user", content: linkedinPrompt }
          ]
        });
        console.log("linkedinResponse", linkedinResponse.choices[0].message);
        if (!linkedinResponse.ok) {
          const errorData = await linkedinResponse.json();
          throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
        }
        
        const linkedinData = await linkedinResponse.json();
        const linkedinText = linkedinData.choices[0].message.content;
        
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
      } catch (linkedinError) {
        console.error('Error fetching LinkedIn profile:', linkedinError);
        profileData.linkedin = { error: linkedinError.message };
      }
    }

    // Process GitHub profile if available
    console.log("fetching github profile");
    if (user.githubProfile) {
      console.log(`Fetching GitHub data for profile: ${user.githubProfile}`);
      
      try {
        // First fetch basic data from GitHub API
        const githubUsername = user.githubProfile.split('/').pop();
        
        // Fetch data from GitHub API
        const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        
        if (!githubResponse.ok) {
          throw new Error(`GitHub API responded with status: ${githubResponse.status}`);
        }
        
        const githubData = await githubResponse.json();
        
        // Then enhance with DeepSeek AI via OpenRouter for additional insights
        const githubPrompt = `
          Analyze this GitHub profile data and provide additional insights:
          ${JSON.stringify(githubData)}
          
          Also, check the profile at ${user.githubProfile}
          
          Return a comprehensive JSON with:
          - All the original API data
          - Inferred programming expertise based on repositories
          - Estimated experience level
          - Activity patterns (if discernible)
          - Notable achievements (if any)
          - Any other professional insights
        `;
        
        const aiResponse = await openai.chat.completions.create({
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: "You are a helpful assistant that analyzes GitHub profiles and provides professional insights. Return valid JSON." },
            { role: "user", content: githubPrompt }
          ]
        });
        console.log("aiResponse for github", aiResponse.choices[0].message);
        if (!aiResponse.ok) {
          const errorData = await aiResponse.json();
          throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
        }
        
        const aiData = await aiResponse.json();
        const enhancedText = aiData.choices[0].message.content;
        
        // Extract enhanced JSON
        try {
          const jsonMatch = enhancedText.match(/```json\n([\s\S]*?)\n```/) || 
                           enhancedText.match(/```\n([\s\S]*?)\n```/) || 
                           enhancedText.match(/{[\s\S]*?}/);
                           
          const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : enhancedText;
          const enhancedData = JSON.parse(jsonString.replace(/```/g, '').trim());
          
          // Merge API data with AI insights
          profileData.github = {
            // Basic API data
            username: githubData.login,
            fullName: githubData.name,
            bio: githubData.bio,
            location: githubData.location,
            company: githubData.company,
            repositories: githubData.public_repos,
            followers: githubData.followers,
            joinDate: githubData.created_at,
            avatarUrl: githubData.avatar_url,
            
            // Enhanced data from AI
            aiInsights: enhancedData
          };
        } catch (jsonError) {
          console.error('Error parsing enhanced GitHub JSON:', jsonError);
          // Fallback to just API data
          profileData.github = {
            username: githubData.login,
            fullName: githubData.name,
            bio: githubData.bio,
            location: githubData.location,
            company: githubData.company,
            repositories: githubData.public_repos,
            followers: githubData.followers,
            joinDate: githubData.created_at,
            avatarUrl: githubData.avatar_url,
            aiError: jsonError.message
          };
        }
      } catch (githubError) {
        console.error('Error fetching GitHub profile:', githubError);
        
        // If GitHub API fails, try full AI approach with DeepSeek via OpenRouter
        try {
          const fallbackPrompt = `
            Extract professional information from this GitHub profile: ${user.githubProfile}
            Return the data in JSON format with these fields:
            - username
            - fullName (if available)
            - bio (if available)
            - location (if available)
            - company (if available)
            - repositories (approximate number)
            - programming languages (commonly used)
            - expertise areas
            - activity level
          `;
          
          const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`,
              'HTTP-Referer': 'https://yourwebsite.com',
              'X-Title': 'GitHub Profile Analyzer (Fallback)'
            },
            body: JSON.stringify({
              model: 'deepseek/deepseek-chat',
              messages: [
                { role: "system", content: "You are a helpful assistant that extracts structured information from GitHub profiles and returns valid JSON." },
                { role: "user", content: fallbackPrompt }
              ],
              temperature: 0.3,
            })
          });
          
          if (!fallbackResponse.ok) {
            const errorData = await fallbackResponse.json();
            throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
          }
          
          const fallbackData = await fallbackResponse.json();
          const fallbackText = fallbackData.choices[0].message.content;
          
          const jsonMatch = fallbackText.match(/```json\n([\s\S]*?)\n```/) || 
                          fallbackText.match(/```\n([\s\S]*?)\n```/) || 
                          fallbackText.match(/{[\s\S]*?}/);
                          
          const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : fallbackText;
          profileData.github = JSON.parse(jsonString.replace(/```/g, '').trim());
          profileData.github.source = "ai_fallback";
        } catch (fallbackError) {
          profileData.github = { 
            error: githubError.message,
            fallbackError: fallbackError.message 
          };
        }
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