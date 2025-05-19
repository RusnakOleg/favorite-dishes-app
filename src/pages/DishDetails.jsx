// pages/DishDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DishDetails() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const found = dishes.find(d => d.id === parseInt(id));
    setDish(found);
  }, [id]);

  if (!dish) return <p className="p-4">Страву не знайдено.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-200 to-orange-100 p-6 text-center">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-orange-300">{dish.name}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Категорія: {dish.category}</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">🍴 Інгредієнти</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{dish.ingredients}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">📋 Опис</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{dish.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">⭐ Рейтинг</h3>
            <p className="text-yellow-400 text-xl">{"★".repeat(dish.rating || 0)}<span className="text-gray-400">{"★".repeat(5 - (dish.rating || 0))}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}