import { useState, useEffect, FormEvent } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { ICustomerUpdate, ICustomer } from "../models/ICustomer";

interface IUpdateCustomerProps {
    updateCustomerProps: (ucp: boolean) => void;
    updateCustomerID: number;
}

export const UpdateCustomer = (props: IUpdateCustomerProps) => {

    const [content, setContent] = useState<ICustomerUpdate>({}); 
    const {isLoading, error, fetchCustomerByIdHandler, updateCustomerHandler} = useCustomers();

    const [customer, setCustomer] = useState<ICustomer>();
    useEffect(() => {
        if (customer) return;
        const fetchCustomer = async () => {
            const data = await fetchCustomerByIdHandler(props.updateCustomerID);
            setCustomer(data);
        }
        fetchCustomer();
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!content.firstname) content.firstname = customer?.firstname;
        if (!content.lastname) content.lastname = customer?.lastname;
        if (!content.email) content.email = customer?.email;
        if (!content.phone) content.phone = customer?.phone;
        if (!content.street_address) content.street_address = customer?.street_address;
        if (!content.postal_code) content.postal_code = customer?.postal_code;
        if (!content.city) content.city = customer?.city;
        if (!content.country) content.country = customer?.country;

        await updateCustomerHandler(props.updateCustomerID, content)
        props.updateCustomerProps(false);
    };
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p> 

    return (
        <>
            <section id="update-customer">
                <form onSubmit={handleSubmit}>
                    <label>Förnamn: 
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={(e) => (content.firstname = e.target.value)} 
                            defaultValue={customer?.firstname}
                        />
                    </label>
                    <label>Efternamn: 
                        <input 
                            type="text" 
                            name="lastname" 
                            onChange={(e) => (content.lastname = e.target.value)} 
                            defaultValue={customer?.lastname}
                        />
                    </label>
                    <label>Epost: 
                        <input 
                            type="text" 
                            name="email" 
                            onChange={(e) => (content.email = e.target.value)} 
                            defaultValue={customer?.email}
                        />
                    </label>
                    <label>Telefonnummer: 
                        <input 
                            type="text" 
                            name="phone" 
                            onChange={(e) => (content.phone = e.target.value)} 
                            defaultValue={customer?.phone}
                        />
                    </label>
                    <label>Adress: 
                        <input 
                            type="text" 
                            name="street_address" 
                            onChange={(e) => (content.street_address = e.target.value)} 
                            defaultValue={customer?.street_address}
                        />
                    </label>
                    <label>Postkod: 
                        <input 
                            type="text" 
                            name="postal_code" 
                            onChange={(e) => (content.postal_code = e.target.value)} 
                            defaultValue={customer?.postal_code}
                        />
                    </label>
                    <label>Stad: 
                        <input 
                            type="text" 
                            name="city" 
                            onChange={(e) => (content.city = e.target.value)} 
                            defaultValue={customer?.city}
                        />
                    </label>
                    <label>Land: 
                        <input 
                            type="text" 
                            name="country" 
                            onChange={(e) => (content.country = e.target.value)} 
                            defaultValue={customer?.country}
                        />
                    </label>

                    <button onClick={() => props.updateCustomerProps(false)}>Tillbaka</button>
                    <button>Uppdatera</button>
                </form>
            </section>
        </>
    )
};
