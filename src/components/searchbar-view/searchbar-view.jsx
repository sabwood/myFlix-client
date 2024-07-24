import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const SearchBar = ({ user, movies }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    'Comedy',
    'Animated',
    'Adventure',
    'Thriller'
  ];

  const handleGenreChange = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newSelectedGenres);
    filterMovies(newSelectedGenres);
  };

  const filterMovies = (genres) => {
    const filtered = movies.filter((movie) => {
      const matchesGenre = genres.length === 0 || genres.includes(movie.Genre.Name);
      return matchesGenre;
    });
    setFilteredMovies(filtered);
  };

  return (
    <Row>
      <Row>
        <Row>
          <p>Search by Genre: </p>
        </Row>
        {genres.map((genre) => (
          <Row key={genre}>
            <label>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          </Row>
        ))}
      </Row>
      <div className="d-flex flex-wrap">
        {filteredMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              isFavorite={user.FavoriteMovies.includes(movie.id)}
            />
          </Col>
        ))}
      </div>
    </Row>
  );
};

export default SearchBar;