import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateMeeting = () => {
    const [meetingData, setMeetingData] = useState({
        title: '',
        date: '',
        duration: ''
    });

    const { title, date, duration } = meetingData;
    const navigate = useNavigate()
    const onChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log("Retrieved Token:", token);
    if (!token) {
        console.error("Token is missing or invalid");
        return;
    }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            const body = JSON.stringify({ title, date, duration ,token });
            const res = await axios.post('http://localhost:1580/api/meetings', body, config);
            console.log('Meeting Created:', res.data);
            // Optionally redirect to the dashboard or clear the form
        } catch (err) {
            console.error(err.response);
        }
    };
    

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card style={{ width: '30rem', padding: '2rem', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Schedule a New Meeting</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formMeetingTitle" className="mb-3">
                            <Form.Label>Meeting Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter meeting title"
                                name="title"
                                value={title}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMeetingDate" className="mb-3">
                            <Form.Label>Date & Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="date"
                                value={date}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMeetingDuration" className="mb-4">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter meeting duration"
                                name="duration"
                                value={duration}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex">
                <Button
                    variant="secondary"
                    onClick={() => navigate('/')}
                    className="flex-fill me-2 text-center"
                    style={{ minWidth: '120px' }}
                >
                    Back
                </Button>
                <Button
                    variant="success"
                    type="submit"
                    className="flex-fill ms-2 text-center"
                    style={{ minWidth: '120px' }}
                >
                    Create Meeting
                </Button>
            </div>


                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CreateMeeting;
