import "./env.js";
import express from 'express';

import swagger from "swagger-ui-express";
// import apiDocs from "./swagger2.0.json" assert{type:"json"};
import apiDocs from "./swagger3.0.0.json" assert{ type:"json"};


import  ProductRouter from './src/features/productFolder/product.routes.js';
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import bodyParser from "body-parser";
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

import cors from "cors";
import { ApplicationError } from './src/error-Handler/applicationError.js';
import orderRouter from "./src/features/order/order.routes.js";
const app = express();

// load all the environment variables in application



//CORS Policy Configuration
var corsOptions={
    origin:"http://127.0.0.1:5500",
    allowedHeaders:["Authorization","Content-Type"]
}

app.use(cors(corsOptions))


// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500")// if you want to give access to all server instead of "http://localhost:5500" you can spcify there "*"
//     res.header('Access-Control-Allow-Headers',"Content-Type, Authorization") // if you want to give access to all Headers instead of "Content-Type, Authorization" you can spcify there "*"
//     res.header('Access-Control-Allow-Methos', '*') // here also you can specify a specific request for access
//     //return ok for preflight request.
//     if(req.method == "OPTIONS"){
//         res.sendStatus(200);
//     }
//     next();
// })




// parsing the data;

app.use(bodyParser.json());

// Bearer <token>
// app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api-docs",swagger.serve, swagger.setup(apiDocs));




// logger Middleware

app.use(loggerMiddleware);

// for all requests related to product, redirect to product routes.

// app.use("/api/products", basicAuthorizer, ProductRouter);
app.use("/api/orders", jwtAuth, orderRouter);
app.use("/api/cartItems",jwtAuth, cartRouter);
app.use("/api/products", jwtAuth, ProductRouter);


app.use("/api/users", userRouter);



app.get("/",(req,res)=>{
    res.send("Welcome to E-Commerce APIs")
})

app.use((err, req, res, next)=>{
    console.log(err);

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send('Something went wrong, please try later')
})

app.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at 'localhost:3000/api-docs'")
})

export default app;