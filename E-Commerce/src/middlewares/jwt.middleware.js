import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
    // 1. Read the token.
    
    const token = req.headers["authorization"];

    //2. if no token, return the error.
    

    if(!token){
        return res.status(401).send("unauthorized");
    }

    //3. check if token is valid.

    try{

    const payload= jwt.verify( token, '3C4iGohMDVeTC9g899nzncOoeW8Bn6cG')
    req.userID = payload.userID;
    console.log(payload);

    }catch(err){

         //4. if error, return error.
        return res.status(401).send("Unauthorized");
    }
   

    //5 call next middleware.
    next();
}

export default jwtAuth;