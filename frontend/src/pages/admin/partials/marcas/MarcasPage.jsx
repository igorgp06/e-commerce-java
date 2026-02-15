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
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Marcas</h1>
            <form className="card bg-base-100 shadow p-4 gap-3 flex" onSubmit={handleSubmit}>
                <input className="input input-bordered" placeholder="Nome da marca" value={formData.nome} onChange={(e) => setFormData({ nome: e.target.value })} required />
                <button className="btn btn-primary" type="submit">{editingId ? "Salvar" : "Cadastrar"}</button>
            </form>
            <div className="overflow-x-auto bg-base-100 shadow rounded-box">
                <table className="table">
                    <thead><tr><th>ID</th><th>Nome</th><th>Ações</th></tr></thead>
                    <tbody>
                        {marcas.map((marca) => (
                            <tr key={marca.id}>
                                <td>{marca.id}</td><td>{marca.nome}</td>
                                <td className="space-x-2">
                                    <button className="btn btn-sm" onClick={() => { setEditingId(marca.id); setFormData({ nome: marca.nome }); }}>Editar</button>
                                    <button className="btn btn-sm btn-error" onClick={async () => { await apiRequestWithAdminToken(`/api/marcas/${marca.id}`, { method: "DELETE" }); await loadMarcas(); }}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
