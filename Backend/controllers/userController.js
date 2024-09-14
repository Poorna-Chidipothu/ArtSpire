import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer';


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRECT);
}
//login user Function
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User Does't Exists."})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Enter Correct Password."})
        }

        const token = createToken(user._id);
        res.json({success:true,token,name:user.name});
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"});
    }
}



//register User Function
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        // Checking if the user already exists
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name : name,
            email : email,
            password : hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)

        res.json({success:true,token,name:user.name});
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and its expiry (10 minutes)
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}. This OTP will expire in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email' });

    } catch (err) {
        res.status(500).json({ message: 'Error sending OTP', error: err.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() } // Ensure OTP hasn't expired
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP or it has expired" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and clear OTP fields
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });

    } catch (err) {
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
};

export {loginUser,registerUser,forgotPassword,resetPassword}