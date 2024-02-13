import { getDB } from "../../config/mongodb.js";

class UserRepository{

    constructor (){
        this.collection = "users"
    }

    async signUp (newUser){
        //1 get the database

        try{
        const db = getDB();

        //2.get the collection
        const collection = db.collection(this.collection);

        //3.Insert the document
        await collection.insertOne(newUser);

        return newUser;

        }catch(err){
            console.log(err);
            throw new ApplicationError ( " something went wrong ", 500 ) ;

        } 
        
    }



    async signIn (email){
        try{
            const db = getDB();
            const collection = db.collection("users");
            return await collection.findOne({email})
        
        }catch(err){
            console.log(err);
        }
    }




    // async getNextCounter(db){
    //     const resultDocument = await db.collection("counters").findOneAndUpdate(
    //         {_id:"userId"},
    //         {$inc:{value:1}},
    //         {returnDocument:"after"}
    //     );


    //     return resultDocument.value;

    // }

}

export default UserRepository;