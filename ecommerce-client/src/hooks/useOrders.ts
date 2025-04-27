import { useState } from 'react'
import { IOrders, IOrderCreate, IOrderUpdate } from '../models/IOrder';
import { fetchOrders, fetchOrderByID, fetchOrderByPaymentID, createOrder, updateOrder, deleteOrder } from '../services/orderService';


export const useOrders = () => {
    const [orders, setOrders] = useState<IOrders[]>([])
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    

    const fetchOrdersHandler = async () => {
        setIsLoading(true);

        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (error) {
            setError("Error fetching orders");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrderByIdHandler = async (id: number) => {
        setIsLoading(true);
    
        try {
            return await fetchOrderByID(id);
        } catch (error) {
            setError("Error fetching order");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrderByPaymentIDHandler = async (id: string) => {
        setIsLoading(true);
    
        try {
            return await fetchOrderByPaymentID(id);
        } catch (error) {
            setError("Error fetching order");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const createOrderHandler = async (payload: IOrderCreate) => {
        setIsLoading(true);
        
        try {
            return await createOrder(payload);
        } catch (error) {
            setError("Error creating order");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const updateOrderHandler = async (id: number, payload: IOrderUpdate) => {
        setIsLoading(true);
        
        try {
            return await updateOrder(id, payload);
        } catch (error) {
            setError("Error updating order");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    const deleteOrderHandler = async (id: number) => {
        setIsLoading(true);
        
        try {
            await deleteOrder(id);
            const newOrders = orders.filter(order => order.id !== id);
            setOrders(newOrders);
        } catch (error) {
            setError("Error deleting order");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    return {
        orders, 
        isLoading,
        error,
        fetchOrdersHandler,
        fetchOrderByIdHandler,
        fetchOrderByPaymentIDHandler,
        createOrderHandler,
        updateOrderHandler,
        deleteOrderHandler
    };
};
