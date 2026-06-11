import os
import re
from collections import Counter


STOPWORDS = {
    "aku", "akan", "atau", "bagai", "bagi", "bahwa", "baik", "dalam", "dan", "dari", "demi",
    "dengan", "di", "dia", "diriku", "engkau", "hingga", "ia", "ini", "itu", "jadi", "jika",
    "kala", "kami", "kamu", "kan", "karena", "ke", "kian", "kita", "ku", "lagi", "lah", "maka",
    "mereka", "mu", "namun", "nya", "oh", "pada", "pun", "saat", "saja", "sang", "sebagai",
    "semua", "seperti", "tak", "tanpa", "telah", "tentang", "terus", "tiada", "tidak", "untuk",
    "yang",
}


class KeywordExtractor:
    def __init__(self) -> None:
        self.cache: dict[int, list[str]] = {}
        self._model = None
        self._keybert_failed = False
        self.enable_keybert = os.getenv("ENABLE_KEYBERT", "false").lower() in {"1", "true", "yes"}

    def extract(self, poem_id: int, text: str, top_n: int = 5) -> list[str]:
        if poem_id in self.cache:
            return self.cache[poem_id]

        keywords = self._extract_with_keybert(text, top_n) if self.enable_keybert else []
        if not keywords:
            keywords = self._extract_fast(text, top_n)

        self.cache[poem_id] = keywords
        return keywords

    def _extract_with_keybert(self, text: str, top_n: int) -> list[str]:
        if self._keybert_failed:
            return []

        try:
            if self._model is None:
                from keybert import KeyBERT

                self._model = KeyBERT("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")

            results = self._model.extract_keywords(
                text,
                keyphrase_ngram_range=(1, 1),
                stop_words=list(STOPWORDS),
                top_n=top_n,
            )
            return [keyword for keyword, _ in results]
        except Exception:
            self._keybert_failed = True
            return []

    @staticmethod
    def _extract_fast(text: str, top_n: int) -> list[str]:
        words = re.findall(r"[a-zA-ZÀ-ÿ]+", text.lower())
        words = [word for word in words if len(word) > 3 and word not in STOPWORDS]
        counts = Counter(words)
        return [word for word, _ in counts.most_common(top_n)]


keyword_extractor = KeywordExtractor()
