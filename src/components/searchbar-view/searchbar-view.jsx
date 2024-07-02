import React from "react";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

export const SearchBar = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://wood-movies-flix-0f8372d87a02.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Birth: movie.Director.Birth,
              Bio: movie.Director.Bio
            }
          };
        });

        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

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
      <Row className="d-flex flex-wrap">
        {filteredMovies.map((movie) => (
          <Row className="mb-4 mt-4" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              isFavorite={user.FavoriteMovies.includes(movie.id)}
            />
          </Row>
        ))}
      </Row>
    </Row>
  );
};

export default SearchBar;