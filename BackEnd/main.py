from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Controller.RouteRk4 import router as rk4_router

app = FastAPI(title="Projectile Simulator API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rk4_router)

