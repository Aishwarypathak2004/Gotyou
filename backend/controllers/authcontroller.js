const User=require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const sendEmail=require("../utils/sendemail");



const generateToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});

};



// REGISTER A USER
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            otp: otp,
            otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
            verified: false
        });

        // Email Message
        const message = `Welcome to GOTYOU!

Hi ${name},

Your OTP for email verification is:

${otp}

This OTP is valid for 10 minutes.

Thank you,
Team GOTYOU`;

        // Send Email
        await sendEmail(
            email,
            "Verify Your Email - GOTYOU",
            message
        );

        res.status(201).json({
            message: "Registration successful. Please verify your email using the OTP sent to your email."
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};

// LOGIN A USER
const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){

             res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user.id)

            
           
        }
    )
    console.log("User logged in successfully")
         
}
        else{res.status(400).json({message:'Invalid credentials'});
        }
    }
    catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    }
}
     


// VERIFY OTP
const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Please provide email and OTP"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: "User already verified"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully",
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id)
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};


//get all users
    const getUsers=async (req,res)=>{


        try{
            const users=await User.find({}).select('-password');
            res.status(200).json(users);
        }
        catch(error){
            res.status(500).json({message:'Server error',error:error.message});
        }

    }

    module.exports={registerUser,loginUser,getUsers,verifyOTP};