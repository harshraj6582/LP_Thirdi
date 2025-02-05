import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Uploading from "./Uploading";
import AdAnalysis from "./AdAnalysis";
import DownloadPDF from "./DownloadPDF";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Uploading />} />
        <Route path="/ad-analysis" element={<AdAnalysis />} />
        <Route path="/download-pdf" element={<DownloadPDF />} />
      </Routes>
    </Router>
  );
};

export default App;
