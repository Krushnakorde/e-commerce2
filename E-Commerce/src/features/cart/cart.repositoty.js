import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../error-Handler/applicationError.js";

export default class CartItemsRepositoty{

    constructor(){
        this.collection = "cartItems"
    }

    async add(productId, userId, quantity){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        const id = await this.getNextCounter(db);


            // find the document
            // either insert or update
            // Insertion.

        await collection.updateOne({productId:new ObjectId(productId), userId: new ObjectId(userId)},

        //  {  $setOnInsert : {_id:id},
        {  
            $inc:{quantity:quantity} 
        },
         {upsert:true}
         );

        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong with database", 500);

        }




    }



    async get(userId){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userId:new ObjectId(userId)}).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }


    async delete (userId, cartItemId){
        try{
            const db= getDB();
            const collection = db.collection(this.collection);
            // const result = await collection.deleteOne({_id:parseInt(cartItemId), userId:new ObjectId(userId)});
            const result = await collection.deleteOne({_id:new ObjectId(cartItemId), userId:new ObjectId(userId)});

            return result.deletedCount > 0 ;

        }catch(err){
            console.log(err);
            throw new ApplicationError ("Something went wrong with database", 500);
        }

    }




    async getNextCounter (db) {
        const resultDocument = await db.collection("counters").findOneAndUpdate(
        {_id:'cartItemId'},
        {$inc:{value:1}},
        {returnDocument:"after"}
        )

        
        return resultDocument.value;

    }

}