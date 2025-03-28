import { useEffect } from "react";
import { useOrders } from "../hooks/useOrders";

interface IOrderProps {
    updateOrderID: (id: number) => void;
    updateOrderProps: (uop: boolean) => void;
}

export const ManageOrders = (props: IOrderProps) => {
    
    const {orders, isLoading, error, fetchOrdersHandler, deleteOrderHandler} = useOrders();

    useEffect(() => {fetchOrdersHandler()}, [])
         
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
                    <table id="order-table">
                <thead>
                    <tr>
                        <th>ID: </th>
                        <th>Kund ID: </th>
                        <th>Total summa: </th>
                        <th>Betalings ID: </th>
                        <th>Betalningsstatus: </th>
                        <th>Beställningsstatus: </th>
                        <th>Skapad: </th>

                        <th>Förnamn: </th>
                        <th>Efternamn: </th>
                        <th>Epost: </th>
                        <th>Telefon: </th>
                        <th>Adress: </th>
                        <th>Postkod: </th>
                        <th>Stad: </th>
                        <th>Land: </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr className="table-item" key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_id}</td>
                            <td>{order.total_price}</td>
                            <td>{order.payment_id}</td>
                            <td>{order.payment_status}</td>
                            <td>{order.order_status}</td>
                            <td>{order.created_at}</td>

                            <td></td>
                            <td>{order.customer_firstname}</td>
                            <td>{order.customer_lastname}</td>
                            <td>{order.customer_email}</td>
                            <td>{order.customer_phone}</td>
                            <td>{order.customer_street_address}</td>
                            <td>{order.customer_postal_code}</td>
                            <td>{order.customer_city}</td>
                            <td>{order.customer_country}</td>

                            <td>
                                <button onClick={() => {props.updateOrderProps(true), props.updateOrderID(order.id)}}>Ändra</button>
                            </td>
                            <td>
                                <button onClick={() => {deleteOrderHandler(order.id)}}>Radera</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}