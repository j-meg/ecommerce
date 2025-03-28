import axios from "axios";
import { handleRequest, API_URL } from "./baseService";
import { ICustomer, ICustomerCreate, ICustomerUpdate } from "../models/ICustomer";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
    return await handleRequest<ICustomer[]>(axios.get(`${API_URL}/customers`))
};

export const fetchCustomerByID = async (id: number): Promise<ICustomer> => {
    return await handleRequest<ICustomer>( axios.get(`${API_URL}/customers/${id}`))
};

export const fetchCustomerByEmail = async (email: string): Promise<ICustomer> => {
    return await handleRequest<ICustomer>( axios.get(`${API_URL}/customers/email/${email}`))
};
  
export const createCustomer = async (payload: ICustomerCreate): Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.post(`${API_URL}/customers`, payload))
};
  
export const updateCustomer = async (id: number, payload: ICustomerUpdate): Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.patch(`${API_URL}/customers/${id}`, payload))
};
  
export const deleteCustomer = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/customers/${id}`))
};