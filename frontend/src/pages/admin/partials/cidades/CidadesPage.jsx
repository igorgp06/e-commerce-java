import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = { nome: "", estadoId: "" };

export const CidadesPage = () => {
    const [cidades, setCidades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);

    const loadData = async () => {
        const [cidadesRes, estadosRes] = await Promise.all([
            apiRequestWithAdminToken("/api/cidades/"),
            apiRequestWithAdminToken("/api/estados/"),
        ]);
        setCidades(Array.isArray(cidadesRes) ? cidadesRes : []);
        setEstados(Array.isArray(estadosRes) ? estadosRes : []);
    };

    useEffect(() => {
        const bootstrap = async () => {
            await loadData();
        };
        bootstrap();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { nome: formData.nome, estado: { id: Number(formData.estadoId) } };
        if (editingId) {
            await apiRequestWithAdminToken(`/api/cidades/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
        } else {
            await apiRequestWithAdminToken("/api/cidades/", { method: "POST", body: JSON.stringify(payload) });
        }
        setFormData(INITIAL_FORM);
        setEditingId(null);
        await loadData();
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Cidades</h1>
            <form className="card bg-base-100 shadow p-4 grid md:grid-cols-3 gap-3" onSubmit={handleSubmit}>
                <input className="input input-bordered md:col-span-2" placeholder="Nome da cidade" value={formData.nome} onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))} required />
                <select className="select select-bordered" value={formData.estadoId} onChange={(e) => setFormData((prev) => ({ ...prev, estadoId: e.target.value }))} required>
                    <option value="">Selecione o estado</option>
                    {estados.map((estado) => <option key={estado.id} value={estado.id}>{estado.nome} ({estado.sigla})</option>)}
                </select>
                <button className="btn btn-primary md:col-span-3" type="submit">{editingId ? "Salvar" : "Cadastrar"}</button>
            </form>
            <div className="overflow-x-auto bg-base-100 shadow rounded-box">
                <table className="table"><thead><tr><th>ID</th><th>Cidade</th><th>Estado</th><th>Ações</th></tr></thead><tbody>
                    {cidades.map((cidade) => (
                        <tr key={cidade.id}>
                            <td>{cidade.id}</td><td>{cidade.nome}</td><td>{cidade.estado?.nome}</td>
                            <td className="space-x-2">
                                <button className="btn btn-sm" onClick={() => { setEditingId(cidade.id); setFormData({ nome: cidade.nome, estadoId: cidade.estado?.id?.toString() || "" }); }}>Editar</button>
                                <button className="btn btn-sm btn-error" onClick={async () => { await apiRequestWithAdminToken(`/api/cidades/${cidade.id}`, { method: "DELETE" }); await loadData(); }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody></table>
            </div>
        </div>
    );
};
