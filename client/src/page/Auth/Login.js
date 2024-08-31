import React, { useState } from 'react';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { Container, Card, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:1580/api/v1/auth/login', formData);
      if (res && res.data) {
        console.log(res.data, "Response Data");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // Assuming the token is available in res.data.token
        const { token } = res.data;
        if (token) {
          // Store token in localStorage
          localStorage.setItem('token', token);
          // Optionally set token in axios defaults for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error:", error);
      navigate('/login');
    }

    console.log("login", formData);
  };

  return (
    <Layout title="Login with WatchNow">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', marginTop: '0', paddingTop: '0' }}
      >
        <div className="col-md-4">
          <Card className="p-4 rounded shadow-sm mx-auto">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
