import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Footer() {
    return (
        <footer>
            <span className = "footer-icon">
                <a href="https://www.linkedin.com/in/ndbmiller" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </span>
            <span className = "footer-icon">
                <a href="https://github.com/nickdbmiller" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithubSquare} />
                </a>
            </span>
            <div>🄯 Nicholas Barrett-Miller 2022</div>
        </footer>
    )
}
