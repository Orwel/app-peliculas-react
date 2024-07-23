import React, { useState } from 'react';
import './MovieApp.css';
import './index.css';

const MovieApp = () => {
  const [search, setSearch] = useState('');
  const [movieList, setMoviesList] = useState([]);

  const urlBase = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = '58b6ac407be5c375bbfc77dbcfe06c86';

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`);
      const data = await response.json();
      console.log(data);
      setMoviesList(data.results); // Asumiendo que la API devuelve un objeto con una propiedad 'results' que es un array de películas
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Buscador de películas</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Escribe una peli'
          value={search}
          onChange={handleInputChange}
        />
        <button className='search-button'>Buscar</button>
      </form>
      {movieList &&
        <div className='movie-list'>
          {movieList.map(movie => (
            <div key={movie.id} className='movie-card'>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export { MovieApp };