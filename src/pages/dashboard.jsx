import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {

  useEffect(() => {
    // Get auth token from session storage
    const token = sessionStorage.getItem('token');
    
    // Configure headers with bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    // Make authenticated request
    axios.get('http://localhost:3000/profile', config).then((response) => {
      console.log(response.data);
      setProfile(response.data);
    }).catch((error) => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  

  return (
    <div>
      <h1>Dashboard</h1>
      {profile && (
        <div>
          <h2>Profile Information</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile fields as needed */}
        </div>
      )}
      {analysis && (
        <div>
          <h2>Analysis</h2>
          <p>{analysis.summary}</p>
          {/* Add more analysis details as needed */}
        </div>
      )}
    </div>
  );
};

