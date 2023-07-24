import { useEffect, useState } from "react";
import { crudStore } from "../store/crudStore";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function Todos() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //base
  const todos = crudStore((state) => state.todos);
  //getApi
  const getMyData = crudStore((state) => state.getMyData);
  //createData
  const createDataAPI = crudStore((state) => state.createDataAPI);
  //deleteApi
  const deleteMyApi = crudStore((state) => state.deleteMyApi);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() == "" && body.trim() == "") return;
    createDataAPI(title, body);
    setTitle("");
    setBody("");
  };

  useEffect(() => {
    getMyData();
  }, []);
  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Add Text Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="add title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Text Body</Form.Label>
              <Form.Control
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="add body"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {todos.map((todo) => {
        return (
          <Card key={todo.id} style={{ width: "18rem", marginTop: "12px" }}>
            <Card.Body>
              <Card.Text>{todo.text}</Card.Text>
              <Card.Text>{todo.body}</Card.Text>
              <Button onClick={() => deleteMyApi(todo.id)}>delete</Button>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}

export default Todos;
