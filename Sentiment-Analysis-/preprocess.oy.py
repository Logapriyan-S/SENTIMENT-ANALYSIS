import pandas as pd
import re

df = pd.read_csv(r"C:\Users\ashri\Downloads\Sentiment project\IMDB Dataset.csv")

df['sentiment'] = df['sentiment'].map({'positive':1,'negative':0})

def clean(text):
    text = re.sub(r'<.*?>','',text)
    text = re.sub(r'[^a-zA-Z ]','',text)
    return text.lower()

df['clean'] = df['review'].apply(clean)

df = df.sample(2000, random_state=42)

df.to_csv("cleaned.csv", index=False)

print("Preprocessing complete ✓")