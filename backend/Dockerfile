FROM python:3.13.5-slim AS builder

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc build-essential && \
    rm -rf /var/lib/apt/lists/*

COPY app/requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt


FROM python:3.13.5-slim AS development

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY app/ .

ENV PATH="/root/.local/bin:$PATH"
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

EXPOSE 5000

CMD ["flask", "--app", "main", "run", "--host=0.0.0.0", "--port=5000"]


FROM python:3.13.5-slim AS production

WORKDIR /app

# Copiar dependências instaladas
COPY --from=builder /root/.local /root/.local
COPY app/ .

# Instalar servidor de produção WSGI
RUN pip install --no-cache-dir gunicorn==20.1.0

# Definir variáveis de ambiente
ENV PATH="/root/.local/bin:$PATH"
ENV FLASK_ENV=production
ENV GUNICORN_WORKERS=4
ENV GUNICORN_THREADS=2
ENV GUNICORN_BIND="0.0.0.0:5000"

# Porta exposta
EXPOSE 5000

# Comando para produção (otimizado)
CMD ["gunicorn", "main:app"]