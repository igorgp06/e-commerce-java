import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = { nome: "" };

export const MarcasPage = () => {
    const [marcas, setMarcas] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);

    const loadMarcas = async () => {
        const data = await apiRequestWithAdminToken("/api/marcas/");
        setMarcas(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        const bootstrap = async () => {
            await loadMarcas();
        };
        bootstrap();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editingId) {
            await apiRequestWithAdminToken(`/api/marcas/${editingId}`, { method: "PUT", body: JSON.stringify(formData) });
        } else {
            await apiRequestWithAdminToken("/api/marcas/", { method: "POST", body: JSON.stringify(formData) });
        }
        setFormData(INITIAL_FORM);
        setEditingId(null);
        await loadMarcas();
    };

    return (
        <div className="space-y-4 text-left">
            <h1 className="app-title">Marcas</h1>
            <form className="app-surface flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
                <input className="app-input" placeholder="Nome da marca" value={formData.nome} onChange={(e) => setFormData({ nome: e.target.value })} required />
                <button className="app-btn" type="submit">{editingId ? "Salvar" : "Cadastrar"}</button>
            </form>
            <div className="app-table-wrap">
                <table className="app-table">
                    <thead><tr><th>ID</th><th>Nome</th><th className="text-right">Ações</th></tr></thead>
                    <tbody>
                        {marcas.map((marca) => (
                            <tr key={marca.id}>
                                <td>{marca.id}</td><td>{marca.nome}</td>
                                <td className="text-right space-x-2">
                                    <button className="app-btn app-btn-neutral app-btn-sm" onClick={() => { setEditingId(marca.id); setFormData({ nome: marca.nome }); }}>Editar</button>
                                    <button className="app-btn app-btn-danger app-btn-sm" onClick={async () => { await apiRequestWithAdminToken(`/api/marcas/${marca.id}`, { method: "DELETE" }); await loadMarcas(); }}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
