import React, { useState } from 'react';

// Компонент для отдельного товара (использует props)
function ShoppingItem({ item, onDelete }) {
  return (
    <div style={styles.itemRow}>
      <span>{item.name}</span>
      <span>{item.price} сом</span>
      <button onClick={() => onDelete(item.id)} style={styles.deleteButton}>
        Удалить
      </button>
    </div>
  );
}

// Главный компонент приложения (использует state)
export default function ShoppingApp() {
  const [items, setItems] = useState([
    { id: 1, name: 'Молоко', price: 85 },
    { id: 2, name: 'Хлеб', price: 35 },
    { id: 3, name: 'Сыр', price: 250 },
  ]);

  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  // Функция добавления товара
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !priceInput) return;

    const newItem = {
      id: Date.now(),
      name: nameInput,
      price: Number(priceInput),
    };

    setItems([...items, newItem]);
    setNameInput('');
    setPriceInput('');
  };

  // Функция удаления товара
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Вычисление общей стоимости
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      <h2>Список покупок</h2>

      {/* Форма добавления */}
      <form onSubmit={handleAddItem} style={styles.form}>
        <input
          type="text"
          placeholder="Название товара"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Цена"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Добавить</button>
      </form>

      {/* Список товаров */}
      <div style={styles.list}>
        {items.length === 0 ? (
          <p>Список пуст</p>
        ) : (
          items.map((item) => (
            <ShoppingItem key={item.id} item={item} onDelete={handleDeleteItem} />
          ))
        )}
      </div>

      {/* Общая стоимость */}
      <div style={styles.total}>
        <h3>Общая стоимость: {totalPrice} сом</h3>
      </div>
    </div>
  );
}

// Простые стили для наглядности
const styles = {
  container: { maxWidth: '400px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' },
  addButton: { padding: '8px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee' },
  deleteButton: { background: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
  total: { borderTop: '2px solid #eee', paddingTop: '10px', textAlign: 'right' }
};