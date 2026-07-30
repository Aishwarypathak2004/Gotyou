const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");



// Get all products
const getProducts = async (req, res) => {

    try {

        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    
    }
    catch (error) {

        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



// Get a single product by ID

const getProductById = async (req, res) => {

    try {


        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



// Create a new product
const createProduct = async (req, res) => {

    try {
    
      const {name,description,price,category,stock} = req.body;
      let imageUrl= '';

      if (req.file)
        
        {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        imageUrl=result.secure_url;
      }

      const product=new Product({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
      });

      const saveProduct=await product.save();
      res.status(201).json(saveProduct);

    

    
}
catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// Update Product

const updateProduct= async(req,res)=>{

        try{


            const {name,description,price,category,stock} = req.body;
            const product=await Product.findById(req.params.id);

            if (product){
                product.name=name || product.name;
                product.description=description || product.description;
                product.price=price || product.price;
                product.category=category || product.category;
                product.stock=stock || product.stock;


                 if (req.file){
                const result=await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imageUrl=result.secure_url;
            }

            const updateProduct=await product.save();
            res.json(updateProduct);


            }
            else {
                res.status(404).json({message: 'Product not found'});
            }
           

        }

        catch(error){
           res.status(500).json({ message: 'Server error', error: error.message });

        }

}



// delete product

const deleteProduct=async(req,res)=>{

        try{

                const product= await Product.findById(req.params.id);

                if(product){

                    await product.deleteOne();
                    res.json({message: 'Product Removed'});
                }

                else{

                    res.status(404).json({message: 'Product not found'});

                }






        }


        catch(error){
             res.status(500).json({ message: 'Server error', error: error.message });
        }









}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}