import { useState, FormEvent, useEffect } from "react";
import React from "react";
import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import { useCustomers } from "../hooks/useCustomers";
import { CartItem } from "../models/CartItem";
import { IOrder, IOrderCreate, IOrderItem } from "../models/IOrder";
import { ICustomer, ICustomerCreate } from "../models/ICustomer";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51R7Hmt2aq8YOrfF8CAWb37RRT4USrFMy5xVhJEmJe0s6g1ovm6cEnGT5M9hJsjZcLmoqZUu4GEAllgmgweUWMUY900D5NzKTS4');

export const Checkout = () => {

   const {cart} = useCart();
    const totalCartPrice = cart.reduce( (total, item: CartItem) => (
        total + (item.quantity * item.product.price)
    ), 0);

    const [content] = useState<IOrderCreate>({}); 
    const [customerContent] = useState<ICustomerCreate>({}); 
    const [order, setOrder] = useState<IOrder>();
    const [customer, setCustomer] = useState<ICustomer>({})
    const [checkoutEmbeded, setCheckoutEmbeded] = useState(false);
    const {isLoading, error, createOrderHandler} = useOrders();
    const {customers, createCustomerHandler, fetchCustomersHandler} = useCustomers();
    useEffect(() => {fetchCustomersHandler()}, [])
    

    const orderItems: IOrderItem[] = cart.map((cartItem) => {
        let item : IOrderItem = {
            product_id : cartItem.product.id, 
            product_name : cartItem.product.name, 
            unit_price : cartItem.product.price, 
            quantity : cartItem.quantity
        }
        return item;
    });
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!customerContent.city || !customerContent.country || 
            !customerContent.email || !customerContent.firstname || 
            !customerContent.lastname || !customerContent.phone || 
            ! customerContent.postal_code || !customerContent.street_address) {
            return setCheckoutEmbeded(false);
        } else { 
            customers.map(async (c) => {
                if (c.email === customerContent.email) {
                    setCustomer(c);
                }
                const createCustomer = await createCustomerHandler(customerContent);
                setCustomer(createCustomer);
            })
        };

        content.customer_id = customer.id;
        content.payment_status = 'unpaid';
        content.payment_id = null;
        content.order_status = 'pending';
        content.order_items = orderItems;

        const order = await createOrderHandler(content);
        setOrder(order);
        setCheckoutEmbeded(true);
    };

    const payload = {
        line_items: orderItems,
        order_id: order?.id,
    };

    const fetchClientSecret = React.useCallback(() => {
        return fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({payload})
        })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
        
    const options = {fetchClientSecret};

        
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            {checkoutEmbeded ? 
                <div id="checkout">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
                </div> : 
                <>
                <section id="create-customer">
                    <form onSubmit={handleSubmit}>
                        <label>Förnamn: 
                            <input type="text" name="firstname" onChange={(e) => (customerContent.firstname = e.target.value)}/>
                        </label>
                        <label>Efternamn: 
                            <input type="text" name="lastname" onChange={(e) => (customerContent.lastname = e.target.value)}/>
                        </label>
                        <label>Epost: 
                            <input type="text" name="email" onChange={(e) => (customerContent.email = e.target.value)}/>
                        </label>
                        <label>Telefonnummer: 
                            <input type="text" name="phone" onChange={(e) => (customerContent.phone = e.target.value)}/>
                        </label>
                        <label>Adress: 
                            <input type="text" name="street_address" onChange={(e) => (customerContent.street_address = e.target.value)}/>
                        </label>
                        <label>Postkod: 
                            <input type="text" name="postal_code" onChange={(e) => (customerContent.postal_code = e.target.value)}/>
                        </label>
                        <label>Stad: 
                            <input type="text" name="city" onChange={(e) => (customerContent.city = e.target.value)}/>
                        </label>
                        <label>Land: 
                            <input type="text" name="country" onChange={(e) => (customerContent.country = e.target.value)}/>
                        </label>
                        <br />
                        <button><NavLink to={"/cart"}>Tillbaka</NavLink></button>
                        <button>Betala</button>
                    </form>
                </section>

                <ul className='cart-list'>
                    { cart.map((item) => (
                        <li key={item.product.id}>
                            <div className='cart-list-item'>
                            <h3>{item.product.name}</h3>
                            <p>{item.quantity} X {item.product.price} kr</p>
                            </div>
                        </li>
                    ))
                    }
                </ul>

                <h3>Total: {totalCartPrice} kr</h3> 
            </>}
        </>
    )
};
