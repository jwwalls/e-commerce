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
      console.log(data);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setToken(data.token);
        setUsername('');
        setPassword('');
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
      } else {
        console.error('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="User">
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default User;
