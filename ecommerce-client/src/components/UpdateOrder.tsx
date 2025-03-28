import { useState, useEffect, FormEvent } from "react";
import { useOrders } from "../hooks/useOrders";
import { IOrderUpdate, IOrder } from "../models/IOrder";

interface IUpdateOrderProps {
    updateOrderProps: (upp: boolean) => void;
    updateOrderID: number;
}

export const UpdateOrder = (props: IUpdateOrderProps) => {

    const [content, setContent] = useState<IOrderUpdate>({}); 
    const {isLoading, error, fetchOrderByIdHandler, updateOrderHandler} = useOrders();

    const [order, setOrder] = useState<IOrder>();
    useEffect(() => {
        if (order) return;
        const fetchOrder = async () => {
            const data = await fetchOrderByIdHandler(props.updateOrderID);
            setOrder(data);
        }
        fetchOrder();
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // if (!content.name) content.name = product?.name;
        // if (!content.description) content.description = product?.description;
        // if (!content.category) content.category = product?.category;
        // if (!content.price) content.price = product?.price;
        // if (!content.stock) content.stock = product?.stock;
        // if (!content.image) content.image = product?.image;
        
        await updateOrderHandler(props.updateOrderID, content)
        props.updateOrderProps(false);
    };

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
<section id="update-order">
                <form onSubmit={handleSubmit}>
                    <label>Betalningsstatus: 
                        <input 
                            type="text" 
                            name="payment_status" 
                            onChange={(e) => (content.payment_status = e.target.value)} 
                            defaultValue={order?.payment_status}
                        />
                    </label>
                    <label>Orderstatus: 
                        <input 
                            type="text" 
                            name="order_status" 
                            onChange={(e) => (content.order_status = e.target.value)} 
                            defaultValue={order?.order_status}
                        />
                    </label>
                    

                    <button onClick={() => props.updateOrderProps(false)}>Tillbaka</button>
                    <button>Uppdatera</button>
                </form>
            </section>
        </>
    )
};
