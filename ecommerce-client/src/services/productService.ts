import axios from "axios";
import { IProduct, IProductCreate, IProductUpdate } from "../models/IProduct";
import { handleRequest, API_URL } from "./baseService";

export const fetchProducts = async (): Promise<IProduct[]> => {
    return await handleRequest<IProduct[]>(axios.get(`${API_URL}/products`))
};

export const fetchProduct = async (id: number): Promise<IProduct> => {
    return await handleRequest<IProduct>( axios.get(`${API_URL}/products/${id}`))
};
  
export const createProduct = async (payload: IProductCreate): Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.post(`${API_URL}/products`, payload))
};
  
export const updateProduct = async (id: number, payload: IProductUpdate): Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.patch(`${API_URL}/products/${id}`, payload))
};
  
export const deleteProduct = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/products/${id}`))
};