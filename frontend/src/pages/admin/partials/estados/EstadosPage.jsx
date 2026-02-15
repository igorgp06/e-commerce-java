import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = { nome: "", sigla: "" };

export const EstadosPage = () => {
    const [estados, setEstados] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadEstados = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await apiRequestWithAdminToken("/api/estados/");
            setEstados(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Erro ao buscar estados");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEstados();
    }, []);

    const resetForm = () => {
        setFormData(INITIAL_FORM);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        const payload = { nome: formData.nome.trim(), sigla: formData.sigla.trim().toUpperCase() };

        try {
            if (editingId) {
                await apiRequestWithAdminToken(`/api/estados/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
                setMessage("Estado atualizado com sucesso.");
            } else {
                await apiRequestWithAdminToken("/api/estados/", { method: "POST", body: JSON.stringify(payload) });
                setMessage("Estado criado com sucesso.");
            }

            resetForm();
            await loadEstados();
        } catch (err) {
            setError(err.message || "Erro ao salvar estado");
        }
    };

    return (
        <div className="space-y-4 text-left">
            <h1 className="app-title">Estados</h1>
            <form className="app-surface flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
                <input className="app-input md:col-span-1" placeholder="Nome do estado" value={formData.nome} onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))} required />
                <input className="app-input" placeholder="Sigla" value={formData.sigla} onChange={(event) => setFormData((prev) => ({ ...prev, sigla: event.target.value }))} maxLength={2} required />
                <div className="md:col-span-1 flex gap-2">
                    <button className="app-btn md:col-span-2" type="submit">{editingId ? "Salvar alterações" : "Cadastrar"}</button>
                    {editingId && <button className="app-btn app-btn-neutral" type="button" onClick={resetForm}>Cancelar edição</button>}
                </div>
            </form>

            {message && <div className="app-alert-success">{message}</div>}
            {error && <div className="app-alert-error">{error}</div>}

            <div className="app-table-wrap">
                <table className="app-table">
                    <thead><tr><th>ID</th><th>Nome</th><th>Sigla</th><th className="text-right">Ações</th></tr></thead>
                    <tbody>
                        {loading && <tr><td colSpan={4}>Carregando...</td></tr>}
                        {!loading && estados.length === 0 && <tr><td colSpan={4}>Nenhum estado cadastrado.</td></tr>}
                        {!loading && estados.map((estado) => (
                            <tr key={estado.id}>
                                <td>{estado.id}</td><td>{estado.nome}</td><td>{estado.sigla}</td>
                                <td className="text-right flex justify-end gap-2">
                                    <button className="app-btn app-btn-neutral app-btn-sm" onClick={() => { setEditingId(estado.id); setFormData({ nome: estado.nome, sigla: estado.sigla }); }}>Editar</button>
                                    <button className="app-btn app-btn-danger app-btn-sm" onClick={async () => { await apiRequestWithAdminToken(`/api/estados/${estado.id}`, { method: "DELETE" }); if (editingId === estado.id) resetForm(); await loadEstados(); }}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};
