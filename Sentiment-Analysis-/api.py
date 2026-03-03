from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from transformers import pipeline
from sklearn.metrics import accuracy_score

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading BERT model...")
model = pipeline("sentiment-analysis")
print("Model loaded")

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    def predict(text):
        result = model(text[:512])[0]
        return 1 if result["label"] == "POSITIVE" else 0

    df["pred"] = df["clean"].apply(predict)

    acc = accuracy_score(df["sentiment"], df["pred"])

    return {
        "rows": len(df),
        "accuracy": float(acc)
    }