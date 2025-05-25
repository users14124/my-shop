import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';  // шлях до твого store
import { logout } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1>Мій Магазин</h1>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Товари
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          Про магазин
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          Кошик
        </NavLink>

        {user ? (
          <>
            <span style={{ marginLeft: 'auto', marginRight: '10px' }}>
              {user.name}
            </span>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Вхід
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              Реєстрація
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
