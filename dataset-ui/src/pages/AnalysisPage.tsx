import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) return <div>No data</div>;

  const pieData = [
    { name: "Positive", value: result.positive_predictions },
    { name: "Negative", value: result.negative_predictions }
  ];

  const barData = [
    { name: "Accuracy", value: result.accuracy * 100 },
    { name: "Precision", value: result.precision * 100 },
    { name: "Recall", value: result.recall * 100 },
    { name: "F1 Score", value: result.f1_score * 100 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-12">
        Sentiment Analysis Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        {[
          { title: "Accuracy", value: result.accuracy, color: "text-green-600" },
          { title: "Precision", value: result.precision, color: "text-blue-600" },
          { title: "Recall", value: result.recall, color: "text-purple-600" },
          { title: "F1 Score", value: result.f1_score, color: "text-red-600" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">{item.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {(item.value * 100).toFixed(2)}%
            </p>
          </div>
        ))}

      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-center mb-6">
            Sentiment Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={110} label>
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-center mb-6">
            Model Performance Metrics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Confusion Matrix */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-xl font-semibold text-center mb-6">
          Confusion Matrix
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center">

          <div className="bg-green-100 p-6 rounded-lg">
            <p className="text-sm text-gray-600">True Positive</p>
            <p className="text-2xl font-bold text-green-600">{result.tp}</p>
          </div>

          <div className="bg-red-100 p-6 rounded-lg">
            <p className="text-sm text-gray-600">False Positive</p>
            <p className="text-2xl font-bold text-red-600">{result.fp}</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg">
            <p className="text-sm text-gray-600">False Negative</p>
            <p className="text-2xl font-bold text-yellow-600">{result.fn}</p>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg">
            <p className="text-sm text-gray-600">True Negative</p>
            <p className="text-2xl font-bold text-blue-600">{result.tn}</p>
          </div>

        </div>
      </div>

      {/* Footer Button */}
      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800"
        >
          Analyze Another Dataset
        </button>
      </div>

    </div>
  );
}

export default AnalysisPage;