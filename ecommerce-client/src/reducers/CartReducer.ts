import { CartItem } from "../models/CartItem";

export interface ICartAction {
    type: ICartActionType;
    payload: CartItem | any;
}
  
  export enum ICartActionType {
    ADD_ITEM,
    REMOVE_ITEM,
    CHANGE_QUANTITY,  //   INCREASED, DECREASED, 
    RESET_CART
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
    const {payload, type} = action;
  
    switch(type) {
        case ICartActionType.ADD_ITEM: {
            const itemExists = cart.find((item) => item.product.id === payload.product.id)
    
            if (!itemExists) return [...cart, payload];
    
            return cart.map((item) => (
            item.product.id === payload.product.id 
                ? {...item, quantity: item.quantity + payload.quantity}
                : item
            ))
        };
        
        case ICartActionType.REMOVE_ITEM: {
            return cart.filter((item) => item.product.id !== payload.product.id);
        };
        
        case ICartActionType.CHANGE_QUANTITY: {
            return cart.map((item) => {
            if (item.product.id === payload.product.id ) {
                const totalQuantity = item.quantity + (payload.quantity)
                return {...item, quantity: totalQuantity > 0 ? totalQuantity : 1}
            };
    
            return item;
            })
        };
        
        case ICartActionType.RESET_CART:
            return [];
        
        default:
            return cart;
    };
};