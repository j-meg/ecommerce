import { FormEvent, useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts';
import { IProduct, IProductUpdate} from "../models/IProduct";

interface IUpdateProductProps {
    updateProductProps: (upp: boolean) => void;
    updateProductID: number;
}

export const UpdateProduct = (props: IUpdateProductProps) => {

    const [content, setContent] = useState<IProductUpdate>({}); 
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProducts();

    const [product, setProduct] = useState<IProduct>();
    useEffect(() => {
        if (product) return;
        const fetchProduct = async () => {
            const data = await fetchProductByIdHandler(props.updateProductID);
            setProduct(data);
        }
        fetchProduct();
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!content.name) content.name = product?.name;
        if (!content.description) content.description = product?.description;
        if (!content.category) content.category = product?.category;
        if (!content.price) content.price = product?.price;
        if (!content.stock) content.stock = product?.stock;
        if (!content.image) content.image = product?.image;
        
        await updateProductHandler(props.updateProductID, content)
        props.updateProductProps(false);
    };
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            <section id="update-product">
                <form onSubmit={handleSubmit}>
                    <label>Namn: 
                        <input 
                            type="text" 
                            name="name" 
                            onChange={(e) => (content.name = e.target.value)} 
                            defaultValue={product?.name}
                        />
                    </label>

                    <label>Beskrivning: 
                        <textarea 
                            cols={30} 
                            rows={5} 
                            name="description" 
                            defaultValue={product?.description} 
                            onChange={(e) => (content.description = e.target.value)}
                        />
                    </label>

                    <label>Kategori: 
                        <input 
                            type="text" name="category" 
                            onChange={(e) => (content.category = e.target.value)} 
                            defaultValue={product?.category}
                        />
                    </label>

                    <label>Pris: 
                        <input 
                            type="number" 
                            name="price" 
                            onChange={(e) => (content.price = +e.target.value)} 
                            defaultValue={product?.price}
                        />
                    </label>

                    <label>Lager: 
                        <input 
                            type="number" 
                            name="stock" 
                            onChange={(e) => (content.stock = +e.target.value)} 
                            defaultValue={product?.stock}
                        />
                    </label>

                    <label>Bild: 
                        <input 
                            type="text" 
                            name="image" 
                            onChange={(e) => (content.image = e.target.value)} 
                            defaultValue={product?.image}
                        />
                    </label>

                    <button onClick={() => props.updateProductProps(false)}>Tillbaka</button>
                    <button>Uppdatera</button>
                </form>
            </section>
        </>
    )
};
