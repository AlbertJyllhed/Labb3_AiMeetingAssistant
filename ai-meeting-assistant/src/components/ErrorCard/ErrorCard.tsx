import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./ErrorCard.css";

function ErrorCard({ error }: { error: string }) {
    return (
        <div className="error-card">
            <FontAwesomeIcon icon={faCircleExclamation} />
            <p>{error}</p>
            <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
    );
}

export default ErrorCard;
