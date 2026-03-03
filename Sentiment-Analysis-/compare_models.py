import pandas as pd
import matplotlib.pyplot as plt
import time
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, ConfusionMatrixDisplay

def evaluate(file, name):
    df = pd.read_csv(file)

    y_true = df["sentiment"]
    y_pred = df["pred"]

    acc = accuracy_score(y_true,y_pred)
    prec = precision_score(y_true,y_pred)
    rec = recall_score(y_true,y_pred)
    f1 = f1_score(y_true,y_pred)

    print(f"\n{name} RESULTS")
    print("------------------")
    print("Accuracy :",acc)
    print("Precision:",prec)
    print("Recall   :",rec)
    print("F1 Score :",f1)

    cm = confusion_matrix(y_true,y_pred)
    ConfusionMatrixDisplay(cm).plot()
    plt.title(name+" Confusion Matrix")
    plt.show()

    return acc

tb = evaluate("textblob_results.csv","TextBlob")
vd = evaluate("vader_results.csv","VADER")
bt = evaluate("bert_results.csv","BERT")

models=["TextBlob","VADER","BERT"]
scores=[tb,vd,bt]

plt.bar(models,scores)
plt.title("Model Accuracy Comparison")
plt.xlabel("Models")
plt.ylabel("Accuracy")
plt.show()