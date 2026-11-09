
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError('');
      setMeal(null);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!res.ok) {
          throw new Error('Failed to load recipe');
        }

        const data = await res.json();

        if (!data.meals) {
          setError('Recipe not found.');
        } else {
          setMeal(data.meals[0]);

          const existing = JSON.parse(
            localStorage.getItem('savedMeals') || '[]'
          );

          setSaved(
            existing.some((m) => m.idMeal === data.meals[0].idMeal)
          );
        }

      } catch (err) {
        setError('Unable to load recipe. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const saveMeal = () => {
    const existing = JSON.parse(
      localStorage.getItem('savedMeals') || '[]'
    );

    if (!existing.some((m) => m.idMeal === meal.idMeal)) {
      localStorage.setItem(
        'savedMeals',
        JSON.stringify([...existing, meal])
      );

      setSaved(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  if (!meal) return null;

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]?.trim()) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`] || ''}`
      );
    }
  }

  return (
    <div className="container py-4">

      <Link to="/" className="btn btn-secondary mb-3">
        &larr; Back to Search
      </Link>

      <div className="row g-4">

        <div className="col-md-5">

          <img
            src={meal.strMealThumb}
            className="img-fluid rounded shadow"
            alt={meal.strMeal}
          />

          <button
            onClick={saveMeal}
            disabled={saved}
            className={`btn w-100 mt-3 ${
              saved ? 'btn-success' : 'btn-outline-success'
            }`}
          >
            {saved ? 'Saved to Planner! ✔' : 'Save to Meal Planner'}
          </button>

        </div>

        <div className="col-md-7">

          <h2>{meal.strMeal}</h2>

          <p className="text-muted">
            <strong>Category:</strong> {meal.strCategory} |
            <strong> Cuisine:</strong> {meal.strArea}
          </p>

          <h4 className="mt-4">Ingredients</h4>

          <ul className="list-group mb-4">
            {ingredients.map((item, idx) => (
              <li key={idx} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>

          <h4>Instructions</h4>

          <p style={{ whiteSpace: 'pre-line' }}>
            {meal.strInstructions}
          </p>

        </div>
      </div>
    </div>
  );
}
