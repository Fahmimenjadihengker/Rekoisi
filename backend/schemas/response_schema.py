from pydantic import BaseModel, Field


class EvaluationRequest(BaseModel):
    poem_id: int = Field(ge=0)
    top_n: int = Field(default=5, ge=1, le=10)
