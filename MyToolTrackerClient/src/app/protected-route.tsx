'use client';

import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    console.log('Checking authentication...');
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found, redirecting to login page...');
        window.location.href = '/login'; 
        return;
      }

      try {
        const response = await fetch('http://localhost:5216/api/account/checkauth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('Authentication check failed, redirecting to login page...');
          
          window.location.href = '/login';
        } else {
          console.log('Authentication successful.');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        console.log('Error checking authentication, redirecting to login page...');
        
        window.location.href = '/login';
      }
    };

    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
