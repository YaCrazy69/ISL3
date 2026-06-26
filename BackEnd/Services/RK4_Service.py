from typing import List
import math
from Modele.SimulationParams import SimulationParams
from Modele.SimulationResult import SimulationResult
from Modele.SimulationMetrics import SimulationMetrics
from Modele.TrajectoryPoint import TrajectoryPoint


def _derivatives(state: tuple[float, float, float, float], params: SimulationParams) -> tuple[float, float, float, float]:
    x, y, vx, vy = state
    speed = math.sqrt(vx * vx + vy * vy)
    drag_factor = params.dragCoefficient * speed / params.mass if speed > 0 else 0.0

    return (
        vx,
        vy,
        -drag_factor * vx,
        -params.gravity - drag_factor * vy,
    )


def _rk4_step(state: tuple[float, float, float, float], dt: float, params: SimulationParams) -> tuple[float, float, float, float]:
    k1 = _derivatives(state, params)
    k2 = _derivatives(
        (
            state[0] + 0.5 * dt * k1[0],
            state[1] + 0.5 * dt * k1[1],
            state[2] + 0.5 * dt * k1[2],
            state[3] + 0.5 * dt * k1[3],
        ),
        params,
    )
    k3 = _derivatives(
        (
            state[0] + 0.5 * dt * k2[0],
            state[1] + 0.5 * dt * k2[1],
            state[2] + 0.5 * dt * k2[2],
            state[3] + 0.5 * dt * k2[3],
        ),
        params,
    )
    k4 = _derivatives(
        (
            state[0] + dt * k3[0],
            state[1] + dt * k3[1],
            state[2] + dt * k3[2],
            state[3] + dt * k3[3],
        ),
        params,
    )

    return (
        state[0] + (dt / 6.0) * (k1[0] + 2.0 * k2[0] + 2.0 * k3[0] + k4[0]),
        state[1] + (dt / 6.0) * (k1[1] + 2.0 * k2[1] + 2.0 * k3[1] + k4[1]),
        state[2] + (dt / 6.0) * (k1[2] + 2.0 * k2[2] + 2.0 * k3[2] + k4[2]),
        state[3] + (dt / 6.0) * (k1[3] + 2.0 * k2[3] + 2.0 * k3[3] + k4[3]),
    )


def compute_simulation(params: SimulationParams) -> SimulationResult:
    angle_rad = params.angle * 3.141592653589793 / 180.0
    vx = params.initialVelocity * math.cos(angle_rad)
    vy = params.initialVelocity * math.sin(angle_rad)

    state = (0.0, params.initialHeight, vx, vy)
    t = 0.0
    trajectory: List[TrajectoryPoint] = []
    max_height = params.initialHeight
    iterations = 0

    while state[1] >= 0 and iterations < 200000:
        trajectory.append(TrajectoryPoint(t=t, x=state[0], y=state[1], vx=state[2], vy=state[3]))
        max_height = max(max_height, state[1])
        state = _rk4_step(state, params.timeStep, params)
        t += params.timeStep
        iterations += 1

    range_value = trajectory[-1].x if trajectory else 0.0
    flight_time = trajectory[-1].t if trajectory else 0.0

    return SimulationResult(
        metrics=SimulationMetrics(
            maxHeight=max_height,
            range=range_value,
            flightTime=flight_time,
            iterations=iterations,
        ),
        trajectory=trajectory,
    )