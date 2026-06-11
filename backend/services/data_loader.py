from pathlib import Path

import numpy as np
import pandas as pd


class DataRepository:
    def __init__(self, data_dir: Path | None = None):
        self.data_dir = data_dir or Path(__file__).resolve().parents[1] / "data"
        self.df: pd.DataFrame | None = None
        self.similarity_matrix = None
        self.embedding_shape: tuple[int, ...] | None = None

    def load(self) -> None:
        csv_path = self.data_dir / "puisi_clean.csv"
        similarity_path = self.data_dir / "cosine_sim_matrix.npy"
        embeddings_path = self.data_dir / "puisi_embeddings.npy"

        if not csv_path.exists():
            raise FileNotFoundError("File puisi_clean.csv tidak ditemukan")
        if not similarity_path.exists():
            raise FileNotFoundError("File cosine_sim_matrix.npy tidak ditemukan")
        if not embeddings_path.exists():
            raise FileNotFoundError("File puisi_embeddings.npy tidak ditemukan")

        df = pd.read_csv(csv_path).fillna("")
        df = df.reset_index(drop=True)
        df["id"] = df.index

        self.similarity_matrix = np.load(similarity_path, mmap_mode="r")
        embeddings = np.load(embeddings_path, mmap_mode="r")
        self.embedding_shape = embeddings.shape

        if len(df) != self.similarity_matrix.shape[0]:
            raise ValueError("Jumlah puisi tidak sesuai dengan ukuran matriks similarity")

        self.df = df

    def _require_loaded(self) -> tuple[pd.DataFrame, np.ndarray]:
        if self.df is None or self.similarity_matrix is None:
            raise RuntimeError("Data belum dimuat")
        return self.df, self.similarity_matrix

    def stats(self) -> dict:
        df, _ = self._require_loaded()
        embedding_dimension = self.embedding_shape[1] if self.embedding_shape and len(self.embedding_shape) > 1 else None
        return {
            "total_poems": int(len(df)),
            "embedding_dimension": embedding_dimension,
            "model": "IndoBERT",
            "similarity_method": "Cosine Similarity",
            "recommendation_output": "Top-5 puisi",
        }

    def list_poems(self, page: int = 1, limit: int = 12, search: str | None = None) -> dict:
        df, _ = self._require_loaded()
        filtered = df

        if search:
            keyword = search.strip()
            if keyword:
                mask = (
                    df["title"].str.contains(keyword, case=False, na=False, regex=False)
                    | df["author"].str.contains(keyword, case=False, na=False, regex=False)
                    | df["puisi"].str.contains(keyword, case=False, na=False, regex=False)
                    | df["puisi_clean"].str.contains(keyword, case=False, na=False, regex=False)
                )
                filtered = df[mask]

        total = int(len(filtered))
        start = (page - 1) * limit
        end = start + limit
        rows = filtered.iloc[start:end]

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "data": [self.poem_preview(row) for _, row in rows.iterrows()],
        }

    def poem_preview(self, row: pd.Series) -> dict:
        text = str(row.get("puisi", "")).strip()
        return {
            "id": int(row["id"]),
            "title": self.display_title(row.get("title", "")),
            "author": self.display_author(row.get("author", "")),
            "preview": text[:150] + ("..." if len(text) > 150 else ""),
        }

    def poem_detail(self, poem_id: int) -> dict | None:
        df, _ = self._require_loaded()
        if poem_id < 0 or poem_id >= len(df):
            return None

        row = df.iloc[poem_id]
        return {
            "id": int(row["id"]),
            "title": self.display_title(row.get("title", "")),
            "author": self.display_author(row.get("author", "")),
            "text": str(row.get("puisi", "")).strip(),
            "clean_text": str(row.get("puisi_clean", "")).strip(),
        }

    @staticmethod
    def display_title(value: str) -> str:
        title = str(value).strip()
        return title.title() if title else "Tanpa Judul"

    @staticmethod
    def display_author(value: str) -> str:
        author = str(value).strip()
        return author if author else "Tidak Diketahui"


repository = DataRepository()
