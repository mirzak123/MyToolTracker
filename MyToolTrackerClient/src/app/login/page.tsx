'use client'; 

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import LoginLayout from '@/app/login-layout'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

   
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    
    const response = await fetch('http://localhost:5216/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);   
        console.log("logged in")
      router.push('/'); 
    } else {
      const result = await response.json();
      setError(result.message);
    }
  };

  return (
    <LoginLayout>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#ffa500' }}>
            Register here
          </a>
        </p>
        <style jsx>{`
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 1rem;
            background: #000;
            color: #ffa500;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          div {
            margin-bottom: 1rem;
          }
          label {
            display: block;
          }
          input {
            width: 100%;
            padding: 0.5rem;
          }
          button {
            width: 100%;
            padding: 0.5rem;
            background-color: #000;
            color: white;
            border: none;
            border-radius: 4px;
            transition: background-color 0.5s ease-in-out;
          }
          button:hover {
            background-color: #ffa500;
            color: #000;
          }
          p {
            text-align: center;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    </LoginLayout>
  );
};

export default Login;