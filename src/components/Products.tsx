import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, CartItem } from '../store/cartSlice';
import axios from 'axios';

interface ProductAPI {
  id: number;
  title: string;
  price: number;
  description: string;
}

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductAPI[]>([]);

  // ✅ GET — отримання товарів із REST API
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Помилка GET:", err));
  }, []);

  // ✅ POST — додати товар до "кошика" (симуляція)
  const handleAddToCart = (product: ProductAPI) => {
    const item: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1
    };

    dispatch(addItem(item)); // додати в локальний Redux

    axios.post("https://fakestoreapi.com/carts", {
      userId: 1,
      date: new Date(),
      products: [{ productId: product.id, quantity: 1 }]
    })
      .then(() => alert("Товар додано до кошика (API)"))
      .catch(err => console.error("Помилка POST:", err));
  };

  // ✅ PUT — оновити перший товар (демо)
  const handleUpdateFirstProduct = () => {
    if (products.length === 0) return;

    const productId = products[0].id;

    axios.put(`https://fakestoreapi.com/products/${productId}`, {
      title: "ОНОВЛЕНО: " + products[0].title,
      price: products[0].price + 100,
      description: products[0].description,
    })
      .then(() => alert("Товар оновлено (PUT API)"))
      .catch(err => console.error("Помилка PUT:", err));
  };

  return (
    <div>
      <h2>Товари з API</h2>
      <button onClick={handleUpdateFirstProduct}>Оновити перший товар</button>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            {product.title} — {product.price} грн{' '}
            <button onClick={() => handleAddToCart(product)}>Додати до кошика</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
