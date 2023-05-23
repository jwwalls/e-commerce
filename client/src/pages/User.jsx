import React, { useState } from 'react';
import '../css/Users.css';

function User() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const res = await fetch('/api/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      console.log(data);

    } catch (err) {
      console.error(err);
    }
  };

  const login = async () => {
    try {
      const res = await fetch('/api/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      console.log(data);

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
      { }
    </div>
  );
};

export default User;