import pandas as pd
from transformers import pipeline
from sklearn.metrics import accuracy_score

print("Loading dataset...")
df = pd.read_csv("cleaned.csv")

print("Rows loaded:", len(df))

print("Loading BERT model...")
model = pipeline("sentiment-analysis")

print("Model loaded ✓")

def predict(text):
    result = model(text[:512])[0]
    return 1 if result['label']=="POSITIVE" else 0

print("Running predictions...")
df["pred"] = df["clean"].apply(predict)

acc = accuracy_score(df["sentiment"], df["pred"])

print("BERT Accuracy:", acc)

df.to_csv("bert_results.csv", index=False)

print("Done ✓")