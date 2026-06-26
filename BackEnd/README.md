# BackEnd

API FastAPI pour Projectile Simulator.

## Installation

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Lancer le serveur

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Endpoints

- `POST /simulate` : exécute la simulation côté serveur
