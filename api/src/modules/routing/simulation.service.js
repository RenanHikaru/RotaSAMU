
import { prisma } from "#db/prisma.js";
import { getRoute } from "./routing.service.js";

const activeSimulations = new Map();

const EARTH_RADIUS_METERS = 6371000;

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distanceBetween(a, b) {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}


function buildCumulativeDistances(coordinates) {
  const cumulative = [0];
  for (let i = 1; i < coordinates.length; i++) {
    const segment = distanceBetween(coordinates[i - 1], coordinates[i]);
    cumulative.push(cumulative[i - 1] + segment);
  }
  return cumulative;
}

function positionAtDistance(coordinates, cumulativeDistances, targetDistance) {
  const totalDistance = cumulativeDistances[cumulativeDistances.length - 1];
  const clamped = Math.min(Math.max(targetDistance, 0), totalDistance);

  let segmentIndex = cumulativeDistances.findIndex((d) => d >= clamped);
  if (segmentIndex <= 0) segmentIndex = 1;

  const start = coordinates[segmentIndex - 1];
  const end = coordinates[segmentIndex];
  const segmentStart = cumulativeDistances[segmentIndex - 1];
  const segmentEnd = cumulativeDistances[segmentIndex];

  const segmentLength = segmentEnd - segmentStart || 1;
  const progress = (clamped - segmentStart) / segmentLength;

  return {
    lat: start.lat + (end.lat - start.lat) * progress,
    lng: start.lng + (end.lng - start.lng) * progress,
  };
}

export async function startSimulation({
  vehicleId,
  destLat,
  destLng,
  speedMultiplier = 6,
  tickMs = 1000,
  onArrive,
}) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });
  if (!vehicle) throw new Error("Veículo não encontrado");

  stopSimulation(vehicleId);

  const route = await getRoute({
    originLat: vehicle.latitude,
    originLng: vehicle.longitude,
    destLat,
    destLng,
  });

  const cumulativeDistances = buildCumulativeDistances(route.coordinates);
  const totalDistance = cumulativeDistances[cumulativeDistances.length - 1];

  // Duração simulada = duração real dividida pelo multiplicador de velocidade.
  const simulatedDurationSeconds = route.durationSeconds / speedMultiplier;

  let elapsedSeconds = 0;

  const intervalId = setInterval(async () => {
    elapsedSeconds += tickMs / 1000;

    const fraction = Math.min(elapsedSeconds / simulatedDurationSeconds, 1);
    const targetDistance = fraction * totalDistance;
    const position = positionAtDistance(
      route.coordinates,
      cumulativeDistances,
      targetDistance,
    );

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { latitude: position.lat, longitude: position.lng },
    });

    if (fraction >= 1) {
      stopSimulation(vehicleId);
      onArrive?.();
    }
  }, tickMs);

  activeSimulations.set(vehicleId, { intervalId, route, startedAt: Date.now() });

  return {
    distanceMeters: route.distanceMeters,
    estimatedDurationSeconds: route.durationSeconds,
    simulatedDurationSeconds,
  };
}

export function stopSimulation(vehicleId) {
  const simulation = activeSimulations.get(vehicleId);
  if (simulation) {
    clearInterval(simulation.intervalId);
    activeSimulations.delete(vehicleId);
  }
}

export function isSimulating(vehicleId) {
  return activeSimulations.has(vehicleId);
}
