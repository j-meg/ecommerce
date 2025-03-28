import { useState } from "react";
import { ManageOrders } from "./ManageOrders";
import { UpdateOrder } from "./UpdateOrder";

export const Orders = () => {
    
    const [updateOrder, setUpdateOrder] = useState<boolean>(false);
    const changeUpdateOrderState = (updateOrderProps: boolean) => {
        setUpdateOrder(updateOrderProps)
    };
    
    const [updateID, setUpdateID] = useState<number>(1);
    const changeUpdateIDState = (updateOrderID: number) => {
        setUpdateID(updateOrderID)
    };

    return ( 
        <>
            <h3>Beställningar</h3>
            
            {updateOrder ? <UpdateOrder updateOrderProps={changeUpdateOrderState} updateOrderID={updateID}/> : 
             <ManageOrders updateOrderProps={changeUpdateOrderState} updateOrderID={changeUpdateIDState}/>}

        </>
    )
}
