import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import { useParams } from "react-router";

export const ShowProduct = () =>  {

    const {isLoading, error, fetchProductByIdHandler} = useProducts();
    const [product, setProduct] = useState<IProduct>();
    const params = useParams();

    useEffect(() => {
        if (!params.id) return;
        fetchProductByIdHandler(parseInt(params.id)).then((data) => setProduct(data));  
      }, [])
         
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>


    return ( 
        <>
            <section id="product">
                <h2>{product?.name}</h2>
                <p>{product?.image}</p>
                <p>{product?.category}</p>
                <p>{product?.description}</p>
                <p>{product?.price}</p>
                <button>-</button>
                <button>+</button>
            </section>
        </>
    )
}