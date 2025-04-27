import { useState, useEffect } from "react";
import { NavLink } from "react-router"
import { useOrders } from "../hooks/useOrders";
import { IOrderUpdate, IOrder } from "../models/IOrder";

export const OrderConfirmation = () => {

    let params =  new URLSearchParams(document.location.search);
    let session_id = params.get("session_id");
    let order_id = params.get("order_id");

    const { fetchOrderByIdHandler, updateOrderHandler } = useOrders();
    const [order, setOrder] = useState<IOrder>();

    useEffect(() => {
        const getOrder = async () => {
            if (!order_id) return;
            const data = await fetchOrderByIdHandler(parseInt(order_id)); 
            setOrder(data);

            if (session_id && data) {
                const content: IOrderUpdate = {payment_status: "Paid", payment_id: session_id, order_status: "Received"}; 
                updateOrderHandler(data.id, content);
            };
        };
        if (order) return;
        getOrder();
    });


    return (
        <>
            <h2>Tack för din beställning!</h2>
            <p>{order?.customer_firstname} {order?.customer_lastname}</p>
            <p>{order?.customer_street_address} {order?.customer_city} {order?.customer_postal_code} {order?.customer_country}</p>
            { order?.order_items.map((item) => (
                <li key={item.id}>
                    <div className='cart-list-item'>
                        <p>{item.product_name}: {item.quantity} * {item.unit_price} kr</p>
                    </div>
                </li>
                ))
            }
            <p>Total summa: {order?.total_price}</p>

            <button><NavLink to={"/"}>Hem</NavLink></button>
        </>
    )
}