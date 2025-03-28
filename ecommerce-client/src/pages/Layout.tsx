import { Outlet } from "react-router";
import { Nav } from "../components/Nav";
import "./../styles/layout.css"

export const Layout = () => {
    return (
        <>
            <header>
                <Nav />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <div>sociala media, kontakt m.m.</div>
            </footer>
        </>
    );
};