from pydantic import BaseModel
from typing import List
from Modele.SimulationMetrics import SimulationMetrics
from Modele.TrajectoryPoint import TrajectoryPoint

class SimulationResult(BaseModel):
    metrics: SimulationMetrics
    trajectory: List[TrajectoryPoint]
