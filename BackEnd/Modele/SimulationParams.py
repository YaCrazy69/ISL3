from pydantic import BaseModel, Field
from typing import Literal

class SimulationParams(BaseModel):
    initialVelocity: float = Field(..., gt=0)
    angle: float = Field(..., ge=0, le=90)
    gravity: float = Field(..., gt=0)
    timeStep: float = Field(..., gt=0)
    mass: float = Field(..., gt=0)
    dragCoefficient: float = Field(..., ge=0)
    initialHeight: float = Field(..., ge=0)
    method: Literal["rk4"] = "rk4"

