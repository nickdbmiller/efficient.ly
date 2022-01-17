import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="text-lg px-4 py-4">
            <ul className="flex justify-evenly text-lime-400">
                <li
                    className="hover:text-lime-300 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                    active:text-lime-500"
                >
                    <Link to="/">Home</Link>
                </li>
                <li
                    className="hover:text-lime-300 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                    active:text-lime-500"
                >
                    <Link to="/info">Info</Link>
                </li>
                <li
                    className="hover:text-lime-300 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                    active:text-lime-500"
                >
                    <Link to="/tools">Tools</Link>
                </li>
                <li
                    className="hover:text-lime-300 hover:-translate-y-0.5 transform transition
                    focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50
                    active:text-lime-500"
                >
                    <Link to="/saved">Saved</Link>
                </li>
            </ul>
        </nav>
    )
}
