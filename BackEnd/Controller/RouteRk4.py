from fastapi import APIRouter
from Modele.SimulationParams import SimulationParams
from Modele.SimulationResult import SimulationResult
from Services.RK4_Service import compute_simulation

router = APIRouter()

@router.post("/simulate", response_model=SimulationResult)
def simulate(params: SimulationParams):
    return compute_simulation(params)