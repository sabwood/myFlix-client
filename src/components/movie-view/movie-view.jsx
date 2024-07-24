import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Row className="movie-view">
      <Card>
        <Card.Body>
          <Card.Title><h3>{movie.Title}: </h3></Card.Title>
          <Row>
            <Row>
              <Col>Description: </Col>
              <Col>{movie.Description}</Col>
            </Row>
            <Row>
              <Col>Genre: </Col>
              <Col>{movie.Genre.Name}</Col>
            </Row>
            <Row>
              <Col>Director: </Col>
              <Col>{movie.Director.Name}</Col>
            </Row>
          </Row>
        </Card.Body>
      </Card>
      <Link to={"/"}>
        <button
          className="back-button"
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </Link>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
};