import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Cart from './components/Cart';
import About from './components/About';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
