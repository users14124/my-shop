import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name && email && password) {
      dispatch(login({ name, email, password }));
      navigate('/');
    } else {
      alert('Будь ласка, заповніть усі поля');
    }
  };

  return (
    <div>
      <h2>Увійти</h2>
      <input
        type="text"
        placeholder="Ім'я користувача"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>
    </div>
  );
};

export default Login;
