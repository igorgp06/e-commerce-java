import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = { nome: "" };

export const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadCategorias = async () => {
        setLoading(true);
        try {
            const data = await apiRequestWithAdminToken("/api/categorias/");
            setCategorias(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Erro ao buscar categorias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCategorias(); }, []);

    const resetForm = () => { setFormData(INITIAL_FORM); setEditingId(null); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        try {
            if (editingId) {
                await apiRequestWithAdminToken(`/api/categorias/${editingId}`, { method: "PUT", body: JSON.stringify(formData) });
                setMessage("Categoria atualizada com sucesso.");
            } else {
                await apiRequestWithAdminToken("/api/categorias/", { method: "POST", body: JSON.stringify(formData) });
                setMessage("Categoria criada com sucesso.");
            }
            resetForm();
            await loadCategorias();
        } catch (err) {
            setError(err.message || "Erro ao salvar categoria");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Deseja excluir esta categoria?")) return;
        await apiRequestWithAdminToken(`/api/categorias/${id}`, { method: "DELETE" });
        await loadCategorias();
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Categorias</h1>
            <form className="card bg-base-100 shadow p-4 gap-3 flex" onSubmit={handleSubmit}>
                <input className="input input-bordered" placeholder="Nome da categoria" value={formData.nome} onChange={(e) => setFormData({ nome: e.target.value })} required />
                <div className="flex gap-2">
                    <button className="btn btn-primary" type="submit">{editingId ? "Salvar" : "Cadastrar"}</button>
                    {editingId && <button className="btn" type="button" onClick={resetForm}>Cancelar</button>}
                </div>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-error">{error}</div>}
            <div className="overflow-x-auto bg-base-100 shadow rounded-box">
                <table className="table">
                    <thead><tr><th>ID</th><th>Nome</th><th className="text-right">Ações</th></tr></thead>
                    <tbody>
                        {loading && <tr><td colSpan={3}>Carregando...</td></tr>}
                        {!loading && categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td><td>{categoria.nome}</td>
                                <td className="text-right space-x-2">
                                    <button className="btn btn-sm" onClick={() => { setEditingId(categoria.id); setFormData({ nome: categoria.nome }); }}>Editar</button>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(categoria.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
