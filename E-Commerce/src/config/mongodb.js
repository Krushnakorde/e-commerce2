
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// // dotenv.config();

// // const url = process.env.DB_URL;
// // console.log("URL: "+url);

// // let client;
// // export const connectToMongoDB = ()=>{
// //     MongoClient.connect(url)
// //         .then(clientInstance=>{
// //             client=clientInstance
// //             console.log("Mongodb is connected");
// //             createCounter(client.db());
// //             createIndexes(client.db());
// //         })
// //         .catch(err=>{
// //             console.log(err);
// //         })
// // }

// // export const getClient = ()=>{
// //     return client;
// // }

// // export const getDB = ()=>{
// //     return client.db();
// // }

// // const createCounter = async(db)=>{
// //     const existingCounter=await db.collection("counters").findOne({_id:'cartItemId'});
// //     if(!existingCounter){
// //         await db.collection("counters").insertOne({_id:'cartItemId', value:0});
// //     }
// // }

// // const createIndexes = async(db)=>{
// //     try{
// //         await db.collection("products").createIndex({price:1});
// //         await db.collection("products").createIndex({name:1, category:-1});
// //         await db.collection("products").createIndex({desc:"text"});
// //     }catch(err){
// //         console.log(err);
// //     }
// //     console.log("Indexes are created");
// // }


import {MongoClient} from "mongodb";

const url ='mongodb://localhost:27017/ecomdb'
// const url = "mongodb://127.0.0.1:27017/ecomdb";


let client ;
export const connectToMongoDB = ()=>{
    console.log(process.env.DB_URL);
     MongoClient.connect(process.env.DB_URL).then(clientInstance=>{
        // MongoClient.connect("mongodb://localhost:27017/ecomdb").then(clientInstance=>{
        client= clientInstance;
        console.log("Mongodb is connected");

        //  createCounterCartItems(client.db());
        //  createIndexes(client.db());
        // createCounterProducts(client.db());
        // createCounterUsers(client.db());
        
    }).catch(err=>{
        console.log(err);
    })
}

export const getClient = () =>{
    return client ;
}

export const getDB = ()=>{
    console.log(client.db());
   return  client.db();
}

export default connectToMongoDB;




const createCounterCartItems = async (db) => {
    const existingCounter = await db.collection ("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId',value:0});
    }
}


const createIndexes = async (db) => {
    try{
    await db.collection ("products").createIndex({price:1});
    await db.collection ("products").createIndex({name:1, category:-1});
    await db.collection ("products").createIndex({desc:"text"});
    } catch (err) {
        console.log(err);
    }

    console.log("Indexes are created")
}




const createCounterProducts = async(db) =>{
    const existingCounter = await db.collection("counters").findOne({_id:"productItemId"});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:"productItemId", value:0});
    }
}

const createCounterUsers = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:"userId"});
    if(!existingCounter ){
        await db.collection("counters").insertOne({_id:"userId", value:0});
    }
}


