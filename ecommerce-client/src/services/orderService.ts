import axios from "axios";
import { handleRequest, API_URL } from "./baseService";
import { IOrders, IOrder, IOrderCreate, IOrderUpdate } from "../models/IOrder";

export const fetchOrders = async (): Promise<IOrders[]> => {
    return await handleRequest<IOrders[]>(axios.get(`${API_URL}/orders`))
};

export const fetchOrderByID = async (id: number): Promise<IOrder> => {
    return await handleRequest<IOrder>( axios.get(`${API_URL}/orders/${id}`))
};

export const fetchOrderByPaymentID = async (id: string): Promise<IOrder> => {
    return await handleRequest<IOrder>( axios.get(`${API_URL}/orders/payment/${id}`))
};
  
export const createOrder = async (payload: IOrderCreate): Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.post(`${API_URL}/orders`, payload))
};
  
export const updateOrder = async (id: number, payload: IOrderUpdate): Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.patch(`${API_URL}/orders/${id}`, payload))
};
  
export const deleteOrder = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/orders/${id}`))
};