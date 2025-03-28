import { NavLink } from 'react-router'

export const Nav = () => {
    return (
    <>
        <nav id="main-nav">
            <ul>
                <li><NavLink to={"/"} className={({ isActive }) => (isActive ? " active" : "")}>Hem</NavLink></li>
                <li><NavLink to={"/products"} className={({ isActive }) => (isActive ? " active" : "")}>Produkter</NavLink></li>
                <li><NavLink to={"/admin"} className={({ isActive }) => (isActive ? " active" : "")}>Admin</NavLink></li>
                <li><NavLink to={"/cart"} className={({ isActive }) => (isActive ? " active" : "")}>Kundvagn</NavLink></li>
            </ul>
        </nav>
    </>
    )
};