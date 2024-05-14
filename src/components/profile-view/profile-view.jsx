import { Link } from "react-router-dom";
import { Row, Card, Col } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { useState } from "react";

export const ProfileView = ({ user, token }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [Username, setUsername] = useState(storedUser.Username);
  const [Password, setPassword] = useState(storedUser.Password);
  const [Email, setEmail] = useState(storedUser.Email);
  const [Birthday, setBirthday] = useState(storedUser.Birthday);

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
    }
    )
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          return response.json()
        } else {
          alert("Update failed");
        }
      })
      .then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)
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
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value);
      default:
    }
  }



  return (
    <Row>
      <Card>
        <Card.Body>
          <Card.Title>My Profile: </Card.Title>
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
              <Col>Favorite Movies: </Col>
              <Col>{user.FavoriteMovies}</Col>
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
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
    </Row>
  );
};