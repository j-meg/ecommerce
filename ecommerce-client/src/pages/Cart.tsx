import { NavLink } from "react-router";
import { CartItem } from "../models/CartItem";
import { IProduct } from "../models/IProduct";
import { ICartActionType } from "../reducers/CartReducer";
import { useCart } from "../hooks/useCart";


export const Cart = () => {

    const {cart, dispatch} = useCart();

    const totalCartPrice = cart.reduce( (total, item: CartItem) => (
        total + (item.quantity * item.product.price)
    ), 0);

    const handleChangeQuantity = (product: IProduct, quantity: number) => {
        dispatch({
        type: ICartActionType.CHANGE_QUANTITY,
        payload: new CartItem(product, quantity)
        })
    };
        
    const handleRemoveFromCart = (cartItem: CartItem) => {
        dispatch({
        type: ICartActionType.REMOVE_ITEM,
        payload: cartItem
        })
    };
        
    const handleResetCart = () => {
        dispatch({
        type: ICartActionType.RESET_CART,
        payload: null
        })
    };


    return (
        <>
            <h2>Kundvagn</h2>
            <ul className='cart-list'>
                { cart.map((item) => (
                    <li key={item.product.id}>
                        <div className='cart-list-item'>
                        <h3>{item.product.name}</h3>
                        <div>
                            <button onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
                            <button onClick={() => handleChangeQuantity(item.product, -1)}>-</button>
                        </div>
                        <p>{item.quantity} X {item.product.price} kr</p>
                        <button onClick={() => handleRemoveFromCart(item)}>Ta bort</button>
                        </div>
                    </li>
                ))
                }
            </ul>

            <h3>Total: {totalCartPrice} kr</h3>
            {cart.length > 0 ? <>
            <button onClick={handleResetCart}>Töm kundvagnen</button>
            <button><NavLink to={"/checkout"}>Checkout</NavLink></button>
            </> : <></>}
            <button><NavLink to={"/products"}>Produkter</NavLink></button>
        </>
    );
};
