import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";
import { Link } from "react-router";
import { CartItem } from "../models/CartItem";
import { IProduct } from "../models/IProduct";
import { ICartActionType } from "../reducers/CartReducer";
import { useCart } from "../hooks/useCart";

export const Products = () =>  {

    const {products, isLoading, error, fetchProductsHandler} = useProducts();
    useEffect(() => {
        fetchProductsHandler();
    }, []);
         
    const { dispatch } = useCart();
    const handleAddToCart = (product: IProduct, quantity: number) => {
        dispatch({
            type: ICartActionType.ADD_ITEM,
            payload: new CartItem(product, quantity)
        })
    };

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return ( 
        <>
            <h2>Våra Produkter</h2>

            <section id="product-list">
            { products.map((product) => (
                    <article className="list-group-item" key={product.id}>
                        <section>
                            <p>{product.image}</p>
                            <Link to={`/product/${product['id']}`}>{product.name}</Link>
                            <p>{product.price}</p>
                        </section>
                        <button onClick={() => handleAddToCart(product, 1)}>+</button>
                    </article>
                ))
            }
            </section>
        </>
    )
}

