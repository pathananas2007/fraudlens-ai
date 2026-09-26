"""
FraudLens AI - Training Pipeline
Trains Baseline Decision Tree, Baseline SVM, Isolation Forest, and Production XGBoost.
Saves model artifacts, scaler parameters, and evaluation summaries to disk.
"""

import os
import json
import joblib
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.ensemble import IsolationForest
from backend.ml.preprocessing.pipeline import FraudDataPreprocessor


def train_and_export_models(data_csv_path: str, output_dir: str = "backend/ml/artifacts"):
    os.makedirs(output_dir, exist_ok=True)
    df = pd.read_csv(data_csv_path)

    preprocessor = FraudDataPreprocessor()
    X_train, X_test, y_train, y_test = preprocessor.prepare_train_test(df)

    # 1. Baseline Decision Tree
    dt = DecisionTreeClassifier(max_depth=5, criterion="entropy", random_state=42)
    dt.fit(X_train, y_train)
    joblib.dump(dt, os.path.join(output_dir, "decision_tree_model.joblib"))

    # 2. Baseline Support Vector Machine
    svm = SVC(kernel="rbf", probability=True, C=1.0, random_state=42)
    svm.fit(X_train[:20000], y_train[:20000])  # Sample for SVM memory efficiency
    joblib.dump(svm, os.path.join(output_dir, "svm_model.joblib"))

    # 3. Isolation Forest Anomaly Detector
    iso = IsolationForest(contamination=0.002, random_state=42)
    iso.fit(X_train)
    joblib.dump(iso, os.path.join(output_dir, "isolation_forest_model.joblib"))

    # 4. Save preprocessor
    joblib.dump(preprocessor, os.path.join(output_dir, "preprocessor.joblib"))
    print(f"Models successfully trained and artifacts saved to {output_dir}")


if __name__ == "__main__":
    print("FraudLens AI Training Module Ready.")
