import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addMovie, setAddMovie] = useState("");
  const [delMovie, setDelMovie] = useState("");

  useEffect(() => {
    const addToFavorites = () => {
      fetch(`https://wood-movies-flix-0f8372d87a02.herokuapp.com/users/${storedUser.Username}/movies/${encodeURIComponent(movie.id)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Movie added to favorites!");
            console.log(response);
            return response.json();
          } else {
            alert("Failed to add movie to favorites.")
          }
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const removeFromFavorites = () => {
      fetch(`https://wood-movies-flix-0f8372d87a02.herokuapp.com/users/${storedUser.Username}/movies/${encodeURIComponent(movie._id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Movie removed from favorites!");
            window.location.reload();
            return response.json();
          } else {
            alert("Failed to remove movie from favorites.");
          }
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (addMovie) {
      addToFavorites();
    };

    if (delMovie) {
      removeFromFavorites();
    }
  }, [addMovie, delMovie, token]);

  const handleAddToFavorites = () => {
    setAddMovie(movie.Title);
  };

  const handleRemoveFromFavorites = () => {
    setDelMovie(movie.Title);
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Col>
          {isFavorite ? (
            <Button variant="primary" onClick={handleRemoveFromFavorites}>Remove from favorites</Button>
          ) : (
            <Button variant="primary" onClick={handleAddToFavorites}>Add to favorites</Button>
          )}
        </Col>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    })
  }).isRequired,
};