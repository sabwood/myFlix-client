import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Row>
      <Col>
        <h4>My Favorite Movies: </h4>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie.id} md={6}>
            <Link to={`/users/${user.Username}/movies/${movie.id}`} />
            <MovieCard
              movie={movie}
              isFavorite={user.FavoriteMovies.includes(movie.title)}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
}