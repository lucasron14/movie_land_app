import React, { useState, useEffect } from "react";
import MovieCard from "./movieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=fb37c318";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('resident-evil');
  }, []);

  return (
    <div className="app">
      <h1>Byser Movies</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <img onClick={() => { searchMovies(searchTerm)}} src={SearchIcon} alt="Search" />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
        </div>
      ) : (
        <div className="empty">
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
