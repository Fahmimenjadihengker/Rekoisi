from contextlib import asynccontextmanager
import os

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from schemas.response_schema import EvaluationRequest
from services.data_loader import repository
from services.evaluation import evaluate_poem, evaluation_summary
from services.recommender import recommend_poems


@asynccontextmanager
async def lifespan(app: FastAPI):
    repository.load()
    yield


app = FastAPI(
    title="Sistem Rekomendasi Puisi Indonesia API",
    description="API rekomendasi puisi berbasis embedding IndoBERT dan cosine similarity.",
    version="1.0.0",
    lifespan=lifespan,
)

allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "message": "Poetry recommendation API is running"}


@app.get("/api/stats")
def stats() -> dict:
    return repository.stats()


@app.get("/api/poems")
def poems(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=12, ge=1, le=100),
    search: str | None = Query(default=None, max_length=100),
) -> dict:
    return repository.list_poems(page=page, limit=limit, search=search)


@app.get("/api/poems/{poem_id}")
def poem_detail(poem_id: int) -> dict:
    poem = repository.poem_detail(poem_id)
    if poem is None:
        raise HTTPException(status_code=404, detail="Poem ID not found")
    return poem


@app.get("/api/poems/{poem_id}/recommendations")
def poem_recommendations(
    poem_id: int,
    top_n: int = Query(default=5, ge=1, le=10),
    include_keywords: bool = True,
) -> dict:
    recommendations = recommend_poems(poem_id, top_n=top_n, include_keywords=include_keywords)
    if recommendations is None:
        raise HTTPException(status_code=404, detail="Poem ID not found")
    return recommendations


@app.post("/api/evaluate")
def evaluate(request: EvaluationRequest) -> dict:
    result = evaluate_poem(request.poem_id, top_n=request.top_n)
    if result is None:
        raise HTTPException(status_code=404, detail="Poem ID not found")
    return result


@app.get("/api/evaluation-summary")
def evaluation() -> dict:
    return evaluation_summary()
