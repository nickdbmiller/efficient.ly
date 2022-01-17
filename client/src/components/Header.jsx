import Navbar from "./Navbar"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex-col justify-start 
        sm:justify-around bg-lime-900 px-4 pt-4 shadow-xl border-b-2 border-lime-1000"
        >
            <a
                className="flex-row inline-flex rounded-lg text-lime-400 text-2xl font-bold
                hover:text-lime-300 hover:-translate-y-0.5 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                active:text-lime-500"
                href="https://github.com/nickdbmiller/efficient.ly"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="h-10"
                    src="../../favicon.ico"
                    alt="efficient.ly lightning bolt logo."
                />
                <h1 
                    className=""
                >
                    efficient.ly
                </h1>
            </a>
            <Navbar />
        </header>
    )
}
