import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";

interface IProductProps {
    updateProductID: (id: number) => void;
    updateProductProps: (cpp: boolean) => void;
}

export const ManageProducts = (props: IProductProps) => {
    const {products, isLoading, error, fetchProductsHandler, deleteProductHandler} = useProducts();

    useEffect(() => {fetchProductsHandler()}, [])

         
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    
    return (
        <>
            <table id="product-table">
                <thead>
                    <tr>
                        <th>Bild: </th>
                        <th>ID: </th>
                        <th>Namn: </th>
                        <th>Kategori: </th>
                        <th>Beskirvning: </th>
                        <th>Pris: </th>
                        <th>Lager: </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className="table-item" key={product.id}>
                            <td>{product.image}</td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>

                            <td>
                                <button onClick={() => {props.updateProductProps(true), props.updateProductID(product.id)}}>Ändra</button>
                            </td>
                            <td>
                                <button onClick={() => {deleteProductHandler(product.id)}}>Radera</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};