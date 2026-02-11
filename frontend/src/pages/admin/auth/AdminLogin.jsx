import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../lib/api";

export const AdminLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await apiRequest("/api/admin/auth/token", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            localStorage.setItem("admin_token", response.token);
            localStorage.setItem("admin_token_expires_at", String(response.expiresAt));

            navigate("/admin/dashboard", { replace: true });
        } catch (err) {
            setError(err.message || "Falha ao autenticar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold">Login Administrativo</h1>
                    <p className="text-sm opacity-80">Acesse para gerenciar estados.</p>

                    <form className="space-y-4 mt-4" onSubmit={handleLogin}>
                        <label className="form-control w-full">
                            <span className="label-text mb-1">Usuário</span>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text mb-1">Senha</span>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </label>

                        {error && <div className="alert alert-error text-sm">{error}</div>}

                        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
