import {React , useState} from 'react';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
const Register = () => {
 const [formData , setFormData] = useState({
  name:"",
  email:"",
  password:"",
  phone:"",
  address:"",
  answer:"",

 })
const navigate = useNavigate();
 const handleChange =(e)=>{
  setFormData({
    ...formData ,
    [e.target.name] : e.target.value
  })
 }
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:1580/api/v1/auth/register', formData);
    console.log(res, "ress");

    if (res.data.success) {
      toast.success("Registered Successfully!");
      navigate('/login');
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong! Please try again.");
  }
};
  return (
    <Layout title="Register to WatchNow">
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh', paddingTop: '2rem' }}
            >
                <div className="col-md-8">
                    <Card className="bg-light p-4 rounded shadow-lg mx-auto" style={{ maxWidth: '700px' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Registration Form</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
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

                                <Form.Group controlId="password" className="mb-3">
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

                                <Form.Group controlId="phone" className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="address" className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="address"
                                        name="address"
                                        placeholder="Enter your address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="answer" className="mb-4">
                                    <Form.Label>Your Favourite Sports!</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="answer"
                                        name="answer"
                                        placeholder="Tell us about your favorite sports"
                                        value={formData.answer}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </Layout>
  )
}

export default Register