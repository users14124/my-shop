import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';  // Ось тут

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (name && email && password) {
      dispatch(register({ name, email, password }));
      // Можна додати redirect після реєстрації
    } else {
      alert('Будь ласка, заповніть усі поля');
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      <input type="text" placeholder="Ім'я" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Зареєструватись</button>
    </div>
  );
};

export default Register;
