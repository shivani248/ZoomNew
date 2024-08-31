import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert ,Button} from 'react-bootstrap';
import Layout from '../components/Layout/Layout';

const Dashboard = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                let token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:1580/api/meetings', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setMeetings(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchMeetings();
    }, []);

    
    const handleDelete = async (meetingId) => {
        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };
    
            await axios.delete(`http://localhost:1580/api/meetings/${meetingId}`, config);
            // Optionally update the UI or redirect the user
            console.log('Meeting deleted successfully');
        } catch (error) {
            console.error('Error deleting meeting:', error.response.data);
        }
    };
    

    return (
        <Layout>
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Scheduled Meetings</h2>
                <Button
                    variant="primary"
                    onClick={() => window.location.href = '/create'}
                >
                    Create Meeting
                </Button>
            </div>
            
            {meetings.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    No scheduled meetings found.
                </Alert>
            ) : (
                <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration (minutes)</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {meetings.map((meeting) => (
                <tr key={meeting._id}>
                    <td>{meeting.title}</td>
                    <td>{new Date(meeting.date).toLocaleString()}</td>
                    <td>{meeting.duration}</td>
                    <td>
                        <Button 
                            variant="primary" 
                            onClick={() => window.location.href = '/edit'}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={() => handleDelete(meeting._id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
            )}
        </Container>
        </Layout>
    );
};

export default Dashboard;
