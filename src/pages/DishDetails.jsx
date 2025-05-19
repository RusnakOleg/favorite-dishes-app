// pages/DishDetails.jsx
import { useParams } from 'react-router-dom';
import { initialDishes } from '../data';

export default function DishDetails() {
  const { id } = useParams();
  const dish = initialDishes.find(d => d.id === parseInt(id));

  if (!dish) return <p className="p-4 text-red-500">Страву не знайдено.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-700 mb-4">{dish.name}</h2>
      <div className="bg-orange-50 p-4 rounded shadow">
        <p><span className="font-semibold">Категорія:</span> {dish.category}</p>
        <p><span className="font-semibold">Інгредієнти:</span> {dish.ingredients}</p>
        <p><span className="font-semibold">Опис:</span> {dish.description}</p>
      </div>
    </div>
  );
}