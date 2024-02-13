 import UserModel from "../features/user/user.model.js";
 const basicAuthorizer = (req, res, next)=>{

    // 1. Check if authorization header is empty.

    const authHeader = req.headers ["authorization"];
    console.log(authHeader);
    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }

    //2. Extract credentials.

    const base64Credentials=authHeader.replace('Basic','');

    // 3. decode credentials.

    const decodedCreds= Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodedCreds); // [username:password];

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find((u)=>{
        console.log(u);
        if(u.email==creds[0] && u.password==creds[1]){
            return u;
        }
    });

    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials")
    }

 }

 export default basicAuthorizer;