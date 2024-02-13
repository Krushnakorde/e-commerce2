import { ApplicationError } from "../../error-Handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel {
    constructor( name, desc, imageUrl, category, price, sizes , id){
        
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.category=category;
        this.price=price;
        this.sizes=sizes;
        this._id=id;
    }
}

    // static getAll(){
    //     return products;    
    // }

    // static add(product){
    //     product.id=products.length+1;
    //     products.push(product);
       
    //     return product;

    // }

    // static get(id){
    //     const product = products.find((p)=>p.id==id);
    //     return product;
    // }


    // static filter(minPrice, maxPrice, category){
    //     const result = products.filter((product)=>{
    //         return (
    //             (!minPrice || product.price>=minPrice) &&
    //             (!maxPrice || product.price <=maxPrice) &&
    //             (!category || product.category==category) 
    //         );
    //     });
    //     return result;  
    // }


    // static rateProduct(userId, productId, rating){
    //     //1. Validate user and product

    //     const user = UserModel.getAll().find( (u)=>u.id == userId );
 
    //     if(!user){
    //         throw new ApplicationError ('User not found', 404);
    //     }

    //     // validate Product

    //     const product = products.find((p)=>p.id==productId);

    //     if(!product){
    //         throw new ApplicationError ("Product not found", 400);
    //     }

        

    //     // 2. check if there are any ratings and if not then add ratings array.

    //     if(!product.ratings){
    //         product.ratings = [];
    //         product.ratings.push({
    //             userID:userId,
    //             rating:rating
    //         })
    //     }else{
    //         // check if user rating is already available.
    //         const existingRatingIndex = product.ratings.findIndex(
    //             (r)=>r.userID==userId
    //         )

    //         if(existingRatingIndex >= 0){
    //             product.ratings[existingRatingIndex]={
    //                 userID:userId,
    //                 rating:rating
    //             }
    //         }else{
    //             // if no existing rating then add new rating
    //             product.ratings.push({
    //                 userID:userId,
    //                 rating:rating
    //             })
    //         }
    //     }
    // }




// var products = [
//     new ProductModel(
//         1,
//         "product 1",
//         "Description 1",
//         "",
//         "clothes",
//         10,
        
//     ),
//     new ProductModel(
//         2,
//         "Product 2",
//         "Description 2",
//         "",
//         "clothes",
//         20,
//         ["S", "M"]
//     ),
//     new ProductModel(
//         3,
//         "product 3",
//         "Description 3",
//         "",
//         "clothes",
//         30,
//         ["S", "M", "XL"],
//     ),
// ];