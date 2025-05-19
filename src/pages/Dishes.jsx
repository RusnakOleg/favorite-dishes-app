// pages/Dishes.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data';
import { motion } from 'framer-motion';

export default function Dishes() {
  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('dishes');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('Усі');

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const handleDelete = (id) => {
    if (window.confirm('Ви дійсно хочете видалити цю страву?')) {
      const updated = dishes.filter(d => d.id !== id);
      setDishes(updated);
    }
  };

  const filtered = filter === 'Усі' ? dishes : dishes.filter(d => d.category === filter);

  useEffect(() => {
    if (!localStorage.getItem('dishes')) {
      const initial = [
        { id: 1, name: 'Омлет з сиром', category: 'Сніданок', ingredients: 'Яйця, сир, сіль', description: 'Смачний білковий сніданок' },
        { id: 2, name: 'Борщ', category: 'Обід', ingredients: 'Буряк, капуста, м`ясо', description: 'Традиційна українська страва' },
        { id: 3, name: 'Наполеон', category: 'Десерт', ingredients: 'Тісто, крем', description: 'Солодкий листковий торт' },
      ];
      setDishes(initial);
      localStorage.setItem('dishes', JSON.stringify(initial));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">🍲 Список страв</h2>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">Фільтрувати за категорією:</label>
        <select onChange={e => setFilter(e.target.value)} className="border border-orange-300 p-2 rounded w-60 focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Усі</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(dish => (
          <motion.li
            key={dish.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded shadow hover:shadow-lg transition p-4 border border-orange-100 relative"
          >
            <Link to={`/dishes/${dish.id}`} className="text-xl font-semibold text-orange-800 hover:underline block mb-2">{dish.name}</Link>
            <p className="text-sm text-gray-500 mb-3">Категорія: {dish.category}</p>
            <button onClick={() => handleDelete(dish.id)} className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700">Видалити ✖</button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}