import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../api/users';
import '../css/Users.css';

function User({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      const data = await createUser(username, password);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setToken(data.token);
        setUsername('');
        setPassword('');
        alert("Register Success!");
      } else {
        console.error('Failed to create user');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const login = async () => {
    try {
      const data = await loginUser(username, password);
  
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setToken(data.token);
        setUsername('');
        setPassword('');
        navigate('/myRoutines');
        alert("Login Success! Welcome to SHOENSTAR!");
      } else {
        console.error('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div className="User">
  <div className="card">
    <h1>Sign in</h1>
    <div className="input-group">
      <label htmlFor="username">Username</label>
      <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button onClick={register}>Register</button>
    <button onClick={login}>Login</button>
  </div>
</div>
  );
};

export default User;
