import axios from 'axios';

export const createZoomMeeting = async (topic, startTime, duration, token) => {
    console.log(topic, startTime, duration, token , "test");
    const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8wDVrytxe7S3j2XP9BEMjGO_n_fVq2UIuePfsyfDQS0"
    const config = {
        headers: {
            'Authorization': `Bearer ${token1}`,
            'Content-Type': 'application/json',
            'Response-Type': 'code'
        },
    };
    const body = {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        timezone: "UTC",
    };
    try {
        const res = await axios.post('https://api.zoom.us/v2/users/me/meetings', body, config);
        return res.data;
    } catch (err) {
        console.error('Zoom API error:', err.message);
        throw new Error('Error creating Zoom meeting');
    }
};

export const deleteZoomMeeting = async (meetingId) => {
    try {
        const token = await getZoomAccessToken();
        const response = await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting Zoom meeting:', error.message);
        throw new Error('Failed to delete Zoom meeting');
    }
};
// export default {createZoomMeeting ,deleteZoomMeeting};
