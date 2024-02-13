import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";


export default class ProductController {

    constructor (){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res){

        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products)


        }catch(err){
            console.log(err);
            res.status

        }
       
    }

    async addProduct(req,res){

        try{

            const {name, desc, price, category, sizes,}=req.body;
            const newProduct =new ProductModel(name, desc, req.file.filename, category, parseFloat(price), sizes.split(','));
     
            const createdRecord = await this.productRepository.add(newProduct);
            res.status(201).send(createdRecord);
     


        }catch(err){
            console.log

        }
      
    }

   async rateProduct(req,res){
        try{
        const userID = req.userID;
        const productID = req.body.productID;
        const rating = req.body.rating;

        // const error =ProductModel.rateProduct(userID, productID, rating);

        await this.productRepository.rate(userID, productID, rating);
        
        return res.status(200).send("Your rating has been recieved");

        }catch(err){
            return res.status(400).send(err.message);
        }

        
    }

   async getOneProduct(req,res){

    
        try{

            const id = req.params.id
            const product =await this.productRepository.get(id);
            if(!product){
                res.status(400).send('product not found')
            }else{
            res.status(200).send(product);
            }

        }catch(err){

            console.log(err);
            return res.status(200).send("something went wrong");

        }
        
    
        
    }

    // async filterProducts(req,res){
    //     try{
    //     const minPrice = req.query.minPrice;
    //     const maxPrice = req.query.maxPrice;
    //     const category = req.query.category;

    //     const products =await this.productRepository.filter(minPrice, maxPrice, category);

        
    //     res.status(200).send(products);

    //     }catch(err){
    //         console.log(err);
    //         return res.status(200).send("Something went wrong")
    //     }
    // }

    async filterProducts(req,res){
        try{
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;

        const products =await this.productRepository.filter(minPrice, category);

        
        res.status(200).send(products);

        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong")
        }
    }



    async averagePrice(req, res, next){
        try{
            const result = await this.productRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            return res.status(200).send("something went wrong.")

        }

    }

}