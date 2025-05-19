// pages/Home.jsx
import { useEffect, useState } from 'react';

const backgroundImages = [
  '/nachos.avif',
  '/salade.avif', 
  '/icecream.jpg',
  '/pelmeni.jpg',

];


export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-6 text-center min-h-[calc(100vh-4rem)] bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg inline-block shadow-xl">
        <h1 className="text-3xl font-bold text-orange-800 mb-4 flex justify-center items-center gap-2">
          🍽️ Улюблені страви
        </h1>
        <p className="text-gray-700 text-lg">
          Переглядайте, додавайте та фільтруйте свої улюблені страви у зручному додатку!
        </p>
      </div>
    </div>
  );
}
