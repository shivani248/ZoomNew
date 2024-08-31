import { hashed , comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const registerController =async (req , res)=>{

    const {name,email,password,phone,address,answer,role} = req.body;
    try {
        if(!name) { return res.status(404).send({message : "Name is required !"}); }
        if(!email) { return res.status(404).send({message: "Email is required !"}); }
        if(!password) { return res.status(404).send({message: "Password is required !"}); }
        if(!phone) { return res.status(404).send({message: "Phone is required !"}); }
        if(!address) { return res.status(404).send({message: "address is required !"}); }
        if(!answer) { return res.status(404).send({message: "answer is required !"}); }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"User already exits please login !",
               
            })
        }

        const hashedPassword = await hashed(password);
        const user = await new userModel({
            name,
            email,
            password : hashedPassword ,
            phone,
            address,
            answer
        }).save();

        res.status(201).send({
            success:true,
            message:"Registered Successfully !",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in registration',
            error
            
        });
    }

};

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Email is not registered, please register first"
            });
        }

        // Match password
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                status: false,
                message: 'Invalid password'
            });
        }

        // Generate token
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '7d' });
        const payload = {
            iss: process.env.ZOOM_CLIENT_ID,
            exp: (new Date()).getTime() + 5000000
        };
        
        const token = jwt.sign(payload, process.env.ZOOM_CLIENT_SECRET);
        // Send response
        res.status(200).send({
            status: true,
            message: "Login successful!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

export const delFunction = (req,res) =>{

}