import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./ErrorCard.css";

interface ErrorCardProps {
    error: string;
    backPath?: string;
}

function ErrorCard({ error, backPath }: ErrorCardProps) {
    return (
        <div className="error-card">
            <div className="error-row">
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p>{error}</p>
            </div>
            {backPath && (
                <Link to={backPath} className="back-link">
                    Tillbaka
                </Link>
            )}
        </div>
    );
}

export default ErrorCard;
