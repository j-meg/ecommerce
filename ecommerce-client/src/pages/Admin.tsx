import { useState } from "react";
import { Products } from "../components/Products";
import { Customers } from "../components/Customers";
import { Orders } from "../components/Orders";


export const Admin = () =>  {

    const [showPage, setShowPage] = useState<string>("");

    return ( 
        <>
            <h2>Admin</h2>
            <nav>
                <button onClick={() => setShowPage('products')}>Produkter</button>
                <button onClick={() => setShowPage('customers')}>Kunder</button>
                <button onClick={() => setShowPage('orders')}>Beställningar</button>
            </nav>

            {showPage === 'products' ? <Products /> :  
             showPage === 'customers' ? <Customers /> : 
             showPage === 'orders' ? <Orders /> : 
             <h3>Start</h3>}
        </>
    )
};