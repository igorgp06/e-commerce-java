import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = {
    nome: "",
    cpf: "",
    email: "",
    endereco: "",
    cep: "",
    cidadeId: "",
};

export const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);

    const loadData = async () => {
        const [clientesRes, cidadesRes] = await Promise.all([
            apiRequestWithAdminToken("/api/clientes/"),
            apiRequestWithAdminToken("/api/cidades/"),
        ]);
        setClientes(Array.isArray(clientesRes) ? clientesRes : []);
        setCidades(Array.isArray(cidadesRes) ? cidadesRes : []);
    };

    useEffect(() => {
        const bootstrap = async () => {
            await loadData();
        };
        bootstrap();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { ...formData, cidade: { id: Number(formData.cidadeId) } };
        delete payload.cidadeId;
        await apiRequestWithAdminToken("/api/clientes/", { method: "POST", body: JSON.stringify(payload) });
        setFormData(INITIAL_FORM);
        await loadData();
    };

    return (
        <div className="space-y-4 text-left">
            <h1 className="app-title">Clientes</h1>
            <form className="app-surface flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
                <input className="app-input" placeholder="Nome" value={formData.nome} onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))} required />
                <input className="app-input" placeholder="CPF" value={formData.cpf} onChange={(e) => setFormData((prev) => ({ ...prev, cpf: e.target.value }))} required />
                <input className="app-input" placeholder="E-mail" type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required />
                <input className="app-input" placeholder="CEP" value={formData.cep} onChange={(e) => setFormData((prev) => ({ ...prev, cep: e.target.value }))} required />
                <input className="app-input md:col-span-2" placeholder="Endereço" value={formData.endereco} onChange={(e) => setFormData((prev) => ({ ...prev, endereco: e.target.value }))} required />
                <select className="app-input md:col-span-2" value={formData.cidadeId} onChange={(e) => setFormData((prev) => ({ ...prev, cidadeId: e.target.value }))} required>
                    <option value="">Selecione a cidade</option>
                    {cidades.map((cidade) => <option key={cidade.id} value={cidade.id}>{cidade.nome} - {cidade.estado?.sigla}</option>)}
                </select>
                <button className="app-btn md:col-span-2" type="submit">Cadastrar cliente</button>
            </form>

            <div className="app-table-wrap">
                <table className="app-table"><thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Cidade</th><th className="text-right">Ações</th></tr></thead><tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td><td>{cliente.nome}</td><td>{cliente.email}</td><td>{cliente.cidade?.nome}</td>
                            <td className="text-right">
                                <button className="app-btn app-btn-danger app-btn-sm" onClick={async () => { await apiRequestWithAdminToken(`/api/clientes/${cliente.id}`, { method: "DELETE" }); await loadData(); }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody></table>
            </div>
        </div>
    );
};
