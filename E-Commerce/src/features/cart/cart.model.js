

export default class CartItemModel{

    constructor(productID, userID, quantity, id){
        this.productID = productID;
        this.userID= userID;
        this.quantity=quantity;
        this.id = id;
    }

    static add (productID, userID, quantity){
        let cartItem = new CartItemModel(productID, userID, quantity);
        cartItems.push(cartItem);
        cartItem.id=cartItems.length+1;
        return cartItem;
    }

    static get (userID){
        const items = cartItems.filter((items)=> items.userID==userID);
        return items;
        

    }

    static update( cartItemID, userID, quantity){

        const cartItem= cartItems.find((i)=> i.id==cartItemID && i.userID== userID);
        if(!cartItem){
            return "Cart Item not found "
        }
        
        cartItem.quantity=quantity;
        return cartItem;
    }


    static delete(cartID, userID){
        const cartItemIndex = cartItems.findIndex((item)=> {
            if(item.id==cartID && userID==userID){
                return item.id;
            }
        });
        if(cartItemIndex == -1){
            return 'Item not found';
        }else{
            cartItems.splice( cartItemIndex,1);
        }

    }
}

var cartItems = [

    new CartItemModel(1,2,1,1),
    new CartItemModel(2,2,1,2),
    new CartItemModel(1,1,1,3)


];