import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "movieOne",
      image: "https://images.pexels.com/photos/20696165/pexels-photo-20696165/free-photo-of-a-surfer-walks-out-of-the-water-and-into-the-ocean.jpeg",
      description: "movieOne description",
      genre: "genreExampleOne",
      director: "movieOneDirector",
      directorBirthYear: "1999",
      directorDescription: "movieOneDirector description"
    },
    {
      id: 2,
      title: "movieTwo",
      image: "https://images.pexels.com/photos/20696165/pexels-photo-20696165/free-photo-of-a-surfer-walks-out-of-the-water-and-into-the-ocean.jpeg",
      description: "movieTwo description",
      genre: "genreExampleTwo",
      director: "movieTwoDirector",
      directorBirthYear: "1960",
      directorDescription: "movieTwoDirector description"
    },
    {
      id: 3,
      title: "movieThree",
      image: "https://images.pexels.com/photos/20696165/pexels-photo-20696165/free-photo-of-a-surfer-walks-out-of-the-water-and-into-the-ocean.jpeg",
      description: "movieThree description",
      genre: "genreExampleThree",
      director: "movieThreeDirector",
      directorBirthYear: "1970",
      directorDescription: "movieThreeDirector description"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};