import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Recommendation from "@/pages/Recommendation";
import { routes } from "@/config/routes";
import { PantryProvider } from "./context/PantryContext";
function App() {
    return (
        <Router>
            <PantryProvider>
                <Routes>
                    <Route path={routes.HOME.path} element={<Home />} />
                    <Route
                        path={routes.RECOMMENDATION.path}
                        element={<Recommendation />}
                    />
                </Routes>
            </PantryProvider>
        </Router>
    );
}

export default App;
