from services.data_loader import repository
from services.keyword_extractor import keyword_extractor


def recommend_poems(poem_id: int, top_n: int = 5, include_keywords: bool = True) -> dict | None:
    query = repository.poem_detail(poem_id)
    if query is None:
        return None

    df, similarity_matrix = repository._require_loaded()
    scores = similarity_matrix[poem_id]
    candidate_indices = scores.argsort()[::-1]

    recommendations = []
    rank = 1
    for idx in candidate_indices:
        idx = int(idx)
        if idx == poem_id:
            continue

        detail = repository.poem_detail(idx)
        if detail is None:
            continue

        row = df.iloc[idx]
        item = {
            "rank": rank,
            "id": idx,
            "title": detail["title"],
            "author": detail["author"],
            "preview": repository.poem_preview(row)["preview"],
            "similarity_score": round(float(scores[idx]), 4),
        }
        if include_keywords:
            item["keywords"] = keyword_extractor.extract(idx, detail["clean_text"] or detail["text"])

        recommendations.append(item)
        rank += 1
        if len(recommendations) >= top_n:
            break

    if include_keywords:
        query["keywords"] = keyword_extractor.extract(poem_id, query["clean_text"] or query["text"])

    return {"query": query, "recommendations": recommendations}
