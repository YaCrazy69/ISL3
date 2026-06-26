from pydantic import BaseModel

class SimulationMetrics(BaseModel):
    maxHeight: float
    range: float
    flightTime: float
    iterations: int
