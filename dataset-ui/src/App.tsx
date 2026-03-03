import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  );
}

export default App;