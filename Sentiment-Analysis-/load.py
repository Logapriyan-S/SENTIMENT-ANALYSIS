import pandas as pd
import re

df = pd.read_csv(r"C:\Users\ashri\Downloads\Sentiment project\IMDB Dataset.csv")
df = df.sample(2000, random_state=42)


def clean(text):
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^a-zA-Z ]', '', text)
    return text.lower()

df['clean_review'] = df['review'].apply(clean)
print(df.head())
print(df.shape)