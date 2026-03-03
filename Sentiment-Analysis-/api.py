from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

from textblob import TextBlob
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)

app = FastAPI()

# CORS (Allow frontend at Vite port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# SENTIMENT PREDICTION FUNCTION
# -----------------------------
def predict_sentiment(text):
    polarity = TextBlob(str(text)).sentiment.polarity
    return 1 if polarity > 0 else 0


# -----------------------------
# API ROUTE
# -----------------------------
@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):

    # 1️⃣ Validate file
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    try:
        # 2️⃣ Read CSV
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # 3️⃣ Check required columns
        if "clean" not in df.columns or "sentiment" not in df.columns:
            raise HTTPException(
                status_code=400,
                detail="CSV must contain 'clean' and 'sentiment' columns."
            )

        # 4️⃣ Predict
        df["pred"] = df["clean"].apply(predict_sentiment)

        # 5️⃣ Metrics
        acc = accuracy_score(df["sentiment"], df["pred"])
        precision = precision_score(df["sentiment"], df["pred"], zero_division=0)
        recall = recall_score(df["sentiment"], df["pred"], zero_division=0)
        f1 = f1_score(df["sentiment"], df["pred"], zero_division=0)

        tn, fp, fn, tp = confusion_matrix(df["sentiment"], df["pred"]).ravel()

        positive_predictions = int(df["pred"].sum())
        negative_predictions = int(len(df) - positive_predictions)

        # 6️⃣ Return JSON
        return {
            "filename": file.filename,
            "rows_processed": len(df),

            "accuracy": round(float(acc), 4),
            "precision": round(float(precision), 4),
            "recall": round(float(recall), 4),
            "f1_score": round(float(f1), 4),

            "positive_predictions": positive_predictions,
            "negative_predictions": negative_predictions,

            "tp": int(tp),
            "tn": int(tn),
            "fp": int(fp),
            "fn": int(fn),

            "status": "success",
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing file: {str(e)}"
        )


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)