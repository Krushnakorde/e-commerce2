
import CartItemModel from "./cart.model.js";
import CartItemsRepositoty from "./cart.repositoty.js";



export default class CartItemsController{
    constructor(){
        this.cartItemsRepository = new CartItemsRepositoty();
    }

   async add(req,res){
        try{
        const {productID, quantity }= req.body;
        const userID= req.userID;
        
        await this.cartItemsRepository.add(productID, userID, quantity);
        res.status(201).send("Cart is updated");
        }catch(err){
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }

    async get(req,res){
        try{
        const userID = req.userID;
        const items =await this.cartItemsRepository.get(userID);
        return res.status (200). send (items);
        }catch(err){
            console.log(err);
            res.status(500).send("something went wrong");
        }
    }


    update(req, res){

        const cartItemID= req.params.id;
        const userID = req.userID;
        const {quantity}= req.body;

        const updatedItem = CartItemModel.update(parseInt(cartItemID), userID, quantity);

        if(!updatedItem){
            return res.status(404).send("Failed to update quantity")
        }
        res. status (200).send(updatedItem);


    }

    async delete(req,res){

        const userID = req.userID;
        const cartItemID = req.params.id;

        const isDeleted =await this.cartItemsRepository.delete(userID, cartItemID);

        if(! isDeleted){
            return res.status (404).send("Item not found");
        }else{
            res.status(200). send('Cart Item is removed')
        }

    }

}