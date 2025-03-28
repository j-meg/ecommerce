import { NavLink } from "react-router"

export const OrderConfirmation = () => {
    return (
        <>
            <h2>Tack för din beställning!</h2>
            <button><NavLink to={"/"}>Hem</NavLink></button>
        </>
    )
}