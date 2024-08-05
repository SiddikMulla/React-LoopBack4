import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [task, setTask] = useState({
    title: '',
    descr: ''
  });
  const [tasks, setTasks] = useState([]);

  const url = 'http://127.0.0.1:3000';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/tasks`, task);

      setTasks([...tasks, response.data]);
      setTask({ title: '', descr: '' });

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${url}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className='mx-auto d-flex flex-column justify-content-center align-items-center mt-5'>
        <h2 className='mt-5'>Add New Task</h2>
        <Form onSubmit={handleSubmit} className='w-100 mb-5 d-flex flex-column justify-content-center align-items-center mt-1'>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className='mb-3'
            />
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Description"
              name="descr"
              value={task.descr}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className='mt-3' type="submit" variant='success' size='sm'>Submit</Button>
        </Form>
        <h1>Tasks</h1>
        <ListGroup className='w-50'>
          {tasks.map((task) => (
            <ListGroup.Item key={task.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.descr}</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

      </Container>
    </>
  );
};

export default App;
