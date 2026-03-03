import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select a dataset!");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    navigate("/analysis", { state: response.data });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Sentiment Analyzer</h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <button className="hover:text-red-600">Home</button>
          <button className="hover:text-red-600">About</button>
        </div>
      </nav>

      {/* Center Card */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">

        <h2 className="text-4xl font-bold text-gray-800 mt-10 text-center">
          Upload & Analyze CSV
        </h2>

        <p className="text-gray-500 mt-4 mb-10 text-center">
          Upload your dataset and get sentiment analysis instantly
        </p>

        <div
          className={`w-full max-w-[520px] h-[240px] flex flex-col items-center justify-center 
          border-2 border-dashed rounded-2xl transition 
          ${dragActive ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
          }}
        >
          <label className="bg-red-600 text-white px-10 py-4 rounded-xl text-xl font-semibold cursor-pointer hover:bg-red-700 transition">
            Select CSV File
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>

          <p className="mt-4 text-gray-400">or drag & drop your CSV here</p>
        </div>

        {file && (
          <p className="mt-5 text-gray-700">
            Selected: <span className="font-semibold">{file.name}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Analyze Dataset
        </button>

      </div>

      <footer className="bg-white shadow-inner text-center py-4 text-gray-500">
        © 2026 Sentiment Analyzer
      </footer>

    </div>
  );
}

export default UploadPage;