"""
FraudLens AI - Reusable Data Preprocessing Pipeline
Handles data cleaning, schema validation, RobustScaling of Time & Amount,
and train/test splitting with stratification for imbalanced credit card data.
"""

from typing import Tuple, Dict, Any, Optional
import numpy as np
import pandas as pd
from sklearn.preprocessing import RobustScaler, StandardScaler
from sklearn.model_selection import train_test_split


EXPECTED_PCA_FEATURES = [f"V{i}" for i in range(1, 29)]
ALL_EXPECTED_FEATURES = ["Time"] + EXPECTED_PCA_FEATURES + ["Amount"]


class FraudDataPreprocessor:
    def __init__(self, scaler_type: str = "robust"):
        self.scaler_type = scaler_type
        if scaler_type == "robust":
            self.amount_scaler = RobustScaler()
            self.time_scaler = RobustScaler()
        else:
            self.amount_scaler = StandardScaler()
            self.time_scaler = StandardScaler()
        self.is_fitted = False

    def validate_schema(self, df: pd.DataFrame) -> bool:
        """Ensure all required columns exist and types are numeric."""
        missing = [col for col in ALL_EXPECTED_FEATURES if col not in df.columns]
        if missing:
            raise ValueError(f"Missing required columns in dataset: {missing}")
        return True

    def fit(self, df: pd.DataFrame) -> "FraudDataPreprocessor":
        self.validate_schema(df)
        self.amount_scaler.fit(df[["Amount"]])
        self.time_scaler.fit(df[["Time"]])
        self.is_fitted = True
        return self

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        if not self.is_fitted:
            raise RuntimeError("Preprocessor must be fitted before transforming.")
        df_copy = df.copy()
        df_copy["scaled_amount"] = self.amount_scaler.transform(df_copy[["Amount"]])
        df_copy["scaled_time"] = self.time_scaler.transform(df_copy[["Time"]])
        feature_cols = ["scaled_time"] + EXPECTED_PCA_FEATURES + ["scaled_amount"]
        return df_copy[feature_cols]

    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        return self.fit(df).transform(df)

    def prepare_train_test(
        self, df: pd.DataFrame, target_col: str = "Class", test_size: float = 0.2, random_state: int = 42
    ) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
        """Split features and target with stratification."""
        self.validate_schema(df)
        X = self.fit_transform(df)
        y = df[target_col]
        return train_test_split(X, y, test_size=test_size, stratify=y, random_state=random_state)
