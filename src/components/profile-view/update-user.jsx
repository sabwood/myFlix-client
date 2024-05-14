import React from 'react';
import Form from "react-bootstrap/Form";
import { Row, Button } from "react-bootstrap";

export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <h2>Update Profile Information</h2>

        <Form.Group controlId="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={formData.username}
            onChange={(e) => handleUpdate(e)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={formData.birthday}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Changes
        </Button>
      </Form>
    </Row>
  )
}