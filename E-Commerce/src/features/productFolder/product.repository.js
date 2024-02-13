import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-Handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

 class ProductRepository{

    constructor (){
        this.collection = "products";
    };

    async add(newProduct){
       

        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;

        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with procuct database")


        }

    }


    async getAll(){

        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();

        }catch(err){
            
            console.log(err);
            throw new ApplicationError("Something went wrong with procuct database")
            
        }

    }

    async get( id ){

        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return collection.findOne({_id: new ObjectId(id)});

        }catch(err){

            console.log(err);
            throw new ApplicationError("Something went wrong with procuct database")

        }

    }


    // async filter(minPrice, maxPrice, category){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);

    //         let filterExpression ={};

    //         if(minPrice){
    //             filterExpression.price = { $gte : parseFloat(minPrice)};
    //         }

    //         if(maxPrice){
    //             filterExpression.price = { ...filterExpression.price , $lte : parseFloat(maxPrice)}
    //         }

    //         if(category){
    //             filterExpression.category = category;
    //         }

    //         return collection.find(filterExpression).toArray();

    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("something went wrong with database", 500);

    //     }

    // }




    async filter(minPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            let filterExpression ={};

            if(minPrice){
                filterExpression.price = { $gte : parseFloat(minPrice)};
            }

            category = JSON.parse(category.replace(/'/g,'"'))
            console.log(category);

            if(category){
                // filterExpression = {$and:[ {category:category}, filterExpression]}
                // filterExpression = {$or:[ {category:category}, filterExpression]}
                filterExpression = {$or:[ {category:{$in:category}}, filterExpression]}



                // filterExpression.category = category;
            }

            return collection.find(filterExpression).project({name:1, price:1 , _id:0, ratings:{$slice:0}}).toArray(); // using projection operators 1 indicates inclusion and 0 indicates exclusion
            // slice is used to take take out speciefic part i.e, you use 1 it will return first rating and you use -1 it will return last rating and you use 2, 3, i.e. it will given that much part of the docucment.

        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500);

        }

    }



    async rate(userId, productId, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
           // 1. Removes existing entry
           await collection.updateOne({_id: new ObjectId(productId)},{$pull:{ratings:{userId: new ObjectId(userId)}}})
           await collection.updateOne({_id: new ObjectId(productId)}, {$push:{ratings:{userId: new ObjectId(userId), rating}}})
        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database ", 500)
        }
    }


    // async rate(userId, productId, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         //1. find the product
    //         const product = await collection.findOne({_id:new ObjectId(productId)});
    //         //2. find the rating
    //         const userRating = product?.ratings?.find((r)=>r.userId== userId);
    //         if(userRating){
    //             //3. update the rating
    //             await collection.updateOne({ _id : new ObjectId(productId), "ratings.userId": new ObjectId(userId)},{$set:{"ratings.$.rating":rating}})

    //         }else{

           
    //         await  collection.updateOne( { _id : new ObjectId (productId) }, {$push : {ratings :{userId: new ObjectId(userId), rating}}} );
    //       }

    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("something went wrong with database ", 500)
    //     }
    // }



    async averageProductPricePerCategory(){
        try{
        const db = getDB();
       return  await db.collection(this.collection).aggregate( [
            {
                // stage 1: Get average price per category

                $group:{
                    _id:"$category",
                    averagePrice:{$avg:"$price"}
                }
            }
        ]).toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }
 }
 
 export default ProductRepository;