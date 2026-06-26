import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from Modele.SimulationParams import SimulationParams
from Services.RK4_Service import compute_simulation


class SimulationServiceTest(unittest.TestCase):
    def test_compute_simulation_returns_trajectory_and_metrics(self):
        params = SimulationParams(
            initialVelocity=20.0,
            angle=45.0,
            gravity=9.81,
            timeStep=0.1,
            mass=1.0,
            dragCoefficient=0.0,
            initialHeight=10.0,
            method="rk4",
        )

        result = compute_simulation(params)

        self.assertGreater(len(result.trajectory), 0)
        self.assertGreater(result.metrics.flightTime, 0)
        self.assertGreaterEqual(result.metrics.maxHeight, params.initialHeight)
        self.assertGreaterEqual(result.metrics.range, 0)


if __name__ == "__main__":
    unittest.main()
