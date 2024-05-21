import { Link } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { useState } from "react";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ movies, user, token, onSubmit }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [Username, setUsername] = useState(storedUser.Username);
  const [Password] = useState(storedUser.Password);
  const [Email, setEmail] = useState(storedUser.Email);
  const [Birthday, setBirthday] = useState(storedUser.Birthday);

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.Title));

  const formData = {
    Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday
  }

  const handleSubmit = (event) => {
    event.preventDefault(event);
    fetch(`https://wood-movies-flix-0f8372d87a02.herokuapp.com/users/${storedUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
        return response.json();
      } else {
        alert("Update failed");
        console.log(response)
      }
    })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        onSubmit(data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value);
      default:
    }
  }

  const handleDeregister = () => {
    fetch(`https://wood-movies-flix-0f8372d87a02.herokuapp.com/users/${storedUser.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Account deleted successfully!");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong!");
      }
    });
  };

  console.log(favoriteMovies);

  return (
    <Row>
      <Card>
        <Card.Body>
          <Card.Title><h3>My Profile: </h3></Card.Title>
          <Row>
            <Row>
              <Col>Username: </Col>
              <Col>{user.Username}</Col>
            </Row>
            <Row>
              <Col>Email: </Col>
              <Col>{user.Email}</Col>
            </Row>
            <Row>
              <Col>Birthday: </Col>
              <Col>{user.Birthday}</Col>
            </Row>
            <Row>
              <FavoriteMovies
                user={user}
                favoriteMovies={favoriteMovies}
              />
            </Row>
          </Row>
        </Card.Body>
      </Card>
      <Col>
        <UpdateUser
          formData={formData}
          handleUpdate={handleUpdate}
          handleSubmit={handleSubmit}
        />
      </Col>
      <Button
        onClick={() => handleDeregister()}
        variant="outline-secondary">
        Deregister Account
      </Button>
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
    </Row>
  );
};