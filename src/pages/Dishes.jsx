// pages/Dishes.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialDishes, categories } from '../data';

export default function Dishes() {
  const [filter, setFilter] = useState('Усі');
  const filtered = filter === 'Усі' ? initialDishes : initialDishes.filter(d => d.category === filter);

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
          <li key={dish.id} className="bg-white rounded shadow hover:shadow-lg transition p-4 border border-orange-100">
            <Link to={`/dishes/${dish.id}`} className="text-xl font-semibold text-orange-800 hover:underline">{dish.name}</Link>
            <p className="text-sm text-gray-500 mt-1">Категорія: {dish.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}