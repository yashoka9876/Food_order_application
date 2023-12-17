import Modal from "./UI/Modal.jsx";

import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";


export default function Cart(){

   const cartCtx= useContext(CartContext);

    const userProgressCtx= useContext(UserProgressContext)

   const cartTotal=cartCtx.items.reduce(
    (totalPrice,item) => totalPrice + item.quantity*item.price,
    0
    );

    function handleCloseCart(){
        userProgressCtx.hideCart()
    }

    return(
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItem 
                    key={item.id} 
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={()=> cartCtx.addItem(item)}
                    onDecrease={()=> cartCtx.removeItem(item.id)}
                     />
                    ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}