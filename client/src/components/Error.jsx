import BarnSplash from "./BarnSplash";

export default function Error() {
    return (
        <div
            className="md:flex md:flex-col md:justify-center md:content-center md:items-center"
        >
            <h2 className="text-center text-2xl mt-24"><span className="text-lime-700 font-bold">404</span>: Data Not Found</h2>
            <BarnSplash />
        </div>
    )
}
