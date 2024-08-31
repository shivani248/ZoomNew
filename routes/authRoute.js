import express from 'express'
import {registerController , loginController} from '../controller/authController.js'

//router object 
const router = express.Router();

//creating router 
router.post('/register' , registerController); //route and callback 
router.post('/login' , loginController);

export default router;