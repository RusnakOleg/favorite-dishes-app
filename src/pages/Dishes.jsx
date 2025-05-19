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
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const handleDelete = (id) => {
    if (window.confirm('Ви дійсно хочете видалити цю страву?')) {
      const updated = dishes.filter(d => d.id !== id);
      setDishes(updated);
    }
  };

  const handleRating = (id, value) => {
    const updated = dishes.map(d =>
      d.id === id ? { ...d, rating: value } : d
    );
    setDishes(updated);
  };

  const filtered = dishes
    .filter(d => {
      const matchCategory = filter === 'Усі' || d.category === filter;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      const ra = a.rating || 0;
      const rb = b.rating || 0;
      return sort === 'asc' ? ra - rb : rb - ra;
    });

  useEffect(() => {
    if (!localStorage.getItem('dishes')) {
      const initial = [
        { id: 1, name: 'Омлет з сиром', category: 'Сніданок', ingredients: 'Яйця, сир, сіль', description: 'Смачний білковий сніданок', rating: 4 },
        { id: 2, name: 'Борщ', category: 'Обід', ingredients: 'Буряк, капуста, м\'ясо', description: 'Традиційна українська страва', rating: 5 },
        { id: 3, name: 'Наполеон', category: 'Десерт', ingredients: 'Тісто, крем', description: 'Солодкий листковий торт', rating: 3 },
      ];
      setDishes(initial);
      localStorage.setItem('dishes', JSON.stringify(initial));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">🍲 Список страв</h2>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Фільтр за категорією:</label>
          <select
            onChange={e => setFilter(e.target.value)}
            className="border border-orange-300 p-2 rounded w-60 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option>Усі</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-gray-700 font-medium">Пошук за назвою:</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Наприклад, борщ"
            className="border border-orange-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Сортування за рейтингом:</label>
          <select
            onChange={e => setSort(e.target.value)}
            className="border border-orange-300 p-2 rounded w-52 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="desc">Від вищого до нижчого</option>
            <option value="asc">Від нижчого до вищого</option>
          </select>
        </div>
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
            className="bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition p-4 border border-orange-100 relative"
          >
            <Link to={`/dishes/${dish.id}`} className="text-xl font-semibold text-orange-800 dark:text-orange-300 hover:underline block mb-2">
              {dish.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Категорія: {dish.category}</p>
            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => handleRating(dish.id, n)}
                  className={
                    (dish.rating || 0) >= n
                      ? 'text-yellow-400' : 'text-gray-300'
                  }
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={() => handleDelete(dish.id)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
            >
              Видалити ✖
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}