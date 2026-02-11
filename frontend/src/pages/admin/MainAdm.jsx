import { Outlet } from "react-router-dom"
import { Sidebar } from "./layout/Sidebar"

export const MainAdm = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Sidebar />

            <main>
                <Outlet />
            </main>

        </div>
    )
}