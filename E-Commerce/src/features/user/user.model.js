import { getDB } from "../../config/mongodb.js";
export default class UserModel{

    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }


    

//     static signIn (email, password){
//         const user = users.find((u)=>u.email == email && u.password == password);
//         return user;
//     }

//     static getAll(){
//         return users;
//     }
 }



let users =[{
    id:1,
    name:"Seller User",
    email:"seller@ecom.com",
    password:"Password1",
    type:"seller",
},
{
    id:2,
    name:"Customer User",
    email:"customer@ecom.com",
    password:"Password1",
    type:"customer",
}
]