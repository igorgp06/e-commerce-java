import { Link } from "react-router-dom"


export const NotFound = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center px-4">
            <div className="container max-w-4xl mx-auto text-center">

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Erro 404 - Página não encontrada!
                </h1>

                <p className="text-3xl mb-8 font-bold">
                    A página que você está procurando não existe ou foi removida.
                </p>

                <Link to="/" className="inline-block px-6 py-2 font-semibold rounded-md border border-gray-300">
                    Voltar para a página inicial
                </Link>
            </div>

        </div>
    )
}