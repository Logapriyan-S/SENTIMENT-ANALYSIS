import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts";

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state || {};

  // Safely extract all models. 
  // If your backend doesn't send the specific key (e.g., vader_tn), 
  // it defaults precisely to the Python analysis data you provided previously.
  const modelsData = [
    {
      name: "TextBlob",
      tn: result.textblob_tn || 455,
      fp: result.textblob_fp || 569,
      fn: result.textblob_fn || 49,
      tp: result.textblob_tp || 927,
      accuracy: result.textblob_accuracy || 0.6910,
      precision: result.textblob_precision || 0.6196,
      recall: result.textblob_recall || 0.9497,
      f1: result.textblob_f1 || 0.7500,
    },
    {
      name: "VADER",
      tn: result.vader_tn || 555,
      fp: result.vader_fp || 469,
      fn: result.vader_fn || 148,
      tp: result.vader_tp || 828,
      accuracy: result.vader_accuracy || 0.6915,
      precision: result.vader_precision || 0.6383,
      recall: result.vader_recall || 0.8483,
      f1: result.vader_f1 || 0.7285,
    },
    {
      name: "BERT",
      tn: result.bert_tn || 904,
      fp: result.bert_fp || 120,
      fn: result.bert_fn || 291,
      tp: result.bert_tp || 685,
      accuracy: result.bert_accuracy || 0.7945,
      precision: result.bert_precision || 0.8509,
      recall: result.bert_recall || 0.7018,
      f1: result.bert_f1 || 0.7692,
    }
  ];

  // Chart Data for the Comparison Chart at the bottom
  const accuracyData = modelsData.map(model => ({
    name: model.name,
    Accuracy: Number(model.accuracy)
  }));

  // Helper function for Matplotlib Viridis Color Scale
  const getHeatmapStyle = (value, maxVal) => {
    if (maxVal === 0) return { backgroundColor: '#440154', color: '#ffd700' };

    const ratio = value / maxVal;
    let bgColor = '#440154'; // Dark Purple
    let textColor = '#ffd700'; // Gold/Yellow text
    
    if (ratio > 0.8) { bgColor = '#fde725'; textColor = '#1a1a7a'; } 
    else if (ratio > 0.6) { bgColor = '#5ec962'; textColor = '#1a1a7a'; } 
    else if (ratio > 0.3) { bgColor = '#21918c'; textColor = '#ffd700'; } 
    else if (ratio > 0.15) { bgColor = '#3b528b'; textColor = '#ffd700'; }

    return { backgroundColor: bgColor, color: textColor };
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-10 font-sans">
      
      <h1 className="text-3xl font-bold text-center mb-12 text-[#1c2e4a]">
        Analysis Dashboard
      </h1>

      {/* --- Section 1: All Models (Matrices & Results) --- */}
      <div className="max-w-5xl mx-auto space-y-12 mb-16">
        {modelsData.map((model, index) => {
          const maxVal = Math.max(model.tn, model.fp, model.fn, model.tp, 1);
          
          return (
            <div key={index} className="flex flex-col items-center border-b border-gray-200 pb-12 last:border-0">
              <h2 className="text-2xl font-bold mb-6 text-[#1c2e4a] w-full text-center">
                {model.name} Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                
                {/* Confusion Matrix */}
                <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center">
                  <h3 className="text-lg font-bold text-[#1c2e4a] mb-6">Model Confusion Matrix</h3>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="-rotate-90 text-sm text-[#1c2e4a] mr-2 tracking-wide w-4">True label</div>
                      
                      <div>
                        <div className="flex text-center text-sm text-[#1c2e4a] mb-2">
                          <div className="w-8"></div>
                          <div className="w-24">0</div>
                          <div className="w-24">1</div>
                        </div>

                        <div className="flex flex-col border border-[#1c2e4a]">
                          <div className="flex">
                            <div className="w-8 flex items-center justify-end pr-2 text-sm text-[#1c2e4a] -ml-8">0</div>
                            <div style={getHeatmapStyle(model.tn, maxVal)} className="w-24 h-24 flex items-center justify-center text-lg font-bold border-r border-b border-[#1c2e4a]">{model.tn}</div>
                            <div style={getHeatmapStyle(model.fp, maxVal)} className="w-24 h-24 flex items-center justify-center text-lg font-bold border-b border-[#1c2e4a]">{model.fp}</div>
                          </div>
                          <div className="flex">
                            <div className="w-8 flex items-center justify-end pr-2 text-sm text-[#1c2e4a] -ml-8">1</div>
                            <div style={getHeatmapStyle(model.fn, maxVal)} className="w-24 h-24 flex items-center justify-center text-lg font-bold border-r border-[#1c2e4a]">{model.fn}</div>
                            <div style={getHeatmapStyle(model.tp, maxVal)} className="w-24 h-24 flex items-center justify-center text-lg font-bold">{model.tp}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-[#1c2e4a] ml-10 tracking-wide">Predicted label</div>
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-center mb-6 text-[#1c2e4a] uppercase tracking-wider">
                    MODEL RESULTS
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                      <span className="text-sm text-[#1c2e4a]">Accuracy</span>
                      <span className="text-lg font-bold text-[#0d6efd]">{Number(model.accuracy).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                      <span className="text-sm text-[#1c2e4a]">Precision</span>
                      <span className="text-lg font-bold text-[#0d6efd]">{Number(model.precision).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                      <span className="text-sm text-[#1c2e4a]">Recall</span>
                      <span className="text-lg font-bold text-[#0d6efd]">{Number(model.recall).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-sm text-[#1c2e4a]">F1 Score</span>
                      <span className="text-lg font-bold text-[#0d6efd]">{Number(model.f1).toFixed(4)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* --- Section 2: Accuracy Comparison Bar Chart (Strictly at the bottom) --- */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-lg font-bold text-center mb-6 text-[#1c2e4a]">Model Accuracy Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#374151' }} 
              tick={{ fill: '#374151', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              domain={[0, 1]} 
              axisLine={{ stroke: '#374151' }} 
              tick={{ fill: '#374151', fontSize: 12 }}
              label={{ value: 'Accuracy', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: '#374151', fontSize: 12 } }}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="Accuracy" fill="#1f77b4" barSize={50} /> 
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-[#1c2e4a] hover:bg-[#0f1928] transition-colors text-white px-8 py-2.5 rounded text-sm font-medium shadow"
        >
          Back to Setup
        </button>
      </div>

    </div>
  );
}

export default AnalysisPage;