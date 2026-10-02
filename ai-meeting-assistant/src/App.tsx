import { Routes, Route } from "react-router";
import "./App.css";

import MeetingListPage from "./pages/MeetingListPage/MeetingListPage";
import MeetingDetailsPage from "./pages/MeetingDetailsPage/MeetingDetailsPage";
import ErrorCard from "./components/ErrorCard/ErrorCard";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<MeetingListPage />} />
                <Route path="/meetings/:id" element={<MeetingDetailsPage />} />
                <Route
                    path="*"
                    element={
                        <ErrorCard error="Sidan hittades inte." backPath="/" />
                    }
                />
            </Routes>
        </main>
    );
}

export default App;
