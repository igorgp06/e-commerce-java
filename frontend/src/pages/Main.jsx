import { Outlet } from "react-router-dom"

export const Main = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">


            <main>
                <Outlet />
            </main>

        </div>
    )
}