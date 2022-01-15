import BarnSplash from "./BarnSplash"

export default function Home() {
    return (
        <div>
            <h2 
                className="text-xl"
            >
                Welcome <span className="text-lime-700">Home</span>
            </h2>
            <p className="mt-6">efficient.ly empowers your decision making about your home.</p>
            <BarnSplash />
            <p className="mt-6">Here you can learn ways to make your home more efficient, save money, and protect the planet.</p>
        </div>
    )
}
