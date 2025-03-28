import { useState, FormEvent } from "react";
import { ICustomerCreate } from "../models/ICustomer";
import { useCustomers } from "../hooks/useCustomers";

interface ICreateCustomerProps {
    createCustomerProps: (ccp: boolean) => void;
}

export const CreateCustomer = (props: ICreateCustomerProps) => {

    const [content, setContent] = useState<ICustomerCreate>({}); 

    const {isLoading, error, createCustomerHandler} = useCustomers();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createCustomerHandler(content)
    };
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            <section id="create-customer">
                <form onSubmit={handleSubmit}>
                    <label>Förnamn: 
                        <input type="text" name="firstname" onChange={(e) => (content.firstname = e.target.value)}/>
                    </label>
                    <label>Efternamn: 
                        <input type="text" name="lastname" onChange={(e) => (content.lastname = e.target.value)}/>
                    </label>
                    <label>Epost: 
                        <input type="text" name="email" onChange={(e) => (content.email = e.target.value)}/>
                    </label>
                    <label>Telefonnummer: 
                        <input type="text" name="phone" onChange={(e) => (content.phone = e.target.value)}/>
                    </label>
                    <label>Adress: 
                        <input type="text" name="street_address" onChange={(e) => (content.street_address = e.target.value)}/>
                    </label>
                    <label>Postkod: 
                        <input type="text" name="postal_code" onChange={(e) => (content.postal_code = e.target.value)}/>
                    </label>
                    <label>Stad: 
                        <input type="text" name="city" onChange={(e) => (content.city = e.target.value)}/>
                    </label>
                    <label>Land: 
                        <input type="text" name="country" onChange={(e) => (content.country = e.target.value)}/>
                    </label>

                    <button onClick={() => props.createCustomerProps(false)}>Tillbaka</button>
                    <button>Skapa</button>
                </form>
            </section>
        </>
    )
};
