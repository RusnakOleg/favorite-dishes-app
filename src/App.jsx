// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dishes from './pages/Dishes';
import DishDetails from './pages/DishDetails';
import AddDish from './pages/AddDish';

export default function App() {
  return (
    <Router>
      <header className="bg-orange-100 shadow sticky top-0 z-10">
        <nav className="p-4 flex gap-6 justify-center text-lg font-semibold text-orange-900">
          <Link to="/" className="hover:underline">Головна</Link>
          <Link to="/dishes" className="hover:underline">Страви</Link>
          <Link to="/add" className="hover:underline">Додати страву</Link>
        </nav>
      </header>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes/:id" element={<DishDetails />} />
          <Route path="/add" element={<AddDish />} />
        </Routes>
      </main>
    </Router>
  );
}