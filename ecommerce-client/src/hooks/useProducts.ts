import { useState } from 'react'
import { IProduct, IProductCreate, IProductUpdate } from '../models/IProduct';
import { createProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct } from '../services/productService';


export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])        //https://elevera.itslearning.com/ContentArea/ContentArea.aspx?LocationType=1&LocationID=4699  30min
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    

    const fetchProductsHandler = async () => {
        setIsLoading(true);

        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            setError("Error fetching products");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProductByIdHandler = async (id: number) => {
        setIsLoading(true);
    
        try {
            return await fetchProduct(id);
        } catch (error) {
            setError("Error fetching product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const createProductHandler = async (payload: IProductCreate) => {
        setIsLoading(true);
        
        try {
            return await createProduct(payload);
        } catch (error) {
            setError("Error creating product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
      
    const updateProductHandler = async (id: number, payload: IProductUpdate) => {
        setIsLoading(true);
        
        try {
            return await updateProduct(id, payload);
        } catch (error) {
            setError("Error updating product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    const deleteProductHandler = async (id: number) => {
        setIsLoading(true);
        
        try {
            await deleteProduct(id);
            const newProducts = products.filter(product => product.id !== id);
            setProducts(newProducts);
        } catch (error) {
            setError("Error deleting product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    return {
        products, 
        isLoading,
        error,
        fetchProductsHandler,
        fetchProductByIdHandler,
        createProductHandler,
        updateProductHandler,
        deleteProductHandler
    };
};

