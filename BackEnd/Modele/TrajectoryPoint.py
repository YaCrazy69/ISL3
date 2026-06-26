from pydantic import BaseModel

class TrajectoryPoint(BaseModel):
    t: float
    x: float
    y: float
    vx: float
    vy: float

