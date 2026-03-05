import { Outlet } from "react-router-dom";
import { Header } from "./layout/Header";


export const MainPublic = () => {

    return (
        <div>
            <Header />

            <div className="flex min-h-screen flex-col lg:min-w-0">

                <main className="container flex-1 overflow-auto pt-24 lg:px-6 lg:pt-28">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};