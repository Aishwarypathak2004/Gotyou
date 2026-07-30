const express=require("express");
const protect=require("../middlewares/authmiddleware");
const admin=require("../middlewares/adminmiddleware");
const getAdminStats=require("../controllers/analyticsController");

const router=express.Router();
router.get('/',protect,admin,getAdminStats);
module.exports=router;