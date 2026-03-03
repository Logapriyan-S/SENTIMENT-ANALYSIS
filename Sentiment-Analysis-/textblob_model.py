import pandas as pd
from textblob import TextBlob
from sklearn.metrics import accuracy_score

df = pd.read_csv("cleaned.csv")

def predict(text):
    return 1 if TextBlob(text).sentiment.polarity > 0 else 0

df["pred"] = df["clean"].apply(predict)

acc = accuracy_score(df["sentiment"], df["pred"])

print("TextBlob Accuracy:", acc)

df.to_csv("textblob_results.csv", index=False)