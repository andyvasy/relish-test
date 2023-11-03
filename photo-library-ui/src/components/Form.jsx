import React, { useState } from "react";
import { fetchData } from "../services/api";
import Results from "./Results";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function QueryForm() {
  const [results, setResults] = useState([]);
  const [values, setValues] = useState({
    imageId: "",
    imageTitle: "",
    albumTitle: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchData(values);
    console.log(response);
    setResults(response);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="imageId">
          <Form.Label>Image ID</Form.Label>
          <Form.Control
            type="number"
            value={values.imageId}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="imageTitle">
          <Form.Label>Image Title</Form.Label>
          <Form.Control
            type="text"
            value={values.imageTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="albumTitle">
          <Form.Label>Album Title</Form.Label>
          <Form.Control
            type="text"
            value={values.albumTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="offset">
          <Form.Label>Offset</Form.Label>
          <Form.Control
            type="number"
            value={values.offset}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="limit">
          <Form.Label>Limit</Form.Label>
          <Form.Control
            type="number"
            value={values.limit}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Query</Button>
      </Form>
      <hr />
      {results && <Results images={results} />}
    </>
  );
}

export default QueryForm;
