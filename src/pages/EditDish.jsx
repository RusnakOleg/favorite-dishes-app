// pages/EditDish.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data';

export default function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const dish = dishes.find(d => d.id === Number(id));
    if (dish) {
      setForm(dish);
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const updated = dishes.map(d => d.id === Number(id) ? form : d);
    localStorage.setItem('dishes', JSON.stringify(updated));
    alert('Страву оновлено!');
    navigate('/dishes');
  };

  if (!form) return <p className="p-4">Завантаження...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-orange-700">✏️ Редагувати страву</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Назва"
        className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      >
        <option value="">Оберіть категорію</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        placeholder="Інгредієнти"
        className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Опис"
        className="border border-orange-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Зберегти</button>
    </form>
  );
}