import { useState } from "react";
import { ManageCustomers } from "./ManageCustomers";
import { CreateCustomer } from "./CreateCustomer";
import { UpdateCustomer } from "./UpdateCustomer";

export const Customers = () =>  {

        const [createCustomer, setCreateCustomer] = useState<boolean>(false);
        const changeCreateCustomerState = (createCustomerProps: boolean) => {
            setCreateCustomer(createCustomerProps)
        };
    
        const [updateCustomer, setUpdateCustomer] = useState<boolean>(false);
        const changeUpdateCustomerState = (updateCustomerProps: boolean) => {
            setUpdateCustomer(updateCustomerProps)
        };
    
        const [updateID, setUpdateID] = useState<number>(1);
        const changeUpdateIDState = (updateCustomerID: number) => {
            setUpdateID(updateCustomerID)
        };

    return ( 
        <>
            <h3>Kunder</h3>

            <button onClick={() => setCreateCustomer(true)}>Skapa ny kund</button>

            {createCustomer ? <CreateCustomer createCustomerProps={changeCreateCustomerState}/> : 
             updateCustomer ? <UpdateCustomer updateCustomerProps={changeUpdateCustomerState} updateCustomerID={updateID}/> : 
             <ManageCustomers updateCustomerProps={changeUpdateCustomerState} updateCustomerID={changeUpdateIDState}/>}
        </>
    )
};
