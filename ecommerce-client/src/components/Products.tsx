import { useState } from "react";
import { CreateProduct } from "./CreateProduct";
import { ManageProducts } from "./ManageProducts";
import { UpdateProduct } from "./UpdateProduct";

export const Products = () =>  {

    const [createProduct, setCreateProduct] = useState<boolean>(false);
    const changeCreateProductState = (createProductProps: boolean) => {
        setCreateProduct(createProductProps)
    };

    const [updateProduct, setUpdateProduct] = useState<boolean>(false);
    const changeUpdateProductState = (updateProductProps: boolean) => {
        setUpdateProduct(updateProductProps)
    };

    const [updateID, setUpdateID] = useState<number>(1);
    const changeUpdateIDState = (updateProductID: number) => {
        setUpdateID(updateProductID)
    };

    return ( 
        <>
            <h3>Produkter</h3>

            <button onClick={() => setCreateProduct(true)}>Skapa ny produkt</button>
            {createProduct ? <CreateProduct createProductProps={changeCreateProductState}/> : 
             updateProduct ? <UpdateProduct updateProductProps={changeUpdateProductState} updateProductID={updateID}/> : 
             <ManageProducts updateProductProps={changeUpdateProductState} updateProductID={changeUpdateIDState}/>}

        </>
    )
}