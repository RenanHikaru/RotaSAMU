const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving";

export class RouteNotFoundError extends Error {
  constructor(
    message = "Não foi possível calcular uma rota entre os pontos informados",
  ) {
    super(message);
    this.statusCode = 422;
  }
}


export async function getRoute({ originLat, originLng, destLat, destLng }) {
  const coordinatesParam = `${originLng},${originLat};${destLng},${destLat}`;
  const url = `${OSRM_BASE_URL}/${coordinatesParam}?overview=full&geometries=geojson`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OSRM respondeu com status ${response.status}`);
  }

  const data = await response.json();

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new RouteNotFoundError();
  }

  const route = data.routes[0];

  return {

    coordinates: route.geometry.coordinates.map(([lng, lat]) => ({
      lat,
      lng,
    })),
    distanceMeters: route.distance,
    durationSeconds: route.duration,
  };
}
