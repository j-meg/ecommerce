import { useState, FormEvent, useEffect } from "react";
import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import { useCustomers } from "../hooks/useCustomers";
import { CartItem } from "../models/CartItem";
import { IOrderCreate, IOrderItem } from "../models/IOrder";
import { ICustomer, ICustomerCreate } from "../models/ICustomer";


export const Checkout = () => {

   const {cart} = useCart();
    const totalCartPrice = cart.reduce( (total, item: CartItem) => (
        total + (item.quantity * item.product.price)
    ), 0);

    const [customer] = useState<ICustomer>(() => {
        const cachedCustomer = localStorage.getItem('customer')
        return cachedCustomer ? JSON.parse(cachedCustomer) : []
    });

    const content: IOrderCreate = {customer_id: 0, payment_status: 'unpaid', payment_id: null, order_status: 'pending', order_items: []}; 
    const customerContent: ICustomerCreate = {
        firstname: customer.firstname, 
        lastname: customer.lastname, 
        email: customer.email, 
        password: customer.password, 
        phone: customer.phone, 
        street_address: customer.street_address, 
        postal_code: customer.postal_code, 
        city: customer.city, 
        country: customer.country
    }; 


    const {isLoading, error, createOrderHandler} = useOrders();
    const {customers, createCustomerHandler, fetchCustomersHandler} = useCustomers();
    useEffect(() => {fetchCustomersHandler()}, []);
    

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
                console.log('missing customer information')
        } else { 
            customers.map(async (c) => {
                if (c.email === customerContent.email) {
                    content.customer_id = c.id;
                    localStorage.setItem('customer', JSON.stringify(c))
                }
            })
            const createCustomer = await createCustomerHandler(customerContent);
            content.customer_id = createCustomer.id;
            localStorage.setItem('customer', JSON.stringify(customerContent))

        };
        content.order_items = orderItems;

        const order = await createOrderHandler(content);
        const payload = {
            line_items: orderItems,
            order_id: order?.id,
        };
        console.log(payload)
    
        try {
            const response = await fetch('http://localhost:3000/create-checkout-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({payload}) 
            });
      
            const data = await response.json();
            console.log(data.checkout_url);
      
            window.location.href = data.checkout_url
        } catch(error) {
            console.log(error)
        }
    };

        
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            <section id="create-customer">
                <form onSubmit={handleSubmit}>
                    <label>Förnamn: 
                        <input type="text" name="firstname" defaultValue={customer.firstname} onChange={(e) => (customerContent.firstname = e.target.value)}/>
                    </label>
                    <label>Efternamn: 
                        <input type="text" name="lastname" defaultValue={customer.lastname} onChange={(e) => (customerContent.lastname = e.target.value)}/>
                    </label>
                    <label>Epost: 
                        <input type="text" name="email" defaultValue={customer.email} onChange={(e) => (customerContent.email = e.target.value)}/>
                    </label>
                    <label>Telefonnummer: 
                        <input type="text" name="phone" defaultValue={customer.phone} onChange={(e) => (customerContent.phone = e.target.value)}/>
                    </label>
                    <label>Adress: 
                        <input type="text" name="street_address" defaultValue={customer.street_address} onChange={(e) => (customerContent.street_address = e.target.value)}/>
                    </label>
                    <label>Postkod: 
                        <input type="text" name="postal_code" defaultValue={customer.postal_code} onChange={(e) => (customerContent.postal_code = e.target.value)}/>
                    </label>
                    <label>Stad: 
                        <input type="text" name="city" defaultValue={customer.city} onChange={(e) => (customerContent.city = e.target.value)}/>
                    </label>
                    <label>Land: 
                        <input type="text" name="country" defaultValue={customer.country} onChange={(e) => (customerContent.country = e.target.value)}/>
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
        </>
    )
};
