import { FormEvent, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { IProductCreate } from "../models/IProduct";

interface ICreateProductProps {
    createProductProps: (cpp: boolean) => void;
}

export const CreateProduct = (props: ICreateProductProps) => {

    const [content, setContent] = useState<IProductCreate>({}); 

    const {isLoading, error, createProductHandler} = useProducts();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createProductHandler(content)
    };
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            <section id="create-product">
                <form onSubmit={handleSubmit}>
                    <label>Namn: 
                        <input type="text" name="name" onChange={(e) => (content.name = e.target.value)}/>
                    </label>
                    <label>Beskrivning: 
                        <textarea 
                            cols={30} 
                            rows={5} 
                            name="description" 
                            defaultValue={'Säsong: \nUtseenede: \nSmak:'} 
                            onChange={(e) => (content.description = e.target.value)}
                        />
                    </label>
                    <label>Kategori: 
                        <input type="text" name="category" onChange={(e) => (content.category = e.target.value)}/>
                    </label>
                    <label>Pris: 
                        <input type="number" name="price" onChange={(e) => (content.price = +e.target.value)}/>
                    </label>
                    <label>Lager: 
                        <input type="number" name="stock" onChange={(e) => (content.stock = +e.target.value)}/>
                    </label>
                    <label>Bild: 
                        <input type="text" name="image" defaultValue={content.image = ''} onChange={(e) => (content.image = e.target.value)}/>
                    </label>

                    <button onClick={() => props.createProductProps(false)}>Tillbaka</button>
                    <button>Skapa</button>
                </form>
            </section>
        </>
    )
};
