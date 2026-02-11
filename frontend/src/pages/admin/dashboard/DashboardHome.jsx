import { Hero } from "./partials/Hero"

export const DashboardHome = () => {
    return (
        <div className="flex flex-col">
            <main id="hero" className="min-h-screen flex items-center justify-center">
                <Hero />
            </main>

            <section className="min-h-screen flex items-center justify-center">

            </section>

        </div>
    )
}