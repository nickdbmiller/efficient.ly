import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Footer() {
    return (
        <footer className="fixed inset-x-0 bottom-0 w-full flex flex-col justify-between items-center bg-lime-900 py-1">
            <div className="flex">
                <a
                    className = "mb-2 mx-4 rounded-lg text-lime-400 text-3xl hover:text-lime-300 hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50 active:text-lime-500"
                    href="https://www.linkedin.com/in/ndbmiller"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>

                <a
                    className = "mb-2 mx-4 rounded-lg text-lime-400 text-3xl hover:text-lime-300 hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus:ring-offset-2 focus:ring-lime-400 focus:ring-opacity-50 active:text-lime-500"
                    href="https://github.com/nickdbmiller"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faGithubSquare} />
                </a>
            </div>

            <div className="text-lime-1000">🄯 Nicholas Barrett-Miller 2022</div>
        </footer>
    )
}
