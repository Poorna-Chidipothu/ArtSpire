import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


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

export {loginUser,registerUser}