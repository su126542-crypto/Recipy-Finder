
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('chicken');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMeals = async (searchTerm) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
      );

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await res.json();

      setMeals(data.meals || []);

    } catch (err) {
      setMeals([]);
      setError('Unable to load recipes. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals(query);
  };

  return (
    <div className="container py-4">

      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          Discover Delicious Recipes
        </h1>

        <p className="text-muted">
          Search through hundreds of meals powered by TheMealDB API
        </p>

        <form
          onSubmit={handleSearch}
          className="d-flex justify-content-center gap-2 mt-3"
        >
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search meals (e.g. pasta, soup, cake)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading recipes...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {!loading && !error && meals.length === 0 && (
        <div className="alert alert-info text-center">
          No recipes found. Try another search!
        </div>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="row g-4">

          {meals.map((meal) => (
            <div className="col-md-4" key={meal.idMeal}>

              <div className="card h-100 shadow-sm border-0">

                <img
                  src={meal.strMealThumb}
                  className="card-img-top"
                  alt={meal.strMeal}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">
                    {meal.strMeal}
                  </h5>

                  <p className="card-text text-muted small">
                    {meal.strCategory} • {meal.strArea}
                  </p>

                  <Link
                    to={`/recipe/${meal.idMeal}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Recipe
                  </Link>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
