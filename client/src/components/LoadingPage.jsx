import BarnSplash from "./BarnSplash";

export default function LoadingPage() {
    return (
        <div
            className="md:flex md:flex-col md:justify-center md:content-center md:items-center"
        >
            <h2 className="text-center text-2xl mt-24 text-lime-700">Loading...</h2>
            <BarnSplash />
        </div>
    )
}
