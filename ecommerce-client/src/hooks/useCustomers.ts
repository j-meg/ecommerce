import { useState } from 'react'
import { ICustomer, ICustomerCreate, ICustomerUpdate } from '../models/ICustomer';
import { fetchCustomers, fetchCustomerByID, fetchCustomerByEmail, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';


export const useCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    

    const fetchCustomersHandler = async () => {
        setIsLoading(true);

        try {
            const data = await fetchCustomers();
            setCustomers(data);
        } catch (error) {
            setError("Error fetching customers");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCustomerByIdHandler = async (id: number) => {
        setIsLoading(true);
    
        try {
            return await fetchCustomerByID(id);
        } catch (error) {
            setError("Error fetching customer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCustomerByEmailHandler = async (email: string) => {
        setIsLoading(true);
    
        try {
            return await fetchCustomerByEmail(email);
        } catch (error) {
            setError("Error fetching customer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const createCustomerHandler = async (payload: ICustomerCreate) => {
        setIsLoading(true);
        
        try {
            return await createCustomer(payload);
        } catch (error) {
            setError("Error creating customer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const updateCustomerHandler = async (id: number, payload: ICustomerUpdate) => {
        setIsLoading(true);
        
        try {
            return await updateCustomer(id, payload);
        } catch (error) {
            setError("Error updating customer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    const deleteCustomerHandler = async (id: number) => {
        setIsLoading(true);
        
        try {
            await deleteCustomer(id);
            const newCustomers = customers.filter(customer => customer.id !== id);
            setCustomers(newCustomers);
        } catch (error) {
            setError("Error deleting customer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    return {
        customers, 
        isLoading,
        error,
        fetchCustomersHandler,
        fetchCustomerByIdHandler,
        fetchCustomerByEmailHandler,
        createCustomerHandler,
        updateCustomerHandler,
        deleteCustomerHandler
    };
};

