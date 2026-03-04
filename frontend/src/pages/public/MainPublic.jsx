import { useNavigate, Outlet } from "react-router-dom";
import { Header } from "./layout/Header";

export const MainPublic = () => {

    return (
        <div>
            <Header/>

            <div className="flex min-h-screen flex-col lg:min-w-0">

                <main className="container flex-1 overflow-auto lg:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};