import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert ,Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const EditMeeting = () => {
    const [meeting, setMeeting] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming the meeting ID is passed as a URL parameter

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const res = await axios.get(`http://localhost:1580/api/meetings/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setMeeting(res.data);
                setTitle(res.data.title);
                setDate(new Date(res.data.date).toISOString().split('T')[0]);
                setDuration(res.data.duration);
            } catch (err) {
                setError('Failed to load meeting details');
                console.error(err.message);
            }
        };
        fetchMeeting();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedMeeting = {
                title,
                date,
                duration
            };
            await axios.put(`http://localhost:1580/api/meetings/${id}`, updatedMeeting, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            // Update meeting on Zoom API
            // Example URL, you'll need to replace with actual Zoom API endpoint
            await axios.put(`https://api.zoom.us/v2/meetings/${id}`, updatedMeeting, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('zoomToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/dashboard'); // Redirect after successful update
        } catch (err) {
            setError('Failed to update meeting');
            console.error(err.message);
        }
    };

    return (
        <Layout>
           <Container className="mt-4">
    <h2 className="text-center mb-4">Edit Meeting</h2>
    {error && <Alert variant="danger" className="text-center mb-4">{error}</Alert>}
    <Card style={{ padding: '2rem', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDate" className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDuration" className="mb-4">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
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
                    Save Changes
                </Button>
            </div>
                
            </Form>
        </Card.Body>
    </Card>
</Container>

        </Layout>
    );
};

export default EditMeeting;
