const express=require ("express");
const router=express.Router();

const protect=require("../middlewares/authmiddleware");
const admin=require("../middlewares/adminmiddleware");
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct}=require("../controllers/productController");
const multer=require('multer');
const upload=multer({dest: 'uploads/'})

//all products
router.route("/").get(getProducts).post(protect,admin,upload.single('image'),createProduct);

//single product 
router.route("/:id")
.get(getProductById)
.put(protect, admin, upload.single("image"), updateProduct)
.delete(protect, admin, deleteProduct);
module.exports=router;