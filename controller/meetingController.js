import meetingsModel from '../models/meetingsModel.js' ;
import {createZoomMeeting} from '../helpers/zoomApi.js' ;
export const meetingController = async (req , res)=>{
    
    try {
    
        console.log("Request body:", req.body);
        console.log("Request user:", req.user);
      
        const meetingss = await meetingsModel.find({ email: req.body.email }).sort({ date: -1 });
        res.json(meetingss);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export const meetingCreateController = async (req, res) => {
    console.log("hhhhhhhhhhhhh")
    const { title, date, duration , token} = req.body;
    console.log(title, date, duration);
    
    if (!title || !date || !duration) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    
    try {
        // Zoom JWT token 
        // Create
        
        const zoomMeeting = await createZoomMeeting(title, date, duration ,token);
        console.log(zoomMeeting);
        
        const newMeeting = new Meeting({
            user: req.user._id, 
            title,
            date,
            duration,
            zoomMeetingId: zoomMeeting.id
        });
        console.log(newMeeting);
        console.log(user , title, date, duration, zoomMeetingId);
        
        const meeting = await newMeeting.save();
        res.json(meeting); 
    } catch (error) {
        console.error('Error in create meeting:', error.message);
        res.status(500).send('Serverr Error');
    }
}
