import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MealPlanner() {
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    const meals = JSON.parse(localStorage.getItem('savedMeals') || '[]');
    setSavedMeals(meals);
  }, []);

  const removeMeal = (id) => {
    const updated = savedMeals.filter((m) => m.idMeal !== id);
    setSavedMeals(updated);
    localStorage.setItem('savedMeals', JSON.stringify(updated));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Saved Meal Planner</h2>
      {savedMeals.length === 0 ? (
        <div className="alert alert-info">
          No saved recipes yet. Explore recipes on the home page and save them here!
        </div>
      ) : (
        <div className="row g-4">
          {savedMeals.map((meal) => (
            <div className="col-md-4" key={meal.idMeal}>
              <div className="card h-100 shadow-sm">
                <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                <div className="card-body d-flex flex-column">
                  <h5>{meal.strMeal}</h5>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link to={`/recipe/${meal.idMeal}`} className="btn btn-sm btn-primary">View</Link>
                    <button onClick={() => removeMeal(meal.idMeal)} className="btn btn-sm btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}