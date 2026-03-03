import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    rows: number;
    accuracy: number;
  } | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a dataset first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(0);
      setResult(null);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            setProgress(percent);
          },
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed ❌ Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Sentiment Analyzer
        </h1>
        <div className="space-x-6 text-gray-600 font-medium">
          <button className="hover:text-red-600">Home</button>
          <button className="hover:text-red-600">About</button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center flex-grow">

        <h2 className="text-5xl font-bold text-gray-800 mt-10">
          Upload & Analyze CSV
        </h2>

        <p className="text-gray-500 mt-4 mb-10">
          Upload your dataset and get sentiment accuracy
        </p>

        {/* Upload Box */}
        <div
          className={`w-[520px] h-[240px] flex flex-col items-center justify-center 
          border-2 border-dashed rounded-2xl transition 
          ${dragActive ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <label className="bg-red-600 text-white px-10 py-4 rounded-xl text-xl font-semibold cursor-pointer hover:bg-red-700 transition">
            Select CSV File
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) =>
                e.target.files && handleFile(e.target.files[0])
              }
            />
          </label>

          <p className="mt-4 text-gray-400">
            or drag & drop your CSV here
          </p>
        </div>

        {/* Selected File */}
        {file && (
          <p className="mt-5 text-gray-700">
            Selected:{" "}
            <span className="font-semibold text-black">
              {file.name}
            </span>
          </p>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="w-[520px] mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">
              Uploading: {progress}%
            </p>
          </div>
        )}

        {/* Process Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Analyze Dataset"}
        </button>

        {/* Results Section */}
        {result && (
          <div className="mt-10 bg-white shadow-lg rounded-xl p-8 w-[520px] text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Analysis Result
            </h3>

            <p className="text-lg text-gray-600">
              Total Rows:{" "}
              <span className="font-semibold text-black">
                {result.rows}
              </span>
            </p>

            <p className="text-lg text-gray-600 mt-2">
              Accuracy:{" "}
              <span className="font-semibold text-green-600">
                {(result.accuracy * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner text-center py-4 text-gray-500">
        © 2026 Sentiment Analyzer. All rights reserved.
      </footer>

    </div>
  );
}

export default App;