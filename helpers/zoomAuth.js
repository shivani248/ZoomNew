import axios from 'axios';

const getZoomAccessToken = async () => {
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;

    try {
        const tokenResponse = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'client_credentials'
            },
            auth: {
                username: clientId,
                password: clientSecret
            }
        });
        console.log(tokenResponse , "test");
        
        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default getZoomAccessToken;
