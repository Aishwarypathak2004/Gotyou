const express=require ("express");
const router=express.Router();
const {registerUser,loginUser,verifyOTP,getUsers}=require("../controllers/authController");
const protect=require("../middlewares/authmiddleware");
const admin=require("../middlewares/adminmiddleware");


router.post("/register",registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login",loginUser);
router.get("/users",protect, admin, getUsers);


module.exports=router;