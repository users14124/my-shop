import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeItem, clearCart, CartItem } from '../store/cartSlice';

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    alert('Оплата в розробці. Скоро буде підтримка NFC!');
  };

  return (
    <div>
      <h2>Кошик</h2>
      {items.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <ul>
            {items.map((item: CartItem) => (
              <li key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <strong>{item.name}</strong> — {item.price} грн × {item.quantity}
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>
            Загальна вартість: {totalPrice.toLocaleString('uk-UA')} грн
          </div>

          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button onClick={() => dispatch(clearCart())}>
              Очистити кошик
            </button>
            <button onClick={handlePayment} style={{ marginLeft: 'auto' }}>
              Оплатити
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
