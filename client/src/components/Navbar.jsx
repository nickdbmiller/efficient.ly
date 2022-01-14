import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/info">Info</Link>
                </li>
                <li>
                    <Link to="/tools">Tools</Link>
                </li>
                <li>
                    <Link to="/saved">Saved</Link>
                </li>
            </ul>
        </nav>
    )
}
