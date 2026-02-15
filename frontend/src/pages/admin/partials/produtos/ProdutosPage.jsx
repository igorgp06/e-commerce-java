import { useEffect, useState } from "react";
import { apiRequestWithAdminToken } from "../../../../lib/api";

const INITIAL_FORM = {
    nome: "",
    descricaoCurta: "",
    descricaoLonga: "",
    precoCusto: "",
    precoVenda: "",
    marcaId: "",
    categoriaId: "",
};

export const ProdutosPage = () => {
    const [produtos, setProdutos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [imageFile, setImageFile] = useState(null);

    const loadData = async () => {
        const [produtosRes, marcasRes, categoriasRes] = await Promise.all([
            apiRequestWithAdminToken("/api/produtos/"),
            apiRequestWithAdminToken("/api/marcas/"),
            apiRequestWithAdminToken("/api/categorias/"),
        ]);
        setProdutos(Array.isArray(produtosRes) ? produtosRes : []);
        setMarcas(Array.isArray(marcasRes) ? marcasRes : []);
        setCategorias(Array.isArray(categoriasRes) ? categoriasRes : []);
    };

    useEffect(() => {
        const bootstrap = async () => {
            await loadData();
        };
        bootstrap();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            nome: formData.nome,
            descricaoCurta: formData.descricaoCurta,
            descricaoLonga: formData.descricaoLonga,
            precoCusto: Number(formData.precoCusto || 0),
            precoVenda: Number(formData.precoVenda),
            marca: { id: Number(formData.marcaId) },
            categoria: { id: Number(formData.categoriaId) },
        };

        const produto = await apiRequestWithAdminToken("/api/produtos/", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (imageFile && produto?.id) {
            const data = new FormData();
            data.append("id_produto", produto.id);
            data.append("file", imageFile);
            await apiRequestWithAdminToken("/api/produto-imagens/", { method: "POST", body: data });
        }

        setFormData(INITIAL_FORM);
        setImageFile(null);
        await loadData();
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <form className="card bg-base-100 shadow p-4 grid md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
                <input className="input input-bordered" placeholder="Nome" value={formData.nome} onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))} required />
                <input className="input input-bordered" placeholder="Descrição curta" value={formData.descricaoCurta} onChange={(e) => setFormData((prev) => ({ ...prev, descricaoCurta: e.target.value }))} />
                <textarea className="textarea textarea-bordered md:col-span-2" placeholder="Descrição longa" value={formData.descricaoLonga} onChange={(e) => setFormData((prev) => ({ ...prev, descricaoLonga: e.target.value }))} />
                <input className="input input-bordered" type="number" step="0.01" placeholder="Preço de custo" value={formData.precoCusto} onChange={(e) => setFormData((prev) => ({ ...prev, precoCusto: e.target.value }))} />
                <input className="input input-bordered" type="number" step="0.01" placeholder="Preço de venda" value={formData.precoVenda} onChange={(e) => setFormData((prev) => ({ ...prev, precoVenda: e.target.value }))} required />
                <select className="select select-bordered" value={formData.marcaId} onChange={(e) => setFormData((prev) => ({ ...prev, marcaId: e.target.value }))} required>
                    <option value="">Selecione a marca</option>
                    {marcas.map((marca) => <option key={marca.id} value={marca.id}>{marca.nome}</option>)}
                </select>
                <select className="select select-bordered" value={formData.categoriaId} onChange={(e) => setFormData((prev) => ({ ...prev, categoriaId: e.target.value }))} required>
                    <option value="">Selecione a categoria</option>
                    {categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>)}
                </select>
                <input className="file-input file-input-bordered md:col-span-2" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                <button className="btn btn-primary md:col-span-2" type="submit">Cadastrar produto</button>
            </form>
            <div className="overflow-x-auto bg-base-100 shadow rounded-box">
                <table className="table"><thead><tr><th>ID</th><th>Nome</th><th>Marca</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr></thead><tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td><td>{produto.nome}</td><td>{produto.marca?.nome}</td><td>{produto.categoria?.nome}</td><td>R$ {Number(produto.precoVenda || 0).toFixed(2)}</td>
                            <td><button className="btn btn-sm btn-error" onClick={async () => { await apiRequestWithAdminToken(`/api/produtos/${produto.id}`, { method: "DELETE" }); await loadData(); }}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody></table>
            </div>
        </div>
    );
};
