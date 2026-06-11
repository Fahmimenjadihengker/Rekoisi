from services.keyword_extractor import keyword_extractor
from services.recommender import recommend_poems


STATIC_TESTS = [
    {"test": 1, "query_title": "Untuk Kekasihku", "relevant_count": 2, "total_recommendations": 5, "precision": 0.40},
    {"test": 2, "query_title": "Jarak Cinta", "relevant_count": 3, "total_recommendations": 5, "precision": 0.60},
    {"test": 3, "query_title": "Jambu", "relevant_count": 2, "total_recommendations": 5, "precision": 0.40},
    {"test": 4, "query_title": "Sadarkan Ak", "relevant_count": 2, "total_recommendations": 5, "precision": 0.40},
    {"test": 5, "query_title": "Kangen", "relevant_count": 2, "total_recommendations": 5, "precision": 0.40},
]


def evaluation_summary() -> dict:
    total_recommendations = sum(item["total_recommendations"] for item in STATIC_TESTS)
    total_relevant = sum(item["relevant_count"] for item in STATIC_TESTS)
    average_precision = round(sum(item["precision"] for item in STATIC_TESTS) / len(STATIC_TESTS), 2)
    return {
        "total_tests": len(STATIC_TESTS),
        "total_recommendations": total_recommendations,
        "total_relevant": total_relevant,
        "average_precision": average_precision,
        "tests": STATIC_TESTS,
    }


def evaluate_poem(poem_id: int, top_n: int = 5) -> dict | None:
    payload = recommend_poems(poem_id, top_n=top_n, include_keywords=True)
    if payload is None:
        return None

    query = payload["query"]
    query_keywords = set(query.get("keywords", []))
    results = []

    for recommendation in payload["recommendations"]:
        recommendation_keywords = set(recommendation.get("keywords", []))
        matched = sorted(query_keywords.intersection(recommendation_keywords))
        results.append(
            {
                "rank": recommendation["rank"],
                "id": recommendation["id"],
                "title": recommendation["title"],
                "similarity_score": recommendation["similarity_score"],
                "recommendation_keywords": sorted(recommendation_keywords),
                "matched_keywords": matched,
                "relevance": 1 if matched else 0,
            }
        )

    relevant_count = sum(item["relevance"] for item in results)
    precision = round(relevant_count / len(results), 2) if results else 0
    return {
        "query": {"id": query["id"], "title": query["title"], "keywords": sorted(query_keywords)},
        "results": results,
        "precision": precision,
    }
