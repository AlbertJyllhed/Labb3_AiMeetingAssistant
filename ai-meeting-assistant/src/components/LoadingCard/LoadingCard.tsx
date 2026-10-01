import "./LoadingCard.css";

function LoadingCard({ loadingText }: { loadingText: string }) {
    return (
        <div className="loading-card">
            <span className="loader"></span>
            <p>{loadingText}</p>
        </div>
    );
}

export default LoadingCard;
