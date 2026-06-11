FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENABLE_KEYBERT=false \
    PORT=7860

WORKDIR /app

COPY backend/requirements.prod.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./

EXPOSE 7860

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]
