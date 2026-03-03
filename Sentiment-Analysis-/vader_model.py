import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sklearn.metrics import accuracy_score

df = pd.read_csv("cleaned.csv")

analyzer = SentimentIntensityAnalyzer()

def predict(text):
    score = analyzer.polarity_scores(text)
    return 1 if score["compound"] >= 0 else 0

df["pred"] = df["clean"].apply(predict)

acc = accuracy_score(df["sentiment"], df["pred"])

print("VADER Accuracy:", acc)

df.to_csv("vader_results.csv", index=False)