// Manage routes/paths to ProductController

// 1. Import express.

import express from 'express';
import ProductController from "./product.controller.js";
import upload from '../../middlewares/fileupload.middleware.js';



// 2. Initialize express router.
 
const ProductRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products
ProductRouter.get("/filter",(req, res)=>{productController.filterProducts(req, res)});
ProductRouter.get('/',(req,res)=>{productController.getAllProducts(req, res)});
ProductRouter.post("/",upload.single("imageUrl"),(req,res)=>{productController.addProduct(req,res)});


ProductRouter.post("/rate",(req, res, next)=>{productController.rateProduct(req, res,next)});

ProductRouter.get("/averagePrice", (req, res, next)=>{
    productController.averagePrice(req, res);
});

ProductRouter.get("/:id",(req,res)=>{productController.getOneProduct(req, res)});

//queryParameter looks like-
// localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=category1

export default ProductRouter;