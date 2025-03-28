const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  githubProfile: {
    type: String,
    validate: {
      validator: async function(url) {
        if (!url) return true; // Allow empty values
        if (!url.includes('github.com')) return false;
        try {
          const response = await fetch(`https://api.github.com/users/${url.split('/').pop()}`);
          return response.status === 200;
        } catch (error) {
          return false;
        }
      },
      message: 'Invalid GitHub profile URL'
    }
  },
  linkedinProfile: {
    type: String,
    validate: {
      validator: function(url) {
        if (!url) return true; // Allow empty values
        return url.includes('linkedin.com/in/');
      },
      message: 'Invalid LinkedIn profile URL'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('thinktank', UserSchema); 