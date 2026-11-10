
 // Web Programming 1 - Final Project
// Author: Sami

import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';
import MealPlanner from './components/MealPlanner';

export default function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/planner" element={<MealPlanner />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
