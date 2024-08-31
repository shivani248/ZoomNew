
import express from 'express';

// import auth from '../middleware/auth.js';
import {requireSignIn } from "../middleware/authMiddleware.js";
import {deleteZoomMeeting} from "../helpers/zoomApi.js"
import {meetingController , meetingCreateController} from '../controller/meetingController.js';

// import { createZoomMeeting, getZoomAccessToken } from '../helpers/zoomApi.js';

const router = express.Router();

router.get('/', requireSignIn ,meetingController);

router.post('/', requireSignIn, meetingCreateController);

router.delete('/:id', requireSignIn, async (req, res) => {
    try {
        // Find meeting by ID
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        // Check auth
        if (meeting.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Delete 
        await deleteZoomMeeting(meeting.zoomMeetingId);
        // Delete from database
        await meeting.remove();

        res.json({ msg: 'Meeting removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


export default router;
