
# 🚀 Sentiment Analysis Dashboard

A full-stack Sentiment Analysis web application built using:

- ⚡ FastAPI (Backend API)
- ⚛️ React + Vite + Tailwind CSS (Frontend)
- 🧠 TextBlob (NLP Model)
- 📊 Recharts (Data Visualization)

This project allows users to upload a CSV dataset and get detailed sentiment analysis metrics with interactive charts.

---

## 📌 Features

- Upload CSV Dataset
- Automatic Sentiment Prediction
- Accuracy, Precision, Recall, F1 Score
- Confusion Matrix
- Sentiment Distribution Pie Chart
- Model Performance Bar Graph
- Clean & Modern Dashboard UI

---

## 📂 Project Structure


SENTIMENT-ANALYSIS-OVERALL/
│
├── dataset-ui/ # React Frontend
│ ├── src/
│ ├── package.json
│ └── ...
│
├── Sentiment-Analysis/ # FastAPI Backend
│ ├── api.py
│ ├── venv/
│ └── ...
│
└── README.md


---

## 🧠 How It Works

1. User uploads a CSV file.
2. Backend reads required columns:
   - `clean` (text column)
   - `sentiment` (actual label: 0 or 1)
3. TextBlob predicts sentiment.
4. Backend calculates:
   - Accuracy
   - Precision
   - Recall
   - F1 Score
   - Confusion Matrix
5. Frontend displays:
   - KPI Cards
   - Pie Chart
   - Bar Chart
   - Confusion Matrix Grid

---

## 📊 Expected CSV Format

Your dataset must contain:

| clean | sentiment |
|-------|----------|
| text  | 0 or 1   |

Example:


clean,sentiment
I love this product,1
This is bad,0


---

# ⚙️ Backend Setup (FastAPI)

### 1️⃣ Navigate to backend folder


cd Sentiment-Analysis


### 2️⃣ Create virtual environment


python -m venv venv


### 3️⃣ Activate environment (Windows)


venv\Scripts\activate


### 4️⃣ Install dependencies


pip install fastapi uvicorn pandas textblob scikit-learn


### 5️⃣ Run server


uvicorn api:app --reload --port 8000


Open:

http://127.0.0.1:8000/docs


---

# 🎨 Frontend Setup (React + Vite)

### 1️⃣ Navigate to frontend


cd dataset-ui


### 2️⃣ Install dependencies


npm install


or


pnpm install


### 3️⃣ Start development server


npm run dev


Open:

http://localhost:5173


---

# 📈 API Endpoint

### POST `/analyze/`

Upload CSV file using form-data.

### Example Response

```json
{
  "accuracy": 0.875,
  "precision": 0.85,
  "recall": 0.90,
  "f1_score": 0.87,
  "positive_predictions": 5,
  "negative_predictions": 3,
  "tp": 4,
  "tn": 3,
  "fp": 1,
  "fn": 0
}
🛠 Tech Stack
Layer	Technology
Frontend	React + Vite + Tailwind
Backend	FastAPI
NLP Model	TextBlob
Visualization	Recharts
Metrics	Scikit-learn
🎯 Future Improvements

User Authentication

Upload History Storage

Export PDF Report

Dark Mode UI

Cloud Deployment (Render + Vercel)
