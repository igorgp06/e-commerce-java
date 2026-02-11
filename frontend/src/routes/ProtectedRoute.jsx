import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const location = useLocation();

    const token = localStorage.getItem("admin_token");
    const expiresAt = Number(localStorage.getItem("admin_token_expires_at"));
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (!token || !expiresAt || nowInSeconds >= expiresAt) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expires_at");
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
}
