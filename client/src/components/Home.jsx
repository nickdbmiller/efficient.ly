import BarnSplash from "./BarnSplash"

export default function Home() {
    return (
        <div
            className="md:flex md:flex-col md:justify-center md:content-center md:items-center"
        >
            <h2 
                className="text-xl"
            >
                Welcome <span className="text-lime-700 font-bold">Home</span>
            </h2>
            <p className="mt-6">efficient.ly empowers your decision making about your home.</p>
            <BarnSplash />
            <p className="mt-6">Here you can learn ways to make your home more efficient, save money, and protect the planet.</p>
        </div>
    )
}
