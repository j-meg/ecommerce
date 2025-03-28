import { useEffect } from "react";
import { useCustomers } from "../hooks/useCustomers";

interface ICustomerProps {
    updateCustomerID: (id: number) => void;
    updateCustomerProps: (cpp: boolean) => void;
}

export const ManageCustomers = (props: ICustomerProps) => {

    const {customers, isLoading, error, fetchCustomersHandler, deleteCustomerHandler} = useCustomers();

    useEffect(() => { fetchCustomersHandler(); }, [])
         
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>


    return (
        <>            
            <table id="customer-table">
            <thead>
                <tr>
                    <th>ID: </th>
                    <th>Förnamn: </th>
                    <th>Efternamn: </th>
                    <th>Epost: </th>
                    <th>Telefon: </th>
                    <th>Adress: </th>
                    <th>Postkod: </th>
                    <th>Stad: </th>
                    <th>Land: </th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr className="table-item" key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastname}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.street_address}</td>
                        <td>{customer.postal_code}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>

                        <td>
                        <button onClick={() => {props.updateCustomerProps(true), props.updateCustomerID(customer.id)}}>Ändra</button>
                        </td>
                        <td>
                            <button onClick={() => {deleteCustomerHandler(customer.id)}}>Radera</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}